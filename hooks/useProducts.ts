import { getProducts } from "@/lib/actions/product.actions";
import { useRef, useState } from "react";

export const useProducts = (productType: TProductType, subProduct: string) => {
  const [products, setProducts] = useState<IProductSmall[] | null>(null);

  const isEndOfProducts = useRef(false);

  const fetchProducts = async () => {
    if (isEndOfProducts.current) return;
    const _products = (await getProducts({
      productType,
      subProductType: subProduct,
      skip: products?.length || 0,
      limit: 10,
      isSmallProduct: true,
    })) as IProductSmall[];
    if (!_products || !_products.length) {
      isEndOfProducts.current = true;
      return;
    }
    setProducts((prev) => [...(prev || []), ..._products]);
    if (_products.length < 10) {
      isEndOfProducts.current = true;
    }
  };
  return { products, fetchProducts };
};
