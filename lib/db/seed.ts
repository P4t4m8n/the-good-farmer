/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";

export async function seed() {
  console.log("Seeding data...");

  const x = loadJson("lib/mongo/jsons/products.json");
  console.log("x :", x);

  const y = x.map((p: any) => {
    delete p.imgsUrl;
    const isPack = Math.random() > 0.7;
    const isDiscount = Math.random() > 0.7;

    const kg = {
      type: "kg",
      weightPerType: 1,
      stock: getRandomRoundedNumber(100, 1000),
      discount: isDiscount ? getRandomNumber(0.1, 0.7) : 0,
    };

    const pack = {
      type: "pack",
      weightPerType: getRandomNumber(1, 5),
      stock: getRandomRoundedNumber(100, 1000),
      discount: isDiscount ? getRandomNumber(0.1, 0.7) : 0,
    };

    const unit = {
      type: "unit",
      weightPerType: getRandomNumber(0.1, 2),
      stock: getRandomRoundedNumber(100, 1000),
      discount: isDiscount ? getRandomNumber(0.1, 0.7) : 0,
    };

    const pricingDetails = [];
    if (isPack) pricingDetails.push(pack);
    else pricingDetails.push(unit);
    pricingDetails.push(kg);

    const product = {
      name: p.name,
      imgUrl: p.imgUrl,
      productFamily: p.productFamily,
      season: p.season,
      productType: p.productType,
      subProductType: p.subProductType,
      description: p.description,
      pricePerKilo: getRandomPrice(1, 50),
      rating: getRandomRoundedNumber(0, 5),
      isAvailableForSale: true,
      pricingDetails,
    };

    return product;
  });
  saveToJson(y, "./x.json");
}

// function buildProductModels(products: any[], images: any[]) {
//   const imageMap = new Map<string, string[]>();
//   images.forEach((img) => {
//     const name = img.name;
//     if (imageMap.has(name)) {
//       imageMap.get(name)!.push(img.imageUrl);
//     } else {
//       imageMap.set(name, [img.imageUrl]);
//     }
//   });

//   const productModels = products.map((product) => {
//     const imgsUrl = imageMap.get(product.name) || [];
//     const nutrition = {
//       calories: { $numberDouble: product.nutrition?.calories },
//       protein: { $numberDouble: product.nutrition?.protein },
//       fat: { $numberDouble: product.nutrition?.fat },
//       carbohydrates: { $numberDouble: product.nutrition?.carbohydrates },
//       fiber: { $numberDouble: product.nutrition?.fiber },
//       vitamins: product.nutrition?.vitamins,
//       minerals: product.nutrition?.minerals,
//     };
//     const productType = product?.productType as TProductType;
//     const quantity = getRandomNumber(3, 100);
//     const quantityType = [
//       { type: "unit", price: { $numberDouble: getRandomNumber(0, 50) } },
//       { type: "kg", price: { $numberDouble: getRandomNumber(0, 50) } },
//       { type: "pack", price: { $numberDouble: getRandomNumber(0, 50) } },
//     ];

//     const productModel = {
//       name: product?.name,
//       imgsUrl,
//       family: product?.family,
//       season: product?.season as TSeason,
//       productType,
//       subProductType: product?.subProductType || undefined,
//       description: product?.description,
//       nutrition,
//       quantity,
//       quantityType,
//     };

//     return productModel;
//   });

//   return productModels;
// }

function getRandomPrice(min: number, max: number): number {
  const isRounded = Math.random() > 0.5;

  const num = isRounded
    ? Math.floor(Math.random() * (max - min) + min) + 0.99
    : Math.floor(Math.random() * (max - min) + min);
  return num;
}
function getRandomRoundedNumber(min: number, max: number): number {
  const num = Math.floor(Math.random() * (max - min) + min);
  return num;
}

function getRandomNumber(min: number, max: number): number {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(1));
}
function saveToJson(data: any, path: string) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function loadJson(path: string): any {
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
}

// function cleanDuplications(data: IProduct[]) {
//   const uniqueData = data.filter(
//     (value, index, self) =>
//       self.findIndex((t) => t.name === value.name) === index
//   );
//   return uniqueData;
// }
