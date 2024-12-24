/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import { fruits_veggies_data, fruits_veggies_img } from "./data";

export async function seed() {
  console.log("Seeding data...");
  const products = buildProductModels(fruits_veggies_data, fruits_veggies_img);

  const x = loadJson("lib/mongo/jsons/products.json");

  const y = x.map((p: any) => {
    const quantityType = p.quantityType.map((qt: any) => ({
      ...qt,
      price: { $numberDouble: qt.price },
    }));

    const nutrition = {
      calories: { $numberDouble: p.nutrition.calories },
      protein: { $numberDouble: p.nutrition.protein },
      fat: { $numberDouble: p.nutrition.fat },
      carbohydrates: { $numberDouble: p.nutrition.carbohydrates },
      fiber: { $numberDouble: p.nutrition.fiber },
      vitamins: p.nutrition.vitamins,
      minerals: p.nutrition.minerals,
    };

    const isAvailableSale: boolean = Math.random() > 0.5;

    const imgUrl = p.imgsUrl[0];
    delete p.imgsUrl;

    return { ...p, nutrition, quantityType, isAvailableSale, imgUrl };
  });
  saveToJson(y, "./x.json");
}

function buildProductModels(products: any[], images: any[]) {
  const imageMap = new Map<string, string[]>();
  images.forEach((img) => {
    const name = img.name;
    if (imageMap.has(name)) {
      imageMap.get(name)!.push(img.imageUrl);
    } else {
      imageMap.set(name, [img.imageUrl]);
    }
  });

  const productModels = products.map((product) => {
    const imgsUrl = imageMap.get(product.name) || [];
    const nutrition = {
      calories: { $numberDouble: product.nutrition?.calories },
      protein: { $numberDouble: product.nutrition?.protein },
      fat: { $numberDouble: product.nutrition?.fat },
      carbohydrates: { $numberDouble: product.nutrition?.carbohydrates },
      fiber: { $numberDouble: product.nutrition?.fiber },
      vitamins: product.nutrition?.vitamins,
      minerals: product.nutrition?.minerals,
    };
    const productType = product?.productType as TProductType;
    const quantity = getRandomNumber(3, 100);
    const quantityType = [
      { type: "unit", price: { $numberDouble: getRandomNumber(0, 50) } },
      { type: "kg", price: { $numberDouble: getRandomNumber(0, 50) } },
      { type: "pack", price: { $numberDouble: getRandomNumber(0, 50) } },
    ];

    const productModel = {
      name: product?.name,
      imgsUrl,
      family: product?.family,
      season: product?.season as TSeason,
      productType,
      subProductType: product?.subProductType || undefined,
      description: product?.description,
      nutrition,
      quantity,
      quantityType,
    };

    return productModel;
  });

  return productModels;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function saveToJson(data: any, path: string) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function loadJson(path: string): any {
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
}

function cleanDuplications(data: IProduct[]) {
  const uniqueData = data.filter(
    (value, index, self) =>
      self.findIndex((t) => t.name === value.name) === index
  );
  return uniqueData;
}
