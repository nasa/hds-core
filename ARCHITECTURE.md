Here's the clean replacement:

```markdown
# HDS Core Architecture

Technical decisions and conventions for contributors.

Last updated: 2026-03-17

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

hds-core/ ├── gulpfile.js ├── test.html # Visual test page (not shipped) │ ├── .storybook/ # Storybook config (not shipped) ├── stories/ # Component stories (not shipped) │ ├── helpers/ │ │ ├── Note.jsx │ │ └── icons.js │ ├── components/ │ │ ├── Breadcrumb.mdx │ │ ├── Breadcrumb.stories.js │ │ ├── Button.mdx │ │ ├── Button.stories.js │ │ ├── IconButton.mdx │ │ ├── IconButton.stories.js │ │ ├── IntroText.mdx │ │ ├── IntroText.stories.js │ │ ├── Link.mdx │ │ ├── Link.stories.js │ │ ├── Pagination.mdx │ │ ├── Pagination.stories.js │ │ ├── SiteAlert.mdx │ │ └── SiteAlert.stories.js │ └── foundations/ │ ├── Icons.stories.js │ └── PaletteSpec.stories.js │ ├── src/ │ ├── scss/ │ │ ├── styles.scss ← Entry point │ │ ├── \_hds-tokens.scss ← Pure Sass (NO uswds-core) │ │ ├── \_hds-uswds-theme.scss ← USWDS configuration │ │ ├── \_hds-custom-styles.scss │ │ ├── \_hds-components.scss │ │ └── \_hds-palettes.scss │ │ │ └── assets/ │ ├── img/ │ │ ├── hds-icons/ # Themeable SVGs → sprite │ │ ├── hds-buttons/ # Fixed-color graphics │ │ └── nasa-branding/ # Logo and brand assets │ └── fonts/ │ └── dist/ # Build output ├── css/ │ ├── styles.css │ ├── styles.css.map │ ├── styles.min.css │ └── styles.min.css.map └── assets/{fonts,img}/

```

## Sass Load Order

Critical: USWDS requires `uswds-core` to be configured before anything else loads it.

```

styles.scss → \_hds-uswds-theme.scss @use "hds-tokens" ← Pure Sass, no uswds-core @use "uswds-core" with (...) ← First load, configured → uswds ← Uses configured uswds-core → \_hds-custom-styles.scss ← Mixins, base styles, utilities → \_hds-components.scss ← @use "hds-custom-styles" as \* for shared mixins → \_hds-palettes.scss

````

⚠️ `_hds-tokens.scss` cannot `@use "uswds-core"` — this would load it unconfigured.

### Cross-file mixin access

`_hds-components.scss` needs shared mixins from `_hds-custom-styles.scss` (e.g., `hds-utility-circle`). Sass module scoping prevents sibling `@forward` files from seeing each other's exports. The solution is `@use "hds-custom-styles" as *` at the top of `_hds-components.scss`. Sass modules are singletons — this doesn't re-emit CSS, it only grants access to exports (mixins, variables, functions).

```scss
// Top of _hds-components.scss
@use "sass:map";
@use "uswds-core" as *;
@use "hds-tokens" as *;
@use "hds-custom-styles" as *;  // §2 shared mixins (hds-utility-circle, etc.)
````

## File Responsibilities

| File | Purpose |
| --- | --- |
| `_hds-tokens.scss` | Pure Sass variables/maps. No USWDS dependency. Includes brand colors, type scale, weights, line-heights, letterspacing, border tokens. |
| `_hds-uswds-theme.scss` | Configures USWDS via `@use "uswds-core" with (...)`. Primary/secondary swap, font families, type scale, grid, button settings, focus ring settings. |
| `_hds-custom-styles.scss` | CSS custom properties, shared mixins (§2), utilities, base element styles (gated behind USWDS flags), palette wiring, print styles. |
| `_hds-components.scss` | Tier 1 USWDS component overrides (`usa-*`) + Tier 3 HDS-only components (`hds-*`). See DESIGN.md § Class Naming Convention. |
| `_hds-palettes.scss` | 6 palette definitions with shared scheme mixins and per-palette overrides. 23+ semantic variables per palette. |

## Asset Paths

Configured in `_hds-uswds-theme.scss`:

```scss
$theme-image-path: "../assets/img",
$theme-font-path:  "../assets/fonts",
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

**Important:** `color("base-darker")` returns a USWDS approximation, not the exact HDS hex. Use `$hds-color-carbon-90` for exact values. See DESIGN.md § Color Precision.

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

### Utility Circle Palette Tokens

Added to support hover and disabled states for utility icon circles (used in pagination and icon buttons):

| Token                                   | Light     | Dark         | Purpose              |
| --------------------------------------- | --------- | ------------ | -------------------- |
| `--hds-palette-utility-hover-fill`      | Carbon 05 | Carbon Black | Background on hover  |
| `--hds-palette-utility-hover-stroke`    | Carbon 40 | Carbon 05    | Border on hover      |
| `--hds-palette-utility-disabled-stroke` | Carbon 05 | Carbon 80    | Border when disabled |

Blue palette values are inferred from dark-scheme patterns — see DESIGN.md § Creative Director Review.

Disabled icon color reuses `--hds-palette-btn-disabled-text` (Carbon 30 light / Carbon 60 dark).

## SVG Icon Coloring

HDS icons use `currentColor` for fill, allowing CSS to control their color. When styling SVG icons in CSS, always set **both** `color` and `fill` on the icon container:

```scss
// ✅ Correct — covers both inheritance paths
.my-icon-container .hds-icon {
  color: var(--hds-palette-utility-icon, #{$hds-color-carbon-black});
  fill: var(--hds-palette-utility-icon, #{$hds-color-carbon-black});
}

// ❌ Incomplete — fill alone won't recolor <path fill="currentColor">
.my-icon-container .hds-icon {
  fill: var(--hds-palette-utility-icon, #{$hds-color-carbon-black});
}
```

**Why both?** SVG `<path fill="currentColor">` resolves from the CSS `color` property, not `fill`. Setting only `fill` on the parent `<svg>` won't cascade into `currentColor` references on child paths. Setting both ensures recoloring works regardless of how the SVG internals are authored.

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

## Focus Ring Architecture

Two layers work together:

**Layer 1 — USWDS theme settings** (`_hds-uswds-theme.scss`): Sets `$theme-focus-color`, `$theme-focus-width`, `$theme-focus-style`, `$theme-focus-offset` to match HDS values. This prevents the default blue ring on all USWDS components.

**Layer 2 — HDS global focus** (`_hds-custom-styles.scss` §4.11): Applies palette-aware 1px dashed `:focus-visible` rule using `--hds-palette-muted`. Only fires on keyboard navigation, not mouse clicks.

Components with special focus needs override locally:

- **Pagination page numbers:** `border` instead of `outline`, no offset (generous internal spacing)
- **Utility circles:** `outline` with 2px offset (dashed ring outside the solid circle border)
- **Simplified pagination buttons:** `border` on the whole composed button (text + icon)

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
| §3 | Breadcrumb | 1 | Transparent bg, slash separators (not USWDS chevron), palette-aware colors (muted base, heading for current page + hover), hover semibold + dotted underline |
| §4 | Buttons | 1 | Palette-aware CTA (Red), secondary (Blue), outline (Blue border). Explicit hover/disabled. See DESIGN.md § Button States. |
| §5 | Forms | 1 | Light backgrounds only (dark TODO) |
| §6 | In-Page Navigation | 1 | Active state = NASA Blue |
| §7 | Pagination | 1+3 | §7.0–7.4: Tier 1 USWDS overrides (bottom-bar current indicator, utility circle prev/next, palette-aware text/ellipsis). §7.5: Tier 3 simplified pagination (composed Previous/Next buttons with icon + text). |
| §8 | Accordion | 1 | No left border, light bg, hover darker |
| §9 | Alerts | 1 | border-radius: 0, border-left-width: 4px. Pure USWDS — not in HDS Figma. No Storybook stories. |
| §10 | Grid Utilities | 1 | Responsive reverse, horizontal lists |
| §11 | Primary Arrow Button | 3 | `.hds-btn--primary` — CSS `::after` with data-URI line arrow |
| §12 | Icon Buttons | 3 | `.hds-btn-icon--*` — 6 roles, 3 sizes (sm, default, lg). `--utility` uses shared `@mixin hds-utility-circle` from `_hds-custom-styles.scss` §2.5. Interactive role uses hardcoded colors (not palette vars). Hover/disabled states TODO except `--utility` which is handled in §7.4 for pagination context. |
| §13 | Links | 1+3 | `.usa-link` override + `.hds-link--internal` escape |
| §14 | Intro Text | 1 | `.usa-intro` — Public Sans 400, size("body", "sm") ~18px, line-height token 4 (1.52 ≈ 150%), letter-spacing neg-1 (-0.25px). Source: Figma (Proposal silent on intro text). |
| §15 | Site Alert | 1 | Scoped `--hds-palette-*` vars on `.usa-site-alert--emergency` (NASA Red Shade) and `--info` (NASA Blue Shade). §15.1 overrides USWDS `set-text-from-bg` at matching specificity. HDS Figma calls this "Banner." |

### Shared Mixins (`_hds-custom-styles.scss` §2)

| Mixin                | Section  | Used by                                               |
| -------------------- | -------- | ----------------------------------------------------- |
| `visually-hidden`    | §2.1     | §7.2 (hide USWDS prev/next text labels)               |
| `label-uppercase`    | §2.2     | §3 shared utilities                                   |
| `button-styles`      | §2.3–2.4 | §4 buttons, §4.12 base button reset                   |
| `button-round`       | §2.3     | Not currently used (see note below)                   |
| `hds-utility-circle` | §2.5     | §7.2 legacy prev/next, §12.2 `--utility` icon buttons |

Note: `button-round` and `hds-utility-circle` overlap significantly. `hds-utility-circle` is `button-round` plus palette-aware colors and cursor. Future cleanup could have `hds-utility-circle` `@include button-round` and add only the color/cursor properties.

## Icon Architecture

**Themeable icons** (`hds-icons/`):

- Use `currentColor` for fill
- Compiled into `hds-sprite.svg`
- Color controlled by CSS (set both `color` and `fill` — see SVG Icon Coloring above)

**Fixed-color graphics** (`hds-buttons/`):

- Colors baked in (NASA Blue/Red + white)
- Not in sprite, referenced as standalone files

**Icon naming prefixes:**

- `arrow-*` — Directional arrows
- `tag-*` — Tag/category markers
- `logo-*` — Third-party platform marks (Figma, USWDS, social media)

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

**CSS loading:** Loaded as a static asset via `<link>` in preview-head.html, not as a Vite module import. This avoids Vite module caching issues when CSS is rebuilt externally by Gulp.

**Palette testing:** Toolbar switcher (paintbrush icon) applies palette wrapper via decorator in preview.js.

**Static assets:** `dist/` is served via `staticDirs` in main.js. Sprite paths in stories use `/assets/img/hds-sprite.svg#icon-name`. USWDS icons available via `/assets/img/sprite.svg#icon-name`.

**Addons:**

- `@storybook/addon-docs` — documentation pages + remark-gfm for markdown tables
- `@storybook/addon-a11y` — accessibility testing
- `storybook-addon-pseudo-states` — hover/focus/active state simulation (installed, configuration pending)

**Codespaces:** Vite file watching requires polling mode. Configured via `viteFinal` in main.js with `usePolling: true`.

See **DOCUMENTATION.md** for all docs conventions: sidebar structure, MDX patterns, callout system, story helpers, and cross-linking.

**Shared data helpers** live in `stories/helpers/` alongside JSX components:

| File       | Content                           | Extension         |
| ---------- | --------------------------------- | ----------------- |
| `Note.jsx` | React callout component           | `.jsx` (uses JSX) |
| `icons.js` | Icon ID arrays for story controls | `.js` (pure data) |

Extension matches content — `.jsx` for JSX, `.js` for plain data/utilities.

### Sections with CSS but no stories yet

| Section | Component                  | Tier | Notes                                |
| ------- | -------------------------- | ---- | ------------------------------------ |
| §1      | Navigation (header/footer) | 1    | Complex — Phase 2 candidate          |
| §2      | Banner                     | 1    | Needs USWDS JS for expand/collapse   |
| §5      | Forms                      | 1    | Light palettes only — dark deferred  |
| §6      | In-Page Navigation         | 1    | Needs USWDS JS for scroll spy        |
| §8      | Accordion                  | 1    | Needs USWDS JS for toggle            |
| §9      | Alerts                     | 1    | Pure USWDS, not in HDS Figma         |
| §10     | Grid Utilities             | 1    | Responsive reverse, horizontal lists |

## Pending Work

### Bugs

All moved into Github Issues

### Components

- [ ] Dark palette form elements (§5)
- [ ] Checkbox HDS styling
- [ ] 4xl type token (120px): custom classes for H1-2xl / Number-lg
- [ ] Wire `$hds-extended-palette` for USWDS utility class generation — `$global-color-palettes` expects palette name strings, not a Sass map. Needs research into USWDS 3.x custom color registration API.

### Storybook

- [ ] Remaining component stories as components are completed
- [ ] Foundation MDX audit: verify all cross-links resolve, all hex values match tokens, all Canvas embeds render correctly across palettes

### Pre-1.0 Verification

- [ ] Spec verification pass across all components against Figma (visual details: arrow sizing, caption styles, blockquote line-height, icon button outline thickness, responsive typography, etc.)
- [ ] Accessibility testing — screen reader (NVDA, VoiceOver), SR approach for external links, focus ring contrast review
- [ ] test.html: Replace with realistic integration page using validated component markup (site alert, banner, header, footer, accordion, all palette sections, bare element flag testing)

### Infrastructure

- [ ] Framework-specific setup guides (Vite, Next.js, webpack) for Sass load paths
- [ ] Replace `@uswds/compile` with direct sass + autoprefixer (Phase 2)
- [ ] Triage pending work for Phase 2+ into GitHub Issues and Discussions
