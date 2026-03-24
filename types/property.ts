/**
 * Mattsnoop Canonical Property Model
 * Complete, scalable, validated. Single source of truth.
 */

export type PropertyMode = "rent" | "buy" | "both";

export type PropertyType =
  | "flat"
  | "house"
  | "bungalow"
  | "maisonette"
  | "terraced"
  | "semi-detached"
  | "detached"
  | "studio"
  | "other";

export type ParkingType =
  | "on_street"
  | "permit"
  | "driveway"
  | "garage"
  | "allocated"
  | "none"
  | "unknown";

export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface TransportDistance {
  distanceMetres: number;
  walkMinutes: number;
  name: string;
}

export interface TransportDistances {
  nearestBus?: TransportDistance;
  nearestTram?: TransportDistance;
  nearestTrain?: TransportDistance;
}

export interface AreaSummary {
  areaId?: string;
  lifestyleScore?: number;
  convenienceScore?: number;
  quietnessScore?: number;
  amenitiesCount?: number;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  postcode?: string;
  coordinates?: GeoCoordinates;
  mode: PropertyMode;
  /** For rent: pcm. For buy: total. */
  price: number;
  /** Rent pcm if available (for buy properties that can also rent) */
  rent?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType;
  listedAt?: string; // ISO date
  daysOnMarket?: number;
  serviceCharge?: number; // monthly
  groundRent?: number; // yearly
  parking?: ParkingType;
  transport?: TransportDistances;
  area?: AreaSummary;

  // Optional extras
  imageUrl?: string;
  imageUrls?: string[];
  description?: string;
  priceReduced?: boolean;
  previousPrice?: number;
  priceReducedDate?: string;
  sourceUrl?: string;
  source?: string;
  lastRefreshed?: string;
  tenure?: "freehold" | "leasehold" | "unknown";
  furnished?: "furnished" | "unfurnished" | "part_furnished" | "unknown";
  receptions?: number;
  councilTaxBand?: string;
}

export interface PropertyValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const REQUIRED_FIELDS = ["id", "title", "address", "mode", "price"] as const;
const VALID_MODES: PropertyMode[] = ["rent", "buy", "both"];
const VALID_PROPERTY_TYPES: PropertyType[] = [
  "flat", "house", "bungalow", "maisonette", "terraced",
  "semi-detached", "detached", "studio", "other"
];
const VALID_PARKING: ParkingType[] = [
  "on_street", "permit", "driveway", "garage", "allocated", "none", "unknown"
];

export function validateProperty(p: unknown): PropertyValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!p || typeof p !== "object") {
    return { valid: false, errors: ["Property must be an object"], warnings: [] };
  }

  const obj = p as Record<string, unknown>;

  for (const field of REQUIRED_FIELDS) {
    if (obj[field] === undefined || obj[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (typeof obj.id !== "string" || obj.id.trim() === "") {
    errors.push("id must be a non-empty string");
  }

  if (typeof obj.title !== "string" || obj.title.trim() === "") {
    errors.push("title must be a non-empty string");
  }

  if (typeof obj.address !== "string" || obj.address.trim() === "") {
    errors.push("address must be a non-empty string");
  }

  const mode = obj.mode;
  if (!VALID_MODES.includes(mode as PropertyMode)) {
    errors.push(`mode must be one of: ${VALID_MODES.join(", ")}`);
  }

  const price = Number(obj.price);
  if (Number.isNaN(price) || price < 0) {
    errors.push("price must be a non-negative number");
  }

  if (obj.coordinates != null) {
    const coords = obj.coordinates as Record<string, unknown>;
    if (typeof coords.lat !== "number" || typeof coords.lng !== "number") {
      errors.push("coordinates must have lat and lng numbers");
    } else if (
      coords.lat < -90 || coords.lat > 90 ||
      coords.lng < -180 || coords.lng > 180
    ) {
      errors.push("coordinates out of valid range");
    }
  }

  if (obj.propertyType != null && !VALID_PROPERTY_TYPES.includes(obj.propertyType as PropertyType)) {
    warnings.push(`Unknown propertyType: ${obj.propertyType}`);
  }

  if (obj.parking != null && !VALID_PARKING.includes(obj.parking as ParkingType)) {
    warnings.push(`Unknown parking: ${obj.parking}`);
  }

  if (obj.bedrooms != null) {
    const b = Number(obj.bedrooms);
    if (!Number.isInteger(b) || b < 0 || b > 20) {
      warnings.push("bedrooms should be 0-20");
    }
  }

  if (obj.daysOnMarket != null) {
    const d = Number(obj.daysOnMarket);
    if (!Number.isInteger(d) || d < 0) {
      warnings.push("daysOnMarket should be non-negative integer");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/** Check if property has minimal valid structure (for partial validation) */
export function isPropertyLike(p: unknown): p is Record<string, unknown> {
  if (!p || typeof p !== "object") return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.title === "string" &&
    typeof o.address === "string" &&
    (o.mode === "rent" || o.mode === "buy" || o.mode === "both") &&
    typeof o.price === "number" && o.price >= 0
  );
}
