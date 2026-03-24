/**
 * Amenities scoring
 * Converts raw counts to 0-10 score
 */

import type { AmenitiesInput } from "./types";

export function scoreAmenities(amenities: AmenitiesInput = {}): number {
  const bars = amenities.bars ?? 0;
  const restaurants = amenities.restaurants ?? 0;
  const cafes = amenities.cafes ?? 0;
  const supermarkets = amenities.supermarkets ?? 0;
  const gyms = amenities.gyms ?? 0;

  // Lifestyle density: bars + restaurants + cafes (weighted)
  const lifestyle = bars * 0.5 + restaurants * 1 + cafes * 0.8;
  // Convenience: supermarkets + gyms
  const convenience = supermarkets * 2 + gyms * 1.5;

  const raw = (lifestyle + convenience) / 20;
  return Math.min(10, Math.max(0, Math.round(raw * 10) / 10));
}
