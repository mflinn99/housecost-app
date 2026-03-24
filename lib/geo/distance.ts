/**
 * Distance calculation utilities.
 * Uses Haversine formula for great-circle distance.
 */

import type { GeoPoint } from "@/types/location";

const EARTH_RADIUS_KM = 6371;

/**
 * Calculate distance between two points in km (Haversine).
 */
export function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return EARTH_RADIUS_KM * c;
}

/**
 * Distance in metres
 */
export function haversineMetres(a: GeoPoint, b: GeoPoint): number {
  return haversineKm(a, b) * 1000;
}
