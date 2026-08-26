import type { PublishingEntry } from "../content/content-contract.ts";

export type PublishingLanguage = PublishingEntry["data"]["lang"];

export function formatPublishingDate(value: string, lang: PublishingLanguage) {
  return new Intl.DateTimeFormat(lang, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

export function publishingDateLabels(lang: PublishingLanguage) {
  return lang === "zh-CN"
    ? { published: "发布于", updated: "更新于" }
    : { published: "Published", updated: "Updated" };
}
