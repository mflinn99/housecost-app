/**
 * HouseCost Core Type Definitions
 * Central type definitions for property listings, search, calculations, and UI state.
 */

// =============================================================================
// ENUMS & CONSTANTS
// =============================================================================

export type SearchIntent = "rent" | "buy";

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

export type DiscountLikelihood = "low" | "medium" | "high";

export type FurnishingStatus = "furnished" | "unfurnished" | "part_furnished" | "unknown";

export type Tenure = "freehold" | "leasehold" | "unknown";

// =============================================================================
// SEARCH & FILTERS
// =============================================================================

export interface SearchQuery {
  /** Postcode prefix (e.g. SW1, M1), town/city, or street name */
  query: string;
  intent: SearchIntent;
  /** Search type inferred or specified */
  queryType?: "postcode" | "town" | "street";
}

export interface ListingFilters {
  minBudget?: number;
  maxBudget?: number;
  bedrooms?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  propertyTypes?: PropertyType[];
  radiusMiles?: number;
  parkingRequired?: boolean;
  furnished?: FurnishingStatus;
  tenure?: Tenure;
}

// =============================================================================
// PROPERTY LISTING
// =============================================================================

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface TransportDistance {
  /** Walking distance in metres */
  distanceMetres: number;
  /** Estimated walking time in minutes */
  walkMinutes: number;
  /** Stop/station name */
  name: string;
}

export interface TransportInfo {
  nearestBus?: TransportDistance;
  nearestTram?: TransportDistance;
  nearestTrain?: TransportDistance;
}

export interface PropertyListing {
  id: string;
  /** External source URL */
  sourceUrl: string;
  /** Provider identifier (e.g. "rightmove", "zoopla") */
  source: string;
  /** When we last refreshed this listing */
  lastRefreshed: string; // ISO date

  // Core details
  title: string;
  address: string;
  displayPrice: string;
  /** Raw numeric price (pcm for rent, total for buy) */
  priceValue: number;
  /** pcm for rent, total for buy */
  priceType: "pcm" | "total";

  // Property attributes
  bedrooms?: number;
  bathrooms?: number;
  receptions?: number;
  propertyType?: PropertyType;
  tenure?: Tenure;
  furnished?: FurnishingStatus;

  // Images
  mainImageUrl?: string;
  imageUrls?: string[];

  // Market signals
  listedDate?: string; // ISO date
  daysOnMarket?: number;
  priceReduced?: boolean;
  previousPrice?: number;
  /** Reduced price date if applicable */
  priceReducedDate?: string;

  // Location & transport
  location?: GeoLocation;
  postcode?: string;
  postcodeArea?: string;
  transport?: TransportInfo;
  parking?: ParkingType;

  // Market value signal (local sold prices vs listing price)
  marketValueDiffPercent?: number;
  marketValueLabel?: "above market" | "in line" | "below market";
  localAverageSoldPrice?: number;

  // Extra
  description?: string;
  serviceCharge?: number; // monthly
  groundRent?: number; // yearly
  councilTaxBand?: string;
}

// =============================================================================
// CALCULATOR ASSUMPTIONS
// =============================================================================

export interface RentAssumptions {
  monthlyRent: number;
  /** Or derived from depositWeeks */
  depositAmount?: number;
  depositWeeks?: number;
  tenancyLengthMonths?: number;
  councilTaxBand?: string;
  councilTaxMonthly?: number;
  /** Manual override for council tax */
  councilTaxOverride?: boolean;
}

export interface BuyAssumptions {
  /** Listing price or manual offer */
  purchasePrice: number;
  depositAmount?: number;
  depositPercent?: number;
  mortgageTermYears: number;
  interestRatePercent: number;
  /** "repayment" | "interest_only" */
  mortgageType: "repayment" | "interest_only";
  /** For stamp duty: first_time_buyer | mover | investor */
  buyerStatus?: "first_time_buyer" | "mover" | "investor";
}

// =============================================================================
// COST BREAKDOWNS
// =============================================================================

export interface RentCostBreakdown {
  monthlyRent: number;
  deposit: number;
  depositWeeks: number;
  serviceCharge: number;
  groundRent: number;
  councilTax: number;
  utilities: UtilitiesEstimate;
  contentsInsurance: number;
  parkingCost: number;
  totalMonthly: number;
  assumptions: RentAssumptions;
}

export interface UtilitiesEstimate {
  electricity: number;
  gas: number;
  water: number;
  broadband: number;
  councilTax: number;
  tvLicence?: number;
  total: number;
}

export interface BuyCostBreakdown {
  deposit: number;
  loanAmount: number;
  monthlyMortgage: number;
  serviceCharge: number;
  groundRent: number;
  councilTax: number;
  utilities: UtilitiesEstimate;
  insurance: number; // contents + buildings
  totalMonthly: number;
  /** One-off costs */
  upfront: BuyUpfrontCosts;
  assumptions: BuyAssumptions;
}

export interface BuyUpfrontCosts {
  stampDuty: number;
  legalFees: number;
  survey: number;
  mortgageFees: number;
  movingCost: number;
  total: number;
}

// =============================================================================
// LOCAL MARKET / COMPARABLES
// =============================================================================

export interface ComparableSummary {
  /** Similar properties in last 6 months */
  similarCount: number;
  averagePrice: number;
  averageRent?: number;
  priceTrend: "up" | "down" | "stable";
  reducedPriceFrequency?: number; // % of listings that were reduced
  avgDaysOnMarket?: number;
  valueBand?: { min: number; max: number };
  /** Count of sold/let comparables if available */
  comparableSoldLet?: number;
}

// =============================================================================
// NEGOTIATION SIGNAL
// =============================================================================

export interface NegotiationSignal {
  likelihood: DiscountLikelihood;
  /** Min–max potential discount range (e.g. 2–5%) */
  potentialRangePercent?: { min: number; max: number };
  /** Reason summary */
  reasoning: string;
  /** Supporting signals used */
  signals: string[];
}

// =============================================================================
// SAVED STATE (Local storage, future auth)
// =============================================================================

export interface SavedSearch {
  id: string;
  query: string;
  intent: SearchIntent;
  filters: ListingFilters;
  createdAt: string;
}

export interface SavedAssumptions {
  id: string;
  rentAssumptions?: RentAssumptions;
  buyAssumptions?: BuyAssumptions;
  utilitiesEstimate?: Partial<UtilitiesEstimate>;
  createdAt: string;
}

export interface BookmarkedProperty {
  id: string;
  listingId: string;
  listing: PropertyListing;
  notes?: string;
  addedAt: string;
}

// =============================================================================
// AREA INTELLIGENCE
// =============================================================================

export interface Demographics {
  averageAge: number;
  householdTypes: { type: string; percent: number }[];
  incomeBands: { band: string; percent: number }[];
  renterVsOwnerRatio: number; // e.g. 0.4 = 40% renters
}

export interface AmenitiesCount {
  bars: number;
  restaurants: number;
  cafes: number;
  supermarkets: number;
  gyms: number;
  takeaways?: number;
  parks?: number;
  schools?: number;
}

export type EventActivityLevel = "low" | "moderate" | "high";

export interface VenueProximity {
  name: string;
  type: string;
  distanceMetres: number;
  walkMinutes: number;
}

export interface SportsVenues {
  count: number;
  nearest?: VenueProximity;
  /** stadiums, sports grounds, leisure centres, golf courses */
  breakdown?: { type: string; count: number }[];
}

export interface EventVenues {
  count: number;
  nearest?: VenueProximity;
  /** theatres, arenas, music venues, exhibition centres */
  breakdown?: { type: string; count: number }[];
}

export interface LocalHighlightCategory {
  name: string;
  count: number;
  summary?: string;
  examples?: string[];
}

export interface LocalHighlights {
  foodAndDrink?: LocalHighlightCategory;
  thingsToDo?: LocalHighlightCategory;
  entertainment?: LocalHighlightCategory;
  outdoorSpaces?: LocalHighlightCategory;
}

export interface TransportSummary {
  nearestBusMinutes?: number;
  nearestTrainMinutes?: number;
  nearestTramMinutes?: number;
  /** Short descriptor */
  summary?: string;
}

export interface AreaScores {
  lifestyle: number;
  convenience: number;
  quietness: number;
}

/** Full area data - expanded intelligence */
export interface AreaData {
  demographics: Demographics;
  amenities: AmenitiesCount;
  scores: AreaScores;
  sportsVenues?: SportsVenues;
  eventVenues?: EventVenues;
  eventActivityLevel?: EventActivityLevel;
  localHighlights?: LocalHighlights;
  transportSummary?: TransportSummary;
  areaSummary?: string;
}

/** Alias for backward compatibility */
export type AreaIntelligence = AreaData;

// =============================================================================
// PRICE TREND (for charts)
// =============================================================================

export interface PriceTrendPoint {
  month: string; // e.g. "2025-01"
  price: number;
  count?: number;
}

export interface ComparableDistribution {
  band: string; // e.g. "£200k–£250k"
  min: number;
  max: number;
  count: number;
}

// =============================================================================
// SELLER MARKETPLACE (Anonymous, Intelligence-led)
// =============================================================================

export type SellerTimeline = "asap" | "3_months" | "exploring";
export type SellerImportance = "price" | "speed" | "service";

export interface PrivateSaleBrief {
  id: string;
  postcode: string;
  propertyType: string;
  bedrooms: number;
  valueRangeMin: number;
  valueRangeMax: number;
  timeline: SellerTimeline;
  alreadyListed: boolean;
  preferredModel?: string;
  importanceOrder: SellerImportance[];
  fullyAnonymous: boolean;
  exactAddressHidden: boolean;
  identityHidden: boolean;
  createdAt: string;
}
