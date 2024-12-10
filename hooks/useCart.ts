"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/providers/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { getAllCartItems, updateCart, subscribe, clearCart } = context;

  const [cartItems, setCartItems] = useState(() => getAllCartItems());

  const onClearCart = ()=>{
    clearCart();
    setCartItems([]);
  }

  useEffect(() => {
    const handleChange = () => {
      setCartItems(getAllCartItems());
    };
    const unsubscribe = subscribe(null, handleChange);
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { cartItems, updateCart, onClearCart };
};
