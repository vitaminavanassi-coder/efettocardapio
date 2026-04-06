const PRODUCT_IMAGE_SLUGS = new Set([
  "agua-com-gas",
  "agua-sem-gas",
  "agua-de-coco",
  "suco-laranja",
  "agua-saborizada-abacaxi-hortela",
  "agua-saborizada-limao-alegria",
  "agua-saborizada-bergamota-capim-limao",
  "agua-saborizada-pessego",
  "agua-saborizada-frutas-vermelhas",
  "cappuccino",
  "chocolate-quente",
  "cafe-au-lait",
  "mochaccino-canela",
  "mochaccino-avela",
  "expresso",
  "lacreme-ao-leite",
  "lacreme-branco",
  "chocolate-menta",
  "chocolate-70-cacau",
  "bombons",
  "pistache",
  "ao-leite",
  "balas",
  "chas",
  "peppermint-celestial",
  "true-blueberry-celestial",
  "barra-cereal-avela-chocolate",
  "barra-cereal-castanha-caju",
]);

export function getProductImagePath(slug: string) {
  if (!PRODUCT_IMAGE_SLUGS.has(slug)) {
    return null;
  }

  return `/products/${slug}.webp`;
}
