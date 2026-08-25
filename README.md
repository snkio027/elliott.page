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

## Status

Foundation is `PASS / FROZEN`.

Phase 1 — Identity & Design is `PASS / FROZEN`. Information semantics,
Typography, Layout & Visual Composition, and the approved Home, About, and Now
Identity surfaces have passed their gates. Production is active on
`elliott.page`; Forced Colors remains `UNVERIFIED / DEFERRED` rather than inferred
from unobserved runtime evidence.

Phase 2 — Publishing is in progress. Phase 2.1 Gate A is contract-only and defines
Writing/Notes semantics, minimal metadata, strict date and draft behavior, durable
file-derived identity, deterministic ordering, and fail-closed validation.
Content Schema & Route Eligibility implementation is not authorized until that
contract passes and freezes. No Writing or Notes production surface is currently
authorized.

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
