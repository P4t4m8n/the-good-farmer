import Input from "@/components/General/Input";
import Label from "@/components/General/Label";
import Select from "@/components/General/Select";
import { IPricingDetails } from "@/types/product";
import { ChangeEvent } from "react";

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
  const INPUTS = [
    {
      children: <Label>Weight per type:</Label>,
      props: {
        type: "number",
        name: `weightPerType-${idx}`,
        id: `weightPerType-${idx}`,
        step: "any",
        defaultValue: pricingDetails?.weightPerType?.toString(),
        className: "bg-dark-btn",
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          onChange(idx, "weightPerType", e.target.value),
      },
    },
    {
      children: <Label>Stock:</Label>,
      props: {
        type: "number",
        name: `stock-${idx}`,
        id: `stock-${idx}`,
        defaultValue: pricingDetails?.stock?.toString(),
        className: "bg-dark-btn",
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          onChange(idx, "stock", e.target.value),
      },
    },
    {
      children: <Label>Discount:</Label>,
      props: {
        type: "number",
        name: `discount-${idx}`,
        id: `discount-${idx}`,
        step: "any",
        defaultValue: pricingDetails?.discount?.toString(),
        className: "bg-dark-btn",
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          onChange(idx, "discount", e.target.value),
      },
    },
  ];
  return (
    <ul className="flex gap-4 bg-slate-700">
      {INPUTS.map(({ children, props }, idx) => (
        <Input key={idx} {...props}>
          {children}
        </Input>
      ))}
      <Select
        name={`quantityType-${idx}`}
        id={`quantityType-${idx}`}
        value={pricingDetails?.type}
        className="bg-dark-btn"
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onChange(idx, "type", e.target.value)
        }
        options={productTypes}
      ></Select>
    </ul>
  );
}
