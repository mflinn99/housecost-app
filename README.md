# HouseCost

Compare the real monthly cost of renting or buying a home in a chosen area.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Search** by postcode (SW1, M1), town, or street
- **Rent or Buy** — toggle search intent
- **Property cards** with price, transport, parking, days on market
- **Cost breakdown** — monthly rent/mortgage, council tax, utilities, insurance
- **Editable assumptions** — deposit, interest rate, mortgage term, council tax band
- **Negotiation indicator** — indicative discount likelihood
- **Compare** 2–4 properties side by side
- **Save** searches and bookmark properties (local storage)

## Structure

```
app/              — Pages
components/       — UI primitives
features/         — search, listings, calculator, comparables, compare, saved
lib/              — utils, calculations, storage
services/         — Provider abstractions (mock by default)
types/            — TypeScript + Zod schemas
```

## Documentation

- [BUILD_LOG.md](./BUILD_LOG.md) — Build progress by wave
- [HANDOVER.md](./HANDOVER.md) — Handover notes
- [PROVIDER_NOTES.md](./PROVIDER_NOTES.md) — Data provider integration
- [KNOWN_LIMITATIONS.md](./KNOWN_LIMITATIONS.md) — Current limits
- [QA_LOG.md](./QA_LOG.md) — QA checklist

## Disclaimer

HouseCost provides affordability estimates only. Not regulated mortgage advice. All figures are indicative.
