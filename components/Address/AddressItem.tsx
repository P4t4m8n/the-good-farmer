interface Props {
  address: IAddress;
}
export default function AddressItem({ address }: Props) {
  const { street, city, state, country, zipCode } = address;
  return (
    <div className="hover:cursor-pointer">
      <span className="flex gap-2 ">
        <p>{street.name}</p>
        <p>{street.number}</p>
      </span>
      <span className="flex gap-2">
        {street.floor && <p>{`Floor ${street.floor}, `}</p>}
        {street.apartment && <p>{`Apartment ${street.apartment}, `}</p>}
        {street.entrance && <p>{`Entrance ${street.entrance}`}</p>}
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
