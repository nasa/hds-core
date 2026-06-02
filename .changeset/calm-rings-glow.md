---
'@nasa/hds-core': minor
---

focus ring system update

**Added:** `hds-focus-ring-inline` mixin for inline and multiline elements such as links and breadcrumbs. Applies a dashed, palette-aware outline with `box-decoration-break: clone` so the ring wraps correctly across line breaks.

**Added:** `hds-focus-ring-size($circle-size-px)` mixin for circular focus rings on icon buttons. Pass the icon button diameter in pixels; the mixin calculates ring dimensions automatically.

**Changed:** `hds-focus-ring` mixin signature. The `$width`, `$method`, and `$offset` parameters have been removed. The new signature is `hds-focus-ring($color, $shape, $pseudo, $circle-size-px)`. If you were calling this mixin with non-default parameters, update your call sites.

**Changed:** Stock `<button>` and `a.button` (the base reset that activates with `$theme-global-content-styles: true`) now share hover, active, and focus styling with `.usa-button` via the new internal `button-interactive-states` mixin. Stock buttons previously diverged: a 2px solid focus outline and `filter: brightness()` hover. They now match `.usa-button` exactly (NASA Red Shade hover/active, 1px dashed bold focus ring).

**Changed:** Focused links (`a:focus-visible`) and unstyled buttons (`.usa-button--unstyled:focus-visible`) no longer show a text underline. The dashed outline ring replaces it.

**Removed:** `$hds-focus-widths` Sass map (`thin: 1px`, `thick: 2px`). The unified focus ring system bakes 1px directly into the SVG mask, so the map had no remaining consumers. If you were importing it, inline the pixel value at the call site.

**Changed:** `hds-focus-ring` and `hds-focus-ring-size` mixin defaults for `$pseudo` flipped from `'after'` to `'before'`. Component-owned `::after` icons (accordion chevrons, pagination arrows, primary arrow circles) were being clobbered by the global focus rule's pseudo-element. If you were calling either mixin without passing `$pseudo`, the focus ring now renders on `::before` instead of `::after`. Pass `$pseudo: 'after'` explicitly to restore the previous behavior.
