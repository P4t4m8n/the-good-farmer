import Input from "@/components/General/Input";

interface Props {
  style: {
    container: string;
    label: string;
  };
  quantityTypes: IPricingDetails[];
  quantityType: IPricingDetails;
  productId: string;
  createQuantityTypeChangeHandler: (qType: IPricingDetails) => () => void;
}

export default function QuantityTypeComponent({
  style,
  quantityTypes,
  quantityType,
  productId,
  createQuantityTypeChangeHandler,
}: Props) {
  return (
    <ul className={style.container}>
      {quantityTypes?.map((qType) => (
        <li key={qType?.type}>
          <Input
            inputProps={{
              type: "radio",
              id: `${qType?.type}${productId || "1"}`,
              name: qType?.type,
              className: "hidden",
              checked: quantityType?.type === qType?.type,
              onChange: createQuantityTypeChangeHandler(qType),
            }}
          >
            <label
              className={`${style.label} ${
                quantityType?.type === qType?.type
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
