import { ICartItem } from "@/types/cart";

const calculateProductsPrice = (products: ICartItem[]): number => {
  return products.reduce((acc, item) => acc + item.totalPrice, 0);
};

export const orderClientService = {
  calculateProductsPrice,
};
