/**
 * Mock Area Intelligence Provider
 * Expanded: amenities, sports, events, local highlights, area summary
 */

import type {
  Demographics,
  AmenitiesCount,
  AreaScores,
  AreaData,
  SportsVenues,
  EventVenues,
  LocalHighlights,
  TransportSummary,
  EventActivityLevel,
  GeoLocation,
  TransportInfo,
} from "@/types";

/** Area profile for location-based variation (mock) */
type AreaProfile = "city_centre" | "suburban" | "near_stadium" | "default";

function inferProfile(location?: GeoLocation): AreaProfile {
  if (!location) return "default";
  const lat = location.lat;
  if (lat > 51.5 && lat < 51.55) return "city_centre";
  if (lat > 53.4 && lat < 53.5) return "near_stadium";
  if (lat > 52.4 && lat < 52.5) return "suburban";
  return "default";
}

function mockDemographics(profile: AreaProfile): Demographics {
  const base = {
    averageAge: 34,
    householdTypes: [
      { type: "Single", percent: 28 },
      { type: "Couple", percent: 42 },
      { type: "Family", percent: 22 },
      { type: "Shared", percent: 8 },
    ],
    incomeBands: [
      { band: "Under £25k", percent: 18 },
      { band: "£25k–£40k", percent: 32 },
      { band: "£40k–£60k", percent: 28 },
      { band: "£60k+", percent: 22 },
    ],
    renterVsOwnerRatio: 0.42,
  };
  if (profile === "city_centre") {
    return { ...base, averageAge: 31, renterVsOwnerRatio: 0.58 };
  }
  if (profile === "suburban") {
    return { ...base, averageAge: 38, renterVsOwnerRatio: 0.28 };
  }
  return base;
}

function mockAmenities(profile: AreaProfile): AmenitiesCount {
  const base = {
    bars: 24,
    restaurants: 67,
    cafes: 41,
    supermarkets: 8,
    gyms: 6,
    takeaways: 32,
    parks: 4,
    schools: 6,
  };
  if (profile === "city_centre") {
    return {
      bars: 48,
      restaurants: 120,
      cafes: 65,
      supermarkets: 12,
      gyms: 14,
      takeaways: 55,
      parks: 3,
      schools: 4,
    };
  }
  if (profile === "suburban") {
    return {
      bars: 8,
      restaurants: 22,
      cafes: 15,
      supermarkets: 6,
      gyms: 3,
      takeaways: 18,
      parks: 7,
      schools: 12,
    };
  }
  if (profile === "near_stadium") {
    return {
      ...base,
      bars: 36,
      restaurants: 85,
      cafes: 52,
      gyms: 10,
    };
  }
  return base;
}

function mockSportsVenues(profile: AreaProfile): SportsVenues {
  const base: SportsVenues = {
    count: 4,
    nearest: { name: "Local Leisure Centre", type: "leisure_centre", distanceMetres: 800, walkMinutes: 10 },
    breakdown: [
      { type: "Leisure centres", count: 1 },
      { type: "Gyms", count: 2 },
      { type: "Sports grounds", count: 1 },
    ],
  };
  if (profile === "near_stadium") {
    return {
      count: 8,
      nearest: { name: "City Stadium", type: "stadium", distanceMetres: 600, walkMinutes: 8 },
      breakdown: [
        { type: "Stadiums", count: 1 },
        { type: "Leisure centres", count: 2 },
        { type: "Gyms", count: 4 },
        { type: "Golf courses", count: 1 },
      ],
    };
  }
  if (profile === "city_centre") {
    return {
      count: 12,
      nearest: { name: "City Gym", type: "gym", distanceMetres: 200, walkMinutes: 3 },
      breakdown: [
        { type: "Gyms", count: 6 },
        { type: "Leisure centres", count: 2 },
        { type: "Sports grounds", count: 4 },
      ],
    };
  }
  return base;
}

function mockEventVenues(profile: AreaProfile): EventVenues {
  const base: EventVenues = {
    count: 3,
    nearest: { name: "Community Hall", type: "theatre", distanceMetres: 1200, walkMinutes: 15 },
    breakdown: [
      { type: "Theatres", count: 1 },
      { type: "Music venues", count: 1 },
      { type: "Exhibition spaces", count: 1 },
    ],
  };
  if (profile === "city_centre") {
    return {
      count: 18,
      nearest: { name: "Central Arena", type: "arena", distanceMetres: 400, walkMinutes: 5 },
      breakdown: [
        { type: "Theatres", count: 5 },
        { type: "Music venues", count: 6 },
        { type: "Arenas", count: 2 },
        { type: "Exhibition centres", count: 5 },
      ],
    };
  }
  if (profile === "near_stadium") {
    return {
      count: 8,
      nearest: { name: "Event Arena", type: "arena", distanceMetres: 500, walkMinutes: 6 },
      breakdown: [
        { type: "Arenas", count: 2 },
        { type: "Theatres", count: 2 },
        { type: "Music venues", count: 4 },
      ],
    };
  }
  return base;
}

function mockEventActivityLevel(profile: AreaProfile): EventActivityLevel {
  if (profile === "city_centre" || profile === "near_stadium") return "high";
  if (profile === "suburban") return "low";
  return "moderate";
}

function mockLocalHighlights(profile: AreaProfile, amenities: AmenitiesCount): LocalHighlights {
  const base = {
    foodAndDrink: {
      name: "Food & drink",
      count: amenities.bars + amenities.restaurants + amenities.cafes,
      summary: "Mix of independent and chain options",
      examples: ["Local favourites", "Brunch spots", "Evening dining"],
    },
    thingsToDo: {
      name: "Things to do",
      count: (amenities.parks ?? 0) + (amenities.gyms ?? 0) + 5,
      summary: "Variety of local activities",
      examples: ["Parks", "Fitness", "Local events"],
    },
    entertainment: {
      name: "Entertainment",
      count: amenities.bars + 3,
      summary: "Evening options available",
      examples: ["Bars", "Live music"],
    },
    outdoorSpaces: {
      name: "Outdoor spaces",
      count: amenities.parks ?? 4,
      summary: "Access to green space",
      examples: ["Parks", "Walking routes"],
    },
  };
  if (profile === "city_centre") {
    return {
      foodAndDrink: {
        name: "Food & drink",
        count: amenities.bars + amenities.restaurants + amenities.cafes,
        summary: "Strong local food scene with high density of independent restaurants and cafés.",
        examples: ["Independent restaurants", "Speciality coffee", "Rooftop bars", "Street food"],
      },
      thingsToDo: {
        name: "Things to do",
        count: 45,
        summary: "Wide range of cultural and leisure activities.",
        examples: ["Galleries", "Museums", "Fitness studios", "Markets"],
      },
      entertainment: {
        name: "Entertainment",
        count: 28,
        summary: "Vibrant nightlife and event scene.",
        examples: ["Live music", "Theatre", "Comedy clubs", "Cinemas"],
      },
      outdoorSpaces: {
        name: "Outdoor spaces",
        count: amenities.parks ?? 3,
        summary: "Some green space, more urban parks.",
        examples: ["City parks", "Riverside walks"],
      },
    };
  }
  if (profile === "suburban") {
    return {
      foodAndDrink: {
        ...base.foodAndDrink,
        summary: "Essential dining options, fewer specialist venues.",
        examples: ["Pubs", "Cafés", "Takeaways"],
      },
      thingsToDo: {
        ...base.thingsToDo,
        summary: "Quiet residential area with good access to green space.",
        examples: ["Parks", "Schools", "Community centres"],
      },
      entertainment: {
        ...base.entertainment,
        summary: "Limited nightlife, quieter evenings.",
        examples: ["Local pub", "Community events"],
      },
      outdoorSpaces: {
        ...base.outdoorSpaces,
        summary: "Strong access to parks and outdoor recreation.",
        examples: ["Parks", "Playing fields", "Walking trails"],
      },
    };
  }
  return base;
}

function mockAreaScores(amenities: AmenitiesCount, eventLevel: EventActivityLevel): AreaScores {
  const lifestyle = Math.min(
    10,
    Math.round((amenities.bars + amenities.restaurants + amenities.cafes) / 12)
  );
  const convenience = Math.min(
    10,
    Math.round(((amenities.supermarkets ?? 0) * 2 + (amenities.gyms ?? 0)) / 3)
  );
  const quietness = Math.max(1, 10 - lifestyle - (eventLevel === "high" ? 2 : eventLevel === "moderate" ? 1 : 0));
  return {
    lifestyle,
    convenience,
    quietness: Math.max(1, Math.min(10, quietness)),
  };
}

function generateAreaSummary(
  profile: AreaProfile,
  scores: AreaScores,
  eventLevel: EventActivityLevel,
  amenities: AmenitiesCount
): string {
  if (profile === "city_centre") {
    return "Lively and well-connected area with strong food and nightlife options, balanced by good transport access.";
  }
  if (profile === "suburban") {
    return "Quiet residential pocket with limited nightlife but good access to green space and essential amenities.";
  }
  if (profile === "near_stadium") {
    return "Close to major event venues – potential for noise on match days, but strong for lifestyle and access.";
  }
  const parts: string[] = [];
  if (scores.lifestyle >= 7) parts.push("Strong food and café scene");
  if (scores.convenience >= 7) parts.push("good transport and shops");
  if (scores.quietness >= 7) parts.push("relatively quiet");
  if (eventLevel === "high") parts.push("Active event and venue scene");
  if (parts.length === 0) return "Balanced area with essential amenities and moderate local activity.";
  return parts.join(", ") + ".";
}

export function getMockAreaIntelligence(location?: GeoLocation, transport?: TransportInfo): AreaData {
  const profile = inferProfile(location);
  const demographics = mockDemographics(profile);
  const amenities = mockAmenities(profile);
  const sportsVenues = mockSportsVenues(profile);
  const eventVenues = mockEventVenues(profile);
  const eventActivityLevel = mockEventActivityLevel(profile);
  const scores = mockAreaScores(amenities, eventActivityLevel);
  const localHighlights = mockLocalHighlights(profile, amenities);
  const areaSummary = generateAreaSummary(profile, scores, eventActivityLevel, amenities);

  const transportSummary: TransportSummary | undefined = transport
    ? {
        nearestBusMinutes: transport.nearestBus?.walkMinutes,
        nearestTrainMinutes: transport.nearestTrain?.walkMinutes,
        nearestTramMinutes: transport.nearestTram?.walkMinutes,
        summary:
          [transport.nearestBus, transport.nearestTrain, transport.nearestTram]
            .filter(Boolean)
            .map((t) => `${t?.walkMinutes} min to ${t?.name}`)
            .join("; ") || "Transport data not available",
      }
    : undefined;

  return {
    demographics,
    amenities,
    scores,
    sportsVenues,
    eventVenues,
    eventActivityLevel,
    localHighlights,
    transportSummary,
    areaSummary,
  };
}

export function getMockPriceTrend(basePrice: number, _location?: GeoLocation): { month: string; price: number }[] {
  const months: string[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return months.map((m, i) => {
    const variation = 0.98 + i * 0.008 + (Math.random() - 0.5) * 0.04;
    return { month: m, price: Math.round(basePrice * variation) };
  });
}

export function getMockDistribution(basePrice: number): { band: string; min: number; max: number; count: number }[] {
  const bands = [
    { band: "£0–£200k", min: 0, max: 200_000 },
    { band: "£200k–£300k", min: 200_000, max: 300_000 },
    { band: "£300k–£400k", min: 300_000, max: 400_000 },
    { band: "£400k–£500k", min: 400_000, max: 500_000 },
    { band: "£500k+", min: 500_000, max: 2_000_000 },
  ];
  const priceType = basePrice > 5000 ? "buy" : "rent";
  if (priceType === "rent") {
    return [
      { band: "£800–£1k", min: 800, max: 1000, count: 4 },
      { band: "£1k–£1.5k", min: 1000, max: 1500, count: 12 },
      { band: "£1.5k–£2k", min: 1500, max: 2000, count: 18 },
      { band: "£2k–£3k", min: 2000, max: 3000, count: 14 },
      { band: "£3k+", min: 3000, max: 10000, count: 6 },
    ];
  }
  return bands.map((b, i) => ({
    ...b,
    count: Math.round(
      20 +
        (basePrice >= b.min && basePrice < b.max ? 15 : 0) +
        (5 - Math.abs(i - 2)) * 3 +
        (Math.random() - 0.5) * 6
    ),
  }));
}
