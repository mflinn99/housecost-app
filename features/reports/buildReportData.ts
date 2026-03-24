/**
 * Build report data from selected listings
 */

import type { PropertyListing } from "@/types";
import { getMockAreaIntelligence } from "@/services/providers/mock-area";
import { calculateVibeScore } from "@/features/vibe-score/vibe-engine";
import {
  calculateRentBreakdown,
  calculateBuyBreakdown,
} from "@/lib/calculations";
import type { ReportData, ReportPropertyData } from "./types";

export async function buildReportData(
  listings: PropertyListing[],
  location: string,
  intent: "rent" | "buy"
): Promise<ReportData> {
  const properties: ReportPropertyData[] = listings.map((listing) => {
    const area = getMockAreaIntelligence(listing.location, listing.transport);
    const vibe = calculateVibeScore(area, listing.parking);

    let monthlyCost: number | undefined;
    let upfrontCost: number | undefined;

    if (intent === "rent") {
      const breakdown = calculateRentBreakdown({
        monthlyRent: listing.priceValue,
        depositWeeks: 5,
        serviceCharge: listing.serviceCharge,
        groundRent: listing.groundRent,
        councilTaxBand: listing.councilTaxBand,
        bedrooms: listing.bedrooms,
      });
      monthlyCost = breakdown.totalMonthly;
      upfrontCost = breakdown.deposit;
    } else {
      const breakdown = calculateBuyBreakdown({
        purchasePrice: listing.priceValue,
        depositPercent: 10,
        mortgageTermYears: 25,
        interestRatePercent: 4.5,
        mortgageType: "repayment",
        serviceCharge: listing.serviceCharge,
        groundRent: listing.groundRent,
        councilTaxBand: listing.councilTaxBand,
        bedrooms: listing.bedrooms,
      });
      monthlyCost = breakdown.totalMonthly;
      upfrontCost = breakdown.deposit + breakdown.upfront.total;
    }

    const transportSummary = area.transportSummary?.summary;
    const amenitiesCount =
      (area.amenities.bars ?? 0) +
      (area.amenities.restaurants ?? 0) +
      (area.amenities.cafes ?? 0) +
      (area.amenities.supermarkets ?? 0) +
      (area.amenities.gyms ?? 0);

    return {
      listing,
      area,
      vibe,
      monthlyCost,
      upfrontCost,
      transportSummary,
      amenitiesCount,
    };
  });

  // Compute recommendations
  const withMonthly = properties.filter((p) => p.monthlyCost != null);
  const cheapestMonthly = withMonthly.length
    ? withMonthly.reduce((a, b) => (a.monthlyCost! < b.monthlyCost! ? a : b))
    : null;
  const bestVibe = properties.length
    ? properties.reduce((a, b) => (a.vibe.score > b.vibe.score ? a : b))
    : null;
  const bestQuiet = properties.length
    ? properties.reduce((a, b) =>
        (a.area.scores.quietness ?? 0) > (b.area.scores.quietness ?? 0) ? a : b
      )
    : null;

  return {
    generatedAt: new Date().toISOString(),
    location,
    intent,
    assumptionsSummary: intent === "rent" ? "5 weeks deposit, standard utilities" : "10% deposit, 25yr mortgage, 4.5% rate",
    properties,
    recommendations: {
      bestValue: cheapestMonthly?.listing.address,
      bestLifestyle: bestVibe?.listing.address,
      bestQuiet: bestQuiet?.listing.address,
    },
  };
}
