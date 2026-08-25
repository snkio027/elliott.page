# Elliott.page Writing Surface Contract v1.0

**Version:** 1.0

**Status:** IN PROGRESS — Phase 2.2: Writing Surface

**Phase 2:** IN PROGRESS — Publishing

**Phase 2.1:** PASS / FROZEN — Content Semantics & URL Contract

**Gate A:** PASS / FROZEN — Writing Surface Contract

**Gate B:** IN PROGRESS — Candidate Implementation + Public Content

**Gate B authorization:** AUTHORIZED — Gate A merged to protected `main` at
`a07cff638a00844df3d51d831505acd5dae0b6e1`

**Gate C:** NOT STARTED / NOT AUTHORIZED — Runtime, Accessibility & URL
Validation

**Writing production activation:** NOT AUTHORIZED

**Notes surface:** NOT AUTHORIZED

**Gate B candidate:** FIRST WRITING / INDEX / DETAIL / NAVIGATION IMPLEMENTATION IN
PROGRESS — PUBLICATION APPROVAL PENDING

**Gate A evidence:** LOCAL `pnpm quality` PASS / REQUIRED `Delivery / Quality`
PASS / SUBSTANTIVE DELTA REVIEW PASS

**Lifecycle closure:** The final status-only revision must pass Required
`Delivery / Quality` and status-diff confirmation before protected-main merge.

**Depends on:** `information-and-page-semantics.md`, `typography.md`,
`layout-and-visual-composition.md`, `identity-surfaces.md`,
`content-semantics-and-url.md`

**Frozen implementation input:** protected `main` revision
`4989086eb24fac5e092553a11accb4eb650fbcee`

**Scope:** `/writing/` and `/writing/<stable-id>/`

---

## 1. Purpose

Phase 2.1 answers:

> What is a valid Writing or Note content asset?

Phase 2.2 answers a different question:

> How does valid, eligible, and human-approved Writing become a public Web
> surface?

The required chain is:

```text
Valid Writing asset
        ↓
Public eligibility
        ↓
Human publication approval
        ↓
Writing index + detail route + navigation
        ↓
Runtime and permanent-URL evidence
```

This contract defines surface activation, route identity, index inventory,
article ownership, language and date presentation, publication approval, and the
runtime acceptance boundary.

It does not reopen the content Schema, redesign Phase 1, or authorize Notes.

## 2. Frozen inputs and authority

Phase 2.2 consumes these authorities as read-only inputs:

| Authority | Frozen responsibility |
| --- | --- |
| Phase 1.1 | Writing meaning, route reservation, per-item language, navigation describes reality, native document semantics |
| Phase 1.2 | typography roles, reading measure, prose rhythm, link affordance, CJK behavior |
| Phase 1.3 | page shell, frame, gutter, structural spacing, semantic colors, focus and current-state behavior |
| Phase 1.4 | active Identity routes, Header/Main/Footer ownership, primary navigation, contact ownership, exact-revision publication approval model |
| Phase 2.1 Gate A | Writing editorial commitment, metadata meaning, stable identity, permanent URLs, draft and date semantics |
| Phase 2.1 Gate B | executable schemas, canonical GFM AST validation, raw filename identity, public eligibility, ordering and path primitives |

Phase 2.2 must consume the Phase 2.1 Writing collection and primitives. It must not
create a second Schema, date parser, draft filter, stable-ID algorithm, Markdown
validator, or ordering implementation in the page layer.

If implementation proves a Phase 2.1 invariant incorrect or impossible, work stops
and records a contract defect. Page convenience is not authority to reinterpret
the frozen content model.

## 3. Phase and Gate A boundary

Gate A may change only:

- this Writing Surface Contract;
- the README authority link and lifecycle summary required to locate it.

Gate A does not create or modify:

- `src/content.config.ts` or `src/content/content-contract.ts`;
- Writing or Notes Markdown;
- `/writing/`, `/notes/`, or any detail route;
- production navigation, layout, typography, colors, or components;
- fixtures, scripts, dependencies, or test infrastructure.

Phase 2.2 does not authorize:

- a Notes surface or Notes navigation;
- RSS, sitemap expansion, Open Graph expansion, or canonical-link infrastructure;
- tags, topics, categories, series, related content, or backlinks;
- cover images, reading time, generated excerpts, featured state, or pagination;
- search, comments, newsletter, CMS, or authoring CLI;
- a new design system, cards, shadows, radii, motion, or Dark Mode.

> Gate A defines the public interface. It does not implement the interface.

## 4. Three distinct publication states

Writing activation depends on three states that must not be collapsed:

### 4.1 Valid

A valid Writing asset passes every Phase 2.1 content rule:

- strict Writing metadata;
- raw stable-ID and flat-path validation;
- strict date-only and `updated >= date` validation;
- canonical GFM body, raw-HTML, and heading oracles;
- unknown-field and malformed-source fail-closed behavior.

Validity says the repository asset is structurally trustworthy. It does not say
that the item is public.

### 4.2 Eligible

An eligible Writing is valid and has:

```yaml
draft: false
```

Eligibility is source-controlled and independent of the wall clock. It allows the
surface implementation to include the item in public ordering and route
generation. It is not publication approval.

### 4.3 Approved

An approved Writing has either:

- explicit human authorization from Elliott for the exact candidate revision,
  required for first publication or changed approval-covered content; or
- carried approval from an earlier public revision whose approval-covered content
  is proven unchanged under Section 12.

Schema success, `draft: false`, Agent review, CI success, and a rendered preview do
not imply approval.

An eligible but not-yet-approved Writing may exist on the non-production Gate B
candidate. `draft` expresses source-controlled public eligibility only; it does
not encode human approval.

Gate B cannot pass, Gate C cannot start, and the candidate cannot merge while any
eligible Writing lacks either explicit current-revision approval or valid approval
continuity under Section 12. There is no repository approval flag, database, or
speculative workflow metadata.

## 5. Atomic surface activation

Writing is inactive while it has no approved public inventory:

```text
0 eligible + approved Writing
→ no /writing/ production route
→ no /writing/<stable-id>/ production route
→ no Writing item in primary navigation
```

The first activation candidate must contain at least one valid, eligible, and
approved Writing. It activates the complete public surface atomically:

```text
>= 1 eligible + approved Writing
        +
/writing/ index
        +
/writing/<stable-id>/ detail route
        +
Writing primary-navigation destination
        ↓
one reviewed candidate revision
```

The first public state must not contain:

- an empty index or `Nothing here yet` placeholder;
- a Writing navigation item whose index does not exist;
- an index item whose detail route does not exist;
- a detail route absent from the index;
- a draft route, disabled link, placeholder article, or evaluation copy;
- a Notes link or route.

An empty Writing collection remains valid infrastructure before the surface is
implemented. Once the Writing surface is active, zero eligible entries is a
surface-integrity failure, not authorization to publish an empty index or silently
remove the navigation destination.

The branch may be incomplete during development. Atomicity applies to the exact
candidate approved by Gate B and Gate C before protected-main merge.

## 6. Lifecycle and evidence binding

The required lifecycle is:

```text
Gate A contract merge
        ↓
Gate B implementation + real Writing on one candidate branch
        ↓
substantive implementation review
        ↓
Elliott approves exact public Writing revision
        ↓
Gate B PASS
        ↓
Gate C validates the same candidate build
        ↓
Gate C PASS
        ↓
status-only lifecycle closure
        ↓
squash merge to protected main
        ↓
automatic production deployment
```

Gate B PASS authorizes Gate C only. It does not authorize merge, deployment, or
normal production activation.

Any later change to Writing content, metadata, route behavior, navigation,
rendering, or styles invalidates the affected evidence and requires the relevant
review again. A strictly status-only closure revision may inherit prior evidence
only when its diff is audited to contain no content or implementation change and
Required `Delivery / Quality` passes on that revision.

No staging environment or public Preview URL is required. Gate C may validate the
candidate static build in a production-equivalent local runtime.

## 7. Route identity and URL contract

The public route model is exact:

```text
/writing/
/writing/<stable-id>/
```

The detail route consumes the Phase 2.1 identity without reinterpretation:

```text
src/content/writing/system-boundaries.md
        ↓
stable ID: system-boundaries
        ↓
/writing/system-boundaries/
```

Required invariants:

- the raw validated file stem remains the only detail-route identity;
- the authored title never becomes a slug authority;
- title, description, body, language, or date changes do not change the URL;
- internal index links use the exact canonical trailing-slash path;
- every eligible entry produces exactly one detail route;
- no draft entry produces a detail route or public output artifact;
- an unknown stable ID returns the normal terminal 404;
- route generation is static and does not require client JavaScript.

Phase 2.2 does not add an authored `slug`, redirect framework, canonical metadata
field, or alternate dated URL.

Changing or removing an already public stable ID remains governed by Phase 2.1
post-publication immutability. It is not a routine Phase 2.2 page edit.

## 8. Writing index contract

`/writing/` is an index of public Writing, not a feed dashboard or archive system.

Its required inventory is:

```text
Writing                         single H1

ordered public entries
└── authored title             linked H2
    publication date           always visible
    authored description       visible only when present
```

The index uses the Phase 2.1 public-entry primitive:

```text
valid entries
→ draft:false only
→ date DESC
→ same-date stable ID ASCII ASC
```

Required index semantics:

- the document language is `en` and the visible page heading is `Writing`;
- the document title is `Writing — Elliott.page`;
- the metadata description is concise authored surface copy approved on the Gate
  B candidate; it is not synthesized from an article;
- entries use one native list in the canonical public order;
- each item title is an `h2` containing the canonical detail link;
- each item carries its authored `lang` on the smallest complete item container;
- the publication date is a visible `<time datetime="YYYY-MM-DD">`;
- a present Writing description is shown as authored; absence produces no empty
  element and no generated excerpt;
- every index link resolves to its corresponding detail route;
- the index contains all eligible entries and no draft entries.

Index date presentation is local to each Writing item. A human-readable lexical
date derives its locale from the entry's authored language: `en` uses an English
locale and `zh-CN` uses a Simplified Chinese locale. A language-neutral numeric
date is also valid. If visible lexical date text deliberately uses another
language, that text carries its correct local `lang` rather than inheriting the
item language incorrectly.

Every presentation derives from the authored date-only value with explicit UTC
handling and renders the same calendar day in every build environment.

The v1 index has no introductory essay, item number, cover, card, category,
reading-time estimate, update badge, year grouping, pagination, or alternate sort.
All eligible Writing appears in one ordered surface until real scale proves a new
consumer.

## 9. Writing detail contract

`/writing/<stable-id>/` is a standalone reading surface.

Its ownership is:

```text
Route / article header
├── H1 = authored title
├── publication date
└── updated date, only when meaningfully distinct

Document head
├── <title> = <authored title> — Elliott.page
├── lang = authored item language
└── metadata description, only when authored

Markdown body
└── H2+ document structure and prose
```

Required detail semantics:

- the route renders exactly one primary `h1`, sourced from frontmatter `title`;
- the Markdown body is rendered through the validated Content Layer and remains
  the owner of H2+ structure;
- the outer document `<html lang>` is exactly the Writing `lang`;
- persistent English primary navigation remains locally marked `lang="en"` on a
  `zh-CN` article;
- publication `date` is always visible and uses
  `<time datetime="YYYY-MM-DD">`;
- `updated` is visible only when it exists and differs from `date`;
- an equal `updated` and `date` does not render a duplicate update line;
- the English labels are `Published` and `Updated`;
- the Simplified Chinese labels are `发布于` and `更新于`;
- visible dates derive their locale from the authored item language, use explicit
  UTC handling, and preserve the authored calendar day;
- an authored description supplies `<meta name="description">` and the index
  summary, but is not duplicated as a visible detail-page lead in v1;
- when description is absent, no excerpt or metadata description is inferred from
  the body;
- article prose consumes the frozen reading measure, type roles, rhythm, links,
  code, quotes, and CJK behavior without new typography values.

The detail surface adds no breadcrumb, author byline, profile block, table of
contents, share controls, related content, comments, previous/next navigation, or
reading-time estimate in v1. Primary navigation already provides a path back to
the Writing index.

## 10. Primary navigation activation

After the Writing index, every eligible detail route, and approved public content
are real, primary navigation becomes:

```text
Elliott Bai    Writing    About    Now
```

Required invariants:

- `Elliott Bai` continues to link to `/` and remains the identity anchor;
- Writing links to the real `/writing/` index;
- About and Now preserve their existing real destinations;
- Notes, RSS, and future capabilities remain absent;
- navigation remains a visible native `<nav>` without menu disclosure;
- DOM and focus order remain Elliott Bai → Writing → About → Now;
- the navigation region remains English, including on `zh-CN` Writing;
- index and detail pages expose one unambiguous current Writing destination;
- `/writing/` uses `aria-current="page"` on the Writing link;
- `/writing/<stable-id>/` uses `aria-current="location"` on the Writing link so the
  section is current without falsely claiming that the index link is the exact
  detail page;
- both current values consume the same frozen non-color current-state treatment;
- default, visited, hover, focus, and current states retain frozen link behavior.

Supporting `aria-current="location"` is a semantic extension of an existing
current-state consumer, not authorization to redesign its typography, color,
weight, or decoration.

Navigation activation and route activation occur on the same Gate B candidate.
No intermediate protected-main revision may expose one without the other.

## 11. Layout and visual consumption

Writing consumes the frozen production shell:

```text
Header  → active primary navigation
Main    → Writing index or one article
Footer  → hi@elliott.page
```

Required constraints:

- every route has one Header, Main, and Footer;
- Footer remains the sole primary contact owner;
- Main does not duplicate the primary navigation or contact path;
- index and detail content use the frozen frame, gutter, Region/Cluster spacing,
  Canvas/Text/Muted/Accent colors, and typography primitives;
- item metadata may use the frozen Meta role;
- article body uses the frozen prose implementation;
- narrow screens reflow through normal document flow rather than hiding
  navigation, reducing frozen type sizes, or adding a menu;
- no new global token, card system, surface color, divider role, or component
  library is admitted without a demonstrated production consumer.

Gate B may add the minimum local composition needed for the real index and article
header. Local rules must consume existing semantic tokens and must not become a
speculative Publishing design system.

## 12. Publication approval

The first public Writing is a product asset, not a fixture. Its exact public copy
requires Elliott's explicit approval on the implementation candidate.

Approval covers:

- stable ID and public route identity;
- title and optional description;
- publication and updated dates;
- language;
- the complete Markdown body;
- Writing-index metadata description and any new visible surface wording.

A clear approval in the PR conversation or review record is sufficient. No
approval file, schema field, CI job, CODEOWNERS rule, or external database is
introduced.

First-publication approval must not be inferred from:

- `draft: false`;
- successful schema or AST validation;
- Local or Required Quality;
- Agent editorial judgment;
- the existence of a preview or built route;
- approval of another revision without the continuity evidence below.

Gate B may set `draft: false` and implement the complete candidate before approval.
This allows Elliott to approve the exact eligible content and implementation
revision that Gate C will validate. Gate B cannot pass and Gate C cannot start
until every first-publication Writing on that candidate has explicit approval.

For an already-public Writing, approval carries forward to a later candidate only
when an audited diff proves all approval-covered content remains unchanged:

- stable ID;
- `title` and the presence/value of `description`;
- `date`, the presence/value of `updated`, and `lang`;
- the complete authored Markdown body.

Unrelated repository, route, style, tooling, Identity, Notes, or Open Web changes
do not invalidate approval for an unchanged Writing. The audit binds the prior
approval evidence to the unchanged content in the new candidate; it does not infer
approval from CI or create an approval field.

Any change to an approval-covered field, stable ID, or Markdown body invalidates
that Writing's carried approval and requires new explicit approval. A change to
the Writing-index metadata description or other visible surface wording requires
new approval for that surface copy without forcing approval renewal for unchanged
articles.

A strictly status-only lifecycle commit may inherit article and surface-copy
approval only under the evidence rule in Section 6.

## 13. Gate B implementation boundary

After Gate A passes, closes, and merges to protected `main`, Gate B may create one
candidate containing:

- at least one real Writing Markdown asset intended for first publication;
- the `/writing/` index route;
- static `/writing/<stable-id>/` detail generation;
- atomic Writing navigation activation;
- the minimum index/article composition and surface-specific validation;
- focused route, eligibility, language, date, URL, and activation tests.

Gate B must reuse the Phase 2.1 schemas and content primitives. It does not
authorize changes to Notes, RSS, search, taxonomy, authoring tools, or deferred
metadata.

Gate B must prove on one exact candidate:

- every public Writing entry is valid, eligible, and approved;
- zero public inventory fails the activated surface rather than rendering empty;
- the index order and canonical links match Phase 2.1;
- eligible items generate detail routes and drafts do not;
- index/detail language, H1 ownership, descriptions, and date presentation match
  this contract;
- Writing navigation exists only with the complete real route set;
- frozen Phase 1 implementation is consumed without redesign;
- canonical local and Required `Delivery / Quality` pass;
- substantive implementation review closes every finding.

Gate B PASS authorizes Gate C on the same candidate. Publishing merge and deploy
remain unauthorized.

## 14. Gate C runtime, accessibility, and URL acceptance

Gate C validates the exact Gate B candidate in a production-equivalent static
runtime.

### 14.1 Route and URL evidence

At minimum:

```text
/writing/                         → 200
/writing/<published-stable-id>/   → 200
/writing/not-real/                → 404
```

Gate C records the exact href representation emitted by the index and navigation.
Each internal link must reach the terminal canonical route without an unexpected
404, loop, or unrecorded representation mismatch.

Permanent identity evidence must prove that two controlled entries with the same
collection and stable ID but different titles derive the same public URL. This may
be a focused route-generation test; it does not require publishing or committing
two versions of the approved article.

Gate C also proves that a draft stable ID has no public detail output. Test-only
fixtures may supply this evidence without creating fake production content.

### 14.2 Structure and language evidence

Required checks:

- exactly one Header, Main, Footer, and primary H1 per route;
- index H2 links and detail body heading outline match the contract;
- index document language is `en`;
- every index item exposes its authored local language;
- each detail document language matches the Writing metadata;
- persistent English navigation remains correctly marked;
- index/detail document titles and metadata descriptions follow Section 8 and 9;
- publication and update times expose unchanged date-only `datetime` values;
- exactly one current primary-navigation destination is present;
- no Notes or deferred surface appears;
- native links and article content work without client JavaScript.

### 14.3 Responsive and accessibility evidence

Required evidence covers:

- `320`, `768`, and `1440` CSS-pixel acceptance viewports;
- at least one intermediate width demonstrating continuous reflow;
- 200% text enlargement;
- WCAG text-spacing override;
- keyboard order through Header → index/article links → Footer;
- visible focus and non-color link/current recognition;
- text and non-text contrast under the frozen semantic colors;
- long titles, descriptions, dates, prose links, code, and contact without page
  overflow, clipping, or lost content;
- navigation remains visible without hiding destinations or adding disclosure;
- article prose retains frozen measure and rhythm.

Forced Colors may be recorded `PASS` only from a credible actual runtime. Without
that environment it remains `UNVERIFIED / DEFERRED`; semantic inspection is
supporting evidence, not a forced-colors pass.

## 15. Decision gates

### Gate A — Writing Surface Contract (PASS / FROZEN)

Gate A passes only when:

- valid, eligible, and approved publication states are distinct;
- zero-content and first-activation behavior are deterministic;
- index, detail, navigation, and first approved Writing activate atomically;
- permanent routes consume frozen stable identity without title slugging;
- index inventory, ordering, language, date, and description behavior are exact;
- detail H1/body ownership and update presentation are exact;
- first-publication approval binds to one candidate revision, while unchanged
  already-public Writing carries approval forward only through exact diff evidence;
- Gate C has executable route, URL, structure, responsive, and accessibility
  acceptance criteria;
- Notes and every deferred Publishing concern remain out of scope;
- no content, route, navigation, style, Schema, dependency, fixture, or script
  enters the Gate A change.

Gate A `PASS / FROZEN` on protected `main` authorizes Gate B to implement the first
Writing surface candidate. It does not authorize Gate C, production merge, deploy,
or Notes.

### Gate B — Candidate Implementation + Public Content (IN PROGRESS)

Gate B passes only when the exact candidate satisfies Section 13, substantive
implementation review passes, Elliott approves its exact public content, and Local
and Required Quality pass.

Gate B PASS authorizes Gate C on that unchanged candidate only.

### Gate C — Runtime, Accessibility & URL Validation (NOT AUTHORIZED)

Gate C passes only when the exact Gate B candidate satisfies every observed
runtime boundary in Section 14 and substantive evidence review passes.

Only Gate B PASS plus Gate C PASS authorizes lifecycle closure and a later squash
merge to protected `main`. Production deployment is the activation of an already
validated revision, not the environment where Gate C is first attempted.

## 16. Deferred decisions

Phase 2.2 explicitly defers:

- Notes routes, Notes navigation, and Notes composition;
- RSS and broader Open Web distribution;
- sitemap expansion beyond existing framework behavior;
- canonical links, Open Graph expansion, and structured article data;
- tags, topics, taxonomy, series, related content, and backlinks;
- cover media, reading time, generated excerpts, featured state, and archives;
- pagination, alternate sorting, filtering, and search;
- comments, newsletter, reactions, and sharing controls;
- authoring CLI, preview infrastructure, CMS, and scheduled publishing;
- redirects, tombstones, and URL migration infrastructure.

Deferred means absent from the implementation, not accepted now for possible
future use.

## 17. Change control

After Gate A freezes, this contract reopens only for:

- a real Writing publication, route, URL, language, date, navigation, or
  accessibility defect;
- a Phase 2.1 invariant proved incorrect or impossible by surface implementation;
- a permanent-URL or post-publication integrity defect;
- an incompatible Astro, Markdown, browser, or hosting-platform change;
- a clear product requirement with an existing consumer.

It does not reopen because the index could look richer, another publication has
more metadata, a first article could use promotional treatment, or RSS would be
easy to add while routes are open.

> Valid content is not automatically public. Public content is a durable interface.
