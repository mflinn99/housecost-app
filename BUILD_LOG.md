# Mattsnoop Build Log

## Manchester/Salford Real Data Platform Sprint ✓

- **Phase 1 (data layer)**: Added `data/manchester-properties.ts` (36 local properties) and `data/manchester-sales.ts` (36 sold records), scoped to M1-M6 and Salford districts.
- **Phase 2 (market logic)**: Added `lib/market/marketCalculations.ts` with `getAverageSoldPrice`, `getAverageListingPrice`, `getPriceDelta`, and overall snapshot helper.
- **Phase 3 (UI integration)**: Homepage now shows **Manchester & Salford Market Snapshot** using real-like local aggregates; listing cards display postcode district + value delta labels.
- **Phase 4 (local search lock)**: Search actions now reject non-local queries; accepted inputs are Manchester, Salford, and `M` postcodes.
- **Phase 5 (nearby mode)**: Nearby uses local centres only (Manchester/Salford + M1-M6) and radius filtering remains 0.25-5km.
- **Phase 7 (seller light demo)**: Seller flow now shows a concise mock private brief example: "3-bed Salford, £240-260k, exploring sale".
- **Build**: ✓ `npm run build` passes after sprint integration.

---

## Manchester/Salford Real-Data Demo Slice ✓

- **Scope lock**: dataset narrowed to Manchester + Salford only (M postcodes)
- **Ingestion**: added local listing sample + Land Registry sold-price sample in `services/data/manchesterMarket.ts`
- **Normalisation**: canonical listing mapping + postcode area grouping (`M1`, `M3`, `M5`, etc.)
- **Calculations**: per-postcode averages for sold/listing prices + difference %, plus per-listing above/in-line/below signal
- **UI**: homepage now shows "Manchester Market Snapshot"; listing cards display value label + % vs local sold average
- **Provider**: `MockListingsProvider` now serves Manchester/Salford dataset only
- **Build**: ✓ `npm run build` passes (Next.js 16.2.1)

---

## Premium Intelligence UI Sprint ✓

- **Layout**: Left-aligned, max-w-2xl, stronger grid, tighter rhythm
- **Top section**: Mattsnoop + "Property cost and local market intelligence"
- **Lead insight**: Panel — "Observed price stability after recent reductions" + supporting line + source
- **Charts**: Thin lines, muted palette, minimal axes; support text not dominate
- **Search**: Restrained buttons (Search primary, Close by secondary); native buttons, less rounded
- **Data cards**: Metric + value + note (Average asking £302k, Median days 41, etc.)
- **Header/Logo**: Smaller, cleaner nav; logo 8x8
- **Typography**: 14px body; section labels uppercase tracking
- **Build**: ✓

---

## Chart Stability Fix ✓

- **Problem**: ResponsiveContainer width/height -1 warnings during SSG
- **Fix**: Use explicit pixel `height={N}` instead of `height="100%"` on ResponsiveContainer; parent div with `style={{ height: N }}`
- **Updated**: PriceTrendLineChart, ComparableBarChart, CostOverTimeChart, MonthlyCostPieChart, app/page.tsx inline charts
- **Pattern**: `<div style={{ height: N }}><ResponsiveContainer width="100%" height={N}>`
- **Build**: ✓ No chart warnings

---

## Inside Knowledge UI (Classy Intelligence Mode) ✓

- **A. Charts**: Thin lines, muted charcoal/grey, no grid, minimal axes
- **B. Density**: Tighter spacing, reduced padding
- **C. Layout**: Left-aligned, max-w-2xl, editorial
- **D. Primary insight first**: "Average prices have stabilised after 3 months of decline"
- **E. Text-first**: Statement then small chart per block
- **F. Language**: "Observed trend", "Current signal", "Recent activity"
- **G. Property cards**: Analyst style — price, days, interpretation
- **H. Buttons**: Smaller, less rounded, tool-like
- **I–J**: Charcoal/off-black base, smaller typography
- **Build**: ✓

---

## Data-First Landing Page (Intelligence UI) ✓

- **A. Market Snapshot**: UK Property Market Snapshot; 3 panels (price trend 6m, rent vs buy avg, days on market)
- **B. Search**: "Analyse a specific area"; embedded, secondary to data
- **C. Rent vs Buy chart**: Line chart (Example Area) — rent vs buy monthly over 5yr
- **D. Local signals**: 5 Bloomberg-style snippets
- **E. Activity density**: Listings, restaurants, transport hubs
- **F. Property preview**: Data-led cards (price, area, days, under/over market, diff %)
- **G–I**: Tighter layout, neutral + green/amber/red data colours, Analyse/Compare/Assess language
- **Build**: ✓ (recharts SSR warning during static gen; charts render client-side)

---

## Product Presence Sprint ✓

- **A. Hero**: "Know the real cost before you move"; subhead per spec
- **B. Search**: "Start your search" label; larger card, p-5/p-6
- **C. Live insights**: 4 mock cards with explanations (Priced 8% below, On market 42 days, etc.)
- **D. Value strip**: Real monthly cost, Spot bad deals, Compare nearby
- **E. Hierarchy**: Headline largest; reduced vertical space
- **F. Cards**: Good deal (green), Overpriced (muted red), High demand (amber); tighter padding
- **G. Trust**: "Based on local data · Updated in real time"
- **I. No blank screens**: "Try these areas" on empty search
- **Build**: ✓

---

## UI Upgrade Sprint (Product Polish) ✓

- **A. Hero**: Headline "Know the true cost before you move"; subhead; elevated search card
- **B. Search controls**: Segmented Rent/Buy toggle; better spacing; min-width buttons
- **C. Value strip**: 4 items (real cost, overpriced, nearby, AI insights) + trust line
- **D. Example properties**: 3 preview cards (Good value, Reduced, High demand)
- **E–J**: ListingCard hover lift, badges (New, Reduced, High demand); Button transition; trust signals in results
- **Build**: ✓

---

## Overnight Run — Phase 7: QA + Docs ✓

- Updated HANDOVER, KNOWN_LIMITATIONS, TEST_STATUS
- All 7 phases complete; build ✓; ready for backup

---

## Overnight Run — Phase 6: Save / Compare ✓

- **Bookmarks**: BOOKMARKS_UPDATE event; BookmarkButton listens for cross-component sync
- **Compare**: CompareButton, CompareClient, CompareTray listen for housecost-compare-update
- **Limit**: COMPARE_MAX=5 enforced; toast when at limit
- **Build**: ✓

---

## Overnight Run — Phase 5: Engine Integration ✓

- **Calculator**: rent/buy breakdown; fallback when price ≤ 0
- **NegotiationBadge**: fallback for unknown likelihood
- **VibeScoreCard**: via AreaIntelligence (getMockAreaIntelligence → vibe-engine)
- **Build**: ✓

---

## Overnight Run — Phase 4: Close By / Nearby ✓

- **Mode**: /search?mode=nearby — NearbySearchView, radius 0.25–5 km
- **Logic**: getCentreForQuery (mock geo), haversine filter, sort by distance
- **UI**: RadiusSlider, NearbyMap (Leaflet), NearbyListingsPanel; marker/list sync
- **Tests**: nearby.test.ts (distance filter, sort) — blocked on Node 20.19+
- **Build**: ✓

---

## Overnight Run — Phase 3: Property Detail Flow ✓

- **Route**: /property/[id] — getListingById, notFound() when null
- **Content**: Image, title/address, price, days on market, parking, transport, area intelligence, BookmarkButton, CompareButton, CalculatorPanel, NegotiationBadge
- **Links**: Back to results; See nearby homes (mode=nearby); View on source
- **Cards**: Clickable; ListingCard → /property/[id]
- **Build**: ✓

---

## Overnight Run — Phase 2: Search Results Flow ✓

- **Search flow**: Homepage SearchControls → /search?q=&intent=; SearchResultsClient handles empty query (form) vs results
- **Results**: Grid sm:2 lg:3; ListingCard links to /property/[id]; intent + location + filters applied
- **Filter tests**: Added maxBudget (rent/buy), parkingRequired to mock-listings.test.ts (tests blocked on Node 20.19+)
- **Empty state**: Only show grid when listings.length > 0; separate empty-state message
- **Build**: ✓

---

## Overnight Run — Phase 1: Stabilise + Clean (2026-03-21)

- **Dead code removed**: SearchForm.tsx, SearchBar.tsx, mockProperties.ts (unused; SearchControls is canonical)
- **mock-listings**: Updated comment (no mockProperties reference)
- **Build**: ✓ clean
- **Routes**: /, /search, /property/[id], /saved, /compare coherent
- **Flows**: Homepage → SearchControls → /search; SearchResultsClient, NearbySearchView stable

---

## Final Status (Stabilisation Sprint)

- **Build**: ✓ Compiles cleanly
- **Lint**: ✓ 0 errors, 11 warnings
- **Critical flows**: Homepage, search, results, property detail, save, compare, close by
- **Docs**: BUILD_LOG, QA_LOG, HANDOVER, KNOWN_LIMITATIONS, PROVIDER_NOTES, ENGINE_NOTES, TEST_STATUS, BACKUP_NOTES
- **Backup**: `/Users/sourcingai/mattsnoop_backup_2026-03-21_2337.zip`
- **Tests**: Blocked on Node 20.19+ (see TEST_STATUS.md)

---

## Deep Engine Sprint ✓

### Property model (`types/property.ts`)
- Complete Property interface: id, title, address, postcode, coordinates, mode, price, bedrooms, transport, area
- validateProperty(), isPropertyLike()
- Typed enums: PropertyType, ParkingType, PropertyMode

### Financial engine (`features/calculator/engine`)
- rentCostEngine: rent + council tax + utilities + insurance
- mortgageEngine: repayment + interest-only
- totalCostEngine: combined monthly

### Area engine (`features/area/engine`)
- amenitiesScoring, transportScoring, densityScoring, eventActivityScoring
- computeAreaProfile()

### Vibe score engine (`features/vibe-score/engine`)
- calculateVibeScore(areaProfile, parking) → 0–100, label, explanation

### Negotiation engine (`features/negotiation/engine`)
- calculateNegotiationScore() → likelihood, range, explanation
- lib/calculations/negotiation-score delegates to it

### Comparables engine (`features/comparables/engine`)
- filterSimilar, calculateAveragePrice, identifyOutliers, detectTrend
- computeComparableSummary()

### Data normalisation (`services/data`)
- normalizeToProperty, normalizeToPropertyListing, normalizeArea
- validateAndNormalize

### Tests
- All engines have unit tests
- Edge cases: zero values, missing data

### Docs
- ENGINE_NOTES.md

---

## Sprint 3 — Search Workflow + Close by Mode ✓

### Search controls upgrade
- SearchControls component: location input, Rent/Buy toggle, Search, Close by
- Refined segmented controls, premium styling
- Replaces SearchForm on homepage and search page

### Close by mode (`/search?mode=nearby`)
- Map-based nearby property discovery
- Distance slider: 0.25, 0.5, 1, 2, 3, 5 km
- Split layout: map (left) + nearby list (right)
- House markers with popup (image, price, beds, distance, View details)
- List cards: click highlights marker; "View details" opens property page

### Mock geo engine
- `lib/geo/distance.ts` — haversine distance (km, metres)
- `services/mockGeo.ts` — resolve location string to centre coords
- `app/search/nearby/actions.ts` — getNearbyListings (filter by radius, sort by distance)

### Map component
- Leaflet + react-leaflet
- Custom house markers
- Popup on marker click
- Fit bounds to markers

### Property detail
- "See nearby homes" link → nearby search for same area

### Mock data
- 4 London-area properties added (ids 9–12) for Close by demo
- All properties have lat/lng

### What is mocked
- Geocoding: location string → centre (London, Manchester, etc.)
- Map tiles: OpenStreetMap (no API key)

---

## Wave 2 — Structured Search & Property Flow ✓

### Routing
- Homepage → SearchForm → navigates to `/search?q=...&intent=...`
- Routes: `/`, `/search`, `/property/[id]`, `/saved`, `/compare`
- Search page shows form when query empty; results when query present

### Mock data (single source)
- `services/providers/mock-listings.ts` — 8 properties, IDs 1–8
- Filter by: location text, rent/buy intent, bedrooms, max/min budget
- `getById(id)` for property detail & compare

### Search results page (`/search`)
- SearchForm (compact) at top
- FilterDrawer: bedrooms, min/max budget, parking
- Results count, grid of ListingCards
- Cards link to `/property/[id]`

### Property detail page (`/property/[id]`)
- Hero image, title, address, price
- Summary facts, days on market, parking, transport
- BookmarkButton + CompareButton
- Area intelligence (mock)
- Negotiation badge
- Calculator panel scaffold (breakdown + editable assumptions)

### Save + Compare
- lib/storage: bookmarks, compare list (max 5)
- localStorage persistence
- CompareTray in layout (shows when items selected)

### Calculator scaffold
- Rent: monthly rent, council tax, utilities, insurance, total
- Buy: mortgage, deposit, stamp duty, upfront costs, total
- Editable assumptions (price, deposit %, term, rate)
- Charts removed for scaffold phase

### Cleanup
- Removed dead: MockProperty ListingCard, ListingsGrid
- mockProperties.ts deprecated (mock-listings is canonical)

---

## Branding + Polish Sprint ✓

### Rebrand: HouseCost → Mattsnoop
- Product name applied globally (UI, metadata, report PDF)
- Slightly playful, premium tone

### Logo
- Circular badge with moustache (1970s handlebar, geometric)
- Magnifying glass hint (snoop reference)
- Wordmark: Mattsnoop
- SVG, minimal, modern

### Header
- Logo (left)
- Saved, Compare nav links
- Sticky, minimal, backdrop blur

### Brand style
- Neutral base (stone palette)
- Subtle accent vars (muted amber) in CSS
- Premium spacing, no clutter

### Listing cards
- Hover: border + shadow
- Image slight zoom on hover
- Refined spacing

### Search UX
- Wider max container
- Refined focus ring
- Toggle styling

---

## Wave 1 — Foundation ✓

### What was built (updated in Wave 2)

1. **Homepage** (`app/page.tsx`)
   - Logo + subtitle
   - SearchForm — navigates to /search on submit

2. **Search page** (`/search`) — SearchForm, FilterDrawer, results grid
3. **Mock data** — `services/providers/mock-listings.ts` (canonical)
4. **ListingCard** — `features/listings/components/ListingCard` (PropertyListing, links to detail)

### What is mocked

- All property data (no API)
- Search filters by: location text, rent/buy, bedrooms, budget

### Styling

- Tailwind only
- Minimalist, neutral (stone palette)
- No clutter, spacing over decoration

### What remains (next steps)

- Real API integration
- Advanced charts (pie, cost over time)
- Local market summary
