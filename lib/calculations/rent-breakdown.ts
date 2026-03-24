/**
 * Rent affordability breakdown
 */

import { estimateUtilities } from "./utilities";
import type { UtilitiesEstimate } from "@/types";
import { UK_COUNCIL_TAX_BANDS } from "@/lib/constants";

export interface RentBreakdownInput {
  monthlyRent: number;
  depositAmount?: number;
  depositWeeks?: number;
  serviceCharge?: number;
  groundRent?: number;
  councilTaxBand?: string;
  councilTaxMonthly?: number;
  councilTaxOverride?: boolean;
  utilities?: Partial<UtilitiesEstimate>;
  contentsInsurance?: number;
  parkingCost?: number;
  bedrooms?: number;
}

export interface RentBreakdownResult {
  monthlyRent: number;
  deposit: number;
  depositWeeks: number;
  serviceCharge: number;
  groundRent: number;
  councilTax: number;
  utilities: UtilitiesEstimate;
  contentsInsurance: number;
  parkingCost: number;
  totalMonthly: number;
}

const DEFAULT_DEPOSIT_WEEKS = 5;
const DEFAULT_CONTENTS_INSURANCE = 15;
const DEFAULT_PARKING = 0;

export function calculateRentBreakdown(input: RentBreakdownInput): RentBreakdownResult {
  const depositWeeks = input.depositWeeks ?? DEFAULT_DEPOSIT_WEEKS;
  const deposit = input.depositAmount ?? input.monthlyRent * (depositWeeks / 4);

  let councilTax = 0;
  if (input.councilTaxOverride && input.councilTaxMonthly != null) {
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

  const contentsInsurance = input.contentsInsurance ?? DEFAULT_CONTENTS_INSURANCE;
  const parkingCost = input.parkingCost ?? DEFAULT_PARKING;
  const serviceCharge = input.serviceCharge ?? 0;
  const groundRent = (input.groundRent ?? 0) / 12;

  const totalMonthly =
    input.monthlyRent +
    serviceCharge +
    groundRent +
    utilities.total +
    contentsInsurance +
    parkingCost;

  return {
    monthlyRent: input.monthlyRent,
    deposit,
    depositWeeks,
    serviceCharge,
    groundRent,
    councilTax: councilTax || utilities.councilTax,
    utilities,
    contentsInsurance,
    parkingCost,
    totalMonthly: Math.round(totalMonthly * 100) / 100,
  };
}
