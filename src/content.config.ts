import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const nonEmptyString = z.string().trim().min(1);
const language = z.enum(["en", "zh-CN"]);
const tags = z.array(nonEmptyString).default([]);
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

const datedContent = {
  title: nonEmptyString,
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags,
  lang: language,
  draft,
};

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z
    .object({
      ...datedContent,
      description: nonEmptyString,
    })
    .strict()
    .refine(({ date, updated }) => !updated || updated >= date, {
      error: "updated must not be earlier than date",
      path: ["updated"],
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z
    .object(datedContent)
    .strict()
    .refine(({ date, updated }) => !updated || updated >= date, {
      error: "updated must not be earlier than date",
      path: ["updated"],
    }),
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
