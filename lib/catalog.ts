export type CatalogCategory =
  | "Aguas e sucos"
  | "Cafes"
  | "Chocolates"
  | "Chas"
  | "Snacks";

export type CatalogItemSeed = {
  slug: string;
  name: string;
  category: CatalogCategory;
  description: string;
  lowStockThreshold: number;
  startingInventory: number;
};

export const initialCatalog: CatalogItemSeed[] = [
  {
    slug: "agua-com-gas",
    name: "Agua com gas",
    category: "Aguas e sucos",
    description: "Agua mineral com gas gelada.",
    lowStockThreshold: 4,
    startingInventory: 12,
  },
  {
    slug: "agua-sem-gas",
    name: "Agua sem gas",
    category: "Aguas e sucos",
    description: "Agua mineral sem gas gelada.",
    lowStockThreshold: 4,
    startingInventory: 12,
  },
  {
    slug: "agua-de-coco",
    name: "Agua de coco",
    category: "Aguas e sucos",
    description: "Bebida leve e refrescante.",
    lowStockThreshold: 3,
    startingInventory: 10,
  },
  {
    slug: "suco-laranja",
    name: "Suco laranja",
    category: "Aguas e sucos",
    description: "Suco de laranja pronto para servir.",
    lowStockThreshold: 3,
    startingInventory: 10,
  },
  {
    slug: "agua-saborizada-abacaxi-hortela",
    name: "Agua saborizada abacaxi e hortela",
    category: "Aguas e sucos",
    description: "Agua saborizada com toque tropical e fresco.",
    lowStockThreshold: 3,
    startingInventory: 8,
  },
  {
    slug: "agua-saborizada-limao-alegria",
    name: "Agua saborizada limao e alegria",
    category: "Aguas e sucos",
    description: "Agua saborizada citrica para refrescar.",
    lowStockThreshold: 3,
    startingInventory: 8,
  },
  {
    slug: "agua-saborizada-bergamota-capim-limao",
    name: "Agua saborizada bergamota e capim limao",
    category: "Aguas e sucos",
    description: "Agua saborizada aromatica e leve.",
    lowStockThreshold: 3,
    startingInventory: 8,
  },
  {
    slug: "agua-saborizada-pessego",
    name: "Agua saborizada pessego",
    category: "Aguas e sucos",
    description: "Agua saborizada com notas suaves de pessego.",
    lowStockThreshold: 3,
    startingInventory: 8,
  },
  {
    slug: "agua-saborizada-frutas-vermelhas",
    name: "Agua saborizada frutas vermelhas",
    category: "Aguas e sucos",
    description: "Agua saborizada frutada e delicada.",
    lowStockThreshold: 3,
    startingInventory: 8,
  },
  {
    slug: "chocolate-quente",
    name: "Chocolate quente",
    category: "Cafes",
    description: "Bebida cremosa e reconfortante.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "cappuccino",
    name: "Cappuccino",
    category: "Cafes",
    description: "Cafe cremoso com espuma suave.",
    lowStockThreshold: 4,
    startingInventory: 12,
  },
  {
    slug: "cafe-au-lait",
    name: "Cafe au lait",
    category: "Cafes",
    description: "Cafe com leite em estilo classico.",
    lowStockThreshold: 4,
    startingInventory: 12,
  },
  {
    slug: "mochaccino-canela",
    name: "Mochaccino canela",
    category: "Cafes",
    description: "Mochaccino com toque de canela.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "mochaccino-avela",
    name: "Mochaccino avela",
    category: "Cafes",
    description: "Mochaccino com sabor de avela.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "expresso",
    name: "Expresso",
    category: "Cafes",
    description: "Cafe intenso e encorpado.",
    lowStockThreshold: 4,
    startingInventory: 16,
  },
  {
    slug: "lacreme-ao-leite",
    name: "Lacreme ao leite",
    category: "Chocolates",
    description: "Chocolate LaCreme ao leite.",
    lowStockThreshold: 4,
    startingInventory: 12,
  },
  {
    slug: "lacreme-branco",
    name: "Lacreme branco",
    category: "Chocolates",
    description: "Chocolate LaCreme branco.",
    lowStockThreshold: 4,
    startingInventory: 12,
  },
  {
    slug: "chocolate-menta",
    name: "Chocolate menta",
    category: "Chocolates",
    description: "Chocolate com toque refrescante de menta.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "chocolate-70-cacau",
    name: "Chocolate 70% cacau",
    category: "Chocolates",
    description: "Chocolate intenso com 70% cacau.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "bombons",
    name: "Bombons",
    category: "Chocolates",
    description: "Selecao de bombons para servir.",
    lowStockThreshold: 5,
    startingInventory: 16,
  },
  {
    slug: "pistache",
    name: "Pistache",
    category: "Chocolates",
    description: "Chocolate sabor pistache.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "ao-leite",
    name: "Ao leite",
    category: "Chocolates",
    description: "Chocolate classico ao leite.",
    lowStockThreshold: 4,
    startingInventory: 12,
  },
  {
    slug: "balas",
    name: "Balas",
    category: "Snacks",
    description: "Balas embaladas para atendimento rapido.",
    lowStockThreshold: 6,
    startingInventory: 24,
  },
  {
    slug: "chas",
    name: "Chas",
    category: "Chas",
    description: "Selecao de chas da clinica.",
    lowStockThreshold: 5,
    startingInventory: 20,
  },
  {
    slug: "peppermint-celestial",
    name: "Peppermint - marca Celestial",
    category: "Chas",
    description: "Cha peppermint da marca Celestial.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "true-blueberry-celestial",
    name: "True blueberry - marca Celestial",
    category: "Chas",
    description: "Cha true blueberry da marca Celestial.",
    lowStockThreshold: 4,
    startingInventory: 10,
  },
  {
    slug: "barra-cereal-avela-chocolate",
    name: "Barra de cereal avela com chocolate",
    category: "Snacks",
    description: "Barra de cereal com avela e chocolate.",
    lowStockThreshold: 4,
    startingInventory: 14,
  },
  {
    slug: "barra-cereal-castanha-caju",
    name: "Barra de cereal castanha de caju",
    category: "Snacks",
    description: "Barra de cereal com castanha de caju.",
    lowStockThreshold: 4,
    startingInventory: 14,
  },
];

export const catalogCategories = Array.from(
  new Set(initialCatalog.map((item) => item.category)),
);
