/**
 * Property normalisation
 * Converts external/API data to canonical Property or PropertyListing shape.
 * Ensures consistent structure for engine consumption.
 */

import type { Property } from "@/types/property";
import type { PropertyListing } from "@/types";
import { validateProperty } from "@/types/property";

export interface RawPropertyInput {
  id: string;
  title?: string;
  address?: string;
  postcode?: string;
  lat?: number;
  lng?: number;
  price?: number;
  rent?: number;
  priceValue?: number;
  priceType?: "pcm" | "total";
  displayPrice?: string;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  listedAt?: string;
  listedDate?: string;
  daysOnMarket?: number;
  serviceCharge?: number;
  groundRent?: number;
  parking?: string;
  mainImageUrl?: string;
  image?: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export function normalizeToProperty(raw: RawPropertyInput): Property {
  const mode: Property["mode"] =
    raw.priceType === "pcm" ? "rent" : raw.priceType === "total" ? "buy" : "both";
  const price = raw.price ?? raw.priceValue ?? 0;

  const prop: Property = {
    id: String(raw.id),
    title: raw.title ?? "Untitled",
    address: raw.address ?? "",
    postcode: raw.postcode,
    coordinates:
      raw.lat != null && raw.lng != null
        ? { lat: raw.lat, lng: raw.lng }
        : undefined,
    mode,
    price,
    rent: raw.rent,
    bedrooms: raw.bedrooms,
    bathrooms: raw.bathrooms,
    propertyType: normalizePropertyType(raw.propertyType),
    listedAt: raw.listedAt ?? raw.listedDate,
    daysOnMarket: raw.daysOnMarket,
    serviceCharge: raw.serviceCharge,
    groundRent: raw.groundRent,
    parking: normalizeParking(raw.parking),
    imageUrl: (raw.mainImageUrl ?? raw.image ?? raw.imageUrl) as string | undefined,
    priceReduced: raw.priceReduced as boolean | undefined,
    previousPrice: raw.previousPrice as number | undefined,
    priceReducedDate: raw.priceReducedDate as string | undefined,
    sourceUrl: raw.sourceUrl as string | undefined,
    source: raw.source as string | undefined,
    lastRefreshed: raw.lastRefreshed as string | undefined,
  };

  if (raw.transport && typeof raw.transport === "object") {
    prop.transport = raw.transport as Property["transport"];
  }

  return prop;
}

export function normalizeToPropertyListing(raw: RawPropertyInput): PropertyListing {
  const priceValue = raw.priceValue ?? raw.price ?? 0;
  const priceType = raw.priceType ?? (raw.rent != null ? "pcm" : "total");
  const displayPrice =
    raw.displayPrice ??
    (priceType === "pcm"
      ? `£${priceValue.toLocaleString()} pcm`
      : `£${priceValue.toLocaleString()}`);

  return {
    id: String(raw.id),
    sourceUrl: (raw.sourceUrl as string) ?? "",
    source: (raw.source as string) ?? "Unknown",
    lastRefreshed: (raw.lastRefreshed as string) ?? new Date().toISOString(),
    title: raw.title ?? "Untitled",
    address: raw.address ?? "",
    displayPrice,
    priceValue,
    priceType,
    bedrooms: raw.bedrooms as number | undefined,
    bathrooms: raw.bathrooms as number | undefined,
    receptions: raw.receptions as number | undefined,
    propertyType: normalizePropertyType(raw.propertyType) as PropertyListing["propertyType"],
    tenure: raw.tenure as PropertyListing["tenure"],
    furnished: raw.furnished as PropertyListing["furnished"],
    mainImageUrl: (raw.mainImageUrl ?? raw.image ?? raw.imageUrl) as string,
    imageUrls: raw.imageUrls as string[] | undefined,
    listedDate: (raw.listedDate ?? raw.listedAt) as string | undefined,
    daysOnMarket: raw.daysOnMarket as number | undefined,
    priceReduced: raw.priceReduced as boolean | undefined,
    previousPrice: raw.previousPrice as number | undefined,
    priceReducedDate: raw.priceReducedDate as string | undefined,
    location:
      raw.lat != null && raw.lng != null
        ? { lat: raw.lat as number, lng: raw.lng as number }
        : (raw.location as PropertyListing["location"]),
    transport: raw.transport as PropertyListing["transport"],
    parking: normalizeParking(raw.parking) as PropertyListing["parking"],
    serviceCharge: raw.serviceCharge as number | undefined,
    groundRent: raw.groundRent as number | undefined,
    councilTaxBand: raw.councilTaxBand as string | undefined,
  };
}

function normalizePropertyType(v: unknown): Property["propertyType"] {
  if (!v || typeof v !== "string") return undefined;
  const s = v.toLowerCase().replace(/\s/g, "-");
  const map: Record<string, Property["propertyType"]> = {
    flat: "flat",
    house: "house",
    bungalow: "bungalow",
    maisonette: "maisonette",
    terraced: "terraced",
    "semi-detached": "semi-detached",
    detached: "detached",
    studio: "studio",
  };
  return map[s] ?? "other";
}

function normalizeParking(v: unknown): Property["parking"] {
  if (!v || typeof v !== "string") return undefined;
  const s = v.toLowerCase().replace(/\s/g, "_");
  const map: Record<string, Property["parking"]> = {
    on_street: "on_street",
    permit: "permit",
    driveway: "driveway",
    garage: "garage",
    allocated: "allocated",
    none: "none",
  };
  return map[s] ?? "unknown";
}

export function validateAndNormalize(raw: RawPropertyInput): {
  property: Property;
  validation: ReturnType<typeof validateProperty>;
} {
  const property = normalizeToProperty(raw);
  const validation = validateProperty(property);
  return { property, validation };
}
