---
'@nasa/hds-core': minor
---

Focus ring system — breaking changes

**Breaking: `hds-focus-ring` signature changed.** The `$width`, `$method`, and `$offset` parameters have been removed. New signature: `hds-focus-ring($color, $shape, $pseudo, $circle-size-px)`. Update any call sites that passed non-default parameters.

**Breaking: `hds-focus-ring` and `hds-focus-ring-size` default `$pseudo` flipped from `'after'` to `'before'`.** If you were calling either mixin without an explicit `$pseudo` argument, the focus ring now renders on `::before`. Pass `$pseudo: 'after'` to restore the previous behavior.

**Breaking: `$hds-focus-widths` Sass map removed.** The unified ring system bakes 1px directly into the SVG mask. Inline the value at any call sites that referenced this map.

**Breaking: `hds-link-appearance` and `hds-link-hover` now render underlines via `repeating-linear-gradient` instead of `text-decoration`.** If you were overriding `text-decoration` on elements that receive these mixins, those overrides no longer apply. Use `background-image: none` to suppress the underline instead.
