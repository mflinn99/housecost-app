/**
 * Mock geo service for nearby search.
 * Maps location strings to coordinates. Replace with geocoding API.
 */

import type { GeoPoint } from "@/types/location";

/** Mock centre coordinates by location query */
const MOCK_CENTRES: Record<string, GeoPoint> = {
  manchester: { lat: 53.48, lng: -2.24 },
  salford: { lat: 53.4875, lng: -2.2901 },
  m1: { lat: 53.479, lng: -2.235 },
  m2: { lat: 53.484, lng: -2.244 },
  m3: { lat: 53.487, lng: -2.252 },
  m4: { lat: 53.486, lng: -2.229 },
  m5: { lat: 53.472, lng: -2.279 },
  m6: { lat: 53.495, lng: -2.298 },
};

/** Resolve location string to centre coordinates. Returns Manchester if unknown. */
export function getCentreForQuery(query: string): GeoPoint {
  const q = query.trim().toLowerCase();
  for (const [place, coords] of Object.entries(MOCK_CENTRES)) {
    if (q.includes(place)) return coords;
  }
  return MOCK_CENTRES.manchester;
}
