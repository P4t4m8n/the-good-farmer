import { IProductDocument } from "@/lib/db/models/product.model";
import { sanitizeService } from "../utils/sanitize.server";
import { uploadImg } from "../client/uploadImg.client.service";
import { ObjectId } from "mongodb";
import { IPricingDetails, TProductType, TQuantityType, TSeason } from "@/types/product";

const formDataToProductDto = async (
  formData: FormData
): Promise<IProductDocument> => {
  try {
    const name = sanitizeService.sanitizeString(formData.get("name"));
    const productType = sanitizeService.sanitizeString(
      formData.get("productType")
    );
    const pricePerKilo = sanitizeService.sanitizeNumber(
      formData.get("pricePerKilo")
    );

    const _id = sanitizeService.sanitizeString(formData.get("_id"));

    if (!name || !productType || isNaN(pricePerKilo) || pricePerKilo <= 0) {
      throw new Error("Invalid form data: Missing or invalid required fields.");
    }

    // Sanitize optional fields
    const productFamily = sanitizeService.sanitizeString(
      formData.get("productFamily")
    );
    const season = sanitizeService.sanitizeString(formData.get("season"));
    const subProductType = sanitizeService.sanitizeString(
      formData.get("subProductType")
    );
    const isAvailableForSale =
      sanitizeService.sanitizeBoolean(formData.get("isAvailableForSale")) ||
      false;
    const description = sanitizeService.sanitizeString(
      formData.get("description")
    );
    const imgFile = formData.get("imgUrl") as File | null;
    let imgUrl = "";
    // Process the image URL (mock CDN upload for simplicity)
    if (imgFile) {
      imgUrl = await uploadImg(imgFile);
    }

    // Extract and sanitize pricing details
    const pricingDetails: IPricingDetails[] = [];
    let index = 0;

    while (formData.has(`weightPerType-${index}`)) {
      const weightPerType = sanitizeService.sanitizeNumber(
        formData.get(`weightPerType-${index}`)
      );
      const stock = sanitizeService.sanitizeNumber(
        formData.get(`stock-${index}`),
        0
      );
      const discount = sanitizeService.sanitizeNumber(
        formData.get(`discount-${index}`),
        0
      );
      const quantityType = sanitizeService.sanitizeString(
        formData.get(`quantityType-${index}`)
      );

      if (weightPerType > 0 && stock >= 0 && discount >= 0) {
        pricingDetails.push({
          weightPerType,
          stock,
          discount,
          type: quantityType as TQuantityType,
        });
      }

      index++;
    }

    // Construct the IProductDocument object
    const productDocument: IProductDocument = {
      name,
      imgUrl,
      productFamily,
      season: season ? (season as TSeason) : undefined,
      productType: productType as TProductType,
      subProductType: subProductType || undefined,
      description: description || undefined,
      pricePerKilo,
      pricingDetails,
      isAvailableForSale,
    };

    return _id
      ? { ...productDocument, _id: new ObjectId(_id) }
      : productDocument;
  } catch (error) {
    console.error("error:", error);
    throw new Error("Error processing product form data");
  }
};

export const productServerService = {
  formDataToProductDto,
};
