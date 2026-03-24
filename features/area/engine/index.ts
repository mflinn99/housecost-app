/**
 * Area Intelligence Engine
 * Produces structured area profile from raw area data
 */

import type { AreaEngineInput, AreaProfile } from "./types";
import { scoreAmenities } from "./amenitiesScoring";
import { scoreTransport } from "./transportScoring";
import { scoreDensity } from "./densityScoring";
import { scoreEventActivity } from "./eventActivityScoring";

export { scoreAmenities } from "./amenitiesScoring";
export { scoreTransport } from "./transportScoring";
export { scoreDensity } from "./densityScoring";
export { scoreEventActivity } from "./eventActivityScoring";
export type { AreaProfile, AreaEngineInput } from "./types";

export function computeAreaProfile(input: AreaEngineInput): AreaProfile {
  const amenitiesScore = scoreAmenities(input.amenities);
  const transportScore = scoreTransport(input.transport);
  const densityScore = scoreDensity(
    input.amenities,
    input.sportsVenues,
    input.eventVenues
  );
  const eventActivityScore = scoreEventActivity(
    input.eventActivityLevel,
    input.sportsVenues,
    input.eventVenues
  );

  // Lifestyle: amenities + events
  const lifestyleScore = Math.min(
    10,
    (amenitiesScore * 0.6 + eventActivityScore * 0.4)
  );

  // Convenience: transport + amenities (supermarkets etc)
  const convenienceScore = Math.min(
    10,
    (transportScore * 0.6 + amenitiesScore * 0.4)
  );

  // Quietness: inverse of density and event activity
  const quietnessScore = Math.max(
    0,
    10 - (densityScore * 0.5 + eventActivityScore * 0.5)
  );

  return {
    amenitiesScore: Math.round(amenitiesScore * 10) / 10,
    transportScore: Math.round(transportScore * 10) / 10,
    densityScore: Math.round(densityScore * 10) / 10,
    eventActivityScore: Math.round(eventActivityScore * 10) / 10,
    lifestyleScore: Math.round(lifestyleScore * 10) / 10,
    convenienceScore: Math.round(convenienceScore * 10) / 10,
    quietnessScore: Math.round(quietnessScore * 10) / 10,
  };
}
