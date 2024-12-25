import Input from "@/components/General/Input";
import Select from "@/components/General/Select";

interface Props {
  pricingDetails: IPricingDetails;
  productTypes: string[];
  idx: number;
  onChange: (idx: number, key: keyof IPricingDetails, value: string) => void;
}
export default function EditPricing({
  pricingDetails,
  productTypes,
  idx,
  onChange,
}: Props) {
  return (
    <ul className="flex gap-4 bg-slate-700">
      <Input
        inputProps={{
          type: "number",
          name: `weightPerType-${idx}`,
          defaultValue: pricingDetails?.weightPerType?.toString(),
          className: "bg-dark-btn",
          onChange: (e) => onChange(idx, "weightPerType", e.target.value),
        }}
      >
        Weight per type:
      </Input>
      <Input
        inputProps={{
          type: "number",
          name: `stock-${idx}`,
          defaultValue: pricingDetails?.stock?.toString(),
          className: "bg-dark-btn",
          onChange: (e) => onChange(idx, "stock", e.target.value),
        }}
      >
        stock:
      </Input>
      <Input
        inputProps={{
          type: "number",
          name: `discount-${idx}`,
          defaultValue: pricingDetails?.weightPerType?.toString(),
          className: "bg-dark-btn",
          onChange: (e) => onChange(idx, "discount", e.target.value),
        }}
      >
        Discount:
      </Input>
      <Select
        selectProps={{
          name: `quantityType-${idx}`,
          value: pricingDetails?.type,
          className: "bg-dark-btn",
          onChange: (e) => onChange(idx, "type", e.target.value),
        }}
        options={productTypes}
      ></Select>
    </ul>
  );
}
