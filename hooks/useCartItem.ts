"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/CartContext";

export const useCartItem = (productId: string) => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartItem must be used within a CartProvider");
  }
  const { getCartItem, updateCart, subscribe } = context;

  const [cartItem, setCartItem] = useState(() => getCartItem(productId));

  useEffect(() => {
    const handleChange = () => {
      setCartItem(getCartItem(productId));
    };
    const unsubscribe = subscribe(productId, handleChange);
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return { cartItem, updateCart };
};
