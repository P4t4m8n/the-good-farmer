import { useRef } from "react";
import ProductList from "./ProductList";
import { useIntersectionObserver } from "@/hooks/UseIntersectionObserver";
import { useProducts } from "@/hooks/useProducts";
import { TProductType } from "@/types/product";

interface Props {
  productType: TProductType;
  subProduct: string;
}
export default function SubProductListItem({ subProduct, productType }: Props) {
  const { products, fetchProducts } = useProducts(productType, subProduct);
  const observerRef = useRef<HTMLDivElement | null>(null);
  useIntersectionObserver(observerRef, [products], fetchProducts);

  return (
    <li key={subProduct} id={subProduct} className="scroll-mt-[14rem] pb-64 ">
      <h3 className="text-4xl font-title pb-8">{subProduct}</h3>
      {products ? (
        <ProductList products={products || []} styleMode="page" />
      ) : (
        <div className="h-40 w-full">loading...</div>
      )}
      <div className="w-full h-1 -z-50" ref={observerRef}></div>
    </li>
  );
}
