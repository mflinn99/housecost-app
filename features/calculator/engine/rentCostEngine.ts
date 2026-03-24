/**
 * Rent Cost Engine
 * Pure calculation: monthly rent + council tax + utilities + insurance = total.
 * No UI dependency. Fully typed. Test covered.
 */

export interface RentCostInput {
  rent: number;
  councilTaxMonthly?: number;
  councilTaxBand?: string;
  councilTaxBands?: Record<string, { annual: number }>;
  utilities?: {
    electricity?: number;
    gas?: number;
    water?: number;
    broadband?: number;
    tvLicence?: number;
  };
  bedrooms?: number;
  insurance?: number;
  serviceCharge?: number;
  groundRentYearly?: number;
}

export interface RentCostResult {
  rent: number;
  councilTax: number;
  utilities: {
    electricity: number;
    gas: number;
    water: number;
    broadband: number;
    tvLicence: number;
    total: number;
  };
  insurance: number;
  serviceCharge: number;
  groundRent: number;
  totalMonthly: number;
}

const DEFAULT_COUNCIL_TAX_BANDS: Record<string, { annual: number }> = {
  A: { annual: 1200 },
  B: { annual: 1400 },
  C: { annual: 1600 },
  D: { annual: 1800 },
  E: { annual: 2200 },
  F: { annual: 2600 },
  G: { annual: 3000 },
  H: { annual: 3600 },
};

const DEFAULT_UTILITIES = {
  electricity: 80,
  gas: 70,
  water: 35,
  broadband: 30,
  tvLicence: 14,
};

function estimateUtilities(bedrooms: number): RentCostResult["utilities"] {
  const mult = Math.max(0.5, Math.min(2, (bedrooms || 2) / 2));
  const electricity = DEFAULT_UTILITIES.electricity * mult;
  const gas = DEFAULT_UTILITIES.gas * mult;
  const water = DEFAULT_UTILITIES.water * mult;
  const broadband = DEFAULT_UTILITIES.broadband;
  const tvLicence = DEFAULT_UTILITIES.tvLicence;
  return {
    electricity,
    gas,
    water,
    broadband,
    tvLicence,
    total: electricity + gas + water + broadband + tvLicence,
  };
}

export function calculateRentCost(input: RentCostInput): RentCostResult {
  const rent = Math.max(0, input.rent);

  let councilTax = 0;
  if (input.councilTaxMonthly != null && input.councilTaxMonthly >= 0) {
    councilTax = input.councilTaxMonthly;
  } else if (input.councilTaxBand) {
    const bands = input.councilTaxBands ?? DEFAULT_COUNCIL_TAX_BANDS;
    const band = bands[input.councilTaxBand.toUpperCase()];
    councilTax = band ? band.annual / 12 : 0;
  }

  const utilities = input.utilities
    ? {
        electricity: input.utilities.electricity ?? DEFAULT_UTILITIES.electricity,
        gas: input.utilities.gas ?? DEFAULT_UTILITIES.gas,
        water: input.utilities.water ?? DEFAULT_UTILITIES.water,
        broadband: input.utilities.broadband ?? DEFAULT_UTILITIES.broadband,
        tvLicence: input.utilities.tvLicence ?? DEFAULT_UTILITIES.tvLicence,
        total: 0,
      }
    : estimateUtilities(input.bedrooms ?? 2);

  if (input.utilities) {
    utilities.total =
      utilities.electricity + utilities.gas + utilities.water + utilities.broadband + utilities.tvLicence;
  }

  const insurance = Math.max(0, input.insurance ?? 15);
  const serviceCharge = Math.max(0, input.serviceCharge ?? 0);
  const groundRent = Math.max(0, (input.groundRentYearly ?? 0) / 12);

  const totalMonthly =
    rent + councilTax + utilities.total + insurance + serviceCharge + groundRent;

  return {
    rent,
    councilTax,
    utilities: { ...utilities },
    insurance,
    serviceCharge,
    groundRent,
    totalMonthly: Math.round(totalMonthly * 100) / 100,
  };
}
