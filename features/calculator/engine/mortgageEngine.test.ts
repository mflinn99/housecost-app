import { describe, it, expect } from "vitest";
import {
  calculateMortgage,
  calculateRepaymentMortgage,
  calculateInterestOnlyMortgage,
} from "./mortgageEngine";

describe("calculateRepaymentMortgage", () => {
  it("calculates monthly payment for standard loan", () => {
    const r = calculateRepaymentMortgage({
      loanAmount: 200000,
      annualRatePercent: 5,
      termYears: 25,
      type: "repayment",
    });
    expect(r.monthlyPayment).toBeGreaterThan(1100);
    expect(r.monthlyPayment).toBeLessThan(1200);
    expect(r.totalRepayment).toBeGreaterThan(r.monthlyPayment * 300);
  });

  it("zero rate: payment = principal / numPayments", () => {
    const r = calculateRepaymentMortgage({
      loanAmount: 120000,
      annualRatePercent: 0,
      termYears: 25,
      type: "repayment",
    });
    expect(r.monthlyPayment).toBe(400);
    expect(r.totalInterest).toBe(0);
  });

  it("zero loan returns zeros", () => {
    const r = calculateRepaymentMortgage({
      loanAmount: 0,
      annualRatePercent: 5,
      termYears: 25,
      type: "repayment",
    });
    expect(r.monthlyPayment).toBe(0);
    expect(r.totalRepayment).toBe(0);
  });
});

describe("calculateInterestOnlyMortgage", () => {
  it("interest only: payment = principal * monthly rate", () => {
    const r = calculateInterestOnlyMortgage({
      loanAmount: 200000,
      annualRatePercent: 6,
      termYears: 25,
      type: "interest_only",
    });
    expect(r.monthlyPayment).toBe(1000); // 200000 * 0.06/12
    expect(r.totalInterest).toBe(300000);
  });

  it("zero loan returns zeros", () => {
    const r = calculateInterestOnlyMortgage({
      loanAmount: 0,
      annualRatePercent: 5,
      termYears: 25,
      type: "interest_only",
    });
    expect(r.monthlyPayment).toBe(0);
  });
});

describe("calculateMortgage", () => {
  it("delegates to repayment by default", () => {
    const r = calculateMortgage({
      loanAmount: 100000,
      annualRatePercent: 4,
      termYears: 25,
      type: "repayment",
    });
    expect(r.monthlyPayment).toBeGreaterThan(0);
  });

  it("delegates to interest_only when specified", () => {
    const r = calculateMortgage({
      loanAmount: 120000,
      annualRatePercent: 6,
      termYears: 25,
      type: "interest_only",
    });
    expect(r.monthlyPayment).toBe(600);
  });
});
