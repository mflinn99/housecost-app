/**
 * UK Stamp Duty Land Tax (SDLT) estimation
 * Bands as of typical structure - verify for current rates
 */

export type BuyerStatus = "first_time_buyer" | "mover" | "investor";

/** 2024/25 SDLT bands (England & NI) - simplified */
const STANDARD_BANDS = [
  { max: 250_000, rate: 0 },
  { max: 925_000, rate: 0.05 },
  { max: 1_500_000, rate: 0.10 },
  { max: Infinity, rate: 0.12 },
];

/** First-time buyer relief: no SDLT on first £425k, 5% on £425k–£625k */
function firstTimeBuyerRate(price: number): number {
  if (price <= 425_000) return 0;
  if (price <= 625_000) return 0.05;
  return 0; // Above 625k uses standard (simplified)
}

export function calculateStampDuty(
  purchasePrice: number,
  buyerStatus?: BuyerStatus
): number {
  if (purchasePrice <= 0) return 0;

  if (buyerStatus === "first_time_buyer" && purchasePrice <= 625_000) {
    if (purchasePrice <= 425_000) return 0;
    return (purchasePrice - 425_000) * 0.05;
  }

  let remaining = purchasePrice;
  let tax = 0;
  let prevMax = 0;

  for (const band of STANDARD_BANDS) {
    const taxableInBand = Math.min(remaining, band.max - prevMax);
    if (taxableInBand > 0) {
      tax += taxableInBand * band.rate;
      remaining -= taxableInBand;
    }
    prevMax = band.max;
    if (remaining <= 0) break;
  }

  return Math.round(tax * 100) / 100;
}
