import { describe, it, expect } from "vitest";
import {
  computeAreaProfile,
  scoreAmenities,
  scoreTransport,
  scoreDensity,
  scoreEventActivity,
} from "./index";

describe("scoreAmenities", () => {
  it("returns 0 for empty", () => {
    expect(scoreAmenities({})).toBe(0);
  });

  it("returns higher for more amenities", () => {
    const low = scoreAmenities({ bars: 5, restaurants: 10 });
    const high = scoreAmenities({ bars: 50, restaurants: 100, cafes: 60 });
    expect(high).toBeGreaterThan(low);
  });
});

describe("scoreTransport", () => {
  it("returns 10 for very close", () => {
    expect(scoreTransport({ nearestBusMinutes: 2 })).toBe(10);
  });

  it("returns 0 for far", () => {
    expect(scoreTransport({ nearestBusMinutes: 30 })).toBe(0);
  });

  it("uses best of bus/train/tram", () => {
    expect(scoreTransport({
      nearestBusMinutes: 20,
      nearestTrainMinutes: 5,
    })).toBeGreaterThan(scoreTransport({ nearestBusMinutes: 20 }));
  });
});

describe("scoreDensity", () => {
  it("returns 0 for empty", () => {
    expect(scoreDensity({})).toBe(0);
  });

  it("increases with venues", () => {
    const r = scoreDensity(
      { bars: 50, restaurants: 100 },
      { count: 10 },
      { count: 5 }
    );
    expect(r).toBeGreaterThan(0);
  });
});

describe("scoreEventActivity", () => {
  it("high level gives high score", () => {
    expect(scoreEventActivity("high")).toBeGreaterThan(scoreEventActivity("low"));
  });
});

describe("computeAreaProfile", () => {
  it("returns all scores 0-10", () => {
    const p = computeAreaProfile({
      amenities: { bars: 20, restaurants: 50 },
      transport: { nearestBusMinutes: 5 },
    });
    expect(p.amenitiesScore).toBeGreaterThanOrEqual(0);
    expect(p.amenitiesScore).toBeLessThanOrEqual(10);
    expect(p.transportScore).toBeGreaterThanOrEqual(0);
    expect(p.transportScore).toBeLessThanOrEqual(10);
    expect(p.lifestyleScore).toBeGreaterThanOrEqual(0);
    expect(p.quietnessScore).toBeGreaterThanOrEqual(0);
  });

  it("handles empty input", () => {
    const p = computeAreaProfile({});
    expect(p.amenitiesScore).toBe(0);
    expect(p.transportScore).toBe(0);
  });
});
