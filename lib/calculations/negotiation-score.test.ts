import { describe, it, expect } from "vitest";
import { calculateNegotiationScore } from "./negotiation-score";

const baseListing = {
  id: "1",
  sourceUrl: "https://example.com",
  source: "Test",
  lastRefreshed: new Date().toISOString(),
  title: "Test",
  address: "Test",
  displayPrice: "£100,000",
  priceValue: 100_000,
  priceType: "total" as const,
};

describe("calculateNegotiationScore", () => {
  it("returns low for fresh listing at market price", () => {
    const result = calculateNegotiationScore({
      listing: { ...baseListing, daysOnMarket: 5 },
      averageComparablePrice: 100_000,
    });
    expect(result.likelihood).toBe("low");
  });

  it("returns higher for long time on market", () => {
    const result = calculateNegotiationScore({
      listing: { ...baseListing, daysOnMarket: 95 },
    });
    expect(result.likelihood).toBe("high");
  });

  it("returns medium when price reduced", () => {
    const result = calculateNegotiationScore({
      listing: {
        ...baseListing,
        daysOnMarket: 45,
        priceReduced: true,
      },
    });
    expect(result.likelihood).toBe("medium");
  });
});
