/**
 * Manchester + Salford listings provider for the demo slice.
 */

import type { PropertyListing, SearchQuery, ListingFilters, SearchIntent } from "@/types";
import { MANCHESTER_PROPERTIES } from "@/data/manchester-properties";
import { getPriceDelta } from "@/lib/market/marketCalculations";
import type { IPropertyListingsProvider, ListingsSearchResult } from "./property-listings.interface";

const MANCHESTER_LISTINGS: PropertyListing[] = MANCHESTER_PROPERTIES.map((property) => {
  const delta = getPriceDelta(property);
  return {
    id: property.id,
    sourceUrl: `https://example.com/listing/${property.id}`,
    source: property.sourceLabel,
    lastRefreshed: new Date().toISOString(),
    title: `${property.bedrooms} bed ${property.propertyType}`,
    address: `${property.postcodeDistrict}, ${property.postcode}`,
    displayPrice: `£${property.price.toLocaleString()}`,
    priceValue: property.price,
    priceType: "total",
    bedrooms: property.bedrooms,
    propertyType: property.propertyType,
    listedDate: "2026-02-01",
    daysOnMarket: property.daysOnMarket,
    location: { lat: property.latitude, lng: property.longitude },
    postcode: property.postcode,
    postcodeArea: property.postcodeDistrict,
    marketValueDiffPercent: delta.differencePercent,
    marketValueLabel:
      delta.label === "Above market" ? "above market" : delta.label === "Below market" ? "below market" : "in line",
    localAverageSoldPrice: delta.localAverageSoldPrice,
  };
});

function matchesQuery(listing: PropertyListing, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  const searchParts = [
    listing.title,
    listing.address,
    listing.postcode ?? "",
    listing.postcodeArea ?? "",
    ...listing.address.split(",").map((part) => part.trim()),
  ];
  return searchParts.some((part) => part.toLowerCase().includes(q));
}

function matchesFilters(listing: PropertyListing, filters: ListingFilters, intent: SearchIntent): boolean {
  const price = listing.priceValue;

  if (intent === "rent") {
    if (filters.minBudget != null && price < filters.minBudget) return false;
    if (filters.maxBudget != null && price > filters.maxBudget) return false;
  } else {
    if (filters.minBudget != null && price < filters.minBudget) return false;
    if (filters.maxBudget != null && price > filters.maxBudget) return false;
  }

  if (filters.bedrooms != null) {
    if (filters.bedrooms === 4 && (listing.bedrooms ?? 0) < 4) return false;
    if (filters.bedrooms < 4 && listing.bedrooms !== filters.bedrooms) return false;
  }

  if (filters.minBedrooms != null && (listing.bedrooms ?? 0) < filters.minBedrooms) return false;
  if (filters.maxBedrooms != null && (listing.bedrooms ?? 0) > filters.maxBedrooms) return false;

  if (filters.propertyTypes?.length && listing.propertyType && !filters.propertyTypes.includes(listing.propertyType)) {
    return false;
  }

  if (filters.parkingRequired && (!listing.parking || listing.parking === "none" || listing.parking === "unknown")) {
    return false;
  }

  if (filters.furnished && listing.furnished && listing.furnished !== filters.furnished) return false;
  if (filters.tenure && listing.tenure && listing.tenure !== filters.tenure) return false;

  return true;
}

export class MockListingsProvider implements IPropertyListingsProvider {
  readonly id = "mock";
  readonly name = "Manchester + Salford Listings";

  async search(query: SearchQuery, filters: ListingFilters = {}): Promise<ListingsSearchResult> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const filtered = MANCHESTER_LISTINGS.filter((listing) => {
      const matchesIntent =
        (query.intent === "buy" && listing.priceType === "total") ||
        (query.intent === "rent" && listing.priceType === "pcm");
      return matchesIntent && matchesQuery(listing, query.query) && matchesFilters(listing, filters, query.intent);
    });

    return {
      listings: filtered,
      totalCount: filtered.length,
      source: this.name,
      refreshedAt: new Date().toISOString(),
      query,
      filters,
    };
  }

  async getById(id: string): Promise<PropertyListing | null> {
    return MANCHESTER_LISTINGS.find((listing) => listing.id === id) ?? null;
  }
}
