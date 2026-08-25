# Elliott.page Layout & Visual Composition Contract v1.0

**Version:** 1.0

**Status:** IN PROGRESS — Phase 1.3: Layout & Visual Composition

**Gate A:** PASS / FROZEN — Layout & Visual Contract

**Gate B:** PASS / FROZEN — Composition Specimen

**Gate B selection:** Candidate A — Editorial breathing room

**Gate B rejected:** Control; Candidate B — Quiet offset

**Gate B evidence boundary:** Forced Colors — UNVERIFIED / DEFERRED

**Gate C:** IN PROGRESS — Production Integration

**Gate C authorization:** AUTHORIZED — Gate B merged

**Gate C handoff:** Section and Rule remain unselected; the `4rem` page-edge block
inset remains a local composition value rather than a shared token.

**Gate A/B evidence:** LOCAL QUALITY PASS / REQUIRED `Delivery / Quality` PASS /
SUBSTANTIVE DELTA REVIEW PASS

**Gate C evidence:** LOCAL IMPLEMENTATION EVIDENCE PASS / LOCAL QUALITY PASS /
REQUIRED `Delivery / Quality` PENDING / SUBSTANTIVE REVIEW PENDING

**Depends on:** `information-and-page-semantics.md`, `typography.md`

**Scope:** Elliott.page v1 identity surfaces: Home, About, and Now

---

## 1. Purpose

This document defines how Elliott.page organizes space, hierarchy, and visual
relationships after information semantics and typography have been frozen.

It is a contract for the later composition specimen and production implementation,
not a page mockup or CSS specification. It defines responsibilities, relationships,
admission rules, and acceptance states before exact spatial values or colors are
selected.

The intended character remains:

```text
Quiet
Editorial
Personal
Timeless
Bilingual
Content-first
```

The system follows the order established in the Manifesto:

```text
Content
  ↓
Frozen Typography
  ↓
Layout
  ↓
Interaction
  ↓
Decoration
```

Layout makes the semantic model legible. It must not turn a small identity site
into a portfolio, dashboard, or premature design system.

## 2. Phase boundary

Phase 1.3 Gate A defines contracts for exactly six areas:

1. layout primitives;
2. non-typographic spacing;
3. semantic color;
4. primary navigation composition;
5. Home identity composition;
6. responsive behavior.

Gate A does not create or authorize:

- production layout or color CSS;
- formal Home, About, or Now page construction;
- new `/about` or `/now` production routes;
- final Home, About, or Now copy;
- a component library;
- Writing or Notes surfaces;
- RSS, search, comments, or CMS capability;
- a Dark Mode or theme switcher;
- gradients, textures, complex illustration, or decorative imagery;
- animation beyond native browser state changes;
- cards, shadows, radius scales, z-index scales, or motion scales;
- Web Fonts or changes to frozen typography primitives;
- analytics-driven visual optimization;
- AI capability.

Gate B may compare controlled visual implementations inside `specimens/`. Gate C
alone may authorize the selected shared values and a minimal production proof.
Formal identity-page construction remains a later phase.

## 3. Frozen inputs

### 3.1 Information and identity

Phase 1.1 remains authoritative:

- Home is the identity root, not a feed;
- About carries durable personal context;
- Now carries a timestamped current snapshot;
- primary navigation exposes only `Elliott Bai`, About, and Now;
- `Elliott Bai` is the only displayed personal name;
- no Chinese-language personal name, alias, or parenthetical equivalent is shown;
- the place statement describes Elliott.page rather than a professional persona;
- `hi@elliott.page` is the primary contact path;
- Writing, Notes, and other reserved routes remain absent until they are real;
- every page preserves native landmarks, one primary `h1`, accurate document
  language, and keyboard-operable links.

This contract does not reopen those decisions.

### 3.2 Typography

Phase 1.2 Typography v1 is an input contract:

- Native System Font Stack, with zero Web Font payload;
- frozen Display, Heading, Body, Meta, Code, Quote, and Link roles;
- frozen scale, weights, language-specific line heights, measures, and prose
  rhythm;
- Simplified Chinese emphasis behavior;
- existing focus-visible and link legibility primitives;
- existing 320px, 200% text, text-spacing, overflow, and font-isolation evidence.

Phase 1.3 must consume `tokens.css` and `typography.css` without changing their
values or creating component-specific type exceptions.

Typography owns relationships inside prose. Layout must not duplicate or override
paragraph, list, heading, quote, code, or citation rhythm.

## 4. System principles

### 4.1 Space communicates structure

The visitor should understand page regions from alignment, measure, and spacing
before color or decoration is considered.

### 4.2 One visual system, not one rigid page

Home, About, and Now share the same frame, gutters, navigation logic, color
semantics, and responsive rules. Their compositions may differ only because their
semantic responsibilities differ.

### 4.3 Sparse is not empty

Whitespace creates relationships and reading pace. It must not become a giant hero,
forced vertical centering, or decorative emptiness that delays access to content.

### 4.4 Hierarchy does not depend on surfaces

The v1 identity surface uses one canvas. A new background layer, card, border,
shadow, or container is admitted only when spacing and typography cannot express a
necessary relationship.

### 4.5 Responsive means recomposed

Narrow layouts preserve meaning and order. They may stack or wrap spatial groups;
they do not shrink a desktop composition until it happens to fit.

### 4.6 Every token must pay rent

A token exists only when at least two real consumers need the same semantic value,
or when one global invariant requires a named authority. Speculative token families
are prohibited.

## 5. Layout vocabulary

The contract uses the following conceptual primitives. They describe responsibility,
not required Astro components or DOM wrappers.

| Primitive | Responsibility | Invariants |
| --- | --- | --- |
| Viewport | Available browser space | No assumption of a fixed device size or fixed block height |
| Page shell | Document-level canvas and logical edges | One canvas; no horizontal page overflow |
| Site frame | Aligns global navigation, main content, and footer | Centered within the viewport; wider than or equal to the reading column |
| Page gutter | Protects content from viewport edges | Symmetric in the inline direction; never collapses to zero |
| Header region | Contains identity anchor and primary navigation | Owns Home orientation through About and Now; normal document flow; no sticky or fixed behavior in v1 |
| Main region | Owns the page's primary semantic responsibility | Exactly one `main`; no decorative wrapper hierarchy |
| Reading column | Contains sustained prose | Consumes the frozen typography measure for the page language |
| Identity cluster | Relates the Display name and place statement | Home Main only; contains no duplicate navigation or contact; content-sized, never a full-viewport hero |
| Footer region | Ends the document and exposes the primary contact path | Sole Home owner of `hi@elliott.page`; natural document flow; not pinned to the viewport |

These primitives may share an element when semantics and layout permit. The
implementation must not create a component for each vocabulary term by default.

## 6. Spatial contract

### 6.1 Page shell and gutters

- The page scrolls vertically in normal document flow.
- Text and navigation never touch the viewport edge.
- The inline gutter remains visibly protective at the `320px` acceptance viewport
  and accommodates any applicable safe-area inset.
- Gutters may grow fluidly, but must stop growing before they make content appear
  detached from the viewport.
- The page shell does not force identity content to fill the viewport height.
- Ordinary content must not create page-level horizontal scrolling at `320px`.
  Source-preserving code remains the existing local-overflow exception.

The exact gutter behavior and wide endpoint are Gate B decisions. Gate A freezes
the edge-protection result, not a CSS formula or unit strategy.

### 6.2 Site frame and alignment

- One centered site frame aligns the Header, Main, and Footer regions.
- The frame may be wider than prose so global navigation can breathe, but prose
  remains bound by the frozen `66ch` / `32ic` language measure.
- Primary content aligns to the logical start edge; ordinary text is not centered.
- The site frame does not establish a permanent sidebar or multi-column content
  template in v1.
- Containers that may hold authored text permit that content to shrink and wrap
  without causing page-level overflow.
- Alignment remains stable between Home, About, and Now so route changes feel like
  movement within one place.

Gate B selects the exact frame maximum and the relationship between frame width and
reading measure.

### 6.3 Vertical regions

The document sequence remains:

```text
Header
  ↓
Main
  ↓
Footer
```

- Major regions are separated by shared layout spacing, not `<br>`, empty elements,
  or component-private margins.
- Header and Footer remain in normal flow.
- Main begins without a decorative banner or artificial top spacer.
- Footer follows the real content height; it is not forced to the viewport bottom.
- A short page may retain generous space, but content is never vertically centered
  solely to resemble a landing page.
- Page landmarks do not overlap at 200% text or under the existing text-spacing
  override.

### 6.4 Reading surfaces

About and Now use the same reading-column primitive:

```text
Page title
Optional Meta
Prose
```

- About has no required Meta line.
- Now displays its required freshness marker as Meta.
- The frozen typography contract owns title-to-Meta, Meta-to-content, and prose
  rhythm.
- Layout may position the complete reading column, but must not widen it or rewrite
  its internal spacing.
- No sidebar, table of contents, share rail, related-content rail, or decorative
  article chrome is introduced in Phase 1.

## 7. Non-typographic spacing contract

### 7.1 Ownership boundary

Typography owns textual rhythm. Layout owns structural separation.

| Owner | Relationships |
| --- | --- |
| Typography | paragraph to paragraph; headings, page titles, Meta, and their associated prose; lists; quotes; code; citations |
| Layout | viewport gutters; Header to Main; Main to Footer; identity region to navigation; independent page regions; gaps within navigation and identity clusters |

Layout may position a complete reading surface within the page frame, but Phase 1.3
spacing tokens **MUST NOT** override frozen prose rhythm or the existing
`--rhythm-*` authorities. Layout also must not copy those values into a parallel
structural scale merely to make both systems appear numerically unified.

### 7.2 Minimal spacing roles

Gate B may assign exact values to no more than four shared layout roles:

| Role | Responsibility | Example consumers |
| --- | --- | --- |
| Inline gap | Closely related items on one line | About / Now navigation links |
| Cluster gap | Elements that form one semantic group | Display name, place statement |
| Section gap | Distinct groups inside one page region | Identity cluster to secondary context |
| Region gap | Header, Main, and Footer separation | Global document composition |

Required relationships:

```text
Inline gap < Cluster gap < Section gap < Region gap
```

- Values remain effective at 200% text; Gate A does not prescribe their CSS units
  or formulas.
- Page gutter is a responsive layout token, not a fifth generic spacing step.
- A role is not split into `xs/sm/md/lg/xl` aliases without an observed consumer.
- A component-specific gap is rejected when one of these roles expresses the same
  relationship.
- Typography rhythm values are not copied into the layout scale merely to make the
  numbers appear unified.

## 8. Semantic color contract

### 8.1 V1 color model

V1 uses one light, solid-color canvas. Dark Mode, a theme switcher, translucent
surface layers, gradients, and decorative background effects are deferred.

Gate B may select exact values for only these semantic roles:

| Role | Responsibility | Prohibited use |
| --- | --- | --- |
| Canvas | Page background | Creating multiple arbitrary surface levels |
| Text | Primary content and identity | Replacing hierarchy with pure darkness variation |
| Muted | Supporting Meta when hierarchy requires it | Rendering required information faint or disposable |
| Rule | Necessary separators and quiet boundaries | Boxing every region or simulating cards |
| Accent | Focus, current state, and rare orientation cues | Becoming a broad brand fill or the only carrier of meaning |

No additional color role is admitted until a real element cannot use these roles
without changing meaning.

### 8.2 Contrast and meaning

Text-bearing roles are governed by WCAG 2.2 SC 1.4.3 Contrast (Minimum):

- Text, Muted, Accent when used as text, links, and metadata meet at least `4.5:1`
  against Canvas at normal text sizes.
- Large text may use the applicable `3:1` minimum, but Display and Heading are not
  deliberately weakened merely because that exception exists.
- Contrast ratios are evaluated without rounding; a value below the required
  threshold does not pass.

Meaningful non-text boundaries and states are governed by WCAG 2.2 SC 1.4.11
Non-text Contrast:

- A Rule required to identify a component, state, or meaningful boundary meets at
  least `3:1` against adjacent colors.
- Accent used for a focus or other non-text state meets at least `3:1` against the
  adjacent color required to recognize that state.

Across both categories:

- Links remain identifiable without relying on color in both unvisited and visited
  states.
- Focus, hover, current navigation, and freshness do not rely on color alone.
  Underline, outline, weight, text, or structure remains available.
- Muted content remains readable in bright environments and is never used to hide
  required contact or freshness information.
- Forced-colors compatibility is an intended runtime invariant, but Gate B may mark
  it `PASS` only from an actual browser forced-colors environment. When that
  environment is unavailable, Gate B records `UNVERIFIED / DEFERRED`; a semantic
  color inspection is supporting evidence only and must not be reported as a
  forced-colors pass.

### 8.3 Link and focus relationship

- WCAG 2.2 Level AA is the minimum accessibility baseline, including SC 2.4.7
  Focus Visible.
- Elliott.page additionally adopts the Level AAA SC 2.4.13 Focus Appearance
  geometry and contrast requirements as a stronger project invariant; this does
  not reclassify that criterion as Level AA.
- Prose links retain the frozen underline behavior.
- Navigation remains identifiable as links without relying on color in both
  unvisited and visited states. It may omit a persistent underline only when
  another persistent non-color affordance preserves that recognition.
- Hover, focus, and current navigation states remain unambiguous without relying on
  color alone.
- A distinct visited-state treatment is optional. When used, it is limited to the
  styling and observability permitted by the user agent's `:visited` privacy model
  and does not replace or weaken the normal non-color link affordance.
- A focus indicator has an area at least equivalent to a `2 CSS px` perimeter of
  the unfocused component and at least `3:1` contrast between the same pixels in
  focused and unfocused states.
- Focus is not replaced by hover and is never removed without an accessible
  replacement.

## 9. Navigation composition

The primary navigation represents only the active Phase 1 world:

```text
Elliott Bai    About    Now
```

- `Elliott Bai` is a text link to `/`, not an image logo, monogram, or icon.
- About and Now form one destination group distinct from the identity anchor.
- All three destinations remain visible at every required viewport; v1 has no menu
  button, drawer, disclosure, or JavaScript navigation state.
- Navigation stays in normal document flow and does not become sticky on scroll.
- Wide composition may distribute the identity anchor and destination group across
  the frame.
- Narrow composition stacks or wraps those groups without changing their DOM or
  reading order.
- The current route is exposed semantically and visually without relying on color
  alone.
- Navigation consumes frozen Meta typography and does not invent a private scale,
  uppercase treatment, or tracking value.
- No placeholder link appears for Writing, Notes, RSS, or future capability.

Gate B determines the exact wide alignment and narrow wrapping behavior.

## 10. Home identity composition

Home answers whose place this is and how to continue. Its Phase 1 inventory is
page-level; listing an item does not authorize rendering it again in every region.

| Region | Unique responsibility on Home | Content |
| --- | --- | --- |
| Header | Identity anchor and primary orientation | `Elliott Bai` Home link, About, Now |
| Main identity cluster | Primary identity statement | `Elliott Bai` as Display, short place statement |
| Footer | Primary contact path | `hi@elliott.page` |

About and Now are not repeated inside Main, and `hi@elliott.page` is not repeated
inside the identity cluster. Gate B may compose the regions but may not move or
duplicate these responsibilities.

Composition invariants:

- `Elliott Bai` is the only displayed personal name and consumes Display once.
- No Chinese-language personal name, alternate romanization, role label, title,
  credential, or parenthetical identity is added.
- The place statement is Body-level text and remains subordinate to the name.
- The statement describes this space rather than Elliott's profession.
- About and Now remain Header navigation, not Main call-to-action buttons.
- Contact remains a quiet text email link in the Footer.
- The Header Home anchor and Main Display name have distinct semantic
  responsibilities. Main contains exactly one Display instance and does not create
  another name-bearing visual region.
- The identity cluster is aligned to the logical start edge and remains
  content-sized.
- It is not vertically centered, stretched to a full viewport, placed over imagery,
  or presented as a marketing hero.
- No portrait, biography excerpt, social-icon row, availability badge, metrics,
  testimonial, client logo, or skill inventory is introduced.

The final place-statement wording remains a content decision outside Gate A.

## 11. About and Now composition

About and Now prove that the visual system serves reading rather than only the Home
identity moment.

Shared invariants:

- the global navigation remains recognizable and spatially stable;
- the page title consumes frozen Title typography, not Home Display;
- the reading column begins at the same logical alignment used by Home content;
- prose uses the frozen language-specific measure and rhythm;
- contact or footer context does not compete with the page title;
- no page-specific card, banner, or alternate canvas is introduced.

Now additionally places its freshness marker adjacent to the title/content
relationship defined by Typography. The marker remains visible but does not become
a status badge.

Gate B uses representative test copy. It does not authorize final content or create
production routes.

## 12. Responsive behavior

### 12.1 Required widths

The composition specimen is reviewed at minimum at:

```text
320px   narrow / reflow acceptance
768px   intermediate
1440px  wide
```

`320px`, `768px`, and `1440px` are canonical acceptance viewports, not mandated CSS
breakpoints. The composition remains fluid by default. A breakpoint is introduced
only where a content relationship actually fails, is not named after a device, and
is not required to match an acceptance viewport. Gate A defines no breakpoint
tokens.

### 12.2 Reflow invariants

- Page content reflows into one readable vertical sequence at `320px` without
  page-level horizontal scrolling.
- Navigation destinations remain visible without a menu or horizontal scroller.
- DOM and reading order remain meaningful without CSS.
- CSS does not visually reorder identity, navigation, primary content, or contact
  into a sequence that conflicts with focus order.
- Text enlargement to 200% preserves all content, landmarks, link labels, and
  states.
- Existing text-spacing overrides do not clip, overlap, or hide layout regions.
- Long place statements, navigation labels, freshness markers, email addresses,
  and translated prose wrap without fixed-height clipping.
- Wide viewports add breathing room or distribute existing groups; they do not add
  decorative columns or make prose lines longer.
- Orientation changes do not hide content or require a reload.

### 12.3 Content-led fallback

When the preferred wide composition does not fit, the system chooses in order:

1. wrap the related group;
2. stack semantic groups;
3. reduce nonessential layout space within the approved role bounds.

It must not:

1. shrink text below frozen Typography;
2. truncate essential text;
3. hide navigation behind JavaScript;
4. reduce page gutters to zero;
5. introduce horizontal page scrolling.

## 13. Borders, surfaces, and motion

These are admission constraints, not new token systems.

- Quiet rules may separate regions only when spacing and alignment do not provide
  enough structure. Gate A does not prescribe their rendered thickness.
- A Rule is not applied around every section.
- V1 defines no card primitive, elevated surface, shadow token, or radius scale.
- Native control corners do not justify a global radius token.
- No layout transition or entrance animation is required.
- Hover and focus feedback is immediate and does not move surrounding content.
- Essential content and navigation do not depend on animation.
- If future motion is admitted for a real need, it must respect
  `prefers-reduced-motion` and receive its own contract amendment.

## 14. Required Gate B specimen

The composition specimen is a local controlled artifact, not a product page. It
must consume the frozen production typography source while keeping all candidate
layout and color values outside production.

It includes:

- the Home page-level inventory distributed across Header, Main identity cluster,
  and Footer exactly as defined in Section 10;
- an About-shaped English reading surface;
- a Now-shaped Simplified Chinese or mixed-language reading surface with a freshness
  marker;
- primary navigation default, current, visited, hover, and keyboard-focus states;
- short and deliberately long place-statement variants;
- long navigation, freshness, and contact strings;
- Header, Main, and Footer landmarks;
- the allowed semantic color roles;
- an actual browser forced-colors state when a credible environment is available,
  or an explicitly deferred result plus a supporting semantic-color inspection;
- no image, icon, card, shadow, Web Font, or production content.

It is reviewed at:

```text
320px / 768px / 1440px
100% text / 200% text
normal spacing / existing WCAG text-spacing override
keyboard navigation
actual forced colors when available
semantic-color inspection as supporting evidence only
```

Gate B must record:

- page and local overflow;
- actual gutter and frame behavior;
- reading-column measure;
- region and cluster relationships;
- navigation reflow and focus order;
- text and non-text contrast values;
- default and visited links retaining their non-color link affordance, required
  contrast, and full content;
- hover, focus, and current-link recognition without color alone;
- whether any distinct visited treatment stays within browser-permitted `:visited`
  behavior; Gate B does not depend on script or computed-style inspection to prove
  a user's history state;
- actual forced-colors evidence and result, or `UNVERIFIED / DEFERRED` when the
  environment is unavailable; semantic-color inspection is recorded separately
  and never upgraded to a forced-colors pass;
- whether each proposed token has a real consumer;
- any rejected composition and the reason it failed.

Gate B may compare a small number of controlled compositions. It must not grow into
an open-ended gallery of visual styles.

## 15. Decision gates

### Gate A — Layout & Visual Contract (PASS / FROZEN)

Gate A passes only when:

- the six in-scope areas have explicit responsibilities and invariants;
- frozen Phase 1.1 and Phase 1.2 decisions are consumed without contradiction;
- layout and typography spacing ownership is unambiguous;
- semantic color roles and contrast requirements are executable;
- responsive and accessibility failure states are defined;
- speculative component and token systems remain excluded;
- no production implementation has entered the contract.

### Gate B — Composition Specimen (PASS / FROZEN)

Gate B passes only when:

- the same semantic content and typography are used for every candidate;
- selected spacing and color values materially support the intended character;
- Home, About-shaped, and Now-shaped surfaces feel like one place;
- required viewport, enlargement, spacing, focus, contrast, and reflow states pass;
- every selected layout or color token has an observed consumer;
- rejected candidates and evidence boundaries are recorded;
- no candidate artifact enters production.

### Gate C — Production Integration (IN PROGRESS)

Gate C passes only when:

- the selected spatial and color values become the minimum shared production
  source;
- production pages consume frozen Typography without overriding it;
- a minimal production proof consumes the shared visual primitives without
  completing the formal Home surface;
- no formal About or Now route is created;
- production behavior matches the selected specimen;
- the production bundle contains no rejected or speculative visual system;
- canonical `pnpm quality` and substantive review pass.

No production layout or color implementation is authorized before Gate B selects a
composition.

The current Gate C branch promotes only Candidate A's admitted shared consumers:
Canvas, Text, Muted, Accent, Inline, Cluster, Region, page gutter, and frame
maximum. Section and Rule remain unselected. The selected `4rem` page-edge block
inset remains local to `.site-frame`; it is not a shared spacing token.

`BaseLayout.astro` provides the real Header/Main/Footer ownership shell, and the
root route provides only the minimum identity proof needed to validate it. This
does not authorize final Home copy or formal About and Now routes. The selected
specimen imports the production layout source; Control and Candidate B keep only
their historical evaluation overrides.

Local current-host evidence records exact production/specimen frame and identity
geometry at `320`, `480`, `768`, `1024`, and `1440px`; the selected specimen also
passes its complete normal and stress regression matrices. Production link,
current, hover, and keyboard-focus states pass. Forced Colors remains `UNVERIFIED /
DEFERRED`, and independent browser-engine or platform equivalence is not claimed.
The detailed receipt is in `specimens/README.md`.

## 16. Change control

After Phase 1.3 freezes, this contract reopens only for:

- a real usability, readability, reflow, contrast, or focus defect;
- an incorrect spatial or color invariant;
- a new active surface that cannot consume the existing primitives;
- a clear product requirement that changes page composition;
- an incompatible platform or browser change.

It does not reopen because a visual trend appears, another personal site uses a
different grid, the page could look more branded, or additional tokens would make
the system appear more complete.

## 17. Standards references

- [WCAG 2.2 — Understanding Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 — Understanding Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2 — Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [WCAG 2.2 — Understanding Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)
- [WCAG 2.2 — Understanding Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)
