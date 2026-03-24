/**
 * Location types for geo/nearby search
 */

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface PropertyWithDistance {
  distanceKm: number;
  distanceMetres: number;
}
