# HDS Core Architecture

Technical decisions and conventions for contributors.

Last updated: 2026-03-14

## Package Overview

| Key          | Value                                         |
|--------------|-----------------------------------------------|
| Name         | `@nasa/hds-core`                              |
| Foundation   | CMS-agnostic Sass on `@uswds/uswds ^3.13.0`  |
| Build tools  | Gulp + `@uswds/compile`, `gulp-svg-sprite`    |
| Minification | `gulp-clean-css`, `gulp-rename`               |
| Storybook    | v10, Vite, HTML template literals             |

## File Structure

```
hds-core/
├── gulpfile.js
├── test.html              # Visual test page (not shipped)
│
├── .storybook/            # Storybook config (not shipped)
├── stories/               # Component stories (not shipped)
│   ├── components/
│   │   ├── Link.stories.js
│   │   └── IconButton.stories.js
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

| File                       | Purpose                                           |
|----------------------------|---------------------------------------------------|
| `_hds-tokens.scss`         | Pure Sass variables/maps. No USWDS dependency.    |
| `_hds-uswds-theme.scss`   | Configures USWDS via `@use "uswds-core" with (...)` |
| `_hds-custom-styles.scss`  | CSS custom properties, mixins, utilities, base elements, print |
| `_hds-components.scss`     | USWDS component overrides + HDS components        |
| `_hds-palettes.scss`       | 6 palette definitions                             |

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

| Context                | Use                                     |
|------------------------|-----------------------------------------|
| HDS brand/Carbon colors | `$hds-color-*`                         |
| USWDS state colors     | `color("error")`                        |
| Typography             | `family("heading")`, `size("body", "xs")` |
| Spacing                | `units(3)`                              |
| CSS/JS consumers       | `var(--hds-color-*)`                    |

## Palette Variables

Always include fallbacks to HDS white palette defaults, so that styles work with or without palette wrappers:

```scss
color: var(--hds-palette-link-text, #{$hds-color-carbon-90});
```

## Typography Classes

Three visually similar but typographically distinct classes:

| Class                         | Font        | Weight  | Use                    |
|-------------------------------|-------------|---------|------------------------|
| `.hds-label`, `.hds-eyebrow` | DM Mono     | Bold    | Section labels         |
| `.hds-metadata`              | Inter       | Bold    | Dates, categories      |
| `.hds-caption`               | Public Sans | Normal  | Figcaptions, supplemental text |

All share uppercase, small size, and letterspacing. The `label-uppercase` mixin provides the shared treatment; `.hds-label` overrides `font-family` to DM Mono.

## Link Styling Architecture

Like USWDS, HDS Core does not style base `<a>` tags. This is intentional. Devs can use `.usa-prose` for body sections and/or enable global link styles in their USWDS theme settings depending on the needs of their project.

All link styling lives in `_hds-components.scss` §13:

| Selector                          | Purpose                        |
|-----------------------------------|--------------------------------|
| `.usa-link`                       | Full HDS link treatment        |
| `.usa-link--external::after`      | HDS diagonal arrow icon        |
| `.hds-link--internal`             | Escape hatch to hide arrow     |

### External Link Arrow

The external link arrow uses pure CSS (`::after` + `mask-image`). Key implementation details:

- `display: inline !important` overrides USWDS `inline-block` so the arrow flows as part of the text line and aligns correctly regardless of line-height
- `height: 1em` with `mask-size: 0.75em` + `mask-position: center` creates a container that matches text height with a proportionally smaller arrow centered inside
- `content: '\a0'` (non-breaking space) prevents the arrow from orphaning onto its own line
- The underline gap before the arrow is a known CSS limitation (CSS `text-decoration` does not flow through `::after` pseudo-elements). This is shared by USWDS, GOV.UK, and other government design systems.

## Icon Architecture

**Themeable icons** (`hds-icons/`):
- Use `currentColor` for fill
- Compiled into `hds-sprite.svg`
- Color controlled by CSS

**Fixed-color graphics** (`hds-buttons/`):
- Colors baked in (NASA Blue/Red + white)
- Not in sprite, referenced as standalone files

### Inline Glyphs

`.hds-glyph` renders bare icons inline with text without a button container. Uses `display: inline-block`, `height: 1em`, `vertical-align: baseline`. Do not add `vertical-align: middle` — baseline alignment is correct for 1em-height inline icons.

## Build Pipeline

### Gulpfile Tasks

| Task           | Purpose                                     |
|----------------|---------------------------------------------|
| `init`         | Copy USWDS assets + HDS assets + sprite     |
| `build`        | Compile Sass → copy assets → sprite → minify CSS |
| `compile`      | Sass compilation only (via `@uswds/compile`) |
| `watch`        | Recompile on Sass changes                    |
| `copyAssets`   | Copy HDS fonts and icons to dist             |
| `sprite`       | Generate SVG sprite                          |
| `minifyCss`    | Minify compiled CSS + sourcemap              |

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

**Version:** Storybook 10 with Vite

**Stories:** HTML template literals (not React/Twig)

**CSS loading:** Loaded as a static asset via `<link>` in `preview-head.html`, not as a Vite module import. This avoids Vite module caching issues when CSS is rebuilt externally by Gulp.

**Palette testing:** Toolbar switcher (paintbrush icon) applies palette wrapper via decorator in `preview.js`.

**Static assets:** `dist/` is served via `staticDirs` in `main.js`. Sprite paths in stories use `/assets/img/hds-sprite.svg#icon-name`.

**Story structure:**
```
stories/
├── components/        # Component stories + future MDX docs
│   ├── Link.stories.js
│   └── IconButton.stories.js
└── foundations/        # Design system reference
    ├── Icons.stories.js
    └── PaletteSpec.stories.js
```

**Sidebar organization:** Story titles use `Components/` and `Foundations/` prefixes. Sort order defined in `preview.js`: `['Overview', 'Foundations', 'Components']`.

**Codespaces:** Vite file watching requires polling mode. Configured via `viteFinal` in `main.js` with `usePolling: true`.

## Pending Work

- [ ] Button stories (§4 + §11 primary arrow)
- [ ] Form Elements stories (§5)
- [ ] Primary arrow icon: replace filled triangle with line arrow
- [ ] Spec verification pass across all components against Figma
- [ ] Figma visual tuning: external link arrow size (0.75em) and spacing
- [ ] External link arrow: minor extra spacing after icon
- [ ] Utility button component for palette spec (circle glyph as button)
- [ ] Test `.usa-prose a` styling
- [ ] Test `$theme-global-link-styles: true` with bare content
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] Screen reader text for external links: validate whether to inject `<span class="usa-sr-only">(external)</span>`
- [ ] Visual regression testing
- [ ] Dark palette form elements
- [ ] CTA button: NASA Red override for `.usa-button`
- [ ] Icon button outline thickness vs spec
- [ ] Checkbox HDS styling
- [ ] WordPress documentation updates
- [ ] Replace `@uswds/compile` with direct sass + autoprefixer (Phase 2 infrastructure)