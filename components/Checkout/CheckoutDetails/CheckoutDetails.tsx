import Button from "@/components/General/Button";
import CheckoutAddressDetails from "./Address/CheckoutAddressDetails";
import CheckoutPersonalDetails from "./Personal/CheckoutPersonalDetails";
import CheckoutsHeader from "../CheckoutShared/CheckoutsHeader";
import CheckoutsOverlay from "../CheckoutShared/CheckoutsOverlay";
import { IAddress } from "@/types/address.types";
import { TCheckoutStage } from "@/types/checkout";
import { IOrder } from "@/types/order";

interface Props {
  order: IOrder;
  addresses: IAddress[];
  isDetails: boolean;
  handleNextClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    stage: TCheckoutStage,
    city?: string
  ) => void;
}
export default function CheckoutDetails({
  order,
  addresses,
  isDetails,
  handleNextClick,
}: Props) {
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
          styleMode="primary"
          styleSize="medium"
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
