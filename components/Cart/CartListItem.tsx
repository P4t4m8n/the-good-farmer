import Image from "next/image";
import ProductBtn from "../Product/ProductBtn/ProductBtn";

interface Props {
  cartItem: ICartItem;
}
export default function CartListItem({ cartItem }: Props) {
  return (
    <li
      key={cartItem.product._id}
      className="bg-light-btn dark:bg-dark-text h-fit p-2 flex justify-around items-center"
    >
      <Image
        src={cartItem?.product?.imgUrl || "/no-image.png"}
        alt={cartItem.product.name}
        width={48}
        height={48}
        className="rounded w-12 aspect-square"
      />
      <div className="">
        <h4 className="font-title">{cartItem.product.name}</h4>
        <ProductBtn productSmall={cartItem?.product} styleMode="cart" />
      </div>
      <p>{cartItem.totalPrice.toFixed(2)}</p>
    </li>
  );
}
