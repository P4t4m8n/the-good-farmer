import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess/CheckoutSuccess";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string; deliveryDate: string }>;
}) {
  const { orderId, deliveryDate } = await searchParams;

  return <CheckoutSuccess orderId={orderId} deliveryDate={deliveryDate} />;
}
