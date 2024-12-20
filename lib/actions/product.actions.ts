"use server";

import { ObjectId } from "mongodb";
import DatabaseService from "../mongo/db";
import { AppError } from "../services/utils/AppError.server";
import { IProductDocument } from "../mongo/models/product.model";
import xss from "xss";

type MatchStage = {
  name?: { $regex: string; $options: string };
  productType?: TProductType;
  subProductType?: string;
};

/**
 * Retrieves a list of products based on the provided filter criteria.
 *
 * @param filter - The criteria used to filter the products.
 * @returns A promise that resolves to an array of products, which can be either small or full product details.
 * @throws Throws an error if there's an issue retrieving the products.
 */
export const getProducts = async (
  filter: IProductFilter
): Promise<IProductSmall[] | IProduct[]> => {
  try {
    const productsCollection =
      await DatabaseService.getCollection<IProductDocument>("products");

    const { pipeline, isSmallProduct } = buildPipeline(filter);

    const products = await productsCollection
      .aggregate<IProductSmall | IProduct>(pipeline)
      .toArray();

    if (!products.length) {
      console.warn("No products found.");
      return [];
    }

    return isSmallProduct
      ? (products as IProductSmall[])
      : (products as IProduct[]);
  } catch (error) {
    throw AppError.create(`Error getting products ${error}`, 500, true);
  }
};

/**
 * Retrieves a product based on the provided filter criteria.
 *
 * @param filter - The filter criteria to locate the product.
 * @returns A promise that resolves to the found product (`IProduct` or `IProductSmall`), or `null` if not found.
 * @throws {AppError} If an error occurs while retrieving the product.
 */
export const getProductById = async (
  filter: IProductFilter
): Promise<IProduct | IProductSmall | null> => {
  try {
    const productsCollection = await DatabaseService.getCollection<IProduct>(
      "products"
    );

    const { pipeline } = buildPipeline(filter);

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

/**
 * Builds a MongoDB match stage for product filtering.
 * @param filter - The filter criteria for products
 * @param filter.name - Optional name to filter products (case-insensitive regex match)
 * @param filter.productType - Optional product type to filter products
 * @param filter.subProductType - Optional sub-product type to filter products
 * @param filter._id - Optional MongoDB ObjectId to filter a specific product
 * @returns A MongoDB match stage object containing the filtered criteria
 */
const buildMatchStage = (filter: IProductFilter): MatchStage => {
  const name = xss(filter?.name || "").toString();
  const productType = xss(filter?.productType || "") as TProductType;
  const subProductType = xss(filter?.subProductType || "").toString();
  const _id = xss(filter?._id || "").toString();

  return {
    ...(name && { name: { $regex: name, $options: "i" } }),
    ...(productType && { productType }),
    ...(subProductType && { subProductType }),
    ...(_id && { _id: new ObjectId(_id) }),
  };
};

/**
 * Builds a MongoDB aggregation pipeline for querying products based on the provided filter.
 * The pipeline includes stages for matching, skipping, limiting, and projecting product fields.
 *
 * @param filter - The product filter criteria used to construct the pipeline.
 * @returns An object containing:
 * - `pipeline`: An array of aggregation stages for the MongoDB query.
 * - `isSmallProduct`: A boolean indicating whether to return a simplified product projection.
 */
const buildPipeline = (
  filter: IProductFilter
): { pipeline: object[]; isSmallProduct: boolean } => {
  const DEFAULT_LIMIT = 100;

  const pipeline: object[] = [];
  const skip = Number.isInteger(filter?.skip) ? filter.skip : 0;
  const limit = Number.isInteger(filter?.limit) ? filter.limit : DEFAULT_LIMIT;
  const isSmallProduct =
    typeof filter?.isSmallProduct === "boolean" ? filter.isSmallProduct : false;

  pipeline.push({ $match: buildMatchStage(filter) });

  if (skip && skip > 0) pipeline.push({ $skip: skip });
  if (limit && limit > 0) pipeline.push({ $limit: limit });

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

  return { pipeline, isSmallProduct };
};
