import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

import {
  notesSchema,
  orderPublicEntries,
  publishingPathFor,
  stableIdFromEntryPath,
  validateMarkdownBody,
  validatePublishingDirectory,
  writingSchema,
} from "../src/content/content-contract.ts";

const baseMetadata = {
  title: "A durable title",
  date: "2026-08-26",
  lang: "en" as const,
};

test("Writing and Notes schemas match the frozen metadata contract", () => {
  assert.deepEqual(writingSchema.parse(baseMetadata), {
    ...baseMetadata,
    draft: true,
  });
  assert.deepEqual(
    writingSchema.parse({
      ...baseMetadata,
      description: "An authored abstract.",
      draft: false,
      updated: "2026-08-26",
    }),
    {
      ...baseMetadata,
      description: "An authored abstract.",
      draft: false,
      updated: "2026-08-26",
    },
  );
  assert.deepEqual(notesSchema.parse(baseMetadata), {
    ...baseMetadata,
    draft: true,
  });
});

test("Schema violations fail closed for published and draft entries", () => {
  const invalidEntries = [
    { ...baseMetadata, title: "" },
    { date: baseMetadata.date, lang: baseMetadata.lang },
    { ...baseMetadata, description: "", draft: true },
    { ...baseMetadata, tags: [], draft: true },
    { ...baseMetadata, slug: "other-id", draft: true },
    { ...baseMetadata, date: "2026-2-03", draft: true },
    { ...baseMetadata, date: "2026-02-30", draft: true },
    { ...baseMetadata, date: new Date("2026-08-26T00:00:00Z"), draft: true },
    { ...baseMetadata, updated: "2026-08-25", draft: true },
    { ...baseMetadata, lang: "fr", draft: true },
    { ...baseMetadata, draft: "false" },
  ];

  for (const entry of invalidEntries) {
    assert.throws(() => writingSchema.parse(entry));
  }

  assert.throws(() =>
    notesSchema.parse({ ...baseMetadata, description: "Not admitted" }),
  );
  assert.throws(() =>
    notesSchema.parse({ date: baseMetadata.date, lang: baseMetadata.lang }),
  );
});

test("A future authored date has no wall-clock scheduling semantics", () => {
  const parsed = writingSchema.parse({
    ...baseMetadata,
    date: "2999-12-31",
    draft: false,
  });

  assert.equal(parsed.draft, false);
  assert.equal(parsed.date, "2999-12-31");
  assert.deepEqual(
    orderPublicEntries([{ id: "future-entry", data: parsed }]).map(
      (entry) => entry.id,
    ),
    ["future-entry"],
  );
});

test("Raw file stems are the only stable-ID authority", () => {
  assert.equal(stableIdFromEntryPath("agent-harness.md"), "agent-harness");
  assert.equal(
    publishingPathFor("writing", "agent-harness"),
    "/writing/agent-harness/",
  );

  for (const invalidPath of [
    "Hello World.md",
    "hello_world.md",
    "hello--world.md",
    "你好.md",
    "article.v2.md",
    "nested/article.md",
    "article.MD",
  ]) {
    assert.throws(() => stableIdFromEntryPath(invalidPath));
  }
});

test("The substantive-body oracle accepts only the frozen node classes", () => {
  for (const body of [
    "hello",
    "[link text](https://example.com)",
    "> quoted paragraph",
    "- list paragraph",
    "`inline code`",
    "```ts\nconst answer = 42;\n```",
  ]) {
    assert.doesNotThrow(() => validateMarkdownBody(body));
  }

  for (const body of [
    "",
    "   \n",
    "## heading only",
    "---",
    "![alt](image.png)",
    "<!-- comment -->",
    "<p>raw html only</p>",
    "```\n```",
  ]) {
    assert.throws(() => validateMarkdownBody(body));
  }
});

test("The heading oracle has one deterministic progression", () => {
  for (const body of [
    "body",
    "body\n\n## H2",
    "body\n\n## H2\n\n### H3",
    "body\n\n## H2\n\n## H2 again",
    "body\n\n## H2\n\n### H3\n\n## H2 again",
  ]) {
    assert.doesNotThrow(() => validateMarkdownBody(body));
  }

  for (const body of [
    "body\n\n# H1",
    "body\n\n## H2\n\n# H1",
    "body\n\n### First H3",
    "body\n\n## H2\n\n#### H4",
  ]) {
    assert.throws(() => validateMarkdownBody(body));
  }
});

test("Draft eligibility and ordering are source-only and deterministic", () => {
  const entries = [
    {
      id: "zeta",
      data: writingSchema.parse({ ...baseMetadata, draft: false }),
    },
    {
      id: "alpha",
      data: writingSchema.parse({ ...baseMetadata, draft: false }),
    },
    {
      id: "newer",
      data: writingSchema.parse({
        ...baseMetadata,
        date: "2026-08-27",
        draft: false,
      }),
    },
    {
      id: "updated-only",
      data: writingSchema.parse({
        ...baseMetadata,
        date: "2026-08-25",
        updated: "2026-08-30",
        draft: false,
      }),
    },
    {
      id: "unpublished",
      data: writingSchema.parse({ ...baseMetadata, draft: true }),
    },
  ];

  assert.deepEqual(
    orderPublicEntries(entries).map((entry) => entry.id),
    ["newer", "alpha", "zeta", "updated-only"],
  );
  assert.deepEqual(
    entries.map((entry) => entry.id),
    ["zeta", "alpha", "newer", "updated-only", "unpublished"],
  );
});

async function withTemporaryDirectory(
  run: (directory: string, directoryUrl: URL) => Promise<void>,
) {
  const directory = await mkdtemp(join(tmpdir(), "elliott-content-contract-"));

  try {
    await run(directory, pathToFileURL(`${directory}/`));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("Directory validation accepts a valid flat Markdown asset", async () => {
  await withTemporaryDirectory(async (directory, directoryUrl) => {
    await writeFile(
      join(directory, "valid-note.md"),
      '---\ntitle: Valid note\ndate: "2026-08-26"\nlang: en\n---\nBody.\n',
    );

    await assert.doesNotReject(() => validatePublishingDirectory(directoryUrl));
  });
});

test("Nested Markdown is discovered and fails instead of disappearing", async () => {
  await withTemporaryDirectory(async (directory, directoryUrl) => {
    await mkdir(join(directory, "nested"));
    await writeFile(
      join(directory, "nested", "note.md"),
      '---\ntitle: Nested\ndate: "2026-08-26"\nlang: en\n---\nBody.\n',
    );

    await assert.rejects(() => validatePublishingDirectory(directoryUrl));
  });
});

test("Directory validation rejects invalid raw names and bodies", async () => {
  await withTemporaryDirectory(async (directory, directoryUrl) => {
    await writeFile(
      join(directory, "Hello World.md"),
      '---\ntitle: Invalid ID\ndate: "2026-08-26"\nlang: en\n---\nBody.\n',
    );

    await assert.rejects(() => validatePublishingDirectory(directoryUrl));
  });

  await withTemporaryDirectory(async (directory, directoryUrl) => {
    await writeFile(
      join(directory, "image-only.md"),
      '---\ntitle: Image only\ndate: "2026-08-26"\nlang: en\n---\n![alt](image.png)\n',
    );

    await assert.rejects(() => validatePublishingDirectory(directoryUrl));
  });
});
