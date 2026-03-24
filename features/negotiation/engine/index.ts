/**
 * Negotiation Engine
 * Discount likelihood and expected range from market signals.
 * No UI dependency.
 */

export type DiscountLikelihood = "low" | "medium" | "high";

export interface NegotiationInput {
  daysOnMarket?: number;
  priceReduced?: boolean;
  priceValue: number;
  averageComparablePrice?: number;
  avgDaysOnMarket?: number;
  reducedFrequency?: number; // % of similar listings reduced
}

export interface NegotiationResult {
  likelihood: DiscountLikelihood;
  potentialRangePercent: { min: number; max: number };
  explanation: string;
  signals: string[];
}

export function calculateNegotiationScore(input: NegotiationInput): NegotiationResult {
  const signals: string[] = [];
  let totalScore = 0;

  if (input.daysOnMarket != null) {
    const { score, signal } = scoreFromDaysOnMarket(input.daysOnMarket);
    if (signal) {
      totalScore += score;
      signals.push(signal);
    }
  }

  if (input.priceReduced) {
    totalScore += 2;
    signals.push("Price already reduced");
  }

  if (
    input.averageComparablePrice != null &&
    input.averageComparablePrice > 0 &&
    input.priceValue > 0
  ) {
    const { score, signal } = scoreFromComparable(
      input.priceValue,
      input.averageComparablePrice
    );
    if (signal) {
      totalScore += score;
      signals.push(signal);
    }
  }

  if (
    input.reducedFrequency != null &&
    input.reducedFrequency > 30
  ) {
    totalScore += 1;
    signals.push("High reduction rate in area");
  }

  let likelihood: DiscountLikelihood;
  let potentialRangePercent: { min: number; max: number };

  if (totalScore >= 5) {
    likelihood = "high";
    potentialRangePercent = { min: 3, max: 8 };
  } else if (totalScore >= 2) {
    likelihood = "medium";
    potentialRangePercent = { min: 1, max: 4 };
  } else {
    likelihood = "low";
    potentialRangePercent = { min: 0, max: 2 };
  }

  const explanation =
    signals.length > 0
      ? `Based on: ${signals.join("; ")}.`
      : "Limited data. Consider local market research.";

  return {
    likelihood,
    potentialRangePercent,
    explanation,
    signals,
  };
}

function scoreFromDaysOnMarket(
  days: number
): { score: number; signal: string } {
  if (days >= 90) return { score: 3, signal: "90+ days on market" };
  if (days >= 60) return { score: 2, signal: "60+ days on market" };
  if (days >= 30) return { score: 1, signal: "30+ days on market" };
  return { score: 0, signal: "Recently listed" };
}

function scoreFromComparable(
  listingPrice: number,
  avgPrice: number
): { score: number; signal: string } {
  const diff = ((listingPrice - avgPrice) / avgPrice) * 100;
  if (diff > 10) return { score: 2, signal: "Above local comparables" };
  if (diff > 5) return { score: 1, signal: "Slightly above local comparables" };
  return { score: 0, signal: "" };
}
