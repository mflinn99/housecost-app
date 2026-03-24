# Release Notes - Manchester + Salford Decision Sprint

## Why this release

This release shifts Housecost from a tidy demo to a clearer local decision-support product for Manchester and Salford.

## What changed

- Added a local benchmark data layer in `data/localBenchmarks.ts` with:
  - Manchester and Salford pricing baselines
  - local sold-price context anchors
  - trend direction and leverage hints
  - mortgage affordability assumptions
- Added source documentation in `DATA_SOURCES.md` to make assumptions and provenance explicit.
- Introduced a transparent rule-based decision model in `lib/market/decisionEngine.ts` returning:
  - action (`Buy`, `Negotiate`, `Wait`, `List`, `Hold`)
  - confidence (`Low`, `Medium`, `High`)
  - negotiation stance
  - rationale and next step
  - ownership-cost and affordability-pressure outputs
- Upgraded property assessment output in `features/listings/components/PropertyDetailClient.tsx` with:
  - estimated monthly ownership cost
  - affordability pressure
  - local price position
  - recommendation + rationale + next step
  - unobtrusive “how this works” trust copy
- Added tighter Manchester/Salford area intelligence notes in `features/area/components/AreaIntelligence.tsx`:
  - pricing snapshot
  - market direction
  - leverage signal
  - “what this means” summary
- Refined copy and hierarchy on homepage/search/seller surfaces for more decision-led clarity.

## Validation

- `npm run build` passes
- `npm run lint` passes with warnings only (no errors)
- Core flows verified: homepage, search, property detail assessment, area intelligence, seller outputs

## Scope guardrails

- Geography remains Manchester + Salford only
- No nationwide expansion
- No feature sprawl beyond decision-support clarity and trust improvements
