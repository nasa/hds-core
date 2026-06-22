---
'@nasa/hds-core': minor
---

Add font-size primitive tokens and complete typography token system

**New Sass variables:**

- `$hds-font-size-4xl` (100px) through `$hds-font-size-4xs` (12px) — 11 new font-size primitives
- All typography primitives (font-size, font-weight, font-family, line-height, letter-spacing) now generated from tokens.json

**New CSS custom properties:**

- `--hds-font-size-4xl` through `--hds-font-size-4xs` — available for custom compositions
- Existing typography utility classes (`.hds-h1`, `.hds-display-xl`, etc.) remain unchanged and work as before

**For CSS-only consumers:**

- Continue using `.hds-h1` through `.hds-h6`, `.hds-display-*`, `.hds-stat-*` classes
- Or compose custom styles using `var(--hds-font-size-xl)`, `var(--hds-font-weight-bold)`, etc.

**Internal improvements:**

- Typography ramp now populated from tokens.json (single source of truth)
- Style Dictionary v5 with DTCG support promoted to production
