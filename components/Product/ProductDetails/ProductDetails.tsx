import Image from "next/image";
import ProductBtn from "../ProductBtn/ProductBtn";
import DetailList from "./DetailList";
import NutritionItem from "./NutritionItem";
import DetailItem from "./DetailItem";

interface Props {
  product: IProduct;
}

export default function ProductDetailsModel({ product }: Props) {
  const {
    name = "",
    imgsUrl = [],
    family = "",
    season = "",
    productType = "other",
    subProductType = "other",
    description = "",
    nutrition = {},
    quantityType = [],
    _id = "",
  } = product || {};

  const imgUrl = imgsUrl.length > 0 ? imgsUrl[0] : "/placeholder.png";

  const productSmall: IProductSmall = {
    _id,
    name,
    imgUrl,
    quantityType,
    productType,
    subProductType,
  };

  const items = [
    { label: "Type", value: productType },
    { label: "Category", value: subProductType },
    { label: "Family", value: family },
    { label: "Growing season", value: season },
  ];

  return (
    <div className="h-full w-full flex flex-col gap-4 mr-8">
      <h1 className="underline text-2xl font-semibold font-title">{name}</h1>
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
          <NutritionItem nutrition={nutrition} />
        </div>
      </div>
      <ProductBtn productSmall={productSmall} styleMode="page" />
    </div>
  );
}
