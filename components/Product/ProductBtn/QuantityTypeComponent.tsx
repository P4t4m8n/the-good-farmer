import Input from "@/components/General/Input";

interface Props {
  style: {
    container: string;
    label: string;
  };
  quantityTypes: IPricingDetails[];
  pricingDetails: IPricingDetails;
  productId: string;
  createQuantityTypeChangeHandler: (qType: IPricingDetails) => () => void;
}

export default function QuantityTypeComponent({
  style,
  quantityTypes,
  pricingDetails,
  productId,
  createQuantityTypeChangeHandler,
}: Props) {
  console.log("pricingDetails:", pricingDetails)
  console.log("quantityTypes:", quantityTypes)
  return (
    <ul className={style.container}>
      {quantityTypes?.map((qType) => (
        <li key={qType?.type} className="w-full">
          <Input
            inputProps={{
              type: "radio",
              id: `${qType?.type}${productId || "1"}`,
              name: qType?.type || "kg",
              className: "hidden",
              checked: pricingDetails?.type === qType?.type,
              onChange: createQuantityTypeChangeHandler(qType),
            }}
            divStyle="w-full"
          >
            <label
              className={`${style.label} ${
                pricingDetails?.type === qType?.type
                  ? "bg-dark-btn text-light-text dark:bg-light-btn dark:text-dark-text"
                  : ""
              }`}
              htmlFor={`${qType?.type}${productId}`}
            >
              {qType?.type}
            </label>
          </Input>
        </li>
      ))}
    </ul>
  );
}
