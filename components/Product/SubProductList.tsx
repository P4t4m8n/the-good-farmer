"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import ProductList from "./ProductList";
import { getProducts } from "@/lib/actions/product.actions";

interface Props {
  subProductList: string[];
  subProductType: string;
  children?: React.ReactNode;
}
export default function SubProductList({
  subProductList,
  children,
  subProductType,
}: Props) {
  return (
    <ul className="pl-64 w-full gap-8 flex flex-col">
      {subProductList.map((subProduct) => (
        <Fragment key={subProduct}>
          {subProductType !== subProduct ? (
            <SubProductListItem subProduct={subProduct} />
          ) : (
            children
          )}
        </Fragment>
      ))}
    </ul>
  );
}

interface SubProductListItemProps {
  subProduct: string;
}
function SubProductListItem({ subProduct }: SubProductListItemProps) {
  const [products, setProducts] = useState<IProductSmall[] | null>(null);
  const isEndOfProducts = useRef(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = observerRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchProducts();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const fetchProducts = async () => {
    if (isEndOfProducts.current) return;
    const _products = await getProducts({
      productType: "vegetable",
      subProductType: subProduct,
      skip: products?.length || 0,
      limit: 10,
      isSmallProduct: true,
    });
    if (!_products || !_products.length) {
      isEndOfProducts.current = true;
      return;
    }
    setProducts((prev) => [...(prev || []), ..._products]);
    if (_products.length < 10) {
      isEndOfProducts.current = true;
    }
  };

  return (
    <li key={subProduct} id={subProduct} className=" scroll-mt-[9.5rem] pt-16 ">
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
