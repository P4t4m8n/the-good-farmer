// import { CART_DATA_EXPIRATION_TIME, localStorageClientService } from "@/lib/services/client/localSession.service";
// import LZString from "lz-string";

// jest.mock("lz-string");
// const mockLocalStorage = (() => {
//   let store: Record<string, string> = {};

//   return {
//     getItem: jest.fn((key: string) => store[key] || null),
//     setItem: jest.fn((key: string, value: string) => {
//       store[key] = value;
//     }),
//     removeItem: jest.fn((key: string) => {
//       delete store[key];
//     }),
//     clear: jest.fn(() => {
//       store = {};
//     }),
//   };
// })();

// Object.defineProperty(window, "localStorage", {
//   value: mockLocalStorage,
// });

// const mockDateNow = jest.spyOn(Date, "now");

// describe("Session Data Utility", () => {
//   beforeEach(() => {
//     mockLocalStorage.clear();
//     jest.clearAllMocks();
//     mockDateNow.mockReturnValue(0); // Ensure consistent timestamp
//   });

//   describe("storeSessionData", () => {
//     it("should store compressed session data in localStorage", () => {
//       const key = "cart";
//       const data = { items: [1, 2, 3] };
//       const compressedData = "compressed";

//       (LZString.compressToUTF16 as jest.Mock).mockReturnValue(compressedData);

//       localStorageClientService.storeSessionData(key, data);

//       expect(LZString.compressToUTF16).toHaveBeenCalledWith(
//         JSON.stringify(data)
//       );
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         key,
//         JSON.stringify({
//           data: compressedData,
//           timestamp: 0,
//         })
//       );
//     });

//     it("should remove the item from localStorage if no data is provided", () => {
//       const key = "user";

//       localStorageClientService.storeSessionData(key);

//       expect(localStorage.removeItem).toHaveBeenCalledWith(key);
//     });

//     it("should handle localStorage.setItem errors gracefully", () => {
//       const key = "theme";
//       const data = { theme: "dark" };
//       const error = new Error("Storage quota exceeded");

//       (LZString.compressToUTF16 as jest.Mock).mockReturnValue("compressed");
//       (localStorage.setItem as jest.Mock).mockImplementation(() => {
//         throw error;
//       });

//       localStorageClientService.storeSessionData(key, data);

//       expect(console.error).toHaveBeenCalledWith(
//         "Error storing session data",
//         error
//       );
//     });
//   });

//   describe("getSessionData", () => {
//     it("should retrieve and decompress session data from localStorage", () => {
//       const key = "cart";
//       const compressedData = "compressed";
//       const decompressedData = { items: [1, 2, 3] };
//       const timestamp = 0;

//       (LZString.decompressFromUTF16 as jest.Mock).mockReturnValue(
//         JSON.stringify(decompressedData)
//       );

//       localStorage.setItem(
//         key,
//         JSON.stringify({
//           data: compressedData,
//           timestamp,
//         })
//       );

//       const result = localStorageClientService.getSessionData<typeof decompressedData>(key);

//       expect(LZString.decompressFromUTF16).toHaveBeenCalledWith(compressedData);
//       expect(result).toEqual(decompressedData);
//     });

//     it("should return null if the session data is expired", () => {
//       const key = "cart";
//       const compressedData = "compressed";
//       const timestamp = -CART_DATA_EXPIRATION_TIME - 1; // Expired timestamp

//       localStorage.setItem(
//         key,
//         JSON.stringify({
//           data: compressedData,
//           timestamp,
//         })
//       );

//       const result = localStorageClientService.getSessionData(key);

//       expect(localStorage.removeItem).toHaveBeenCalledWith(key);
//       expect(result).toBeNull();
//     });

//     it("should return null if localStorage does not contain the key", () => {
//       const key = "nonexistent";

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const result = localStorageClientService.getSessionData(key as any);

//       expect(result).toBeNull();
//     });

//     it("should return null and log an error if parsing fails", () => {
//       const key = "user";

//       localStorage.setItem(key, "{ invalid json }");

//       const result = localStorageClientService.getSessionData(key);

//       expect(console.error).toHaveBeenCalledWith(
//         "Error parsing session data",
//         expect.any(SyntaxError)
//       );
//       expect(result).toBeNull();
//     });

//     it("should return null if decompression returns null", () => {
//       const key = "theme";
//       const compressedData = "compressed";
//       const timestamp = 0;

//       (LZString.decompressFromUTF16 as jest.Mock).mockReturnValue(null);

//       localStorage.setItem(
//         key,
//         JSON.stringify({
//           data: compressedData,
//           timestamp,
//         })
//       );

//       const result = localStorageClientService.getSessionData(key);

//       expect(result).toBeNull();
//     });
//   });
// });
