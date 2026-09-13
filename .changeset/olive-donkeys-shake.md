---
'@nasa-hds/core': patch
---

Text links and other inline focus targets now show a focus ring in forced-colors mode (Windows High Contrast).

`hds-focus-ring-inline` draws its dashed ring with four `repeating-linear-gradient` layers and sets `outline: none` first. Forced-colors mode does not paint background images, so all four layers drop out, and because the native outline was already removed there was nothing left to see. Keyboard users on a high-contrast theme had no way to tell which link was focused.

The mixin now restores an outline inside a `@media (forced-colors: active)` block, using the same `$border-high-contrast` value USWDS uses elsewhere, so the browser repaints it in a system color. Everything that takes the inline ring benefits: links, breadcrumb links, blockquote attribution links, unstyled buttons, and bare links in prose.

Nothing changes outside forced-colors mode. The gradient ring is untouched, so default rendering is identical.
