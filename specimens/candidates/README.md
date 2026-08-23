# Gate B — Font Family Evaluation

**Status:** CURRENT-HOST EVALUATION COMPLETE — Phase 1.2 / Gate B remains IN
PROGRESS

**Control:** System-first specimen — PASS

**Current-host recommendation:** PROVISIONAL SELECT — System control

**Production integration:** NOT AUTHORIZED

This directory evaluates font systems against the frozen Typography Contract. The
HTML content, type scale, line heights, rhythm, measure, responsive rules, and
neutral shell remain identical. Candidate styles may replace only the Latin
Display, Text, and Meta font slots. CJK and Code remain system-first.

## Candidate matrix

| ID                   | Display / Heading | Body / Meta         | CJK    | Code        |
| -------------------- | ----------------- | ------------------- | ------ | ----------- |
| Control              | System serif      | System serif / sans | System | System mono |
| A — Modern Sans      | Geist             | Geist               | System | System mono |
| B — Neutral Sans     | Inter             | Inter               | System | System mono |
| C — Editorial Hybrid | Newsreader        | Geist               | System | System mono |

## Frozen evaluation rule

A candidate is selected only if it materially improves the complete system over
the zero-byte control. Visual novelty alone is not an improvement. The review uses
seven dimensions: Readability, Hierarchy, Bilingual cohesion, Character,
Resilience, Payload, and Longevity.

Each dimension receives a `1–5` score after the controlled browser pass:

```text
5  clear strength
4  good, with minor trade-off
3  acceptable / neutral
2  material weakness
1  contract failure
```

The score is a comparison aid, not a substitute for contract admission. A payload,
fallback, accessibility, or layout-shift failure cannot be averaged away.

## Upstream evidence

| Family     | Pinned source                                                   | License     | Official source assets used                         |
| ---------- | --------------------------------------------------------------- | ----------- | --------------------------------------------------- |
| Geist      | `v1.7.2`, released 1 June 2026                                  | SIL OFL 1.1 | `Geist[wght].woff2`, `Geist-Italic[wght].woff2`     |
| Inter      | `v4.1`, released 16 November 2024                               | SIL OFL 1.1 | `InterVariable.woff2`, `InterVariable-Italic.woff2` |
| Newsreader | commit `cfcb4f7af0e52c25e8df2a2431814c8e5fe2e155`, 1 March 2021 | SIL OFL 1.1 | `Newsreader[opsz,wght].woff2`                       |

Official upstreams:

- <https://github.com/vercel/geist-font/releases/tag/v1.7.2>
- <https://github.com/rsms/inter/releases/tag/v4.1>
- <https://github.com/productiontype/Newsreader/tree/cfcb4f7af0e52c25e8df2a2431814c8e5fe2e155>

The proposal named Geist `v1.7.1`; upstream verification found `v1.7.2` to be the
current release at evaluation time. Newsreader has no tagged GitHub release, so the
asset is pinned to a commit rather than a moving branch.

## Fair Latin subset

Comparing upstream WOFF2 files directly would compare different script coverage,
not just font cost: Inter's source variables are much broader than Geist's. Every
candidate therefore uses the same Latin editorial Unicode set and explicit axes.
Unsupported characters remain eligible for the declared system fallbacks because
each `@font-face` repeats the matching `unicode-range`.

```text
U+0000-00FF
U+0131
U+0152-0153
U+02BB-02BC
U+02C6
U+02DA
U+02DC
U+0304
U+0308
U+0329
U+2000-206F
U+20AC
U+2122
U+2191
U+2193
U+2212
U+2215
U+FEFF
U+FFFD
```

Axis limits match the frozen semantic needs:

| Asset             | Retained axes                |
| ----------------- | ---------------------------- |
| Geist normal      | `wght 400–600`               |
| Geist italic      | static `wght 400`            |
| Inter normal      | `opsz 14–32`, `wght 400–600` |
| Inter italic      | `opsz 14–32`, `wght 400`     |
| Newsreader normal | `opsz 16–72`, `wght 400–600` |

Subsets were generated with FontTools `4.63.0` and Brotli `1.2.0`: first
`fonttools varLib.instancer` applied the axis limits with timestamp recalculation
disabled, then `pyftsubset` applied the shared Unicode list and emitted WOFF2. The
checked-in files are evaluation assets; production assets are not authorized by
this record.

Source WOFF2 SHA-256 values:

| Source asset      | SHA-256                                                            |
| ----------------- | ------------------------------------------------------------------ |
| Geist normal      | `a369fcf5628ea2aa4e1b9e2ec6a5b3624e365bda588e1f0f2f12b564f728fbb8` |
| Geist italic      | `5aa7d48f114322a085337fad71e52664d6fd69331eb7e395af3b7d0025613da4` |
| Inter normal      | `693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3` |
| Inter italic      | `e564f652916db6c139570fefb9524a77c4d48f30c92928de9db19b6b5c7a262a` |
| Newsreader normal | `1faa3380ac0e87e057b180e03fd94bd708a612afb67d2590677be4508909fae9` |

## Payload record

Payload is the sum of the selected WOFF2 files on a normal bilingual specimen. It
excludes the small CSS file and rounds only in the display column.

| System             |     Normal |     Italic | Editorial Display |                   Total | Contract                 |
| ------------------ | ---------: | ---------: | ----------------: | ----------------------: | ------------------------ |
| Control            |      `0 B` |      `0 B` |             `0 B` |                   `0 B` | PASS                     |
| Geist              | `19,128 B` | `12,068 B` |                 — | `31,196 B` / `30.5 KiB` | PASS                     |
| Inter              | `47,968 B` | `33,464 B` |                 — | `81,432 B` / `79.5 KiB` | PASS                     |
| Newsreader + Geist | `19,128 B` | `12,068 B` |        `63,684 B` | `94,880 B` / `92.7 KiB` | PASS, near initial limit |

All candidates remain below the frozen `100 KiB` initial visible and `250 KiB`
normal-page font-transfer ceilings. Passing the byte ceiling does not establish
that the transfer is worthwhile.

Checked-in WOFF2 SHA-256 values:

| Evaluation asset  | SHA-256                                                            |
| ----------------- | ------------------------------------------------------------------ |
| Geist normal      | `46ac65e9660a642fc3330cc4494bfb5d4f08f54cec8e0a34c22b89ce9fc19f4b` |
| Geist italic      | `12b83a5ba8bcefe56831d1e86eb3554210777e7eae7a66a16dffe322f93711e4` |
| Inter normal      | `fdb9b0c89e8e5dc95a3764004d53f3c3f3085f4ad162339f6ab6fd5b9e72fe11` |
| Inter italic      | `f73bd787e2c679937a2e72d1aa94eae65bd8f5fd9bf4ad0fe7340d4ad2e9a5ed` |
| Newsreader normal | `3a871cb5a902d58c422ca4a5f4478b6666d1167e1448bb2f0054b003e4769ba8` |

## Required browser matrix

Each system must be reviewed at `320px`, `768px`, and `1440px` with normal font
loading. It must also pass:

- `320px` at simulated 200% root text;
- the WCAG text-spacing override;
- 200% text plus the spacing override;
- intentional custom-font blocking while retaining the candidate fallback stack;
- two-second delayed loading, with no changed line breaks or block height;
- real font availability and zero third-party font requests.

## Decision record

### Evidence boundary

The controlled pass was completed on 23 August 2026 in the current macOS browser
session. It establishes local font activation, geometry, overflow, stress-state,
fallback, and payload evidence. It does not claim a Windows, Linux, iOS, Android,
or independent browser-engine result. Gate B therefore remains open until the
target browser and operating-system matrix receives final visual confirmation.

No remote font service was contacted by the specimen. The local server observed
only the selected candidate stylesheet and its local WOFF2 assets. The browser
FontFaceSet contained `0` faces for Control, `2` for Geist, `2` for Inter, and `3`
for Editorial; each candidate's own faces reported unavailable in its intentional
blocked state.

### Geometry and resilience

| Test                                    | Control | Geist | Inter | Newsreader + Geist |
| --------------------------------------- | ------- | ----- | ----- | ------------------ |
| Normal load at `320px`                  | PASS    | PASS  | PASS  | PASS               |
| Normal load at `768px`                  | PASS    | PASS  | PASS  | PASS               |
| Normal load at `1440px`                 | PASS    | PASS  | PASS  | PASS               |
| Page-level horizontal overflow          | None    | None  | None  | None               |
| `320px`, simulated 200% text            | PASS    | PASS  | PASS  | PASS               |
| `320px`, WCAG spacing                   | PASS    | PASS  | PASS  | PASS               |
| `320px`, 200% + spacing                 | PASS    | PASS  | PASS  | PASS               |
| Long code remains locally scrollable    | PASS    | PASS  | PASS  | PASS               |
| Intentional font block preserves access | PASS    | PASS  | PASS  | PASS               |
| Delayed-load line and block stability   | N/A     | FAIL  | PASS  | FAIL               |

At `320px` and `768px`, the measured Display, English title, English Body,
Chinese title, and Chinese Body block heights remained unchanged between blocked
and loaded states for every candidate. At `1440px`, CJK and Body geometry also
remained stable, but the English title exposed a decisive difference:

| Candidate          | Fallback title block | Loaded title block |                          Delta | Result |
| ------------------ | -------------------: | -----------------: | -----------------------------: | ------ |
| Geist              |           `81.852px` |        `135.609px` |   `+53.758px` / one added line | FAIL   |
| Inter              |           `81.852px` |         `81.852px` |                          `0px` | PASS   |
| Newsreader + Geist |          `135.609px` |         `81.852px` | `−53.758px` / one removed line | FAIL   |

This is not an overflow defect, but it violates the frozen rule that font loading
must not change acceptance-specimen line breaks or block height. The failure cannot
be averaged away by stronger visual scores.

### Visual comparison

- **Control** produces the most coherent bilingual reading voice on this host.
  Its Latin serif and system Song-style CJK remain quiet, editorial, and closely
  matched in weight. It has the least unique Latin identity, but the result feels
  durable rather than unfinished.
- **Geist** is crisp and readable, with clear Latin hierarchy and the lowest custom
  payload. Beside the system CJK serif, however, it splits the page into a modern
  interface-like Latin voice and a more literary Chinese voice. The wide-title
  swap failure makes it ineligible in the current strategy.
- **Inter** is the strongest technical web-font candidate: sustained Latin reading
  is clear and its system-sans fallback preserved all measured geometry. Its
  bilingual split is still obvious, and the extra `79.5 KiB` produces the weakest
  identity gain over a mature system stack.
- **Newsreader + Geist** creates the strongest Display and Heading character.
  Newsreader relates naturally to the system CJK serif at heading scale, but the
  Geist-versus-CJK Body textures remain visibly separate. At `92.7 KiB`, it also
  consumes almost the entire initial font budget before failing delayed-load
  stability.

### Scores

| System             | Readability | Hierarchy | Bilingual cohesion | Character | Resilience | Payload | Longevity | Total / 35 |
| ------------------ | ----------: | --------: | -----------------: | --------: | ---------: | ------: | --------: | ---------: |
| Control            |           4 |         4 |                  5 |         3 |          5 |       5 |         5 |     **31** |
| Geist              |           4 |         4 |                  2 |         3 |          2 |       5 |         3 |     **23** |
| Inter              |           5 |         4 |                  2 |         2 |          5 |       4 |         4 |     **26** |
| Newsreader + Geist |           4 |         5 |                  4 |         5 |          2 |       3 |         4 |     **27** |

The numbers summarize the evidence; they do not override admission failures.

### Current disposition

```text
Control
PASS / PROVISIONAL SELECT

Geist
FAIL / REJECT FOR V1
Reason: bilingual voice split plus delayed-load geometry failure

Inter
PASS / REJECT FOR V1
Reason: technically sound, but insufficient value over the zero-byte control

Newsreader + Geist
FAIL / DEFER
Reason: strongest character, but near-limit payload and geometry failure
```

The current evidence supports **System Fonts Selected** if the target-platform
visual pass does not reveal a real control defect. No candidate has yet cleared the
higher rule of materially beating the control as a complete bilingual system.
Until that final matrix is complete, this is a current-host recommendation rather
than a frozen Gate B decision.
