/**
 * Mortgage Engine
 * Pure calculation: loan amount, interest, term → monthly payment.
 * Standard annuity formula. No UI dependency.
 */

export interface MortgageInput {
  loanAmount: number;
  annualRatePercent: number;
  termYears: number;
  type: "repayment" | "interest_only";
}

export interface MortgageResult {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  numPayments: number;
}

/**
 * Repayment (annuity) mortgage
 * M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateRepaymentMortgage(input: MortgageInput): MortgageResult {
  const { loanAmount, annualRatePercent, termYears } = input;
  const numPayments = termYears * 12;
  const monthlyRate = annualRatePercent / 100 / 12;

  if (loanAmount <= 0) {
    return { monthlyPayment: 0, totalRepayment: 0, totalInterest: 0, numPayments };
  }

  if (monthlyRate === 0) {
    const monthlyPayment = loanAmount / numPayments;
    return {
      monthlyPayment,
      totalRepayment: loanAmount,
      totalInterest: 0,
      numPayments,
    };
  }

  const factor = Math.pow(1 + monthlyRate, numPayments);
  const monthlyPayment = (loanAmount * (monthlyRate * factor)) / (factor - 1);

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalRepayment: Math.round(monthlyPayment * numPayments * 100) / 100,
    totalInterest: Math.round((monthlyPayment * numPayments - loanAmount) * 100) / 100,
    numPayments,
  };
}

/**
 * Interest-only mortgage
 */
export function calculateInterestOnlyMortgage(input: MortgageInput): MortgageResult {
  const { loanAmount, annualRatePercent, termYears } = input;
  const numPayments = termYears * 12;
  const monthlyRate = annualRatePercent / 100 / 12;

  if (loanAmount <= 0) {
    return { monthlyPayment: 0, totalRepayment: 0, totalInterest: 0, numPayments };
  }

  const monthlyPayment = loanAmount * monthlyRate;
  const totalInterest = monthlyPayment * numPayments;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalRepayment: loanAmount + totalInterest,
    totalInterest: Math.round(totalInterest * 100) / 100,
    numPayments,
  };
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  if (input.type === "interest_only") {
    return calculateInterestOnlyMortgage(input);
  }
  return calculateRepaymentMortgage(input);
}
