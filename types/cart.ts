import { IPricingDetails, IProductSmall } from "./product";

export interface ICartItem {
  product: IProductSmall;
  pricingDetails: IPricingDetails;
  quantity: number;
  totalPrice: number;
}
