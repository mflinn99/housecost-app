/**
 * Tests for nearby search logic (distance filtering).
 * getNearbyListings is a server action; we test it directly.
 */

import { describe, it, expect } from "vitest";
import { getNearbyListings } from "./actions";

describe("getNearbyListings", () => {
  it("returns listings within radius for London rent", async () => {
    const result = await getNearbyListings("London", "rent", 2);
    expect(result.centre).toEqual({ lat: 51.52, lng: -0.15 });
    expect(result.listings.length).toBeGreaterThan(0);
    expect(result.listings.every((l) => l.distanceKm <= 2)).toBe(true);
    expect(result.listings.every((l) => l.priceType === "pcm")).toBe(true);
  });

  it("returns fewer listings for smaller radius", async () => {
    const small = await getNearbyListings("London", "rent", 0.5);
    const large = await getNearbyListings("London", "rent", 5);
    expect(small.listings.length).toBeLessThanOrEqual(large.listings.length);
  });

  it("sorts by distance ascending", async () => {
    const result = await getNearbyListings("London", "rent", 5);
    for (let i = 1; i < result.listings.length; i++) {
      expect(result.listings[i].distanceKm).toBeGreaterThanOrEqual(
        result.listings[i - 1].distanceKm
      );
    }
  });
});
