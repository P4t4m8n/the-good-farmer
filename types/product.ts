import {
  FRUIT_SUB_PRODUCT_TYPE,
  LEGUME_SUB_PRODUCT_TYPE,
  PRODUCT_TYPE,
  QUANTITY_TYPE,
  SEASONS,
  VEG_SUB_PRODUCT_TYPE,
} from "@/constants/products";
import { IEntity } from "./app";

export interface IProductSmall extends IEntity {
  name: string;
  imgUrl?: string;
  productType: TProductType;
  pricePerKilo: number;
  subProductType:
    | TVegSubProductType
    | TFruitSubProductType
    | TLegumeSubProductType;
  pricingDetails: IPricingDetails[];
  isAvailableForSale?: boolean;
}
export interface IProduct extends IProductSmall {
  productFamily?: string;
  season?: TSeason;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductFilter {
  name?: string;
  productType?: TProductType;
  subProductType?: string;
  limit?: number;
  skip?: number;
  isSmallProduct?: boolean;
  _id?: string;
  season?: TSeason | string;
  isAvailableForSale?: boolean | null;
}

export type TProductType = (typeof PRODUCT_TYPE)[number];

export type TVegSubProductType = (typeof VEG_SUB_PRODUCT_TYPE)[number];

export type TFruitSubProductType = (typeof FRUIT_SUB_PRODUCT_TYPE)[number];

export type TLegumeSubProductType = (typeof LEGUME_SUB_PRODUCT_TYPE)[number];

export type TSeason = (typeof SEASONS)[number];

export type TQuantityType = (typeof QUANTITY_TYPE)[number];

export interface IPricingDetails {
  type?: TQuantityType;
  weightPerType?: number;
  stock?: number;
  discount?: number;
}

export type TProductStyleMode = "page" | "cart";
export interface IProductStyleMode {
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
