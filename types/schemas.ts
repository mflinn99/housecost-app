/**
 * Zod schemas for runtime validation
 */

import { z } from "zod";

export const searchIntentSchema = z.enum(["rent", "buy"]);

export const propertyTypeSchema = z.enum([
  "flat",
  "house",
  "bungalow",
  "maisonette",
  "terraced",
  "semi-detached",
  "detached",
  "studio",
  "other",
]);

export const parkingTypeSchema = z.enum([
  "on_street",
  "permit",
  "driveway",
  "garage",
  "allocated",
  "none",
  "unknown",
]);

export const transportDistanceSchema = z.object({
  distanceMetres: z.number().min(0),
  walkMinutes: z.number().min(0),
  name: z.string(),
});

export const geoLocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const propertyListingSchema = z.object({
  id: z.string(),
  sourceUrl: z.string().url(),
  source: z.string(),
  lastRefreshed: z.string(),
  title: z.string(),
  address: z.string(),
  displayPrice: z.string(),
  priceValue: z.number().min(0),
  priceType: z.enum(["pcm", "total"]),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  receptions: z.number().int().min(0).optional(),
  propertyType: propertyTypeSchema.optional(),
  tenure: z.enum(["freehold", "leasehold", "unknown"]).optional(),
  furnished: z.enum(["furnished", "unfurnished", "part_furnished", "unknown"]).optional(),
  mainImageUrl: z.string().url().optional(),
  imageUrls: z.array(z.string().url()).optional(),
  listedDate: z.string().optional(),
  daysOnMarket: z.number().int().min(0).optional(),
  priceReduced: z.boolean().optional(),
  previousPrice: z.number().optional(),
  priceReducedDate: z.string().optional(),
  location: geoLocationSchema.optional(),
  transport: z
    .object({
      nearestBus: transportDistanceSchema.optional(),
      nearestTram: transportDistanceSchema.optional(),
      nearestTrain: transportDistanceSchema.optional(),
    })
    .optional(),
  parking: parkingTypeSchema.optional(),
  description: z.string().optional(),
  serviceCharge: z.number().min(0).optional(),
  groundRent: z.number().min(0).optional(),
  councilTaxBand: z.string().optional(),
});

export const searchQuerySchema = z.object({
  query: z.string().min(1).max(200),
  intent: searchIntentSchema,
  queryType: z.enum(["postcode", "town", "street"]).optional(),
});

export const listingFiltersSchema = z.object({
  minBudget: z.number().min(0).optional(),
  maxBudget: z.number().min(0).optional(),
  bedrooms: z.number().int().min(0).optional(),
  minBedrooms: z.number().int().min(0).optional(),
  maxBedrooms: z.number().int().min(0).optional(),
  propertyTypes: z.array(propertyTypeSchema).optional(),
  radiusMiles: z.number().min(0).optional(),
  parkingRequired: z.boolean().optional(),
  furnished: z.enum(["furnished", "unfurnished", "part_furnished", "unknown"]).optional(),
  tenure: z.enum(["freehold", "leasehold", "unknown"]).optional(),
});

export const rentAssumptionsSchema = z.object({
  monthlyRent: z.number().min(0),
  depositAmount: z.number().min(0).optional(),
  depositWeeks: z.number().min(1).max(12).optional(),
  tenancyLengthMonths: z.number().int().min(1).optional(),
  councilTaxBand: z.string().optional(),
  councilTaxMonthly: z.number().min(0).optional(),
  councilTaxOverride: z.boolean().optional(),
});

export const buyAssumptionsSchema = z.object({
  purchasePrice: z.number().min(0),
  depositAmount: z.number().min(0).optional(),
  depositPercent: z.number().min(0).max(100).optional(),
  mortgageTermYears: z.number().int().min(1).max(40),
  interestRatePercent: z.number().min(0).max(30),
  mortgageType: z.enum(["repayment", "interest_only"]),
  buyerStatus: z.enum(["first_time_buyer", "mover", "investor"]).optional(),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type ListingFiltersInput = z.infer<typeof listingFiltersSchema>;
