/**
 * Vibe Score Engine
 * Composite score 0-100 from area profile + parking
 * Human-readable explanation. No UI dependency.
 */

import type { AreaProfile } from "@/features/area/engine";

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
  lifestyleScore: number; // 0-100
  convenienceScore: number; // 0-100
  quietnessScore: number; // 0-100
  signals: string[];
}

type ParkingType = string | undefined;

export function calculateVibeScore(
  areaProfile: AreaProfile,
  parking?: ParkingType
): VibeScoreResult {
  const signals: string[] = [];
  let lifestyle = areaProfile.lifestyleScore * 10;
  let convenience = areaProfile.convenienceScore * 10;
  let quietness = areaProfile.quietnessScore * 10;

  const hasParking = parking && parking !== "none" && parking !== "unknown";
  if (hasParking) {
    convenience += 5;
    signals.push("Practical parking");
  }

  if (areaProfile.eventActivityScore >= 7) {
    lifestyle += 8;
    quietness -= 15;
    signals.push("Event-heavy area");
  } else if (areaProfile.eventActivityScore >= 4) {
    lifestyle += 4;
    quietness -= 5;
  }

  if (areaProfile.amenitiesScore >= 8) {
    lifestyle += 5;
    signals.push("Lifestyle-rich");
  }

  if (areaProfile.transportScore >= 8 && areaProfile.amenitiesScore >= 6) {
    convenience += 5;
    signals.push("Convenience-led");
  }

  lifestyle = Math.min(100, lifestyle);
  convenience = Math.min(100, convenience);
  quietness = Math.max(0, quietness);

  const composite = Math.round(
    lifestyle * 0.4 + convenience * 0.35 + quietness * 0.25
  );
  const score = Math.max(0, Math.min(100, composite));

  const label = selectLabel(
    lifestyle,
    convenience,
    quietness,
    areaProfile.eventActivityScore,
    areaProfile.amenitiesScore
  );

  const explanation = generateExplanation(
    lifestyle,
    convenience,
    quietness,
    areaProfile,
    label
  );

  return {
    score,
    label,
    explanation,
    lifestyleScore: Math.round(lifestyle),
    convenienceScore: Math.round(convenience),
    quietnessScore: Math.round(quietness),
    signals,
  };
}

function selectLabel(
  lifestyle: number,
  convenience: number,
  quietness: number,
  eventScore: number,
  amenitiesScore: number
): VibeLabel {
  if (eventScore >= 8) return "Event-heavy";
  if (lifestyle >= 80 && quietness < 50) return "Social / Buzzing";
  if (amenitiesScore >= 8) return "Lifestyle-rich";
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
  lifestyle: number,
  convenience: number,
  quietness: number,
  area: AreaProfile,
  label: VibeLabel
): string {
  if (lifestyle >= 70) {
    const parts = ["Highly sociable area with strong amenity density"];
    if (area.eventActivityScore >= 6) parts.push("and proximity to venues");
    parts.push(", offering energy and convenience");
    if (quietness < 50) parts.push(" but less quiet during peak times");
    parts.push(".");
    return parts.join(" ");
  }

  if (area.eventActivityScore >= 8) {
    return "Close to major event venues – potential for noise on match days, but strong for lifestyle and access.";
  }

  if (quietness >= 70) {
    return "Quiet residential feel with lower amenity density, likely to suit those prioritising calm over nightlife.";
  }

  if (convenience >= 70 && lifestyle < 60) {
    return "More practical than lively: decent transport and supermarkets nearby, but limited leisure density.";
  }

  return `${label} area with a mix of amenities, transport access, and residential character.`;
}
