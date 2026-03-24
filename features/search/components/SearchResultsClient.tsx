"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { SearchControls } from "./SearchControls";
import { FilterDrawer } from "./FilterDrawer";
import { SaveSearchButton } from "./SaveSearchButton";
import { ListingCard } from "@/features/listings/components/ListingCard";
import { NearbySearchView } from "./NearbySearchView";
import { searchListings } from "@/app/search/actions";
import type { SearchIntent, ListingFilters } from "@/types";

interface SearchResultsClientProps {
  initialQuery: string;
  initialIntent: SearchIntent;
  initialMode?: "search" | "nearby";
}

export function SearchResultsClient({
  initialQuery,
  initialIntent,
  initialMode = "search",
}: SearchResultsClientProps) {
  const [query] = useState(initialQuery);
  const [intent] = useState(initialIntent);
  const [mode] = useState(initialMode);
  const [filters, setFilters] = useState<ListingFilters>({});
  const [listings, setListings] = useState<Awaited<ReturnType<typeof searchListings>> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    searchListings(query.trim(), intent, filters)
      .then(setListings)
      .finally(() => setLoading(false));
  }, [query, intent, filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  if (mode === "nearby") {
    return (
      <NearbySearchView
        initialQuery={query || "London"}
        initialIntent={intent}
      />
    );
  }

  if (!query.trim()) {
    return (
      <div className="space-y-6">
        <div className="rounded-sm border border-stone-200/90 bg-white/70 p-3">
          <SearchControls initialQuery="" initialIntent={initialIntent} />
        </div>
        <p className="text-left text-sm text-stone-500">
          Enter a postcode, town or street to find properties
        </p>
        <div className="mt-6 rounded-sm border border-stone-200/90 bg-white/70 p-3">
          <p className="text-xs font-medium text-stone-600">Try these areas</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Manchester", "Salford", "M3", "M5"].map((area) => (
              <Link
                key={area}
                href={`/search?q=${encodeURIComponent(area)}&intent=${initialIntent}`}
                className="rounded border border-stone-200/90 bg-stone-50/50 px-2.5 py-1.5 text-xs font-medium text-stone-700 transition-colors hover:bg-stone-100"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <SearchControls
          initialQuery={query}
          initialIntent={intent}
          compact
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        {listings && (
          <span className="text-sm text-stone-500">
            {listings.source} · Updated in real time · Based on local data
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          <SaveSearchButton query={query} intent={intent} />
          <FilterDrawer filters={filters} onChange={setFilters} intent={intent} />
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
          <p className="mt-4 text-stone-500">Finding properties…</p>
        </div>
      )}

      {!loading && listings && listings.listings.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            {listings.totalCount} properties found
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                searchQuery={query}
                searchIntent={intent}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && listings && listings.listings.length === 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-600">No properties found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
