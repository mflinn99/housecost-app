import { getDistrictMarketStats, getOverallMarketSnapshot } from "./marketCalculations";

export interface DecisionSignalInput {
  postcodeDistrict?: string;
  marketValueDiffPercent?: number;
  daysOnMarket?: number;
}

export interface DecisionSignal {
  actionLabel: "View" | "Wait" | "Act" | "Negotiate";
  reasoning: string;
}

export function getDecisionSignal(input: DecisionSignalInput): DecisionSignal {
  const district = input.postcodeDistrict ?? "M6";
  const diff = input.marketValueDiffPercent ?? 0;
  const days = input.daysOnMarket ?? 0;
  const districtStats = getDistrictMarketStats(district);
  const marketTrend = getOverallMarketSnapshot().differencePercent;

  if (diff <= -5 && days <= 21) {
    return {
      actionLabel: "Act",
      reasoning: "Below local average and moving quickly against recent sales.",
    };
  }

  if (diff >= 5 || days >= 35) {
    return {
      actionLabel: "Negotiate",
      reasoning: "Above recent sales with time build-up; push harder on price.",
    };
  }

  if (Math.abs(diff) <= 3 && districtStats.soldVariancePercent <= 10 && marketTrend >= 0) {
    return {
      actionLabel: "View",
      reasoning: "Near local average; similar properties trade on quality.",
    };
  }

  return {
    actionLabel: "Wait",
    reasoning: "Mixed versus recent sales; wait for better local alignment.",
  };
}
