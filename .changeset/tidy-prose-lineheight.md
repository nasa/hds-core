---
'@nasa-hds/core': patch
---

Give body copy the ramp's `p` style inside `.hds-global-styles` and `.usa-prose`

Bare paragraphs were the one content element the shared content-styling engine did not type. Headings, lists, links, tables, and blockquotes all resolved to HDS values inside `.hds-global-styles`; `p` received margins only. A page adopting HDS through the single `.hds-global-styles` class therefore rendered NASA headings and links above body copy still sitting at the browser's default `line-height: normal` — about 1.15, roughly 18.4px at 16px — with no measure. It is the weakest point in the CSS-only adoption path and reads as unfinished next to everything around it.

`p` now takes `hds-type('p')`, the same ramp entry `.hds-p` emits: Public Sans, 1rem, weight 400, `--hds-line-height-5` (1.62).

**Visual change.** No new API, so this is a patch, but it is worth the `visual-breaking-change` label because pages get taller. Two effects:

- **Inside `.hds-global-styles`**, paragraph line-height goes from ~1.15 to 1.62. Pages get taller. This is the intended fix.
- **Inside `.usa-prose`**, line-height goes from USWDS's normalized 1.6 to the raw HDS 1.62 — 25.6px to 25.92px at 16px. Sub-pixel per line, consistent with the single-source rule the rest of the content engine already follows (no USWDS `lh()` normalization in the content layer).

Component paragraphs are untouched. The rule carries a `:where(:not([class*='usa-'], [class*='hds-']))` guard, so `.usa-intro`, `.usa-alert__text`, `.usa-hint`, `.usa-radio__label-description` and the rest keep the size and line-height they set in `@layer uswds` — without the guard, layer order would let a bare `p` rule in `hds-base` override them. Verified unchanged: `.usa-intro` 18px/27px, `.usa-alert__text` 15.84px/25.344px, `.usa-hint` 12px/14.4px, table captions and cells. Adopters' own classed paragraphs are still typed; only `usa-` and `hds-` prefixes opt out.

No measure (`max-width`) is applied. `.hds-global-styles` commonly wraps a whole page, where a global paragraph width cap would be wrong; measure stays an explicit choice through `.usa-prose` or `.hds-prose-measure`. USWDS's own prose measure is unaffected.

Sites that set their own paragraph line-height keep it: any unlayered author CSS still wins over `@layer hds-base`, and `@layer site` is reserved for exactly this.
