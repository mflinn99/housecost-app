import { describe, it, expect } from "vitest";
import { calculateVibeScore } from "./index";

const baseProfile = {
  amenitiesScore: 5,
  transportScore: 6,
  densityScore: 4,
  eventActivityScore: 3,
  lifestyleScore: 5,
  convenienceScore: 6,
  quietnessScore: 6,
};

describe("calculateVibeScore", () => {
  it("returns score 0-100", () => {
    const r = calculateVibeScore(baseProfile);
    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
  });

  it("returns label and explanation", () => {
    const r = calculateVibeScore(baseProfile);
    expect(r.label).toBeTruthy();
    expect(r.explanation.length).toBeGreaterThan(0);
  });

  it("returns sub-scores", () => {
    const r = calculateVibeScore(baseProfile);
    expect(r.lifestyleScore).toBeGreaterThanOrEqual(0);
    expect(r.convenienceScore).toBeGreaterThanOrEqual(0);
    expect(r.quietnessScore).toBeGreaterThanOrEqual(0);
  });

  it("adds parking signal when present", () => {
    const r = calculateVibeScore(baseProfile, "driveway");
    expect(r.signals).toContain("Practical parking");
  });

  it("handles empty profile", () => {
    const empty = {
      amenitiesScore: 0,
      transportScore: 0,
      densityScore: 0,
      eventActivityScore: 0,
      lifestyleScore: 0,
      convenienceScore: 0,
      quietnessScore: 10,
    };
    const r = calculateVibeScore(empty);
    expect(r.score).toBeGreaterThanOrEqual(0);
  });
});
