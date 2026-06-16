---
'@nasa/hds-core': minor
---

Typography + content-styling subsystem

Introduces a unified type ramp and a single-source content-styling engine, with a deliberately small public Sass surface ahead of v1.0.

**Added:** New public file `_hds-typography.scss`:

- **Public mixins**: `hds-type($style)` (17-entry ramp) and `hds-type-classes` (utility-class emitter). These are the _only_ public type symbols.
- **New CSS classes**: `.hds-h1`–`.hds-h6`, `.hds-display-2xl`, `.hds-display-xl`, `.hds-stat-lg/md/sm/xs`, plus `.hds-prose-measure` (from `_prose.scss`).
- **New custom properties**: `--hds-letter-spacing-*` (11 keys), `--hds-line-height-1` through `--hds-line-height-6` (USWDS line-height scale numbering; replaces the USWDS-derived `--hds-line-height-body/heading/…` names), and `--hds-palette-code` (NASA Blue Shade on light palettes, NASA Blue Tint on dark, White on the blue palette — Figma-matched accent, with per-palette values chosen so code reads as text at AA 4.5:1 rather than the 3:1 decorative-stroke threshold).

**Added:** New `.hds-global-styles` opt-in scope. Adopters can opt a subtree into HDS bare-element content styling via `class="hds-global-styles"`, with `class="hds-global-styles-reset"` carving out unstyled islands (CSS `@scope` + `all: revert-layer`). The same reset class is honored inside `.usa-prose`, so a single carve-out mechanism works across both opt-in scopes.

**Added:** New Prose component (`components/_prose.scss`) that styles `.usa-prose` with the same content-styling engine.

**Fixed:** Component line-heights updated throughout. List items, table headers/captions, breadcrumbs, and blockquote attributions now emit the raw HDS scale instead of USWDS's rounded `lh()`, tightening their line-height by ~0.05. Every content-layer line-height now traces to the raw `--hds-line-height-*` scale (no USWDS per-family `lh()`/`line-height()` normalization); bespoke fluid sizes use the internal `fluid-size()` helper (no hand-expanded `clamp()` literals); `figcaption` routes through `hds-type('caption')` so it matches `.hds-caption`.

**Removed:** Intentional pre-v1.0 public-surface reductions. No adopter is expected to depend on these; content styling is delivered via `.hds-global-styles` / `.usa-prose` / the global content flag, not by calling mixins:

- **Removed mixins**: `hds-overline-label`, `intro-text` (single consumers inlined to `hds-type()`); `hds-metadata-type` (demoted to internal `metadata-type`); `hds-content-rules` (moved to `base/_content-rules.scss` and demoted to internal `content-rules`).
- **Removed variables**: `$hds-type-fluid-min-vw`, `$hds-type-fluid-max-vw` (now private `$_fluid-min-vw`/`$_fluid-max-vw`, set to the mobile→desktop-lg range 320→1200px); `$hds-line-height-scale` map (flattened to scalar `$hds-line-height-1` through `$hds-line-height-6`); `$hds-type-scale` (dead code).
- **Deleted file**: `components/_text-styles.scss` (superseded by `hds-type-classes` + `_prose.scss`).
