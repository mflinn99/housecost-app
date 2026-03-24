import { MANCHESTER_PROPERTIES, type ManchesterPropertyRecord } from "@/data/manchester-properties";
import { MANCHESTER_SALES } from "@/data/manchester-sales";

export interface PriceDelta {
  postcodeDistrict: string;
  listingPrice: number;
  localAverageSoldPrice: number;
  differencePercent: number;
  label: "Above market" | "In line" | "Below market";
}

export interface DistrictMarketStats {
  postcodeDistrict: string;
  comparableCount: number;
  listingCount: number;
  soldCount: number;
  averageSoldPrice: number;
  averageListingPrice: number;
  soldVariancePercent: number;
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function variance(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = average(values);
  return average(values.map((value) => (value - mean) ** 2));
}

export function getAverageSoldPrice(postcodeDistrict: string): number {
  const district = postcodeDistrict.trim().toUpperCase();
  const prices = MANCHESTER_SALES.filter((sale) => sale.postcodeDistrict === district).map((sale) => sale.soldPrice);
  return Math.round(average(prices));
}

export function getAverageListingPrice(postcodeDistrict: string): number {
  const district = postcodeDistrict.trim().toUpperCase();
  const prices = MANCHESTER_PROPERTIES
    .filter((property) => property.postcodeDistrict === district)
    .map((property) => property.price);
  return Math.round(average(prices));
}

export function getPriceDelta(property: Pick<ManchesterPropertyRecord, "postcodeDistrict" | "price">): PriceDelta {
  const localAverageSoldPrice = getAverageSoldPrice(property.postcodeDistrict);
  const differencePercent =
    localAverageSoldPrice > 0 ? Number((((property.price - localAverageSoldPrice) / localAverageSoldPrice) * 100).toFixed(1)) : 0;

  let label: PriceDelta["label"] = "In line";
  if (differencePercent > 5) label = "Above market";
  if (differencePercent < -5) label = "Below market";

  return {
    postcodeDistrict: property.postcodeDistrict,
    listingPrice: property.price,
    localAverageSoldPrice,
    differencePercent,
    label,
  };
}

export function getDistrictMarketStats(postcodeDistrict: string): DistrictMarketStats {
  const district = postcodeDistrict.trim().toUpperCase();
  const soldPrices = MANCHESTER_SALES.filter((sale) => sale.postcodeDistrict === district).map((sale) => sale.soldPrice);
  const listingPrices = MANCHESTER_PROPERTIES
    .filter((property) => property.postcodeDistrict === district)
    .map((property) => property.price);
  const averageSoldPrice = Math.round(average(soldPrices));
  const averageListingPrice = Math.round(average(listingPrices));
  const soldStdDev = Math.sqrt(variance(soldPrices));
  const soldVariancePercent = averageSoldPrice > 0 ? Number(((soldStdDev / averageSoldPrice) * 100).toFixed(1)) : 0;

  return {
    postcodeDistrict: district,
    comparableCount: soldPrices.length + listingPrices.length,
    listingCount: listingPrices.length,
    soldCount: soldPrices.length,
    averageSoldPrice,
    averageListingPrice,
    soldVariancePercent,
  };
}

export function getOverallMarketSnapshot(): {
  averageSoldPrice: number;
  averageListingPrice: number;
  differencePercent: number;
} {
  const averageSoldPrice = Math.round(average(MANCHESTER_SALES.map((sale) => sale.soldPrice)));
  const averageListingPrice = Math.round(average(MANCHESTER_PROPERTIES.map((property) => property.price)));
  const differencePercent =
    averageSoldPrice > 0 ? Number((((averageListingPrice - averageSoldPrice) / averageSoldPrice) * 100).toFixed(1)) : 0;

  return { averageSoldPrice, averageListingPrice, differencePercent };
}
