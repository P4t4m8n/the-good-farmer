import AdminProductIndex from "@/components/Admin/Products/List/AdminProductIndex";
import { getProducts } from "@/lib/actions/product.actions";

export default async function AdminProductPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key in keyof IProductFilter]: string | undefined;
  }>;
}) {
  const filter = await searchParams;

  let isAvailableForSale = null;

  if (filter?.isAvailableForSale) {
    if (filter.isAvailableForSale === "true") isAvailableForSale = true;
    else if (filter.isAvailableForSale === "false") isAvailableForSale = false;
  }

  const products = (await getProducts({
    ...filter,
    productType: filter.productType as TProductType,
    skip: filter.skip ? +filter?.skip : 0,
    limit: filter.limit ? +filter?.limit : 10,
    isSmallProduct: true,
    isAvailableForSale: isAvailableForSale,
  })) as IProductSmall[];
  return <AdminProductIndex products={products} />;
}
