# AGENTS.md — HDS Core

## Scope

HDS Core is a CSS-only design system for NASA-branded `*.nasa.gov` sites. It is not a general-purpose system. It is not a component library. It ships compiled CSS, not JavaScript.

Do not add features targeting non-NASA or non-.gov use cases. All example content MUST use publicly available NASA data. NEVER include PII, ITAR, or EAR data anywhere in the repo.

## Architecture

`@nasa/hds-core` is built on `@uswds/uswds ^3.13.0`, compiled with `sass` CLI + `postcss` + `autoprefixer` + `postcss-discard-comments` + `cssnano`.

### Three CSS bundles

| Bundle                | Owner | Modify styles?                           |
| --------------------- | ----- | ---------------------------------------- |
| `hds.min.css`         | HDS   | Yes                                      |
| `hds-uswds.min.css`   | USWDS | NEVER — utility classes passthrough only |
| `hds-dataviz.min.css` | HDS   | Yes                                      |

`hds.min.css` contains ALL USWDS components (both HDS-themed and unthemed) plus HDS base and component overrides. It is self-contained.

`hds-uswds.min.css` contains ONLY USWDS utility classes (`.padding-*`, `.margin-*`, etc.). It is an optional add-on for sites migrating from USWDS that use utility classes. NEVER add component styles or HDS overrides here.

If a USWDS component needs HDS styling, add overrides to the appropriate file in `src/scss/components/`. Do not touch `hds-uswds.min.css`.

### Cascade layer order — do not modify

All three bundles declare:

```css
@layer uswds, uswds-utils, hds-base, hds-components, hds-dataviz, site;
```

| Layer            | Contents                                           |
| ---------------- | -------------------------------------------------- |
| `uswds`          | All USWDS component defaults                       |
| `uswds-utils`    | USWDS utility classes (empty if add-on not loaded) |
| `hds-base`       | HDS custom properties, element styles, palettes    |
| `hds-components` | HDS component overrides                            |
| `hds-dataviz`    | Dataviz palettes (empty if add-on not loaded)      |
| `site`           | Reserved for adopter overrides — always wins       |

HTML load order does not affect cascade priority. Layers determine specificity, not file order.

### Sass load order — critical, do not violate

```
_hds-tokens.scss → _hds-uswds-theme.scss → everything else
```

`_hds-tokens.scss` MUST NOT `@use "uswds-core"` — it loads before the theme file. Keep it pure Sass (hex values, maps, flags only).

`_hds-uswds-theme-utils.scss` is the theme variant used by `hds-uswds.scss`. It is identical to `_hds-uswds-theme.scss` except `$output-these-utilities` is unrestricted. If you change a theme setting, change it in both files.

`hds.scss` loads all USWDS packages via a single `meta.load-css('uswds')` call inside `@layer uswds`. Do NOT revert to per-package `meta.load-css()` calls — this causes fonts to emit once per package (144 declarations vs. 6).

### Stubs — do not modify

`_navigation.scss` and `_banner.scss` are Phase 2 stubs. Do not modify without explicit permission.

## Design Tokens

`tokens.json` (W3C DTCG format) is the canonical reference for design intent: colors, spacing, breakpoints, borders, layout. Until the Style Dictionary pipeline is wired, **compiled CSS outputs are the enforced contract** — the committed `public-api.snapshot.txt` tracks what HDS actually promises adopters. When implementation differs from `tokens.json`, flag for reconciliation but do not assume implementation is wrong by default.

### Token flow

```
tokens.json → _hds-tokens.scss → _hds-uswds-theme.scss → CSS output
```

SCSS is hand-authored, not generated from `tokens.json`. The Style Dictionary pipeline (`tools/sd-example/`) is a prototype for eventual automation. When implementation differs from `tokens.json`, flag for reconciliation — but do not auto-correct either direction without checking the semver rubric in CONTRIBUTING.md, since the compiled output is the enforced contract.

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

Priority order for **design intent** (what should be true):

1. `tokens.json` `$description` (design intent)
2. HDS Core Proposal (CD-approved)
3. Figma source files
4. Live SCSS implementation

Priority order for **public contract** (what we promise adopters today):

1. `public-api.snapshot.txt` (the enforced surface)
2. Compiled CSS output (`dist/css/*.min.css`)
3. Root-level Sass exports (`_hds-tokens.scss`, `_hds-mixins.scss`, `_hds-dataviz-palettes.scss`)

If design intent and compiled output disagree, flag for reconciliation — do not silently "fix" either one, because both may have downstream consequences.

## Hard Constraints

### Palette system — do NOT flatten

HDS uses CSS custom property scoping for 6 palettes. Components reference `var(--hds-palette-*)` and values change per ancestor `.hds-palette-*` wrapper.

- NEVER convert palette assignments to static variables.
- NEVER generate palette CSS from tokens.json.
- The palette system is hand-authored in `base/_palettes.scss`. It is not represented in tokens.json.

Always include fallbacks to the default (white palette) values:

```scss
color: var(--hds-palette-link-text, #{$hds-color-carbon-90});
```

### Class naming

- `usa-*` for components that map to a USWDS component (even if they have HDS-only variants).
- `hds-*` for components with no USWDS equivalent.

NEVER mix prefixes on a single component.

### Components without HDS theming

Card, modal, footer, banner, header, and nav have no HDS theme overrides yet. Their USWDS default styles ship inside `@layer uswds` in `hds.min.css`. Do not search for or assume HDS-themed versions exist. Do not add overrides for these components without explicit permission.

### Spacing usage

| Scale        | Values                                | Use for                      |
| ------------ | ------------------------------------- | ---------------------------- |
| Primary      | 8, 16, 24, 32, 48, 64, 72, 120, 240px | Layout, component separation |
| Intermediate | 4, 12, 20px                           | Component-internal only      |

## Public Sass Surface

HDS Core offers two consumption paths: compiled CSS (`<link>` tag) and Sass (`@forward` entry points). The public Sass surface is defined by two rules:

1. **Prefix:** only `$hds-*` variables and `@mixin hds-*` / `@function hds-*` declarations are public.
2. **File location:** only root-level Sass partials are public surface. Anything in `base/` or `components/` is internal regardless of naming.

Public Sass files (tracked in `public-api.snapshot.txt`):

| File                         | What it exports                                                               |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `_hds-tokens.scss`           | `$hds-*` variables (colors, spacing, font weights, breakpoints)               |
| `_hds-mixins.scss`           | `@mixin hds-*` and `@function hds-*` (focus ring, typography, links, buttons) |
| `_hds-dataviz-palettes.scss` | `$hds-dataviz-*` variables (CSS custom property values for dataviz scales)    |

Internal (NOT public, free to change without a changeset):

- Everything in `base/` (including `_custom-properties.scss`, `_palettes.scss`, `_elements.scss`)
- Everything in `components/`
- `_hds-uswds-theme.scss` and `_hds-uswds-theme-utils.scss`

The outputs of internal files (compiled CSS custom properties, selectors) ARE tracked — but the Sass internals that produce them are not. Refactoring internals without changing compiled output requires no changeset.

Adding a new public symbol (variable or mixin) to a root-level file requires updating `public-api.snapshot.txt` and writing a changeset (minor bump).

## Commands

| Task                           | Command(s)                                     |
| ------------------------------ | ---------------------------------------------- |
| Local dev                      | `npm run dev`                                  |
| Production build               | `npm run build`                                |
| Tests (unit + a11y)            | `npm test`                                     |
| Visual regression (Chromatic)  | `npm run test:visual`                          |
| Verify USWDS unchanged         | `npm run check:uswds`                          |
| Verify uswds-core emits no CSS | `npm run check:uswds-core`                     |
| Format check                   | `npm run format` or `npm run format:fix`       |
| Lint Sass                      | `npm run lint:scss` or `npm run lint:scss:fix` |
| Lint JS                        | `npm run lint:js` or `npm run lint:js:fix`     |
| Lint Markdown                  | `npm run lint:md`                              |
| Lint MDX                       | `npm run lint:mdx`                             |
| Verify public API snapshot     | `npm run check:public-api`                     |
| Regenerate API snapshot        | `npm run update:api-snapshot`                  |

## Code style

Run `npm run format:fix` and all `lint:*` commands (or `lint:*:fix` if available) before pushing.

- **Sass:** Stylelint (`stylelint-config-standard-scss`). No lint-disable comments without an explanation.
- **JS:** ESLint flat config. Stories files and helpers only.
- **Markdown:** remark-lint. Plain `.md` files only.
- **MDX:** remark-lint with `remark-mdx`. Files under `stories/`.
- **Formatting:** Prettier. Run `npm run format:fix` to auto-fix. Do not hand-format.

## Storybook / MDX rules

These prevent silent parser failures:

- ALWAYS use `<Meta title="..." />` with a string value. NEVER use `<Meta of={...} />`.
- NEVER use a key named `label:` inside story render functions. Storybook's AST parser breaks silently on this.
- Story `tags` MUST be literal arrays (`tags: ['!dev']`). NEVER use spread operators for tags.

## Known bugs — do not re-investigate

- **Table blue palette:** White link text on white table body background. Blue palette sets link text to white; table renders as white surface.
- **Form error hover:** Red error border lost on hover due to specificity mismatch (hover 0,3,0 vs error 0,1,0).
- **Table sort focus:** Focus ring clipped by `mask-image`. Needs surface-inverse treatment per Figma.

### Focus rings — partially stabilized

- Issue #40 (in progress): Width and offset standardized to 1px, hardcoded in `hds-focus-ring` mixin. Focus width/offset tokens removed from `tokens.json`. Remaining open question: whether `focus.*` color tokens stabilize or stay internal.
- Issue #20: Form input focus uses separate solid blue highlight, not the dashed outline system.
- Icon buttons hardcode Carbon 40 dashed ring, exempt from palette system. This is intentional.
- Do not modify focus ring behavior without explicit permission — remaining inconsistencies are under CD review.

## Verification rules

- ONLY reference files and code read in the current session.
- If a search returns no results, say "not found" — NEVER speculate.
- Distinguish "I read this and saw X" (verified) from "I believe X may be the case" (unverified).
- Cite file paths for every claim about the codebase.
- Flag uncertainties with ⚠️.
- NEVER modify files in `dist/`.

## Reference files

For deeper context beyond these instructions:

- **CONTRIBUTING.md** — PR guidelines, code style conventions, steps for adding new components, semver rubric for deciding changeset bump levels.
- **public-api.snapshot.txt** — The committed, machine-generated list of everything HDS promises adopters. If it changes in your PR, you need a changeset.
- **ARCHITECTURE.md** — Build pipeline, cascade layer architecture, Chromatic setup, focus ring implementation details, icon architecture.
- **DESIGN.md** — Visual and UX rationale. Explains intentional deviations from USWDS and Figma. Check here before "fixing" any apparent Figma discrepancy.
- **DOCUMENTATION.md** — Full standards for authoring Storybook `.mdx` files and component stories. Read when creating or editing documentation pages.
