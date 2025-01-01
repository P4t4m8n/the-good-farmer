//******ALSO USE IN THE BACK, DO NOT add sensitive methods *******//

import { IAddress } from "@/types/address.types";
import { TDelivery } from "@/types/order";

const getDeliveryDates = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: Partial<IAddress>
): {
  time: string;
  date: string;
}[] => {
  //TODO: Implement logic to get delivery dates base on address
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 3; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const deliveryWindow = formatDate(nextDay);
    dates.push(deliveryWindow);
  }

  return dates;
};

const formatDate = (deliveryDate: string | Date): TDelivery => {
  const fixedDate =
    typeof deliveryDate === "string" ? new Date(deliveryDate) : deliveryDate;
  const day = fixedDate.toLocaleString("en-us", {
    weekday: "long",
  });
  const date = fixedDate.toISOString().split("T")[0];
  const time = "15:00 - 21:00";

  return {
    day,
    date,
    time,
  };
};

export const deliveryClientService = {
  getDeliveryDates,
  formatDate,
};
