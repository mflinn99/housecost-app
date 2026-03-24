import type { PropertyListing, PropertyType } from "@/types";

type ValueLabel = "above market" | "in line" | "below market";

interface ListingSample {
  id: string;
  title: string;
  address: string;
  postcode: string;
  price: number;
  bedrooms: number;
  propertyType: PropertyType;
  daysOnMarket: number;
  sourceUrl: string;
  source: string;
  lat: number;
  lng: number;
}

interface LandRegistrySaleSample {
  postcode: string;
  soldPrice: number;
  soldDate: string;
}

export interface PostcodeMarketSnapshot {
  postcodeArea: string;
  averageSoldPrice: number;
  averageListingPrice: number;
  priceDifferencePercent: number;
  soldCount: number;
  listingCount: number;
}

const LISTING_SAMPLES: ListingSample[] = [
  {
    id: "m1-101",
    title: "2 Bed Apartment",
    address: "19 Whitworth Street, Manchester, M1 3BW",
    postcode: "M1 3BW",
    price: 265000,
    bedrooms: 2,
    propertyType: "flat",
    daysOnMarket: 24,
    sourceUrl: "https://www.rightmove.co.uk/properties/m1-101",
    source: "Rightmove",
    lat: 53.4774,
    lng: -2.2342,
  },
  {
    id: "m3-102",
    title: "3 Bed Townhouse",
    address: "5 Kempster Gardens, Manchester, M3 7NW",
    postcode: "M3 7NW",
    price: 345000,
    bedrooms: 3,
    propertyType: "terraced",
    daysOnMarket: 37,
    sourceUrl: "https://www.rightmove.co.uk/properties/m3-102",
    source: "Rightmove",
    lat: 53.4879,
    lng: -2.2527,
  },
  {
    id: "m4-103",
    title: "1 Bed Loft Flat",
    address: "22 Cable Street, Manchester, M4 5EG",
    postcode: "M4 5EG",
    price: 228000,
    bedrooms: 1,
    propertyType: "flat",
    daysOnMarket: 16,
    sourceUrl: "https://www.zoopla.co.uk/for-sale/details/m4-103",
    source: "Zoopla",
    lat: 53.4849,
    lng: -2.2272,
  },
  {
    id: "m5-104",
    title: "2 Bed Riverside Flat",
    address: "11 Clippers Quay, Salford, M5 3TE",
    postcode: "M5 3TE",
    price: 258000,
    bedrooms: 2,
    propertyType: "flat",
    daysOnMarket: 29,
    sourceUrl: "https://www.rightmove.co.uk/properties/m5-104",
    source: "Rightmove",
    lat: 53.4724,
    lng: -2.2838,
  },
  {
    id: "m6-105",
    title: "3 Bed Semi-Detached",
    address: "48 Monton Road, Salford, M6 6FY",
    postcode: "M6 6FY",
    price: 312000,
    bedrooms: 3,
    propertyType: "semi-detached",
    daysOnMarket: 34,
    sourceUrl: "https://www.zoopla.co.uk/for-sale/details/m6-105",
    source: "Zoopla",
    lat: 53.4903,
    lng: -2.3007,
  },
  {
    id: "m7-106",
    title: "2 Bed Victorian Terrace",
    address: "7 Barton Lane, Salford, M7 4RA",
    postcode: "M7 4RA",
    price: 274000,
    bedrooms: 2,
    propertyType: "terraced",
    daysOnMarket: 19,
    sourceUrl: "https://www.rightmove.co.uk/properties/m7-106",
    source: "Rightmove",
    lat: 53.5091,
    lng: -2.2625,
  },
  {
    id: "m50-107",
    title: "2 Bed New-Build Apartment",
    address: "3 Dock Office Row, Salford, M50 3UB",
    postcode: "M50 3UB",
    price: 291000,
    bedrooms: 2,
    propertyType: "flat",
    daysOnMarket: 41,
    sourceUrl: "https://www.zoopla.co.uk/for-sale/details/m50-107",
    source: "Zoopla",
    lat: 53.4718,
    lng: -2.2958,
  },
  {
    id: "m3-108",
    title: "2 Bed City Centre Flat",
    address: "14 Deansgate Square, Manchester, M3 4LY",
    postcode: "M3 4LY",
    price: 359000,
    bedrooms: 2,
    propertyType: "flat",
    daysOnMarket: 27,
    sourceUrl: "https://www.rightmove.co.uk/properties/m3-108",
    source: "Rightmove",
    lat: 53.4758,
    lng: -2.2504,
  },
];

const LAND_REGISTRY_SALES: LandRegistrySaleSample[] = [
  { postcode: "M1 3BW", soldPrice: 252000, soldDate: "2025-12-12" },
  { postcode: "M1 2BQ", soldPrice: 247500, soldDate: "2025-10-04" },
  { postcode: "M3 7NW", soldPrice: 334000, soldDate: "2025-11-19" },
  { postcode: "M3 4LY", soldPrice: 341500, soldDate: "2025-09-28" },
  { postcode: "M4 5EG", soldPrice: 219000, soldDate: "2025-12-01" },
  { postcode: "M4 4DZ", soldPrice: 223000, soldDate: "2025-08-16" },
  { postcode: "M5 3TE", soldPrice: 249000, soldDate: "2025-10-30" },
  { postcode: "M5 3LF", soldPrice: 255500, soldDate: "2025-07-11" },
  { postcode: "M6 6FY", soldPrice: 304000, soldDate: "2025-11-06" },
  { postcode: "M6 5RW", soldPrice: 297500, soldDate: "2025-09-02" },
  { postcode: "M7 4RA", soldPrice: 266000, soldDate: "2025-12-07" },
  { postcode: "M7 3NN", soldPrice: 259500, soldDate: "2025-08-22" },
  { postcode: "M50 3UB", soldPrice: 278000, soldDate: "2025-10-15" },
  { postcode: "M50 2ZF", soldPrice: 284500, soldDate: "2025-07-24" },
];

function getPostcodeArea(postcode: string): string {
  return postcode.trim().toUpperCase().split(" ")[0] ?? "";
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function toPropertyListing(sample: ListingSample): PropertyListing {
  return {
    id: sample.id,
    sourceUrl: sample.sourceUrl,
    source: `${sample.source} (Manchester demo)`,
    lastRefreshed: new Date().toISOString(),
    title: sample.title,
    address: sample.address,
    displayPrice: `£${sample.price.toLocaleString()}`,
    priceValue: sample.price,
    priceType: "total",
    bedrooms: sample.bedrooms,
    propertyType: sample.propertyType,
    listedDate: "2026-02-01",
    daysOnMarket: sample.daysOnMarket,
    location: { lat: sample.lat, lng: sample.lng },
    postcode: sample.postcode,
    postcodeArea: getPostcodeArea(sample.postcode),
  };
}

export function getManchesterDemoListings(): PropertyListing[] {
  return LISTING_SAMPLES.map(toPropertyListing);
}

export function getManchesterPostcodeMarket(): PostcodeMarketSnapshot[] {
  const listingsByArea = new Map<string, number[]>();
  const soldByArea = new Map<string, number[]>();

  for (const listing of LISTING_SAMPLES) {
    const area = getPostcodeArea(listing.postcode);
    listingsByArea.set(area, [...(listingsByArea.get(area) ?? []), listing.price]);
  }

  for (const sale of LAND_REGISTRY_SALES) {
    const area = getPostcodeArea(sale.postcode);
    soldByArea.set(area, [...(soldByArea.get(area) ?? []), sale.soldPrice]);
  }

  const postcodeAreas = Array.from(new Set([...listingsByArea.keys(), ...soldByArea.keys()]));

  return postcodeAreas
    .map((postcodeArea) => {
      const listingPrices = listingsByArea.get(postcodeArea) ?? [];
      const soldPrices = soldByArea.get(postcodeArea) ?? [];
      const averageListingPrice = average(listingPrices);
      const averageSoldPrice = average(soldPrices);
      const priceDifferencePercent =
        averageSoldPrice > 0 ? ((averageListingPrice - averageSoldPrice) / averageSoldPrice) * 100 : 0;

      return {
        postcodeArea,
        averageSoldPrice: Math.round(averageSoldPrice),
        averageListingPrice: Math.round(averageListingPrice),
        priceDifferencePercent: Number(priceDifferencePercent.toFixed(1)),
        soldCount: soldPrices.length,
        listingCount: listingPrices.length,
      };
    })
    .sort((a, b) => a.postcodeArea.localeCompare(b.postcodeArea));
}

export function getManchesterMarketSnapshot(): {
  averageSoldPrice: number;
  averageListingPrice: number;
  differencePercent: number;
} {
  const marketByArea = getManchesterPostcodeMarket();
  const avgSold = Math.round(average(marketByArea.map((item) => item.averageSoldPrice)));
  const avgListing = Math.round(average(marketByArea.map((item) => item.averageListingPrice)));
  const differencePercent = avgSold > 0 ? Number((((avgListing - avgSold) / avgSold) * 100).toFixed(1)) : 0;

  return {
    averageSoldPrice: avgSold,
    averageListingPrice: avgListing,
    differencePercent,
  };
}

export function withManchesterValueSignals(listings: PropertyListing[]): PropertyListing[] {
  const marketByArea = new Map(
    getManchesterPostcodeMarket().map((entry) => [entry.postcodeArea, entry.averageSoldPrice])
  );

  return listings.map((listing) => {
    const postcodeArea = listing.postcodeArea ?? (listing.postcode ? getPostcodeArea(listing.postcode) : undefined);
    const soldAverage = postcodeArea ? marketByArea.get(postcodeArea) : undefined;

    if (!postcodeArea || !soldAverage) return listing;

    const percentDiff = Number((((listing.priceValue - soldAverage) / soldAverage) * 100).toFixed(1));
    let label: ValueLabel = "in line";

    if (percentDiff > 5) {
      label = "above market";
    } else if (percentDiff < -5) {
      label = "below market";
    }

    return {
      ...listing,
      postcodeArea,
      marketValueDiffPercent: percentDiff,
      marketValueLabel: label,
      localAverageSoldPrice: soldAverage,
    };
  });
}
