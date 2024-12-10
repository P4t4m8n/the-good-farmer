const getEmpty = (userId?: string): IAddress => {
  return {
    _id: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    street: {
      name: "",
      number: "",
      floor: "",
      entrance: "",
      apartment: "",
    },
    userId: userId || "",
  };
};

export const addressClientService = {
  getEmpty,
};
