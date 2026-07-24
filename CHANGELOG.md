# @nasa-hds/core

## 0.8.0

### Migration: CSS Custom Property Renames

Upgrading from 0.7.x? Several HDS CSS custom properties were renamed or removed in this release. If you reference any `--hds-*` properties directly in your own stylesheets, the renames below fail silently (your `var()` resolves to nothing or a fallback), so it's worth a find-and-replace before upgrading. Sass consumers should also skim the Focus Ring and Typography sections; those break at compile time, which is loud and easy to fix.

#### Color

- `--hds-palette-error-border` → `--hds-palette-error-indicator`

#### Border width (component-first naming)

- `--hds-border-width-{accordion, button, card, input-tile, input-select, input-state, pagination, summary, table}` → `--hds-{component}-border-width`

#### Border width scale (removed)

- `--hds-border-size-1px` → `--hds-border-width-thin`
- `--hds-border-size-2px` → `--hds-border-width-thick`
- `--hds-border-size-{0, 05, 1, 105, 2}`: no replacement (inline a literal value)

#### Border radius (component-first naming)

- `--hds-border-radius-{button, card, checkbox, input-tile, modal, pagination, summary}` → `--hds-{component}-border-radius`

#### Border radius scale (removed)

- `--hds-border-radius-0` → `--hds-border-radius`
- `--hds-border-radius-sm` → `--hds-border-radius-control`
- `--hds-border-radius-{md, lg, xl}`: no replacement
- `--hds-border-radius-pill`: no replacement (use a literal value or define your own in `@layer site`)

#### Line height

- `--hds-line-height-{body, heading, …}` → `--hds-line-height-1` through `--hds-line-height-6` (USWDS scale numbering)

### Minor Changes

- 72384f3: Border width token refactor

  **New: `$hds-border-width-thin` (1px) and `$hds-border-width-thick` (2px).** Role-based Sass variables that feed USWDS theme settings directly and emit `--hds-border-width-thin` / `--hds-border-width-thick` CSS custom properties for consumers without a Sass pipeline. Added to `tokens.json` as `border.width.thin` / `border.width.thick`.

  **Breaking: `$hds-border-sizes` map and `--hds-border-size-*` CSS properties removed.** The value-named USWDS-style scale was never used by HDS components. Migrate: `--hds-border-size-1px` → `--hds-border-width-thin`; `--hds-border-size-2px` → `--hds-border-width-thick`; all other entries (`0`, `05`, `1`, `105`, `2`) have no replacement and were USWDS mirrors not present in the HDS spec. The corresponding `border.width.*` token keys in `tokens.json` are replaced by `border.width.thin` / `border.width.thick`.

  **Breaking: `$hds-width-settings` map removed.** The per-component map only existed to feed USWDS theme settings; `$hds-border-width-thin` / `$hds-border-width-thick` now do this directly.

  **Breaking: `--hds-border-width-{component}` renamed to `--hds-{component}-border-width`.** All nine component CSS custom properties now follow component-first naming:

  | Old                               | New                               |
  | --------------------------------- | --------------------------------- |
  | `--hds-border-width-accordion`    | `--hds-accordion-border-width`    |
  | `--hds-border-width-button`       | `--hds-button-border-width`       |
  | `--hds-border-width-card`         | `--hds-card-border-width`         |
  | `--hds-border-width-input-tile`   | `--hds-input-tile-border-width`   |
  | `--hds-border-width-input-select` | `--hds-input-select-border-width` |
  | `--hds-border-width-input-state`  | `--hds-input-state-border-width`  |
  | `--hds-border-width-pagination`   | `--hds-pagination-border-width`   |
  | `--hds-border-width-summary`      | `--hds-summary-border-width`      |
  | `--hds-border-width-table`        | `--hds-table-border-width`        |

- 9fd750b: Border radius token refactor

  **New: `$hds-border-radius` (0px) and `$hds-border-radius-control` (2px).** Role-based Sass variables establishing HDS's two border-radius values: sharp corners for most components, subtle rounding for small interactive controls. Feed USWDS theme settings directly and emit `--hds-border-radius` / `--hds-border-radius-control` as CSS custom properties for consumers without a Sass pipeline. Added to `tokens.json` as `border.radius.default` / `border.radius.control`.

  **Breaking: `$hds-border-radii` map and `--hds-border-radius-*` scale removed.** The value-named USWDS-style scale was never used by HDS components. Migrate: `--hds-border-radius-0` → `--hds-border-radius`; `--hds-border-radius-sm` (2px) → `--hds-border-radius-control`; `--hds-border-radius-md`, `-lg`, `-xl` have no replacement. The corresponding scale keys in `tokens.json` are replaced by `border.radius.default` / `border.radius.control`.

  **Breaking: `$hds-radius-settings` map removed.** The per-component map only existed to feed USWDS theme settings; `$hds-border-radius` / `$hds-border-radius-control` now do this directly.

  **Breaking: `--hds-border-radius-{component}` renamed to `--hds-{component}-border-radius`.** All seven component CSS custom properties now follow component-first naming:

  | Old                              | New                              |
  | -------------------------------- | -------------------------------- |
  | `--hds-border-radius-button`     | `--hds-button-border-radius`     |
  | `--hds-border-radius-card`       | `--hds-card-border-radius`       |
  | `--hds-border-radius-checkbox`   | `--hds-checkbox-border-radius`   |
  | `--hds-border-radius-input-tile` | `--hds-input-tile-border-radius` |
  | `--hds-border-radius-modal`      | `--hds-modal-border-radius`      |
  | `--hds-border-radius-pagination` | `--hds-pagination-border-radius` |
  | `--hds-border-radius-summary`    | `--hds-summary-border-radius`    |

- bd9dae6: Typography + content-styling subsystem

  Introduces a unified type ramp and a single-source content-styling engine, with a deliberately small public Sass surface ahead of v1.0.

  **Added:** New public file `_hds-typography.scss`:
  - **Public mixins**: `hds-type($style)` (17-entry ramp) and `hds-type-classes` (utility-class emitter). These are the _only_ public type symbols.
  - **New CSS classes**: `.hds-h1`–`.hds-h6`, `.hds-display-2xl`, `.hds-display-xl`, `.hds-stat-lg/md/sm/xs`, plus `.hds-prose-measure` (from `_prose.scss`).
  - **New custom properties**: `--hds-letter-spacing-*` (11 keys), `--hds-line-height-1` through `--hds-line-height-6` (USWDS line-height scale numbering; replaces the USWDS-derived `--hds-line-height-body/heading/…` names), and `--hds-palette-code` (NASA Blue Shade on light palettes, NASA Blue Tint on dark, White on the blue palette: a Figma-matched accent, with per-palette values chosen so code reads as text at AA 4.5:1 rather than the 3:1 decorative-stroke threshold).

  **Added:** New `.hds-global-styles` opt-in scope. Adopters can opt a subtree into HDS bare-element content styling via `class="hds-global-styles"`, with `class="hds-global-styles-reset"` carving out unstyled islands (CSS `@scope` + `all: revert-layer`). The same reset class is honored inside `.usa-prose`, so a single carve-out mechanism works across both opt-in scopes.

  **Added:** New Prose component (`components/_prose.scss`) that styles `.usa-prose` with the same content-styling engine.

  **Fixed:** Component line-heights updated throughout. List items, table headers/captions, breadcrumbs, and blockquote attributions now emit the raw HDS scale instead of USWDS's rounded `lh()`, tightening their line-height by ~0.05. Every content-layer line-height now traces to the raw `--hds-line-height-*` scale (no USWDS per-family `lh()`/`line-height()` normalization); bespoke fluid sizes use the internal `fluid-size()` helper (no hand-expanded `clamp()` literals); `figcaption` routes through `hds-type('caption')` so it matches `.hds-caption`.

  **Removed:** Intentional pre-v1.0 public-surface reductions. No adopter is expected to depend on these; content styling is delivered via `.hds-global-styles` / `.usa-prose` / the global content flag, not by calling mixins:
  - **Removed mixins**: `hds-overline-label`, `intro-text` (single consumers inlined to `hds-type()`); `hds-metadata-type` (demoted to internal `metadata-type`); `hds-content-rules` (moved to `base/_content-rules.scss` and demoted to internal `content-rules`).
  - **Removed variables**: `$hds-type-fluid-min-vw`, `$hds-type-fluid-max-vw` (now private `$_fluid-min-vw`/`$_fluid-max-vw`, set to the mobile→desktop-lg range 320→1200px); `$hds-line-height-scale` map (flattened to scalar `$hds-line-height-1` through `$hds-line-height-6`); `$hds-type-scale` (dead code).
  - **Deleted file**: `components/_text-styles.scss` (superseded by `hds-type-classes` + `_prose.scss`).

- 8354f2f: Focus ring system: breaking changes

  **Breaking: `hds-focus-ring` signature changed.** The `$width`, `$method`, and `$offset` parameters have been removed. New signature: `hds-focus-ring($color, $shape, $pseudo, $circle-size-px)`. Update any call sites that passed non-default parameters.

  **Breaking: `hds-focus-ring` and `hds-focus-ring-size` default `$pseudo` flipped from `'after'` to `'before'`.** If you were calling either mixin without an explicit `$pseudo` argument, the focus ring now renders on `::before`. Pass `$pseudo: 'after'` to restore the previous behavior.

  **Breaking: `$hds-focus-widths` Sass map removed.** The unified ring system bakes 1px directly into the SVG mask. Inline the value at any call sites that referenced this map.

  **Breaking: `hds-link-appearance` and `hds-link-hover` now render underlines via `repeating-linear-gradient` instead of `text-decoration`.** If you were overriding `text-decoration` on elements that receive these mixins, those overrides no longer apply. Use `background-image: none` to suppress the underline instead.

- ad744ad: Focus ring system: new mixins

  **Added: `hds-focus-ring-inline` mixin** for inline and multiline elements (links, unstyled buttons, breadcrumbs). Renders a four-sided dashed ring via `repeating-linear-gradient` matching the Figma `2,3` dash spec. Fragments correctly per line box on wrapped text.

  **Added: `hds-focus-ring-size($circle-size-px)` mixin** for overriding circle ring geometry on icon button size modifiers without re-declaring the full mixin.

- 6e07aea: form style updates

  **Added:** `.usa-legend--large` and `.usa-radio__label-description` selectors are now part of the HDS authored surface.

  **Renamed:** `--hds-palette-error-border` is now `--hds-palette-error-indicator`. If you were referencing this property directly, update to the new name.

  **Removed:** `--hds-border-radius-pill` custom property. Use a static value or define your own in `@layer site`.

  **Removed:** `.usa-file-input__target` selector (HDS override dropped).

- c6a6653: Removed dead and internal exports from public surface

  **Breaking: `$hds-enable-experimental-palettes` removed.** This flag was defined but never used in any `@if` conditional. It was a dead export. Remove it from any `@use 'hds-tokens' with ($hds-enable-experimental-palettes: ...)` block.

  **Breaking: `$hds-extended-palette` Sass map removed.** Made decision to not wire this up to `$global-color-palettes` via USWDS theme settings, as direct use of $hds-color-_ or --hds-color-_ is a better DX for consumers who may not import USWDS utilities.

  **Breaking: `$hds-color-table-{sorted-bg,sorted-stripe-bg,sorted-bg-dark,sorted-stripe-bg-dark,border-light,border-dark}` removed from public Sass surface.** These six table-specific color variables were only ever used internally by HDS components (`_table.scss`, `_elements.scss`). They are now internal implementation details. Remove any direct external references.

### Patch Changes

- ad744ad: Focus ring system: bug fixes

  **Fixed: SVG mask edges no longer clip on block focus rings.** `overflow="visible"` added to rect and circle SVGs.

  **Fixed: Breadcrumb focus ring no longer clips at list edges.** USWDS sets `overflow: hidden` on `.usa-breadcrumb__list` for truncation; HDS Core now overrides to `overflow: visible` while preserving truncation behavior.

  **Fixed: Stock `<button>` and `a.button` now match `.usa-button`** for hover, active, and focus states via a shared internal mixin. Previously diverged with a 2px solid outline and `filter: brightness()` hover.

  **Fixed: Focused links and unstyled buttons no longer show a text underline on `:focus-visible`.** The focus ring's bottom edge serves as the underline indicator.

- b7b2308: primary arrow button + external link fixes

  **Fixed:** `.hds-btn--primary.usa-link--external` rendered with a clipped red circle because `.usa-link--external::after`'s base `mask-image` was leaking through the shared pseudo-element slot. The external override now explicitly sets `mask-image: none`.

  **Fixed:** `.hds-btn--primary` size variants (`--lg`, `--xl`, `--2xl`) now scale the gap between text and circle (4px → 8px at lg+) to match the Figma reference instead of staying pinned at 4px.

  **Fixed:** External diagonal glyph appeared smaller than the internal right-facing glyph at matching sizes. Both inline SVGs now use the HDS filled-icon paths (`arrow-line-right`, `arrow-line-diagonal`) so their drawn extents match.

  **Fixed:** `.usa-link--external::after` reset `margin-top: 0.7ex` leaked from USWDS's `external-link()` mixin, shifting the arrow off the text baseline. The base rule now sets `margin: 0`.

  **Fixed:** `.hds-btn--primary` focus ring switched from `hds-focus-ring-inline` to `hds-focus-ring` with per-size `inset` overrides matching Figma spacing (4px top/bottom, 6px left/right on default/sm/xs; 6px all sides on lg/xl; 6px top/bottom, 8px left/right on 2xl).
