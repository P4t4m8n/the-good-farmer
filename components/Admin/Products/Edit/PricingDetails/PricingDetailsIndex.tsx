import { useState } from "react";
import PricingDetailsList from "./PricingDetailsList";
import Button from "@/components/General/Button";
import Input from "@/components/General/Input";

interface Props {
  initialPricingDetails?: IPricingDetails[];
  pricePerKilo?: number;
}
export default function PricingDetailsIndex({
  initialPricingDetails,
  pricePerKilo,
}: Props) {
  const [pricingDetails, setPricingDetails] = useState([
    ...(initialPricingDetails || []),
  ]);

  const addPricingDetail = () => {
    setPricingDetails((prev) => [
      ...prev,
      { weightPerType: 1.0, stock: 1, discount: 0.0, type: "kg" },
    ]);
  };

  const removePricingDetail = (idx: number) => {
    setPricingDetails(pricingDetails.filter((_, _idx) => idx !== _idx));
  };

  const onChange = (idx: number, key: keyof IPricingDetails, value: string) => {
    setPricingDetails((prev) => {
      const newPricingDetails = [...prev];
      // Ensure the indexed item exists
      if (newPricingDetails[idx]) {
        newPricingDetails[idx][key] =
          key === "weightPerType" || key === "stock" || key === "discount"
            ? (parseFloat(value) as never) // Assign as a number
            : (value as never); // Assign as a string
      }

      return newPricingDetails;
    });
  };

  return (
    <div className="">
      <Input
        inputProps={{
          type: "number",
          name: "pricePerKilo",
          defaultValue: pricePerKilo?.toString(),
          className: "bg-dark-btn",
        }}
      >
        Price per kilo:
      </Input>
      <Button
        size="medium"
        style="secondary"
        className="bg-green-600"
        onClick={addPricingDetail}
      >
        Add
      </Button>
      <PricingDetailsList
        pricingDetails={pricingDetails}
        onDelete={removePricingDetail}
        onChange={onChange}
      />
    </div>
  );
}
