import AddressItem from "@/components/Address/AddressItem";
import Input from "@/components/General/Input";
import { IAddress } from "@/types/address.types";

interface Props {
  addresses: IAddress[];
}
export default function CheckoutAddressList({ addresses }: Props) {
  return (
    <ul className=" grid gap-4">
      {addresses.map((address) => (
        <li
          key={address._id}
          className={`bg-inherit rounded border p-2 font-text border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full hover:cursor-pointer has-[:checked]:bg-green-600`}
        >
          <AddressInput address={address} />
        </li>
      ))}
    </ul>
  );
}

function AddressInput({ address }: { address: IAddress }) {
  const stringify = JSON.stringify(address);
  return (
    <Input
      type="radio"
      name="address"
      id={address?._id}
      defaultValue={stringify}
      required={true}
      className="sr-only"
    >
      <AddressItem address={address} />
    </Input>
  );
}
