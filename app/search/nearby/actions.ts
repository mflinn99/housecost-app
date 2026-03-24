"use server";

import { MockListingsProvider } from "@/services/providers/mock-listings";
import { getCentreForQuery } from "@/services/mockGeo";
import { haversineKm } from "@/lib/geo/distance";
import type { SearchIntent } from "@/types";

export type NearbyListing = {
  id: string;
  title: string;
  address: string;
  displayPrice: string;
  priceValue: number;
  priceType: "pcm" | "total";
  bedrooms?: number;
  mainImageUrl?: string;
  daysOnMarket?: number;
  parking?: string;
  lat: number;
  lng: number;
  distanceKm: number;
};

const RADIUS_OPTIONS = [0.25, 0.5, 1, 2, 3, 5] as const;
const LOCAL_QUERY_PATTERN = /\b(manchester|salford|m\d{1,2})\b/i;

export const RADIUS_KM_OPTIONS = RADIUS_OPTIONS;

export async function getNearbyListings(
  query: string,
  intent: SearchIntent,
  radiusKm: number
): Promise<{ listings: NearbyListing[]; centre: { lat: number; lng: number } }> {
  const trimmed = query.trim();
  if (trimmed && !LOCAL_QUERY_PATTERN.test(trimmed)) {
    return {
      listings: [],
      centre: getCentreForQuery("Manchester"),
    };
  }

  const provider = new MockListingsProvider();
  const centre = getCentreForQuery(trimmed || "Manchester");
  const allResult = await provider.search({ query: "", intent }, {});

  const withDistance = allResult.listings
    .filter((l) => l.location)
    .map((l) => {
      const dist = haversineKm(centre, l.location!);
      return { ...l, distanceKm: dist };
    })
    .filter((l) => l.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return {
    listings: withDistance.map((l) => ({
      id: l.id,
      title: l.title,
      address: l.address,
      displayPrice: l.displayPrice,
      priceValue: l.priceValue,
      priceType: l.priceType,
      bedrooms: l.bedrooms,
      mainImageUrl: l.mainImageUrl,
      daysOnMarket: l.daysOnMarket,
      parking: l.parking,
      lat: l.location!.lat,
      lng: l.location!.lng,
      distanceKm: l.distanceKm,
    })),
    centre,
  };
}
