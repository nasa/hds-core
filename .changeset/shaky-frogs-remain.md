---
'@nasa/hds-core': minor
---

Border radius token refactor

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
