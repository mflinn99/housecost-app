import { describe, it, expect } from "vitest";
import {
  calculateRepaymentMortgage,
  calculateInterestOnlyMortgage,
  calculateMortgage,
} from "./mortgage";

describe("calculateRepaymentMortgage", () => {
  it("calculates monthly payment correctly", () => {
    const result = calculateRepaymentMortgage({
      principal: 200_000,
      annualRatePercent: 5,
      termYears: 25,
      type: "repayment",
    });
    expect(result.monthlyPayment).toBeCloseTo(1169.18, 2);
  });

  it("handles zero rate", () => {
    const result = calculateRepaymentMortgage({
      principal: 120_000,
      annualRatePercent: 0,
      termYears: 25,
      type: "repayment",
    });
    expect(result.monthlyPayment).toBe(400); // 120000 / 300
    expect(result.totalInterest).toBe(0);
  });
});

describe("calculateInterestOnlyMortgage", () => {
  it("calculates interest-only payment", () => {
    const result = calculateInterestOnlyMortgage({
      principal: 200_000,
      annualRatePercent: 5,
      termYears: 25,
      type: "interest_only",
    });
    expect(result.monthlyPayment).toBeCloseTo(833.33, 2); // 200000 * 0.05/12
  });
});

describe("calculateMortgage", () => {
  it("delegates to repayment for repayment type", () => {
    const result = calculateMortgage({
      principal: 150_000,
      annualRatePercent: 4,
      termYears: 20,
      type: "repayment",
    });
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.totalRepayment).toBeGreaterThan(150_000);
  });
});
