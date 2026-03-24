/**
 * Area data normalisation
 * Converts external area data to canonical format for engine consumption.
 */

import type { AreaEngineInput } from "@/features/area/engine";

export interface RawAreaInput {
  amenities?: {
    bars?: number;
    restaurants?: number;
    cafes?: number;
    supermarkets?: number;
    gyms?: number;
    takeaways?: number;
    parks?: number;
    schools?: number;
  };
  transport?: {
    nearestBusMinutes?: number;
    nearestTrainMinutes?: number;
    nearestTramMinutes?: number;
    nearestBus?: { walkMinutes: number };
    nearestTrain?: { walkMinutes: number };
    nearestTram?: { walkMinutes: number };
  };
  sportsVenues?: { count: number; nearest?: { walkMinutes: number } };
  eventVenues?: { count: number; nearest?: { walkMinutes: number } };
  eventActivityLevel?: string;
  [key: string]: unknown;
}

export function normalizeArea(raw: RawAreaInput): AreaEngineInput {
  const transport = raw.transport
    ? {
        nearestBusMinutes:
          raw.transport.nearestBusMinutes ?? raw.transport.nearestBus?.walkMinutes,
        nearestTrainMinutes:
          raw.transport.nearestTrainMinutes ?? raw.transport.nearestTrain?.walkMinutes,
        nearestTramMinutes:
          raw.transport.nearestTramMinutes ?? raw.transport.nearestTram?.walkMinutes,
      }
    : undefined;

  return {
    amenities: raw.amenities,
    transport,
    sportsVenues: raw.sportsVenues,
    eventVenues: raw.eventVenues,
    eventActivityLevel:
      raw.eventActivityLevel === "low" ||
      raw.eventActivityLevel === "moderate" ||
      raw.eventActivityLevel === "high"
        ? raw.eventActivityLevel
        : undefined,
  };
}
