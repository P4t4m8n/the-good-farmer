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

export const getAddresses = async (
  filter: IAddressFilter
): Promise<IAddress[]> => {
  try {
    const addressCollection =
      await DatabaseService.getCollection<IAddressDocument>("addresses");

    const pipeline: Record<string, unknown>[] = [];

    const matchStage: Record<string, unknown> = {};

    if (filter.city) {
      matchStage.city = { $regex: filter.city, $options: "i" };
    }

    if (filter.userId) {
      matchStage.userId = new ObjectId(filter.userId);
    }

    pipeline.push({ $match: matchStage });

    pipeline.push({
      $project: {
        _id: { $toString: "$_id" },
        street: 1,
        city: 1,
        state: 1,
        zipCode: 1,
        country: 1,
        userId: { $toString: "$userId" },
      },
    });

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
