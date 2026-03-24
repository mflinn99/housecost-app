import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names with Tailwind-friendly conflict handling
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format currency for display
 */
export function formatCurrency(
  value: number,
  options?: { compact?: boolean; pcm?: boolean }
): string {
  if (options?.compact && value >= 1000) {
    const formatted = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(value);
    return options.pcm ? `${formatted} pcm` : formatted;
  }
  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
  return options?.pcm ? `${formatted} pcm` : formatted;
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
