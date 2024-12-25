interface Props {
  pricingDetails: IPricingDetails;
}
export default function PricingDetails({ pricingDetails }: Props) {
  return (
    <ul className="flex gap-4">
      {Object.entries(pricingDetails).map(([key, value]) => (
        <li  key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>
  );
}
