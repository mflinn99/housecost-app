/**
 * Discount likelihood estimation
 * Delegates to negotiation engine. Kept for backward compatibility.
 */

import type { PropertyListing } from "@/types";
import type { DiscountLikelihood } from "@/types";
import { calculateNegotiationScore as engineCalc } from "@/features/negotiation/engine";

export interface NegotiationScoreInput {
  listing: PropertyListing;
  averageComparablePrice?: number;
  avgDaysOnMarket?: number;
  reducedFrequency?: number;
}

export interface NegotiationScoreResult {
  likelihood: DiscountLikelihood;
  potentialRangePercent: { min: number; max: number };
  reasoning: string;
  signals: string[];
}

export function calculateNegotiationScore(
  input: NegotiationScoreInput
): NegotiationScoreResult {
  const result = engineCalc({
    daysOnMarket: input.listing.daysOnMarket,
    priceReduced: input.listing.priceReduced,
    priceValue: input.listing.priceValue,
    averageComparablePrice: input.averageComparablePrice,
    avgDaysOnMarket: input.avgDaysOnMarket,
    reducedFrequency: input.reducedFrequency,
  });
  return {
    likelihood: result.likelihood,
    potentialRangePercent: result.potentialRangePercent,
    reasoning: result.explanation,
    signals: result.signals,
  };
}
