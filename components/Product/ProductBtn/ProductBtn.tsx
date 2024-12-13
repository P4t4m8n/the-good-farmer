"use client";

import QuantityTypeComponent from "./QuantityTypeComponent";
import AmountChange from "./AmountChange";
import { iconService } from "@/components/Icons/Icons";
import { useProductBtn } from "@/hooks/useProductBtn";

interface Props {
  productSmall: IProductSmall;
  styleMode: "page" | "cart";
}

export default function ProductBtn({ productSmall, styleMode }: Props) {
  const {
    quantityType,
    handleAmountChange,
    createQuantityTypeChangeHandler,
    productId,
  } = useProductBtn(productSmall);

  const style =
    styleMode === "page" ? PRODUCT_BTN_PAGE_STYLE : PRODUCT_BTN_CART_STYLE;

  return (
    <div className={style.container}>
      <QuantityTypeComponent
        style={style.radioBtns}
        quantityTypes={productSmall.quantityType}
        quantityType={quantityType}
        productId={productId}
        createQuantityTypeChangeHandler={createQuantityTypeChangeHandler}
      />

      <PriceCmp
        price={quantityType?.price}
        discount={quantityType?.discount}
        style={style.price}
      />

      <AmountChange
        style={style.btns}
        amount={quantityType.quantity}
        handleAmountChange={handleAmountChange}
      />

      {styleMode === "cart" && (
        <DeleteItemBtn
          handleAmountChange={handleAmountChange}
          style={style.deleteBtn}
        />
      )}
    </div>
  );
}

function PriceCmp({
  price,
  style,
  discount,
}: {
  price: number;
  style: string;
  discount?: number;
}) {
  return (
    <h3 className={style}>${price * (discount ? 1 - discount / 100 : 1)}</h3>
  );
}
function DeleteItemBtn({
  handleAmountChange,
  style,
}: {
  handleAmountChange: (amount: number) => void;
  style: string;
}) {
  return (
    <button
      onClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        handleAmountChange(0);
      }}
      className={style}
    >
      {iconService.DeleteSvg()}
    </button>
  );
}

// Module imports cause Tailwind to ignore classes because Tailwind CSS scans the source files for class names during the build process.
// If the class names are dynamically generated or imported from another module, Tailwind cannot detect and include them in the final CSS.

const PRODUCT_BTN_PAGE_STYLE = {
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
  deleteBtn: "w-4 h-4 fill-dark-text dark:fill-light-text",
};
const PRODUCT_BTN_CART_STYLE = {
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
  deleteBtn: "w-4 h-4 fill-dark-text dark:fill-light-text",
};
