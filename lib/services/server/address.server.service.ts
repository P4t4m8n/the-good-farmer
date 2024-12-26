import xss from "xss";
import { ObjectId } from "mongodb";
import {
  IAddressDtoCreate,
  IAddressDtoUpdate,
} from "@/lib/db/models/address.model";
import { addressClientService } from "../client/address.client.service";

const formDataToDTO = (
  formData: FormData
): IAddressDtoCreate | IAddressDtoUpdate => {
  const _id = xss(formData.get("_id")?.toString() || "");
  const city = xss(formData.get("city")?.toString() || "");
  const state = xss(formData.get("state")?.toString() || "");
  const zipCode = xss(formData.get("zipCode")?.toString() || "");
  const country = xss(formData.get("country")?.toString() || "");
  const street = {
    name: xss(formData.get("streetName")?.toString() || ""),
    number: xss(formData.get("streetNumber")?.toString() || ""),
    floor: xss(formData.get("floor")?.toString() || ""),
    entrance: xss(formData.get("entrance")?.toString() || ""),
    apartment: xss(formData.get("apartment")?.toString() || ""),
  };
  const userId = new ObjectId(xss(formData.get("userId")?.toString() || ""));

  const returnData = {
    city,
    state,
    zipCode,
    country,
    street,
    userId,
  };

  if (_id) {
    const objectId = new ObjectId(_id);
    return { ...returnData, _id: objectId } as IAddressDtoUpdate;
  }
  return returnData as IAddressDtoCreate;
};

const DTOToAddress = (dto: IAddressDtoUpdate): IAddress => {
  return {
    _id: dto._id.toString(),
    city: dto.city,
    state: dto.state,
    zipCode: dto.zipCode,
    country: dto.country,
    street: dto.street,
    userId: dto.userId.toString(),
  };
};

export const addressServerService = {
  formDataToDTO,
  DTOToAddress,
  getEmpty: addressClientService.getEmpty(),
};
