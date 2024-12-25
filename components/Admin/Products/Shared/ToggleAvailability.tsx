"use client";

import { toggleProductAvailability } from "@/lib/actions/product.actions";
import { useActionState } from "react";

interface Props {
  productId: string;
  isAvailableForSale: boolean;
}
export default function ToggleAvailability({
  productId,
  isAvailableForSale,
}: Props) {
  const [currentIsAvailableSale, formAction, isPending] = useActionState(
    toggleProductAvailability,
    isAvailableForSale
  );
  console.log("isPending:", isPending);
  return (
    <form action={formAction}>
      <input type="hidden" value={productId} name="productId" />
      <input
        type="checkbox"
        defaultChecked={currentIsAvailableSale}
        name="isAvailableForSale"
        onChange={(e) => {
        
          e.target.form?.submit();
        }}
      />
    </form>
  );
}
