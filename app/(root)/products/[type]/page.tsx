import ProductIndex from "@/components/Product/ProductIndex";
import { getProducts } from "@/lib/actions/product.actions";
import { productClientService } from "@/lib/services/client/product.client.service";

export async function generateStaticParams() {
  return [{ type: "vegetable" }];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const productType = (type as TProductType) ?? "vegetable";
  const subProductType = "garden vegetables";

  const products = (await getProducts({
    productType,
    subProductType,
    skip: 0,
    limit: 1000,
    isSmallProduct: true,
  })) as IProductSmall[];

  const subProductList = productClientService.getProductSubList(productType);

  return (
    <ProductIndex
      productType={productType}
      products={products}
      subProductType={subProductType}
      subProductList={subProductList}
    />
  );
}
