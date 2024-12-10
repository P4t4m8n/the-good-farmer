"use client";

import { useCartItem } from "@/hooks/useCartItem";
import { memo, useEffect, useState } from "react";
import QuantityType from "./QuantityType";
import AmountChange from "./AmountChange";
import { iconService } from "@/components/Icons/Icons";

interface Props {
  productSmall: IProductSmall;
  styleMode: "page" | "cart";
}

const ProductBtn = memo(function ProductBtn({
  productSmall,
  styleMode,
}: Props) {
  const productId = productSmall._id!;
  const { cartItem, updateCart } = useCartItem(productId);

  const [quantityType, setQuantityType] = useState<
    IQuantityType & { quantity: number }
  >({
    ...productSmall.quantityType[0],
    quantity: cartItem?.quantity || 0,
  });

  useEffect(() => {
    if (cartItem) {
      const { quantityType: cartQuantityType, quantity } = cartItem;
      setQuantityType({ ...cartQuantityType, quantity });
    } else {
      setQuantityType({ ...productSmall.quantityType[0], quantity: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

  const handleAmountChange = (dir: number) => {
    const amount = dir ? quantityType.quantity + dir : dir;
    if (amount >= 0) {
      updateCart(productSmall, quantityType, amount);
    }
  };
  const handleQuantityTypeChange = (qType: IQuantityType) => {
    setQuantityType((prev) => ({ ...qType, amount: prev.quantity }));
    if (quantityType.quantity > 0) {
      updateCart(productSmall, qType, quantityType.quantity);
    }
  };
  const createQuantityTypeChangeHandler = (qType: IQuantityType) => () => {
    handleQuantityTypeChange(qType);
  };

  const style =
    styleMode === "page" ? PRODUCT_BTN_PAGE_STYLE : PRODUCT_BTN_CART_STYLE;

  return (
    <div className={style.container}>
      <QuantityType
        style={style.radioBtns}
        quantityTypes={productSmall.quantityType}
        quantityType={quantityType}
        productId={productId}
        createQuantityTypeChangeHandler={createQuantityTypeChangeHandler}
      />

      <h3 className={style.price}>
        $
        {quantityType.price -
          (quantityType?.discount
            ? quantityType?.price / quantityType?.discount
            : 0)}
      </h3>

      <AmountChange
        style={style.btns}
        amount={quantityType.quantity}
        handleAmountChange={handleAmountChange}
      />

      {styleMode === "cart" && (
        <button
          onClick={(ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            handleAmountChange(0);
          }}
          className="w-4 h-4 fill-dark-text dark:fill-light-text"
        >
          {iconService.DeleteSvg()}
        </button>
      )}
    </div>
  );
});

export default ProductBtn;

// Module imports cause Tailwind to ignore classes, so the constants are defined here
const PRODUCT_BTN_PAGE_STYLE: IProductStyleMode = {
  container:
    "grid gap-4 bg-light-bg dark:bg-dark-bg text-dark-text dark:text-light-text",
  radioBtns: {
    container: "flex gap-2 border rounded-3xl bg-inherit p-1",
    label:
      "peer rounded-3xl cursor-pointer py-1 px-2 text-sm font-semibold font-text",
  },
  price: "text-center text-lg font-title",
  btns: {
    container: "flex items-center justify-center gap-4 text-center font-text",
    span: "text-lg",
  },
};
const PRODUCT_BTN_CART_STYLE: IProductStyleMode = {
  container: "flex gap-4 ",
  radioBtns: {
    container: "flex gap-2 border rounded-3xl bg-inherit p-1",
    label:
      "peer rounded-3xl cursor-pointer py-1 px-1 text-sm font-semibold font-text",
  },
  price: "hidden",
  btns: {
    container:
      "flex items-center justify-center gap-4 text-center font-text h-4 w-12",
    span: "",
    svgSize: 4,
  },
};
