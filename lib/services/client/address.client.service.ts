import { IAddress } from "@/types/address.types";

const getEmpty = (userId?: string): IAddress => {
  return {
    _id: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    streetName: "",
    number: "",
    floor: "",
    entrance: "",
    apartment: "",

    userId: userId || "",
  };
};

export const addressClientService = {
  getEmpty,
};
