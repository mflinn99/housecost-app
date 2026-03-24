import { describe, it, expect } from "vitest";
import { calculateNegotiationScore } from "./index";

describe("calculateNegotiationScore", () => {
  it("returns low for recently listed", () => {
    const r = calculateNegotiationScore({
      daysOnMarket: 5,
      priceValue: 300000,
    });
    expect(r.likelihood).toBe("low");
  });

  it("returns high for 90+ days + price reduced + above comparables", () => {
    const r = calculateNegotiationScore({
      daysOnMarket: 95,
      priceReduced: true,
      priceValue: 350000,
      averageComparablePrice: 300000,
    });
    expect(r.likelihood).toBe("high");
  });

  it("returns medium for 30+ days", () => {
    const r = calculateNegotiationScore({
      daysOnMarket: 45,
      priceValue: 250000,
    });
    expect(r.likelihood).toBe("medium");
  });

  it("handles zero average comparable", () => {
    const r = calculateNegotiationScore({
      daysOnMarket: 60,
      priceValue: 200000,
      averageComparablePrice: 0,
    });
    expect(r.likelihood).toBe("medium");
  });

  it("adds high reduction rate signal", () => {
    const r = calculateNegotiationScore({
      daysOnMarket: 1,
      priceValue: 100000,
      reducedFrequency: 45,
    });
    expect(r.signals).toContain("High reduction rate in area");
  });

  it("returns valid range", () => {
    const r = calculateNegotiationScore({
      daysOnMarket: 10,
      priceValue: 200000,
    });
    expect(r.potentialRangePercent.min).toBeGreaterThanOrEqual(0);
    expect(r.potentialRangePercent.max).toBeGreaterThanOrEqual(r.potentialRangePercent.min);
  });
});
