import Button from "@/components/General/Button";
import CheckoutAddressDetails from "./Address/CheckoutAddressDetails";
import CheckoutPersonalDetails from "./Personal/CheckoutPersonalDetails";
import CheckoutsHeader from "../CheckoutShared/CheckoutsHeader";
import CheckoutsOverlay from "../CheckoutShared/CheckoutsOverlay";

interface Props {
  order: IOrder;
  addresses: IAddress[];
  isDetails: boolean;
  onChangeStage: (stage: TCheckoutStage, city?: string) => void;
}
export default function CheckoutDetails({
  order,
  addresses,
  isDetails,
  onChangeStage,
}: Props) {
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
    const formData = new FormData(form);
    const addressId = formData.get("addressId") as string;
    const city = addresses.find((address) => address?._id === addressId)?.city;

    if (stage === "delivery") {
      onChangeStage("delivery", city);
      return;
    }
    onChangeStage("details");
  };
  return (
    <div className="dark:bg-inherit flex flex-col gap-4 h-full w-1/3 relative ">
      <CheckoutsHeader text="Personal Details" />
      <CheckoutPersonalDetails
        {...order.userDetails}
        userId={order.user._id || ""}
      />
      <CheckoutAddressDetails addresses={addresses} order={order} />
      {isDetails && (
        <Button
          onClick={(ev) => handleNextClick(ev, "delivery")}
          style="primary"
          size="medium"
          className="border"
        >
          Next
        </Button>
      )}
      <CheckoutsOverlay
        isHidden={isDetails}
        handleChangeStage={(ev) => handleNextClick(ev, "details")}
      />
    </div>
  );
}
