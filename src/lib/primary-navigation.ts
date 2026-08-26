type CurrentValue = "page" | "location" | undefined;

export interface PrimaryNavigationState {
  home: CurrentValue;
  writing: CurrentValue;
  notes: CurrentValue;
  about: CurrentValue;
  now: CurrentValue;
}

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

function sectionCurrent(
  currentPath: string,
  sectionPath: "/writing" | "/notes",
): CurrentValue {
  if (currentPath === sectionPath) return "page";
  if (currentPath.startsWith(`${sectionPath}/`)) return "location";

  return undefined;
}

export function primaryNavigationState(
  pathname: string,
): PrimaryNavigationState {
  const currentPath = normalizePathname(pathname);

  return {
    home: currentPath === "/" ? "page" : undefined,
    writing: sectionCurrent(currentPath, "/writing"),
    notes: sectionCurrent(currentPath, "/notes"),
    about: currentPath === "/about" ? "page" : undefined,
    now: currentPath === "/now" ? "page" : undefined,
  };
}
