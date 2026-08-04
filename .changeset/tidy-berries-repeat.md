---
'@nasa-hds/core': minor
---

USWDS hero callouts and dark sections now render on the HDS dark surface instead of a NASA-red block.

`.usa-hero__callout` and `.usa-section--dark` paint their own background in USWDS, using the primary color and cyan headings. Under the HDS theme that produced a dark red block with cyan headings, a red call-to-action sitting on the red hero box, and HDS components inside the section still using white-palette colors — white text was fine, but links and outline buttons came out near-black on red. A `.hds-palette-*` wrapper could not correct any of it, because the red is a background on the component itself.

Both surfaces now use the HDS dark palette, so headings, text, links, buttons, and focus rings inside them match the surface they sit on. No markup changes are needed. To put one of these sections on a different surface, add a palette class to the same element (`class="usa-section usa-section--dark hds-palette-blue"`).

If your site relied on the red hero callout or red dark section, this is a visible change — review those pages after upgrading.
