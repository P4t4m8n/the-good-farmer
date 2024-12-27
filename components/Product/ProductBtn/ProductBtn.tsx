"use client";

import { iconService } from "@/components/Icons/Icons";
import { useProductBtn } from "@/hooks/useProductBtn";

import QuantityTypeComponent from "./QuantityTypeComponent";
import AmountChange from "./AmountChange";
import PriceCmp from "./PriceCmp";
import Button from "@/components/General/Button";

interface Props {
  productSmall: IProductSmall;
  styleMode: TStyleMode;
}

export default function ProductBtn({ productSmall, styleMode }: Props) {
  const {
    pricingDetails,
    handleAmountChange,
    createQuantityTypeChangeHandler,
    productId,
  } = useProductBtn(productSmall);

  const style = styleMode === "card" ? STYLE_CARD : STYLE_CART;

  return (
    <div className={style}>
      <QuantityTypeComponent
        styleMode={styleMode}
        quantityTypes={productSmall.pricingDetails}
        pricingDetails={pricingDetails}
        productId={productId}
        createQuantityTypeChangeHandler={createQuantityTypeChangeHandler}
      />

      <PriceCmp
        pricePerKilo={productSmall.pricePerKilo}
        pricingDetails={pricingDetails}
        styleMode="card"
      />

      <AmountChange
        styleMode={styleMode}
        amount={pricingDetails.quantity}
        handleAmountChange={handleAmountChange}
      />

      {styleMode === "cart" && (
        <DeleteItemBtn handleAmountChange={handleAmountChange} />
      )}
    </div>
  );
}

function DeleteItemBtn({
  handleAmountChange,
}: {
  handleAmountChange: (amount: number) => void;
}) {
  return (
    <Button
      onClick={(ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        handleAmountChange(0);
      }}
      styleMode="secondary"
      styleSize="small"
      className="w-4 h-4 fill-dark-text dark:fill-light-text"
    >
      {iconService.DeleteSvg()}
    </Button>
  );
}

const STYLE_CARD =
  "grid bg-light-bg dark:bg-dark-bg text-dark-text dark:text-light-text justify-items-center pb-1 h-full";

const STYLE_CART = "flex gap-4 ";
