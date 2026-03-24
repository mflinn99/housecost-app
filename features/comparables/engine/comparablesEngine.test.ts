import { describe, it, expect } from "vitest";
import {
  filterSimilar,
  calculateAveragePrice,
  calculateMedianPrice,
  identifyOutliers,
  detectTrend,
  computeComparableSummary,
} from "./index";

const mockProps = [
  { id: "1", price: 1000, priceType: "pcm" as const, bedrooms: 2 },
  { id: "2", price: 1100, priceType: "pcm" as const, bedrooms: 2 },
  { id: "3", price: 950, priceType: "pcm" as const, bedrooms: 2 },
  { id: "4", price: 1200, priceType: "pcm" as const, bedrooms: 2 },
  { id: "5", price: 500, priceType: "pcm" as const, bedrooms: 1 },
  { id: "6", price: 200000, priceType: "total" as const, bedrooms: 2 },
];

describe("filterSimilar", () => {
  it("filters by intent", () => {
    const r = filterSimilar(mockProps, 1000, { intent: "rent" });
    expect(r.every((p) => p.priceType === "pcm")).toBe(true);
    expect(r.length).toBeLessThan(mockProps.length);
  });

  it("filters by bedrooms", () => {
    const r = filterSimilar(mockProps, 1000, {
      intent: "rent",
      bedrooms: 2,
    });
    expect(r.every((p) => p.bedrooms === 2)).toBe(true);
  });

  it("filters by price range", () => {
    const r = filterSimilar(mockProps, 1000, {
      intent: "rent",
      maxPriceDiffPercent: 15,
    });
    expect(r.every((p) => p.price >= 850 && p.price <= 1150)).toBe(true);
  });
});

describe("calculateAveragePrice", () => {
  it("returns 0 for empty", () => {
    expect(calculateAveragePrice([])).toBe(0);
  });

  it("returns correct average", () => {
    const prices = [100, 200, 300];
    expect(calculateAveragePrice(
      prices.map((p, i) => ({ id: String(i), price: p, priceType: "pcm" as const }))
    )).toBe(200);
  });
});

describe("calculateMedianPrice", () => {
  it("returns median for odd count", () => {
    const props = [
      { id: "1", price: 100, priceType: "pcm" as const },
      { id: "2", price: 200, priceType: "pcm" as const },
      { id: "3", price: 300, priceType: "pcm" as const },
    ];
    expect(calculateMedianPrice(props)).toBe(200);
  });

  it("returns median for even count", () => {
    const props = [
      { id: "1", price: 100, priceType: "pcm" as const },
      { id: "2", price: 200, priceType: "pcm" as const },
      { id: "3", price: 300, priceType: "pcm" as const },
      { id: "4", price: 400, priceType: "pcm" as const },
    ];
    expect(calculateMedianPrice(props)).toBe(250);
  });
});

describe("identifyOutliers", () => {
  it("identifies extreme values", () => {
    const props = [
      { id: "1", price: 100, priceType: "pcm" as const },
      { id: "2", price: 110, priceType: "pcm" as const },
      { id: "3", price: 105, priceType: "pcm" as const },
      { id: "4", price: 108, priceType: "pcm" as const },
      { id: "5", price: 1000, priceType: "pcm" as const }, // outlier
    ];
    const { outliers, inliers } = identifyOutliers(props);
    expect(outliers.some((p) => p.price === 1000)).toBe(true);
    expect(inliers.length).toBeLessThan(props.length);
  });
});

describe("detectTrend", () => {
  it("returns up for increasing", () => {
    expect(detectTrend([100, 101, 102, 110, 115, 120])).toBe("up");
  });

  it("returns down for decreasing", () => {
    expect(detectTrend([120, 115, 110, 102, 101, 100])).toBe("down");
  });

  it("returns stable for flat", () => {
    expect(detectTrend([100, 100, 101, 101])).toBe("stable");
  });
});

describe("computeComparableSummary", () => {
  it("returns summary", () => {
    const s = computeComparableSummary(mockProps, 1000, { intent: "rent" });
    expect(s.similarCount).toBeGreaterThanOrEqual(0);
    expect(s.averagePrice).toBeGreaterThanOrEqual(0);
    expect(["up", "down", "stable"]).toContain(s.priceTrend);
  });
});
