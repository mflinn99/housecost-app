/**
 * Vibe Score Engine
 * Composite score (0-100) with sub-scores and human-readable explanation
 */

import type { AreaData, ParkingType } from "@/types";

export type VibeLabel =
  | "Calm"
  | "Lively"
  | "Balanced"
  | "Convenient"
  | "Upscale"
  | "Practical"
  | "Quiet Residential"
  | "Social / Buzzing"
  | "Event-heavy"
  | "Lifestyle-rich"
  | "Convenience-led";

export interface VibeScoreResult {
  score: number; // 0-100
  label: VibeLabel;
  explanation: string;
  subScores: {
    lifestyle: number;
    convenience: number;
    quietness: number;
  };
  signals: string[];
}

function normalizeSubScore(v: number): number {
  return Math.round(Math.max(0, Math.min(100, v * 10)));
}

function computeVibeScore(area: AreaData, parking?: ParkingType): VibeScoreResult {
  const { scores, amenities, eventActivityLevel, sportsVenues, eventVenues } = area;

  const lifestyleBase = scores.lifestyle * 10;
  const convenienceBase = scores.convenience * 10;
  const quietnessBase = scores.quietness * 10;

  let lifestyleBonus = 0;
  let convenienceBonus = 0;
  let quietnessPenalty = 0;

  const signals: string[] = [];

  if (eventActivityLevel === "high") {
    lifestyleBonus += 8;
    quietnessPenalty += 15;
    signals.push("Event-heavy area");
  } else if (eventActivityLevel === "moderate") {
    lifestyleBonus += 4;
    quietnessPenalty += 5;
  }

  const foodDensity = (amenities.bars ?? 0) + (amenities.restaurants ?? 0) + (amenities.cafes ?? 0);
  if (foodDensity > 100) {
    lifestyleBonus += 5;
    signals.push("Lifestyle-rich");
  }

  if ((amenities.supermarkets ?? 0) >= 8 && (amenities.gyms ?? 0) >= 6) {
    convenienceBonus += 5;
    signals.push("Convenience-led");
  }

  const hasParking = parking && parking !== "none" && parking !== "unknown";
  if (hasParking) {
    convenienceBonus += 5;
    signals.push("Practical parking");
  }

  const sportsCount = sportsVenues?.count ?? 0;
  const eventCount = eventVenues?.count ?? 0;
  if (sportsCount >= 6 || eventCount >= 10) {
    lifestyleBonus += 5;
  }

  const lifestyle = Math.min(100, lifestyleBase + lifestyleBonus);
  const convenience = Math.min(100, convenienceBase + convenienceBonus);
  const quietness = Math.max(0, quietnessBase - quietnessPenalty);

  const composite = Math.round((lifestyle * 0.4 + convenience * 0.35 + quietness * 0.25));

  const label = selectLabel(
    lifestyle,
    convenience,
    quietness,
    eventActivityLevel,
    foodDensity
  );

  const explanation = generateExplanation(area, label, { lifestyle, convenience, quietness });

  return {
    score: Math.max(0, Math.min(100, composite)),
    label,
    explanation,
    subScores: {
      lifestyle: normalizeSubScore(lifestyle / 10),
      convenience: normalizeSubScore(convenience / 10),
      quietness: normalizeSubScore(quietness / 10),
    },
    signals,
  };
}

function selectLabel(
  lifestyle: number,
  convenience: number,
  quietness: number,
  eventLevel?: string,
  foodDensity?: number
): VibeLabel {
  if (eventLevel === "high") return "Event-heavy";
  if (lifestyle >= 80 && quietness < 50) return "Social / Buzzing";
  if (foodDensity && foodDensity > 100) return "Lifestyle-rich";
  if (convenience >= 80 && lifestyle < 60) return "Convenience-led";
  if (quietness >= 80) return "Quiet Residential";
  if (lifestyle >= 70 && convenience >= 70) return "Balanced";
  if (convenience >= 80) return "Convenient";
  if (lifestyle >= 70) return "Lively";
  if (convenience >= 60 && quietness >= 60) return "Practical";
  if (quietness >= 60) return "Calm";
  return "Balanced";
}

function generateExplanation(
  area: AreaData,
  label: VibeLabel,
  subs: { lifestyle: number; convenience: number; quietness: number }
): string {
  const { eventActivityLevel, areaSummary } = area;

  if (areaSummary) {
    return areaSummary;
  }

  const parts: string[] = [];

  if (subs.lifestyle >= 7) {
    parts.push("Highly sociable area with strong restaurant density");
    if (area.eventVenues && area.eventVenues.count > 5) {
      parts.push("and proximity to major venues");
    }
    parts.push(", offering energy and convenience");
    if (subs.quietness < 5) {
      parts.push("but less quiet during peak times");
    }
    parts.push(".");
    return parts.join(" ");
  }

  if (eventActivityLevel === "high") {
    return "Close to major event venues – potential for noise on match days, but strong for lifestyle and access.";
  }

  if (subs.quietness >= 7) {
    return "Quiet residential feel with lower amenity density, likely to suit buyers prioritising calm over nightlife.";
  }

  if (subs.convenience >= 7 && subs.lifestyle < 6) {
    return "More practical than lively: decent transport and supermarkets nearby, but limited leisure density.";
  }

  return "Balanced area with a mix of amenities, transport access, and residential character.";
}

export function calculateVibeScore(
  area: AreaData,
  parking?: ParkingType
): VibeScoreResult {
  return computeVibeScore(area, parking);
}
