declare interface IProduct extends IEntity {
  name: string;
  imgsUrl?: string[];
  family?: string;
  season?: TSeason;
  productType: TProductType;
  subProductType:
    | TVegSubProductType
    | TFruitSubProductType
    | TLegumeSubProductType;
  description?: string;
  nutrition?: INutrition;
  quantity?: number;
  quantityType: IQuantityType[];
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface IProductSmall extends IEntity {
  name: string;
  imgUrl: string;
  productType: TProductType;
  subProductType:
    | TVegSubProductType
    | TFruitSubProductType
    | TLegumeSubProductType;
  quantityType: IQuantityType[];
}

declare interface INutrition {
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  fiber?: number;
  vitamins?: string[];
  minerals?: string[];
}

declare interface IProductFilter {
  name?: string;
  productType?: TProductType;
  subProductType?: string;
  limit?: number;
  skip?: number;
  isSmallProduct?: boolean;
  _id?: string;
}

// Duplicate the const declarations in constants/products.ts to avoid converting type files into modules
declare const PRODUCT_TYPE = [
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
declare type TProductType = (typeof PRODUCT_TYPE)[number];

// Duplicate the const declarations in constants/products.ts to avoid converting type files into modules
declare const VEG_SUB_PRODUCT_TYPE = [
  "garden vegetables",
  "greens",
  "tomatoes and peppers",
  "root vegetables",
  "onions and garlic",
  "mushrooms",
  "herbs",
  "sea vegetables",
] as const;
declare type TVegSubProductType = (typeof VEG_SUB_PRODUCT_TYPE)[number];

// Duplicate the const declarations in constants/products.ts to avoid converting type files into modules
declare const FRUIT_SUB_PRODUCT_TYPE = [
  "berries",
  "citrus",
  "tropical",
  "melons",
  "stone fruit",
  "apples and pears",
] as const;
declare type TFruitSubProductType = (typeof FRUIT_SUB_PRODUCT_TYPE)[number];

// Duplicate the const declarations in constants/products.ts to avoid converting type files into modules
declare const LEGUME_SUB_PRODUCT_TYPE = [
  "lentils",
  "peas",
  "beans",
  "other",
] as const;
declare type TLegumeSubProductType = (typeof LEGUME_SUB_PRODUCT_TYPE)[number];

// Duplicate the const declarations in constants/products.ts to avoid converting type files into modules
declare const SEASONS = [
  "spring",
  "summer",
  "fall",
  "winter",
  "year-round",
] as const;
declare type TSeason = (typeof SEASONS)[number];

// Duplicate the const declarations in constants/products.ts to avoid converting type files into modules
declare const QUANTITY_TYPE = [
  "lb",
  "oz",
  "g",
  "kg",
  "unit",
  "pack",
  "bunch",
] as const;
declare type TQuantityType = (typeof QUANTITY_TYPE)[number];

declare interface IQuantityType {
  type: TQuantityType;
  price: number;
  quantity: number;
  discount?: number;
}

declare type TProductStyleMode = "page" | "cart";
declare interface IProductStyleMode {
  container: string;
  radioBtns: {
    container: string;
    label: string;
  };
  price: string;
  btns: {
    container: string;
    span: string;
    svgSize?: number;
  };
}
