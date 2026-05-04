# HDS Core Architecture

Technical decisions and conventions for contributors.

Last updated: 2026-04-26

## Package Overview

| Key          | Value                                                         |
| ------------ | ------------------------------------------------------------- |
| Name         | `@nasa/hds-core`                                              |
| Foundation   | CMS-agnostic Sass on `@uswds/uswds ^3.13.0`                   |
| Build tools  | `sass` + `postcss` + `autoprefixer` + `cssnano`, `svg-sprite` |
| Storybook    | v10, Vite, HTML template literals                             |
| Testing      | Vitest 4.x, Playwright (Chromium)                             |
| Visual tests | Chromatic (PaletteA11y + FocusTest stories)                   |

## Quick Start

```bash
npm install          # Install dependencies
npm run build        # Full production build
npm run dev          # Sass watch + Storybook (day-to-day development)
npm test             # Run all tests once
npm run test:visual  # Visual regression via Chromatic (on demand)
```

`build` handles everything — asset copying, Sass compilation, sprite generation, CSS autoprefixing, and minification. `dev` runs Sass watch + Storybook via `concurrently`. Edit `.scss` → Sass recompiles → Storybook hot-reloads.

| Script                | Purpose                                                 |
| --------------------- | ------------------------------------------------------- |
| `npm run build`       | Full build: assets → Sass → autoprefix → minify         |
| `npm run dev`         | Sass watch + Storybook (day-to-day)                     |
| `npm run watch`       | Sass watch only (also runs inside `dev`)                |
| `npm run init`        | Copy assets + generate sprite without compiling Sass    |
| `npm run storybook`   | Start Storybook only (no Sass watch)                    |
| `npm test`            | Run all tests once (CI mode)                            |
| `npm run test:watch`  | Watch mode (development)                                |
| `npm run test:visual` | Visual regression via Chromatic (on demand)             |
| `npm run check:uswds` | Verify USWDS packages haven't changed (runs on install) |

## File Structure

<!-- prettier-ignore -->
```
hds-core/
├── src/
│   ├── scss/
│   │   ├── hds.scss                ← Primary entry point (selective USWDS + HDS)
│   │   ├── hds-uswds.scss          ← Addon entry point (remaining USWDS packages)
│   │   ├── _hds-tokens.scss        ← Pure Sass (NO uswds-core dependency)
│   │   ├── _hds-uswds-theme.scss   ← USWDS configuration via @use "uswds-core" with (...)
│   │   ├── _hds-palettes.scss      ← 6 palette definitions + focus ring tokens
│   │   ├── base/                   ← Shared infrastructure (not components)
│   │   │   ├── _index.scss
│   │   │   ├── _custom-properties.scss  ← :root CSS custom properties
│   │   │   ├── _mixins.scss        ← Shared mixins (zero CSS output)
│   │   │   ├── _elements.scss      ← Bare HTML styles (gated) + palette wiring (always active)
│   │   │   ├── _focus.scss         ← Global :focus-visible (always active)
│   │   │   └── _print.scss         ← @media print
│   │   └── components/             ← One file per component
│   │       ├── _index.scss         ← @forward's all in dependency order
│   │       ├── _text-styles.scss   ← .hds-overline, .hds-metadata, .hds-caption
│   │       ├── _link.scss          ← Loaded before button (unstyled button depends on link)
│   │       ├── _button.scss
│   │       ├── _icon-button.scss
│   │       ├── _primary-arrow-button.scss
│   │       ├── _form.scss
│   │       ├── _intro-text.scss
│   │       ├── _list.scss
│   │       ├── _table.scss
│   │       ├── _accordion.scss
│   │       ├── _blockquote.scss
│   │       ├── _breadcrumb.scss
│   │       ├── _pagination.scss
│   │       ├── _in-page-nav.scss
│   │       ├── _site-alert.scss
│   │       ├── _alert.scss
│   │       ├── _grid-utilities.scss
│   │       ├── _navigation.scss    ← Phase 2 stub
│   │       └── _banner.scss        ← Phase 2 stub
│   └── assets/
│       ├── fonts/{inter,dm-mono}/
│       └── img/
│           ├── hds-icons/          ← Themeable SVGs → hds-sprite.svg
│           └── nasa-branding/
│
├── stories/                        # Storybook documentation (not shipped)
├── scripts/
│   ├── check-uswds.sh             ← USWDS package hash verification
│   └── uswds-package-hashes.txt   ← Baseline for @uswds/uswds 3.13.0
│
├── dist/                           # Build output
│   ├── css/
│   │   ├── hds.css                 ← Primary bundle (dev, autoprefixed)
│   │   ├── hds.css.map
│   │   ├── hds.min.css             ← Primary bundle (production, minified)
│   │   ├── hds-uswds.css           ← Addon bundle (dev, autoprefixed)
│   │   ├── hds-uswds.css.map
│   │   └── hds-uswds.min.css       ← Addon bundle (production, minified)
│   ├── js/
│   │   └── uswds.min.js            ← Copied from @uswds/uswds for convenience
│   └── assets/
│       ├── fonts/                   ← Inter, DM Mono, Public Sans + USWDS extras
│       └── img/
│           ├── hds-icons/           ← Individual SVGs
│           ├── hds-sprite.svg       ← Compiled sprite
│           ├── nasa-branding/
│           ├── usa-icons/           ← USWDS icons (copied)
│           ├── sprite.svg           ← USWDS icon sprite (copied)
│           └── us_flag*.{png,svg}   ← USWDS banner assets (copied)
│
├── postcss.config.mjs              ← Autoprefixer (+ cssnano when MINIFY=true)
├── svg-sprite.config.json          ← Sprite generation config
├── vitest.config.js
├── chromatic.config.json
└── .browserslistrc
```

## Build Output

Two CSS bundles, plus assets:

| Bundle | Contents | Gzipped | Adopter loads |
| --- | --- | --- | --- |
| `hds.css` | Selective USWDS foundation + HDS-themed components + HDS-only components + palettes | **27 KB** | Everyone |
| `hds-uswds.css` | Remaining ~30 USWDS component packages + utilities | 74 KB | Existing USWDS sites that use unthemed components |

**Load order matters:** `hds-uswds.css` must load **before** `hds.css` so HDS overrides win the cascade.

```html
<!-- Existing USWDS site — full coverage -->
<link rel="stylesheet" href="hds-uswds.min.css" />
<link rel="stylesheet" href="hds.min.css" />
<script src="uswds.min.js" defer></script>

<!-- New HDS site — lean bundle -->
<link rel="stylesheet" href="hds.min.css" />
<script src="uswds.min.js" defer></script>
```

USWDS JS is copied to `dist/js/` for convenience. Adopters with existing USWDS installations can use their own copy.

## Sass Architecture

### Entry points

**`hds.scss`** — Primary bundle. Selective USWDS loading:

```
1. _hds-uswds-theme.scss    ← Configure USWDS (must be first)
2. USWDS foundation         ← uswds-core, uswds-global, uswds-typography, usa-layout-grid
3. USWDS components         ← Only what HDS themes (~8 packages)
4. base/                    ← HDS tokens, mixins, elements, focus, print
5. components/              ← HDS overrides + HDS-only components
6. _hds-palettes.scss       ← 6 palette definitions
```

**`hds-uswds.scss`** — Addon. Remaining USWDS packages not in `hds.scss`. Independently compiled — also starts with `_hds-uswds-theme.scss` to configure USWDS. As HDS themes more components, packages move from this file into `hds.scss` and this addon shrinks.

### USWDS package inventory

Verified against `@uswds/uswds 3.13.0`. Hash baseline in `scripts/uswds-package-hashes.txt`. Run `npm run check:uswds` after any USWDS version bump.

**Foundation (in `hds.scss` — every site needs these):**

- `uswds-core` — functions, mixins, tokens (no CSS output)
- `uswds-global` — normalize, elements, helpers, fonts
- `uswds-typography` — usa-link, usa-list, usa-prose, usa-intro, usa-paragraph, usa-content, usa-display, usa-dark-background
- `usa-layout-grid` — grid container, row, column system

**Components (in `hds.scss` — only what HDS themes):**

- `usa-button`, `uswds-form-controls`, `usa-table`, `usa-accordion`
- `usa-breadcrumb`, `usa-in-page-navigation`, `usa-pagination`
- `usa-site-alert` (pulls in `usa-alert` as dependency)

**Remaining (in `hds-uswds.scss` — addon for full USWDS coverage):**

~30 packages including `usa-banner`, `usa-header`, `usa-nav`, `usa-footer`, `usa-card`, `usa-modal`, `uswds-utilities`. See `hds-uswds.scss` for the complete list.

### Module singleton rule

USWDS requires `uswds-core` to be configured via `@use "uswds-core" with (...)` before anything else loads it. `_hds-uswds-theme.scss` does this. Sass module singletons ensure `uswds-core` is configured once and shared everywhere.

⚠️ `_hds-tokens.scss` cannot `@use "uswds-core"` — it loads before the theme file and would trigger an unconfigured load.

### Token flow

```
_hds-tokens.scss (pure Sass — hex values, maps, flags)
    ↓ @use
_hds-uswds-theme.scss (feeds tokens into USWDS config)
    ↓ @use "uswds-core" with (...)
Everything else (gets configured USWDS)
```

Each component file has its own `@use` statements for what it needs. Multiple `@use` of the same module doesn't re-emit CSS.

## Conventions

### Colors

| Context                 | Use                                                             |
| ----------------------- | --------------------------------------------------------------- |
| HDS brand/Carbon colors | `$hds-color-*`                                                  |
| USWDS state colors      | `color("error")`                                                |
| USWDS theme colors      | `color("primary")` → NASA Red, `color("secondary")` → NASA Blue |
| Typography              | `family("heading")`, `size("body", "xs")`                       |
| Spacing                 | `units(3)`                                                      |
| CSS/JS consumers        | `var(--hds-color-*)`                                            |

### Palette variables

Always include fallbacks so styles work with or without palette wrappers:

```scss
color: var(--hds-palette-link-text, #{$hds-color-carbon-90});
```

### SVG icon coloring

Always set **both** `color` and `fill` on icon containers. `<path fill="currentColor">` inherits from the CSS `color` property, but some SVG structures inherit from `fill` instead. Setting both covers all paths.

```scss
// ✅ Both — covers all SVG inheritance paths
.icon {
  color: var(--hds-palette-utility-icon);
  fill: var(--hds-palette-utility-icon);
}
```

### Asset paths

Always use `../assets/img/` in component styles. Configured in `_hds-uswds-theme.scss` via `$theme-image-path` and `$theme-font-path`.

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
| `--hds-palette-focus` | A (default) | C60 | C30 | Link, Primary arrow, Utility icon btn, Accordion (via global), Pagination prev/next, Breadcrumb, In-Page Navigation |
| `--hds-palette-focus-bold` | B (bold) | C30 | C30 | CTA/Secondary/Outline text buttons, CTA/Secondary/Outline/Social icon btns |
| `--hds-palette-focus-subtle` | E (subtle) | C60 | C40 | Pagination page numbers, Pagination simplified btn |
| `--hds-palette-focus-minimal` | D (minimal) | C30 | C80 | Checkbox/Radio outer box |

Midtone and blue palettes override specific tokens where the scheme default would be invisible. See `_hds-palettes.scss` code comments for per-palette values.

**Width tokens:** `$hds-focus-widths` map in `_hds-tokens.scss` with `'thin'` (1px) and `'thick'` (2px) entries. Thin is the default; thick is used by text buttons, primary arrow, and breadcrumb.

**Mixin:** `hds-focus-ring($color, $width, $method, $offset)` in `base/_mixins.scss`. Supports `'outline'` (default — emits `outline` + `outline-offset`) and `'border'` (emits `border-color` + `border-style` + `outline: none`) methods. Border method is used by pagination page numbers and simplified button, which pre-reserve a transparent border for focus.

**Global rule:** `base/_focus.scss` applies `hds-focus-ring()` with defaults (Pattern A, thin, outline, 2px offset) to all focusable elements. Components override as needed.

**Interactive icon button** is exempt — uses a fixed focus ring (1px dashed Carbon 40, 1px offset) that does not adapt to palettes. Designed for use over images, video, and 3D content.

See DESIGN.md for design rationale behind the focus patterns and Figma deviations.

## Icon Architecture

**Themeable icons** (`hds-icons/`): Use `currentColor`, compiled into `hds-sprite.svg` via `svg-sprite` (config in `svg-sprite.config.json`). Color controlled by CSS. 15 icons renamed in v0.6.0 for USWDS naming consistency — see release notes for the full mapping.

**Interactive icon buttons** use the same sprite glyphs as all other roles. CSS handles the color inversion on hover and `aria-expanded` — no standalone SVGs needed. See `components/_icon-button.scss`.

**Naming prefixes:** `arrow-*` (directional), `tag-*` (category markers), `logo-*` (third-party marks).

**Inline glyphs:** `.hds-glyph` renders icons inline with text. Uses `vertical-align: baseline` — do not change to `middle`.

**USWDS icons:** USWDS's icon sprite (`sprite.svg`) and individual icons (`usa-icons/`) are copied to `dist/assets/img/` for components that reference them. See the UswdsIconDemo story under Foundations/Icons.

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
|  | `_blockquote.scss` | `.hds-blockquote` - Quote icon, person vs. source attribution, palette token |
| **Navigation** | `_breadcrumb.scss` | Forward-slash separators replace USWDS chevrons |
|  | `_pagination.scss` | Numbered + HDS simplified variant. Legacy USWDS arrows auto-restyled. |
|  | `_in-page-nav.scss` | Scroll spy sidebar for long-form content. Uses USWDS JS. |
| **Notifications** | `_site-alert.scss` | Emergency (red) and info (blue) variants with scoped palette vars |
|  | `_alert.scss` | Minimal override. Pure USWDS, not in HDS Figma. |
| **Layout** | `_grid-utilities.scss` | Responsive reverse, horizontal lists, section spacing |
| **Phase 2 stubs** | `_navigation.scss` | Header, footer, nav. Incomplete — inherited from prior work. |
|  | `_banner.scss` | Government compliance bar. Incomplete. |

Each component file has detailed code comments covering palette behavior, hover/disabled states, and USWDS override rationale. See DESIGN.md for design decisions.

## Testing

| Script                | Purpose                                     |
| --------------------- | ------------------------------------------- |
| `npm test`            | Run all tests once (CI mode)                |
| `npm run test:watch`  | Watch mode (development)                    |
| `npm run test:visual` | Visual regression via Chromatic (on demand) |

Vitest runs every exported story in headless Chromium via @storybook/addon-vitest/vitest-plugin (story discovery) and Playwright. Each story gets a render check and an axe-core accessibility check (WCAG 2.1 A + AA). Palette-aware components have hidden PaletteA11y stories that render all six palettes via paletteRender — Vitest axe-core checks contrast across all palettes in one pass. FocusTest stories include play-function assertions that validate tab order and :focus-visible activation; Vitest runs these against the default palette.

**Watch mode ignores non-component files** (`vitest.config.js`): Markdown docs, `package.json`, config files, and raw Sass source (`src/`) do not trigger reruns. Tests rerun when `dist/css/` changes (Sass output) or when story files change. This keeps the feedback loop fast during documentation and config edits.

**Test results are CLI-only.** The `@storybook/addon-vitest` Storybook UI addon is not used — it requires Vitest to run as a sidecar process connected to Storybook, which adds significant latency to the Storybook UI for all users. Test output lives in the terminal via `npm test` or `npm run test:watch`. The `@storybook/addon-a11y` panel in Storybook still provides per-story accessibility inspection in the browser.

### Visual Regression Testing

Uses Chromatic via @chromatic-com/storybook. Snapshots are disabled globally (disableSnapshot: true in preview.js) and enabled per-story via parameters. Two snapshot strategies:

1. **PaletteA11y stories** — stacked paletteRender (all 6 palettes in one image). Used for default-state and hover visual regression. One snapshot per story.

2. **FocusTest stories** — Chromatic modes (one palette per snapshot via real toolbar decorator). Used for :focus-visible ring regression. Play functions trigger real keyboard focus via userEvent.tab(). 6 snapshots per story. Modes defined in `.storybook/modes.js` — imported in story files, not `preview.js`, to avoid TurboSnap full rebuilds.

3. **SpriteRegression story** — renders all icons from `hds-sprite.svg` in a flat grid. Catches any glyph changes after sprite tooling updates.

Chromatic accessibility tests are OFF — Vitest handles local a11y via axe-core. TurboSnap enabled via `chromatic.config.json` (`onlyChanged: true`). External Sass and asset files declared via `externals` — any change triggers a full rebuild. Budget: ~100–120 snapshots per build (~40+ builds/month at 5k free tier).

## Storybook

**Version:** Storybook 10 with Vite (ESM-only)

**Stories:** HTML template literals (not React/Twig). JSX used only for docs helpers (`Note.jsx`).

**CSS loading:** Static `<link>` tags in `preview-head.html` load both `hds-uswds.css` (USWDS base) then `hds.css` (HDS overrides). This matches the adopter load order and ensures all stories — including USWDS template demos — render correctly. CSS is not imported as a Vite module to avoid caching issues when CSS is rebuilt externally by Sass.

**Addons:**

- `@storybook/addon-docs` — documentation pages + remark-gfm
- `@storybook/addon-a11y` — per-story accessibility checks in UI panel, axe-core checks in Vitest
- `storybook-addon-pseudo-states` — hover/focus/active simulation
- `@chromatic-com/storybook` — visual regression testing

**Server flags:** `--no-open` (devcontainer port forwarding handles the browser tab) and `--ci` (skips interactive prompts — auto-selects next port if 6006 is occupied, prevents the process from hanging in unattended environments).

**Codespaces:** Vite file watching requires polling mode. Configured in `main.js`. Sass watch also uses `--poll` for consistent recompilation in remote containers.

For story model, branding, viewport presets, sidebar sort, and all documentation conventions, see DOCUMENTATION.md.

## Codespaces

The devcontainer (`.devcontainer/devcontainer.json`) automates the full setup:

- **`postCreateCommand`**: Runs once when the Codespace is created or rebuilt. Installs npm dependencies, runs a full build, and installs Playwright's Chromium binary and OS dependencies.
- **Auto-start task** (`.vscode/tasks.json`): Runs `npm run dev` every time the Codespace opens, in a dedicated terminal tab labeled "HDS Core Dev." The first time a user opens the Codespace, VS Code will prompt "This workspace has tasks that run automatically. Allow?" — they need to click Allow once.

The intended Codespace experience: open → wait for build → Storybook auto-opens in browser → dedicated terminal shows Sass + Storybook output → default terminal is free for commands.

## Pending Work

Bugs tracked in [GitHub Issues](https://github.com/nasa/hds-core/issues).

### Bugs (pre-1.0)

- [ ] Table blue palette: links inside white table body have white text on white background — link color assumes palette background instead of table cell background
- [ ] Form error: red outline on error fields lost on hover — hover state overrides error border color
- [ ] Table: Sort button focus ring clipped by mask-image — invisible in all palettes (see FocusSortButton Chromatic baseline)

### Components

- [ ] Composed Forms review: USWDS `.usa-form-group--error` inserts a left border not present in HDS Figma. Error inline icon (red circle exclamation) present in HDS Figma but absent in USWDS — needs to be added.
- [ ] 4xl type token (120px): custom classes for H1-2xl / Number-lg
- [ ] Wire `$hds-extended-palette` for USWDS utility class generation
- [ ] Decide whether to keep or remove Navigation and Banner CSS stubs from v1.0 build
- [ ] Replace `usa-prose` with clean HDS implementation (removes USWDS specificity conflicts)

### Pre-1.0 Verification

- [x] ~~Replace `@uswds/compile` with direct sass + postcss + autoprefixer + cssnano~~
- [x] ~~Selective USWDS loading (hds.scss + hds-uswds.scss addon)~~
- [ ] Spec verification pass across all components against Figma
- [ ] Screen reader testing (NVDA, VoiceOver)

### Post-1.0

- [ ] Framework-specific setup guides (Vite, Next.js, webpack) for Sass load paths
- [ ] Re-evaluate Chromatic a11y tests when independent a11y/visual toggle ships
- [ ] Grid overlay toolbar toggle for verifying component alignment
- [ ] USWDS JS re-initialization: Date picker, time picker, combo box, character count, and file input fall back to native elements in Storybook due to DOMContentLoaded timing. Works correctly in production. See `test-uswds-js.html`.
- [ ] Migrate remaining pending work into GitHub Issues and Discussions
- [ ] JSON-first design tokens — generate `_hds-tokens.scss` and `_custom-properties.scss` from a single `tokens.json` source (Style Dictionary or DTCG format)

## Contributing

This package is maintained by the NASA HDS team. For conventions on adding new components:

1. Create `src/scss/components/_component-name.scss`
2. Add `@use` statements for dependencies (`uswds-core`, `hds-tokens`, `../base/mixins`)
3. Add `@forward` to `components/_index.scss` in the appropriate category
4. Document palette behavior and USWDS override rationale in the file header comment
5. If the component requires a new USWDS package, add its `@forward` to `hds.scss` under the component packages section and remove it from `hds-uswds.scss`
6. Run `npm run check:uswds` to regenerate the hash baseline if the USWDS package list changed

See `components/_button.scss` as a reference for comment style and organization.
