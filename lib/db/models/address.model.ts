import { IAddressBase } from "@/types/address.types";
import { ObjectId } from "mongodb";

export interface IAddressDocument extends Document, IAddressBase {}

export interface IAddressDtoCreate extends IAddressBase {
  userId: ObjectId;
}
export interface IAddressDtoUpdate extends IAddressBase {
  _id: ObjectId;
  userId: ObjectId;
}
