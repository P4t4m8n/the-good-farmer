"use client";

import { useActionState, useEffect, useRef } from "react";
import CheckoutDetails from "./CheckoutDetails/CheckoutDetails";
import { useCart } from "@/hooks/useCart";
import CheckoutDelivery from "./CheckoutDelivery/CheckoutDelivery";
import ConfirmOrder from "./CheckoutConfirm/ConfirmOrder";
import { saveOrder } from "@/lib/actions/order.actions";
import { orderClientService } from "@/lib/services/client/order.client.service";
import { useStage } from "@/hooks/useStage";

interface Props {
  order: IOrder;
  addresses: IAddress[];
}
export default function CheckoutIndex({ order, addresses }: Props) {
  const { handleNextClick, stage, currentCity } = useStage();
  const { cartItems } = useCart();

  const orderToEdit = useRef({
    ...order,
    products: cartItems || [],
    productsPrice: orderClientService.calculateProductsPrice(cartItems || []),
    deliveryPrice: 42,
  });

  useEffect(() => {
    orderToEdit.current = {
      ...order,
      products: cartItems || [],
      productsPrice: orderClientService.calculateProductsPrice(cartItems || []),
      deliveryPrice: 42,
    };
  }, [order, cartItems]);

  const updatedSaveOrder = saveOrder.bind(null, orderToEdit.current);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction, isPending] = useActionState(
    saveOrder,
    orderToEdit.current
  );

  return (
    <form action={updatedSaveOrder} className="h-full w-full flex gap-4">
      <CheckoutDetails
        order={orderToEdit.current}
        addresses={addresses}
        handleNextClick={handleNextClick}
        isDetails={stage === "details"}
      />
      <CheckoutDelivery
        isDelivery={stage === "delivery"}
        currentCity={currentCity.current}
        handleNextClick={handleNextClick}
      />
      <ConfirmOrder
        isConfirm={stage === "confirm"}
        isSubmitting={isPending}
        productsPrice={orderToEdit.current.productsPrice}
        deliveryPrice={orderToEdit.current.deliveryPrice}
        handleNextClick={handleNextClick}
      />
    </form>
  );
}
