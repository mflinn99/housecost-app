import { getDistrictMarketStats } from "./marketCalculations";

export interface MarketInterpretationInput {
  marketValueDiffPercent?: number;
  marketValueLabel?: "above market" | "in line" | "below market";
  daysOnMarket?: number;
  postcodeDistrict?: string;
}

export interface MarketInterpretation {
  sentence: string;
  tone: "analytical";
  confidence: "High" | "Moderate" | "Low";
}

export function getMarketInterpretation(property: MarketInterpretationInput): MarketInterpretation {
  const diff = property.marketValueDiffPercent ?? 0;
  const days = property.daysOnMarket ?? 0;
  const label = property.marketValueLabel;
  const district = property.postcodeDistrict ?? "M6";
  const stats = getDistrictMarketStats(district);
  const confidence: MarketInterpretation["confidence"] =
    stats.comparableCount >= 10 && stats.soldVariancePercent <= 9
      ? "High"
      : stats.comparableCount >= 7 && stats.soldVariancePercent <= 14
        ? "Moderate"
        : "Low";

  if (label === "above market" || diff > 5) {
    return {
      sentence:
        days > 30
          ? `~${Math.abs(diff).toFixed(1)}% above recent sales; similar properties need reductions.`
          : `~${Math.abs(diff).toFixed(1)}% above local average; similar properties face stronger negotiation.`,
      tone: "analytical",
      confidence,
    };
  }

  if (label === "below market" || diff < -5) {
    return {
      sentence:
        days <= 21
          ? `~${Math.abs(diff).toFixed(1)}% below recent sales; similar properties attract fast demand.`
          : `~${Math.abs(diff).toFixed(1)}% below local average; similar properties draw wider interest.`,
      tone: "analytical",
      confidence,
    };
  }

  return {
    sentence: "Near recent sales and local average; similar properties trade typically.",
    tone: "analytical",
    confidence,
  };
}

export function getTopLevelMarketInsight(snapshot: {
  averageSoldPrice: number;
  averageListingPrice: number;
  differencePercent: number;
}): string {
  if (snapshot.differencePercent > 4) {
    return "Asking levels sit above recent sales; expect more negotiation and selective buyer action.";
  }
  if (snapshot.differencePercent < -2) {
    return "Asking levels sit below recent sales; expect faster demand on similar properties.";
  }
  return "Asking levels track recent sales; expect balanced conditions and disciplined negotiation.";
}
