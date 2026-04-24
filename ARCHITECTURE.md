# HDS Core Architecture

Technical decisions and conventions for contributors.

Last updated: 2026-04-24

## Package Overview

| Key          | Value                                       |
| ------------ | ------------------------------------------- |
| Name         | `@nasa/hds-core`                            |
| Foundation   | CMS-agnostic Sass on `@uswds/uswds ^3.13.0` |
| Build tools  | Gulp + `@uswds/compile`, `gulp-svg-sprite`  |
| Minification | `gulp-clean-css`, `gulp-rename`             |
| Storybook    | v10, Vite, HTML template literals           |
| Testing      | Vitest 4.x, Playwright (Chromium)           |
| Visual tests | Chromatic (PaletteA11y stories)             |

## File Structure

<!-- prettier-ignore -->
```
hds-core/
├── .devcontainer/                  # Codespace config
├── .github/                        # Issue/discussion templates
├── .vscode/
│   └── tasks.json                  # Auto-starts npm run dev on folder open
├── .storybook/
│   ├── main.js
│   ├── manager.js                  # Sidebar branding (NASA meatball + HDS Core)
│   ├── manager-head.html           # Custom font for sidebar branding
│   ├── preview.js
│   └── preview-head.html
│
├── src/
│   ├── scss/
│   │   ├── styles.scss             ← Entry point
│   │   ├── _hds-tokens.scss        ← Pure Sass (NO uswds-core)
│   │   ├── _hds-uswds-theme.scss   ← USWDS configuration
│   │   ├── _hds-palettes.scss      ← 6 palette definitions
│   │   │
│   │   ├── base/                   ← Shared infrastructure (not components)
│   │   │   ├── _index.scss         ← @forward's all in order
│   │   │   ├── _custom-properties.scss  ← :root CSS custom properties
│   │   │   ├── _mixins.scss        ← Shared mixins (zero CSS output)
│   │   │   ├── _elements.scss      ← Bare HTML styles + palette wiring
│   │   │   ├── _focus.scss         ← Global :focus-visible (always active)
│   │   │   └── _print.scss         ← @media print
│   │   │
│   │   └── components/             ← One file per component
│   │       ├── _index.scss         ← @forward's all in dependency order
│   │       ├── _text-styles.scss   ← .hds-overline, .hds-metadata, .hds-caption
│   │       ├── _link.scss
│   │       ├── _button.scss
│   │       ├── _icon-button.scss
│   │       ├── _primary-arrow-button.scss
│   │       ├── _form.scss          ← Inputs, selects, checkbox, radio, errors
│   │       ├── _intro-text.scss
│   │       ├── _list.scss
│   │       ├── _table.scss
│   │       ├── _accordion.scss
│   │       ├── _breadcrumb.scss
│   │       ├── _pagination.scss
│   │       ├── _in-page-nav.scss
│   │       ├── _site-alert.scss
│   │       ├── _alert.scss
│   │       ├── _blockquote.scss
│   │       ├── _grid-utilities.scss
│   │       ├── _navigation.scss    ← Phase 2 stub
│   │       └── _banner.scss        ← Phase 2 stub
│   │
│   └── assets/
│       ├── fonts/{inter,dm-mono}/
│       └── img/
│           ├── hds-icons/          # Themeable SVGs → sprite
│           └── nasa-branding/
│
├── stories/                        # Storybook (not shipped)
│   ├── helpers/
│   │   ├── Note.jsx                # Callout component
│   │   ├── icons.js                # Icon ID arrays
│   │   └── paletteTests.js         # Palette a11y test helpers
│   ├── assets/                     # Screenshots (not shipped)
│   ├── overview/
│   │   ├── Overview.mdx
│   │   ├── Getting Started.mdx
│   │   └── Roadmap.mdx
│   ├── foundations/
│   │   ├── Accessibility.mdx
│   │   ├── Color.mdx
│   │   ├── ColorPalettes.mdx
│   │   ├── ColorPalettes.stories.js
│   │   ├── DataVisualization.mdx
│   │   ├── DataVisualizationPalettes.mdx
│   │   ├── Grid.mdx
│   │   ├── Grid.stories.js
│   │   ├── Icons.mdx
│   │   ├── Icons.stories.js
│   │   ├── Spacing.mdx
│   │   ├── Typography.mdx
│   │   └── Typography.stories.js
│   └── components/
│       ├── {Component}.mdx         # Guidance page
│       └── {Component}.stories.js  # Sidebar variant stories
│
├── dist/                           # Build output
│   ├── css/
│   │   ├── styles.css
│   │   ├── styles.css.map
│   │   ├── styles.min.css
│   │   └── styles.min.css.map
│   └── assets/{fonts,img}/
│
├── gulpfile.js
├── vitest.config.js
├── chromatic.config.json
├── test.html                       # Visual test page (not shipped)
├── .prettierrc
├── .prettierignore
└── .browserslistrc
```

## Sass Load Order

USWDS requires `uswds-core` to be configured before anything else loads it. This load order is critical — changing it will break the build.

```
styles.scss
  → _hds-uswds-theme.scss
      @use "hds-tokens"         ← Pure Sass, no uswds-core
      @use "uswds-core" with (...) ← First load, configured
  → uswds                      ← Uses configured uswds-core
  → base/                      ← Shared infrastructure
      _custom-properties.scss   ← :root token output
      _mixins.scss              ← Shared mixins (zero CSS output)
      _elements.scss            ← Bare HTML styles + palette wiring
      _focus.scss               ← Global :focus-visible
      _print.scss               ← @media print
  → components/                 ← One file per component
      _text-styles.scss         ← .hds-overline, .hds-metadata, .hds-caption
      _link.scss                ← Foundational (loaded before button)
      _button.scss
      ... (dependency order — see components/_index.scss)
  → _hds-palettes.scss          ← 6 palette definitions
```

⚠️ `_hds-tokens.scss` cannot `@use "uswds-core"` — this would load it unconfigured.

Each component file has its own `@use` statements for the dependencies it needs (`uswds-core`, `hds-tokens`, `../base/mixins`). Sass modules are singletons — multiple `@use` of the same module doesn't re-emit CSS.

## File Responsibilities

| File | Purpose |
| --- | --- |
| `_hds-tokens.scss` | Pure Sass variables/maps. No USWDS dependency. Brand colors, type scale, weights, line-heights, letterspacing, border tokens, focus ring widths, configuration flags. |
| `_hds-uswds-theme.scss` | Configures USWDS via `@use "uswds-core" with (...)`. Primary/secondary swap, font families, type scale, grid, button settings. |
| `base/_custom-properties.scss` | All HDS token values output to `:root` as CSS custom properties. |
| `base/_mixins.scss` | Shared mixins (zero CSS output): `visually-hidden`, `hds-focus-ring` (palette-aware dashed outline/border with color, width, method, and offset parameters), typography (`hds-overline-label`, `hds-metadata-type`, `intro-text`), button structure/color/hover, `hds-utility-circle` (colors only — layout and sizing come from icon button base in `components/_icon-button.scss`), `hds-link-appearance` / `hds-link-hover`. |
| `base/_elements.scss` | Bare HTML element styles (gated behind USWDS flags) and palette wiring (always active), organized by element type. Default styles and their palette-aware overrides are together so contributors see the full picture for each element. |
| `base/_focus.scss` | Global `:focus-visible` ring and USWDS `:focus` suppression. Always active (accessibility requirement). Separated for audit visibility. |
| `base/_print.scss` | `@media print` rules — palette reset, link URLs, element hiding. |
| `components/_text-styles.scss` | Small text treatment classes (`.hds-overline`, `.hds-metadata`, `.hds-caption`). Component-like patterns that use shared typography mixins. |
| `components/_*.scss` | One file per component. USWDS overrides (`usa-*`) and HDS-only components (`hds-*`). Each file documents palette behavior and USWDS override rationale. |
| `_hds-palettes.scss` | 6 palette definitions with shared scheme mixins. 27+ semantic CSS custom properties per palette (including 4 focus ring tokens). Blue palette uses unique tokens for secondary button contrast (Blue Tint / Blue instead of Blue / Blue Shade). |

## SCSS Directory Naming

`base/` contains shared build infrastructure — mixins, utilities, CSS custom properties, bare element styles, palette wiring, and print styles. This is the layer between tokens and components.

The name `base/` is deliberately different from the Storybook "Foundations" section (Typography, Color, Grid, Spacing, Icons). Those design system concepts map to `_hds-tokens.scss`, `_hds-uswds-theme.scss`, and `_hds-palettes.scss` — not to the `base/` directory. Contributors looking for "where are the typography foundations?" should look at `_hds-tokens.scss` and `_hds-uswds-theme.scss`, not `base/`.

## Color Convention

| Context                 | Use                                                             |
| ----------------------- | --------------------------------------------------------------- |
| HDS brand/Carbon colors | `$hds-color-*`                                                  |
| USWDS state colors      | `color("error")`                                                |
| USWDS theme colors      | `color("primary")` → NASA Red, `color("secondary")` → NASA Blue |
| Typography              | `family("heading")`, `size("body", "xs")`                       |
| Spacing                 | `units(3)`                                                      |
| CSS/JS consumers        | `var(--hds-color-*)`                                            |

## Palette Variables

Always include fallbacks so styles work with or without palette wrappers:

```scss
color: var(--hds-palette-link-text, #{$hds-color-carbon-90});
```

Palette scheme architecture, utility circle tokens, and per-palette overrides are documented in code comments in `_hds-palettes.scss` and in DESIGN.md.

## SVG Icon Coloring

Always set **both** `color` and `fill` on icon containers:

```scss
// ✅ Both — covers all SVG inheritance paths
.icon {
  color: var(--hds-palette-utility-icon);
  fill: var(--hds-palette-utility-icon);
}

// ❌ fill alone won't recolor <path fill="currentColor">
.icon {
  fill: var(--hds-palette-utility-icon);
}
```

## Asset Paths

Always use `../assets/img/` in component styles. Configured in `_hds-uswds-theme.scss`.

## Base Element Style Gating

Bare HTML element styles in `base/_elements.scss` are gated behind USWDS flags:

| Flag | Controls | Default |
| --- | --- | --- |
| `$theme-style-body-element` | `<body>` | `false` |
| `$theme-global-content-styles` | `h1`–`h6`, blockquote, table, lists, code, hr, img, figure, forms, bare `<button>` | `false` |
| `$theme-global-paragraph-styles` | `<p>` (also enabled by content flag) | `false` |
| `$theme-global-link-styles` | `<a>` (also enabled by content flag) | `false` |

Because these flags default to `false`, gated styles in `base/_elements.scss` do not emit in the default configuration. Bare elements inside `.usa-prose` receive USWDS styling (via USWDS's internal mixins) but not HDS-specific overrides for line-height, letterspacing, list spacing, link treatment, or table colors. The component overrides in `components/_list.scss` and `components/_table.scss` are always active and unaffected by these flags — only bare elements without component classes are impacted.

Focus styles (`base/_focus.scss`), palette wiring (in `base/_elements.scss`), all `usa-*` overrides, and all `hds-*` components are always active regardless of these flags.

## Focus Ring Architecture

HDS components use three distinct focus mechanisms:

| System | Mechanism | Components | Token Strategy |
| --- | --- | --- | --- |
| **Dashed outline ring** | Outline or border around component, contrasts against palette background | Link, Buttons, Icon buttons, Primary arrow, Accordion, Breadcrumb, Pagination, Checkbox/Radio outer box | `--hds-palette-focus-*` tokens + `hds-focus-ring()` mixin |
| **Solid blue element highlight** | Blue border on the form element itself | Text input, Select, Checkbox inner ring, Radio inner ring | `--hds-palette-btn-secondary-bg` — no change needed |
| **Surface-inverse ring** | Ring color is inverse of component's own fill, not palette background | Table body cells, Table header cells | Per-component logic in `_table.scss` |

### Dashed outline ring system

All selectors use `:focus-visible` (keyboard only, not mouse click). A suppression rule in `base/_focus.scss` prevents USWDS `:focus` styles from bleeding through on mouse interaction.

**Tokens:** Four semantic focus tokens in `_hds-palettes.scss`, matching Figma's five focus patterns (the fifth — Interactive — is fixed/exempt):

| Token | Figma Pattern | Light Value | Dark Value | Components |
| --- | --- | --- | --- | --- |
| `--hds-palette-focus` | A (default) | C60 | C30 | Link, Primary arrow, Utility icon btn, Accordion (via global), Pagination prev/next, Breadcrumb |
| `--hds-palette-focus-bold` | B (bold) | C30 | C30 | CTA/Secondary/Outline text buttons, CTA/Secondary/Outline/Social icon btns |
| `--hds-palette-focus-subtle` | E (subtle) | C60 | C40 | Pagination page numbers, Pagination simplified btn |
| `--hds-palette-focus-minimal` | D (minimal) | C30 | C80 | Checkbox/Radio outer box |

Midtone and blue palettes override specific tokens where the scheme default would be invisible. See `_hds-palettes.scss` code comments for per-palette values.

**Width tokens:** `$hds-focus-widths` map in `_hds-tokens.scss` with `'thin'` (1px) and `'thick'` (2px) entries. Thin is the default; thick is used by text buttons, primary arrow, and breadcrumb.

**Mixin:** `hds-focus-ring($color, $width, $method, $offset)` in `base/_mixins.scss`. Supports `'outline'` (default — emits `outline` + `outline-offset`) and `'border'` (emits `border-color` + `border-style` + `outline: none`) methods. Border method is used by pagination page numbers and simplified button, which pre-reserve a transparent border for focus.

**Global rule:** `base/_focus.scss` applies `hds-focus-ring()` with defaults (Pattern A, thin, outline, 2px offset) to all focusable elements. Components override as needed.

**Interactive icon button** is exempt — uses a fixed focus ring (1px dashed Carbon 40, 1px offset) that does not adapt to palettes. Designed for use over images, video, and 3D content.

See DESIGN.md for design rationale behind the focus patterns and Figma deviations.

## Component Files

Components are organized by category in `components/_index.scss`:

| Category | File | Notes |
| --- | --- | --- |
| **Text styles** | `_text-styles.scss` | `.hds-overline`, `.hds-metadata`, `.hds-caption` |
| **Foundational** | `_link.scss` | Loaded before button (unstyled button depends on link appearance) |
|  | `_button.scss` | CTA, secondary, outline, unstyled, blue palette override |
|  | `_icon-button.scss` | 6 roles, 8 sizes, inline glyph |
|  | `_primary-arrow-button.scss` | Text + red circle arrow, 6 sizes |
| **Form controls** | `_form.scss` | Text inputs, selects, checkbox, radio, labels, help text, errors, file input |
| **Content** | `_intro-text.scss` |  |
|  | `_list.scss` | Unordered (::marker), ordered (::before counter + flex), unstyled reset |
|  | `_table.scss` | Base, sorted columns, sort icons, borderless, dark palette, print |
|  | `_accordion.scss` | Circled chevron replaces USWDS +/−. Uses USWDS JS. |
| **Navigation** | `_breadcrumb.scss` | Forward-slash separators replace USWDS chevrons |
|  | `_pagination.scss` | Numbered + HDS simplified variant. Legacy USWDS arrows auto-restyled. |
|  | `_in-page-nav.scss` | Stub — needs full stories for v1.0. Uses USWDS JS. |
| **Notifications** | `_site-alert.scss` | Emergency (red) and info (blue) variants with scoped palette vars |
|  | `_alert.scss` | Minimal override. Pure USWDS, not in HDS Figma. |
| **Layout** | `_grid-utilities.scss` | Responsive reverse, horizontal lists, section spacing |
| **Phase 2 stubs** | `_navigation.scss` | Header, footer, nav. Incomplete — inherited from prior work. |
|  | `_banner.scss` | Government compliance bar. Incomplete. |

Each component file has detailed code comments covering palette behavior, hover/disabled states, and USWDS override rationale. See DESIGN.md for design decisions.

## Icon Architecture

**Themeable icons** (`hds-icons/`): Use `currentColor`, compiled into `hds-sprite.svg`. Color controlled by CSS. 15 icons renamed in v0.6.0 for USWDS naming consistency — see release notes for the full mapping.

**Interactive icon buttons** use the same sprite glyphs as all other roles. CSS handles the color inversion on hover and `aria-expanded` — no standalone SVGs needed. See `components/_icon-button.scss`.

**Naming prefixes:** `arrow-*` (directional), `tag-*` (category markers), `logo-*` (third-party marks).

**Inline glyphs:** `.hds-glyph` renders icons inline with text. Uses `vertical-align: baseline` — do not change to `middle`.

## Build Pipeline

| Task            | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Gulp watch + Storybook (day-to-day development)    |
| `npm run build` | Full build: assets → Sass → sprite → minify        |
| `npm run watch` | Recompile Sass on changes (also runs inside `dev`) |
| `npm run init`  | Refresh assets without recompiling Sass            |

`build` handles everything — asset copying, Sass compilation, sprite generation, and CSS minification. No need to run `init` first.

`dev` runs two processes via `concurrently`: Gulp watch (Sass → CSS on save) and Storybook. The full development loop: edit `src/scss/**/*.scss` → Gulp recompiles to `dist/css/styles.css` → Storybook hot-reloads the CSS in the browser.

## Testing

| Script                | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `npm test`            | Run all tests once (CI mode)                |
| `npm run test:watch`  | Watch mode (development)                    |
| `npm run test:visual` | Visual regression via Chromatic (on demand) |

Vitest runs every exported story in headless Chromium via @storybook/addon-vitest/vitest-plugin (story discovery) and Playwright. Each story gets a render check and an axe-core accessibility check (WCAG 2.1 A + AA). Palette-aware components have hidden PaletteA11y stories that render all six palettes via paletteRender — Vitest axe-core checks contrast across all palettes in one pass. FocusTest stories include play-function assertions that validate tab order and :focus-visible activation; Vitest runs these against the default palette.

**Watch mode ignores non-component files** (`vitest.config.js`): Markdown docs, `package.json`, config files, and raw Sass source (`src/`) do not trigger reruns. Tests rerun when `dist/css/` changes (Gulp output) or when story files change. This keeps the feedback loop fast during documentation and config edits.

**Test results are CLI-only.** The `@storybook/addon-vitest` Storybook UI addon is not used — it requires Vitest to run as a sidecar process connected to Storybook, which adds significant latency to the Storybook UI for all users. Test output lives in the terminal via `npm test` or `npm run test:watch`. The `@storybook/addon-a11y` panel in Storybook still provides per-story accessibility inspection in the browser.

### Visual Regression Testing

Uses Chromatic via @chromatic-com/storybook. Snapshots are disabled globally (disableSnapshot: true in preview.js) and enabled per-story via parameters. Two snapshot strategies:

1. PaletteA11y stories — stacked paletteRender (all 6 palettes in one image). Used for default-state and hover visual regression. Mirrors production where HDS palettes coexist on pages. One snapshot per story. Vitest also runs axe-core against this stacked DOM for per-palette contrast checks locally.

2. FocusTest stories — Chromatic modes (one palette per snapshot via real toolbar decorator). Used for :focus-visible ring regression. Play functions trigger real keyboard focus via userEvent.tab(). 6 snapshots per story (one per palette mode). Modes defined in .storybook/modes.js — imported in story files, not preview.js, to avoid TurboSnap full rebuilds.

Chromatic accessibility tests are OFF — Vitest handles local a11y via axe-core. Chromatic a11y will be re-evaluated when independent a11y/visual snapshot toggles are available (currently bundled: disableSnapshot controls both).

TurboSnap enabled via chromatic.config.json (onlyChanged: true). External Sass and asset files declared via externals: ["src/scss/**", "src/assets/**"] — any change triggers a full rebuild (correct behavior for a CSS design system). TurboSnap savings apply to story-only and docs-only changes. Unlocks after 10 successful builds.

Budget: ~100–120 snapshots per build (~40+ builds/month at 5k free tier).

Run on demand via npm run test:visual; not part of npm test. Screenshots are stored in Chromatic's cloud, not in the repo.

## Storybook

**Version:** Storybook 10 with Vite (ESM-only)

**Stories:** HTML template literals (not React/Twig). JSX used only for docs helpers (`Note.jsx`).

**CSS loading:** Static `<link>` in `preview-head.html`, not a Vite module import. Avoids caching issues when CSS is rebuilt externally by Gulp.

**Addons:**

- `@storybook/addon-docs` — documentation pages + remark-gfm
- `@storybook/addon-a11y` — per-story accessibility checks in UI panel, axe-core checks in Vitest
- `storybook-addon-pseudo-states` — hover/focus/active simulation
- `@chromatic-com/storybook` — visual regression testing (snapshots PaletteA11y stories only)

**Server flags:** `--no-open` (devcontainer port forwarding handles the browser tab) and `--ci` (skips interactive prompts — auto-selects next port if 6006 is occupied, prevents the process from hanging in unattended environments).

**Codespaces:** Vite file watching requires polling mode. Configured in `main.js`.

For story model, branding, viewport presets, sidebar sort, and all documentation conventions, see DOCUMENTATION.md.

### Codespaces

The devcontainer (`.devcontainer/devcontainer.json`) automates the full setup:

- **`postCreateCommand`**: Runs once when the Codespace is created or rebuilt. Installs npm dependencies, runs a full build, and installs Playwright's Chromium binary and OS dependencies.
- **Auto-start task** (`.vscode/tasks.json`): Runs `npm run dev` every time the Codespace opens, in a dedicated terminal tab labeled "HDS Core Dev." The first time a user opens the Codespace, VS Code will prompt "This workspace has tasks that run automatically. Allow?" — they need to click Allow once.

The intended Codespace experience: open → wait for build → Storybook auto-opens in browser → dedicated terminal shows Gulp + Storybook output → default terminal is free for commands.

### Components with CSS but no stories yet

| File                   | Component                  | Notes                                                   |
| ---------------------- | -------------------------- | ------------------------------------------------------- |
| `_navigation.scss`     | Navigation (header/footer) | Phase 2 stub — inherited from prior work, incomplete    |
| `_banner.scss`         | Banner (gov compliance)    | Phase 2 stub — uses USWDS JS for expand/collapse        |
| `_in-page-nav.scss`    | In-Page Navigation         | Stub — uses USWDS JS for scroll spy, needs full stories |
| `_alert.scss`          | Alert                      | Pure USWDS, not in HDS Figma                            |
| `_grid-utilities.scss` | Grid Utilities             | Responsive reverse, horizontal lists                    |

## Pending Work

Bugs tracked in [GitHub Issues](https://github.com/nasa/hds-core/issues).

### Components

- [ ] Composed Forms review: USWDS `.usa-form-group--error` inserts a left border not present in HDS Figma. Error inline icon (red circle exclamation) present in HDS Figma but absent in USWDS — needs to be added.
- [ ] 4xl type token (120px): custom classes for H1-2xl / Number-lg
- [ ] Wire `$hds-extended-palette` for USWDS utility class generation
- [ ] Decide whether to keep or remove Navigation and Banner CSS stubs from v1.0 build
- [ ] Table: Sort button focus ring clipped by mask-image — invisible in all palettes (see FocusSortButton Chromatic baseline)

### Pre-1.0 Verification

- [ ] Spec verification pass across all components against Figma
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] test.html: Replace with realistic integration page
- [ ] Replace `@uswds/compile` with direct sass + autoprefixer (pending meeting confirmation)

### Post-1.0 Infrastructure

- [ ] Framework-specific setup guides (Vite, Next.js, webpack) for Sass load paths
- [ ] Re-evaluate Chromatic a11y tests when independent a11y/visual toggle ships
- [ ] Grid overlay toolbar toggle for verifying component alignment (pairs with Navigation work)
- [ ] Migrate pending work for Phase 2+ into GitHub Issues and Discussions

## Contributing

This package is maintained by the NASA HDS team. For conventions on adding new components:

- Create a new file in `src/scss/components/` following the naming pattern (`_component-name.scss`)
- Add `@use` statements for dependencies the component needs (`uswds-core`, `hds-tokens`, `../base/mixins`)
- Add the `@forward` to `components/_index.scss` in the appropriate category
- Document palette behavior and USWDS override rationale in the file header comment
- See `components/_button.scss` as a reference for comment style and organization
