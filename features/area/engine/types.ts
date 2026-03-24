/**
 * Area engine types
 */

export interface AmenitiesInput {
  bars?: number;
  restaurants?: number;
  cafes?: number;
  supermarkets?: number;
  gyms?: number;
  takeaways?: number;
  parks?: number;
  schools?: number;
}

export interface TransportInput {
  nearestBusMinutes?: number;
  nearestTrainMinutes?: number;
  nearestTramMinutes?: number;
}

export interface VenueInput {
  count: number;
  nearest?: { walkMinutes: number };
}

export interface AreaEngineInput {
  amenities?: AmenitiesInput;
  transport?: TransportInput;
  sportsVenues?: VenueInput;
  eventVenues?: VenueInput;
  eventActivityLevel?: "low" | "moderate" | "high";
}

export interface AreaProfile {
  amenitiesScore: number; // 0-10
  transportScore: number; // 0-10
  densityScore: number; // 0-10, higher = more dense/urban
  eventActivityScore: number; // 0-10
  lifestyleScore: number; // 0-10, composite
  convenienceScore: number; // 0-10, composite
  quietnessScore: number; // 0-10, inverse of density/events
}
