"use client";

import { useCart } from "../../hooks/useCart";
import { useModel } from "@/hooks/useModel";
import { useRef } from "react";
import CartBtn from "./CartBtn";
import CartList from "./CartList";
import CartFooter from "./CartFooter";

export default function Cart() {
  const { cartItems, onClearCart } = useCart();
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModel(modelRef);

  return (
    <div ref={modelRef}>
      <CartBtn setIsOpen={setIsOpen} numOfItems={cartItems?.length || 0} />
      {isOpen && (
        <div className="fixed h-screen z-50 w-96 back top-0 right-0 shadow-model bg-dark-btn p-4">
          <header className="flex items-center gap-4 border-b pb-2 px-1 font-title h-16 ">
            <h3 className="text-3xl ">Your Cart</h3>
            <CartBtn
              setIsOpen={setIsOpen}
              numOfItems={cartItems?.length || 0}
            />
            <button
              className=" self-end ml-auto underline"
              onClick={onClearCart}
            >
              Clear Cart
            </button>
          </header>
          <CartList cartItems={cartItems || []} />

          <CartFooter cartItems={cartItems || []} setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
}
