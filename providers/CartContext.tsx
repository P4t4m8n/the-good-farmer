"use client";

import { localStorageClientService } from "@/lib/services/client/localSession.service";
import React, { createContext, FC, useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

type Subscriber = () => void;

interface CartProvider {
  getCartItem: (productId: string) => ICartItem | undefined;
  updateCart: (
    product: IProductSmall,
    quantityType: IQuantityType,
    amount: number
  ) => void;
  subscribe: (productId: string | null, callback: Subscriber) => () => void;
  clearCart: () => void;
  getAllCartItems: () => ICartItem[] | undefined;
}

export const CartContext = createContext<CartProvider | undefined>(undefined);

export const CartProvider: FC<Props> = ({ children }) => {
  const cartItemsRef = useRef<{ [productId: string]: ICartItem } | null>(null);
  const itemSubscribersRef = useRef<{ [productId: string]: Set<Subscriber> }>(
    {}
  );
  const cartSubscribersRef = useRef<Set<Subscriber>>(new Set());

  const getCartItem = (productId: string) => {
    if (!cartItemsRef?.current) return;
    return cartItemsRef?.current[productId];
  };

  const getAllCartItems = (): ICartItem[] | undefined => {
    if (!cartItemsRef?.current) return [];

    let cartItems = Object.values(cartItemsRef?.current) || [];
    if (!hasCartItems()) {
      cartItems = localStorageClientService.getSessionData("cart") || [];
      if (cartItems?.length) {
        cartItemsRef.current = cartItems.reduce((acc, item) => {
          if (!item?.product?._id) return acc;
          acc[item.product._id] = item;
          return acc;
        }, {} as { [productId: string]: ICartItem });
      }
    }
    return cartItems;
  };

  const updateCart = (
    product: IProductSmall,
    quantityType: IQuantityType,
    quantity: number
  ) => {
    if (!cartItemsRef?.current) return;

    const productId = product._id!;
    if (quantity < 1) {
      delete cartItemsRef.current[productId];
    } else {
      cartItemsRef.current[productId] = {
        product,
        quantityType,
        quantity,
        totalPrice: quantity * quantityType.price,
      };
    }

    localStorageClientService.storeSessionData(
      "cart",
      Object.values(cartItemsRef.current)
    );
    // Notify item-specific subscribers
    const itemSubscribers = itemSubscribersRef.current[productId];
    if (itemSubscribers) {
      itemSubscribers.forEach((callback) => callback());
    }
    // Notify cart-wide subscribers
    cartSubscribersRef.current.forEach((callback) => callback());
  };

  const subscribe = (productId: string | null, callback: Subscriber) => {
    if (productId) {
      // Subscribe to specific cart item
      if (!itemSubscribersRef.current[productId]) {
        itemSubscribersRef.current[productId] = new Set();
      }
      itemSubscribersRef.current[productId].add(callback);

      // Return unsubscribe function
      return () => {
        itemSubscribersRef.current[productId].delete(callback);
        if (itemSubscribersRef.current[productId].size === 0) {
          delete itemSubscribersRef.current[productId];
        }
      };
    } else {
      // Subscribe to cart-wide changes
      cartSubscribersRef.current.add(callback);

      // Return unsubscribe function
      return () => {
        cartSubscribersRef.current.delete(callback);
      };
    }
  };

  const clearCart = () => {
    cartItemsRef.current = {};

    notifyAllSubscribers();
    localStorageClientService.storeSessionData("cart");
  };

  const notifyAllSubscribers = () => {
    Object.values(itemSubscribersRef.current).forEach((subscribersSet) => {
      subscribersSet.forEach((callback) => callback());
    });

    cartSubscribersRef.current.forEach((callback) => callback());
  };

  const hasCartItems = () => {
    return Object.values(cartItemsRef?.current || {}).length > 0;
  };

  useEffect(() => {
    const storedCart =
      localStorageClientService.getSessionData<ICartItem[]>("cart") || [];
    if (storedCart.length) {
      cartItemsRef.current = storedCart.reduce(
        (acc: { [key: string]: ICartItem }, item: ICartItem) => {
          if (!item?.product?._id) return acc;
          acc[item.product._id] = item;
          return acc;
        },
        {}
      );
      // Notify subscribers that items are loaded
      Object.values(itemSubscribersRef.current).forEach((subscribersSet) => {
        subscribersSet.forEach((callback) => callback());
      });
      cartSubscribersRef.current.forEach((callback) => callback());
    } else {
      cartItemsRef.current = {};
    }
  }, []);

  const contextValue = {
    getCartItem,
    getAllCartItems,
    updateCart,
    subscribe,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
