import assert from "node:assert/strict";
import test from "node:test";

import { notesSchema } from "../src/content/content-contract.ts";
import {
  formatNoteDate,
  noteDateLabels,
  notesPathFor,
  requirePublicNotes,
} from "../src/lib/notes-surface.ts";
import { primaryNavigationState } from "../src/lib/primary-navigation.ts";

const baseMetadata = {
  title: "A durable note title",
  date: "2026-08-26",
  lang: "en" as const,
};

test("The Notes surface consumes Phase 2.1 eligibility and ordering", () => {
  const entries = [
    {
      id: "zeta",
      data: notesSchema.parse({ ...baseMetadata, draft: false }),
    },
    {
      id: "alpha",
      data: notesSchema.parse({ ...baseMetadata, draft: false }),
    },
    {
      id: "newer",
      data: notesSchema.parse({
        ...baseMetadata,
        date: "2026-08-27",
        draft: false,
      }),
    },
    {
      id: "unpublished",
      data: notesSchema.parse({ ...baseMetadata, draft: true }),
    },
  ];

  assert.deepEqual(
    requirePublicNotes(entries).map((entry) => entry.id),
    ["newer", "alpha", "zeta"],
  );
  assert.deepEqual(
    entries.map((entry) => entry.id),
    ["zeta", "alpha", "newer", "unpublished"],
  );
});

test("An active Notes surface fails closed with zero eligible entries", () => {
  const draft = {
    id: "unpublished",
    data: notesSchema.parse({ ...baseMetadata, draft: true }),
  };

  assert.throws(() => requirePublicNotes([draft]), /at least one eligible/);
});

test("Notes URL identity is independent of the authored title", () => {
  const stableId = "tools-and-judgment";
  const original = { id: stableId, title: "工具与判断" };
  const renamed = { id: stableId, title: "自动化与人的决定" };

  assert.notEqual(original.title, renamed.title);
  assert.equal(notesPathFor(original.id), "/notes/tools-and-judgment/");
  assert.equal(notesPathFor(renamed.id), notesPathFor(original.id));
});

test("Notes dates preserve the authored day and item language", () => {
  assert.equal(formatNoteDate("2026-08-26", "en"), "August 26, 2026");
  assert.equal(formatNoteDate("2026-08-26", "zh-CN"), "2026年8月26日");
  assert.deepEqual(noteDateLabels("en"), {
    published: "Published",
    updated: "Updated",
  });
  assert.deepEqual(noteDateLabels("zh-CN"), {
    published: "发布于",
    updated: "更新于",
  });
});

test("Writing and Notes preserve exact primary-navigation current semantics", () => {
  const cases = [
    ["/", "home", "page"],
    ["/writing/", "writing", "page"],
    ["/writing/why-i-built-elliott-page/", "writing", "location"],
    ["/notes/", "notes", "page"],
    ["/notes/tools-and-judgment/", "notes", "location"],
    ["/about/", "about", "page"],
    ["/now/", "now", "page"],
  ] as const;

  for (const [pathname, key, value] of cases) {
    const state = primaryNavigationState(pathname);
    const current = Object.entries(state).filter(([, entry]) => entry);

    assert.deepEqual(current, [[key, value]]);
  }

  assert.deepEqual(
    Object.values(primaryNavigationState("/not-real/")).filter(Boolean),
    [],
  );
});
