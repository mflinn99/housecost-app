# Comparison Report Specification

## Purpose

Generate a polished PDF comparison report for up to 5 selected properties.

## Report sections

1. **Cover** — HouseCost branding, title, date, location, rent/buy mode, assumptions
2. **Executive Summary** — Overview, strongest option, cheapest monthly, best lifestyle, best negotiation
3. **Property-by-Property** — Image, address, source link, costs, transport, amenities, Vibe Score
4. **Side-by-Side Table** — Price, deposit, mortgage/rent, utilities, insurance, council tax, total monthly, upfront, transport, amenities, days on market, negotiation, Vibe Score
5. **Charts** — Monthly cost breakdown, price trend, amenities, compare-total-cost
6. **Recommendations** — Best all-round, value-led, lifestyle-led, negotiation-led
7. **Disclaimers** — Estimates, indicative only, verify independently

## Formats

- Primary: PDF
- Optional: DOCX (future)

## Implementation status

- [x] Report data model (ReportData, ReportPropertyData)
- [x] buildReportData from listings
- [x] PDF export via @react-pdf/renderer
- [x] Download flow from compare page
