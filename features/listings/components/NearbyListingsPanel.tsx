"use client";

import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import type { NearbyListing } from "@/app/search/nearby/actions";
import { cn } from "@/lib/utils";

interface NearbyListingsPanelProps {
  listings: NearbyListing[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  intent: "rent" | "buy";
}

export function NearbyListingsPanel({
  listings,
  selectedId,
  onSelect,
  intent,
}: NearbyListingsPanelProps) {
  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
        <p className="text-stone-600">No properties within this radius.</p>
        <p className="mt-1 text-sm text-stone-500">Try increasing the distance.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-stone-600">
        {listings.length} {listings.length === 1 ? "property" : "properties"} nearby
      </p>
      <div className="space-y-2">
        {listings.map((listing) => (
          <div
            key={listing.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(listing.id)}
            onKeyDown={(e) => e.key === "Enter" && onSelect(listing.id)}
            className={cn(
              "cursor-pointer overflow-hidden rounded-xl border bg-white transition",
              selectedId === listing.id
                ? "border-stone-900 ring-2 ring-stone-900/20"
                : "border-stone-200 hover:border-stone-300"
            )}
          >
            <div className="flex gap-4 p-4">
              <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
                {listing.mainImageUrl ? (
                  <img
                    src={listing.mainImageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-stone-400 text-xs">
                    —
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-stone-900">{listing.displayPrice}</p>
                <p className="text-sm text-stone-600 line-clamp-1">{listing.title}</p>
                <p className="text-xs text-stone-500">
                  {listing.bedrooms != null && `${listing.bedrooms} bed`}
                  {listing.parking && listing.parking !== "none" && ` · ${listing.parking.replace("_", " ")}`}
                </p>
                <div className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                  <MapPin className="h-3 w-3" />
                  {listing.distanceKm < 1
                    ? `${Math.round(listing.distanceKm * 1000)} m`
                    : `${listing.distanceKm.toFixed(1)} km`}
                </div>
                <Link
                  href={`/property/${listing.id}?intent=${intent}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900"
                >
                  View details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
