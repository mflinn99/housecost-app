# Target Product Shape

## 1. Primary User Journey

1. Land on homepage.
2. Immediately perform one core action:
   - choose `Buy` or `Rent`
   - enter `Location`
   - enter `Budget`
   - press `Search`
3. Arrive on `/search` with preserved params and stable route.
4. Review ranked listings with clear decision signal.
5. Open a listing to see:
   - recommendation
   - confidence
   - rationale
   - local context
   - next step
6. Decide to act, negotiate, wait, list, or hold.

## 2. Core User Action (within 3 seconds)

- **Run a local property scenario search** for Manchester/Salford and get a decision recommendation.

## 3. Information Hierarchy

1. **What should I do?** (action + confidence)
2. **Why?** (rationale tied to local baseline + affordability pressure)
3. **How strong is this?** (confidence and local context)
4. **What next?** (single next step)
5. Secondary details (transport, extras, saved/compare utilities)

## 4. Design System Direction

- **Spacing:** fewer containers, clearer section spacing, avoid stacked card soup.
- **Layout density:** compact but breathable; no oversized hero blocks.
- **Typography hierarchy:** decisive signals strongest, supporting evidence lighter.
- **Buttons:** restrained, clear primary; utility actions de-emphasized.
- **Inputs:** consistent height, subtle borders, calm focus states.
- **Cards:** only where they add decision value; avoid decorative card duplication.
- **Color:** neutral base with restrained semantic accents for decision state only.
- **Tone:** analyst memo/control surface, not consumer marketing.

## 5. Functional Boundary

### Include now
- Manchester/Salford-only search and routing integrity.
- Buy/rent coherent data mapping.
- Decision output (action, confidence, rationale, stance, next step).
- Local benchmark context and visible assumptions.

### Simplify/defer
- Any section not directly supporting decision-making.
- Excess explanatory helper copy.
- Over-detailed lifestyle blocks that do not affect recommendation.

## 6. Results Experience

Results must present:
- recommendation first (action + confidence),
- rationale second,
- local context third (price position, trend, leverage),
- one explicit next step.

The user should never need to infer "what to do" from raw numbers alone.
