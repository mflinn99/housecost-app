/**
 * Utilities cost estimation
 * Default values based on UK averages for typical households
 */

export interface UtilitiesEstimateInput {
  bedrooms?: number;
  /** Override electricity monthly */
  electricity?: number;
  gas?: number;
  water?: number;
  broadband?: number;
  councilTaxMonthly?: number;
  tvLicence?: number;
}

export interface UtilitiesEstimate {
  electricity: number;
  gas: number;
  water: number;
  broadband: number;
  councilTax: number;
  tvLicence?: number;
  total: number;
}

const DEFAULTS = {
  electricity: 80,
  gas: 70,
  water: 35,
  broadband: 30,
  tvLicence: 14,
};

export function estimateUtilities(input: UtilitiesEstimateInput = {}): UtilitiesEstimate {
  const bedrooms = input.bedrooms ?? 2;
  const multiplier = Math.max(0.5, Math.min(2, bedrooms / 2));

  const electricity = input.electricity ?? DEFAULTS.electricity * multiplier;
  const gas = input.gas ?? DEFAULTS.gas * multiplier;
  const water = input.water ?? DEFAULTS.water * multiplier;
  const broadband = input.broadband ?? DEFAULTS.broadband;
  const councilTax = input.councilTaxMonthly ?? 0;
  const tvLicence = input.tvLicence ?? DEFAULTS.tvLicence;

  const total = electricity + gas + water + broadband + councilTax + tvLicence;

  return {
    electricity,
    gas,
    water,
    broadband,
    councilTax,
    tvLicence,
    total,
  };
}
