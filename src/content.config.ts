import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import {
  notesSchema,
  publishingMarkdownLoader,
  writingSchema,
} from "./content/content-contract.ts";

const nonEmptyString = z.string().trim().min(1);
const language = z.enum(["en", "zh-CN"]);
const draft = z.boolean().default(true);
const dateOnlyString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "updated must use YYYY-MM-DD")
  .refine(
    (value) => {
      const parsed = new Date(`${value}T00:00:00.000Z`);

      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
      );
    },
    { error: "updated must be a valid calendar date" },
  );

const writing = defineCollection({
  loader: publishingMarkdownLoader("./src/content/writing"),
  schema: writingSchema,
});

const notes = defineCollection({
  loader: publishingMarkdownLoader("./src/content/notes"),
  schema: notesSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z
    .object({
      title: nonEmptyString,
      description: nonEmptyString.optional(),
      updated: dateOnlyString.optional(),
      lang: language,
      draft,
    })
    .strict(),
});

export const collections = { writing, notes, pages };
