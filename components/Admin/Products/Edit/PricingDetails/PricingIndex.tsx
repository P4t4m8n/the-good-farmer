import Button from "@/components/General/Button";
import EditPricing from "./EditPricing";

interface Props {
  pricingDetails: IPricingDetails;
  OnDelete: (idx: number) => void;
  onChange: (idx: number, key: keyof IPricingDetails, value: string) => void;
  productTypes: string[];
  idx: number;
}
export default function PricingIndex({
  pricingDetails,
  OnDelete,
  productTypes,
  idx,
  onChange,
}: Props) {
  return (
    <li className="flex gap-4">
      <EditPricing
        pricingDetails={pricingDetails}
        productTypes={productTypes}
        idx={idx}
        onChange={onChange}
      />

      <Button styleMode="secondary" styleSize="medium" onClick={() => OnDelete(idx)}>
        Delete
      </Button>
    </li>
  );
}
