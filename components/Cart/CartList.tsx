import { ICartItem } from "@/types/cart";
import CartListItem from "./CartListItem";

interface Props {
  cartItems: ICartItem[];
}
export default function CartList({ cartItems }: Props) {
  return (
    <ul className="h-[calc(100%-14rem)] overflow-auto grid gap-1 grid-flow-row">
      {cartItems.map((item) => (
        <CartListItem key={item.product._id} cartItem={item} />
      ))}
    </ul>
  );
}
