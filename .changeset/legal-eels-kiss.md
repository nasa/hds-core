---
'@nasa-hds/core': minor
---

Remove the incomplete `_navigation.scss` and `_banner.scss` stubs; keep bare USWDS header, nav, banner, and identifier legible under HDS (Issue #86)

Header, footer, nav, and the government compliance banner had partial, inherited stub styling that was never finished or documented. Those stubs are removed; these components now ship as bare USWDS defaults inside `@layer uswds`. Real HDS theming is a post-v1.0 priority.

**Removed: Nav/banner stub selectors (revert to USWDS defaults)**

- `.usa-header`, `.usa-header--basic`
- `.usa-navbar`, `.usa-nav-container`, `.usa-nav__primary`, `.usa-nav__primary-item`, `.usa-nav__submenu`, `.usa-nav__global-nav-trigger`, `.usa-nav__mobile-menu`, `.usa-nav__mobile-menu-trigger`, `.usa-megamenu`
- `.usa-footer__nav`, `.usa-footer__primary-content`
- `.usa-banner__header`, `.usa-banner__button`
- `.usa-button--arrow` (was only defined by the nav stub; unused elsewhere)

Adopters relying on any of this stub styling should move those rules into their own `@layer site`.

**Added: Legibility guards for bare USWDS components**

These keep the unthemed components readable under any site palette:

- `.usa-identifier` is pinned to the black palette (`base/_palettes.scss`) so its links stay legible on the dark identifier surface.
- `.usa-header` and `.usa-nav` (including the mobile drawer) are pinned to the white palette (`base/_palettes.scss`) so a page-level `.hds-palette-*` wrapper can't cascade a dark palette into the header and hide its links.
- HDS accordion overrides (`components/_accordion.scss`) are now guarded with `:not(.usa-banner *):not(.usa-nav *)`. USWDS reuses the `.usa-accordion*` classes for the banner toggle and primary nav, where the HDS restyle was misplacing the toggle icon.
