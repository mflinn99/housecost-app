# Mattsnoop — Provider Notes

## Current State

All data is provided by mock implementations. No live APIs are wired.

## Future Integrations

### Property Listings

**Interface**: `services/providers/property-listings.interface.ts` — `IPropertyListingsProvider`

**Current**: `MockListingsProvider` in `services/providers/mock-listings.ts`

**To integrate**:
1. Implement `IPropertyListingsProvider` for your API
2. Replace provider in `app/search/actions.ts`, `app/property/[id]/actions.ts`, `features/compare/components/actions.ts`
3. Use `services/data/normalizeProperty` to normalise API responses to `PropertyListing`

**Required methods**: `search(query, filters)` → `ListingsSearchResult`, `getById(id)` → `PropertyListing | null`

### Geocoding

**Current**: `services/mockGeo.ts` — `getCentreForQuery(query)` returns fixed coordinates

**To integrate**: Replace with geocoding API (e.g. Google Geocoding, Mapbox, OpenStreetMap Nominatim)
- Input: location string
- Output: `{ lat, lng }`

**Where used**: `app/search/nearby/actions.ts` — `getCentreForQuery`

### Area Intelligence

**Current**: `services/providers/mock-area.ts` — `getMockAreaIntelligence(location, transport)`

**Interface**: Returns `AreaData` (demographics, amenities, scores, venues, etc.)

**To integrate**: Replace with area data API; feed into `features/area/engine` for scoring

### Map Tiles

**Current**: OpenStreetMap tiles (no API key)

**Alternative**: Mapbox, Google Maps — requires API key and config in map components

## Data Normalisation

Before feeding external data into engines:
- Use `normalizeToProperty()` or `normalizeToPropertyListing()` from `services/data`
- Use `normalizeArea()` for area data
- Validate with `validateProperty()` if needed
