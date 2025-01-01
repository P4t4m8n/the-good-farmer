"use client";

import { Fragment } from "react";
import SubProductListItem from "./SubProductListItem";
import { TProductType } from "@/types/product";

interface Props {
  productType: TProductType;
  subProductList: string[];
  subProductType: string;
  children?: React.ReactNode;
}
export default function SubProductList({
  productType,
  subProductList,
  children,
  subProductType,
}: Props) {
  return (
    <ul className=" gap-32 flex flex-col w-full ">
      {subProductList.map((subProduct) => (
        <Fragment key={subProduct}>
          {subProductType !== subProduct ? (
            <SubProductListItem
              subProduct={subProduct}
              productType={productType}
            />
          ) : (
            children
          )}
        </Fragment>
      ))}
    </ul>
  );
}
