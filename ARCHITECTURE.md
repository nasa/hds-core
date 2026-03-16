# HDS Core Architecture

Technical decisions and conventions for contributors.

Last updated: 2026-03-15

## Package Overview

| Key          | Value                                       |
| ------------ | ------------------------------------------- |
| Name         | `@nasa/hds-core`                            |
| Foundation   | CMS-agnostic Sass on `@uswds/uswds ^3.13.0` |
| Build tools  | Gulp + `@uswds/compile`, `gulp-svg-sprite`  |
| Minification | `gulp-clean-css`, `gulp-rename`             |
| Storybook    | v10, Vite, HTML template literals           |

## File Structure

```
hds-core/
├── gulpfile.js
├── test.html              # Visual test page (not shipped)
│
├── .storybook/            # Storybook config (not shipped)
├── stories/               # Component stories (not shipped)
│   ├── components/
│   │   ├── Button.stories.js
│   │   ├── IconButton.stories.js
│   │   └── Link.stories.js
│   └── foundations/
│       ├── Icons.stories.js
│       └── PaletteSpec.stories.js
│
├── src/
│   ├── scss/
│   │   ├── styles.scss            ← Entry point
│   │   ├── _hds-tokens.scss       ← Pure Sass (NO uswds-core)
│   │   ├── _hds-uswds-theme.scss  ← USWDS configuration
│   │   ├── _hds-custom-styles.scss
│   │   ├── _hds-components.scss
│   │   └── _hds-palettes.scss
│   │
│   └── assets/
│       ├── img/
│       │   ├── hds-icons/         # Themeable SVGs → sprite
│       │   ├── hds-buttons/       # Fixed-color graphics
│       │   └── nasa-branding/     # Logo and brand assets
│       └── fonts/
│
└── dist/                          # Build output
    ├── css/
    │   ├── styles.css
    │   ├── styles.css.map
    │   ├── styles.min.css
    │   └── styles.min.css.map
    └── assets/{fonts,img}/
```

## Sass Load Order

Critical: USWDS requires `uswds-core` to be configured before anything else loads it.

```
styles.scss
  → _hds-uswds-theme.scss
      @use "hds-tokens"       ← Pure Sass, no uswds-core
      @use "uswds-core" with (...)  ← First load, configured
  → uswds                    ← Uses configured uswds-core
  → _hds-custom-styles.scss
  → _hds-components.scss
  → _hds-palettes.scss
```

⚠️ `_hds-tokens.scss` cannot `@use "uswds-core"` — this would load it unconfigured.

## File Responsibilities

| File | Purpose |
| --- | --- |
| `_hds-tokens.scss` | Pure Sass variables/maps. No USWDS dependency. Includes brand colors, type scale, weights, line-heights, letterspacing, border tokens. |
| `_hds-uswds-theme.scss` | Configures USWDS via `@use "uswds-core" with (...)`. Primary/secondary swap, font families, type scale, grid, button settings. |
| `_hds-custom-styles.scss` | CSS custom properties, mixins, utilities, base element styles (gated behind USWDS flags), palette wiring, print styles. |
| `_hds-components.scss` | Tier 1 USWDS component overrides (`usa-*`) + Tier 3 HDS-only components (`hds-*`). See DESIGN.md § Class Naming Convention. |
| `_hds-palettes.scss` | 6 palette definitions with shared scheme mixins and per-palette overrides. 23 semantic variables per palette. |

## Asset Paths

Configured in `_hds-uswds-theme.scss`:

```scss
$theme-image-path: "../assets/img",
$theme-font-path: "../assets/fonts",
```

In component styles, always use `../assets/img/`:

```scss
// ✅ Correct
mask-image: url('../assets/img/hds-icons/arrow-line-diagonal.svg');

// ❌ Wrong (404)
mask-image: url('../img/hds-icons/arrow-line-diagonal.svg');
```

## Color Convention

| Context                 | Use                                                             |
| ----------------------- | --------------------------------------------------------------- |
| HDS brand/Carbon colors | `$hds-color-*`                                                  |
| USWDS state colors      | `color("error")`                                                |
| USWDS theme colors      | `color("primary")` → NASA Red, `color("secondary")` → NASA Blue |
| Typography              | `family("heading")`, `size("body", "xs")`                       |
| Spacing                 | `units(3)`                                                      |
| CSS/JS consumers        | `var(--hds-color-*)`                                            |

**Important:** `color("base-darker")` returns a USWDS approximation, not the exact HDS hex. Use `$hds-color-carbon-90` for exact values. See DESIGN.md § Three Color Systems.

## Palette Variables

Always include fallbacks to HDS white palette defaults, so that styles work with or without palette wrappers:

```scss
color: var(--hds-palette-link-text, #{$hds-color-carbon-90});
```

### Palette Scheme Architecture

Palettes use shared scheme mixins with per-palette overrides:

| Palette | Base Scheme     | Overrides                           |
| ------- | --------------- | ----------------------------------- |
| White   | `_scheme-light` | None (default)                      |
| Light   | `_scheme-light` | Background only                     |
| Midtone | `_scheme-light` | text, muted, border, utility-stroke |
| Dark    | `_scheme-dark`  | Background only                     |
| Blue    | Fully custom    | All values defined inline           |
| Black   | `_scheme-dark`  | Background only                     |

Dark scheme separates `--hds-palette-link-underline` (Carbon 30) from `--hds-palette-link-arrow` (Carbon 40). This split is intentional per the HDS Core Proposal.

## Typography Classes

Three visually similar but typographically distinct classes:

| Class                        | Font        | Weight | Use                            |
| ---------------------------- | ----------- | ------ | ------------------------------ |
| `.hds-label`, `.hds-eyebrow` | DM Mono     | Bold   | Section labels                 |
| `.hds-metadata`              | Inter       | Bold   | Dates, categories              |
| `.hds-caption`               | Public Sans | Normal | Figcaptions, supplemental text |

All share uppercase, small size, and 0.25px letterspacing. The `label-uppercase` mixin provides the shared treatment; `.hds-label` overrides `font-family` to DM Mono.

### Removed Classes

| Removed Class  | Replacement    | Reason                                            |
| -------------- | -------------- | ------------------------------------------------- |
| `.hds-sr-only` | `.usa-sr-only` | USWDS provides identical implementation (Tier 1)  |
| `.hds-intro`   | `.usa-intro`   | Overridden in `_hds-components.scss` §14 (Tier 1) |

The `visually-hidden` and `intro-text` mixins are kept for internal use.

## Base Element Style Gating

Bare HTML element styles in `_hds-custom-styles.scss` §4 are gated behind USWDS settings flags:

| Flag | Controls | Default |
| --- | --- | --- |
| `$theme-style-body-element` | `<body>` | `false` |
| `$theme-global-content-styles` | `h1`–`h6`, blockquote, table, lists, code, hr, img, figure, forms, bare `<button>` | `false` |
| `$theme-global-paragraph-styles` | `<p>` (also enabled by content flag) | `false` |
| `$theme-global-link-styles` | `<a>` (also enabled by content flag) | `false` |

**Always active** (not gated):

- §4.11 Focus styles (accessibility)
- §5 Palette element wiring (only applies inside palette containers)
- All `usa-*` overrides in `_hds-components.scss`
- All `hds-*` components

See DESIGN.md § Global Element Styles for rationale.

## Link Styling Architecture

HDS Core's link styling has two layers:

**Layer 1 — Bare `<a>` tags** (gated): When `$theme-global-link-styles` or `$theme-global-content-styles` is `true`, bare `<a>` tags receive HDS treatment (body-text color, dotted underline) via `_hds-custom-styles.scss` §4.3.

**Layer 2 — `.usa-link` class** (always active): Full HDS link treatment via Tier 1 overrides in `_hds-components.scss` §13:

| Selector                     | Purpose                    |
| ---------------------------- | -------------------------- |
| `.usa-link`                  | Full HDS link treatment    |
| `.usa-link--external::after` | HDS diagonal arrow icon    |
| `.hds-link--internal`        | Escape hatch to hide arrow |

### External Link Arrow

The external link arrow uses pure CSS (`::after` + `mask-image`). Key implementation details:

- `display: inline !important` overrides USWDS `inline-block` so the arrow flows as part of the text line and aligns correctly regardless of line-height
- `height: 1em` with `mask-size: 0.75em` + `mask-position: center` creates a container that matches text height with a proportionally smaller arrow centered inside
- `content: '\a0'` (non-breaking space) prevents the arrow from orphaning onto its own line
- The underline gap before the arrow is a known CSS limitation (CSS `text-decoration` does not flow through `::after` pseudo-elements). This is shared by USWDS, GOV.UK, and other government design systems.

**Screen reader note:** The `::after` replacement overrides USWDS's built-in external link SR labels. Developers should add SR text manually: `<span class="usa-sr-only">(external)</span>`.

## Component Sections (`_hds-components.scss`)

| Section | Component | Tier | Notes |
| --- | --- | --- | --- |
| §1 | Navigation (header, footer, nav) | 1 | Link resets, menu triggers |
| §2 | Banner | 1 | Light background, outside palette context |
| §3 | Breadcrumb | 1 |  |
| §4 | Buttons | 1 | Palette-aware CTA (Red), secondary (Blue), outline (Blue border). Explicit hover/disabled. See DESIGN.md § Button States. |
| §5 | Forms | 1 | Light backgrounds only (dark TODO) |
| §6 | In-Page Navigation | 1 | Active state = NASA Blue |
| §7 | Pagination | 1 | Current page = NASA Blue |
| §8 | Accordion | 1 |  |
| §9 | Alerts | 1 |  |
| §10 | Grid Utilities | 1 | Responsive reverse, horizontal lists |
| §11 | Primary Arrow Button | 3 | `.hds-btn--primary` — CSS `::after` with data-URI line arrow |
| §12 | Icon Buttons 3 .hds-btn-icon--\* — 6 roles, 3 sizes (sm, default, lg) |
| §13 | Links | 1+3 | `.usa-link` override + `.hds-link--internal` escape |
| §14 | Intro Text | 1 | `.usa-intro` override |

## Icon Architecture

**Themeable icons** (`hds-icons/`):

- Use `currentColor` for fill
- Compiled into `hds-sprite.svg`
- Color controlled by CSS

**Fixed-color graphics** (`hds-buttons/`):

- Colors baked in (NASA Blue/Red + white)
- Not in sprite, referenced as standalone files

**Icon naming prefixes:** arrow-_ Directional arrows tag-_ Tag/category markers  
 logo-\* Third-party platform marks (Figma, USWDS, social media)

### Inline Glyphs

`.hds-glyph` renders bare icons inline with text without a button container. Uses `display: inline-block`, `height: 1em`, `vertical-align: baseline`. Do not add `vertical-align: middle` — baseline alignment is correct for 1em-height inline icons.

## Build Pipeline

### Gulpfile Tasks

| Task         | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `init`       | Copy USWDS assets + HDS assets + sprite          |
| `build`      | Compile Sass → copy assets → sprite → minify CSS |
| `compile`    | Sass compilation only (via `@uswds/compile`)     |
| `watch`      | Recompile on Sass changes                        |
| `copyAssets` | Copy HDS fonts and icons to dist                 |
| `sprite`     | Generate SVG sprite                              |
| `minifyCss`  | Minify compiled CSS + sourcemap                  |

### Build Order

`build` runs in series:

1. `uswds.compile` — Sass → CSS
2. `copyHdsAssets` — fonts, icons to dist
3. `buildSprite` — SVG sprite generation
4. `minifyCss` — CSS minification + sourcemap

### Dependencies

CSS minification uses `gulp-clean-css` and `gulp-rename`. Sourcemaps use Gulp 4 built-in support (`{ sourcemaps: true }` on `gulp.src/dest`) instead of `gulp-sourcemaps` to avoid a postcss vulnerability chain.

### Important: init Before build

If `dist/` has been deleted, `npx gulp init` must run before `npx gulp build`. The build task expects USWDS static assets (fonts, images, JS) to already exist in `dist/`.

## Storybook

**Version:** Storybook 10 with Vite (ESM-only)

**Stories:** HTML template literals (not React/Twig). JSX used only for docs helpers (Note.jsx).

**CSS loading:** Loaded as a static asset via <link> in preview-head.html, not as a Vite module import. This avoids Vite module caching issues when CSS is rebuilt externally by Gulp.

**Palette testing:** Toolbar switcher (paintbrush icon) applies palette wrapper via decorator in preview.js.

**Static assets:** dist/ is served via staticDirs in main.js. Sprite paths in stories use /assets/img/hds-sprite.svg#icon-name. USWDS icons available via /assets/img/sprite.svg#icon-name.

**Addons:**

- @storybook/addon-docs — documentation pages + remark-gfm for markdown tables
- @storybook/addon-a11y — accessibility testing
- storybook-addon-pseudo-states — hover/focus/active state simulation (installed, configuration pending)

**Codespaces:** Vite file watching requires polling mode. Configured via viteFinal in main.js with usePolling: true.

See **DOCUMENTATION.md** for all docs conventions: sidebar structure, MDX patterns, callout system, story helpers, and cross-linking.

**Shared data helpers** live in `stories/helpers/` alongside JSX components:

| File       | Content                           | Extension         |
| ---------- | --------------------------------- | ----------------- |
| `Note.jsx` | React callout component           | `.jsx` (uses JSX) |
| `icons.js` | Icon ID arrays for story controls | `.js` (pure data) |

Extension matches content — `.jsx` for JSX, `.js` for plain data/utilities.

## Pending Work

### Bugs

- [ ] Disabled buttons still show visual changes on hover despite `:not(:disabled)` guards — likely USWDS specificity issue. Inspect compiled CSS to identify competing selector.
- [ ] Unstyled button (looks like a link) is getting a NASA Red/Shade fill on hover
- [ ] Storybook Code tab disappears on Playground stories despite `docs.source.type: 'dynamic'` in preview.js — may need per-story `parameters.docs.source.code` override or Storybook 10 bug. Canvas "Show code" in Guidance pages works correctly.

### Components

- [ ] Icon button hover and disabled states (§12)
- [ ] Primary arrow button size variants — Figma shows 6 sizes (14–36), pending creative director review
- [ ] Dark palette form elements (§5)
- [ ] Checkbox HDS styling
- [ ] 4xl type token (120px): custom classes for H1-2xl / Number-lg
- [ ] Data visualization color palette (USWDS-mapped, per proposal appendix)
- [ ] Verify `$hds-extended-palette` is wired via `$global-color-palettes` for USWDS utility class generation

### Storybook

[ ] Configure storybook-addon-pseudo-states [ ] Remaining component stories as components are completed (Form Elements next) [ ] See DOCUMENTATION.md § Pending Docs Work for all documentation TODOs

### Pre-1.0 Verification

- [ ] Spec verification pass across all components against Figma (visual details: arrow sizing, caption styles, blockquote line-height, icon button outline thickness, responsive typography, etc.)
- [ ] Creative director visual review (see DESIGN.md § Creative Director Review for full list)
- [ ] Accessibility testing — screen reader (NVDA, VoiceOver), SR approach for external links, focus ring contrast review
- [ ] Integration testing — `.usa-prose a` styling, `$theme-global-link-styles`, `$theme-global-content-styles`, `$theme-style-body-element`
- [ ] Clean up unknown sprite IDs (bfa, bga, bha, bia, bja, bka, bla, bma, caa, dra)

### Infrastructure

- [ ] Framework-specific setup guides (Vite, Next.js, webpack) for Sass load paths
- [ ] Replace `@uswds/compile` with direct sass + autoprefixer (Phase 2)
- [ ] Triage pending work for Phase 2+ into GitHub Issues and Discussions
