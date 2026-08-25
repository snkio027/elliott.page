# Elliott.page Notes Surface Contract v1.0

**Version:** 1.0

**Status:** DRAFT — Phase 2.3: Notes Surface

**Phase 2:** IN PROGRESS — Publishing

**Phase 2.1:** PASS / FROZEN — Content Semantics & URL Contract

**Phase 2.2:** PASS / FROZEN — Writing Surface; production active

**Gate A:** DRAFT — Notes Surface Contract

**Gate B:** NOT STARTED / NOT AUTHORIZED — Candidate Implementation + Public
Content

**Gate C:** NOT STARTED / NOT AUTHORIZED — Runtime, Accessibility & URL
Validation

**Notes production merge/deploy:** NOT AUTHORIZED

**Forced Colors:** UNVERIFIED / DEFERRED

**Gate A evidence:** PENDING — Local `pnpm quality`, Required
`Delivery / Quality`, and substantive review

**Depends on:** `information-and-page-semantics.md`, `typography.md`,
`layout-and-visual-composition.md`, `identity-surfaces.md`,
`content-semantics-and-url.md`, `writing-surface.md`

**Frozen implementation input:** protected `main` revision
`480c2f3070da6713e99611472f10dc529053b606`

**Scope:** `/notes/` and `/notes/<stable-id>/`

---

## 1. Purpose

Phase 2.1 answers:

> What is a valid Writing or Note content asset?

Phase 2.2 proves how Writing becomes a public surface. Phase 2.3 answers the
parallel but distinct product question:

> How does valid, eligible, and human-approved Note content become a durable,
> low-friction public Web surface without becoming a smaller Writing system or a
> feed?

The required chain is:

```text
Valid Note asset
        ↓
Public eligibility
        ↓
Human publication approval
        ↓
Notes index + detail route + navigation
        ↓
Runtime and permanent-URL evidence
```

This contract defines Notes activation, route identity, index inventory, detail
ownership, language and date presentation, navigation, publication approval, and
the runtime acceptance boundary.

It does not reopen the Phase 2.1 Schema, redesign Phase 1, change Writing, or
authorize a feed, taxonomy, knowledge graph, or authoring workflow.

## 2. Notes product meaning

Notes carry **capture commitment**:

> Worth keeping and making addressable even when a thought remains open, small,
> provisional, or unfinished.

Writing and Notes differ by editorial commitment, not word count, route quality,
visual polish, or technical integrity.

```text
Writing
→ editorial commitment
→ complete enough to stand on its own

Notes
→ capture commitment
→ worth preserving before or without becoming a finished work
```

A short document may be Writing when it makes a complete claim. A long document
may remain a Note when it records an open question or learning process. A Note is
not required to become Writing.

Lower publication friction does not mean weaker content integrity. Every public
Note still has:

- a valid authored title;
- a meaningful Markdown body;
- an authored date and language;
- a stable ID and permanent URL;
- the frozen heading and raw-HTML rules;
- explicit publication approval;
- the same route, accessibility, and fail-closed expectations as any public
  Elliott.page document.

Phase 2.3 must not create a second content class called a micro-post, status,
snippet, or feed item. V1 has one Notes surface consuming the existing Notes
collection.

## 3. Frozen inputs and authority

Phase 2.3 consumes these authorities as read-only inputs:

| Authority | Frozen responsibility |
| --- | --- |
| Phase 1.1 | Notes capture commitment, per-item language, navigation describes reality, native document semantics |
| Phase 1.2 | typography roles, reading measure, prose rhythm, link affordance, CJK behavior |
| Phase 1.3 | page shell, frame, gutter, structural spacing, semantic colors, focus and current-state behavior |
| Phase 1.4 | active Identity routes, Header/Main/Footer ownership, primary navigation, contact ownership, exact-revision approval model |
| Phase 2.1 Gate A | Notes metadata, required title, forbidden description, stable identity, permanent URL, draft and date semantics |
| Phase 2.1 Gate B | executable Schema, canonical GFM AST validation, raw filename identity, public eligibility, ordering and path primitives |
| Phase 2.2 | public-surface lifecycle, approval continuity, permanent-URL evidence, Writing navigation and production behavior |

Phase 2.3 must consume the existing Notes collection and Phase 2.1 primitives. It
must not create a second Schema, date parser, draft filter, stable-ID algorithm,
Markdown validator, ordering function, or publication-state field in the page
layer.

Writing production is a frozen sibling surface. Notes activation may extend the
shared navigation, but it must not change Writing inventory, route identity,
article rendering, approved copy, or permanent URLs.

If implementation proves a frozen invariant incorrect or impossible, work stops
and records a contract defect. Page convenience is not authority to reinterpret
content semantics or Phase 1 design.

## 4. Gate A boundary

Gate A may change only:

- this Notes Surface Contract;
- the README authority link and lifecycle summary required to locate it.

Gate A does not create or modify:

- `src/content.config.ts`, `src/content/content-contract.ts`, or their tests;
- Writing or Notes Markdown;
- `/notes/`, a Note detail route, or any other production route;
- production navigation, layout, typography, colors, or components;
- fixtures, scripts, dependencies, or test infrastructure;
- the active Writing index, article, approved content, or URL.

Phase 2.3 does not authorize:

- RSS, sitemap expansion, Open Graph expansion, or canonical-link
  infrastructure;
- tags, topics, categories, series, related content, or backlinks;
- inline full-content previews, a timeline feed, month/year archives, pagination,
  filtering, or alternate sorting;
- generated descriptions, excerpts, reading time, cover media, or featured state;
- search, comments, reactions, newsletter, CMS, or authoring CLI;
- a knowledge graph, AI interface, new design system, card system, or motion.

> Gate A defines the Notes public interface. It does not implement or publish it.

## 5. Three distinct publication states

Notes activation depends on three states that must not be collapsed.

### 5.1 Valid

A valid Note passes every Phase 2.1 rule:

- strict Notes metadata, including required `title` and forbidden `description`;
- raw stable-ID, exact `.md` extension, and flat-path validation;
- strict date-only and `updated >= date` validation;
- canonical GFM body, raw-HTML, and heading oracles;
- unknown-field and malformed-source fail-closed behavior.

Validity means that the repository asset is structurally trustworthy. It does not
mean that the Note is eligible or approved for publication.

### 5.2 Eligible

An eligible Note is valid and has:

```yaml
draft: false
```

Eligibility is source-controlled and independent of the wall clock. It allows the
surface implementation to include the Note in public ordering and route
generation. It is not publication approval.

### 5.3 Approved

An approved Note has either:

- explicit human authorization from Elliott for the exact candidate revision,
  required for first publication or changed approval-covered content; or
- carried approval from an earlier public revision whose approval-covered content
  is proven unchanged under Section 13.

Schema success, `draft: false`, Agent review, CI success, editorial plausibility,
and a rendered preview do not imply approval.

An eligible but not-yet-approved Note may exist on a non-production Gate B
candidate. Gate B cannot pass, Gate C cannot start, and the candidate cannot merge
while any eligible Note lacks explicit current-revision approval or valid approval
continuity.

Approval remains process evidence. Phase 2.3 does not add an approval field,
database, CI inference, or access-control system.

## 6. Atomic surface activation

Notes remains inactive while it has no approved public inventory:

```text
0 eligible + approved Notes
→ no /notes/ production route
→ no /notes/<stable-id>/ production route
→ no Notes item in primary navigation
```

The first activation candidate must contain at least one valid, eligible, and
approved Note. It activates the entire surface atomically:

```text
>= 1 eligible + approved Note
        +
/notes/ index
        +
/notes/<stable-id>/ detail route
        +
Notes primary-navigation destination
        ↓
one reviewed candidate revision
```

The first public state must not contain:

- an empty Notes index or `Nothing here yet` placeholder;
- a Notes navigation item whose index does not exist;
- an index item whose detail route does not exist;
- a detail route absent from the index;
- a draft route, disabled link, placeholder Note, or evaluation copy;
- inline full Note bodies rendered as a substitute for detail routes.

An empty Notes collection remains valid infrastructure before the surface is
implemented. Once Notes is active, zero eligible Notes is a surface-integrity
failure, not authorization to render an empty index or silently remove navigation.

The development branch may be incomplete while work is local. Atomicity applies
to the exact Gate B and Gate C candidate before protected-main merge.

## 7. Lifecycle and evidence binding

The required lifecycle is:

```text
Gate A contract merge
        ↓
Gate B implementation + first real Note on one candidate branch
        ↓
substantive implementation review
        ↓
Elliott approves exact public Note revision
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

Gate B PASS authorizes Gate C only. It does not authorize merge, deploy, or normal
production activation.

Any later change to Note content, metadata, route behavior, navigation, rendering,
or styles invalidates the affected evidence and requires the relevant review
again. A strictly status-only closure revision may inherit prior evidence only
when an audited diff contains no content or implementation change and Required
`Delivery / Quality` passes on that revision.

No staging environment or public Preview URL is required. Gate C may validate the
candidate static build in a production-equivalent local runtime.

## 8. Route identity and permanent URL

The public route model is exact:

```text
/notes/
/notes/<stable-id>/
```

The detail route consumes Phase 2.1 identity without reinterpretation:

```text
src/content/notes/learning-zig.md
        ↓
stable ID: learning-zig
        ↓
/notes/learning-zig/
```

Required invariants:

- the raw validated file stem is the only detail-route identity;
- the authored title and body never become slug authorities;
- title, body, language, date, or `updated` changes do not change the URL;
- internal links use the exact canonical trailing-slash path;
- every eligible Note produces exactly one detail route;
- no draft Note produces a detail route or public output artifact;
- an unknown stable ID returns the normal terminal 404;
- route generation is static and requires no client JavaScript.

Phase 2.3 does not add `slug`, dated paths, alternate URL representations,
canonical metadata, redirects, or tombstones.

Changing, removing, or moving an already-public Note ID remains governed by the
Phase 2.1 permanence contract. Moving a Note to Writing would create a different
collection identity and is not a routine content edit.

Short or provisional content does not weaken URL permanence. Once public, a
Note's URL remains governed by the Phase 2.1 permanence contract even if the
thought later changes, matures, or no longer reflects Elliott's current view.

Withdrawal, reclassification, or migration requires an explicit Phase 2.1
exception or a future reviewed redirect/tombstone path. It must not silently turn
an already-public Note URL into a normal 404.

## 9. Notes index contract

`/notes/` is a stable index of public Notes. It is not a feed, stream, dashboard,
archive, or inline reading surface.

Its complete v1 inventory is:

```text
Notes                           single H1

ordered public entries
└── authored title             linked H2
    publication date           always visible
```

The index uses the Phase 2.1 public-entry primitive:

```text
valid Notes
→ draft:false only
→ date DESC
→ same-date stable ID ASCII ASC
```

Required index semantics:

- the document language is `en` and the visible page heading is `Notes`;
- the document title is `Notes — Elliott.page`;
- the document metadata description is concise authored surface copy approved on
  the Gate B candidate; it is not derived from Note content;
- entries use one native list in canonical public order;
- each title is an `h2` containing the canonical detail link;
- each complete item carries its authored `lang` and establishes the existing
  item-level Typography language context;
- the publication date is a visible `<time datetime="YYYY-MM-DD">`;
- all eligible Notes and no draft Notes appear.

Notes have no authored `description`. The index must not synthesize one from the
body, first paragraph, Markdown AST, filename, or metadata. Absence produces no
empty summary element.

Index date presentation is local to each item. A lexical date derives its locale
from the authored Note language: `en` uses an English locale and `zh-CN` uses a
Simplified Chinese locale. A language-neutral numeric date is also valid. If text
uses another language deliberately, that fragment carries its own correct `lang`.

Every visible date derives from the authored date-only value with explicit UTC
handling and preserves the same calendar day in every build environment.

The v1 index has no introductory essay, inline body, update badge, item count,
card, excerpt, month/year heading, chronological timeline decoration, pagination,
filter, tag, or alternate sort. All eligible Notes remain in one quiet link list
until real scale proves a new consumer.

## 10. Note detail contract

`/notes/<stable-id>/` is a standalone reading surface even when its content is
short or unresolved.

Its ownership is:

```text
Route / document header
├── H1 = authored title
├── publication date
└── updated date, only when meaningfully distinct

Document head
├── <title> = <authored title> — Elliott.page
└── lang = authored item language

Markdown body
└── H2+ document structure and prose
```

Required detail semantics:

- the route renders exactly one primary `h1` from frontmatter `title`;
- the validated Markdown body owns H2+ structure;
- the outer document `<html lang>` is exactly the Note `lang`;
- persistent English primary navigation remains locally marked `lang="en"` on a
  `zh-CN` Note;
- publication `date` is always visible as
  `<time datetime="YYYY-MM-DD">`;
- `updated` is visible only when present and different from `date`;
- equal `updated` and `date` values do not render a duplicate update line;
- the English labels are `Published` and `Updated`;
- the Simplified Chinese labels are `发布于` and `更新于`;
- visible dates use the authored language, explicit UTC, and the original calendar
  day;
- because Notes forbid `description`, no body excerpt is generated for metadata or
  a visible lead;
- Note prose consumes frozen reading measure, type roles, rhythm, links, code,
  quotes, and CJK behavior without new typography values.

The detail surface adds no maturity badge, draft/provisional label, byline,
breadcrumb, table of contents, share control, related content, backlinks,
comments, previous/next navigation, or reading-time estimate in v1.

The Notes index in primary navigation already supplies the path back. A short Note
does not need a special compact template or inline-only representation.

## 11. Primary navigation activation

After the Notes index, every eligible detail route, and approved public Note are
real, primary navigation becomes:

```text
Elliott Bai    Writing    Notes    About    Now
```

Required invariants:

- `Elliott Bai` remains the identity anchor linking to `/`;
- Writing preserves its active `/writing/` destination and existing semantics;
- Notes links to the real `/notes/` index;
- About and Now preserve their destinations;
- RSS and future capabilities remain absent;
- navigation remains a visible native `<nav>` without menu disclosure;
- DOM and focus order are Elliott Bai → Writing → Notes → About → Now;
- navigation remains English, including on `zh-CN` Notes;
- the Notes index and detail pages expose one unambiguous current Notes
  destination;
- `/notes/` uses `aria-current="page"` on Notes;
- `/notes/<stable-id>/` uses `aria-current="location"` on Notes;
- current values consume the frozen non-color current-state treatment;
- default, visited, hover, focus, and current states retain frozen link behavior.

Writing index/detail current semantics must not regress when Notes is added.
Navigation activation and route activation occur on the same Gate B candidate; no
protected-main revision may expose one without the other.

## 12. Layout and visual consumption

Notes consumes the frozen production shell:

```text
Header  → active primary navigation
Main    → Notes index or one Note
Footer  → hi@elliott.page
```

Required constraints:

- every route has one Header, Main, and Footer;
- Footer remains the sole primary contact owner;
- Main does not duplicate primary navigation or contact;
- index and detail use the frozen frame, gutter, Region/Cluster spacing,
  Canvas/Text/Muted/Accent colors, and Typography primitives;
- item dates may consume the frozen Meta role;
- Note bodies consume the frozen prose implementation;
- narrow screens reflow through normal document flow rather than hiding
  navigation, shrinking frozen type sizes, or adding a menu;
- no card, divider role, surface palette, badge system, timeline primitive, or
  component framework enters production without a current consumer.

Gate B may add only the minimum local composition for the real Notes list and
document header. A structural rule may mirror the already-proven Writing surface
only when both are real consumers; reuse must not erase their distinct product
semantics or create a speculative generic Publishing system.

## 13. Publication approval and continuity

The first public Note is a product asset, not a fixture. Its exact public copy
requires Elliott's explicit approval on the implementation candidate.

Approval covers:

- stable ID and public route identity;
- title;
- publication and updated dates;
- language;
- the complete Markdown body;
- Notes-index metadata description and any new visible surface wording.

A clear approval in the PR conversation or review record is sufficient. No
approval file, schema field, CI job, CODEOWNERS rule, or external database is
introduced.

First-publication approval must not be inferred from:

- `draft: false`;
- Schema or AST validation;
- Local or Required Quality;
- Agent editorial judgment;
- a preview or built route;
- the fact that Writing has already been approved;
- approval of another revision without continuity evidence.

Gate B may set `draft: false` and form a complete non-production candidate before
approval. Gate B cannot pass and Gate C cannot start until every first-publication
Note on that candidate has explicit approval.

For an already-public Note, approval carries forward only when an audited diff
proves every approval-covered value is unchanged:

- stable ID;
- `title`;
- `date`, the presence/value of `updated`, and `lang`;
- the complete authored Markdown body.

Unrelated repository, route, style, tooling, Identity, Writing, or Open Web
changes do not invalidate approval for an unchanged Note. The audit binds prior
approval to unchanged content; it does not infer approval from CI.

Any change to an approval-covered field, stable ID, or Markdown body requires new
explicit approval for that Note. A change to Notes-index metadata or other surface
copy requires new approval for that wording without renewing approval for
unchanged Notes.

A strictly status-only lifecycle commit may inherit approval only under Section
7's evidence rule.

## 14. Gate B implementation boundary

After Gate A passes, closes, and merges to protected `main`, Gate B may create one
candidate containing:

- at least one real Note Markdown asset intended for first publication;
- the `/notes/` index route;
- static `/notes/<stable-id>/` detail generation;
- atomic Notes navigation activation;
- the minimum list/detail composition and surface-specific validation;
- focused route, eligibility, language, date, URL, and activation tests.

Gate B must reuse Phase 2.1 schemas and content primitives. It must preserve the
active Writing surface and does not authorize RSS, search, taxonomy, backlinks,
authoring tools, or deferred metadata.

Gate B must prove on one exact candidate:

- every public Note is valid, eligible, and approved;
- zero public inventory fails rather than rendering an empty active surface;
- index order and canonical links match Phase 2.1;
- eligible Notes generate detail routes and drafts do not;
- item-level language context, H1 ownership, absent description, and date
  presentation match this contract;
- Notes navigation exists only with the complete route set and preserves Writing;
- frozen Phase 1 implementation is consumed without redesign;
- canonical Local and Required `Delivery / Quality` pass;
- substantive implementation and public-copy review close every finding.

Gate B PASS authorizes Gate C on the unchanged candidate. Merge, deploy, and Notes
production activation remain unauthorized.

## 15. Gate C runtime, accessibility, and URL acceptance

Gate C validates the exact Gate B candidate in a production-equivalent static
runtime.

### 15.1 Route and permanent-URL evidence

At minimum:

```text
/notes/                         → 200
/notes/<published-stable-id>/   → 200
/notes/not-real/                → 404
```

Gate C records the exact href emitted by the index and navigation. Internal links
must reach terminal canonical routes without an unexpected 404, loop, or
unrecorded representation mismatch.

Permanent identity evidence proves that two controlled entries with the same
collection and stable ID but different titles derive the same public URL. A
focused route-generation test is sufficient; no public Note needs two committed
titles.

Gate C also proves that a draft stable ID has no public route or output. Test-only
fixtures may supply this evidence without fake production content.

### 15.2 Existing Writing sibling regression evidence

Notes activation changes the shared primary navigation and therefore must prove
that the already-public Writing interface has not regressed. At minimum:

```text
/writing/                              → 200
every already-public Writing detail   → 200

Writing index
└── Writing aria-current="page"

Writing detail
└── Writing aria-current="location"
```

The detail-route check derives from the candidate's complete already-public
Writing inventory. The Contract does not maintain a second hard-coded URL list.

An audited candidate diff must prove that Notes activation leaves every public
Writing stable ID, canonical route, title, description, date, updated value,
language, and complete Markdown body unchanged. Existing publication approval
therefore carries forward under the frozen Writing continuity model rather than
being inferred from a successful build.

Shared-navigation validation must prove that inserting Notes does not regress:

- the exact Writing index or detail canonical href;
- index `aria-current="page"` and detail `aria-current="location"` semantics;
- visible non-color current and focus treatment;
- native keyboard order through the shared Header and Writing page content;
- the terminal availability of every already-public Writing route.

Gate C does not repeat the complete Phase 2.2 typography, 200% text, or long-prose
matrix when the affected Writing implementation is unchanged. If the Notes
candidate changes shared rendering or styles beyond navigation insertion, sibling
regression evidence expands to cover every affected frozen Writing behavior.

### 15.3 Structure and language evidence

Required checks:

- exactly one Header, Main, Footer, and primary H1 per route;
- index H2 links and detail body headings follow this contract;
- index document language is `en`;
- every index item exposes its authored language and Typography context;
- each detail document language matches Note metadata;
- persistent English navigation remains correctly marked;
- document titles and Notes-index metadata follow Sections 9 and 10;
- no item description or body-derived excerpt appears;
- date times expose unchanged date-only `datetime` values;
- exactly one current primary-navigation destination exists;
- Writing remains active and no deferred surface appears;
- native links and Note content work without client JavaScript.

### 15.4 Responsive and accessibility evidence

Required evidence covers:

- `320`, `768`, and `1440` CSS-pixel acceptance viewports;
- at least one intermediate width proving continuous reflow;
- 200% text enlargement;
- WCAG text-spacing override;
- actual keyboard order through Header → index/detail content links, when present
  → Footer;
- visible focus and non-color link/current recognition;
- text and non-text contrast under frozen semantic colors;
- long titles, dates, prose links, code, and contact without page overflow,
  clipping, or lost content;
- primary navigation remains visible without hiding destinations or adding
  disclosure;
- Note prose retains frozen measure and rhythm.

Forced Colors may be recorded `PASS` only from a credible actual runtime. Without
that environment it remains `UNVERIFIED / DEFERRED`; semantic inspection is
supporting evidence, not a forced-colors pass.

## 16. Decision gates

### Gate A — Notes Surface Contract (DRAFT)

Gate A passes only when:

- capture commitment remains distinct from Writing without a length rule or lower
  integrity standard;
- valid, eligible, and approved publication states remain distinct;
- zero-content and first-activation behavior are deterministic;
- index, detail, navigation, and first approved Note activate atomically;
- routes consume frozen stable identity without title slugging;
- index inventory is exactly title plus date, with no generated description or
  inline body;
- item language context and date presentation are exact;
- detail H1/body ownership and update display are exact;
- primary navigation order and Notes current-location semantics are exact;
- first-publication approval and approval continuity bind to audited revisions;
- existing public Writing routes, canonical links, current-state semantics,
  approved copy, and shared-navigation focus behavior have executable sibling
  regression evidence;
- Gate C has executable route, URL, structure, responsive, and accessibility
  criteria;
- Writing remains active and every deferred concern remains absent;
- no content, route, navigation, style, Schema, dependency, fixture, or script
  enters the Gate A change.

Gate A `PASS / FROZEN` on protected `main` authorizes Gate B to implement the first
Notes candidate. It does not authorize Gate C, merge, deploy, or Notes production.

### Gate B — Candidate Implementation + Public Content (NOT AUTHORIZED)

Gate B begins only after Gate A is `PASS / FROZEN` on protected `main`.

Gate B passes only when the exact candidate satisfies Section 14, substantive
implementation review passes, Elliott approves its exact public Note and surface
copy, and Local and Required Quality pass.

Gate B PASS authorizes Gate C on that unchanged candidate only.

### Gate C — Runtime, Accessibility & URL Validation (NOT AUTHORIZED)

Gate C passes only when the exact Gate B candidate satisfies every observed
runtime boundary in Section 15 and substantive evidence review passes.

Only Gate B PASS plus Gate C PASS authorizes lifecycle closure and a later squash
merge to protected `main`. Production deployment activates an already validated
revision; it is not the environment where Gate C is first attempted.

## 17. Deferred decisions

Phase 2.3 explicitly defers:

- RSS and broader Open Web distribution;
- sitemap expansion, canonical links, Open Graph expansion, and structured data;
- tags, topics, taxonomy, series, related content, and backlinks;
- knowledge graphs and Writing/Note relationship metadata;
- generated descriptions, excerpts, inline bodies, cover media, reading time,
  featured state, and maturity labels;
- feeds, archives, date grouping, pagination, alternate sorting, filtering, and
  search;
- comments, reactions, newsletter, and sharing controls;
- authoring CLI, preview infrastructure, CMS, and scheduled publishing;
- redirects, tombstones, deletion workflow, and URL migration infrastructure;
- AI retrieval, summarization, recommendation, or other AI-native interfaces.

Deferred means absent from the implementation, not accepted now for possible
future use.

## 18. Change control

After Gate A freezes, this contract reopens only for:

- a real Note publication, route, URL, language, date, navigation, or
  accessibility defect;
- evidence that the required Notes title prevents authentic capture;
- a Phase 2.1 invariant proved incorrect or impossible by surface implementation;
- a permanent-URL or post-publication integrity defect;
- an incompatible Astro, Markdown, browser, or hosting-platform change;
- a clear product requirement with an existing consumer.

It does not reopen because Notes could look more like a social feed, another
garden has richer metadata, an archive would be easy to add, the first Note is
short, or backlinks may be useful after more content exists.

> A Note may remain unfinished. Its identity, structure, and publication decision
> must not be unfinished.
