import { getOrders } from "@/lib/actions/order.actions";

export default async function ProfileOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orders = await getOrders({ userId: id });
  console.log("orders:", orders);
  return <div>page</div>;
}
