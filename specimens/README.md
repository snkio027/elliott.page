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

This is Gate A evidence, not a cross-platform font-family decision. Gate B still
requires the same specimen to be reviewed on the target browser and operating-system
matrix before a final stack is selected.
