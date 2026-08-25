# Typography specimens

**Status:** LOCAL EVIDENCE PASS / REMOTE GATE PENDING — Phase 1.2 Gate C

This directory contains local design-validation artifacts. Astro does not import
the directory, copy it to `public/`, or deploy it as part of Elliott.page. The
typography specimen deliberately imports production CSS from `src/styles/` so the
same contract implementation is verified rather than duplicated.

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

**Gate C result:** LOCAL IMPLEMENTATION COMPLETE / LOCAL EVIDENCE PASS

**Remote gate:** PENDING — Required `Delivery / Quality`

**Phase 1.2 result:** NOT YET FROZEN
