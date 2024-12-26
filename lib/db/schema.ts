import DatabaseService from "./db";
import { IAddressDocument } from "./models/address.model";
import { IOrderDocument } from "./models/order.model";
import { IProductDocument } from "./models/product.model";
import { IUserDocument } from "./models/user.model";

export const createCollections = async () => {
  try {
    const db = await DatabaseService.getDb();

    // // User Collection
    await db.createCollection<IUserDocument>("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["firstName", "lastName", "email"],
          properties: {
            firstName: {
              bsonType: "string",
              description: "First name is required",
            },
            lastName: {
              bsonType: "string",
              description: "Last name is required",
            },
            email: {
              bsonType: "string",
              pattern: "^.+@.+$",
              description: "Valid email is required",
            },
            passwordHash: {
              bsonType: ["string", "null"], // Allow string or null
              description: "Password is required if Google ID is not provided",
            },
            googleId: {
              bsonType: ["string", "null"], // Allow string or null
              description: "Google ID is required if Password is not provided",
            },
            imgUrl: {
              bsonType: "string",
            },
          },
          // Either passwordHash or googleId is required allowed both
          anyOf: [{ required: ["passwordHash"] }, { required: ["googleId"] }],
        },
      },
    });

    // Address Collection
    await db.createCollection<IAddressDocument>("addresses", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["street", "city", "userId"],
          properties: {
            street: {
              bsonType: "object",
              required: ["name"],
              description: "Street is required",
              properties: {
                name: {
                  bsonType: "string",
                  description: "Street name is required",
                },
                number: {
                  bsonType: "string",
                  description: "Street number is required",
                },
                floor: { bsonType: "string" },
                entrance: { bsonType: "string" },
                apartment: { bsonType: "string" },
              },
            },
            city: { bsonType: "string", description: "City is required" },
            state: { bsonType: "string" },
            zipCode: { bsonType: "string" },
            country: {
              bsonType: "string",
              description: "Country is required",
            },
            userId: {
              bsonType: "objectId",
              description: "User ID is required",
            },
          },
        },
      },
    });

    // // Order Collection
    await db.createCollection<IOrderDocument>("orders", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: [
            "userId",
            "addressId",
            "productsPrice",
            "deliveryPrice",
            "products",
            "deliveryDate",
          ],
          properties: {
            userId: {
              bsonType: "objectId",
              description: "User ID is required",
            },
            addressId: {
              bsonType: "objectId",
              description: "Order address ID is required",
            },
            productsPrice: {
              bsonType: "number",
              minimum: 0,
              description: "Total price is required",
            },
            deliveryPrice: {
              bsonType: "number",
              minimum: 0,
              description: "Delivery price is required",
            },
            deliveryDate: { bsonType: "date", description: "Order date" },
            isDelivered: {
              bsonType: "bool",
              description: "Is order delivered",
            },
            products: {
              bsonType: "array",
              items: {
                bsonType: "object",
                required: [
                  "productId",
                  "quantityType",
                  "quantity",
                  "totalPrice",
                ],
                properties: {
                  productId: {
                    bsonType: "objectId",
                    description: "Product ID is required",
                  },
                  quantity: {
                    bsonType: "number",
                    minimum: 1,
                    description: "Quantity must be at least 1",
                  },
                  quantityType: {
                    bsonType: "string",
                    enum: ["lb", "oz", "g", "kg", "unit", "pack", "bunch"],
                    description: "Quantity type",
                  },
                  totalPrice: {
                    bsonType: "number",
                    minimum: 0,
                    description: "Total price is required",
                  },
                },
              },
            },
            status: {
              bsonType: "string",
              enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
              ],
              description: "Order status",
            },
            payment: {
              bsonType: "object",
              properties: {
                authNum: { bsonType: ["string", "null"] },
                type: {
                  bsonType: "string",
                  enum: ["cash", "credit card"],
                  description: "Payment method",
                },
                paymentDate: { bsonType: ["date", "null"] },
                email: { bsonType: "string" },
                cardHolder: { bsonType: "string" },
                status: {
                  bsonType: "string",
                  enum: ["pending", "approved", "declined", "refunded"],
                  description: "Payment status",
                },
              },
            },
            userDetails: {
              bsonType: "object",
              required: ["firstName", "lastName", "email", "phone"],
              properties: {
                firstName: {
                  bsonType: "string",
                  description: "First name is required",
                },
                lastName: {
                  bsonType: "string",
                  description: "Last name is required",
                },
                email: {
                  bsonType: "string",
                  pattern: "^.+@.+$",
                  description: "Valid email is required",
                },
                phone: { bsonType: "string" },
              },
            },
          },
        },
      },
    });

    // Product Collection
    await db.createCollection<IProductDocument>("products", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "productType", "pricePerKilo"],
          properties: {
            name: {
              bsonType: "string",
              description: "Product name is required",
            },
            imgUrl: {
              bsonType: "string",
              description: "Image",
            },
            productFamily: { bsonType: "string" },
            season: {
              bsonType: "string",
              enum: [
                "spring",
                "summer",
                "fall",
                "winter",
                "year-round",
                "none",
              ],
              description: "Season",
            },
            productType: {
              bsonType: "string",
              enum: [
                "vegetable",
                "fruit",
                "herb",
                "root",
                "legume",
                "nut",
                "spice",
                "seafood",
                "mushrooms",
                "grocery",
                "dairy",
                "other",
              ],
              description: "Product type is required",
            },
            subProductType: { bsonType: "string" },
            description: { bsonType: "string" },
            rating: {
              bsonType: "number",
              minimum: 0,
              maximum: 5,
              description: "Product rating",
            },
            pricePerKilo: {
              bsonType: "number",
              description: "Price per kilo is required",
            },
            pricingDetails: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  weightPerType: {
                    bsonType: "number",
                    minimum: 0,
                    description: "weight per type is required",
                  },
                  type: {
                    bsonType: "string",
                    enum: ["lb", "oz", "g", "kg", "unit", "pack", "bunch"],
                    description: "Quantity type",
                  },
                  stock: {
                    bsonType: "number",
                    minimum: 0,
                    description: "Stock is required",
                  },
                  discount: {
                    bsonType: "number",
                    minimum: 0,
                    maximum: 100,
                    description: "Discount",
                  },
                },
              },
            },
            isAvailableForSale: { bsonType: "bool" },
          },
        },
      },
    });

    console.info("Collections created successfully");
  } catch (error) {
    console.error("Error creating collections:", error);
  } finally {
    await DatabaseService.closeConnection();
  }
};
