import { useEffect, useState } from "react";
import { useCartItem } from "./useCartItem";

export const useProductBtn = (product: IProduct | IProductSmall) => {
  const productId = product._id!;
  const { cartItem, updateCart } = useCartItem(productId);

  const [quantityType, setQuantityType] = useState<
    IPricingDetails & { quantity: number }
  >({
    ...product.pricingDetails[0],
    quantity: cartItem?.quantity || 0,
  });

  useEffect(() => {
    if (cartItem) {
      const { quantityType: cartQuantityType, quantity } = cartItem;
      setQuantityType({ ...cartQuantityType, quantity });
    } else {
      setQuantityType({ ...product.pricingDetails[0], quantity: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

  const handleAmountChange = (dir: number) => {
    const amount = dir ? quantityType.quantity + dir : dir;
    if (amount >= 0) {
      updateCart(product as IProductSmall, quantityType, amount);
    }
  };
  const handleQuantityTypeChange = (qType: IPricingDetails) => {
    setQuantityType((prev) => ({ ...qType, amount: prev.quantity }));
    if (quantityType.quantity > 0) {
      updateCart(product as IProductSmall, qType, quantityType.quantity);
    }
  };
  const createQuantityTypeChangeHandler = (qType: IPricingDetails) => () => {
    handleQuantityTypeChange(qType);
  };

  return {
    quantityType,
    productId,
    handleAmountChange,
    createQuantityTypeChangeHandler,
  };
};
