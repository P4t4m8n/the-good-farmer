import { IAddress } from "@/types/address.types";

interface Props {
  address: IAddress;
}
export default function AddressItem({ address }: Props) {
  const {
    streetName,
    number,
    floor,
    apartment,
    entrance,
    city,
    state,
    country,
    zipCode,
  } = address;
  return (
    <div className="hover:cursor-pointer">
      <span className="flex gap-2 ">
        <p>{streetName}</p>
        <p>{number}</p>
      </span>
      <span className="flex gap-2">
        {floor && <p>{`Floor ${floor}, `}</p>}
        {apartment && <p>{`Apartment ${apartment}, `}</p>}
        {entrance && <p>{`Entrance ${entrance}`}</p>}
      </span>
      <span className="flex hap-1">
        <p>{city}, </p>
        <p>{state}</p>
        <p>{country}, </p>
      </span>
      <span>{zipCode}</span>
    </div>
  );
}
