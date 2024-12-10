import Link from "next/link";

interface Props {
  cartItems: ICartItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CartFooter({ cartItems, setIsOpen }: Props) {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const delivery = 42.0;
  const total = totalPrice + delivery;
  return (
    <footer className="border-t flex flex-col gap-2 h-40 w-full ">
      <span className="flex items-center justify-between">
        <h4>Total items cost</h4>
        <p>{totalPrice}$</p>
      </span>
      <span className="flex items-center justify-between">
        <h3>Delivery</h3>
        <p>{delivery}$</p>
      </span>
      <span className="flex items-center justify-between">
        <h3>Total</h3>
        <p>{total}$</p>
      </span>
      <button
        className="bg-dark-btn dark:bg-light-btn rounded-2xl text-light-text dark:text-dark-text text-center p-2 mt-auto w-full"
        onClick={() => setIsOpen(false)}
      >
        <Link className="w-full h-full flex  justify-center" href="/checkout">
          CheckOut
        </Link>
      </button>
    </footer>
  );
}
