# Mattsnoop — Known Limitations

## Data & Providers

- **All property data is mocked** — 12 properties in `services/providers/mock-listings.ts`
- **No real API** — search, nearby, and property detail use mock data only
- **Geocoding is mocked** — `services/mockGeo.ts` maps location strings to fixed coordinates
- **Area intelligence is mocked** — `services/providers/mock-area.ts` returns synthetic area data

## Testing

- **Vitest fails on Node < 20.19** — `rolldown`/`styleText` compatibility; run with Node 20.19+ or 22+
- Test files exist and are written; they pass when run on compatible Node

## UI

- **Images use `<img>`** — Next.js recommends `<Image />` for optimisation; not yet migrated
- **Close by map** — London area has 5 rent + 2 buy properties within 2km; other cities may have fewer

## Technical Debt

- Some ESLint warnings remain (img-element, exhaustive-deps)
- `react-hooks/set-state-in-effect` disabled; sync-with-props patterns used intentionally
- mock-listings is canonical; SearchForm/SearchBar removed (SearchControls in use)

## Incomplete Features

- Real property API integration
- Real geocoding
- Advanced charts (pie, cost over time) removed from calculator scaffold
- Local market summary on property detail
