---
'@nasa-hds/core': minor
---

Upgrade to USWDS 3.14.0.

**Peer dependency:** `@uswds/uswds` moves from `^3.13.0` to `^3.14.0`.

**Dart Sass floor:** adopters consuming HDS through the Sass entry points (`./scss`, `./scss/uswds`, `./scss/dataviz`) now need Dart Sass **1.99.0 or newer**. USWDS 3.14.0 uses the `if(sass(...): ...; else: ...)` conditional syntax, and Dart Sass below 1.99.0 either cannot parse it or evaluates both branches eagerly and throws. The compiled-CSS entry points (`./css`) are unaffected.

**Public API change:** `.usa-breadcrumb--wrap` is replaced by `.usa-breadcrumb--truncate` in the HDS breadcrumb override. USWDS 3.14.0 inverted the variant — wrapping is now the default and `--wrap` is an inert no-op upstream. This removal had no prior deprecation cycle. HDS breadcrumbs use an authored 3-element ellipsis pattern and do not rely on either modifier; `--truncate` is documented as unsupported because its `overflow: hidden` clips the HDS focus ring.

**Accordion pinned to the previous icon position.** USWDS 3.14.0 changed its default expand/collapse icon position to the leading edge. HDS sets `$theme-accordion-icon-position: 'end'` to keep the circled chevron on the trailing edge per the Figma spec, so the accordion is visually unchanged. The new `usa-accordion--icon-start` and `usa-accordion--icon-end` modifier classes are not supported — they reserve padding for an icon HDS does not draw.

**Accessibility fixes inherited from USWDS 3.14.0:**

- File input error border now uses `error-dark`. Under the HDS theme the previous `secondary-dark` token resolved to NASA Blue, so the error state rendered blue rather than red. It now renders `#b50909`.
- Range slider track, thumb, and fill border thickened from 1px `base` to 2px `base-darker`, raising non-text contrast from roughly 4.6:1 to roughly 16:1.
- Modal open-focus moves to the first enabled footer button, and `aria-hidden` is always cleared on close, restoring screen reader access to the page.
- Character counter defers its `aria-live` region so iOS VoiceOver no longer announces it on page load.
- Memorable date gains per-field hints; the Multi-Step Form guide markup is updated to match.
- Date picker marks the current day with `aria-current="date"`.
- Language selector Escape key and banner shadow-root `aria-controls` fixes.
- Screen-reader-only table captions no longer collapse the heading-row border.
- File input drag instructions are suppressed on coarse-pointer devices.

**Security:** the USWDS footer restricts `data-tag` to heading elements, hardening it against XSS through unsanitised values. Adopters passing a non-heading `data-tag` now get `h4`.

Visual impact for adopters is limited to the range slider border and the file input error colour; all other HDS-themed components render identically.
