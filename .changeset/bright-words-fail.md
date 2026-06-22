---
'@nasa/hds-core': minor
---

Add font-size primitive tokens and complete typography token system

**New Sass variables:**

- `$hds-font-size-4xl` (6.25rem) through `$hds-font-size-4xs` (0.75rem) — 11 new font-size primitives in rem units for accessibility
- All typography primitives (font-size, font-weight, font-family, line-height, letter-spacing) now generated from tokens.json

**New CSS custom properties:**

- `--hds-font-size-4xl` through `--hds-font-size-4xs` — available for custom compositions
- `--hds-font-family-heading`, `--hds-font-family-body`, `--hds-font-family-code` — font stack custom properties
- New `.hds-intro` and `.hds-p` utility classes for direct typography access

**For CSS-only consumers:**

- Continue using `.hds-h1` through `.hds-h6`, `.hds-display-*`, `.hds-stat-*` classes
- Or compose custom styles using `var(--hds-font-size-xl)`, `var(--hds-font-weight-bold)`, etc.

**Fixes:**

- Font sizes now use clean rem values (1.375rem, 1.25rem, 1rem) instead of USWDS normalized values (1.37rem, 1.12rem, 0.87rem), improving accessibility and respecting user browser font-size preferences. Closes #46.

**Internal improvements:**

- Typography ramp now populated from tokens.json (single source of truth)
- Style Dictionary v5 with DTCG support promoted to production
- Font-size tokens use rem units following DTCG best practices and accessibility standards
