import ProductEdit from "@/components/Admin/Products/Edit/ProductEdit";
import { getProductById } from "@/lib/actions/product.actions";
import { productClientService } from "@/lib/services/client/product.client.service";
import React from "react";
export async function generateStaticParams() {
  return [{ productId: "new" }];
}
export default async function ProductEditPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  let product: IProduct;
  if (productId === "new") {
    product = productClientService.getEmptyProduct();
  } else {
    product = (await getProductById({
      _id: productId,
      isSmallProduct: false,
    })) as IProduct;
  }
  return <ProductEdit product={product} />;
}
