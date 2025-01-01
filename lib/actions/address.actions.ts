"use server";

import { ObjectId } from "mongodb";
import DatabaseService from "../db/db";
import {
  IAddressDocument,
  IAddressDtoUpdate,
} from "../db/models/address.model";
import { AppError } from "../services/utils/AppError.server";
import { addressServerService } from "../services/server/address.server.service";
import { IAddress, IAddressFilter } from "@/types/address.types";
import xss from "xss";

export const getAddresses = async (
  filter: IAddressFilter
): Promise<IAddress[]> => {
  try {
    const addressCollection =
      await DatabaseService.getCollection<IAddressDocument>("addresses");

    const { pipeline } = buildPipeline(filter);

    const addresses = await addressCollection
      .aggregate<IAddress>(pipeline)
      .toArray();

    if (!addresses || !addresses?.length) {
      AppError.create("No addresses found", 404, true);
      return [];
    }

    return addresses;
  } catch (error) {
    throw AppError.create(`Error getting addresses ${error}`, 500, true);
  }
};

export const saveAddress = async (
  _: IAddress,
  formData: FormData
): Promise<IAddress> => {
  try {
    const dto = addressServerService.formDataToDTO(formData);
    const addressCollection =
      await DatabaseService.getCollection<IAddressDocument>("addresses");

    const { upsertedId } = await addressCollection.updateOne(
      { _id: new ObjectId((dto as IAddressDtoUpdate)?._id) },
      { $set: dto },
      { upsert: true }
    );

    if (!upsertedId) {
      throw AppError.create("Error saving address", 500, true);
    }

    const address = addressServerService.DTOToAddress({
      ...dto,
      _id: upsertedId,
    });

    return address;
  } catch (error) {
    throw AppError.create(`Error saving address ${error}`, 500, true);
  }
};

const buildMatchStage = (filter: IAddressFIlter) => {
  const userId = xss(filter?.userId || "").toString();
  const city = xss(filter?.city || "").toString();

  const _id = xss(filter?._id || "").toString();

  return {
    ...(userId && { userId: new ObjectId(userId) }),
    ...(_id && { _id: new ObjectId(_id) }),
    ...(city && { city: { $regex: city, $options: "i" } }),
  };
};

const buildPipeline = (filter: IAddressFIlter): { pipeline: object[] } => {
  const DEFAULT_LIMIT = 100;

  const pipeline: object[] = [];
  const skip = Number.isInteger(filter?.skip) ? filter.skip : 0;
  const limit = Number.isInteger(filter?.limit) ? filter.limit : DEFAULT_LIMIT;

  pipeline.push({ $match: buildMatchStage(filter) });

  if (skip && skip > 0) pipeline.push({ $skip: skip });
  if (limit && limit > 0) pipeline.push({ $limit: limit });

  pipeline.push({
    $project: {
      _id: { $toString: "$_id" },
      city: 1,
      state: 1,
      zipCode: 1,
      country: 1,
      userId: { $toString: "$userId" },
    },
  });

  return { pipeline };
};
