# Full Audit

## A. Functional Drift

### 1) Buy/Rent logic is inconsistent and partially broken
- `rent` intent is not coherently supported by the current listing pipeline.
- The provider model is effectively buy-first and can return sparse or zero rent outcomes depending on filter paths.
- Core issue: intent is treated as a UI toggle in some places and as a true data mode in others.

### 2) Search state is not carried consistently
- `q`, `intent`, `maxBudget`, and filters are not reliably preserved across transitions (search -> detail -> nearby -> back, and save/restore paths).
- This creates drift between what users entered and what downstream components evaluate.

### 3) Route handling has been fragile
- `/search` has changed implementation style multiple times, creating production fragility risk.
- App Router parameter handling has been brittle when mixed with server/client assumptions.

### 4) Nearby behavior can mask user input
- Out-of-scope locations are coerced silently to Manchester in nearby flow.
- This is functional deception: user intent is rewritten instead of surfaced.

### 5) Intent defaults cause incorrect context
- Several routes/components can default to an intent that does not match the originating flow.
- Result: recommendation and calculator context can be wrong for the same listing.

### 6) Input->output mapping is uneven
- Homepage now captures mode/location/budget, but downstream interpretation and recommendation do not always reflect all three inputs consistently.

## B. UX Drift

### 1) Too many competing messages
- Homepage and detail pages include multiple advisory lines that reduce clarity.
- Users are asked to parse copy before acting.

### 2) Control hierarchy has become noisy
- Search controls include too many explanatory labels and utility actions in contexts that should be single-purpose.
- Decision guidance is present but often diluted by secondary text.

### 3) Results are not always decisive
- Cards and detail views show many signals, but the primary next action can still be ambiguous.

### 4) Copy quality is inconsistent
- Some sections are sharp and commercially credible.
- Others still read as prototype helper text or generic UX scaffolding.

## C. Visual Drift

### 1) Card overuse and border density
- Too many bordered containers and stacked sections make the interface feel like a dashboard prototype.

### 2) Uneven typography hierarchy
- Key decisions and secondary metadata can appear too close in weight/size.
- Primary action intent is occasionally visually underpowered.

### 3) Hero/search coherence regressed and recovered repeatedly
- The hero + control surface has been iterated often; consistency is improving but still needs simplification around the single core action.

### 4) Visual tone occasionally drifts from premium restraint
- Some UI blocks still look utility-first rather than analyst-grade.

## D. Spirit Drift

### 1) Product occasionally feels portal-like
- Listing/nearby/seller surfaces can feel like separate mini-products rather than one disciplined decision engine.

### 2) Intelligence tone is not consistently enforced
- Some recommendations are strong and actionable.
- Other sections still read like broad informational copy.

### 3) Scope discipline has been challenged
- The app has accumulated overlapping modules; not all contribute to the core "decide what to do next" moment.

## Blunt Summary

- Current build is **functional but inconsistent**.
- The strongest issue is **decision-flow integrity** (intent and state continuity).
- The second strongest issue is **signal discipline** (too much explanatory UI around the core action).
- The product is close to the intended spirit in parts, but still drifts into prototype/dashboard behavior.
