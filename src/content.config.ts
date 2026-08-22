import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const nonEmptyString = z.string().trim().min(1);
const language = z.enum(["en", "zh-CN"]);
const tags = z.array(nonEmptyString).default([]);
const draft = z.boolean().default(true);

const datedContent = {
  title: nonEmptyString,
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags,
  lang: language,
  draft,
};

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z
    .object(datedContent)
    .strict()
    .refine(({ date, updated }) => !updated || updated >= date, {
      error: "updated must not be earlier than date",
      path: ["updated"],
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z
    .object({
      title: nonEmptyString,
      description: nonEmptyString.optional(),
      updated: z.coerce.date().optional(),
      lang: language,
      draft,
    })
    .strict(),
});

export const collections = { writing, notes, pages };
