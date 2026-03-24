/**
 * Density scoring
 * Higher amenity/venue count = higher density (more urban)
 */

import type { AmenitiesInput, VenueInput } from "./types";

export function scoreDensity(
  amenities: AmenitiesInput = {},
  sportsVenues?: VenueInput,
  eventVenues?: VenueInput
): number {
  const bars = amenities.bars ?? 0;
  const restaurants = amenities.restaurants ?? 0;
  const cafes = amenities.cafes ?? 0;
  const sports = sportsVenues?.count ?? 0;
  const events = eventVenues?.count ?? 0;

  const raw = (bars + restaurants + cafes) / 50 + (sports + events) / 10;
  return Math.min(10, Math.max(0, Math.round(raw * 10) / 10));
}
