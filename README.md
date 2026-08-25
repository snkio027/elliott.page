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

## Status

Foundation is frozen. Domain trust, the repository and Astro baseline, and the
Cloudflare deployment baseline have passed their acceptance gates.

Phase 1.1 — Information & Page Semantics and Phase 1.2 — Typography System are
frozen. Typography Gates A, B, and C have passed; the Native System Font Stack is
selected for v1, Required `Delivery / Quality` passed on the final reviewed
revision, and the substantive delta review closed all findings. Phase 1.3 — Layout
& Visual Composition is also frozen. Gates A, B, and C have passed; Candidate A —
Editorial breathing room is selected for v1, Required `Delivery / Quality` passed
on the final reviewed revision, and the substantive delta review closed the
production-navigation finding. The production proof exposes only the real root
destination; About and Now remained specimen evidence rather than dead links at
that gate. That historical root-only proof has now been superseded by the approved
Phase 1.4 identity surfaces without reopening the frozen Phase 1.3 system.

Phase 1.4 — Identity Surfaces is frozen. Gates A, B, and C have passed on the same
implementation candidate. Elliott explicitly approved the Home, About, and Now
publication copy on implementation/content revision
`02c8049558891a9631d3f50a1d6f5c928cfc094c`; Gate C validated that unchanged
candidate in a production-equivalent static runtime, and substantive evidence
review found no blocker. Forced Colors remains `UNVERIFIED / DEFERRED`. The final
lifecycle-only revision changes status authority, not approved content,
implementation, or runtime semantics, and remains subject to Required
`Delivery / Quality` and status-diff confirmation before merge.

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
