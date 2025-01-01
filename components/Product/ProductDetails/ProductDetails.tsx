import Image from "next/image";
import ProductBtn from "../ProductBtn/ProductBtn";
import DetailList from "./DetailList";
import DetailItem from "./DetailItem";
import { IProduct, IProductSmall } from "@/types/product";

interface Props {
  product: IProduct;
}

export default function ProductDetailsModel({ product }: Props) {
  const {
    name = "",
    productFamily = "",
    season = "",
    imgUrl = "/placeholder.png",
    productType = "other",
    subProductType = "other",
    description = "",
    pricingDetails = [],
    pricePerKilo = 1,
    _id = "",
  } = product || {};

  const productSmall: IProductSmall = {
    _id,
    name,
    imgUrl,
    pricingDetails,
    productType,
    subProductType,
    pricePerKilo,
  };

  const items = [
    { label: "Type", value: productType },
    { label: "Category", value: subProductType },
    { label: "Family", value: productFamily },
    { label: "Growing season", value: season },
  ];

  return (
    <div className="h-full w-full flex flex-col gap-4 mr-8">
      <header>
        <h1 className="underline text-2xl font-semibold font-title">{name}</h1>
      </header>
      <div className="grid grid-cols-2 w-full h-full gap-4">
        <div className="flex flex-col place-content-between">
          <Image
            src={imgUrl}
            width={360}
            height={360}
            alt={name || "Product image"}
            className="object-cover rounded aspect-square w-4/5 self-center"
          />
          {description && (
            <DetailItem label="Description" value={description} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <DetailList items={items} />
        </div>
      </div>
      <ProductBtn productSmall={productSmall} styleMode="card" />
    </div>
  );
}
