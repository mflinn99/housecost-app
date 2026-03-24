# Mattsnoop Engine Notes

## Overview

Mattsnoop engines are pure, typed, testable logic modules. No UI dependency.

## Modules

### 1. Property Model (`types/property.ts`)
- **Property**: Canonical model with id, title, address, coordinates, mode, price, bedrooms, transport, area, etc.
- **validateProperty()**: Returns { valid, errors, warnings }
- **isPropertyLike()**: Type guard for partial validation

### 2. Financial Engine (`features/calculator/engine`)
- **rentCostEngine**: Rent + council tax + utilities + insurance → total monthly
- **mortgageEngine**: Loan amount, rate, term → monthly payment (repayment or interest-only)
- **totalCostEngine**: Combines into final monthly (rent or buy)

### 3. Area Engine (`features/area/engine`)
- **scoreAmenities()**: 0–10 from bars, restaurants, cafes, supermarkets, gyms
- **scoreTransport()**: 0–10 from nearest bus/train/tram walk minutes
- **scoreDensity()**: 0–10 from amenity + venue density
- **scoreEventActivity()**: 0–10 from event level, sports/event venues
- **computeAreaProfile()**: Full profile (lifestyle, convenience, quietness)

### 4. Vibe Score Engine (`features/vibe-score/engine`)
- **calculateVibeScore(areaProfile, parking)**: 0–100 composite + label + explanation
- Uses AreaProfile from area engine

### 5. Negotiation Engine (`features/negotiation/engine`)
- **calculateNegotiationScore(input)**: Discount likelihood (low/medium/high) + % range + explanation
- Inputs: daysOnMarket, priceReduced, priceValue, averageComparablePrice, reducedFrequency

### 6. Comparables Engine (`features/comparables/engine`)
- **filterSimilar()**: Filter by intent, bedrooms, propertyType, price range
- **calculateAveragePrice()**, **calculateMedianPrice()**
- **identifyOutliers()**: IQR-based
- **detectTrend()**: up/down/stable from price series
- **computeComparableSummary()**: Full summary

### 7. Data Normalisation (`services/data`)
- **normalizeToProperty(raw)**: Raw API data → Property
- **normalizeToPropertyListing(raw)**: Raw → PropertyListing
- **validateAndNormalize(raw)**: Validate + normalise
- **normalizeArea(raw)**: Raw area → AreaEngineInput

## Integration

- **lib/calculations/negotiation-score**: Re-exports from negotiation engine
- **CalculatorPanel**: Uses lib/calculations (rent-breakdown, buy-breakdown, mortgage)
- **VibeScoreCard**: Uses features/vibe-score/vibe-engine (original; area engine can feed it via computeAreaProfile)

## Tests

Each engine has `*.test.ts`:
- `types/property.test.ts`
- `features/calculator/engine/*.test.ts`
- `features/area/engine/areaEngine.test.ts`
- `features/vibe-score/engine/vibeEngine.test.ts`
- `features/negotiation/engine/negotiationEngine.test.ts`
- `features/comparables/engine/comparablesEngine.test.ts`
- `services/data/normalizeProperty.test.ts`

Run: `npm run test:run` (note: Node 20.19+ recommended; older Node may fail on rolldown/styleText)

## Future

- Wire CalculatorPanel to use features/calculator/engine directly
- Wire VibeScoreCard to use area engine → vibe engine pipeline
- Add real API adapters that use normalizeProperty / normalizeArea
