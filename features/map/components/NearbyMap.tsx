"use client";

import dynamic from "next/dynamic";
import type { NearbyListing } from "@/app/search/nearby/actions";

const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] w-full items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-stone-500 sm:h-[400px]">
      Loading map…
    </div>
  ),
});

interface NearbyMapProps {
  listings: NearbyListing[];
  centre: { lat: number; lng: number };
  selectedId: string | null;
  onMarkerClick: (id: string) => void;
}

export function NearbyMap({ listings, centre, selectedId, onMarkerClick }: NearbyMapProps) {
  return (
    <MapInner
      listings={listings}
      centre={centre}
      selectedId={selectedId}
      onMarkerClick={onMarkerClick}
    />
  );
}
