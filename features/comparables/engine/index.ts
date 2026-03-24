/**
 * Comparables Engine
 * Filter similar properties, calculate averages, detect outliers and trends.
 * Mock data compatible.
 */

import type {
  ComparableProperty,
  ComparablesFilter,
  ComparableSummary,
} from "./types";

export type { ComparableProperty, ComparablesFilter, ComparableSummary } from "./types";

export function filterSimilar(
  properties: ComparableProperty[],
  subjectPrice: number,
  filter: ComparablesFilter
): ComparableProperty[] {
  const intent = filter.intent;
  let filtered = properties.filter((p) => p.priceType === (intent === "rent" ? "pcm" : "total"));

  if (filter.bedrooms != null) {
    filtered = filtered.filter((p) => p.bedrooms === filter.bedrooms);
  }

  if (filter.propertyType) {
    filtered = filtered.filter(
      (p) => p.propertyType?.toLowerCase() === filter.propertyType?.toLowerCase()
    );
  }

  const maxDiff = filter.maxPriceDiffPercent ?? 25;
  const low = subjectPrice * (1 - maxDiff / 100);
  const high = subjectPrice * (1 + maxDiff / 100);
  filtered = filtered.filter((p) => p.price >= low && p.price <= high);

  return filtered;
}

export function calculateAveragePrice(properties: ComparableProperty[]): number {
  if (properties.length === 0) return 0;
  const sum = properties.reduce((s, p) => s + p.price, 0);
  return sum / properties.length;
}

export function calculateMedianPrice(properties: ComparableProperty[]): number {
  if (properties.length === 0) return 0;
  const sorted = [...properties].map((p) => p.price).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function identifyOutliers(
  properties: ComparableProperty[],
  iqrMultiplier = 1.5
): { outliers: ComparableProperty[]; inliers: ComparableProperty[] } {
  if (properties.length < 4) {
    return { outliers: [], inliers: properties };
  }

  const sorted = [...properties].map((p) => p.price).sort((a, b) => a - b);
  const q1Idx = Math.floor(sorted.length / 4);
  const q3Idx = Math.floor((3 * sorted.length) / 4);
  const q1 = sorted[q1Idx];
  const q3 = sorted[q3Idx];
  const iqr = q3 - q1;
  const low = q1 - iqr * iqrMultiplier;
  const high = q3 + iqr * iqrMultiplier;

  const outliers: ComparableProperty[] = [];
  const inliers: ComparableProperty[] = [];

  for (const p of properties) {
    if (p.price < low || p.price > high) {
      outliers.push(p);
    } else {
      inliers.push(p);
    }
  }

  return { outliers, inliers };
}

export function detectTrend(
  prices: number[],
  thresholdPercent = 3
): "up" | "down" | "stable" {
  if (prices.length < 2) return "stable";

  const first = prices.slice(0, Math.ceil(prices.length / 2));
  const last = prices.slice(Math.floor(prices.length / 2));

  const avgFirst = first.reduce((a, b) => a + b, 0) / first.length;
  const avgLast = last.reduce((a, b) => a + b, 0) / last.length;

  const change = ((avgLast - avgFirst) / avgFirst) * 100;
  if (change > thresholdPercent) return "up";
  if (change < -thresholdPercent) return "down";
  return "stable";
}

export function computeComparableSummary(
  properties: ComparableProperty[],
  subjectPrice: number,
  filter: ComparablesFilter,
  priceHistory?: number[] // optional for trend
): ComparableSummary {
  const filtered = filterSimilar(properties, subjectPrice, filter);
  const { outliers, inliers } = identifyOutliers(filtered);
  const usePrices = inliers.length > 0 ? inliers : filtered;

  const prices = usePrices.map((p) => p.price);
  const avg = calculateAveragePrice(usePrices);
  const median = calculateMedianPrice(usePrices);
  const reduced = usePrices.length > 0
    ? (usePrices.filter((p) => p.priceReduced).length / usePrices.length) * 100
    : 0;
  const avgDays =
    usePrices.length > 0
      ? usePrices.reduce((s, p) => s + (p.daysOnMarket ?? 0), 0) / usePrices.length
      : 0;

  const priceTrend = priceHistory && priceHistory.length >= 2
    ? detectTrend(priceHistory)
    : "stable";

  return {
    similarCount: usePrices.length,
    averagePrice: Math.round(avg * 100) / 100,
    averageRent: filter.intent === "rent" ? Math.round(avg * 100) / 100 : undefined,
    medianPrice: Math.round(median * 100) / 100,
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    priceTrend,
    reducedPriceFrequency: Math.round(reduced),
    avgDaysOnMarket: Math.round(avgDays),
    outlierCount: outliers.length,
  };
}
