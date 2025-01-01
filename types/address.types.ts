import { Document } from "mongodb";
import { IEntity } from "./app";

export interface IAddressBase {
  city: string;
  streetName: string;
  number: string;
  floor?: string;
  entrance?: string;
  apartment?: string;
  state?: string;
  zipCode?: string;
  country: string;
}
export interface IAddress extends IEntity, IAddressBase {
  userId: string;
}

export interface IAddressDocument extends Document, IAddressBase {}

export interface IAddressFilter {
  city?: string;
  userId?: string;
}
