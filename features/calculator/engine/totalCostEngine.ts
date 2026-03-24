/**
 * Total Cost Engine
 * Combines rent or buy costs into final monthly figure.
 * No UI dependency.
 */

import { calculateRentCost, type RentCostInput, type RentCostResult } from "./rentCostEngine";
import { calculateMortgage, type MortgageResult } from "./mortgageEngine";

export type CostMode = "rent" | "buy";

export interface RentTotalInput extends Omit<RentCostInput, "rent"> {
  rent: number;
}

export interface BuyTotalInput {
  purchasePrice: number;
  depositPercent?: number;
  depositAmount?: number;
  interestRatePercent: number;
  termYears: number;
  mortgageType: "repayment" | "interest_only";
  councilTaxMonthly?: number;
  councilTaxBand?: string;
  councilTaxBands?: Record<string, { annual: number }>;
  serviceCharge?: number;
  groundRentYearly?: number;
  insurance?: number;
  bedrooms?: number;
}

export interface TotalCostResult {
  mode: CostMode;
  totalMonthly: number;
  rent?: RentCostResult;
  buy?: {
    mortgage: MortgageResult;
    councilTax: number;
    serviceCharge: number;
    groundRent: number;
    insurance: number;
  };
}

export function calculateRentTotal(input: RentTotalInput): TotalCostResult {
  const rent = calculateRentCost(input);
  return {
    mode: "rent",
    totalMonthly: rent.totalMonthly,
    rent,
  };
}

export function calculateBuyTotal(input: BuyTotalInput): TotalCostResult {
  const deposit =
    input.depositAmount ??
    (input.purchasePrice * (input.depositPercent ?? 10)) / 100;
  const loanAmount = Math.max(0, input.purchasePrice - deposit);

  const mortgage = calculateMortgage({
    loanAmount,
    annualRatePercent: input.interestRatePercent,
    termYears: input.termYears,
    type: input.mortgageType,
  });

  let councilTax = 0;
  if (input.councilTaxMonthly != null && input.councilTaxMonthly >= 0) {
    councilTax = input.councilTaxMonthly;
  } else if (input.councilTaxBand) {
    const bands = input.councilTaxBands ?? {
      A: { annual: 1200 },
      B: { annual: 1400 },
      C: { annual: 1600 },
      D: { annual: 1800 },
      E: { annual: 2200 },
      F: { annual: 2600 },
      G: { annual: 3000 },
      H: { annual: 3600 },
    };
    const band = bands[input.councilTaxBand.toUpperCase()];
    councilTax = band ? band.annual / 12 : 0;
  }

  const serviceCharge = Math.max(0, input.serviceCharge ?? 0);
  const groundRent = Math.max(0, (input.groundRentYearly ?? 0) / 12);
  const insurance = Math.max(0, input.insurance ?? 35);

  const totalMonthly =
    mortgage.monthlyPayment + councilTax + serviceCharge + groundRent + insurance;

  return {
    mode: "buy",
    totalMonthly: Math.round(totalMonthly * 100) / 100,
    buy: {
      mortgage,
      councilTax,
      serviceCharge,
      groundRent,
      insurance,
    },
  };
}
