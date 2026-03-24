/**
 * Event/activity scoring
 * Based on event level, sports venues, event venues
 */

import type { VenueInput } from "./types";

export type EventActivityLevel = "low" | "moderate" | "high";

export function scoreEventActivity(
  level?: EventActivityLevel,
  sportsVenues?: VenueInput,
  eventVenues?: VenueInput
): number {
  let base = 0;
  if (level === "high") base = 8;
  else if (level === "moderate") base = 5;
  else if (level === "low") base = 2;

  const sports = sportsVenues?.count ?? 0;
  const events = eventVenues?.count ?? 0;
  const venueBonus = Math.min(2, (sports + events) / 10);

  return Math.min(10, Math.max(0, base + venueBonus));
}
