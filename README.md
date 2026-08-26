# Elliott.page

Elliott.page is Elliott Bai's long-term personal space on the open web: a quiet,
durable, and owned home for writing, notes, and memory.

The product direction and engineering boundaries are defined in:

- [`docs/manifesto.md`](docs/manifesto.md)
- [`docs/architecture.md`](docs/architecture.md)
- [`docs/information-and-page-semantics.md`](docs/information-and-page-semantics.md)
- [`docs/typography.md`](docs/typography.md)
- [`docs/layout-and-visual-composition.md`](docs/layout-and-visual-composition.md)
- [`docs/identity-surfaces.md`](docs/identity-surfaces.md)
- [`docs/content-semantics-and-url.md`](docs/content-semantics-and-url.md)
- [`docs/writing-surface.md`](docs/writing-surface.md)
- [`docs/notes-surface.md`](docs/notes-surface.md)

## Status

Foundation is `PASS / FROZEN`.

Phase 1 — Identity & Design is `PASS / FROZEN`. Information semantics,
Typography, Layout & Visual Composition, and the approved Home, About, and Now
Identity surfaces have passed their gates. Production is active on
`elliott.page`; Forced Colors remains `UNVERIFIED / DEFERRED` rather than inferred
from unobserved runtime evidence.

Phase 2 — Publishing is in progress. Phase 2.1 — Content Semantics & URL Contract
and its Gate A are `PASS / FROZEN` after local and Required
`Delivery / Quality` plus substantive delta review. Gate B — Content Schema &
Route Eligibility is also `PASS / FROZEN`: its executable schemas, content
integrity, stable identity, eligibility, ordering, and fail-closed evidence passed
local and Required Quality, 11 content-contract tests, and substantive delta
review. These primitives are available to later Publishing surfaces.

Phase 2.2 — Writing Surface is `PASS / FROZEN`. Gate A — Writing Surface Contract,
Gate B — Candidate Implementation + Public Content, and Gate C — Runtime,
Accessibility & URL Validation are all `PASS / FROZEN`. Publication approval is
bound to evidence-bearing HEAD
`f143fc8329ba0c5d427dfcb7dd4aa2a51f9d4c96`; Forced Colors remains
`UNVERIFIED / DEFERRED`. The first Writing surface is active in production at its
permanent public URL.

Phase 2.3 — Notes Surface is in progress. Gate A — Notes Surface Contract is
`PASS / FROZEN` after Local and Required `Delivery / Quality` plus substantive
delta review. Gate B — Candidate Implementation + Public Content is `NEXT / NOT
STARTED` and remains unauthorized until Gate A merges to protected `main`. Public
Note content, `/notes/` routes, Notes navigation, Gate C, and Notes production
activation remain unauthorized.

## Runtime

- Node.js 24.19.0 LTS
- pnpm 11.19.0

Use the Node.js version declared in `.nvmrc`, then enable the package-manager
version declared in `package.json` through Corepack.

## Commands

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm quality
```

`pnpm quality` is the single local and CI quality gate.
