import type { PropertyListing } from "@/types";
import { getAreaBenchmark, LOCAL_BENCHMARKS } from "@/data/localBenchmarks";
import { getPriceDelta } from "./marketCalculations";

export type DecisionAction = "Buy" | "Negotiate" | "Wait" | "List" | "Hold";
export type DecisionConfidence = "Low" | "Medium" | "High";
export type NegotiationStance = "Strong" | "Balanced" | "Weak";
export type AffordabilityPressure = "Low" | "Medium" | "High";

export interface DecisionResult {
  action: DecisionAction;
  confidence: DecisionConfidence;
  rationale: string;
  negotiationStance: NegotiationStance;
  estimatedMonthlyOwnershipCost: number;
  affordabilityPressure: AffordabilityPressure;
  localPricePosition: string;
  nextStep: string;
}

function estimateMonthlyMortgage(principal: number, annualRatePercent: number, years: number): number {
  const monthlyRate = annualRatePercent / 100 / 12;
  const periods = years * 12;
  if (monthlyRate <= 0 || periods <= 0) return principal / Math.max(periods, 1);
  const factor = (monthlyRate * (1 + monthlyRate) ** periods) / ((1 + monthlyRate) ** periods - 1);
  return principal * factor;
}

export function getDecisionRecommendation(listing: PropertyListing): DecisionResult {
  const postcodeDistrict = listing.postcodeArea ?? "M3";
  const areaBenchmark = getAreaBenchmark(postcodeDistrict);
  const delta = getPriceDelta({
    postcodeDistrict,
    price: listing.priceValue,
  });

  const deposit = listing.priceValue * 0.1;
  const principal = Math.max(0, listing.priceValue - deposit);
  const monthlyMortgage = estimateMonthlyMortgage(
    principal,
    LOCAL_BENCHMARKS.mortgageAssumptions.interestRatePercent,
    LOCAL_BENCHMARKS.mortgageAssumptions.termYears
  );
  const monthlyOwnershipCost = Math.round(monthlyMortgage + 380);

  const localIncomeProxy = areaBenchmark.area === "Manchester" ? 4100 : 3750;
  const pressureRatio = monthlyOwnershipCost / localIncomeProxy;
  const affordabilityPressure: AffordabilityPressure =
    pressureRatio > 0.42 ? "High" : pressureRatio > 0.34 ? "Medium" : "Low";

  const localPricePosition =
    delta.differencePercent > 5
      ? `${delta.differencePercent.toFixed(1)}% above local sold baseline`
      : delta.differencePercent < -5
        ? `${Math.abs(delta.differencePercent).toFixed(1)}% below local sold baseline`
        : `${Math.abs(delta.differencePercent).toFixed(1)}% from local sold baseline`;

  const days = listing.daysOnMarket ?? 0;
  let action: DecisionAction = "Wait";
  let confidence: DecisionConfidence = "Medium";
  let negotiationStance: NegotiationStance = "Balanced";
  let rationale = "Signals are mixed versus local pricing and ownership pressure.";
  let nextStep = "Review one nearby comparable and re-check total monthly cost.";

  if (delta.differencePercent <= -4 && affordabilityPressure !== "High") {
    action = "Buy";
    confidence = days <= 21 ? "High" : "Medium";
    negotiationStance = "Strong";
    rationale = "Price sits below local sold context with manageable ownership pressure.";
    nextStep = "Move to offer planning with a time-limited first bid.";
  } else if (delta.differencePercent >= 5 || days >= 35) {
    action = "Negotiate";
    confidence = "High";
    negotiationStance = "Strong";
    rationale = "Price is above local sold context or listing momentum has slowed.";
    nextStep = "Anchor offer to local sold baseline and request seller flexibility.";
  } else if (affordabilityPressure === "High") {
    action = "Wait";
    confidence = "High";
    negotiationStance = "Weak";
    rationale = "Monthly ownership pressure is high against local affordability assumptions.";
    nextStep = "Lower purchase target or increase deposit before proceeding.";
  }

  return {
    action,
    confidence,
    rationale,
    negotiationStance,
    estimatedMonthlyOwnershipCost: monthlyOwnershipCost,
    affordabilityPressure,
    localPricePosition,
    nextStep,
  };
}
