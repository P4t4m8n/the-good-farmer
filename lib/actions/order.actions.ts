"use server";

import { redirect } from "next/navigation";
import DatabaseService from "../db/db";
import { IOrderDocument } from "../db/models/order.model";
import { ObjectId } from "mongodb";
import { orderServerService } from "../services/server/order.server.service";
import { AppError } from "../services/utils/AppError.server";
import xss from "xss";

export const saveOrder = async (state: IOrder, formData: FormData) => {
  let url = "/checkout/payment/";
  try {
    const dto = orderServerService.fromDataToOrderDto(formData, state.products);
    const orderCollection = await DatabaseService.getCollection<IOrderDocument>(
      "orders"
    );

    const { insertedId } = await orderCollection.insertOne(dto, {
      writeConcern: { w: "majority", j: true },
    });
    if (!insertedId) {
      throw AppError.create("Error saving order", 500, true);
    }
    url += insertedId.toString();
  } catch (error) {
    throw AppError.create(`Error saving order ${error}`, 500, true);
  }

  redirect(url);
};

export const getOrderById = async (
  orderId: string
): Promise<Partial<IOrder>> => {
  try {
    const orderCollection = await DatabaseService.getCollection<IOrderDocument>(
      "orders"
    );

    const { pipeline } = buildPipeline({ _id: orderId });

    const order = await orderCollection
      .aggregate<Partial<IOrder>>(pipeline)
      .next();

    if (!order) {
      throw AppError.create(`Order not found`, 404, true);
    }

    return order;
  } catch (error) {
    throw AppError.create(`Error getting order by id ${error}`, 500, true);
  }
};

export const getOrders = async (filter: IOrderFilter): Promise<IOrder[]> => {
  try {
    const orderCollection = await DatabaseService.getCollection<IOrderDocument>(
      "orders"
    );

    const { pipeline } = buildPipeline(filter);

    const orders = await orderCollection.aggregate<IOrder>(pipeline).toArray();

    if (!orders.length) {
      console.warn("No orders found.");
      return [];
    }
    return orders;
  } catch (error) {
    throw AppError.create(`Error getting orders ${error}`, 500, true);
  }
};

export const chargeCreditCard = async (_: unknown, formData: FormData) => {
  let url = "/checkout/success";
  try {
    const CC = orderServerService.formDataToCreditCard(formData);
    const orderPayment: IOrderPayment = {
      authNum: Math.random().toString(36).substring(7),
      type: "credit card",
      paymentDate: new Date(),
      email: CC.cardHolder,
      cardHolder: CC.cardHolder,
      status: "approved",
    };
    const orderId = new ObjectId(CC.orderId);
    const orderCollection = await DatabaseService.getCollection<IOrderDocument>(
      "orders"
    );

    const order = await orderCollection.findOneAndUpdate(
      { _id: orderId },
      { $set: { payment: orderPayment } }
    );

    const deliveryDate = order?.deliveryDate;
    url += `?orderId=${CC.orderId}&deliveryDate=${deliveryDate}`;
  } catch (error) {
    throw AppError.create(`Error charging credit card ${error}`, 500, true);
  }

  redirect(url);
};

const buildMatchStage = (filter: IOrderFilter) => {
  const userId = xss(filter?.userId || "").toString();
  const status = xss(filter?.status || "") as TOrderStatus;
  const fromDate = xss(filter?.fromDate || "").toString();
  const toDate = xss(filter?.toDate || "").toString();
  const _id = xss(filter?._id || "").toString();

  return {
    ...(status && { status }),
    ...(userId && { userId: new ObjectId(userId) }),
    ...(fromDate && { createdAt: { $gte: new Date(fromDate) } }),
    ...(toDate && { createdAt: { $lte: new Date(toDate) } }),
    ...(_id && { _id: new ObjectId(_id) }),
  };
};

const buildPipeline = (filter: IOrderFilter): { pipeline: object[] } => {
  const DEFAULT_LIMIT = 100;

  const pipeline: object[] = [];
  const skip = Number.isInteger(filter?.skip) ? filter.skip : 0;
  const limit = Number.isInteger(filter?.limit) ? filter.limit : DEFAULT_LIMIT;

  pipeline.push({ $match: buildMatchStage(filter) });

  if (skip && skip > 0) pipeline.push({ $skip: skip });
  if (limit && limit > 0) pipeline.push({ $limit: limit });

  pipeline.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$users",
      preserveNullAndEmptyArrays: true,
    },
  });
  pipeline.push({
    $lookup: {
      from: "addresses",
      localField: "addressId",
      foreignField: "_id",
      as: "address",
    },
  });

  pipeline.push({
    $unwind: {
      path: "$address",
      preserveNullAndEmptyArrays: true,
    },
  });

  pipeline.push({
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "_id",
      as: "products",
    },
  });

  pipeline.push({
    $project: {
      _id: { $toString: "$_id" },
      productsPrice: 1,
      deliveryPrice: 1,
      deliveryDate: 1,
      isDelivered: 1,
      amountOfProducts: { $sum: "$products" },
      status: 1,
    },
  });

  return { pipeline };
};
