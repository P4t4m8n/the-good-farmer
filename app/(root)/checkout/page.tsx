export const dynamic = "force-dynamic";

import CheckoutIndex from "@/components/Checkout/Checkout";
import { getAddresses } from "@/lib/actions/address.actions";
import { getSessionUser } from "@/lib/actions/auth.actions";
import { orderServerService } from "@/lib/services/server/order.server.service";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/signin");
  }

  const addresses = await getAddresses({ userId: user._id });
  const order = orderServerService.getEmpty(user);

  return <CheckoutIndex addresses={addresses} order={order} />;
}
