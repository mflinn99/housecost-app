/**
 * Provider interfaces for Phase 2 swap.
 * All providers sit behind these interfaces.
 */

import type {
  PropertyListing,
  SearchQuery,
  ListingFilters,
  GeoLocation,
  TransportInfo,
  ComparableSummary,
  PriceTrendPoint,
  ComparableDistribution,
  Demographics,
  AmenitiesCount,
} from "@/types";

// -----------------------------------------------------------------------------
// PropertyProvider (listings)
// -----------------------------------------------------------------------------

export interface ListingsSearchResult {
  listings: PropertyListing[];
  totalCount: number;
  source: string;
  refreshedAt: string;
  query: SearchQuery;
  filters: ListingFilters;
}

export interface PropertyProvider {
  readonly id: string;
  readonly name: string;
  search(query: SearchQuery, filters?: ListingFilters): Promise<ListingsSearchResult>;
  getById?(id: string): Promise<PropertyListing | null>;
}

// -----------------------------------------------------------------------------
// GeoProvider (geocoding)
// -----------------------------------------------------------------------------

export interface GeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

export interface GeoProvider {
  readonly id: string;
  geocode(query: string): Promise<GeocodeResult | null>;
}

// -----------------------------------------------------------------------------
// TransportProvider
// -----------------------------------------------------------------------------

export interface TransportProvider {
  readonly id: string;
  getNearestTransport(location: GeoLocation): Promise<TransportInfo>;
}

// -----------------------------------------------------------------------------
// MarketDataProvider (comparables, trends)
// -----------------------------------------------------------------------------

export interface MarketDataResult {
  summary: ComparableSummary;
  trend: PriceTrendPoint[];
  distribution: ComparableDistribution[];
}

export interface MarketDataProvider {
  readonly id: string;
  getComparables(
    location: GeoLocation,
    intent: "rent" | "buy",
    radiusMeters?: number
  ): Promise<MarketDataResult>;
}

// -----------------------------------------------------------------------------
// AmenitiesProvider
// -----------------------------------------------------------------------------

export interface AmenitiesProvider {
  readonly id: string;
  getAmenities(location: GeoLocation, radiusMeters?: number): Promise<AmenitiesCount>;
}

// -----------------------------------------------------------------------------
// DemographicsProvider
// -----------------------------------------------------------------------------

export interface DemographicsProvider {
  readonly id: string;
  getDemographics(location: GeoLocation, radiusMeters?: number): Promise<Demographics>;
}

// -----------------------------------------------------------------------------
// CostEstimator (utilities, insurance)
// -----------------------------------------------------------------------------

export interface CostEstimator {
  estimateUtilities(bedrooms: number): { electricity: number; gas: number; water: number; broadband: number };
  estimateContentsInsurance(): number;
  estimateBuildingsInsurance(value: number): number;
}
