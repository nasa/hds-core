---
'@nasa/hds-core': patch
---

primary arrow button + external link fixes

**Fixed:** `.hds-btn--primary.usa-link--external` rendered with a clipped red circle because `.usa-link--external::after`'s base `mask-image` was leaking through the shared pseudo-element slot. The external override now explicitly sets `mask-image: none`.

**Fixed:** `.hds-btn--primary` size variants (`--lg`, `--xl`, `--2xl`) now scale the gap between text and circle (4px → 8px at lg+) to match the Figma reference instead of staying pinned at 4px.

**Fixed:** External diagonal glyph appeared smaller than the internal right-facing glyph at matching sizes. Both inline SVGs now use the HDS filled-icon paths (`arrow-line-right`, `arrow-line-diagonal`) so their drawn extents match.

**Fixed:** `.usa-link--external::after` reset `margin-top: 0.7ex` leaked from USWDS's `external-link()` mixin, shifting the arrow off the text baseline. The base rule now sets `margin: 0`.
