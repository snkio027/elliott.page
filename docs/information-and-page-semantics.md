# Elliott.page Information & Page Semantics

**Version:** 1.0

**Status:** FROZEN — Phase 1.1

**Owner:** Elliott Bai
**Scope:** Elliott.page v1 identity surface

---

## 1. Purpose

This document freezes the information model for the first public identity surface
of Elliott.page. It defines why each route exists, what information belongs there,
and how a visitor moves between pages.

It does not define typography, color, spacing, layout, animation, or component
appearance. Those decisions belong to later Phase 1 work.

## 2. Semantic model

Elliott.page represents identity at different time scales:

```text
/       Who I am here.
/about  Who I am over time.
/now    Who I am right now.
```

Publishing surfaces extend this model later:

```text
/writing  What I have worked through.
/notes    What I am working through.
```

Reserved routes are part of the information architecture, but they are not active
surfaces until they contain real product capability or content.

## 3. Route responsibilities

| Route | Responsibility | Time scale | Current state |
| --- | --- | --- | --- |
| `/` | Identity and orientation | Durable | Phase 1 |
| `/about` | Durable personal context | Low-frequency change | Phase 1 |
| `/now` | Timestamped current snapshot | Periodic change | Phase 1 |
| `/writing` | Editorial work that can stand on its own | Accumulative | Reserved for Phase 2 |
| `/notes` | Thinking worth keeping while still in motion | Accumulative | Reserved for Phase 2 |
| `/rss.xml` | Open subscription | Generated | Reserved for Phase 3 |

No placeholder page or navigation item is created for a reserved route.

> Reserved route does not mean active surface.

## 4. Home (`/`)

The home page is the identity root, not a feed. Its first responsibility remains
stable even after publishing surfaces exist: a visitor should immediately know
whose space this is and where to go next.

The Phase 1 information hierarchy is:

```text
Elliott Bai

A short statement about this place.

About    Now

hi@elliott.page
```

Only `Elliott Bai` is used as the displayed personal name. A Chinese-language
personal name, romanization variant, parenthetical alias, or list of equivalent
names is not displayed.

This identity decision does not remove support for Chinese-language pages or
content.

The short statement describes the place, not a professional persona. Final wording
is not frozen in Phase 1.1.

The home page does not lead with a role, technology, industry, or personal-brand
label. In particular, it does not define Elliott as a software engineer, founder,
builder, creator, or technology enthusiast. Current work and interests belong in
`/about` or `/now`.

Publishing may later add recent Writing or Notes below the identity layer. Those
sections remain a secondary responsibility and must not replace identity and
orientation.

## 5. About (`/about`)

About answers: **Who is Elliott?**

It may contain:

- a concise background;
- durable interests and questions;
- the purpose of Elliott.page;
- selected public identities;
- contact information.

It is not a resume. Experience, education, skills, certifications, achievements,
and technology inventories must not turn the page into a qualification document.
If a resume becomes a real product requirement, it receives a separate route and
semantic contract.

Temporary projects, current reading, and short-lived interests belong in `/now`.

## 6. Now (`/now`)

Now is a short snapshot of a period, not a real-time status page. It is ordinary
Markdown content that can be periodically replaced rather than a structured status
database.

It must display an explicit freshness marker, for example:

```text
Last updated: August 2026
```

Possible topics include what Elliott is building, learning, reading, or thinking
about. These are editorial headings, not required schema fields.

The home page must not depend on `/now` being fresh. An old Now page should be
honest about its timestamp without making the identity root appear abandoned.

## 7. Future publishing semantics

Writing and Notes differ by editorial commitment, not length:

```text
Writing  Editorial commitment: finished enough to stand on its own.
Notes    Capture commitment: worth keeping before or while it becomes Writing.
```

Phase 1.1 freezes these meanings only. It does not create routes, listings,
placeholder content, or navigation entries for them.

## 8. Navigation

Phase 1 primary navigation exposes only the world that currently exists:

```text
Elliott Bai    About    Now
```

`Elliott Bai` links to `/`; there is no additional `Home` text item.

The footer uses `hi@elliott.page` as the primary contact path. External identities
are added only when they help the visitor and should normally live in About or a
restrained footer. The home page must not become a link directory.

When Publishing is real, navigation may evolve to:

```text
Elliott Bai    Writing    Notes    About    Now
```

> Navigation describes reality, not the roadmap.

## 9. Language model

Elliott.page v1 has no global language mode or site-wide language switch. Such a
control would imply that every page has a complete mirrored translation and would
create permanent translation debt.

Instead, each page or content item has a natural language:

```text
Page or content item
└── lang: en | zh-CN
```

The document language must be set correctly. Mixed-language fragments use local
`lang` attributes where appropriate. A translation relationship may be introduced
later for individual content items that genuinely have translated counterparts.

The identity root uses `Elliott Bai` as its displayed name regardless of the
language of surrounding content.

## 10. Document semantics

Phase 1 implementation uses native document structure:

```text
<header>
  <nav>

<main>
  <article> or <section>

<footer>
```

Required invariants:

- each page has exactly one primary `h1`;
- heading levels express information hierarchy rather than visual size;
- each page has an accurate `<title>`;
- the document language is explicit;
- mixed-language fragments use local `lang` attributes when necessary;
- primary navigation is a `<nav>` landmark;
- primary content is a `<main>` landmark;
- link text is understandable without surrounding visual context;
- keyboard navigation does not depend on JavaScript;
- essential information is never available only through animation or hover.

These are document correctness requirements, not deferred accessibility polish.

## 11. Deferred decisions

Phase 1.1 does not freeze:

- font families or font files;
- type sizes or line heights;
- reading width;
- color or theme;
- spacing scale;
- navigation layout;
- responsive breakpoints;
- borders, radius, motion, or animation;
- final Home, About, or Now copy.

Typography is decided in Phase 1.2. Other visual tokens and layout decisions follow
in their respective phases.

## 12. Change control

This document is a frozen design contract. It is reopened only when a real product
need, usability finding, accessibility defect, or contradictory invariant proves a
decision wrong.

It is not reopened to add empty future surfaces, imitate another personal site, or
make the navigation look more complete.
