"use client";

import LZString from "lz-string";

export const CART_DATA_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days
const ERROR_MESSAGE = "Error parsing session data";

type TSessionDataKeys = "user" | "theme" | "cart";

const jsonStringify = <T>(data: T): string => JSON.stringify(data);
const jsonParse = <T>(data: string): T => JSON.parse(data);

/**
 * Stores session data in the local storage. If no item is provided, it removes the data associated with the given key.
 *
 * @template T - The type of the item to be stored.
 * @param {TSessionDataKeys} key - The key under which the session data will be stored.
 * @param {T | T[]} [item] - The item or array of items to be stored. If not provided, the data associated with the key will be removed.
 * @returns {void}
 */
const storeSessionData = <T>(key: TSessionDataKeys, item?: T | T[]): void => {
  if (!item) {
    try {
      localStorage.removeItem(key);
      return;
    } catch (error) {
      console.error("Error removing session data", error);
    }
  }

  const compressedData = LZString.compressToUTF16(jsonStringify(item));
  const dataToStore = {
    data: compressedData,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(key, jsonStringify(dataToStore));
  } catch (error) {
    console.error("Error storing session data", error);
  }
};

/**
 * Retrieves session data from local storage.
 *
 * @template T - The type of the session data.
 * @param {TSessionDataKeys} key - The key used to retrieve the session data.
 * @returns {T | null} The session data if it exists and is not expired, otherwise null.
 *
 * @throws Will log an error message if there is an issue parsing the stored item.
 */
const getSessionData = <T>(key: TSessionDataKeys): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const storedItem = localStorage.getItem(key);
    if (!storedItem) return null;
    const { data, timestamp }: { data: string; timestamp: number } =
      jsonParse(storedItem);

    if (Date.now() - timestamp > CART_DATA_EXPIRATION_TIME) {
      localStorage.removeItem(key);
      return null;
    }

    const jsonData = LZString.decompressFromUTF16(data);
    return jsonData ? jsonParse(jsonData) : null;
  } catch (error) {
    console.error(ERROR_MESSAGE, error);
    return null;
  }
};

export const localStorageClientService = {
  storeSessionData,
  getSessionData,
};
