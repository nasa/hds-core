# AGENTS.md — HDS Core

## Scope

HDS Core is a CSS-only design system for NASA-branded `*.nasa.gov` sites. It is not a general-purpose system. It is not a component library. It ships compiled CSS, not JavaScript.

Do not add features targeting non-NASA or non-.gov use cases. All example content MUST use publicly available NASA data. NEVER include PII, ITAR, or EAR data anywhere in the repo.

## Architecture

`@nasa/hds-core` is built on `@uswds/uswds ^3.13.0`, compiled with `sass` CLI + `postcss` + `autoprefixer` + `cssnano`.

### Three CSS bundles

| Bundle            | Owner | Modify styles?           |
| ----------------- | ----- | ------------------------ |
| `hds.css`         | HDS   | Yes                      |
| `hds-uswds.css`   | USWDS | NEVER — passthrough only |
| `hds-dataviz.css` | HDS   | Yes                      |

NEVER add HDS overrides to USWDS passthrough components. If a USWDS component needs changes, propose promoting it to HDS-customized.

### Load order — critical, do not violate

```
_hds-tokens.scss → _hds-uswds-theme.scss → everything else
```

`_hds-tokens.scss` MUST NOT `@use "uswds-core"` — it loads before the theme file. Keep it pure Sass (hex values, maps, flags only).

In HTML: `hds-uswds.css` MUST come before `hds.css`.

### Stubs — do not modify

`_navigation.scss` and `_banner.scss` are Phase 2 stubs. Do not modify without explicit permission.

## Design Tokens — Source of Truth

`tokens.json` (W3C DTCG format) is the canonical reference for all design primitives: colors, spacing, breakpoints, borders, layout.

### Token flow

```
tokens.json → _hds-tokens.scss → _hds-uswds-theme.scss → CSS output
```

tokens.json is a validated reference artifact. SCSS is hand-authored, not generated. When implementation differs from tokens.json, the implementation is wrong — flag it as a bug.

### Reading tokens.json

- `$description` fields contain usage constraints: allowed uses, prohibited uses, required pairings. These are rules, not suggestions.
- `$extensions.gov.nasa.hds.prefix` declares the CSS prefix (`hds`).
- `$extensions.gov.nasa.hds.domains` maps groups to output bundles.

### Token rules

- NEVER introduce colors outside the `color` group.
- NEVER introduce spacing values outside the `spacing` group.
- NEVER hardcode values that exist in the token scale.
- Intermediate spacing (fractional keys: 0.5, 1.5, 2.5) is for component-internal use ONLY. Layout spacing MUST use whole-number primary values.
- Dataviz tokens (`dataviz.color.*`) are for charts ONLY. NEVER use for UI components.

### When sources conflict

Priority order:

1. tokens.json `$description` (design intent)
2. HDS Core Proposal (CD-approved)
3. Figma source files
4. Live SCSS implementation

If implementation contradicts a higher-priority source, the implementation is wrong.

## Hard Constraints

### Palette system — do NOT flatten

HDS uses CSS custom property scoping for 6 palettes. Components reference `var(--hds-palette-*)` and values change per ancestor `.hds-palette-*` wrapper.

- NEVER convert palette assignments to static variables.
- NEVER generate palette CSS from tokens.json.
- The palette system is hand-authored in `base/_palettes.scss`. It is not represented in tokens.json.

Always include fallbacks:

```scss
color: var(--hds-palette-link-text, #{$hds-color-carbon-90});
```

### Class naming

- `usa-*` for components that map to a USWDS component.
- `hds-*` for components with no USWDS equivalent.

NEVER mix prefixes on a single component.

### Components that do NOT exist

There are no HDS-themed card, modal, footer, banner, header, or nav components. These exist ONLY in `hds-uswds.css` as unthemed USWDS passthrough. Do not search for or assume themed versions exist.

### Spacing usage

| Scale        | Values                                | Use for                      |
| ------------ | ------------------------------------- | ---------------------------- |
| Primary      | 8, 16, 24, 32, 48, 64, 72, 120, 240px | Layout, component separation |
| Intermediate | 4, 12, 20px                           | Component-internal only      |

## Commands

| Task                | Command               |
| ------------------- | --------------------- |
| Local dev           | `npm run dev`         |
| Production build    | `npm run build`       |
| Tests (unit + a11y) | `npm run test`        |
| Visual regression   | `npm run test:visual` |
| Code formatting     | `npm run format`      |

## Storybook / MDX Rules

These prevent silent parser failures:

- ALWAYS use `<Meta title="..." />` with a string value. NEVER use `<Meta of={...} />`.
- NEVER use a key named `label:` inside story render functions. Storybook's AST parser breaks silently on this.
- Story `tags` MUST be literal arrays (`tags: ['!dev']`). NEVER use spread operators for tags.

## Known Bugs — Do Not Re-investigate

- **Table blue palette:** White link text on white table body background. Blue palette sets link text to white; table renders as white surface.
- **Form error hover:** Red error border lost on hover due to specificity mismatch (hover 0,3,0 vs error 0,1,0).
- **Table sort focus:** Focus ring clipped by `mask-image`. Needs surface-inverse treatment per Figma.

### Focus rings — unstable, do not standardize

Multiple open inconsistencies under CD review. Do not attempt to fix without explicit permission.

- Issue #40: Button focus ring — WCAG 1.4.11 failure on light backgrounds. CD reviewing consolidation to single thickness.
- Issue #20: Form input focus uses separate solid blue highlight, not the dashed outline system.
- Icon buttons hardcode Carbon 40 dashed ring, exempt from palette system. This is intentional.
- tokens.json focus values are flagged unstable. Not stable API.

## Verification Rules

- ONLY reference files and code read in the current session.
- If a search returns no results, say "not found" — NEVER speculate.
- Distinguish "I read this and saw X" (verified) from "I believe X may be the case" (unverified).
- Cite file paths for every claim about the codebase.
- Flag uncertainties with ⚠️
- Default mode is READ-ONLY unless explicitly told to edit.
- NEVER modify files in `dist/`.

## Reference Files

For deeper context beyond these instructions:

- **ARCHITECTURE.md** — Build pipeline, Chromatic setup, focus ring implementation details, icon architecture.
- **DESIGN.md** — Visual and UX rationale. Explains intentional deviations from USWDS and Figma. Check here before "fixing" any apparent Figma discrepancy.
- **DOCUMENTATION.md** — Full standards for authoring Storybook `.mdx` files and component stories. Read when creating or editing documentation pages.
