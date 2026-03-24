/**
 * Tests for MockListingsProvider
 */

import { describe, it, expect } from "vitest";
import { MockListingsProvider } from "./mock-listings";

const provider = new MockListingsProvider();

describe("MockListingsProvider", () => {
  it("returns rent listings for rent intent", async () => {
    const result = await provider.search({ query: "", intent: "rent" }, {});
    expect(result.listings.every((l) => l.priceType === "pcm")).toBe(true);
    expect(result.totalCount).toBe(result.listings.length);
  });

  it("returns buy listings for buy intent", async () => {
    const result = await provider.search({ query: "", intent: "buy" }, {});
    expect(result.listings.every((l) => l.priceType === "total")).toBe(true);
  });

  it("filters by location query", async () => {
    const result = await provider.search({ query: "London", intent: "rent" }, {});
    expect(result.listings.length).toBeGreaterThan(0);
    expect(result.listings.some((l) => l.address.toLowerCase().includes("london"))).toBe(true);
  });

  it("filters by bedrooms", async () => {
    const result = await provider.search(
      { query: "", intent: "buy" },
      { bedrooms: 3 }
    );
    expect(result.listings.every((l) => l.bedrooms === 3)).toBe(true);
  });

  it("filters by max budget for rent", async () => {
    const result = await provider.search(
      { query: "", intent: "rent" },
      { maxBudget: 1000 }
    );
    expect(result.listings.every((l) => l.priceValue <= 1000)).toBe(true);
  });

  it("filters by max budget for buy", async () => {
    const result = await provider.search(
      { query: "", intent: "buy" },
      { maxBudget: 400000 }
    );
    expect(result.listings.every((l) => l.priceValue <= 400000)).toBe(true);
  });

  it("filters by parking required", async () => {
    const result = await provider.search(
      { query: "", intent: "rent" },
      { parkingRequired: true }
    );
    expect(result.listings.every((l) =>
      l.parking && l.parking !== "none" && l.parking !== "unknown"
    )).toBe(true);
  });

  it("getById returns listing when found", async () => {
    const listing = await provider.getById("1");
    expect(listing).not.toBeNull();
    expect(listing?.id).toBe("1");
    expect(listing?.title).toBeDefined();
  });

  it("getById returns null for unknown id", async () => {
    const listing = await provider.getById("unknown-999");
    expect(listing).toBeNull();
  });
});
