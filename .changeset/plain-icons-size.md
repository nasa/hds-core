---
'@nasa-hds/core': patch
---

Give `.hds-icon` a `1em` fallback size

`.hds-icon` is sized by the component that contains it: 60% of the button inside `.hds-btn-icon`, 2rem inside the simplified pagination buttons. With no container it had no dimensions at all, so a bare `<svg class="hds-icon">` rendered at the SVG default of 300×150. The class now falls back to `1em`, matching `.hds-glyph` and USWDS's own `.usa-icon`.

Container sizing is untouched. Every existing rule is a descendant selector and still wins on specificity. Verified after the change: 16×16 standalone, 13×13 inside `.hds-btn-icon` (60% of 22px), 32×32 inside `.hds-pagination__simplified-btn`.

**Visual breaking change under one trigger, with no practical risk.** Inline geometry moves by far more than the 4px threshold on pages that use the class standalone, going from 300px to 16px. Those pages are the ones currently rendering a full-width icon, so the change can only improve them, and anyone who worked around it in their own stylesheet keeps that fix, since unlayered author CSS still wins over `@layer hds-components`. Bumped as a patch rather than a notch above, because the trigger fires only against broken output.

The Icons page previously documented the 300×150 behavior as something to design around, and now documents the fallback.
