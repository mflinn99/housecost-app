import { describe, it, expect } from "vitest";
import { calculateStampDuty } from "./stamp-duty";

describe("calculateStampDuty", () => {
  it("returns 0 for price below threshold", () => {
    expect(calculateStampDuty(200_000)).toBe(0);
  });

  it("calculates for first-time buyer under 425k", () => {
    expect(calculateStampDuty(400_000, "first_time_buyer")).toBe(0);
  });

  it("calculates for first-time buyer between 425k and 625k", () => {
    const result = calculateStampDuty(500_000, "first_time_buyer");
    expect(result).toBe((500_000 - 425_000) * 0.05); // 3750
  });

  it("calculates for standard purchase", () => {
    const result = calculateStampDuty(300_000);
    expect(result).toBe((300_000 - 250_000) * 0.05); // 2500
  });

  it("handles zero price", () => {
    expect(calculateStampDuty(0)).toBe(0);
  });
});
