import EditAddress from "../../../Address/EditAddress";
import { addressClientService } from "@/lib/services/client/address.client.service";
import { useState } from "react";
import CheckoutAddressList from "./CheckoutAddressList";

interface Props {
  order: IOrder;
  addresses: IAddress[];
}
export default function CheckoutAddressDetails({ order, addresses }: Props) {
  const [stateAddresses, setStateAddresses] = useState<IAddress[]>(addresses);

  const setAddress = (address: IAddress) => {
    setStateAddresses((prev) => [...prev, address]);
  };
  return (
    <div className="h-[calc(100%-11rem-33px)] overflow-auto">
      <EditAddress
        setAddresses={setAddress}
        address={addressClientService.getEmpty(order.user._id)}
      />
      <CheckoutAddressList addresses={stateAddresses} />
    </div>
  );
}
