"use server";

import { redirect } from "next/navigation";
import DatabaseService from "../mongo/db";
import { IOrderDocument } from "../mongo/models/order.model";
import { ObjectId } from "mongodb";
import { orderServerService } from "../services/server/order.server.service";
import { AppError } from "../services/utils/AppError.server";

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

    const pipeline: Record<string, unknown>[] = [
      { $match: { _id: new ObjectId(orderId) } },
    ];

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
      $project: {
        _id: { $toString: "$_id" },
        productsPrice: 1,
        deliveryPrice: 1,
        deliveryDate: 1,
        payment: 1,
        status: 1,
        userDetails: 1,
        address: {
          city: 1,
          street: 1,
        },
      },
    });

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
