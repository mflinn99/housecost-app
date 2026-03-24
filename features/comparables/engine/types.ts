/**
 * Comparables engine types
 */

export interface ComparableProperty {
  id: string;
  price: number;
  priceType: "pcm" | "total";
  bedrooms?: number;
  propertyType?: string;
  daysOnMarket?: number;
  priceReduced?: boolean;
  listedAt?: string;
}

export interface ComparablesFilter {
  bedrooms?: number;
  propertyType?: string;
  maxPriceDiffPercent?: number; // e.g. 20 = ±20%
  intent: "rent" | "buy";
}

export interface ComparableSummary {
  similarCount: number;
  averagePrice: number;
  averageRent?: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
  priceTrend: "up" | "down" | "stable";
  reducedPriceFrequency: number; // 0-100
  avgDaysOnMarket: number;
  outlierCount: number;
}
