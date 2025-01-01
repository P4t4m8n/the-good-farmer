import { IOrderPayment, IUserDetails, TOrderStatus } from "@/types/order";
import { TQuantityType } from "@/types/product";
import { Document, ObjectId } from "mongodb";

export interface IOrderDocument extends Document {
  userId: ObjectId; // required
  addressId: ObjectId; // required
  productsPrice: number; // double
  deliveryPrice: number; // double
  deliveryDate?: Date; // date
  isDelivered: boolean; // boolean
  products: IOrderItem[]; // required
  status: TOrderStatus; // enum
  payment: IOrderPayment; // required
  userDetails: IUserDetails; // required
}

export interface IOrderDtoCreate {
  userId: ObjectId;
  addressId: ObjectId;
  products: IOrderItem[];
  productsPrice: number;
  deliveryPrice: number;
  deliveryDate: Date;
  status: TOrderStatus;
  payment: IOrderPayment;
  userDetails: IUserDetails;
  isDelivered: boolean; // boolean
}

interface IOrderItem {
  productId: ObjectId;
  quantity: number; // int , minimum 1
  quantityType: TQuantityType; // enum
  totalPrice: number; // double minimum 0
}
