declare type TOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

declare interface IOrder extends IEntity {
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
  amountOfProducts?: number;
  receiptNumber: string | null;
  userDetails: IUserDetails; //for who is the order. can be the user and the user can order for someone else
}

declare interface IUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

declare interface IOrderFilter {
  _id?: string;
  status?: TOrderStatus;
  userId?: string;
  fromDate?: string;
  toDate?: string;
  address?: IAddressBase;
  skip?: number;
  limit?: number;
}

declare type TDelivery = {
  date: string;
  time: string;
  day: string;
};

declare interface ICreditCard {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  orderId: string;
}

declare interface IOrderPayment {
  authNum: string | null;
  type: "credit card" | "cash" | "other";
  paymentDate: Date | null;
  email: string;
  cardHolder: string;
  status: TPaymentStatus;
}

type TPaymentStatus = "pending" | "approved" | "declined" | "refunded";
