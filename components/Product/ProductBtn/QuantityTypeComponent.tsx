import Input from "@/components/General/Input";
import Label from "@/components/General/Label";

interface Props {
  styleMode: "cart" | "card";
  quantityTypes: IPricingDetails[];
  pricingDetails: IPricingDetails;
  productId: string;
  createQuantityTypeChangeHandler: (qType: IPricingDetails) => () => void;
}

export default function QuantityTypeComponent({
  styleMode,
  quantityTypes,
  pricingDetails,
  productId,
  createQuantityTypeChangeHandler,
}: Props) {
  const style = styleMode === "card" ? STYLE_CARD : STYLE_CART;
  return (
    <ul className={style.container} role="radiogroup">
      {quantityTypes?.map((qType) => (
        <li key={qType?.type} className="w-full">
          <Input
            type="radio"
            id={`${qType?.type}${productId || "1"}`}
            name={qType?.type || "kg"}
            className="hidden "
            checked={pricingDetails?.type === qType?.type}
            onChange={createQuantityTypeChangeHandler(qType)}
            divStyle="w-full"
            aria-label={`Select ${qType.type}`}
          >
            <Label
              className={`${style.label} ${
                pricingDetails?.type === qType?.type ? style.labelFocus : ""
              }`}
              htmlFor={`${qType?.type}${productId}`}
            >
              {qType?.type}
            </Label>
          </Input>
        </li>
      ))}
    </ul>
  );
}

// Module imports cause Tailwind to ignore classes because Tailwind CSS scans the source files for class names during the build process.
// If the class names are dynamically generated or imported from another module, Tailwind cannot detect and include them in the final CSS.
const BASE_STYLE = {
  container: "flex border rounded-3xl bg-inherit p-1 h-[34px] ",
  label: "peer rounded-3xl cursor-pointer text-sm font-semibold font-text",
  labelFocus:
    "bg-dark-btn text-light-text dark:bg-light-btn dark:text-dark-text",
};

const STYLE_CARD = {
  ...BASE_STYLE,
  container: `${BASE_STYLE.container} gap-1`,
  label: `${BASE_STYLE.label} py-1 px-2 w-full `,
};

const STYLE_CART = {
  ...BASE_STYLE,
  container: `${BASE_STYLE.container} gap-2`,
  label: `${BASE_STYLE.label} py-1 px-1`,
};
