---
'@nasa/hds-core': minor
---

border width token refactor

**Breaking: `--hds-border-size-*` removed.** The seven value-named CSS custom properties (`--hds-border-size-0`, `--hds-border-size-1px`, `--hds-border-size-2px`, `--hds-border-size-05`, `--hds-border-size-1`, `--hds-border-size-105`, `--hds-border-size-2`) have been removed. These were vestigial value-scale tokens never consumed by HDS components. No replacement; remove from any CSS that references them.

**Breaking: `--hds-border-width-{component}` renamed to `--hds-{component}-border-width`.** All nine component border-width CSS custom properties have been renamed to follow component-first naming:

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

**Breaking: `$hds-border-sizes` Sass map removed.** This value-named map was a vestigial USWDS-style scale never used by HDS components. Use `--hds-border-width-thin` or `--hds-border-width-thick` CSS custom properties instead.

**Breaking: `border.width.*` entries in `tokens.json` replaced.** The seven value-named keys (`0`, `1`, `2`, `105`, `1px`, `2px`, `05`) are replaced by `border.width.thin` and `border.width.thick`.

**New: `--hds-border-width-thin: 1px` and `--hds-border-width-thick: 2px`.** Role tokens replace the value-named `--hds-border-size-*` scale. Component border-width tokens (`--hds-{component}-border-width`) reference these via `var()`. Also added to `tokens.json` as `border.width.thin` and `border.width.thick`.
