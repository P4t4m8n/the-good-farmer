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
  onChangeStage: (stage: TCheckoutStage) => void;
}

const ConfirmOrder = ({
  productsPrice,
  deliveryPrice,
  isSubmitting,
  isConfirm,
  onChangeStage,
}: Props) => {
  const handleNextClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    stage: TCheckoutStage
  ) => {
    const form = (e.currentTarget.closest("form") as HTMLFormElement) || null;

    // Check form validity
    if (form && !form.checkValidity()) {
      e.preventDefault(); // Prevent default action if form is invalid
      form.reportValidity(); // Show validation feedback to the user
      return;
    }

    onChangeStage(stage);
  };
  return (
    <div className=" relative w-1/3 flex flex-col gap-4">
      <CheckoutsHeader text={"Payment Details"} />
      <CheckoutPrice
        productsPrice={productsPrice}
        deliveryPrice={deliveryPrice}
      />
      <Input
        inputProps={{
          hidden: true,
          type: "text",
          name: "productsPrice",
          defaultValue: productsPrice.toString(),
        }}
      />
      <Input
        inputProps={{
          hidden: true,
          type: "text",
          name: "deliveryPrice",
          defaultValue: deliveryPrice.toString(),
        }}
      />
      <Button
        className=" bg-dark-btn text-light-text dark:bg-light-btn dark:text-dark-text p-2"
        type="submit"
        style="primary"
        size="large"
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
};

export default ConfirmOrder;
