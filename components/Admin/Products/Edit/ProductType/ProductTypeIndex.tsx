import React, { useState } from "react";
import ProductType from "./ProductType";
import SubProductType from "./SubProductType";
interface Props {
  productType: TProductType;
}

export default function ProductTypeIndex({ productType = "other" }: Props) {
  const [productTypeState, setProductTypeState] = useState<TProductType>(
    productType || "other"
  );
  return (
    <>
      <ProductType
        productType={productTypeState}
        setProductTypeState={setProductTypeState}
      />
      <SubProductType productType={productTypeState} />
    </>
  );
}
