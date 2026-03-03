import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currencyCode: string = "EUR"): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  currencyCode: string = "EUR"
): string {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, currencyCode);
  }
  return `${formatPrice(minPrice, currencyCode)} - ${formatPrice(maxPrice, currencyCode)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, "ae")
    .replace(/[öÖ]/g, "oe")
    .replace(/[üÜ]/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
