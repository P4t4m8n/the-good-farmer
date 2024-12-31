import Button from "@/components/General/Button";
import CheckoutsHeader from "../CheckoutShared/CheckoutsHeader";
import CheckoutsOverlay from "../CheckoutShared/CheckoutsOverlay";
import CheckoutPrice from "../CheckoutPayment/CheckoutPrice";
import Input from "@/components/General/Input";

interface Props {
  productsPrice: number;
  deliveryPrice: number;
  isSubmitting: boolean;
  isConfirm: boolean;
  handleNextClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    stage: TCheckoutStage
  ) => void;
}

export default function ConfirmOrder({
  productsPrice,
  deliveryPrice,
  isSubmitting,
  isConfirm,
  handleNextClick,
}: Props) {
  return (
    <div className=" relative w-1/3 flex flex-col gap-4">
      <CheckoutsHeader text={"Payment Details"} />
      <CheckoutPrice
        productsPrice={productsPrice}
        deliveryPrice={deliveryPrice}
      />
      <Input
        hidden={true}
        type="text"
        name="productsPrice"
        defaultValue={productsPrice.toString()}
      />
      <Input
        hidden={true}
        type="text"
        name="deliveryPrice"
        defaultValue={deliveryPrice.toString()}
      />
      <Button
        className=" bg-dark-btn text-light-text dark:bg-light-btn dark:text-dark-text p-2"
        type="submit"
        styleMode="primary"
        styleSize="large"
        disabled={isSubmitting}
      >
        Confirm
      </Button>
      <CheckoutsOverlay
        isHidden={isConfirm}
        handleChangeStage={(ev) => handleNextClick(ev, "confirm")}
      />
    </div>
  );
}
