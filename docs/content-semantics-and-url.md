# Elliott.page Content Semantics & URL Contract v1.0

**Version:** 1.0

**Status:** PASS / FROZEN — Phase 2.1: Content Semantics & URL Contract

**Phase 2:** IN PROGRESS — Publishing

**Gate A:** PASS / FROZEN — Content Semantics & URL Contract

**Gate B:** NEXT / NOT STARTED — Content Schema & Route Eligibility Implementation

**Gate B authorization:** NOT AUTHORIZED UNTIL GATE A MERGES TO PROTECTED `main`

**Publishing surfaces:** NOT AUTHORIZED

**Gate A evidence:** LOCAL QUALITY PASS / REQUIRED `Delivery / Quality` PASS /
SUBSTANTIVE DELTA REVIEW PASS

**Lifecycle closure:** The final status-only revision must pass Required
`Delivery / Quality` and status-diff confirmation before protected-main merge.

**Depends on:** `manifesto.md`, `architecture.md`,
`information-and-page-semantics.md`

**Frozen inputs:** Foundation; Phase 1 — Identity & Design

**Scope:** Writing and Notes as durable Markdown data assets

---

## 1. Purpose

Phase 2 changes Elliott.page from a complete identity space into a place where
Elliott can keep publishing over time.

Phase 2.1 begins with the content contract rather than a list page or article
layout:

```text
Authored Markdown
        ↓
Content semantics
        ↓
Stable identity
        ↓
Build-time validation
        ↓
Later publishing surfaces
```

This document defines what Writing and Notes mean, which authored fields are
allowed, how their dates and draft state behave, how durable URLs derive from
source identity, how public ordering remains deterministic, and which invalid
states fail closed.

It does not define how a list, excerpt, article header, archive, or navigation item
looks. Content is treated as a durable data asset before it becomes a rendered
surface.

## 2. Frozen inputs and authority

Phase 2.1 consumes these decisions as read-only inputs:

| Authority | Frozen responsibility |
| --- | --- |
| Manifesto | owned content, durable URLs, Content First, Capture Before Publish, bilingual-by-nature |
| Repository architecture | Markdown-only Content Layer, strict validation, minimal surface |
| Phase 1.1 | Writing/Notes editorial meaning, per-item language, navigation describes reality |
| Phase 1.2 | typography roles, reading measure, rhythm, language behavior |
| Phase 1.3 | layout, semantic colors, spacing ownership, page composition |
| Phase 1.4 | active Identity surfaces and their publication boundary |

The current `src/content.config.ts` is a Phase 0.2 implementation baseline, not an
unreviewed authority over Phase 2 product semantics. Gate A records the intended
contract without modifying that file. Gate B must later reconcile every recorded
delta explicitly.

Phase 1 remains frozen. Publishing must consume its typography, layout, colors,
navigation ownership, and identity surfaces without redesign.

## 3. Phase boundary

Gate A may change only:

- this contract;
- README lifecycle and authority links required to locate this contract.

Gate A does not create or modify:

- `src/content.config.ts`;
- Writing or Notes Markdown entries;
- `/writing/`, `/notes/`, or any detail route;
- production navigation;
- production styles or layout primitives;
- scripts, authoring commands, fixtures, or test infrastructure.

Phase 2.1 does not decide:

- list or detail-page composition;
- cards, excerpts, pagination, year archives, or tables of contents;
- tags, topics, series, related content, or knowledge relationships;
- RSS, sitemap, Open Graph, search, comments, or analytics;
- a CMS or content creation command;
- scheduled publishing or preview infrastructure.

> Phase 2.1 defines content as a data asset. It does not design content as a page.

## 4. Writing and Notes

Writing and Notes differ by editorial commitment, not length, format, perceived
importance, or visual treatment.

### 4.1 Writing

Writing carries **editorial commitment**:

> Finished enough to stand on its own as a work Elliott is willing to maintain and
> cite over time.

Writing may include essays, technical explanations, architecture analysis, or
long-form reflection. A short piece may be Writing when it makes a complete claim.
A long draft is not Writing merely because it contains many words.

Writing invariants:

- it has a stable human-readable title;
- it is meaningful as a standalone document;
- its public URL is durable and citable;
- later edits preserve the original publication identity;
- an optional description is an authored abstract, not an automatically generated
  excerpt.

### 4.2 Notes

Notes carry **capture commitment**:

> Worth keeping and making addressable even when the thought remains open, small,
> provisional, or unfinished.

Notes may include reading observations, learning records, questions, experiments,
or compact ideas. Openness is an editorial quality, not missing structure.

Notes invariants:

- a Note may be short or unresolved but must still contain a meaningful body;
- it has its own stable human-readable title in v1;
- it may remain a Note permanently;
- it is not required to become Writing;
- lower publication friction must come from fewer fields and a later evidence-led
  workflow, not from ambiguous document identity.

### 4.3 No automatic promotion

A published Note is not moved into the Writing collection when a related finished
work emerges. Moving it would change its URL namespace and violate its public
identity.

If a Note later leads to Writing:

```text
Published Note
    remains at /notes/<stable-id>/

New Writing
    receives its own /writing/<stable-id>/
```

Future relationship metadata may connect them only after a real consumer exists.
Phase 2.1 does not prebuild that relationship system.

## 5. Minimal authored metadata

V1 admits only the following authored fields:

| Field | Writing | Notes | Meaning |
| --- | --- | --- | --- |
| `title` | required | required | stable human-readable document name |
| `description` | optional | forbidden | authored Writing abstract for document metadata; never a synthetic excerpt |
| `date` | required | required | authored publication date-only value |
| `updated` | optional | optional | date of the latest substantive editorial revision |
| `lang` | required | required | natural language of the item: `en` or `zh-CN` |
| `draft` | optional, defaults to `true` | optional, defaults to `true` | sole public visibility switch |
| Markdown body | required | required | substantive content owned by the entry |

The stable ID is deliberately absent from frontmatter. It derives from the file
name under the collection rules in Section 8.

No other frontmatter field is valid in v1. Unknown fields fail validation rather
than being silently retained as speculative metadata.

### 5.1 Title decision for Notes

Notes require `title` in v1.

An optional title would force later consumers to invent a document name from a
date, stable ID, or body excerpt. That derived name could be unstable, unclear as
link text, or inconsistent across HTML metadata, lists, and the detail route.

The title may be concise. Requiring it does not impose a minimum length, a finished
argument, or Writing-level polish. If real capture practice later proves that
authentic Notes are being lost because they cannot be honestly titled, that is a
product finding capable of reopening this decision.

### 5.2 Description decision

`description` belongs only to Writing and remains optional.

When present, it is a non-empty authored abstract. Its first v1 consumer is the
public Writing document's descriptive metadata. Whether it is also shown in a
future list is a surface decision and is not frozen here.

Notes do not admit `description`. Their title and body are sufficient, and an
additional summary would increase capture friction without a current semantic
need.

### 5.3 Field value rules

- `title` and `description`, when present, must contain non-whitespace text after
  trimming;
- `lang` is exactly `en` or `zh-CN`;
- `draft` is a YAML boolean, never the strings `"true"` or `"false"`;
- `date` and `updated` are authored date-only strings, not JavaScript `Date`
  objects or coercible free-form values;
- collection-specific fields are not accepted by the other collection.

## 6. Markdown body ownership

Writing and Notes remain Markdown-only (`.md`). Phase 2.1 does not authorize MDX.

The frontmatter title owns the document name. The Markdown body owns the
substantive content below that title.

### 6.1 Non-empty body oracle

A body is non-empty only when its parsed Markdown AST contains at least one of:

- a paragraph with a descendant text or inline-code node whose literal value
  remains non-empty after ECMAScript `String.prototype.trim()`;
- a fenced or indented code-block node whose literal value remains non-empty after
  the same trim operation.

Paragraphs inside list items or blockquotes use the same rule. Link text qualifies
through its paragraph text node.

The following do not satisfy non-empty body by themselves:

- frontmatter or whitespace;
- headings;
- thematic breaks;
- images or image alt text;
- raw HTML or HTML comments;
- empty code fences.

These exclusions do not forbid those nodes in an otherwise non-empty body. They
only prevent structural or opaque markup from being mistaken for substantive v1
Writing/Notes content.

### 6.2 Heading oracle

The body may contain no headings. When headings exist:

- every body heading is H2 through H6; H1 always fails because the frontmatter
  title is the single document H1 owner;
- the first body heading is H2;
- reading headings in source order, a move to a deeper level may increase by at
  most one;
- the same level or any shallower level is valid.

Therefore `H2 → H3`, `H3 → H2`, and `H2 → H2` pass. `H2 → H4`, a first H3, and
any H1 fail. Heading text alone does not satisfy the non-empty-body oracle.

No minimum word count distinguishes Writing from Notes, and the body is never used
to derive the stable ID.

Gate B must enforce the body and heading oracles from the parsed Markdown AST. It
must not silently repair them, derive a replacement title, or publish an empty
shell.

## 7. Date semantics

### 7.1 Date-only source values

`date` and `updated` use strict authored strings:

```yaml
date: "2026-08-25"
updated: "2026-09-03"
```

The semantic invariant is the parsed value: it must remain a strict date-only
string. Quoting the YAML scalar is the v1 authoring convention because it avoids
timestamp inference, but Gate B must not claim to verify quote characters unless
it deliberately validates raw frontmatter source.

A valid value must:

- match `YYYY-MM-DD` exactly;
- represent a real Gregorian calendar date;
- survive an explicit UTC calendar round trip unchanged.

The source string remains authoritative. Rendering may parse
`<value>T00:00:00.000Z` and must format with an explicit UTC time zone so the
visible calendar date and semantic `datetime` cannot drift by build environment.

### 7.2 Publication date

`date` is Elliott's authored publication date for the content item. It is not:

- file creation or modification time;
- Git author or commit time;
- pull-request, build, merge, or deploy time;
- a value inferred from the stable ID;
- a scheduling mechanism.

`draft` is the sole visibility switch. Gate B must not interpret a future `date` as
an implicit draft, fail it by comparing with the build clock, or silently schedule
publication. For every otherwise valid entry:

```text
draft: true
→ not public

draft: false
→ public-eligible, independent of date versus wall-clock time
```

A future-authored date on `draft: false` is therefore an editorial metadata review
issue, not a clock-dependent build rule. The same source revision must not expose
different routes merely because it is built on another day. Scheduled publishing
is deferred.

### 7.3 Substantive update date

`updated` exists only when the public content has received a substantive editorial
revision: a changed claim, explanation, conclusion, structure, or other alteration
that matters to a returning reader.

The following do not require `updated` by themselves:

- formatting-only changes;
- typo, punctuation, or grammar corrections that do not alter meaning;
- build, schema, route, or CSS changes;
- metadata maintenance unrelated to the content's meaning.

When present:

- `updated` must be a valid date-only string;
- `updated` must not be earlier than `date`;
- `updated` does not replace or reorder by the original publication date;
- equal `date` and `updated` values are valid for a substantive same-day revision.

This is an authored editorial judgment. Git history may provide provenance, but it
does not set or refresh the field automatically.

## 8. Stable identity and permanent URLs

### 8.1 Collection plus file ID

Public identity is:

```text
collection + stable-id
```

The stable ID is the Markdown file name without the `.md` extension. V1 content
files are flat within their collection directories:

```text
src/content/writing/<stable-id>.md
src/content/notes/<stable-id>.md
```

Nested content paths are invalid in v1 because they would introduce a second,
implicit URL hierarchy.

The stable ID grammar is:

```regex
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

This permits lowercase ASCII letters, digits, and single hyphen separators. It
rejects spaces, underscores, uppercase variants, leading/trailing hyphens,
repeated hyphens, and locale-sensitive normalization.

Validation applies to the raw file stem before any loader-generated slugging,
case-folding, transliteration, or other normalization. An invalid stem fails; it is
never rewritten into a valid ID. Astro's generated entry ID is not an independent
source of public identity.

### 8.2 Canonical route mapping

The mapping is exact and deterministic:

```text
src/content/writing/system-boundaries.md
→ /writing/system-boundaries/

src/content/notes/learning-zig.md
→ /notes/learning-zig/
```

Canonical URLs include the trailing slash, matching the existing site convention.
Dates do not enter the path. No authored `slug` field exists.

The collection indexes are reserved at:

```text
/writing/
/notes/
```

Reservation does not activate a route or navigation item. Those surfaces become
real only through their later implementation gates and only when they describe
deployed product reality.

### 8.3 Immutability after publication

Before first site publication, an ID may change while the item remains an
unpublished draft. After a URL has been public:

- changing the title does not rename the file;
- changing the language does not rename the file;
- updating the body does not rename the file;
- the entry is not moved between Writing and Notes;
- changing `draft: false` back to `true` is not a normal editing operation because
  it would remove a public URL.

Deletion, reclassification, or URL migration requires an explicit defect,
security/legal need, or future redirect/tombstone decision. Phase 2.1 does not
create a redirect framework, so the safe v1 behavior is to preserve the published
source and URL. None of these operations may silently turn a previously public URL
into a normal 404.

### 8.4 Collision rules

- a validated stable ID must be unique within its collection;
- duplicate identity fails the build;
- the same stable ID may exist once in Writing and once in Notes because the URL
  namespaces differ;
- file-system enumeration order must never decide which duplicate wins.

## 9. Draft and public visibility semantics

Safe publication is explicit:

```yaml
# omitted draft
# → semantically draft: true

draft: true
# → unpublished site source asset

draft: false
# → eligible for a public surface
```

The missing-field default is `true`. An author must write `draft: false`
explicitly to make an otherwise valid entry eligible for publication.

`draft` is a site-publication state, not a confidentiality or access-control
boundary. The Elliott.page repository is public. Sensitive, confidential, or
otherwise private material must not be committed to it, regardless of `draft`.

For `draft: true` entries:

- the source may exist and must still pass metadata, ID, date, and body validation;
- it is absent from public collection queries and ordering;
- it does not generate a production detail route or public output artifact;
- guessing its Elliott.page stable URL returns the normal not-found result;
- it does not activate Writing/Notes navigation or an empty placeholder surface.

Drafts are not silently skipped when malformed. A draft may be unpublished, but it
is still a repository data asset and therefore fails the quality boundary when its
contract is invalid.

Local preview and authoring workflow behavior are deferred to Phase 2.4. Their
future implementation must not weaken production fail-closed behavior.

## 10. Deterministic public ordering

When a later Writing or Notes list exists, its default order is:

1. authored `date`, descending;
2. stable ID, ASCII lexical order ascending, when dates are equal.

Only `draft: false` entries participate.

`updated` does not move an older item to the top. File-system order, loader order,
Git time, and build time are never ordering inputs.

This contract freezes the ordering semantics only. It does not require date
grouping, archive headings, pagination, cards, excerpts, or visible sort controls.

## 11. Fail-closed validation

The build boundary must fail deterministically for every invalid repository state
below:

| Invalid state | Required result |
| --- | --- |
| missing required frontmatter | fail |
| unknown or collection-incompatible frontmatter | fail |
| blank `title` or present-but-blank `description` | fail |
| unsupported `lang` | fail |
| non-boolean `draft` | fail |
| malformed or impossible `date` / `updated` | fail |
| `updated < date` | fail |
| invalid, nested, or duplicate stable ID | fail |
| body fails the Section 6.1 non-empty oracle | fail |
| heading sequence violates the Section 6.2 oracle | fail |

Validation must not:

- coerce free-form dates into acceptable values;
- infer missing required metadata from the file body, Git, or build environment;
- silently discard unknown fields;
- publish the first of two duplicate identities;
- filter malformed entries out and continue a successful build;
- treat draft status as permission to keep invalid data.

An empty collection is not invalid by itself. Gate A does not authorize fake
example content merely to make a directory or future list appear populated.

## 12. Current baseline delta inventory

Gate A intentionally leaves the current Content Layer unchanged. Gate B must later
resolve these known differences on one reviewed implementation candidate:

| Current baseline | Frozen Phase 2.1 intent |
| --- | --- |
| Writing and Notes expose `tags` | `tags` is not admitted in v1 |
| `date` and `updated` use `z.coerce.date()` | both remain strict authored date-only strings |
| Writing requires `description` | Writing `description` is optional |
| Notes requires `title` | retained: Notes title remains required |
| glob loaders allow nested Markdown paths | v1 content files are flat; stable ID is the file stem |
| frontmatter validation does not prove body integrity | the non-empty-body and heading oracles fail closed |
| draft defaults to `true` | retained and extended to public query/route fail-closed behavior |

This inventory is evidence of an implementation handoff, not authorization to edit
`src/content.config.ts` in the Gate A PR.

Gate B must discover and reject nested Markdown. Merely narrowing a glob from
`**/*.md` to `*.md` would make an invalid nested file invisible rather than fail
closed, so it is not sufficient evidence of this invariant.

## 13. Gate B implementation boundary

After Gate A passes and merges, Gate B may map the frozen contract into the Astro
Content Layer. Its scope is limited to:

- the minimum Writing and Notes schemas;
- strict date-only and cross-field validation;
- stable-ID and flat-path validation;
- body integrity validation;
- deterministic public-entry filtering and ordering;
- deterministic route-eligibility/path derivation that later surfaces can consume;
- focused invalid fixtures or checks needed to prove fail-closed behavior.

Gate B does not by itself authorize:

- public `/writing/` or `/notes/` list/detail surfaces;
- production navigation activation;
- formal content copy for publication;
- list or article visual design;
- authoring scripts or a CMS;
- RSS, sitemap, Open Graph, taxonomy, search, or AI metadata.

Route eligibility is not route activation. Phase 2.2 and Phase 2.3 must expose only
destinations that actually exist and have passed their own implementation gates.

## 14. Decision gates

### Gate A — Content Semantics & URL Contract (PASS / FROZEN)

Gate A passes only when:

- Writing and Notes have distinct commitment semantics without a length rule;
- the exact v1 metadata surface and Notes title policy are decided;
- body ownership and Markdown-only scope are executable;
- publication and substantive-update dates have strict date-only semantics;
- draft omission is safely defined and public visibility fails closed;
- stable identity derives from collection plus file name without slug metadata;
- permanent URL and post-publication immutability rules are explicit;
- ordering and same-date tie-breaking are deterministic;
- all required invalid states fail rather than disappear;
- current implementation deltas are recorded without being implemented;
- no publishing route, content entry, style, script, or production source enters the
  Gate A change.

Gate A `PASS / FROZEN` on protected `main` authorizes Gate B to implement the
content contract. It does not authorize a Publishing surface or production
navigation change.

### Gate B — Content Schema & Route Eligibility Implementation (NEXT / NOT STARTED)

Gate B begins only after Gate A is `PASS / FROZEN` on protected `main`.

Gate B passes only when:

- Astro schemas and validators match every admitted field and failure state;
- date-only values remain stable across time zones;
- draft entries cannot enter public queries or production route eligibility;
- stable IDs and URLs derive deterministically from valid flat file names;
- public ordering is deterministic;
- focused negative evidence proves fail-closed behavior;
- no deferred metadata or Publishing UI enters production;
- canonical local and Required `Delivery / Quality` pass;
- substantive implementation review closes all findings.

Gate B PASS supplies trusted content primitives to Phase 2.2 and Phase 2.3. It
does not automatically activate those surfaces.

## 15. Deferred decisions

Phase 2.1 explicitly defers:

- `tags`, `topics`, taxonomy, series, and collections beyond Writing/Notes;
- `related`, `references`, `canonical`, translations, and knowledge links;
- cover images, authors, featured state, reading time, and table-of-contents
  metadata;
- excerpt generation and description presentation;
- list layout, article layout, cards, pagination, and archives;
- scheduled publishing and production draft previews;
- deletion, redirects, tombstones, and URL migration infrastructure;
- `new:note`, `new:writing`, or other authoring automation;
- RSS, sitemap, Open Graph, search, comments, CMS, analytics, and AI interfaces.

Deferred means absent from the contract and schema, not accepted now for possible
future use.

## 16. Change control

After Gate A freezes, this contract reopens only for:

- a real publishing or capture workflow defect;
- an incorrect, contradictory, or impossible content invariant;
- evidence that the required Notes title blocks authentic capture;
- a durable-URL or data-integrity defect;
- a clear product requirement with a current consumer for new metadata;
- an incompatible Astro, Markdown, or Web Platform change.

It does not reopen because another publication system has more fields, a future
feature might need taxonomy, a generator could populate metadata cheaply, or a
list design would look richer with more data.

> Every content field must pay rent. Every public URL must outlive its title.
