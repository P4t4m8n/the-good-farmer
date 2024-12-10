import Image from "next/image";
import Link from "next/link";
import ProductBtn from "./ProductBtn/ProductBtn";

interface Props {
  product: IProductSmall;
  styleMode: TProductStyleMode;
}

// Module imports cause Tailwind to ignore classes, so the constants are defined here
const PRODUCT_ITEM_PAGE_STYLE = {
  container: "p-4 rounded border flex flex-col items-center gap-4",
  img: "w-40 aspect-square rounded",
  imgSize: 192,
  name: "text-center text-lg font-title font-semibold",
};
const PRODUCT_ITEM_CART_STYLE = {
  container: "p-4 rounded border flex flex-col items-center gap-4",
  img: "w-40 aspect-square rounded",
  imgSize: 64,
  name: "",
};
export default function ProductPreview({ product, styleMode }: Props) {
  const { _id, name, imgUrl, quantityType, productType } = product;
  const img = imgUrl && imgUrl !== "No image found" ? imgUrl : "/1.jpeg";

  const productSmall: IProductSmall = {
    _id: _id?.toString(),
    name,
    imgUrl,
    productType: product.productType,
    subProductType: product.subProductType,
    quantityType,
  };

  const style =
    styleMode === "page" ? PRODUCT_ITEM_PAGE_STYLE : PRODUCT_ITEM_CART_STYLE;

  return (
    <li className={`${style.container}`}>
      <Link href={`/products/${productType}/details/${_id}`}>
        <Image
          src={img}
          alt={name}
          width={style.imgSize}
          height={style.imgSize}
          className={`${style.img}`}
        />
        <h4 className={`${style.name}`}>{name}</h4>
      </Link>
      <ProductBtn productSmall={productSmall} styleMode="page" />
    </li>
  );
}

