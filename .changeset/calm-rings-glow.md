---
'@nasa/hds-core': minor
---

focus ring system update

**Changed:** `hds-focus-ring` mixin signature. The `$width`, `$method`, and `$offset` parameters have been removed. The new signature is `hds-focus-ring($color, $shape, $pseudo, $circle-size-px)`. If you were calling this mixin with non-default parameters, update your call sites.

**Added:** `hds-focus-ring-inline` mixin for inline and multiline elements such as links and breadcrumbs. Applies a dashed, palette-aware outline with `box-decoration-break: clone` so the ring wraps correctly across line breaks.

**Added:** `hds-focus-ring-size($circle-size-px)` mixin for circular focus rings on icon buttons. Pass the icon button diameter in pixels; the mixin calculates ring dimensions automatically.

**Changed:** Focused links (`a:focus-visible`) and unstyled buttons (`.usa-button--unstyled:focus-visible`) no longer show a text underline. The dashed outline ring replaces it.
