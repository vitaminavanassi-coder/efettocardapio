export const HIDDEN_MENU_SLUGS = new Set([
  "dolce-gusto",
  "chocolate",
  "cereal",
  "leite-creme",
]);

export function isVisibleMenuSlug(slug: string) {
  return !HIDDEN_MENU_SLUGS.has(slug);
}
