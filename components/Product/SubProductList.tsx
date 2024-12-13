"use client";

import { Fragment } from "react";
import SubProductListItem from "./SubProductListItem";

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
    <ul className="w-full gap-8 flex flex-col">
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
