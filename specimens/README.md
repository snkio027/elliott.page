# Design validation specimens

This directory contains local design-validation artifacts. Astro does not import
the directory, copy it to `public/`, or deploy it as part of Elliott.page.

## Phase 1.2 Typography specimens

**Status:** PASS / FROZEN — Phase 1.2 Typography System

The typography specimen deliberately imports production CSS from `src/styles/` so
the same contract implementation is verified rather than duplicated.

`typography-system.html` is the system-font control for Phase 1.2. Open it directly
in a browser or serve this directory with any local static-file server.

The specimen exists to test the frozen typography contract. Its copy, page shell,
and neutral presentation are not product design or production content.

## Gate A validation record

Validated on 23 August 2026 using the system-font control:

| State                           | Result                                                                                                                |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `320px` viewport                | No page-level horizontal overflow; Body `16px`                                                                        |
| `768px` viewport                | No page-level horizontal overflow; Body approximately `17px`                                                          |
| `1440px` viewport               | No page-level horizontal overflow; Body `18px`; two-column comparison only in the specimen                            |
| `320px` with 200% root text     | No page-level horizontal overflow after responsive gutter and min-content fixes                                       |
| WCAG text-spacing override      | `1.5` line height, `2em` paragraph spacing, `0.12em` letter spacing, and `0.16em` word spacing apply without overflow |
| 200% text plus spacing override | No page-level horizontal overflow                                                                                     |
| Long code                       | Scrolls inside its own block without widening the page                                                                |
| Font delivery                   | System fonts only; zero external font requests                                                                        |
| Simplified Chinese `<em>`       | Filled dots below the text remain distinct without line collision                                                     |
| Weight-only Chinese `<em>`      | Rejected because it becomes visually equivalent to `<strong>`                                                         |

Gate C substantive review on 25 August 2026 found that the original specimen's
broad paragraph/list selector also matched `p + p`, overriding the frozen `0.8B`
paragraph rhythm with `1B`. Production CSS and the specimen now share the corrected
selector, so the corrected control replaces the defective geometry as the Gate A
baseline. Gate B's Native System Font Stack decision is unchanged. Cross-platform
typography behavior remains unverified and is intentionally deferred until a real
need or defect appears.

## Gate B candidate routing

Gate B reuses the same content, scale, rhythm, measure, and page shell. A query
parameter changes only the font slots:

```text
typography-system.html?candidate=control
typography-system.html?candidate=geist
typography-system.html?candidate=inter
typography-system.html?candidate=editorial
```

Add `&load=blocked` to load only the candidate's declared fallback strategy while
leaving its WOFF2 faces unused, or `&load=delayed` to hold that fallback for two
seconds before activating the custom faces. Only the selected candidate assets are
eligible to be requested.

The source, subsetting, payload, test matrix, and decision record live in
`candidates/README.md`. Candidate files are evaluation artifacts only; none are
production integration.

**Gate B result:** PASS — SELECT Native System Font Stack for v1

## Gate C implementation record

Initially validated on 23 August 2026 and corrected on 25 August 2026 in the same
local macOS Chrome/Chromium evidence boundary used by Gate B:

| Concern                | Result                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Shared source          | The specimen consumes `src/styles/tokens.css` and `src/styles/typography.css` directly                                              |
| Corrected rhythm       | Computed `p + p = 0.8B`; computed `p → list` and `list → p = 1B`                                                                    |
| Boundary normalization | Heading, Blockquote, and Code fixtures have zero leading margin as first child and zero trailing margin as last child               |
| Viewport regression    | Corrected baseline has no page-level horizontal overflow at `320px`, `768px`, or `1440px`                                           |
| `320px` resilience     | 200% root text, WCAG text spacing, and the combined state produce no page-level horizontal overflow                                 |
| Long code              | Remains horizontally scrollable inside its own block in every stress state                                                          |
| Chinese `<em>`         | The production primitive renders filled dots below the text on the validated host                                                   |
| Candidate regression   | Candidate routes still load only their selected local assets; the Geist `+53.758px` delayed-load title failure remains reproducible |
| Production proof       | `BaseLayout.astro` imports the shared source and the baseline Home renders one semantic Display heading                             |
| Production isolation   | The static build contains no `@font-face`, WOFF2 asset, or candidate-family reference                                               |

Computed normal-state rhythm evidence:

| Viewport | Body line box |                            `p + p` |         `p → list` |         `list → p` |
| -------: | ------------: | ---------------------------------: | -----------------: | -----------------: |
|  `320px` |      `26.4px` |                 `21.12px` / `0.8B` |    `26.4px` / `1B` |    `26.4px` / `1B` |
|  `768px` |   `28.0791px` | `22.4633px` / approximately `0.8B` | `28.0791px` / `1B` | `28.0791px` / `1B` |
| `1440px` |      `29.7px` |                 `23.76px` / `0.8B` |    `29.7px` / `1B` |    `29.7px` / `1B` |

The Heading fixture reports `0px` first-child leading margin and `0px` last-child
trailing margin. The only-child Blockquote and Code fixtures report `0px` on both
block edges. Meta computes to weight `500`.

Candidate CSS and WOFF2 files remain reproducibility evidence under `specimens/`.
They override font slots only inside an explicitly selected local evaluation route
and never enter the production dependency graph.

**Gate C result:** PASS / FROZEN — Implementation Readiness

**Remote `Delivery / Quality`:** PASS

**Substantive delta review:** PASS — all findings closed

**Phase 1.2 result:** PASS / FROZEN — Typography System

**Handoff:** Phase 1.3 consumes the frozen Typography source as a read-only input.

## Phase 1.3 Gate B — Controlled Composition Specimen

**Status:** LOCAL EVIDENCE PASS / REMOTE QUALITY PENDING / SUBSTANTIVE REVIEW
PENDING

`layout-composition.html` and `layout-composition.css` form the controlled Gate B
laboratory. The HTML imports frozen production `tokens.css` and `typography.css`
directly. Candidate layout, spacing, and semantic-color values exist only in the
specimen stylesheet; no layout or color source has entered `src/` or `public/`.

The fixture renders exactly one active surface at a time with real Header, Main,
and Footer landmarks:

```text
Header  → Elliott Bai / About / Now
Main    → Home identity OR About-shaped prose OR Now-shaped prose
Footer  → one visible contact link
```

Home Main contains only the Display name and place statement. It contains no
navigation or contact copy. Fixture text is evaluation content, not final Home,
About, or Now copy.

### Candidate and surface routing

All candidates share the same HTML, semantic colors, Typography, fixture copy, and
test controls. Query parameters change only the composition and active surface:

```text
layout-composition.html?candidate=control&surface=home
layout-composition.html?candidate=editorial&surface=about
layout-composition.html?candidate=tension&surface=now
```

Candidate names:

```text
control    Control — Normal flow
editorial  A — Editorial breathing room
tension    B — Quiet offset
```

Stress states are available through controls or reproducible query parameters:

```text
long=1     long navigation, place statement, and contact fixtures
resize=1   200% root text
spacing=1  WCAG text-spacing override
ui=hidden  composition without laboratory controls
```

### Candidate comparison

Every candidate uses exactly four structural spacing roles plus the separate page
gutter. Values below are local experiment parameters, not production tokens.

| Candidate        |    Inline |   Cluster |   Section |   Region |   Frame | Disposition                                                                               |
| ---------------- | --------: | --------: | --------: | -------: | ------: | ----------------------------------------------------------------------------------------- |
| Control          | `0.75rem` | `1.25rem` | `2.75rem` |   `4rem` | `66rem` | PASS / REJECT FOR V1 — simplest, but provides the weakest identity and region distinction |
| A — Editorial    |    `1rem` | `1.75rem` |    `4rem` |   `6rem` | `72rem` | PASS / PROVISIONAL SELECT — strongest hierarchy with only two restrained Rule consumers   |
| B — Quiet offset | `0.75rem` | `1.25rem` |    `3rem` | `4.5rem` | `72rem` | PASS / REJECT FOR V1 — offset and inline Rule add action without a material gain over A   |

Normal Home frame heights expose the spatial difference without forcing viewport
height:

| Candidate        |     `320px` |     `768px` |    `1440px` |
| ---------------- | ----------: | ----------: | ----------: |
| Control          | `387.398px` | `362.414px` | `377.891px` |
| A — Editorial    | `693.398px` | `660.414px` | `675.891px` |
| B — Quiet offset | `437.797px` | `386.414px` | `401.891px` |

Candidate A materially strengthens Header/Main/Footer separation and identity
priority while remaining content-sized. Control is valid but under-articulated.
Candidate B is valid, but its wide offset and identity-side Rule do not earn their
additional visual action.

### Semantic colors

All three candidates use the same five roles:

| Role   | Value     | Contrast against Canvas | Result                              |
| ------ | --------- | ----------------------: | ----------------------------------- |
| Canvas | `#f6f4ef` |                       — | PASS                                |
| Text   | `#25231f` |              `14.270:1` | PASS                                |
| Muted  | `#5e5a52` |               `6.243:1` | PASS                                |
| Rule   | `#858078` |               `3.567:1` | PASS — meaningful non-text boundary |
| Accent | `#704a38` |               `7.010:1` | PASS — current and focus states     |

Contrast values are calculated from the declared sRGB values without rounding a
failure upward. No palette scale or sixth semantic role is introduced.

### Evidence scope

Validated on 25 August 2026 in the current local macOS Codex in-app browser
session. This is current-host evidence; independent browser-engine and platform
equivalence is not claimed.

| Evidence                                                                   | Result                                                                                                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All candidates × Home/About/Now × `320/768/1440px`                         | PASS — 27 normal states; no page or canvas overflow                                                                                                                       |
| Candidate A × Home/About/Now × `320/480/768/1024/1440px`                   | PASS — continuous reflow, stable region order, visible navigation                                                                                                         |
| Candidate A × Home/About/Now × `320/768/1440px` combined stress            | PASS — long content + 200% text + spacing override                                                                                                                        |
| Candidate A × Home/About/Now × separate `320px` long/resize/spacing states | PASS — 12 states                                                                                                                                                          |
| Semantic structure                                                         | PASS — one visible `h1`, three Header links, one current link, one visible Footer contact                                                                                 |
| Home ownership                                                             | PASS — zero links in Home Main; navigation and contact are not duplicated                                                                                                 |
| Reading measure                                                            | PASS — English stops at approximately `648.141px`; Chinese stops at `512px` on the validated host                                                                         |
| Keyboard order                                                             | PASS — Header links, optional Main prose link, then Footer contact                                                                                                        |
| Focus appearance                                                           | PASS — Accent outline `2px` normal and `3.5px` at 200%; `7.010:1` against Canvas                                                                                          |
| Visited link                                                               | PASS WITH BOUNDARY — normal underline remains after navigation; optional visited treatment changes only color; no history state is inferred from script or computed style |
| Browser console                                                            | PASS — no warning or error entries                                                                                                                                        |
| Forced colors                                                              | `UNVERIFIED / DEFERRED` — no credible runtime environment; semantic-color inspection is supporting evidence only                                                          |

The initial combined `320px` Home run exposed horizontal overflow in every
candidate. The shared identity grid allowed its Display and Body children to keep
an oversized automatic minimum. The specimen now gives those authored-text
children `min-inline-size: 0`, caps them to the available width, and permits an
emergency wrap. The full normal and stress matrices passed after this correction;
the defect was not averaged into candidate scoring.

### Current disposition

```text
Control
PASS / REJECT FOR V1

Candidate A — Editorial breathing room
PASS / PROVISIONAL SELECT

Candidate B — Quiet offset
PASS / REJECT FOR V1

Gate B
LOCAL EVIDENCE PASS
REMOTE QUALITY PENDING
SUBSTANTIVE REVIEW PENDING
```

Production integration remains unauthorized. Gate C may begin only after Candidate
A (or another reviewed disposition) receives Gate B approval.
