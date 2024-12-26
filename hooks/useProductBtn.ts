import { useEffect, useState } from "react";
import { useCartItem } from "./useCartItem";

export const useProductBtn = (product: IProduct | IProductSmall) => {
  const productId = product._id!;
  const { cartItem, updateCart } = useCartItem(productId);

  const [pricingDetails, setPricingDetails] = useState<
    IPricingDetails & { quantity: number }
  >({
    ...product.pricingDetails[0],
    quantity: cartItem?.quantity || 0,
  });

  useEffect(() => {
    if (cartItem) {
      const { pricingDetails: cartQuantityType, quantity } = cartItem;
      setPricingDetails({ ...cartQuantityType, quantity });
    } else {
      setPricingDetails({ ...product.pricingDetails[0], quantity: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

  const handleAmountChange = (dir: number) => {
    const amount = dir ? pricingDetails.quantity + dir : dir;
    if (amount >= 0) {
      updateCart(product as IProductSmall, pricingDetails, amount);
    }
  };
  const handleQuantityTypeChange = (qType: IPricingDetails) => {
    setPricingDetails((prev) => ({ ...qType, quantity: prev?.quantity }));
    if (pricingDetails.quantity > 0) {
      updateCart(product as IProductSmall, qType, pricingDetails.quantity);
    }
  };
  const createQuantityTypeChangeHandler = (qType: IPricingDetails) => () => {
    handleQuantityTypeChange(qType);
  };

  return {
    pricingDetails,
    productId,
    handleAmountChange,
    createQuantityTypeChangeHandler,
  };
};
