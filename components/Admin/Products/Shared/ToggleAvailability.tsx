"use client";

import { toggleProductAvailability } from "@/lib/actions/product.actions";
import { useActionState } from "react";

interface Props {
  productId: string;
  isAvailableSale: boolean;
}
export default function ToggleAvailability({
  productId,
  isAvailableSale,
}: Props) {
  const [currentIsAvailableSale, formAction, isPending] = useActionState(
    toggleProductAvailability,
    isAvailableSale
  );
  console.log("isPending:", isPending);
  return (
    <form action={formAction}>
      <input type="hidden" value={productId} name="productId" />
      <input
        type="checkbox"
        defaultChecked={currentIsAvailableSale}
        name="isAvailableSale"
        onChange={(e) => e.target.form?.submit()}
      />
    </form>
  );
}
