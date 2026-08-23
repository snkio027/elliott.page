# Typography specimens

**Status:** PASS / LOCAL CONTROL BASELINE — Phase 1.2 / Gate A

This directory contains local design-validation artifacts. It is not imported by
Astro, copied to `public/`, or deployed as part of Elliott.page.

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

This is the frozen Gate A control baseline. Gate B subsequently selected the Native
System Font Stack for v1 using current-host evidence from the local macOS
Chrome/Chromium environment. Cross-platform typography behavior remains unverified
and is intentionally deferred until a real need or defect appears.

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

**Next:** Gate C — Implementation Readiness
