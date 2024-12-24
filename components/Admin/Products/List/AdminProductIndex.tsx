import AdminProductFilter from "./AdminProductFilter";
import AdminProductList from "./AdminProductList";
import Link from "next/link";

interface Props {
  products: IProductSmall[];
}
export default function AdminProductIndex({ products }: Props) {
  return (
    <div className="grid gap-4">
      <header className="flex justify-between items-center">
        <AdminProductFilter />
        <Link className="py-2 px-4 border rounded" href="/admin/products/new">
          New
        </Link>
      </header>
      <AdminProductList products={products} />
    </div>
  );
}
