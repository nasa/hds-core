---
'@nasa/hds-core': minor
---

Wire Style Dictionary v5 generator; promote typography, spacing, layout, focus, and breakpoint tokens to first-class Sass variables and CSS custom properties

**Font-size accessibility fix:**

- Font sizes now use clean rem values (1rem, 1.25rem, 1.375rem) instead of USWDS-normalized values (0.87rem, 1.12rem, 1.37rem), respecting user browser font-size preferences. Visible change across the whole system.

**New Sass variables:**

- `$hds-font-size-4xl` (7.5rem) through `$hds-font-size-3xs` (0.75rem): 10 font-size primitives
- `$hds-font-family-heading`, `$hds-font-family-body`, `$hds-font-family-code`
- `$hds-font-weight-*` (bold, semibold, medium, normal, light) as top-level scalars
- `$hds-letter-spacing-1` through `-3`, `$hds-letter-spacing-neg-1` through `-neg-7`, `$hds-letter-spacing-auto`
- `$hds-spacing-0` through `$hds-spacing-30` (full USWDS-aligned scale)
- `$hds-layout-gutter-sm/md/lg/xl`, `$hds-layout-margin-mobile/desktop`, `$hds-layout-max-width`
- `$hds-focus-width`, `$hds-focus-offset`, `$hds-focus-style`
- `$hds-breakpoint-mobile` through `$hds-breakpoint-widescreen` (8 breakpoints)

**New CSS custom properties:**

- `--hds-font-size-*` (10): available for custom compositions
- `--hds-font-family-heading/body/code`
- `--hds-spacing-*` (13): full scale exposed for CSS-only consumers
- `--hds-layout-*` (7): gutters, margins, max-width
- `--hds-focus-width/offset/style`

**New utility classes:**

- `.hds-intro` and `.hds-p` for direct typography access

**Removed:**

- `--hds-font-weight-heavy` and `--hds-font-weight-thin` custom properties (only emitted `false` before)
- `$hds-letterspacing`, `$hds-line-heights`, `$hds-weights` Sass maps: replaced by scalar variables above. Consumers doing `map.get($hds-line-heights, 3)` should switch to `$hds-line-height-3`.

**For CSS-only consumers:**

- Continue using `.hds-h1` through `.hds-h6`, `.hds-display-*`, `.hds-stat-*` classes
- Or compose custom styles using `var(--hds-font-size-xl)`, `var(--hds-spacing-4)`, `var(--hds-layout-gutter-md)`, etc.

**Internal improvements:**

- Style Dictionary v5 with DTCG support wired into build (`tools/sd-example/` removed)
- Typography ramp, spacing scale, layout tokens, and breakpoints all generated from `tokens.json` (single source of truth)
- Docs updated with new Design Tokens reference page and embedded token references
- Token drift check added to CI to keep generated files in sync
- New `_hds-config.scss` partial houses HDS configuration flags (dataviz tokens, auto dark mode)
