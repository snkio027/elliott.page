import {
  orderPublicEntries,
  publishingPathFor,
  type PublishingEntry,
} from "../content/content-contract.ts";

export {
  formatPublishingDate as formatNoteDate,
  publishingDateLabels as noteDateLabels,
} from "./publishing-presentation.ts";

export function requirePublicNotes<TEntry extends PublishingEntry>(
  entries: readonly TEntry[],
) {
  const ordered = orderPublicEntries(entries);

  if (ordered.length === 0) {
    throw new Error(
      "The active Notes surface requires at least one eligible entry",
    );
  }

  return ordered;
}

export function notesPathFor(stableId: string) {
  return publishingPathFor("notes", stableId);
}
