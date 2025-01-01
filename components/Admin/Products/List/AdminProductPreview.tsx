import Image from "next/image";
import ToggleAvailability from "../Shared/ToggleAvailability";
import Link from "next/link";
import { IProductSmall } from "@/types/product";

interface Props {
  product: IProductSmall;
}
export default function AdminProductPreview({ product }: Props) {
  return (
    <li className="flex gap-4 border p-2 rounded items-center">
      <Image
        src={product?.imgUrl || "/placeholder.png"}
        alt={product.name}
        width={32}
        height={32}
        className=" w-8 h-8"
      />
      <p className="w-32 truncate">{product.name}</p>
      <p className="w-32 truncate">{product.productType}</p>
      <ToggleAvailability
        productId={product._id!}
        isAvailableForSale={product?.isAvailableForSale || false}
      />
      <Link className="" href={`/admin/products/${product._id}`}>
        Edit
      </Link>
    </li>
  );
}
