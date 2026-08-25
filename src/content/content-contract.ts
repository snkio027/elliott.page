import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { glob, type Loader } from "astro/loaders";
import { parseFrontmatter } from "astro/markdown";
import { z } from "astro/zod";
import { fromMarkdown } from "mdast-util-from-markdown";

export const stableIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const nonEmptyString = z.string().trim().min(1);
const language = z.enum(["en", "zh-CN"]);
const draft = z.boolean().default(true);

function dateOnlyString(field: "date" | "updated") {
  return z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, `${field} must use YYYY-MM-DD`)
    .refine(
      (value) => {
        const parsed = new Date(`${value}T00:00:00.000Z`);

        return (
          !Number.isNaN(parsed.getTime()) &&
          parsed.toISOString().slice(0, 10) === value
        );
      },
      { error: `${field} must be a valid calendar date` },
    );
}

const datedContent = {
  title: nonEmptyString,
  date: dateOnlyString("date"),
  updated: dateOnlyString("updated").optional(),
  lang: language,
  draft,
};

export const writingSchema = z
  .object({
    ...datedContent,
    description: nonEmptyString.optional(),
  })
  .strict()
  .refine(({ date, updated }) => !updated || updated >= date, {
    error: "updated must not be earlier than date",
    path: ["updated"],
  });

export const notesSchema = z
  .object(datedContent)
  .strict()
  .refine(({ date, updated }) => !updated || updated >= date, {
    error: "updated must not be earlier than date",
    path: ["updated"],
  });

export type PublishingCollection = "writing" | "notes";
export type PublishingData = z.infer<typeof writingSchema>;

export interface PublishingEntry<
  TData extends PublishingData = PublishingData,
> {
  id: string;
  data: TData;
}

interface MarkdownNode {
  type: string;
  depth?: number;
  value?: string;
  children?: MarkdownNode[];
}

export class ContentContractError extends Error {
  constructor(source: string, message: string) {
    super(`${source}: ${message}`);
    this.name = "ContentContractError";
  }
}

function compareAscii(left: string, right: string) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function hasSubstantiveParagraphContent(node: MarkdownNode): boolean {
  for (const child of node.children ?? []) {
    if (
      (child.type === "text" || child.type === "inlineCode") &&
      child.value?.trim()
    ) {
      return true;
    }

    if (hasSubstantiveParagraphContent(child)) return true;
  }

  return false;
}

export function validateMarkdownBody(body: string, source = "Markdown body") {
  const tree = fromMarkdown(body) as MarkdownNode;
  const headings: number[] = [];
  let hasSubstantiveBody = false;

  function visit(node: MarkdownNode) {
    if (node.type === "paragraph" && hasSubstantiveParagraphContent(node)) {
      hasSubstantiveBody = true;
    }

    if (node.type === "code" && node.value?.trim()) {
      hasSubstantiveBody = true;
    }

    if (node.type === "heading" && node.depth !== undefined) {
      headings.push(node.depth);
    }

    for (const child of node.children ?? []) visit(child);
  }

  visit(tree);

  if (!hasSubstantiveBody) {
    throw new ContentContractError(
      source,
      "body must contain a non-empty paragraph or code block",
    );
  }

  if (headings.length === 0) return;

  if (headings.some((depth) => depth < 2 || depth > 6)) {
    throw new ContentContractError(
      source,
      "body headings must be H2 through H6",
    );
  }

  if (headings[0] !== 2) {
    throw new ContentContractError(source, "the first body heading must be H2");
  }

  for (let index = 1; index < headings.length; index += 1) {
    const previous = headings[index - 1];
    const current = headings[index];

    if (current > previous + 1) {
      throw new ContentContractError(
        source,
        `heading level must not jump from H${previous} to H${current}`,
      );
    }
  }
}

export function validateStableId(id: string, source = "stable ID") {
  if (!stableIdPattern.test(id)) {
    throw new ContentContractError(
      source,
      "file stem must match ^[a-z0-9]+(?:-[a-z0-9]+)*$",
    );
  }

  return id;
}

export function stableIdFromEntryPath(entryPath: string) {
  if (entryPath.includes("/") || entryPath.includes("\\")) {
    throw new ContentContractError(
      entryPath,
      "publishing Markdown must be in the collection root",
    );
  }

  if (!entryPath.endsWith(".md")) {
    throw new ContentContractError(
      entryPath,
      "entry must use the .md extension",
    );
  }

  return validateStableId(entryPath.slice(0, -3), entryPath);
}

export function publishingPathFor(
  collection: PublishingCollection,
  stableId: string,
) {
  return `/${collection}/${validateStableId(stableId)}/`;
}

export function isPubliclyEligible(entry: PublishingEntry) {
  return entry.data.draft === false;
}

export function orderPublicEntries<TEntry extends PublishingEntry>(
  entries: readonly TEntry[],
) {
  const eligible = entries.filter(isPubliclyEligible);

  for (const entry of eligible) validateStableId(entry.id, entry.id);

  return eligible.slice().sort((left, right) => {
    if (left.data.date !== right.data.date) {
      return left.data.date > right.data.date ? -1 : 1;
    }

    return compareAscii(left.id, right.id);
  });
}

interface MarkdownFile {
  absolutePath: string;
  relativePath: string;
}

async function findMarkdownFiles(
  directory: string,
  prefix = "",
): Promise<MarkdownFile[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((left, right) => compareAscii(left.name, right.name));

  const files: MarkdownFile[] = [];

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(absolutePath, relativePath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push({ absolutePath, relativePath });
    }
  }

  return files;
}

export async function validatePublishingDirectory(base: URL) {
  const files = await findMarkdownFiles(fileURLToPath(base));
  const stableIds = new Set<string>();

  for (const file of files) {
    const stableId = stableIdFromEntryPath(file.relativePath);

    if (stableIds.has(stableId)) {
      throw new ContentContractError(
        file.relativePath,
        `duplicate stable ID: ${stableId}`,
      );
    }

    stableIds.add(stableId);

    const source = await readFile(file.absolutePath, "utf8");
    const { content } = parseFrontmatter(source);
    validateMarkdownBody(content, file.relativePath);
  }
}

export function publishingMarkdownLoader(base: string): Loader {
  const loader = glob({
    pattern: "**/*.md",
    base,
    generateId: ({ entry }) => stableIdFromEntryPath(entry),
  });

  return {
    name: `elliott-page-content-contract:${base}`,
    async load(context) {
      await validatePublishingDirectory(new URL(base, context.config.root));
      await loader.load(context);
    },
  };
}
