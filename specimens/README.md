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

**Status:** PASS / FROZEN — Phase 1.3 Gate B: Composition Specimen

**Remote `Delivery / Quality`:** PASS

**Substantive delta review:** PASS — all findings closed

`layout-composition.html` and `layout-composition.css` form the controlled Gate B
laboratory. During Gate B, the HTML imported frozen production `tokens.css` and
`typography.css` directly while all candidate layout, spacing, and semantic-color
values remained specimen-only. Gate C now also imports production `layout.css`:
the selected Candidate A baseline comes from production, while Control and
Candidate B retain only their historical evaluation overrides.

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
long=1     long navigation, place statement, freshness, and contact fixtures
resize=1   200% root text
spacing=1  WCAG text-spacing override
rules=on   Candidate A Rule-on ablation; Rules are off by default
ui=hidden  composition without laboratory controls
```

The long-content state covers navigation, place statement, freshness, and contact
fixtures. On the Now-shaped surface it replaces the short freshness marker with a
deliberately long Chinese fixture.

### Candidate comparison

The frozen Contract allows at most four structural spacing roles; it does not
require all four. The current page inventory has no distinct groups inside one
region that are not already owned by Typography. `Section` is therefore
unselected in every candidate. Page-edge block padding remains a local
composition value and is not represented as a shared Section token.

| Candidate        |    Inline |   Cluster | Section |   Region | Local page-edge block inset | Frame   | Disposition                                                                               |
| ---------------- | --------: | --------: | :-----: | -------: | --------------------------: | ------- | ----------------------------------------------------------------------------------------- |
| Control          | `0.75rem` | `1.25rem` |    —    |   `4rem` |                   `2.75rem` | `66rem` | PASS / REJECT FOR V1 — simplest, but provides the weakest identity and region distinction |
| A — Editorial    |    `1rem` | `1.75rem` |    —    |   `6rem` |                      `4rem` | `72rem` | PASS / SELECT FOR V1 — strongest hierarchy without admitting an unnecessary Rule          |
| B — Quiet offset | `0.75rem` | `1.25rem` |    —    | `4.5rem` |                      `3rem` | `72rem` | PASS / REJECT FOR V1 — offset and inline Rule add action without a material gain over A   |

Candidate A's actual normal-state gutter and frame behavior is:

| Viewport | Page gutter | Content inline start | Frame behavior                                                 |
| -------- | ----------: | -------------------: | -------------------------------------------------------------- |
| `320px`  |      `16px` |               `16px` | fluid below maximum                                            |
| `768px`  |    `38.4px` |           `38.398px` | fluid below maximum                                            |
| `1440px` |      `64px` |              `208px` | `72rem` / `1152px` centered frame, plus `64px` internal gutter |

The difference between page gutter and content inline start at `1440px` is the
centered frame's `144px` outer margin. No fixed viewport height participates in
the composition.

Normal Home frame heights expose the spatial difference without forcing viewport
height:

| Candidate        |     `320px` |     `768px` |    `1440px` |
| ---------------- | ----------: | ----------: | ----------: |
| Control          | `387.398px` | `362.414px` | `377.891px` |
| A — Editorial    | `507.398px` | `474.414px` | `489.891px` |
| B — Quiet offset | `437.797px` | `386.414px` | `401.891px` |

Candidate A materially strengthens Header/Main/Footer separation and identity
priority while remaining content-sized. Control is valid but under-articulated.
Candidate B is valid, but its wide offset and identity-side Rule do not earn their
additional visual action.

### Selected consumers and Rule ablation

Candidate A admits only roles with observed consumers:

| Role        | Observed consumer                                                                |
| ----------- | -------------------------------------------------------------------------------- |
| Inline      | About / Now destination group                                                    |
| Cluster     | Primary-navigation groups and Home Display-name/place-statement identity cluster |
| Region      | Header / Main / Footer separation in the site frame                              |
| Section     | `UNSELECTED` — no current consumer                                               |
| Page gutter | Responsive inline edge protection on the centered site frame                     |

Candidate A was compared with Rules OFF and ON at exact shared spacing. The
Rule-on query uses non-layout pseudo-elements, so the ablation does not change
geometry:

| Viewport | Rules OFF frame | Rules ON frame | Overflow / order |
| -------- | --------------: | -------------: | ---------------- |
| `320px`  |     `507.398px` |    `507.398px` | PASS             |
| `768px`  |     `474.414px` |    `474.414px` | PASS             |
| `1440px` |     `489.891px` |    `489.891px` | PASS             |

Spacing and alignment remained sufficient to identify Header, Main, and Footer
with Rules OFF at narrow and wide viewports. The Rules added visual segmentation
but no necessary orientation or hierarchy. Candidate A therefore keeps Rules OFF;
the Rule role is not selected for its v1 production handoff.

### Semantic colors

The specimen declares only the five frozen roles. Candidate A selects Canvas,
Text, Muted, and Accent; Rule remains available only to Candidate B and the
Candidate A ablation witness.

| Role   | Value     | Contrast against Canvas | Result                                                   |
| ------ | --------- | ----------------------: | -------------------------------------------------------- |
| Canvas | `#f6f4ef` |                       — | PASS                                                     |
| Text   | `#25231f` |              `14.270:1` | PASS                                                     |
| Muted  | `#5e5a52` |               `6.243:1` | PASS                                                     |
| Rule   | `#858078` |               `3.567:1` | PASS — Candidate B and A ablation only; unselected for A |
| Accent | `#704a38` |               `7.010:1` | PASS — current and focus states                          |

Contrast values are calculated from the declared sRGB values without rounding a
failure upward. No palette scale or sixth semantic role is introduced.

### Evidence scope

Validated on 25 August 2026 in the current local macOS Codex in-app browser
session. This is current-host evidence; independent browser-engine and platform
equivalence is not claimed.

| Evidence                                                                   | Result                                                                                                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All candidates × Home/About/Now × `320/768/1440px`                         | PASS — 27 corrected normal states; no page or canvas overflow                                                                                                             |
| Candidate A × Home/About/Now × `320/480/768/1024/1440px`                   | PASS — 15 corrected states; continuous reflow, stable region order, visible navigation                                                                                    |
| Candidate A × Home/About/Now × `320/768/1440px` combined stress            | PASS — 9 corrected states; long content + 200% text + spacing override                                                                                                    |
| Candidate A × Home/About/Now × separate `320px` long/resize/spacing states | PASS — 12 corrected states                                                                                                                                                |
| Required long freshness                                                    | PASS — complete long Chinese marker visible at `320px` in both long-only and combined stress states; no overflow                                                          |
| Semantic structure                                                         | PASS — one visible `h1`, three Header links, one current link, one visible Footer contact                                                                                 |
| Home ownership                                                             | PASS — zero links in Home Main; navigation and contact are not duplicated                                                                                                 |
| Reading measure                                                            | PASS — English stops at approximately `648.141px`; Chinese stops at `512px` on the validated host                                                                         |
| Keyboard order                                                             | PASS — Header links, optional Main prose link, then Footer contact                                                                                                        |
| Focus appearance                                                           | PASS — Accent outline `2px` normal and `3.5px` at 200%; `7.010:1` against Canvas                                                                                          |
| Link-state recognition                                                     | PASS — default underline persists; hover sets `0.15em` underline thickness; current uses weight `600` plus thicker underline; focus uses a visible Accent outline         |
| Visited link                                                               | PASS WITH BOUNDARY — normal underline remains after navigation; optional visited treatment changes only color; no history state is inferred from script or computed style |
| Language of parts                                                          | PASS — Now root is `zh-CN`; persistent English primary navigation is locally marked `lang="en"`                                                                           |
| Spacing consumers                                                          | PASS — Inline, Cluster, Region, and page gutter have observed consumers; Section is explicitly unselected                                                                 |
| Rule admission                                                             | PASS — exact-geometry ON/OFF ablation; Rules removed from selected Candidate A                                                                                            |
| Browser console                                                            | PASS — no warning or error entries                                                                                                                                        |
| Forced colors                                                              | `UNVERIFIED / DEFERRED` — no credible runtime environment; semantic-color inspection is supporting evidence only                                                          |

The initial combined `320px` Home run exposed horizontal overflow in every
candidate. The shared identity grid allowed its Display and Body children to keep
an oversized automatic minimum. The specimen now gives those authored-text
children `min-inline-size: 0`, caps them to the available width, and permits an
emergency wrap. The full normal and stress matrices passed after this correction;
the defect was not averaged into candidate scoring.

The substantive review then exposed a spacing-ownership defect: the specimen had
used `Section` for frame and Main padding even though no within-region Section
consumer existed. The corrected candidate removes that role, treats page-edge
block padding as a local composition value, removes Main padding, and reruns the
complete Candidate A matrix. This correction reduced normal Home height from
`693.398/660.414/675.891px` to `507.398/474.414/489.891px` at the three acceptance
viewports without weakening hierarchy. The same delta added the required long
freshness fixture and English language-of-parts marker.

### Current disposition

```text
Control
PASS / REJECT FOR V1

Candidate A — Editorial breathing room
PASS / SELECT FOR V1

Candidate B — Quiet offset
PASS / REJECT FOR V1

Gate B
PASS / FROZEN

Gate C
IN PROGRESS
```

Gate B has merged and authorizes Gate C. Gate C preserves the unselected Section
and Rule decisions, and the `4rem` page-edge block inset remains local until a
second semantic consumer exists.

## Phase 1.3 Gate C — Production integration receipt

**Status:** LOCAL IMPLEMENTATION EVIDENCE PASS / REMOTE GATE PENDING /
SUBSTANTIVE REVIEW PENDING

Gate C promotes only the values and primitives selected by Gate B. Production now
contains:

```text
tokens.css
├── Canvas / Text / Muted / Accent
├── Inline / Cluster / Region
└── page gutter / frame maximum

layout.css
├── shared canvas and link states
├── site frame and responsive gutter
├── Header / Main / Footer region shell
├── primary navigation composition
└── Home identity-cluster composition
```

There is no Section token, Rule token, palette scale, rejected-candidate selector,
or specimen query/stress machinery in production. The `4rem` page-edge block
inset remains a local `.site-frame` value. The build contains one root HTML file
and one compiled CSS asset, with no Web Font asset or formal About/Now route.

`BaseLayout.astro` owns one Header, one Main, and one Footer. Header owns `Elliott
Bai / About / Now`, Main receives the route content, and Footer owns
`hi@elliott.page`. The root route adds only the Display name and provisional place
statement as an implementation proof; it is not the formal Home surface.

### Production/specimen parity

Validated on 25 August 2026 in the current local macOS Codex in-app browser. At
every width below, the production proof and the selected specimen have exactly the
same frame and identity-cluster geometry:

| Viewport | Frame                                                  | Identity cluster                                   |   Gutter | Region gap |
| -------: | ------------------------------------------------------ | -------------------------------------------------- | -------: | ---------: |
|  `320px` | `320 × 507.398px`, inline start `0`                    | `288 × 96.398px`, inline start `16px`, top `230px` |   `16px` |     `96px` |
|  `480px` | `480 × 513.359px`, inline start `0`                    | `432 × 101.563px`, inline start `24px`             |   `24px` |     `96px` |
|  `768px` | `768 × 474.414px`, inline start `0`                    | `648.141 × 110.898px`, inline start `38.398px`     | `38.4px` |     `96px` |
| `1024px` | `1024 × 483.586px`, inline start `0`                   | `648.141 × 119.195px`, inline start `51.195px`     | `51.2px` |     `96px` |
| `1440px` | `1152 × 489.891px`, centered with inline start `144px` | `648.141px` wide, inline start `208px`             |   `64px` |     `96px` |

No tested production or selected-specimen state has page or frame overflow.
Section and Rule are unselected in both sources.

### Regression and interaction evidence

| Evidence                                                              | Result                                                                                                          |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Selected specimen × Home/About/Now × five normal widths               | PASS — 15 states                                                                                                |
| Selected specimen × Home/About/Now × `320/768/1440px` combined stress | PASS — 9 long-content + 200% text + spacing-override states                                                     |
| Selected specimen × Home/About/Now × separate `320px` stress states   | PASS — 12 long-content, resize, spacing, and combined states                                                    |
| Region ownership                                                      | PASS — Header/Main/Footer order stable; navigation visible; no Main navigation/contact duplicates               |
| Long Chinese freshness and language of parts                          | PASS — complete marker visible at `320px`; `zh-CN` root with persistent English navigation marked `lang="en"`   |
| Production default/current/hover link recognition                     | PASS — persistent underline; current adds Accent, weight `600`, and thicker underline                           |
| Production keyboard focus                                             | PASS — visible `2px` Accent outline with `2.5px` offset on the validated host                                   |
| Visited-link affordance                                               | PASS WITH BOUNDARY — underline persists in the selected specimen; no history state inferred from computed style |
| Production console                                                    | PASS — no warning or error entries                                                                              |
| Forced Colors                                                         | `UNVERIFIED / DEFERRED`                                                                                         |

This is current-host evidence. Independent browser-engine, operating-system, and
device equivalence is not claimed. Direct production DOM mutation is not used as
evidence: stress states run in the selected specimen, which imports the production
tokens and layout source, while the normal production/specimen parity receipt
proves that both use the same selected geometry.

Gate C is not frozen by this receipt. Required `Delivery / Quality` and
substantive review must still pass on the final revision before lifecycle closure.
