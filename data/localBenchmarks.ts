export interface AreaBenchmark {
  area: "Manchester" | "Salford";
  averagePrice: number;
  localSoldPriceContext: number;
  marketTrendDirection: "rising" | "stable" | "softening";
  buyerLeverage: "buyer" | "balanced" | "seller";
}

export interface MortgageAssumptions {
  interestRatePercent: number;
  termYears: number;
  stressRatePercent: number;
  affordabilityPaymentShare: number;
}

export interface LocalBenchmarksDataset {
  asOf: string;
  sourceNote: string;
  areas: AreaBenchmark[];
  mortgageAssumptions: MortgageAssumptions;
}

export const LOCAL_BENCHMARKS: LocalBenchmarksDataset = {
  asOf: "2026-03-23",
  sourceNote:
    "Benchmarks aligned to publicly available UK HPI and ONS affordability context, prepared as a local Manchester/Salford reference set.",
  areas: [
    {
      area: "Manchester",
      averagePrice: 268000,
      localSoldPriceContext: 259000,
      marketTrendDirection: "stable",
      buyerLeverage: "balanced",
    },
    {
      area: "Salford",
      averagePrice: 241000,
      localSoldPriceContext: 234000,
      marketTrendDirection: "softening",
      buyerLeverage: "buyer",
    },
  ],
  mortgageAssumptions: {
    interestRatePercent: 4.8,
    termYears: 25,
    stressRatePercent: 6.2,
    affordabilityPaymentShare: 0.35,
  },
};

export function resolveAreaFromPostcodeDistrict(postcodeDistrict?: string): "Manchester" | "Salford" {
  if (!postcodeDistrict) return "Manchester";
  return postcodeDistrict === "M5" || postcodeDistrict === "M6" ? "Salford" : "Manchester";
}

export function getAreaBenchmark(postcodeDistrict?: string): AreaBenchmark {
  const area = resolveAreaFromPostcodeDistrict(postcodeDistrict);
  return LOCAL_BENCHMARKS.areas.find((entry) => entry.area === area) ?? LOCAL_BENCHMARKS.areas[0];
}
