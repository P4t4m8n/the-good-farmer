// import { getProducts, getProductById } from "../lib/actions/product.actions";
// import DatabaseService from "../lib/mongo/db";
// import { AppError } from "../lib/services/utils/AppError.server";

// jest.mock("../lib/mongo/db");
// jest.mock("../lib/services/utils/AppError.server");

// describe("Product Actions", () => {
//   const mockCollection = {
//     aggregate: jest.fn().mockReturnThis(),
//     toArray: jest.fn(),
//     next: jest.fn(),
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (DatabaseService.getCollection as jest.Mock).mockResolvedValue(
//       mockCollection
//     );
//   });

//   describe("getProducts", () => {
//     it("should return an array of products", async () => {
//       const mockProducts = [{ name: "Product 1" }, { name: "Product 2" }];
//       mockCollection.toArray.mockResolvedValue(mockProducts);

//       const filter = { name: "Product" };
//       const result = await getProducts(filter);

//       expect(DatabaseService.getCollection).toHaveBeenCalledWith("products");
//       expect(mockCollection.aggregate).toHaveBeenCalled();
//       expect(mockCollection.toArray).toHaveBeenCalled();
//       expect(result).toEqual(mockProducts);
//     });

//     it("should return an empty array if no products found", async () => {
//       mockCollection.toArray.mockResolvedValue([]);

//       const filter = { name: "NonExistentProduct" };
//       const result = await getProducts(filter);

//       expect(result).toEqual([]);
//     });

//     it("should throw an error if there is an issue retrieving products", async () => {
//       const mockError = new Error("Database error");
//       mockCollection.toArray.mockRejectedValue(mockError);

//       const filter = { name: "Product" };

//       await expect(getProducts(filter)).rejects.toThrow(AppError);
//     });
//   });

//   describe("getProductById", () => {
//     it("should return a product by ID", async () => {
//       const mockProduct = { name: "Product 1" };
//       mockCollection.next.mockResolvedValue(mockProduct);

//       const filter = { _id: "someObjectId" };
//       const result = await getProductById(filter);

//       expect(DatabaseService.getCollection).toHaveBeenCalledWith("products");
//       expect(mockCollection.aggregate).toHaveBeenCalled();
//       expect(mockCollection.next).toHaveBeenCalled();
//       expect(result).toEqual(mockProduct);
//     });

//     it("should return null if product not found", async () => {
//       mockCollection.next.mockResolvedValue(null);

//       const filter = { _id: "nonExistentObjectId" };
//       const result = await getProductById(filter);

//       expect(result).toBeNull();
//     });

//     it("should throw an error if there is an issue retrieving the product by ID", async () => {
//       const mockError = new Error("Database error");
//       mockCollection.next.mockRejectedValue(mockError);

//       const filter = { _id: "someObjectId" };

//       await expect(getProductById(filter)).rejects.toThrow(AppError);
//     });
//   });
// });
