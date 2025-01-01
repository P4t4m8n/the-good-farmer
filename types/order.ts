import { IAddress } from "./address.types";
import { IEntity } from "./app";
import { ICartItem } from "./cart";
import { IUser } from "./user";

export type TOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrder extends IEntity {
  user: IUser; //The user who made the order
  address: IAddress | null;
  deliveryDate: Date;
  productsPrice: number;
  deliveryPrice: number;
  status: TOrderStatus;
  products: ICartItem[];
  createdAt?: Date;
  updatedAt?: Date;
  payment: IOrderPayment;
  receiptNumber: string | null;
  userDetails: IUserDetails; //for who is the order. can be the user and the user can order for someone else
}

export interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IOrderFilter {
  status?: TOrderStatus;
}

export type TDelivery = {
  date: string;
  time: string;
  day: string;
};

export interface ICreditCard {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  orderId: string;
}

export interface IOrderPayment {
  authNum: string | null;
  type: "credit card" | "cash" | "other";
  paymentDate: Date | null;
  email: string;
  cardHolder: string;
  status: TPaymentStatus;
}

type TPaymentStatus = "pending" | "approved" | "declined" | "refunded";
