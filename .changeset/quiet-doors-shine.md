---
'@nasa-hds/core': minor
---

Remove the navigation and banner stubs; pin USWDS header, footer, banner, and identifier to a readable palette

The partial header, footer, nav, and government-banner styling inherited from an earlier WordPress theme has been removed. It was never reviewed against Figma and rendered visibly broken on the USWDS templates, so it does not ship in v1.0. These components now render as stock USWDS, themed by the shared token settings every USWDS component receives. Real HDS versions arrive with the navigation work planned for the first post-v1.0 release.

**Visual change for sites using the USWDS header, footer, or government banner.** Overrides dropped with the stubs: underline suppression on header and footer links, the border resets on `.usa-footer__nav` and `.usa-footer__primary-content`, mobile menu trigger chevrons, agency navbar spacing, and the banner's Carbon 05 background and reduced type size. Each of these reverts to the USWDS default. If your site depended on one, reapply it in `@layer site`.

Alongside the removal, `.usa-banner`, `.usa-header`, and `.usa-footer` are now pinned to the White palette and `.usa-identifier` to Black. These four decide their own background but were not palette containers, so HDS text and link colors inside them resolved against whatever palette wrapped the page. That put Carbon 90 identifier links on the identifier's black bar at 1.17:1 in every light palette, and white header and footer links on white inside a dark one. Each is now pinned to the palette matching the surface USWDS paints, which leaves the default appearance unchanged and corrects only the mismatch.

The pins use `:where()`, so a `.hds-palette-*` class on the component element still wins: `<footer class="usa-footer hds-palette-dark">`. A palette wrapper around the component does not.
