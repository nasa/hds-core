---
'@nasa/hds-core': minor
---

Border width token refactor

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
