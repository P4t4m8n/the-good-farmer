"use client";
import { useActionState, useState } from "react";
import ImageUpload from "./ImageUpload";
import { saveProduct } from "@/lib/actions/product.actions";
import ProductType from "./ProductType";
import Button from "@/components/General/Button";
import Description from "./Description";
import SubProductType from "./SubProductType";

interface Props {
  product: IProduct;
}
export default function ProductEdit({ product }: Props) {
  const [state, action, loading] = useActionState<IProduct, FormData>(
    saveProduct,
    product
  );
  const [productTypeState, setProductTypeState] = useState<TProductType>(
    product?.productType || "other"
  );
  const {
    name = "",
    imgUrl = "/placeholder.png",
    description = "",
  } = (state as unknown as IProduct) || {};

  return (
    <form action={action} className="h-full w-full flex flex-col gap-4 mr-8">
      <header>
        <input
          name="name"
          defaultValue={name}
          className="underline text-2xl font-semibold font-title"
        ></input>
      </header>

      <ImageUpload imgUrl={imgUrl} />
      <ProductType
        productType={productTypeState}
        setProductTypeState={setProductTypeState}
      />
      <SubProductType productType={productTypeState} />
      <Description description={description} />

      <div className="flex flex-col gap-2"></div>
      <Button style="primary" size="large" disabled={loading} type="submit">
        Save
      </Button>
    </form>
  );
}
