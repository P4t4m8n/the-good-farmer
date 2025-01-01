import { IProductSmall } from "@/types/product";
import AdminProductPreview from "./AdminProductPreview";

interface Props {
  products: IProductSmall[];
}
export default function AdminProductList({ products }: Props) {
  return (
    <ul className="flex flex-col w-full gap-2">
      {products.map((product) => (
        <AdminProductPreview product={product} key={product._id} />
      ))}
    </ul>
  );
}
