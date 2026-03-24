/**
 * Application constants
 */

export const APP_NAME = "Mattsnoop";

export const UK_COUNCIL_TAX_BANDS: Record<string, { annual: number }> = {
  A: { annual: 1200 },
  B: { annual: 1400 },
  C: { annual: 1600 },
  D: { annual: 1800 },
  E: { annual: 2200 },
  F: { annual: 2600 },
  G: { annual: 3000 },
  H: { annual: 3600 },
};

/** Default utilities estimate (monthly) for 2-bed flat */
export const DEFAULT_UTILITIES = {
  electricity: 80,
  gas: 70,
  water: 35,
  broadband: 30,
  tvLicence: 14,
};

/** Default deposit weeks for rent */
export const DEFAULT_DEPOSIT_WEEKS = 5;

/** Default mortgage term */
export const DEFAULT_MORTGAGE_TERM_YEARS = 25;

/** Default interest rate estimate */
export const DEFAULT_INTEREST_RATE_PERCENT = 4.5;
