---
'@nasa/hds-core': minor
---

focus ring system update

**Added:** `hds-focus-ring-inline` mixin for inline and multiline elements such as links, unstyled buttons, and breadcrumbs. Renders a four-sided dashed ring via `repeating-linear-gradient` with the exact Figma `2,3` dash spec. Fragments per line box on multiline elements without requiring `box-decoration-break`.

**Added:** `hds-focus-ring-size($circle-size-px)` mixin for circular focus rings on icon buttons. Pass the icon button diameter in pixels; the mixin calculates ring dimensions automatically.

**Fixed:** SVG mask edges no longer clip on block focus rings. `overflow="visible"` added to both rect and circle SVGs so the outer half of the 1px stroke paints into the pseudo-element's existing `inset` space.

**Changed:** `hds-focus-ring` mixin signature. The `$width`, `$method`, and `$offset` parameters have been removed. The new signature is `hds-focus-ring($color, $shape, $pseudo, $circle-size-px)`. If you were calling this mixin with non-default parameters, update your call sites.

**Changed:** `hds-focus-ring` and `hds-focus-ring-size` mixin defaults for `$pseudo` flipped from `'after'` to `'before'`. Component-owned `::after` icons (accordion chevrons, pagination arrows, primary arrow circles) were being clobbered by the global focus rule's pseudo-element. If you were calling either mixin without passing `$pseudo`, the focus ring now renders on `::before` instead of `::after`. Pass `$pseudo: 'after'` explicitly to restore the previous behavior.

**Changed:** `hds-link-appearance` and `hds-link-hover` mixins now render the dashed underline via `repeating-linear-gradient` instead of `text-decoration`. This matches the Figma `2,3` dash spec exactly and aligns the underline and focus ring to the same coordinate origin, so the bottom edge does not shift when focus is applied. Always-on `padding: 0 4px` and `margin: 0 -4px` provide horizontal breathing room for the focus ring without shifting text layout.

**Changed:** Stock `<button>` and `a.button` (the base reset that activates with `$theme-global-content-styles: true`) now share hover, active, and focus styling with `.usa-button` via the new internal `button-interactive-states` mixin. Stock buttons previously diverged: a 2px solid focus outline and `filter: brightness()` hover. They now match `.usa-button` exactly (NASA Red Shade hover/active, 1px dashed bold focus ring).

**Changed:** Focused links (`a:focus-visible`) and unstyled buttons (`.usa-button--unstyled:focus-visible`) no longer show a text underline. The focus ring's bottom edge serves as the underline indicator.

**Removed:** `$hds-focus-widths` Sass map (`thin: 1px`, `thick: 2px`). The unified focus ring system bakes 1px directly into the SVG mask, so the map had no remaining consumers. If you were importing it, inline the pixel value at the call site.
