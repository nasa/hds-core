---
'@nasa-hds/core': patch
---

Stop the HDS accordion restyle from leaking into the USWDS banner and nav

USWDS reuses the `.usa-accordion*` classes outside real accordions: the government banner's "Here's how you know" toggle and the primary nav's dropdown behavior (including the mobile drawer) are both built on them. The HDS accordion restyle (borderless container, flush headings, circled chevron) was reaching those toggles and misplacing their icons. The overrides in `components/_accordion.scss` are now guarded with `:not(.usa-banner *):not(.usa-nav *)`, so the HDS treatment applies only to genuine accordions and the banner and nav toggles render as stock USWDS.

This is a stopgap until the nav and banner get real HDS theming (Issue #86).
