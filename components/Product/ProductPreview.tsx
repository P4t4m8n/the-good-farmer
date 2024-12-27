import Image from "next/image";
import Link from "next/link";
import ProductBtn from "./ProductBtn/ProductBtn";

interface Props {
  product: IProductSmall;
  styleMode: TProductStyleMode;
}

export default function ProductPreview({ product, styleMode }: Props) {
  const { _id, name, imgUrl, pricingDetails, productType, pricePerKilo } =
    product;
  const img = "/imgs/defaultImg.png";

  const productSmall: IProductSmall = {
    _id,
    name,
    imgUrl,
    productType: product.productType,
    subProductType: product.subProductType,
    pricingDetails,
    pricePerKilo,
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
      <ProductBtn productSmall={productSmall} styleMode="card" />
    </li>
  );
}

const PRODUCT_ITEM_PAGE_STYLE = {
  container:
    "group overflow-hidden rounded-b-lg shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-light-text flex flex-col items-center",
  img: "w-full aspect-square group-hover:scale-105 transition-transform duration-300 overflow-hidden",
  imgSize: 192,
  name: "text-center text-lg font-title font-semibold",
};
const PRODUCT_ITEM_CART_STYLE = {
  container: "p-4 rounded border flex flex-col items-center gap-4",
  img: "w-40 aspect-square rounded",
  imgSize: 64,
  name: "",
};
