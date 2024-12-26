import xss from "xss";

const sanitizeString = (value: unknown): string => {
  if (typeof value !== "string") return ""; // Disallow non-strings
  return xss(value.trim()); // Sanitize against XSS and trim spaces
};

const sanitizeNumber = (value: unknown, fallback = 0): number => {
  if (typeof value !== "string") return 0; // Disallow non-strings
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) return fallback; // Disallow negative numbers
  return num;
};

const sanitizeBoolean = (value: unknown): boolean | null => {
  if (typeof value !== "string") return null; // Disallow non-strings
  return value === "on" || value === "true";
};

export const sanitizeService = {
  sanitizeBoolean,
  sanitizeNumber,
  sanitizeString,
};
