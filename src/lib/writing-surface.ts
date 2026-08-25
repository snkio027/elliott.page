import {
  orderPublicEntries,
  publishingPathFor,
  type PublishingEntry,
} from "../content/content-contract.ts";

type WritingLanguage = PublishingEntry["data"]["lang"];

export function requirePublicWriting<TEntry extends PublishingEntry>(
  entries: readonly TEntry[],
) {
  const ordered = orderPublicEntries(entries);

  if (ordered.length === 0) {
    throw new Error(
      "The active Writing surface requires at least one eligible entry",
    );
  }

  return ordered;
}

export function writingPathFor(stableId: string) {
  return publishingPathFor("writing", stableId);
}

export function formatWritingDate(value: string, lang: WritingLanguage) {
  return new Intl.DateTimeFormat(lang, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export function writingDateLabels(lang: WritingLanguage) {
  return lang === "zh-CN"
    ? { published: "发布于", updated: "更新于" }
    : { published: "Published", updated: "Updated" };
}
