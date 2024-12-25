import Select from "@/components/General/Select";
import { PRODUCT_TYPE } from "@/constants/products";

interface Props {
  productType: TProductType | null;
  setProductTypeState: React.Dispatch<
    React.SetStateAction<TProductType >
  >;
}
export default function ProductType({
  productType,
  setProductTypeState,
}: Props) {
  const productsTypes = PRODUCT_TYPE.map((type) => type.toString());

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("e.target.value:", e.target.value);
    setProductTypeState(e.target.value as TProductType);
  };
  return (
    <Select
      options={productsTypes}
      selectProps={{
        className: "bg-dark-btn",
        name: "productType",
        defaultValue: productType || "",
        onChange,
      }}
    ></Select>
  );
}
