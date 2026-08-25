# Elliott.page

Elliott.page is Elliott Bai's long-term personal space on the open web: a quiet,
durable, and owned home for writing, notes, and memory.

The product direction and engineering boundaries are defined in:

- [`docs/manifesto.md`](docs/manifesto.md)
- [`docs/architecture.md`](docs/architecture.md)
- [`docs/information-and-page-semantics.md`](docs/information-and-page-semantics.md)
- [`docs/typography.md`](docs/typography.md)
- [`docs/layout-and-visual-composition.md`](docs/layout-and-visual-composition.md)

## Status

Foundation is frozen. Domain trust, the repository and Astro baseline, and the
Cloudflare deployment baseline have passed their acceptance gates.

Phase 1.1 — Information & Page Semantics and Phase 1.2 — Typography System are
frozen. Typography Gates A, B, and C have passed; the Native System Font Stack is
selected for v1, Required `Delivery / Quality` passed on the final reviewed
revision, and the substantive delta review closed all findings. Phase 1.3 — Layout
& Visual Composition Gate A has passed Required `Delivery / Quality` and
substantive review and is frozen. Gate B — Composition Specimen has passed and is
frozen with Candidate A — Editorial breathing room selected for v1. Gate C —
Production Integration is in progress: the selected minimum shared values and
layout primitives now drive a root-route production proof, and the selected
specimen consumes the same production source as its regression baseline. Local
implementation evidence has passed; Required `Delivery / Quality` and substantive
review remain pending. The proof is not the formal Home surface, and no About or
Now route has been created. Publishing and production content remain outside the
current phase.

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
