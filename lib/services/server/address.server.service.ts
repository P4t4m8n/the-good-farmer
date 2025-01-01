import xss from "xss";
import { ObjectId } from "mongodb";
import {
  IAddressDtoCreate,
  IAddressDtoUpdate,
} from "@/lib/db/models/address.model";
import { addressClientService } from "../client/address.client.service";
import { IAddress } from "@/types/address.types";

const formDataToDTO = (
  formData: FormData
): IAddressDtoCreate | IAddressDtoUpdate => {
  const _id = xss(formData.get("_id")?.toString() || "");
  const city = xss(formData.get("city")?.toString() || "");
  const state = xss(formData.get("state")?.toString() || "");
  const zipCode = xss(formData.get("zipCode")?.toString() || "");
  const country = xss(formData.get("country")?.toString() || "");
  const streetName = xss(formData.get("name")?.toString() || "");
  const number = xss(formData.get("number")?.toString() || "");
  const floor = xss(formData.get("floor")?.toString() || "");
  const entrance = xss(formData.get("entrance")?.toString() || "");
  const apartment = xss(formData.get("apartment")?.toString() || "");

  const userId = new ObjectId(xss(formData.get("userId")?.toString() || ""));

  const returnData = {
    city,
    state,
    zipCode,
    country,
    userId,
    streetName,
    number,
    floor,
    entrance,
    apartment,
  };

  if (_id) {
    const objectId = new ObjectId(_id);
    return { ...returnData, _id: objectId };
  }
  return returnData;
};

const DTOToAddress = (dto: IAddressDtoUpdate): IAddress => {
  return {
    _id: dto._id.toString(),
    city: dto.city,
    state: dto.state,
    zipCode: dto.zipCode,
    country: dto.country,
    streetName: dto.streetName,
    number: dto.number,
    floor: dto.floor,

    userId: dto.userId.toString(),
  };
};

export const addressServerService = {
  formDataToDTO,
  DTOToAddress,
  getEmpty: addressClientService.getEmpty(),
};
