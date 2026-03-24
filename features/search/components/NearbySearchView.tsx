"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SearchControls } from "./SearchControls";
import { RadiusSlider } from "@/features/map/components/RadiusSlider";
import { NearbyMap } from "@/features/map/components/NearbyMap";
import { NearbyListingsPanel } from "@/features/listings/components/NearbyListingsPanel";
import { getNearbyListings } from "@/app/search/nearby/actions";
import type { SearchIntent } from "@/types";

interface NearbySearchViewProps {
  initialQuery: string;
  initialIntent: SearchIntent;
}

export function NearbySearchView({ initialQuery, initialIntent }: NearbySearchViewProps) {
  const [query] = useState(initialQuery || "Manchester");
  const [intent] = useState(initialIntent);
  const [radiusKm, setRadiusKm] = useState(2);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [data, setData] = useState<Awaited<ReturnType<typeof getNearbyListings>> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNearby = useCallback(() => {
    setLoading(true);
    getNearbyListings(query, intent, radiusKm)
      .then(setData)
      .finally(() => setLoading(false));
  }, [query, intent, radiusKm]);

  useEffect(() => {
    fetchNearby();
  }, [fetchNearby]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SearchControls
          initialQuery={query}
          initialIntent={intent}
          showCloseBy={false}
          compact
        />
        <Link
          href={`/search?q=${encodeURIComponent(query)}&intent=${intent}`}
          className="text-sm font-medium text-stone-600 hover:text-stone-900"
        >
          Review listings
        </Link>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-4">
        <p className="mb-2 text-xs text-stone-500">Nearby mode is limited to Manchester and Salford.</p>
        <RadiusSlider value={radiusKm} onChange={setRadiusKm} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
          <p className="mt-4 text-stone-500">Finding nearby properties…</p>
        </div>
      ) : data ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="min-h-[320px]">
            <NearbyMap
              listings={data.listings}
              centre={data.centre}
              selectedId={selectedId}
              onMarkerClick={setSelectedId}
            />
          </div>
          <div className="overflow-y-auto lg:max-h-[400px]">
            <NearbyListingsPanel
              listings={data.listings}
              selectedId={selectedId}
              onSelect={setSelectedId}
              intent={intent}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
