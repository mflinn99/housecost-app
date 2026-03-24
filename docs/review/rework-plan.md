# Rework Plan

## P0 — Must Fix Immediately

1. **Search-route integrity**
   - Stabilize `/search` param parsing (`intent`, `q`, `maxBudget`) and fallback handling.
   - Ensure no production route failures.

2. **Buy/Rent coherence**
   - Ensure both intents return coherent result sets.
   - Ensure intent is preserved across homepage -> search -> detail.
   - Ensure recommendation engine uses rent semantics for rent listings.

3. **Input->output integrity**
   - Guarantee homepage inputs map to downstream filtering and recommendation.

4. **No silent query rewriting**
   - Replace hidden fallback behavior with explicit local-coverage messaging.

5. **Remove weak output that breaks decision trust**
   - Remove/replace any recommendation using wrong cost model for selected intent.

## P1 — Improve in This Pass (deferred in this instruction set)

1. **Homepage structure**
   - Keep one control surface and one supporting market note.
   - Remove non-essential blocks from above-the-fold area.

2. **Results clarity**
   - Decision signal first, rationale second, local context third.
   - Reduce repetitive labels and non-decision copy.

3. **Detail-page decision output**
   - Make recommendation panel single-source-of-truth.
   - Keep assumptions visible but unobtrusive.

4. **Copy quality**
   - Rewrite vague or generic phrasing.
   - Maintain concise, commercially credible tone.

5. **Mobile clarity**
   - Confirm stacked control order and CTA prominence.

## P2 — Later / Optional

1. Reduce remaining non-critical warning noise in legacy files.
2. Further simplify secondary modules (compare/seller) into stricter decision outputs.
3. Visual token cleanup for borders/radii consistency across all screens.

## Execution Sequence (P0-only for current pass)

1. Fix route and intent integrity.
2. Fix buy/rent data coherence.
3. Remove wrong-model decision outputs that weaken authority.
4. Validate (`build`, `lint`, key flows).
5. Stop.
