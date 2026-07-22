---
'@nasa/hds-core': minor
---

Remove the incomplete `_navigation.scss` and `_banner.scss` Phase 2 stubs; pin the USWDS identifier to the black palette (Issue #86)

Header, footer, nav, and the government compliance banner had partial, inherited stub styling that was never finished or documented. Those stubs are removed — these components now ship as bare USWDS defaults inside `@layer uswds`. Real HDS theming is Phase 2.

**Removed selectors (HDS dropped these overrides — components revert to USWDS defaults):**

- `.usa-header`, `.usa-header--basic`
- `.usa-navbar`, `.usa-nav-container`, `.usa-nav__primary`, `.usa-nav__primary-item`, `.usa-nav__submenu`, `.usa-nav__global-nav-trigger`, `.usa-nav__mobile-menu`, `.usa-nav__mobile-menu-trigger`, `.usa-megamenu`
- `.usa-footer__nav`, `.usa-footer__primary-content`
- `.usa-banner__header`, `.usa-banner__button`
- `.usa-button--arrow` (was only defined by the nav stub; unused elsewhere)

Adopters relying on any of this stub styling should move those rules into their own `@layer site`.

**Added — government identifier legibility fix:**

`base/_palettes.scss` now pins `.usa-identifier` to the black palette. The USWDS identifier always renders on a near-black surface; without this, its HDS-styled links inherited the surrounding site palette's near-black link color and failed contrast (invisible links on the dark identifier). The identifier now renders identically in light or dark site contexts.
