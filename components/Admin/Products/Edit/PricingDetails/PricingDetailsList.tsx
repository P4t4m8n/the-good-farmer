import { QUANTITY_TYPE } from "@/constants/products";
import PricingIndex from "./PricingIndex";

interface Props {
  pricingDetails: IPricingDetails[];
  onDelete: (idx: number) => void;
  onChange: (idx: number, key: keyof IPricingDetails, value: string) => void;
}
export default function PricingDetailsList({
  pricingDetails,
  onDelete,
  onChange,
}: Props) {
  const productTypes = QUANTITY_TYPE.map((type) => type);
  // pricingDetails.forEach((pricingDetail) => {
  //   const idx = productTypes.findIndex((type) => type === pricingDetail.type);
  //   if (idx > -1) {
  //     productTypes.splice(idx, 1);
  //   }
  // });
  return (
    <ul>
      {pricingDetails.map((pricingDetail, idx) => (
        <PricingIndex
          key={idx}
          pricingDetails={pricingDetail}
          productTypes={productTypes}
          idx={idx}
          OnDelete={onDelete}
          onChange={onChange}
        />
      ))}
    </ul>
  );
}
