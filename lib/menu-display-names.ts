const DISPLAY_NAME_BY_SLUG: Record<string, string> = {
  "peppermint-celestial": "Cha Peppermint",
  "true-blueberry-celestial": "Cha True Blueberry",
};

export function getMenuDisplayName(slug: string, fallbackName: string) {
  return DISPLAY_NAME_BY_SLUG[slug] ?? fallbackName;
}
