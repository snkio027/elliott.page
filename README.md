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

Phase 2.3 — Notes Surface is `PASS / FROZEN`. Gate A — Notes Surface Contract,
Gate B — Candidate Implementation + Public Content, and Gate C — Runtime,
Accessibility & URL Validation are all `PASS / FROZEN`. Publication approval is
bound to evidence-bearing HEAD
`979712764f923517b99535118cde76fb9ad0f41f`; Forced Colors remains
`UNVERIFIED / DEFERRED`. Notes production merge/deploy remains unauthorized until
the lifecycle-only status diff passes Required `Delivery / Quality` and final
status-diff confirmation. Writing production remains the active, frozen sibling
surface.

## Runtime

- Node.js 24.19.0 LTS
- pnpm 11.19.0

Use the Node.js version declared in `.nvmrc`, then enable the package-manager
version declared in `package.json` through Corepack.

## Commands

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
pnpm quality
```

`pnpm quality` is the single local and CI quality gate.

## Writing browser regression

`pnpm test:e2e` builds the site, starts a fresh loopback-only preview server, and
runs Chromium at desktop 1440 × 900 and mobile 390 × 844. It follows every
published Writing link from `/writing/`, checks the article heading and body,
then returns through the existing Primary / Writing link. Each page is checked
for horizontal document overflow; console errors, uncaught page errors, failed
requests and HTTP errors fail the test.

The suite is included in `pnpm quality`. It does not reuse an existing server:
port 4321 must be free, so stale content cannot silently satisfy the checks. Tests
have bounded timeouts and no retries. On Linux, install browser OS dependencies
with `pnpm exec playwright install --with-deps chromium` (as CI does).
The test server sets `ASTRO_PREVIEW_BACKGROUND=0` so Astro stays in the foreground
under AI-agent shells and Playwright owns startup and shutdown.

Failures retain screenshots, a Playwright trace and `browser-diagnostics` JSON in
`test-results/`, plus the HTML report in `playwright-report/`. Both directories
are local generated output, excluded from Git, formatting and linting. Open a
report with `pnpm exec playwright show-report`; CI uploads failure evidence for
seven days. A later run replaces these output directories, so copy any evidence
you need to retain before rerunning.

This is a navigation/layout/browser-error regression, not a visual snapshot,
content publication approval, or a Safari/Firefox compatibility claim. Frozen
Writing content, URL semantics and visual design are unchanged.
