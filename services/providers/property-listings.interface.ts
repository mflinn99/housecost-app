/**
 * Property Listings Provider Interface
 * Abstract interface for property listing sources. Providers can be swapped.
 */

import type { PropertyListing, SearchQuery, ListingFilters } from "@/types";

export interface ListingsSearchResult {
  listings: PropertyListing[];
  totalCount: number;
  source: string;
  refreshedAt: string;
  query: SearchQuery;
  filters: ListingFilters;
}

export interface IPropertyListingsProvider {
  /** Unique provider identifier */
  readonly id: string;
  /** Human-readable name */
  readonly name: string;

  /**
   * Search for listings by query and filters
   */
  search(
    query: SearchQuery,
    filters?: ListingFilters
  ): Promise<ListingsSearchResult>;

  /**
   * Get a single listing by ID if provider supports it
   */
  getById?(id: string): Promise<PropertyListing | null>;
}
