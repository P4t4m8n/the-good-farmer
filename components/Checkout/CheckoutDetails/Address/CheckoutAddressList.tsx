import AddressItem from "@/components/Address/AddressItem";
import Input from "@/components/General/Input";

interface Props {
  addresses: IAddress[];
}
export default function CheckoutAddressList({ addresses }: Props) {
  return (
    <ul className=" grid gap-4">
      {addresses.map((address) => (
        <li
          key={address._id}
          className={`bg-inherit rounded  border p-2 font-text border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full hover:cursor-pointer has-[:checked]:bg-green-600`}
        >
          <Input
            inputProps={{
              type: "radio",
              name: "addressId",
              id: address?._id,
              defaultValue: `${address._id},${address.city}`,
              required: true,
              className: "sr-only",
            }}
          >
            <AddressItem address={address} />
          </Input>
        </li>
      ))}
    </ul>
  );
}
