export const dynamic = "force-dynamic";
import CheckoutPayment from "@/components/Checkout/CheckoutPayment/CheckoutPayment";
import { getOrderById } from "@/lib/actions/order.actions";

export default async function CheckoutPaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await getOrderById(orderId);
  if (!order) {
    return <div>Order not found</div>;
  }
  return <CheckoutPayment order={order} />;
}
