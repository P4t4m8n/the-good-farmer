import xss from "xss";
import { ObjectId } from "mongodb";
import { IOrderDtoCreate } from "@/lib/mongo/models/order.model";

const getEmpty = (user: IUser): IOrder => {
  return {
    user: user,
    status: "pending",
    address: null,
    receiptNumber: null,
    deliveryDate: new Date(),
    productsPrice: 0,
    deliveryPrice: 0,
    products: [],
    userDetails: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone || "",
    },
    payment: getEmptyPayment(),
  };
};
const getEmptyPayment = (): IOrderPayment => {
  return {
    authNum: null,
    type: "credit card",
    paymentDate: null,
    email: "",
    cardHolder: "",
    status: "pending",
  };
};
const formDataToCreditCard = (formData: FormData): ICreditCard => {
  const cardNumber = xss(formData.get("cardNumber")?.toString() || "");
  const cardHolder = xss(formData.get("cardHolder")?.toString() || "");
  const expiryDate = xss(formData.get("expiryDate")?.toString() || "");
  const cvv = xss(formData.get("cvv")?.toString() || "");
  const orderId = xss(formData.get("orderId")?.toString() || "");

  return {
    cardNumber,
    cardHolder,
    expiryDate,
    cvv,
    orderId,
  };
};
const fromDataToOrderDto = (
  formData: FormData,
  products: ICartItem[]
): IOrderDtoCreate => {
  const userId = new ObjectId(xss(formData.get("userId")?.toString() || ""));
  const addressId = new ObjectId(
    xss(formData.get("addressId")?.toString().split(",")[0] || "")
  );
  console.log("addressId:", addressId);
  const deliveryDate = new Date(
    xss(formData.get("deliveryDate")?.toString() || "")
  );
  const productsPrice = +xss(formData.get("productsPrice")?.toString() || "");
  const deliveryPrice = +xss(formData.get("deliveryPrice")?.toString() || "");
  const status = "pending";
  const userDetails = {
    firstName: xss(formData.get("firstName")?.toString() || ""),
    lastName: xss(formData.get("lastName")?.toString() || ""),
    email: xss(formData.get("email")?.toString() || ""),
    phone: xss(formData.get("phone")?.toString() || ""),
  };
  const orderItems = products.map((product) => {
    return {
      productId: new ObjectId(product.product._id),
      quantityType: product.pricingDetails.type as TQuantityType,
      quantity: product.quantity,
      totalPrice: product.totalPrice,
    };
  });

  return {
    userId,
    addressId,
    productsPrice,
    deliveryPrice,
    deliveryDate,
    isDelivered: false,
    status,
    products: orderItems,
    userDetails,
    payment: getEmptyPayment(),
  };
};

export const orderServerService = {
  getEmpty,
  formDataToCreditCard,
  fromDataToOrderDto,
  getEmptyPayment,
};
