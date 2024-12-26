import { deliveryClientService } from "@/lib/services/client/delivery.client.service";
import ClearLocalStorage from "./ClearLocalStorage";

interface Props {
  orderId: string;
  deliveryDate: string;
}
export default function CheckoutSuccess({ orderId, deliveryDate }: Props) {
  const date = deliveryClientService.formatDate(deliveryDate);
  return (
    <div>
      <ClearLocalStorage />
      <h2>{`Your order number ${orderId} is approve and will be delivered on ${date.day} ${date.date} between ${date.time}`}</h2>
    </div>
  );
}
