// Duplicate the const declarations in products.d.ts to avoid converting type files into modules
export const PRODUCT_TYPE = [
  "vegetable",
  "fruit",
  "herb",
  "root",
  "legume",
  "nut",
  "spice",
  "sea vegetables",
  "mushrooms",
  "grocery",
  "dairy",
  "other",
] as const;

// Duplicate the const declarations in products.d.ts to avoid converting type files into modules
export const VEG_SUB_PRODUCT_TYPE = [
  "garden vegetables",
  "greens",
  "tomatoes and peppers",
  "root vegetables",
  "onions and garlic",
  "mushrooms",
  "herbs",
  "sea vegetables",
] as const;

// Duplicate the const declarations in products.d.ts to avoid converting type files into modules
export const FRUIT_SUB_PRODUCT_TYPE = [
  "berries",
  "citrus",
  "tropical",
  "melons",
  "stone fruit",
  "apples and pears",
] as const;

// Duplicate the const declarations in products.d.ts to avoid converting type files into modules
export const LEGUME_SUB_PRODUCT_TYPE = [
  "lentils",
  "peas",
  "beans",
  "other",
] as const;

// Duplicate the const declarations in products.d.ts to avoid converting type files into modules
export const SEASONS = [
  "spring",
  "summer",
  "fall",
  "winter",
  "year-round",
] as const;

// Duplicate the const declarations in products.d.ts to avoid converting type files into modules
export const QUANTITY_TYPE = [
  "lb",
  "oz",
  "g",
  "kg",
  "unit",
  "pack",
  "bunch",
] as const;
