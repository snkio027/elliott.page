const levelOneHeading =
  /(^|\n)(?: {0,3}#(?:[\t ]+|$)| {0,3}=+[\t ]*(?:\n|$)|\s*<h1(?:[\t >]|$))/i;

export function validateIdentityPageBody(
  entryId: "about" | "now",
  body: string | undefined,
): asserts body is string {
  if (!body?.trim()) {
    throw new Error(`pages/${entryId} must contain non-empty Markdown body`);
  }

  if (levelOneHeading.test(body)) {
    throw new Error(
      `pages/${entryId} body must not contain a level-one heading; the route owns the h1`,
    );
  }
}
