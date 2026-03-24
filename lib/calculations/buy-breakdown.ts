/**
 * Buy (purchase) cost breakdown
 */

import { calculateMortgage } from "./mortgage";
import { calculateStampDuty } from "./stamp-duty";
import { estimateUtilities } from "./utilities";
import type { UtilitiesEstimate } from "@/types";
import { UK_COUNCIL_TAX_BANDS } from "@/lib/constants";
import type { BuyerStatus } from "./stamp-duty";

export interface BuyBreakdownInput {
  purchasePrice: number;
  depositAmount?: number;
  depositPercent?: number;
  mortgageTermYears: number;
  interestRatePercent: number;
  mortgageType: "repayment" | "interest_only";
  buyerStatus?: BuyerStatus;
  serviceCharge?: number;
  groundRent?: number;
  councilTaxBand?: string;
  councilTaxMonthly?: number;
  bedrooms?: number;
  utilities?: Partial<UtilitiesEstimate>;
  /** Buildings + contents insurance */
  insurance?: number;
  legalFees?: number;
  survey?: number;
  mortgageFees?: number;
  movingCost?: number;
}

export interface BuyBreakdownResult {
  deposit: number;
  loanAmount: number;
  monthlyMortgage: number;
  serviceCharge: number;
  groundRent: number;
  councilTax: number;
  utilities: UtilitiesEstimate;
  insurance: number;
  totalMonthly: number;
  upfront: {
    stampDuty: number;
    legalFees: number;
    survey: number;
    mortgageFees: number;
    movingCost: number;
    total: number;
  };
}

const DEFAULT_LEGAL_FEES = 1500;
const DEFAULT_SURVEY = 600;
const DEFAULT_MORTGAGE_FEES = 1000;
const DEFAULT_MOVING = 500;
const DEFAULT_INSURANCE = 35;

export function calculateBuyBreakdown(input: BuyBreakdownInput): BuyBreakdownResult {
  const deposit =
    input.depositAmount ??
    (input.depositPercent != null
      ? (input.purchasePrice * input.depositPercent) / 100
      : input.purchasePrice * 0.1);
  const loanAmount = Math.max(0, input.purchasePrice - deposit);

  const mortgage = calculateMortgage({
    principal: loanAmount,
    annualRatePercent: input.interestRatePercent,
    termYears: input.mortgageTermYears,
    type: input.mortgageType,
  });

  let councilTax = 0;
  if (input.councilTaxMonthly != null) {
    councilTax = input.councilTaxMonthly;
  } else if (input.councilTaxBand) {
    const band = UK_COUNCIL_TAX_BANDS[input.councilTaxBand.toUpperCase()];
    councilTax = band ? band.annual / 12 : 0;
  }

  const utilities = estimateUtilities({
    bedrooms: input.bedrooms,
    councilTaxMonthly: councilTax || undefined,
    ...input.utilities,
  });

  const insurance = input.insurance ?? DEFAULT_INSURANCE;
  const serviceCharge = input.serviceCharge ?? 0;
  const groundRent = (input.groundRent ?? 0) / 12;

  const stampDuty = calculateStampDuty(input.purchasePrice, input.buyerStatus);
  const legalFees = input.legalFees ?? DEFAULT_LEGAL_FEES;
  const survey = input.survey ?? DEFAULT_SURVEY;
  const mortgageFees = input.mortgageFees ?? DEFAULT_MORTGAGE_FEES;
  const movingCost = input.movingCost ?? DEFAULT_MOVING;

  const totalMonthly =
    mortgage.monthlyPayment +
    serviceCharge +
    groundRent +
    (utilities.councilTax || councilTax) +
    (utilities.electricity + utilities.gas + utilities.water + utilities.broadband) +
    (utilities.tvLicence ?? 0) +
    insurance;

  return {
    deposit,
    loanAmount,
    monthlyMortgage: Math.round(mortgage.monthlyPayment * 100) / 100,
    serviceCharge,
    groundRent,
    councilTax: councilTax || utilities.councilTax,
    utilities,
    insurance,
    totalMonthly: Math.round(totalMonthly * 100) / 100,
    upfront: {
      stampDuty,
      legalFees,
      survey,
      mortgageFees,
      movingCost,
      total: stampDuty + legalFees + survey + mortgageFees + movingCost,
    },
  };
}
