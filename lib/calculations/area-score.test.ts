import { describe, it, expect } from "vitest";

function calculateAreaScores(amenities: {
  bars: number;
  restaurants: number;
  cafes: number;
  supermarkets: number;
  gyms: number;
}) {
  const lifestyle = Math.min(
    10,
    Math.round((amenities.bars + amenities.restaurants + amenities.cafes) / 12)
  );
  const convenience = Math.min(
    10,
    Math.round((amenities.supermarkets * 2 + amenities.gyms) / 3)
  );
  const quietness = Math.max(1, 10 - lifestyle);
  return { lifestyle, convenience, quietness };
}

describe("area scores", () => {
  it("calculates lifestyle from amenities", () => {
    const scores = calculateAreaScores({
      bars: 24,
      restaurants: 67,
      cafes: 41,
      supermarkets: 8,
      gyms: 6,
    });
    expect(scores.lifestyle).toBeGreaterThanOrEqual(1);
    expect(scores.lifestyle).toBeLessThanOrEqual(10);
  });

  it("quietness inversely relates to lifestyle", () => {
    const lowLifestyle = calculateAreaScores({
      bars: 2,
      restaurants: 5,
      cafes: 3,
      supermarkets: 2,
      gyms: 1,
    });
    const highLifestyle = calculateAreaScores({
      bars: 50,
      restaurants: 100,
      cafes: 80,
      supermarkets: 5,
      gyms: 3,
    });
    expect(lowLifestyle.quietness).toBeGreaterThan(highLifestyle.quietness);
  });
});
