import { IPricingDetails, TProductType } from "@/types/product";
import { Document, ObjectId } from "mongodb";

type TSeason = "spring" | "summer" | "fall" | "winter" | "year-round" | "none";

// interface INutrition {
//   calories?: number; // double
//   protein?: number; // double
//   fat?: number; // double
//   carbohydrates?: number; // double
//   fiber?: number; // double
//   vitamins?: string[]; // array of strings
//   minerals?: string[]; // array of strings
// }
export interface IProductDocument extends Document {
  _id?: ObjectId; // string
  name: string; // required
  imgUrl?: string; // string of CDN url
  productFamily: string; // string
  season?: TSeason; // enum
  productType: TProductType; // enum required
  subProductType?: string; // string
  description?: string; // string
  rating?: number; // int, 0-5
  pricePerKilo: number; // double required
  pricingDetails: IPricingDetails[]; // array of objects
  isAvailableForSale?: boolean; // boolean
}
