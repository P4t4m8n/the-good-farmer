"use server";

import { ObjectId } from "mongodb";
import DatabaseService from "../mongo/db";
import { AppError } from "../services/utils/AppError.server";

export const getProducts = async (
  filter: IProductFilter
): Promise<IProductSmall[]> => {
  try {
    const productsCollection = await DatabaseService.getCollection<IProduct>(
      "products"
    );

    const pipeline: Record<string, unknown>[] = [];
    const { name, skip, productType, limit, isSmallProduct, subProductType } =
      filter;

    const matchStage: Record<string, unknown> = {};

    if (name) {
      matchStage.name = { $regex: filter.name, $options: "i" };
    }

    if (productType) {
      matchStage.productType = filter.productType;
    }

    if (subProductType) {
      matchStage.subProductType = filter.subProductType;
    }

    pipeline.push({ $match: matchStage });

    if ((skip || 0) > 0) {
      pipeline.push({ $skip: skip });
    }
    if ((limit || 100) > 0) {
      pipeline.push({ $limit: limit });
    }

    if (isSmallProduct) {
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          imgUrl: { $arrayElemAt: ["$imgsUrl", 0] },
          productType: 1,
          subProductType: 1,
          quantityType: 1,
        },
      });
    } else {
      // For full product details, project all fields, convert _id to string, compute imgUrl
      pipeline.push({
        $addFields: {
          imgUrl: { $arrayElemAt: ["$imgsUrl", 0] },
        },
      });
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          imgsUrl: 0, // Exclude imgsUrl from the result
        },
      });
    }

    const products = await productsCollection
      .aggregate<IProductSmall>(pipeline)
      .toArray();

    if (!products || products.length === 0) {
      console.warn("No products found.");
      return [];
    }

    return products;
  } catch (error) {
    throw AppError.create(`Error getting products ${error}`, 500, true);
  }
};

export const getProductById = async (
  productId: string,
  isSmallProduct = false
): Promise<IProduct | IProductSmall | null> => {
  try {
    const productsCollection = await DatabaseService.getCollection<IProduct>(
      "products"
    );

    const pipeline: Record<string, unknown>[] = [
      { $match: { _id: new ObjectId(productId) } },
    ];

    if (isSmallProduct) {
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          imgUrl: { $arrayElemAt: ["$imgsUrl", 0] },
          productType: 1,
          subProductType: 1,
          quantityType: 1,
        },
      });
    } else {
      // For full product details, project all fields, convert _id to string, compute imgUrl
      pipeline.push({
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          imgsUrl: 1,
          family: 1,
          season: 1,
          productType: 1,
          subProductType: 1,
          description: 1,
          rating: 1,
          quantityType: 1,
          nutrition: 1,
        },
      });
    }

    const product = await productsCollection
      .aggregate<IProduct | IProductSmall>(pipeline)
      .next();

    if (!product) {
      console.warn("Product not found.");
      return null;
    }

    return product;
  } catch (error) {
    throw AppError.create(`Error getting product by id ${error}`, 500, true);
  }
};
