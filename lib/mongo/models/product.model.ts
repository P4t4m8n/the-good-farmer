import { Document } from "mongodb";

type TSeason = "spring" | "summer" | "fall" | "winter" | "year-round";

interface INutrition {
  calories?: number; // double
  protein?: number; // double
  fat?: number; // double
  carbohydrates?: number; // double
  fiber?: number; // double
  vitamins?: string[]; // array of strings
  minerals?: string[]; // array of strings
}
export interface IProductDocument extends Document {
  name: string; // required
  imgsUrl?: string[]; // array of CDN urls
  family?: string; // string
  season?: TSeason; // enum
  productType: TProductType; // enum required
  subProductType?: string; // string
  description?: string; // string
  rating?: number; // int, 0-5
  quantityType?: IQuantityType[]; // array of objects
  nutrition?: INutrition; // nested object
}
