# Mattsnoop Handover

## Summary

Mattsnoop is now configured as a Manchester/Salford local intelligence demo. The app is stable and data-driven for M-postcode districts only, with listing-vs-sold value signals across homepage, search, and cards.

## Run

```bash
cd housecost
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
app/                  — Next.js app router
  page.tsx            — Homepage (SearchControls → /search)
  search/             — Search results
  property/[id]/       — Property detail
  saved/              — Saved searches & bookmarks
  compare/            — Compare properties
components/           — Logo, Header
features/             — search, listings, calculator, area, compare, saved
lib/                  — storage, calculations, utils
services/providers/   — mock-listings (canonical), mock-area
types/                — PropertyListing, SearchIntent, etc.
```

## Key flows

1. **Search**: Homepage → type location → Search → `/search?q=...&intent=rent|buy`
2. **Close by**: Search or Homepage → Close by → `/search?mode=nearby` — map + list, radius slider
3. **Results**: Filter by bedrooms, budget; click card → property detail
4. **Detail**: View breakdown, bookmark, compare; "See nearby homes" → nearby map
5. **Saved**: View bookmarks, run saved searches
6. **Compare**: Up to 5 properties; download PDF report

## Local data (Manchester/Salford only)

- `data/manchester-properties.ts` — 36 listing records across M1-M6
- `data/manchester-sales.ts` — 36 sold-price records by postcode district
- `lib/market/marketCalculations.ts` — sold/listing averages and per-property delta labels
- `services/providers/mock-listings.ts` consumes this dataset and enriches cards with value insights
- Search input is restricted to Manchester, Salford, and M postcodes

## Environment

No env vars required for mock mode.

## Final summary

- **Build**: ✓ Passes
- **Works**: Homepage snapshot, local search, results cards with value deltas, property detail, nearby mode, seller brief demo
- **Partially complete**: Tests (blocked on Node 20.19+)
- **Remains**: Optional real API integration, Node upgrade for tests
- **Backup**: `/Users/sourcingai/mattsnoop_backup_2026-03-21_2337.zip`

## Next steps

1. Upgrade Node to 20.19+ to run tests
2. Real API integration (see PROVIDER_NOTES.md)
3. Advanced charts
4. KNOWN_LIMITATIONS.md, TEST_STATUS.md for details
