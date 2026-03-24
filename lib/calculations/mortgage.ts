/**
 * Mortgage payment calculation
 * Formulas: https://en.wikipedia.org/wiki/Mortgage_calculator
 */

export interface MortgageParams {
  principal: number;
  annualRatePercent: number;
  termYears: number;
  type: "repayment" | "interest_only";
}

export interface MortgageResult {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
}

/**
 * Monthly repayment mortgage (annuity)
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateRepaymentMortgage(params: MortgageParams): MortgageResult {
  const { principal, annualRatePercent, termYears } = params;
  const monthlyRate = annualRatePercent / 100 / 12;
  const numPayments = termYears * 12;

  if (monthlyRate === 0) {
    const monthlyPayment = principal / numPayments;
    return {
      monthlyPayment,
      totalRepayment: principal,
      totalInterest: 0,
    };
  }

  const factor = Math.pow(1 + monthlyRate, numPayments);
  const monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);

  return {
    monthlyPayment,
    totalRepayment: monthlyPayment * numPayments,
    totalInterest: monthlyPayment * numPayments - principal,
  };
}

/**
 * Interest-only mortgage
 */
export function calculateInterestOnlyMortgage(params: MortgageParams): MortgageResult {
  const { principal, annualRatePercent } = params;
  const monthlyRate = annualRatePercent / 100 / 12;
  const monthlyPayment = principal * monthlyRate;

  return {
    monthlyPayment,
    totalRepayment: principal + monthlyPayment * params.termYears * 12,
    totalInterest: monthlyPayment * params.termYears * 12,
  };
}

export function calculateMortgage(params: MortgageParams): MortgageResult {
  if (params.type === "interest_only") {
    return calculateInterestOnlyMortgage(params);
  }
  return calculateRepaymentMortgage(params);
}
