"use client";
import { useActionState } from "react";
import ImageUpload from "./ImageUpload";
import { saveProduct } from "@/lib/actions/product.actions";
import Button from "@/components/General/Button";
import Description from "./Description";
import Input from "@/components/General/Input";
import ProductTypeIndex from "./ProductType/ProductTypeIndex";
import PricingDetailsIndex from "./PricingDetails/PricingDetailsIndex";

interface Props {
  product: IProduct;
}
export default function ProductEdit({ product }: Props) {
  const [state, action, loading] = useActionState<IProduct, FormData>(
    saveProduct,
    product
  );

  const {
    name = "",
    imgUrl = "/placeholder.png",
    description = "",
  } = (state as unknown as IProduct) || {};

  return (
    <form action={action} className="h-full w-full flex flex-col gap-4 mr-8">
      <header>
        <Input
          inputProps={{
            id: "name",
            name: "name",
            type: "text",
            defaultValue: name,
            className:
              "underline text-2xl font-semibold font-title text-dark-text",
          }}
        >
          Name:
        </Input>
      </header>

      <ImageUpload imgUrl={imgUrl} />
      <ProductTypeIndex productType={product?.productType} />
      <Input
        inputProps={{
          name: "productFamily",
          type: "text",
          defaultValue: product.productFamily,
        }}
      >
        product family:
      </Input>
      <Input
        inputProps={{
          type: "text",
          name: "season",
          defaultValue: state.season,
        }}
      >
        season:
      </Input>
      <Input
        inputProps={{
          type: "checkbox",
          name: "isAvailableForSale",
          defaultChecked: state.isAvailableForSale,
        }}
      >
        isAvailableForSale:
      </Input>
      <PricingDetailsIndex
        initialPricingDetails={state.pricingDetails}
        pricePerKilo={state.pricePerKilo}
      />
      <Description description={description} />
      <div className="flex flex-col gap-2"></div>
      <Button style="primary" size="large" disabled={loading} type="submit">
        Save
      </Button>
    </form>
  );
}
