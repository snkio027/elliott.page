# Elliott.page Typography System v1.0

**Version:** 1.0

**Status:** GATE C REMOTE GATE PENDING — Phase 1.2: Typography System

**Evidence:** LOCAL IMPLEMENTATION COMPLETE / LOCAL EVIDENCE PASS

**Gate A:** PASS / FROZEN — Typography Contract

**Gate B:** PASS / FROZEN — Native System Font Stack selected for v1

**Gate C:** REMOTE GATE PENDING — Implementation Readiness

**Depends on:** `information-and-page-semantics.md`

**Scope:** English, Simplified Chinese, mixed-language prose, and code

---

## 1. Purpose

This document defines the typographic contract for Elliott.page before a font
family, visual layout, or component style is selected.

It turns the product direction into primitives that later Design Tokens and page
implementations can consume without inventing local rules. The intended character
remains:

```text
Quiet
Editorial
Personal
Timeless
Content-first
```

Hierarchy must come from semantic role, scale, weight, line height, measure, and
rhythm. Typography must not depend on decoration to explain the document.

## 2. Phase boundary

Phase 1.2 defines:

- text roles;
- scale relationships;
- English, Simplified Chinese, and mixed-script behavior;
- reading rhythm and measure;
- code, quotation, emphasis, and link treatment;
- font-delivery constraints;
- the specimen and verification gate for the eventual font decision.

Phase 1.2 does not create:

- a complete page design;
- a color or theme system;
- a component library;
- animation;
- Writing or Notes surfaces;
- Dark Mode;
- final Home, About, or Now copy.

No CSS, font asset, or page implementation is authorized merely because it appears
as an example in this contract. Gate C authorizes only the shared typography
tokens and primitives, their import through the minimal base layout, and the
baseline identity proof recorded in Section 14.

## 3. Frozen inputs

The following decisions come from Phase 1.1 and are not reopened here:

- the displayed personal name is `Elliott Bai` only;
- Home is an identity root rather than a feed;
- About is durable prose;
- Now is short, timestamped prose;
- Phase 1 navigation contains the name, About, and Now;
- a page or content item may naturally be English or Simplified Chinese;
- there is no site-wide language switch;
- heading levels express document structure, not desired visual size;
- local `lang` attributes identify genuine mixed-language fragments.

Typography styles semantic HTML. It does not change HTML semantics to obtain a
particular appearance.

## 4. System principles

### 4.1 Role before family

Every text element consumes a named typographic role. Components must not invent
font families, arbitrary sizes, weights, tracking, or line heights.

### 4.2 Reading before branding

Body prose is the calibration point. Display text may establish identity, but it
must not make sustained reading secondary.

### 4.3 Language-aware, not language-mirrored

Latin and CJK may require different fallback stacks and line heights. They must
still share one hierarchy and one rhythm system.

### 4.4 Relative and resilient

Type sizes use relative units, line heights are unitless, and layouts must survive
font failure, user font overrides, 200% text enlargement, and text-spacing
overrides.

### 4.5 Minimal delivery

The default delivery baseline is system-first. A web font is admitted only after
the contract has been tested independently of font branding and the font provides
a material benefit within the loading budget.

## 5. Text roles

The system has seven roles. A role describes responsibility, not an HTML element or
component name.

| Role | Responsibility | Typical surfaces | Invariants |
| --- | --- | --- | --- |
| Display | Establish identity at the highest visual level | Home identity heading | Rare, restrained, never used merely to make text large |
| Heading | Expose document hierarchy and entry points | Page title, `h2`–`h4` | Visual level follows semantic level; no skipped hierarchy for appearance |
| Body | Carry sustained reading | Paragraphs, lists, About, Now, future Writing and Notes | Highest legibility, stable rhythm, language-aware line height |
| Meta | Provide orientation and supporting facts | Navigation, dates, freshness markers, captions, labels | Compact but never cryptic or too small to read |
| Code | Preserve source characters and alignment | Inline code, code blocks | Monospaced, distinguishable glyphs, no discretionary ligatures |
| Quote | Separate quoted voice from surrounding prose | Blockquotes and citations | Body-level readability; no ornamental oversized quotation marks |
| Link | Mark navigable text inside another role | Prose, navigation, citations | Inherits surrounding metrics; remains identifiable without color alone |

Display is not a synonym for `h1`. The Home `h1` may consume Display, while an
About or Now `h1` consumes the page-title level of Heading.

Quote and Link are modifier roles. They inherit the size and language context of
their surrounding role unless this contract explicitly says otherwise.

## 6. Scale contract

### 6.1 Root and responsive behavior

- The root size respects the browser default; it is not reset to a fixed pixel
  value.
- `1rem` is the minimum normal Body size at the narrow endpoint.
- Sizes may interpolate fluidly between the narrow and wide endpoints.
- Fluid formulas must combine relative units with viewport input; a type size must
  never be defined by viewport units alone.
- The narrow endpoint applies by `20rem` viewport width or earlier.
- The wide endpoint is reached by `75rem` viewport width and does not continue
  growing afterward.
- Browser zoom and user text-size preferences must still enlarge every role.

The implementation may use `clamp()` or equivalent shared tokens, but it must
preserve the following endpoints and ordering.

### 6.2 Type levels

| Token | Role / use | Narrow size | Wide size | Line height | Default weight | Latin tracking |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `type-display` | Home identity | `2.5rem` | `4rem` | `1.05` | `600` | `-0.03em` |
| `type-title` | Page or article `h1` | `2rem` | `3rem` | `1.12` | `600` | `-0.02em` |
| `type-heading-2` | `h2` | `1.5rem` | `1.875rem` | `1.2` | `600` | `-0.015em` |
| `type-heading-3` | `h3` | `1.25rem` | `1.5rem` | `1.3` | `600` | `-0.01em` |
| `type-heading-4` | `h4` | `1.0625rem` | `1.125rem` | `1.4` | `600` | `0` |
| `type-body` | Prose and lists | `1rem` | `1.125rem` | language-specific | `400` | `0` |
| `type-meta` | Navigation and supporting text | `0.875rem` | `0.9375rem` | `1.5` | `500` | `0.01em` |
| `type-code` | Code blocks | `0.875rem` | `0.9375rem` | `1.6` | `400` | `0` |

Body line height is `1.65` for English-dominant prose and `1.75` for Simplified
Chinese-dominant prose. A mixed-language fragment does not change the line height
of a single line; the page or content item's primary language selects the Body line
height.

`type-quote` aliases `type-body`. Inline code uses `0.9em` relative to the
surrounding role rather than forcing `type-code` into prose. Links inherit the
complete type level of their context.

### 6.3 Weight and style

The first implementation needs only two semantic weights:

```text
Regular   400   Body, Quote, Code
Strong    600   Display, Heading, Meta, strong emphasis
```

- A selected font may map these values to the nearest genuine faces only when the
  specimen proves that the distinction remains clear.
- The system must not rely on synthetic bold or synthetic oblique faces to convey
  meaning.
- English `<em>` uses a genuine italic or oblique face when one is selected.
- Simplified Chinese `<em>` uses a filled emphasis dot below each emphasized glyph
  for short inline emphasis. It must not synthetically slant CJK glyphs.
- If emphasis marks are unsupported, the fallback uses a dotted underline rather
  than weight alone, keeping `<em>`, `<strong>`, and Link visually distinct.
- `<strong>` remains visually stronger than Body in both scripts.
- All-uppercase styling is not applied to ordinary labels or navigation.

## 7. English, Simplified Chinese, and mixed text

### 7.1 Font slots

The contract defines slots before names:

```text
font-display-latin
font-text-latin
font-text-cjk
font-meta
font-code
```

Separate Latin and CJK stacks are allowed and expected when their metrics require
it. They must be evaluated as a pair rather than as isolated fonts.

The final stacks must provide:

- real glyph coverage for the declared language;
- compatible perceived size and baseline alignment;
- clear Regular and Strong states;
- legible punctuation and numerals;
- stable fallback when the preferred face is unavailable.

### 7.2 Language behavior

- The document has an accurate `lang` value.
- A genuine inline language change uses a local `lang` attribute.
- A local language span does not exist only to trigger a visual font change.
- Chinese prose uses normal character spacing; global tracking is not added to CJK
  Body text.
- Latin negative tracking in the scale table applies only to Latin-dominant Display
  and Heading text.
- Mixed Latin words and numerals retain proportional Latin forms while aligning
  with the surrounding CJK line box.
- Spacing between Latin and CJK is an editorial decision in source content. CSS or
  JavaScript does not insert spaces automatically.
- Simplified Chinese line breaking follows the document language and native browser
  behavior. V1 does not ship a JavaScript punctuation or line-breaking engine.
- Body text is aligned to the logical start edge. Full justification is not used in
  V1.
- Long URLs and unbroken identifiers may wrap; ordinary words and CJK phrases must
  not receive destructive `word-break` behavior.

English italic and Chinese emphasis are different visual conventions for the same
semantic `<em>` element. The content model remains language-neutral.

## 8. Reading rhythm

Typography owns vertical relationships between text blocks. These values are
expressed in Body line boxes (`B`) so they scale with user settings and the selected
language.

| Relationship | Space |
| --- | ---: |
| Consecutive paragraphs | `0.8B` |
| Paragraph to list, or list to paragraph | `1B` |
| Consecutive list items | `0.3B` |
| Nested list from its parent item | `0.25B` |
| `h2` before / after | `2.5B` / `0.75B` |
| `h3` before / after | `2B` / `0.65B` |
| `h4` before / after | `1.5B` / `0.5B` |
| Blockquote before / after | `1.25B` |
| Code block before / after | `1.25B` |
| Page title to introductory prose | `1B` |
| Meta line to its title or content | `0.5B` |
| Quote body to citation | `0.5B` |

Additional invariants:

- English and Chinese Body paragraphs use block spacing and no first-line indent in
  V1.
- The first text child does not create leading margin, and the last does not create
  trailing margin.
- `<br>` is never inserted to manufacture vertical space.
- Headings remain closer to the content they introduce than to the preceding
  section.
- A heading stranded at the bottom of a viewport is a layout defect when it can be
  avoided without fragmenting the document.
- Emphasis marks, ruby, superscripts, and inline code must not create unexplained
  one-off line heights.

These relationships are typographic flow tokens. They do not define the future
global spacing scale, page gutters, or layout grid.

## 9. Reading measure

Measure is a target interval, not a fixed container width.

| Primary content language | Accepted measure | Target |
| --- | ---: | ---: |
| English-dominant prose | `58–72ch` | about `66ch` |
| Simplified Chinese-dominant prose | `28–36ic` | about `32ic` |
| Mixed-language prose | interval of the page's primary language | same as primary language |

`ch` and `ic` are implementation starting points, not promises of an exact visible
character count. The final container is verified against real specimen text and
the selected fallback metrics.

- On a narrow viewport, measure yields to available inline space and page gutters.
- Prose never creates horizontal page scrolling at 200% enlargement.
- Page and article titles target at most `24ch` for Latin or `16ic` for CJK before
  natural wrapping; manual `<br>` elements are not used to art-direct a title.
- Navigation and short Meta text remain content-sized rather than inheriting prose
  measure.
- Code blocks may exceed prose measure and scroll within their own region. They do
  not widen the page.
- Tables and other future structured content require their own contract and do not
  redefine Body measure.

## 10. Role-specific behavior

### 10.1 Display and Heading

- Display appears once on the identity surface.
- Page hierarchy remains recognizable without color, borders, or animation.
- A level is not made uppercase or letter-spaced merely to appear more important.
- Headings wrap at natural text boundaries and never truncate essential text.
- Heading links inherit the heading level; they do not resemble Body links by
  shrinking or changing family.

### 10.2 Meta

- Meta is concise, but it is not visually disposable.
- Dates use human-readable text on the page and machine-readable `<time>` values.
- Navigation consumes Meta metrics while retaining navigation semantics.
- Long labels wrap instead of being clipped or reduced below `type-meta`.
- Tabular numerals may be enabled for dates or aligned numeric data only when the
  selected font provides them and the use is genuinely tabular.

### 10.3 Link

- Prose links are underlined by default and remain identifiable without color.
- Underline thickness and offset are calibrated after font selection so they clear
  Latin descenders and CJK punctuation.
- Navigation links may omit a persistent underline only when hover, focus, current,
  and visited states remain unambiguous without relying on color alone.
- Link text inherits size, family, weight, and line height from its surrounding
  role.
- A link does not become bold solely because it is interactive.

### 10.4 Quote

- A blockquote uses Body size and language behavior.
- Entire quotations are not italicized; this would reduce long-form readability and
  produce inappropriate synthetic CJK forms.
- A citation consumes Meta.
- Quotation marks belong to the authored content. Decorative giant quotation marks
  are outside the V1 contract.
- Indentation or a later color token may distinguish a quote, but neither may reduce
  its readable measure below a practical line length.

### 10.5 Code

- The Code slot must clearly distinguish `0/O`, `1/l/I`, braces, punctuation, and
  common operators.
- Discretionary and contextual code ligatures are disabled.
- Inline code uses `0.9em` and inherits the surrounding line height.
- Code blocks use `type-code`, a `1.6` line height, preserved whitespace, and a
  tab size of two spaces.
- Long code scrolls horizontally inside the code block. It does not force the page
  wider and is not wrapped in a way that changes source meaning.
- Line numbers are omitted unless a real publishing need proves they improve
  reference or discussion.

## 11. Font selection and loading policy

Font family selection is the last Phase 1.2 decision. It occurs after the same
specimen has validated roles, scale, rhythm, measure, and language behavior.

### 11.1 Baseline

The first specimen uses system fonts and generic fallbacks. This establishes a
zero-font-byte control and prevents a branded typeface from hiding contract defects.

No third-party font request is permitted at runtime.

### 11.2 Admission test for a web font

A self-hosted font is admitted only when all of the following are true:

1. side-by-side specimens show a material reading or identity benefit;
2. English, Simplified Chinese, and mixed text remain coherent as a pair;
3. source, version, license, and redistribution rights are recorded;
4. only used weights, styles, axes, and language subsets are shipped;
5. font failure preserves hierarchy, measure, and access to all content;
6. the initial visible font transfer is at most `100 KiB` compressed;
7. total font transfer for a normal language-specific page is at most `250 KiB`
   compressed;
8. future content cannot silently render missing-glyph boxes because of an unsafe
   static subset.

If Simplified Chinese coverage cannot satisfy the payload and coverage constraints,
the CJK slot remains system-first. A Latin web font does not require a CJK web font.

### 11.3 Loading behavior

If a web font passes the admission test:

- assets are self-hosted, immutable, versioned, and served as WOFF2;
- every `@font-face` declares an explicit `font-display` policy;
- `block` and an implicit `auto` policy are prohibited;
- critical text defaults to immediate fallback rendering with `swap`;
- `optional` is allowed only for a nonessential face whose absence does not change
  hierarchy;
- at most one demonstrably critical face is preloaded;
- broad CJK assets are not preloaded by default;
- fallback metrics are matched with `size-adjust`, `ascent-override`,
  `descent-override`, and `line-gap-override` when supported and measured;
- real faces cover every used semantic weight and style before font synthesis is
  disabled;
- font loading must not change specimen line breaks or block height after first
  render at the required viewports.

The loading target is visible text on first paint, no avoidable invisible-text
period, and no measurable typography-induced layout shift in the acceptance
specimen.

## 12. Accessibility and resilience

Typography passes only when:

- text can be enlarged to 200% without loss of content or functionality;
- prose reflows without horizontal page scrolling at a `320px` CSS viewport;
- user overrides of line height `1.5`, paragraph spacing `2em`, letter spacing
  `0.12em`, and word spacing `0.16em` do not clip, overlap, or hide content;
- no text container depends on a fixed block height;
- headings, links, Meta, inline code, and controls remain readable with a wider user
  font;
- custom-font failure is a supported state rather than a degraded accident;
- text selection, copy, browser translation, and reader modes continue to operate on
  real text.

The WCAG spacing values above are override-resilience tests. They are not mandated
author defaults.

## 13. Required specimen

The Phase 1.2 specimen is a test artifact, not a product page. It must render the
same content under the system-first control and every proposed font strategy.

It includes:

- `Elliott Bai` as Display;
- a page title and `h2` through `h4`;
- an English Body passage long enough to expose measure and rhythm;
- a Simplified Chinese Body passage with no personal name;
- a mixed Chinese and Latin paragraph with numerals and punctuation;
- navigation, a date, a freshness marker, and a caption as Meta;
- regular, `<strong>`, and language-appropriate `<em>` states;
- prose links, a heading link, and navigation links;
- ordered, unordered, and nested lists;
- a blockquote with citation;
- inline code and a code block containing ambiguous glyphs;
- a long URL and a long unbroken identifier;
- intentional font-load failure.

It is reviewed at minimum at:

```text
320px   narrow mobile
768px   intermediate
1440px  wide desktop

100% browser zoom
200% browser zoom
normal font loading
blocked custom font loading
WCAG text-spacing override
```

The specimen must use real Simplified Chinese punctuation and mixed-script lines.
Lorem ipsum or repeated placeholder glyphs are not sufficient evidence.

## 14. Decision gates

### Gate A — Contract (PASS / FROZEN)

- all seven roles have explicit responsibilities and inheritance rules;
- scale endpoints and language-specific line heights are approved;
- rhythm and measure intervals are approved;
- accessibility and loading constraints are executable;
- no page-layout or color decision has entered the contract.

### Gate B — Font family (PASS / FROZEN)

- the system-first specimen is the control;
- every candidate uses the same content, metrics, and viewports;
- Latin and CJK are judged together;
- the chosen stack passes fallback, licensing, and payload checks;
- a no-web-font decision is considered a complete and valid result.

The Native System Font Stack is selected for v1 based on the controlled current-host
evaluation in the local macOS Chrome/Chromium environment. Geist and Inter are
rejected for v1; Newsreader + Geist is deferred. This is not a claim of cross-platform
typography equivalence. Windows, Linux, iOS, Android, and independent browser-engine
behavior remain unverified and are deferred until a real need or defect appears.

### Gate C — Implementation readiness (REMOTE GATE PENDING)

- the selected values can become shared Design Tokens without component-specific
  exceptions;
- the required specimen passes all viewport, zoom, spacing, and failure states;
- no production font asset or style exists outside the selected stack;
- Phase 1.3 can consume the contract without reopening semantic hierarchy.

The implementation authority is deliberately narrow:

- `src/styles/tokens.css` contains the frozen family slots, scale, line-height,
  weight, tracking, measure, and typographic-flow values;
- `src/styles/typography.css` maps the seven roles and language behavior to reusable
  primitives without page- or component-specific scale exceptions;
- `src/layouts/BaseLayout.astro` imports that shared source once and preserves
  explicit document language;
- `src/pages/index.astro` is only the smallest semantic production proof: one
  `Elliott Bai` identity heading consuming Display inside a type region;
- `specimens/typography-system.html` imports the same production tokens and
  primitives, while `specimens/typography-system.css` now contains only the neutral
  experiment shell, controls, annotations, and stress overrides;
- the static production build contains no `@font-face`, WOFF2 asset, or
  rejected/deferred candidate family reference.

The shared implementation reproduced the frozen control geometry at `320px`,
`768px`, and `1440px`. At `320px`, 200% root text, the WCAG text-spacing override,
and their combined state produced no page-level horizontal overflow; long code
remained locally scrollable. The candidate routes and Geist delayed-load failure
also remained reproducible after the specimen began consuming production CSS.

Gate C implementation and local evidence are complete within the explicit
current-host evidence boundary. The local canonical `pnpm quality` entrypoint did
not complete because the execution environment's pnpm shim attempted an unsafe
`node_modules` reconstruction and TTY protection stopped it. Its four constituent
checks were run independently and passed without mutating the dependency tree.

Gate C remains open until the branch is reviewed through a pull request and the
Required `Delivery / Quality` check executes canonical `pnpm quality` successfully
in clean GitHub CI. Phase 1.2 is therefore not yet frozen, and Phase 1.3 must not
consume this implementation as final authority until that remote gate passes.

## 15. Change control

After Phase 1.2 freezes, this contract reopens only for:

- a real readability or accessibility defect;
- a language or glyph-coverage failure;
- a demonstrated font-loading or layout-shift problem;
- a new content form that cannot consume the existing roles;
- an incompatible platform or browser change.

It does not reopen because a fashionable font appears, a component would look more
distinct with a private scale, or a page mockup prefers different local spacing.

## 16. Standards references

- [WCAG 2.2 — Understanding Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
- [WCAG 2.2 — Understanding Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [CSS Fonts Module Level 4](https://www.w3.org/TR/css-fonts-4/)
- [CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/)
- [Requirements for Chinese Text Layout](https://www.w3.org/International/clreq/)
- [CSS Text Decoration Module Level 4](https://www.w3.org/TR/css-text-decor-4/)
