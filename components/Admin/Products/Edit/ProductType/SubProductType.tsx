import Select from "@/components/General/Select";
import { productClientService } from "@/lib/services/client/product.client.service";

interface Props {
  productType: TProductType;
}
export default function SubProductType({ productType }: Props) {
  const subProductTypes = productClientService.getProductSubList(productType);
  return (
    <Select
      options={subProductTypes}
      name="subProductType"
      className="bg-dark-btn"
      defaultValue={productType}
    />
  );
}
