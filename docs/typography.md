# Elliott.page Typography System

**Version:** 0.1

**Status:** IN PROGRESS — Phase 1.2

**Depends on:** `information-and-page-semantics.md`
**Scope:** English, Simplified Chinese content, and code typography

---

## 1. Purpose

Phase 1.2 defines how Elliott.page is read before layout and decoration are
designed. The system must support the identity surface now and long-form Publishing
later without creating a second typographic language.

The target character is:

```text
Quiet
Editorial
Personal
Timeless
Content-first
```

Typography must create hierarchy through type choice, weight, size, line height,
and rhythm rather than through ornamental UI.

## 2. Frozen inputs from Phase 1.1

- The displayed personal name is `Elliott Bai` only.
- Home is an identity root rather than a feed.
- About is durable prose.
- Now is short, timestamped prose.
- Navigation initially contains the name, About, and Now.
- Content may naturally be English or Simplified Chinese.
- There is no site-wide language switch or mirrored translation requirement.
- HTML heading structure cannot be changed merely to obtain a visual size.

## 3. Typographic roles

The system needs four roles, not one font decision per component:

| Role | Surfaces | Required behavior |
| --- | --- | --- |
| Display | Identity, page title, article title | Distinct but restrained |
| Body | About, Now, Writing, Notes | Comfortable for sustained reading |
| Interface | Navigation, metadata, timestamps | Compact and immediately legible |
| Code | Inline code and code blocks | Clear character distinction and stable alignment |

Components consume these roles. They must not invent independent font families,
weights, or arbitrary sizes.

## 4. Language requirements

English and Simplified Chinese must both look intentional, but they do not need to
use identical glyph designs or identical line-height values.

The system must verify:

- Latin and CJK baseline alignment in mixed prose;
- punctuation spacing and line breaking;
- real glyph coverage without synthetic fallback boxes;
- available weights for both scripts;
- bold and emphasis that remain distinguishable without fake synthesis;
- local language selection through `lang` where glyph variants depend on language.

Chinese content support does not imply displaying a Chinese-language personal name.

## 5. Font delivery constraints

Font choice is also an architecture decision. The baseline priorities are:

1. no third-party font request at runtime;
2. no tracking or rendering dependency on an external font CDN;
3. no invisible text while fonts load;
4. minimal font payload and minimal number of weights;
5. explicit fallback stacks;
6. open licensing for any committed font asset;
7. stable rendering when a custom font fails.

If web fonts are selected, they must be self-hosted and versioned. `font-display`
behavior, preload policy, subsetting, licensing, and fallback metrics become part of
the acceptance gate rather than implementation details.

## 6. Candidate strategies

### Candidate A — System-first

```text
Display / Body  ui-serif with explicit platform fallbacks
Interface       ui-sans-serif / system-ui
Code            ui-monospace
```

Advantages:

- zero font payload;
- no font loading delay or layout shift;
- strongest durability and privacy;
- native rendering on each platform.

Risks:

- greater visual variance between operating systems;
- mixed Latin and CJK metrics require careful testing;
- some Windows serif fallbacks may feel less refined.

This is the first prototype baseline because it has the smallest operational
surface. It is a candidate, not yet the frozen production choice.

### Candidate B — Self-hosted editorial pair

```text
Latin editorial text  Source Serif 4
Simplified Chinese    Noto Serif SC / Noto Serif CJK SC
Interface             system-ui
Code                  ui-monospace
```

Source Serif 4 is an open-source text family with variable and optical-size builds.
Noto Serif CJK provides Simplified Chinese coverage and language-specific variable
font options. Both are available under the SIL Open Font License 1.1.

Official references:

- <https://github.com/adobe-fonts/source-serif>
- <https://github.com/notofonts/noto-cjk>
- <https://github.com/notofonts/noto-cjk/blob/main/Serif/LICENSE>

Advantages:

- stronger editorial character;
- explicit, versioned rendering;
- broad CJK coverage.

Risks:

- CJK font payload can be substantial;
- Latin/CJK pairing and fallback metrics require validation;
- subsetting introduces a build and maintenance concern;
- extra weights can quietly expand the delivery surface.

Candidate B is adopted only if a specimen demonstrates a meaningful reading and
identity benefit over Candidate A.

## 7. Initial specimen hypothesis

The first comparison should use two families of roles rather than several branded
fonts:

```text
Display / Body  Serif
Interface       Sans serif
Code            Monospace
```

The specimen must include:

- `Elliott Bai` as the identity heading;
- Home navigation and email contact;
- an English About paragraph;
- a Simplified Chinese prose paragraph that does not contain a personal name;
- a mixed-language sentence;
- a Now timestamp;
- headings from `h1` through `h4`;
- links, lists, blockquotes, inline code, and a code block;
- regular, emphasized, and strong text;
- narrow and wide viewport samples.

Final product copy is not required for the specimen.

## 8. Decisions still open

Phase 1.2 has not yet frozen:

- system-first versus self-hosted fonts;
- exact fallback stacks;
- exact font weights;
- type scale;
- responsive type behavior;
- body and heading line heights;
- paragraph and heading rhythm;
- reading measure;
- code font treatment;
- CJK-specific spacing adjustments;
- font synthesis policy;
- font loading and subsetting policy, if applicable.

Color, page layout, component styling, and final content remain outside this phase.

## 9. Acceptance gate

Phase 1.2 is complete only when:

- every typographic role has a frozen family and fallback stack;
- selected font assets have verified source, version, and license;
- only necessary weights and styles are shipped;
- exact type sizes and line heights are defined;
- paragraph, list, heading, metadata, link, and code rhythm are defined;
- English, Simplified Chinese, and mixed-language specimens are reviewed;
- narrow and wide viewport behavior is verified;
- text remains readable when custom fonts fail or are unavailable;
- font loading introduces no avoidable invisible-text period;
- the resulting decisions can be encoded as shared primitives in Phase 1.3 without
  component-specific exceptions.

Until this gate passes, this document remains a working design record rather than a
frozen system.
