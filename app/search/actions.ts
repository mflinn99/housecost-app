"use server";

import { MockListingsProvider } from "@/services/providers/mock-listings";
import type { SearchIntent, ListingFilters } from "@/types";

const provider = new MockListingsProvider();
const LOCAL_QUERY_PATTERN = /\b(manchester|salford|m\d{1,2})\b/i;

export async function searchListings(
  query: string,
  intent: SearchIntent,
  filters: ListingFilters = {}
) {
  if (query.trim() && !LOCAL_QUERY_PATTERN.test(query.trim())) {
    return {
      listings: [],
      totalCount: 0,
      source: "Manchester + Salford only",
      refreshedAt: new Date().toISOString(),
      query: { query, intent },
      filters,
    };
  }

  const result = await provider.search(
    { query, intent },
    filters
  );
  return result;
}
