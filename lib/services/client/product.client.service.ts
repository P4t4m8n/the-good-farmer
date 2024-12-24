//******ALSO USE IN THE BACK, DO NOT add sensitive methods *******//

import {
  VEG_SUB_PRODUCT_TYPE,
  FRUIT_SUB_PRODUCT_TYPE,
  LEGUME_SUB_PRODUCT_TYPE,
} from "@/constants/products";

const getProductSubList = (type: TProductType): string[] => {
  switch (type) {
    case "vegetable":
      return VEG_SUB_PRODUCT_TYPE.slice();
    case "fruit":
      return FRUIT_SUB_PRODUCT_TYPE.slice();
    case "legume":
      return LEGUME_SUB_PRODUCT_TYPE.slice();
    default:
      return VEG_SUB_PRODUCT_TYPE.slice();
  }
};


const getEmptyProduct = (): IProduct => {
  return {
    name: "",
    imgUrl: "",
    productFamily: "",
    season: undefined,
    productType: "other",
    subProductType: "other",
    description: "",
    pricingDetails: [],
    _id: "",
  };
};

export const productClientService = {
  getProductSubList,
  getEmptyProduct
};
