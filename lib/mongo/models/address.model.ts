import { ObjectId } from "mongodb";

interface IStreet {
  name: string;
  number: string;
  floor?: string;
  entrance?: string;
  apartment?: string;
}
export interface IAddressDocument extends Document {
  street: IStreet; // required
  city: string; // required
  state?: string;
  zipCode?: string;
  country: string; 
  userId: ObjectId; // required
}

export interface IAddressDtoCreate extends IAddressBase {
  userId: ObjectId;
}
export interface IAddressDtoUpdate extends IAddressBase {
  _id: ObjectId;
  userId: ObjectId;
}
