import { describe, it, expect } from "vitest";
import { calculateVibeScore } from "./vibe-engine";
import type { AreaData } from "@/types";

function mockArea(overrides: Partial<AreaData> = {}): AreaData {
  return {
    demographics: {
      averageAge: 34,
      householdTypes: [],
      incomeBands: [],
      renterVsOwnerRatio: 0.4,
    },
    amenities: {
      bars: 20,
      restaurants: 50,
      cafes: 30,
      supermarkets: 8,
      gyms: 5,
    },
    scores: {
      lifestyle: 8,
      convenience: 7,
      quietness: 3,
    },
    ...overrides,
  };
}

describe("vibe-engine", () => {
  it("returns score 0-100", () => {
    const result = calculateVibeScore(mockArea());
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("returns sub-scores", () => {
    const result = calculateVibeScore(mockArea());
    expect(result.subScores.lifestyle).toBeGreaterThanOrEqual(0);
    expect(result.subScores.convenience).toBeGreaterThanOrEqual(0);
    expect(result.subScores.quietness).toBeGreaterThanOrEqual(0);
  });

  it("returns label", () => {
    const result = calculateVibeScore(mockArea());
    expect(result.label).toBeTruthy();
    expect(typeof result.label).toBe("string");
  });

  it("returns explanation", () => {
    const result = calculateVibeScore(mockArea());
    expect(result.explanation).toBeTruthy();
    expect(result.explanation.length).toBeGreaterThan(20);
  });

  it("event-heavy area lowers quietness", () => {
    const highEvent = calculateVibeScore(mockArea({ eventActivityLevel: "high" }));
    const lowEvent = calculateVibeScore(mockArea({ eventActivityLevel: "low" }));
    expect(highEvent.subScores.quietness).toBeLessThanOrEqual(lowEvent.subScores.quietness + 20);
  });

  it("handles missing area data gracefully", () => {
    const minimal = mockArea({
      sportsVenues: undefined,
      eventVenues: undefined,
    });
    const result = calculateVibeScore(minimal);
    expect(result.score).toBeGreaterThanOrEqual(0);
  });
});
