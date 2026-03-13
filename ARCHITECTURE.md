# HDS Core Architecture

Technical decisions and conventions for contributors.

Last updated: 2026-03-13

---

## Package Overview

| | |
|---|---|
| **Name** | `@nasa/hds-core` |
| **Foundation** | CMS-agnostic Sass on `@uswds/uswds ^3.3.0` |
| **Build tools** | Gulp + @uswds/compile, gulp-svg-sprite |

---

## File Structure

```
hds-core/
├── gulpfile.cjs              # Note: .cjs for ES module compatibility
├── test.html                 # Visual test page (not shipped)
│
├── .storybook/               # Storybook config (not shipped)
├── stories/                  # Component stories (not shipped)
│
├── src/
│   ├── scss/
│   │   ├── styles.scss           ← Entry point
│   │   ├── _hds-tokens.scss      ← Pure Sass (NO uswds-core)
│   │   ├── _hds-uswds-theme.scss ← USWDS configuration
│   │   ├── _hds-custom-styles.scss
│   │   ├── _hds-components.scss
│   │   └── _hds-palettes.scss
│   │
│   └── img/
│       ├── hds-icons/        # Themeable SVGs → sprite
│       ├── hds-buttons/      # Fixed-color graphics
│       └── nasa-branding/    # Logo and brand assets
│
└── dist/                     # Build output
    ├── css/styles.css
    └── assets/{fonts,img}/
```

---

## Sass Load Order

**Critical:** USWDS requires `uswds-core` to be configured before anything else loads it.

```
styles.scss
  → _hds-uswds-theme.scss
      @use "hds-tokens"           ← Pure Sass, no uswds-core
      @use "uswds-core" with (...) ← First load, configured
  → uswds                          ← Uses configured uswds-core
  → _hds-custom-styles.scss
  → _hds-components.scss
  → _hds-palettes.scss
```

⚠️ `_hds-tokens.scss` cannot `@use "uswds-core"` — this would load it unconfigured.

---

## File Responsibilities

| File | Purpose |
|------|---------|
| `_hds-tokens.scss` | Pure Sass variables/maps. No USWDS dependency. |
| `_hds-uswds-theme.scss` | Configures USWDS via `@use "uswds-core" with (...)` |
| `_hds-custom-styles.scss` | CSS custom properties, mixins, utilities, base elements, print |
| `_hds-components.scss` | USWDS component overrides + HDS components |
| `_hds-palettes.scss` | 6 palette definitions |

---

## Asset Paths

Configured in `_hds-uswds-theme.scss`:

```scss
$theme-image-path: "../assets/img",
$theme-font-path: "../assets/fonts",
```

**In component styles, always use `../assets/img/`:**

```scss
// ✅ Correct
mask-image: url('../assets/img/hds-icons/arrow-line-diagonal.svg');

// ❌ Wrong (404)
mask-image: url('../img/hds-icons/arrow-line-diagonal.svg');
```

---

## Color Convention

| Context | Use |
|---------|-----|
| HDS brand/Carbon colors | `$hds-color-*` |
| USWDS state colors | `color("error")` |
| Typography | `family("heading")`, `size("body", "xs")` |
| Spacing | `units(3)` |
| CSS/JS consumers | `var(--hds-color-*)` |

---

## Palette Variables

Always include fallbacks to HDS white palette defaults, so that styles work with or without palette wrappers:

```scss
color: var(--hds-palette-link-text, #{$hds-color-carbon-90});
```

---

## Link Styling Architecture

Like USWDS, HDS Core does **not** style base `<a>` tags. This is intentional. Devs can use .usa-prose for body sections and/or enable global link styles in their USWDS theme settings depending on the needs of their project.

All link styling lives in `_hds-components.scss` §13:

| Selector | Purpose |
|----------|---------|
| `.usa-link` | Full HDS link treatment |
| `.usa-link--external::after` | Diagonal arrow icon |
| `.hds-link--internal` | Escape hatch to hide arrow |

---

## Icon Architecture

**Themeable icons** (`hds-icons/`):
- Use `currentColor` for fill
- Compiled into `hds-sprite.svg`
- Color controlled by CSS

**Fixed-color graphics** (`hds-buttons/`):
- Colors baked in (NASA Blue/Red + white)
- Not in sprite, referenced as standalone files

---

## Storybook

- **Version:** Storybook 10 with Vite
- **Stories:** HTML template literals (not Twig)
- **Palette testing:** Toolbar switcher (paintbrush icon)

---

## Pending Work

- [ ] Test `.usa-prose a` styling
- [ ] Test `$theme-global-link-styles: true` with bare content
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Visual regression testing
- [ ] Dark palette form elements
- [ ] WordPress documentation updates