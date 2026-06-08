---
'@nasa/hds-core': minor
---

Removed dead and internal exports from public surface

**Breaking: `$hds-enable-experimental-palettes` removed.** This flag was defined but never used in any `@if` conditional — it was a dead export. Remove it from any `@use 'hds-tokens' with ($hds-enable-experimental-palettes: ...)` block.

**Breaking: `$hds-extended-palette` Sass map removed.** Made decision to not wire this up to `$global-color-palettes` via USWDS theme settings, as direct use of $hds-color-_ or --hds-color-_ is a better DX for consumers who may not import USWDS utilities.

**Breaking: `$hds-color-table-{sorted-bg,sorted-stripe-bg,sorted-bg-dark,sorted-stripe-bg-dark,border-light,border-dark}` removed from public Sass surface.** These six table-specific color variables were only ever used internally by HDS components (`_table.scss`, `_elements.scss`). They are now internal implementation details. Remove any direct external references.
