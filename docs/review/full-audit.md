# Full Audit

## A. Functional Drift (Precise)

### 1) Buy/Rent decision logic is incorrect for rent inventory
- `lib/market/decisionEngine.ts` computes **mortgage ownership cost** for all listings, including rent (`pcm`) listings.
- Result: rent recommendations can be based on invalid cost semantics.
- Severity: **P0** because output authority is broken.

### 2) Search state continuity is still fragile
- `q`, `intent`, `maxBudget`, and filters are not reliably preserved across transitions (search -> detail -> nearby -> back, and save/restore paths).
- This can create drift between user input and evaluated recommendation context.

### 3) Route handling has been fragile (recently stabilized)
- `/search` changed implementation style multiple times.
- App Router param handling is now wrapped safely, but this area remains high-risk for regressions.

### 4) Nearby out-of-coverage behavior was deceptive (fixed in rework)
- Prior behavior silently rewrote out-of-scope queries to Manchester.
- Required standard: explicit no-results/local-coverage messaging only.

### 5) Intent fallback remains a regression risk
- Property pages can still rely on query-param intent unless derived from listing data.
- Required standard: listing-derived intent must be authoritative when mismatch occurs.

### 6) Input->output mapping is not uniformly strict
- Homepage captures mode/location/budget.
- Some downstream recommendation blocks still use listing defaults more than active scenario context.

## B. UX Drift (Precise)

### 1) Detail page asks users to parse too many advisory lines
- Decision panel + negotiation note + "what/why/do" helper lines can overlap.
- This weakens single-step decisiveness.

### 2) Search module has label density creep
- Step labels, helper lines, and utility controls have repeatedly expanded/contracted.
- Target is one dominant action surface; current state is improved but still easy to regress.

### 3) Results cards can still over-communicate
- Decision, rationale, metadata, and transport are all present in tile view.
- Action is clearer than before, but card payload is near threshold for clutter.

### 4) Copy quality is uneven across modules
- Homepage/search tone is stronger.
- Compare/saved/seller auxiliary pages still contain utility or prototype phrasing.

## C. Visual Drift (Precise)

### 1) Border density remains high
- Multiple consecutive bordered cards reduce visual confidence and increase "dashboard soup" feel.

### 2) Typographic hierarchy is still mixed
- In several screens, recommendation text and supporting metadata are too close in visual weight.

### 3) Hero/control surface is correct but fragile
- Flow is now coherent; however, repeated iteration indicates this area is vulnerable to future drift.

### 4) Secondary sections still look utility-first
- Saved/compare/seller surfaces are less composed than homepage/search.

## D. Spirit Drift (Precise)

### 1) Product cohesion is incomplete
- Core buyer flow is decision-led.
- Adjacent modules still feel like separate tools rather than one intelligence product.

### 2) Decision authority is strongest in core flow, weaker in satellites
- Recommendation authority is solid on listing/detail.
- Compare/seller guidance remains less tightly evidence-first.

### 3) Scope discipline remains a risk
- Any new non-core sections will quickly degrade product spirit unless aggressively constrained.

## Explicit UI Removals Required

The following should be removed (or kept out) unless directly required for a decision:

1. Repeated helper labels that restate obvious controls.
2. Duplicate advisory lines that do not change user action.
3. Lifestyle/event/demographic blocks without direct pricing/negotiation relevance.
4. Decorative card wrappers around low-value text.
5. Any copy that implies certainty without visible assumptions.

## Remaining Fragile Flows

1. Rent decision outputs using buy-cost semantics (P0 until fixed).
2. Future regressions in `/search` param handling if moved away from current safe pattern.
3. Search-state continuity across save/restore and nearby transitions if URL state is not treated as canonical.

## Blunt Summary

- Current build is **functional but inconsistent**.
- The strongest issue is **decision-flow integrity** (intent and state continuity).
- The second strongest issue is **signal discipline** (too much explanatory UI around the core action).
- The product is close to the intended spirit in parts, but still drifts into prototype/dashboard behavior.
