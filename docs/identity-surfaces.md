# Elliott.page Identity Content & Surface Contract v1.0

**Version:** 1.0

**Status:** DRAFT — Phase 1.4 / Gate A

**Gate A:** DRAFT — Identity Content & Surface Contract

**Gate B:** NOT STARTED / NOT AUTHORIZED — Production Implementation

**Gate C:** NOT STARTED / NOT AUTHORIZED — Runtime & Accessibility Validation

**Gate B implementation authorization:** NOT AUTHORIZED UNTIL GATE A MERGE

**Gate C validation authorization:** NOT AUTHORIZED UNTIL GATE B IMPLEMENTATION
REVIEW PASSES ON THE CANDIDATE REVISION

**Production merge/deploy authorization:** NOT AUTHORIZED UNTIL GATE B AND GATE C
PASS ON THE SAME IMPLEMENTATION CANDIDATE

**Depends on:** `information-and-page-semantics.md`, `typography.md`,
`layout-and-visual-composition.md`, `src/content.config.ts`

**Scope:** Elliott.page v1 identity surfaces: `/`, `/about`, and `/now`

---

## 1. Purpose

Phase 1.4 turns the three frozen Phase 1 systems into the first complete product
surface:

```text
Information & Page Semantics
        +
Typography v1
        +
Layout & Visual Composition v1
        ↓
Home / About / Now
```

This contract defines the content responsibilities, activation rules, source
ownership, document semantics, and acceptance surface for those three routes.

It does not redesign typography, layout, semantic colors, spacing, navigation
composition, or the selected Candidate A visual system.

## 2. Frozen inputs

Phase 1.4 consumes these authorities as read-only inputs:

| Authority | Frozen responsibility |
| --- | --- |
| Phase 1.1 | route meaning, displayed identity, navigation world, language model, document semantics |
| Phase 1.2 | font stacks, type roles, scale, rhythm, measure, link affordance, CJK emphasis |
| Phase 1.3 | Canvas/Text/Muted/Accent, Cluster/Region ownership, frame, gutter, page shell, Candidate A composition |
| Pages collection | strict frontmatter parsing for `title`, `description`, `updated`, `lang`, and `draft` |

Phase 1.4 may correct a real contradiction only through an explicit finding and
change-control record. Convenience, visual preference, or content-writing
difficulty does not reopen a frozen input.

## 3. Phase boundary

Phase 1.4 creates exactly three active identity surfaces:

```text
/
/about
/now
```

It may create:

- final Home identity copy approved for publication;
- `src/content/pages/about.md`;
- `src/content/pages/now.md`;
- production routes for About and Now;
- the complete frozen primary navigation after all destinations are real;
- the minimum shared surface implementation needed by About and Now;
- deterministic validation for the stricter per-surface content invariants in this
  contract.

It does not create or authorize:

- Writing or Notes routes, listings, or content;
- RSS, sitemap, search, comments, CMS, or analytics;
- Dark Mode, Web Fonts, motion, a new color role, or a new spacing system;
- cards, portraits, social-icon rows, skill lists, or portfolio sections;
- translation switching or mirrored page variants;
- a component library or speculative content abstraction;
- Knowledge Graph or AI capability.

Forced Colors remains `UNVERIFIED / DEFERRED`. Phase 1.4 may record a real runtime
result only when a credible forced-colors environment exists; it must not infer a
pass from semantic-color inspection.

## 4. Surface activation is atomic

Navigation describes deployed product reality. About and Now become active only
when one candidate revision contains all of the following:

```text
validated authored content
        +
buildable production routes
        +
complete primary navigation
        +
successful quality gate
```

The required lifecycle is:

```text
Gate A contract merge
        ↓
Gate B implementation on one candidate branch / PR
        ↓
Gate B substantive implementation review PASS
        ↓
Gate C validates that same candidate build
in a production-equivalent static runtime
        ↓
Gate C PASS
        ↓
production merge to main
        ↓
automatic Cloudflare deployment
```

Gate B PASS authorizes Gate C validation only. It does not authorize merge to
`main`, normal production deployment, or activation of About and Now. Gate C uses
the built candidate before merge; the existing Astro preview runtime is sufficient
and no staging or Preview deployment is required.

Any change to production source, content, route behavior, metadata, or styling
after Gate B review or during Gate C invalidates the affected evidence and requires
the relevant checks again. A later strictly status-only lifecycle commit may carry
the evidence forward only when its diff is audited to contain no implementation or
content change and Required `Delivery / Quality` passes again.

Gate B must not produce any intermediate production state in which:

- About or Now is linked but its route does not build;
- a route exists only as a placeholder;
- a required content entry is missing, empty, or still draft;
- navigation silently omits one of the three active Phase 1 surfaces;
- invalid content is filtered out while a corresponding link remains public.

Missing required content is a build failure, not an empty page or a runtime 404.
Once the identity surfaces are active, changing a required entry back to draft must
also fail the normal production path rather than silently removing the route.

The branch and PR may contain incomplete work during development. Atomicity applies
to the implementation candidate approved by both Gate B and Gate C before merge
and deployment.

## 5. Source ownership

Phase 1.4 uses the smallest source model that matches the three responsibilities:

| Surface | Route source | Content source | Reason |
| --- | --- | --- | --- |
| Home | `src/pages/index.astro` | short authored copy in the route | Home is a small identity composition, not a Markdown reading surface |
| About | `src/pages/about.astro` | `src/content/pages/about.md` | durable prose belongs to the Pages content contract |
| Now | `src/pages/now.astro` | `src/content/pages/now.md` | temporal prose and freshness metadata belong together |

No Home content entry, generic dynamic page router, slug field, navigation-order
field, layout-name field, or page-kind discriminator is introduced without a real
consumer.

Route identity is `/about` and `/now`. Gate A does not prescribe a trailing-slash
representation; internal links, generated output, current-route recognition, and
the deployed static host must behave consistently.

## 6. Home contract

Home is the identity root and orientation surface. Its Main inventory is exactly:

```text
Elliott Bai
A short statement about this place.
```

Required invariants:

- `Elliott Bai` is the single `h1` and the only displayed personal name;
- no Chinese-language personal name, alias, romanization variant, or parenthetical
  equivalent is displayed;
- the place statement describes Elliott.page, not a profession, industry, skill,
  availability state, or personal brand;
- the place statement is one concise authored statement, not a biography;
- Main does not duplicate About/Now navigation or `hi@elliott.page`;
- Header owns orientation and Footer owns the primary contact path;
- Home remains content-sized and does not become a full-viewport hero;
- no feed, project list, social directory, portrait, or status excerpt is added.

The current production sentence is provisional implementation copy. Gate A does
not silently approve it as final. Gate B may begin only with an explicitly
approved Home place statement; evaluation copy from a specimen is never promoted
by default.

Home metadata is:

```text
document title  Elliott.page
description     the approved place statement, unless separately approved
document lang   the natural language of the approved statement
```

## 7. About contract

About answers: **Who is Elliott over time?**

The active entry is `src/content/pages/about.md`. Its content may include concise
durable context, enduring interests and questions, the purpose of Elliott.page,
and selected public identities.

It must not become:

- a resume or chronological employment record;
- a qualification, technology, certification, or achievement inventory;
- a current-project or current-reading log;
- a duplicate contact directory;
- a generic personal-brand biography.

The Footer is the sole owner of the primary `hi@elliott.page` contact path on every
identity surface. About Main may include a restrained selected public-identity link
only when it has real visitor value; it must not repeat the primary email address or
create a second contact block.

About frontmatter must satisfy:

```yaml
title: <non-empty authored page title>
description: <non-empty authored metadata description>
lang: en | zh-CN
draft: false
```

Additional About invariants:

- `description` is required by this surface contract even though the general Pages
  schema currently permits omission;
- `updated` is absent in v1 because About has no approved visible freshness
  consumer;
- the Markdown body is non-empty and contains publication-ready authored prose;
- the body does not contain another level-one heading; the route renders the
  frontmatter title as the single `h1`;
- body headings, when needed, begin at `h2` and express real information structure;
- the document `lang` comes from frontmatter, while persistent English navigation
  remains locally marked `lang="en"`.

The document title follows:

```text
<authored About title> — Elliott.page
```

## 8. Now contract

Now answers: **Who is Elliott right now?** It is a periodically replaced snapshot,
not a real-time status service, activity log, or structured database.

The active entry is `src/content/pages/now.md`. Its topics may include what Elliott
is building, learning, reading, or thinking about. Those are authored headings,
not schema fields.

Now frontmatter must satisfy:

```yaml
title: <non-empty authored page title>
description: <non-empty authored metadata description>
updated: YYYY-MM-DD
lang: en | zh-CN
draft: false
```

Freshness invariants:

- `updated` is required and represents the date the public snapshot was materially
  reviewed;
- it is authored metadata, never Git time, build time, deploy time, or request
  time;
- it uses a date-only value so display does not drift across time zones;
- the route renders one visible human-readable freshness line adjacent to the
  title/content relationship;
- the freshness line uses a semantic `<time datetime="YYYY-MM-DD">` element;
- its visible wording matches the page language, for example `Last updated` or an
  equivalent Chinese label;
- the date remains visible at narrow widths, 200% text, and text-spacing override;
- stale content remains honestly published with its last authored date; it is not
  hidden, marked live, or used to make Home appear stale.

Additional Now invariants:

- `description` is required by this surface contract;
- the Markdown body is non-empty and publication-ready;
- the body contains no level-one heading;
- the route renders the frontmatter title as the single `h1`;
- the document `lang` comes from frontmatter;
- content replacement edits the same stable route rather than creating dated Now
  archives in Phase 1.4.

The document title follows:

```text
<authored Now title> — Elliott.page
```

## 9. Machine-enforced content contract

The general Pages schema remains the collection boundary:

```text
title
description?
updated?
lang
draft
```

Phase 1.4 adds per-surface invariants without inventing unused metadata:

| Invariant | About | Now |
| --- | --- | --- |
| required entry ID | `about` | `now` |
| non-empty body | required | required |
| `description` | required | required |
| `updated` | must be absent | required |
| `draft` | must resolve to `false` | must resolve to `false` |

Gate B must enforce these conditions deterministically during `astro check`, build,
or both. A runtime-only warning, client-side check, or manual checklist is
insufficient.

The implementation may strengthen the Pages schema where a rule is genuinely
shared. Entry-specific rules may be enforced at the route/build boundary. It must
not add a duplicate `kind`, `slug`, `route`, `template`, or navigation field merely
to express information already owned by the fixed entry ID and route.

Invalid frontmatter, missing entries, empty bodies, a draft active entry, missing
Now freshness, or unused About freshness must fail the canonical quality path with
an understandable error.

## 10. Navigation activation

After both content entries and routes are real, the primary navigation becomes:

```text
Elliott Bai    About    Now
```

Required invariants:

- `Elliott Bai` links to `/`; there is no separate `Home` item;
- About links only to the real About route;
- Now links only to the real Now route;
- exactly one item has `aria-current="page"` on each identity surface;
- current-route recognition remains correct for the deployed route representation;
- navigation remains a visible `<nav>` landmark and requires no menu disclosure;
- navigation labels remain English and the navigation region is marked `lang="en"`
  when the surrounding document language differs;
- default, visited, hover, focus, and current states continue to consume frozen
  Typography and Layout behavior;
- no Writing, Notes, RSS, placeholder, or disabled destination is shown.

The Gate B revision must activate the two destinations and their routes together.
The root-only Gate C proof remains correct until that revision passes its own gate.

## 11. Shared surface composition

All three pages consume the frozen production shell:

```text
Header  → real primary navigation
Main    → one page responsibility
Footer  → hi@elliott.page
```

Home Main uses the frozen identity-cluster composition. About and Now are reading
surfaces and consume the frozen title, Meta, prose rhythm, language-sensitive
measure, and link treatment.

Phase 1.4 may extract a shared implementation only when at least two real surfaces
consume the same semantics. Extraction is not a requirement, and a generic
component API is not a Gate result.

The implementation must not:

- override frozen type sizes, line heights, measures, or prose rhythm;
- change Canvas, Text, Muted, or Accent values;
- restore Inline in production before the real destination group exists;
- introduce Section or Rule without a new approved consumer;
- turn About/Now prose into cards, panels, timelines, or dashboards;
- add a second Header, Main, Footer, contact path, or primary navigation.

When About and Now activate the destination group, the frozen Gate B Inline value
has a real production consumer and may be promoted at that time.

## 12. Content and metadata boundary

Formal content means copy approved for public deployment. It belongs in the
production route or the two Pages entries defined by this contract.

Evaluation content means copy used to exercise hierarchy, language, stress, or
layout. It remains under `specimens/` and must not be promoted merely because it
already fits the design.

Placeholder content is prohibited on an active identity route. Labels such as
`Coming soon`, lorem ipsum, generic biography templates, empty headings, and
specimen explanations are not acceptable publication content.

Each route must provide:

- one accurate document title;
- one non-empty metadata description;
- one explicit document language;
- one primary `h1`;
- content whose claims are approved by Elliott for public display.

Gate A freezes the roles and approval boundary, not the actual About/Now prose or
the final Home place-statement wording. Those words must be supplied and approved
before Gate B implementation review can pass and Gate C can begin.

Publication approval is human evidence from Elliott, bound to the exact candidate
content and implementation revision. A clear approval in the PR conversation or
review record is sufficient. No approval database, repository file, CI job, or
additional workflow is required.

Approval must not be inferred from:

- the presence or authorship of a content file;
- schema, build, or Required `Delivery / Quality` success;
- an Agent's assessment that wording appears complete;
- prior approval of different copy or a different candidate revision.

Machine gates prove structure, schema, route, and build correctness. Elliott's
human approval proves that the actual public wording and claims are authorized for
publication. Any later change to the Home statement, About body, Now body, page
titles, descriptions, or visible freshness wording requires renewed approval. A
strictly status-only lifecycle commit may retain the approval only when its audited
diff proves the approved content is unchanged.

## 13. Runtime and accessibility acceptance surface

Gate C validates the built product rather than a specimen approximation.

Gate B must record the exact deployed href representation for each route identity.
Gate C then requests those actual navigation targets:

| Route identity | Required terminal result |
| --- | --- |
| `/` | 200 |
| `/about` | 200 |
| `/now` | 200 |

An intentional platform canonicalization redirect may be recorded separately, but
the final target must return 200 and current-route recognition must normalize the
same representation. An unrecorded redirect, redirect loop, or terminal 404 fails
the gate.

Required structural checks on every route:

- exactly one Header, Main, and Footer;
- exactly one primary `h1`;
- exactly one current navigation item;
- all primary navigation destinations resolve successfully;
- one visible Footer contact link;
- no duplicated navigation or contact inside Main;
- accurate `<title>`, metadata description, and document language;
- native links and document flow remain usable without client JavaScript.

Required visual and reflow checks:

- `320`, `768`, and `1440px` acceptance viewports;
- continuous reflow between the acceptance viewports;
- 200% text;
- text-spacing override;
- long authored headings, metadata, freshness, prose links, and contact without
  clipping or page overflow;
- primary navigation remains visible without hiding destinations or adding a menu;
- frozen reading measure, typography rhythm, region ownership, and page gutter
  remain intact;
- keyboard focus remains visible and order follows Header → Main links → Footer;
- text, current, link, and focus recognition continue to satisfy the frozen
  contrast and non-color-affordance requirements;
- Now freshness remains complete and visible in every required stress state.

Forced Colors is recorded as `PASS` only from a credible actual runtime. Otherwise
Gate C preserves `UNVERIFIED / DEFERRED`.

## 14. Required Gate B implementation

Gate B implementation is authorized only after this contract passes review and is
merged. Gate B remains on its candidate branch after implementation review; it is
not independently merged to `main`.

Its minimum implementation set is:

```text
src/content/pages/about.md
src/content/pages/now.md
src/pages/about.astro
src/pages/now.astro
src/pages/index.astro          final approved Home statement
src/layouts/BaseLayout.astro  complete real navigation
```

It may also contain the minimum deterministic validation and shared reading-surface
implementation required by this contract. File names are a source model, not a
requirement to create one component per concept.

Gate B must prove:

- all three routes build from a clean checkout;
- About and Now consume validated Pages entries rather than duplicated inline
  prose;
- route activation and navigation are atomic;
- the final Home statement, page metadata, visible freshness wording, and both
  Markdown bodies have Elliott's explicit approval bound to the candidate revision;
- the production output contains exactly the active identity world and no reserved
  product surface;
- frozen Typography and Layout source are consumed without redesign;
- no evaluation copy or specimen controls enter production;
- canonical `pnpm quality` passes.

## 15. Decision gates

### Gate A — Identity Content & Surface Contract (DRAFT)

Gate A passes only when:

- Home, About, and Now have explicit content and source ownership;
- active/draft/missing/empty behavior is deterministic;
- the Now freshness invariant is visible and machine-enforceable;
- route and navigation activation are atomic;
- formal, evaluation, and placeholder content are unambiguous;
- metadata, language, document semantics, and accessibility acceptance are
  executable;
- frozen Phase 1.1–1.3 inputs are not contradicted;
- no route, content entry, or production implementation is introduced.

### Gate B — Production Implementation (NOT STARTED / NOT AUTHORIZED)

Gate B passes only when:

- the required authored content and routes exist;
- the complete primary navigation describes those real routes;
- the per-surface contract fails deterministically when violated;
- the three surfaces consume frozen production primitives;
- the built route inventory contains no deferred surface;
- local and Required `Delivery / Quality` pass;
- substantive implementation review closes all findings.

Gate B PASS authorizes Gate C on the same implementation candidate. It does not
authorize production merge or deployment.

### Gate C — Runtime & Accessibility Validation (NOT STARTED / NOT AUTHORIZED)

Gate C passes only when:

- it validates the same implementation candidate that passed Gate B;
- every active route returns 200 in the production-equivalent static runtime;
- navigation, current state, language, freshness, landmarks, and content ownership
  match this contract;
- required viewport, enlargement, spacing, keyboard, contrast, and overflow states
  pass;
- evidence boundaries, including Forced Colors, are recorded at exactly the
  observed strength;
- final Required `Delivery / Quality` and substantive review pass.

Only Gate B PASS plus Gate C PASS authorizes lifecycle closure and squash merge of
the candidate PR into protected `main`. The subsequent automatic production deploy
is therefore the activation of a revision already validated by both gates, not the
environment in which Gate C is first attempted.

## 16. Change control

After Phase 1.4 freezes, this contract reopens only for:

- a real content, route, metadata, language, freshness, navigation, or
  accessibility defect;
- an invariant proved incorrect or impossible on the deployed platform;
- a frozen upstream decision reopened through its own change control;
- a clear product requirement that changes the identity surface.

It does not reopen to add more biography, make the site look busier, expose a
reserved route early, imitate another personal site, or introduce a content system
without a current consumer.
