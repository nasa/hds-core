---
'@nasa-hds/core': minor
---

`.usa-dark-background` now renders on the HDS dark surface, closing the USWDS dark-context family.

`.usa-hero__callout` and `.usa-section--dark` were bridged onto the HDS dark palette in the previous release. `.usa-dark-background` is the third and last USWDS context that paints its own dark background, and it was still left to the manual `.hds-palette-dark` path. Its surface already looked correct — USWDS uses `base-darker`, which HDS themes to a near-Carbon-90 gray — but USWDS only reverses `<p>`, `<span>`, and `<a>` inside it. Headings and HDS components kept resolving against whatever palette wrapped the page, so on the default white palette a heading came out Carbon Black at 1.22:1 and a `.usa-link` at 1.04:1 against their own background.

The wrapper now carries the full dark palette, so headings, links, buttons, and focus rings inside it match the surface they sit on. No markup changes are needed. To put one of these blocks on a different surface, add a palette class to the same element (`class="usa-dark-background hds-palette-blue"`).

Background utility classes (`.bg-base-darker` and friends) and your own dark wrappers are unchanged — those still need an explicit `.hds-palette-dark`.
