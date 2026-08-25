import assert from "node:assert/strict";
import test from "node:test";

import { writingSchema } from "../src/content/content-contract.ts";
import {
  formatWritingDate,
  requirePublicWriting,
  writingDateLabels,
  writingPathFor,
} from "../src/lib/writing-surface.ts";

const baseMetadata = {
  title: "A durable title",
  date: "2026-08-26",
  lang: "en" as const,
};

test("The Writing surface consumes Phase 2.1 eligibility and ordering", () => {
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
      id: "unpublished",
      data: writingSchema.parse({ ...baseMetadata, draft: true }),
    },
  ];

  assert.deepEqual(
    requirePublicWriting(entries).map((entry) => entry.id),
    ["newer", "alpha", "zeta"],
  );
  assert.deepEqual(
    entries.map((entry) => entry.id),
    ["zeta", "alpha", "newer", "unpublished"],
  );
});

test("An active Writing surface fails closed with zero eligible entries", () => {
  const draft = {
    id: "unpublished",
    data: writingSchema.parse({ ...baseMetadata, draft: true }),
  };

  assert.throws(() => requirePublicWriting([draft]), /at least one eligible/);
});

test("Writing URL identity is independent of the authored title", () => {
  const stableId = "why-i-built-elliott-page";
  const original = { id: stableId, title: "Why I Built Elliott.page" };
  const renamed = { id: stableId, title: "Why I Keep a Personal Page" };

  assert.notEqual(original.title, renamed.title);
  assert.equal(
    writingPathFor(original.id),
    "/writing/why-i-built-elliott-page/",
  );
  assert.equal(writingPathFor(renamed.id), writingPathFor(original.id));
});

test("Writing dates preserve the authored day and item language", () => {
  assert.equal(formatWritingDate("2026-08-26", "en"), "August 26, 2026");
  assert.equal(formatWritingDate("2026-08-26", "zh-CN"), "2026年8月26日");
  assert.deepEqual(writingDateLabels("en"), {
    published: "Published",
    updated: "Updated",
  });
  assert.deepEqual(writingDateLabels("zh-CN"), {
    published: "发布于",
    updated: "更新于",
  });
});
