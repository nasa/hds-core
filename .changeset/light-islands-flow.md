---
'@nasa/hds-core': patch
---

Focus ring system — bug fixes

**Fixed: SVG mask edges no longer clip on block focus rings.** `overflow="visible"` added to rect and circle SVGs.

**Fixed: Breadcrumb focus ring no longer clips at list edges.** USWDS sets `overflow: hidden` on `.usa-breadcrumb__list` for truncation; HDS Core now overrides to `overflow: visible` while preserving truncation behavior.

**Fixed: Stock `<button>` and `a.button` now match `.usa-button`** for hover, active, and focus states via a shared internal mixin. Previously diverged with a 2px solid outline and `filter: brightness()` hover.

**Fixed: Focused links and unstyled buttons no longer show a text underline on `:focus-visible`.** The focus ring's bottom edge serves as the underline indicator.
