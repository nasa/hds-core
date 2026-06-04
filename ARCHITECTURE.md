# HDS Core Architecture

Technical decisions by maintainers and conventions for contributors.

Last updated: 2026-06-02

## Package Overview

| Key         | Value                                                                                   |
| ----------- | --------------------------------------------------------------------------------------- |
| Name        | `@nasa/hds-core`                                                                        |
| Foundation  | Sass theme layer on `@uswds/uswds ^3.13.0`                                              |
| Build tools | `sass`, `postcss` (`autoprefixer`, `postcss-discard-comments`, `cssnano`), `svg-sprite` |
| Storybook   | v10, Vite, HTML template literals                                                       |
| Testing     | Vitest 4.x, Playwright (Chromium), Chromatic                                            |

## Quick Start

```bash
npm install          # Install dependencies
npm run build        # Full production build
npm run dev          # Sass watch + Storybook (day-to-day development)
npm test             # Run all Vitest functional and a11y tests
```

| Script                | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `npm run build`       | Full build: assets + Sass + autoprefix + minify      |
| `npm run dev`         | Sass watch + Storybook (day-to-day)                  |
| `npm run watch`       | Sass watch only (also runs inside `dev`)             |
| `npm run init`        | Copy assets + generate sprite without compiling Sass |
| `npm run storybook`   | Start Storybook only (no Sass watch)                 |
| `npm test`            | Run all tests once (CI mode)                         |
| `npm run test:watch`  | Watch mode (development)                             |
| `npm run test:visual` | Visual regression via Chromatic (on demand)          |
| `npm run check:uswds` | Verify USWDS packages haven't changed (runs in CI)   |

`dev` runs Sass watch + Storybook via `concurrently`. Edit `.scss` → Sass recompiles → Storybook hot-reloads.

## File Structure

<!-- prettier-ignore -->
```
hds-core/
├── tokens.json                          ← Source of truth for design tokens (DTCG format)
├── src/
│   ├── scss/
│   │   ├── hds.scss                    ← Primary entry point (all USWDS + HDS)
│   │   ├── hds-uswds.scss              ← Utilities add-on entry point
│   │   ├── hds-dataviz.scss            ← Dataviz entry point
│   │   ├── _hds-tokens.scss            ← Pure Sass variables (no uswds-core dependency)
│   │   ├── _hds-mixins.scss            ← Shared mixins (zero CSS output)
│   │   ├── _hds-uswds-theme.scss       ← USWDS config (utilities suppressed)
│   │   ├── _hds-uswds-theme-utils.scss ← Theme variant for utilities add-on
│   │   ├── _hds-dataviz-palettes.scss  ← Dataviz color scales
│   │   ├── base/                       ← hds-base layer
│   │   └── components/                 ← hds-components layer
│   └── assets/
│       ├── fonts/{inter,dm-mono}/
│       └── img/
│           ├── hds-icons/              ← Themeable SVGs → hds-sprite.svg
│           └── nasa-branding/
├── stories/                            # Storybook documentation (not shipped)
├── scripts/
│   ├── check-uswds.sh                  ← USWDS package hash verification
│   ├── check-uswds-core.sh             ← Verify uswds-core emits no CSS
│   └── uswds-package-hashes.txt        ← Baseline for @uswds/uswds 3.13.0
├── dist/                               # Build output (gitignored)
│   ├── css/                            ← See Build Output below
│   ├── js/
│   │   └── uswds.min.js                ← Copied from @uswds/uswds for convenience
│   └── assets/
│       ├── fonts/                      ← Inter, DM Mono, Public Sans (woff2 only)
│       └── img/
│           ├── hds-icons/
│           ├── hds-sprite.svg          ← Compiled sprite
│           ├── nasa-branding/
│           ├── usa-icons/              ← Copied from USWDS
│           ├── sprite.svg              ← USWDS icon sprite
│           └── us_flag*.{png,svg}      ← USWDS banner assets
├── tools/
│   └── sd-example/                     ← Style Dictionary prototype (not wired into build)
├── postcss.config.mjs
├── svg-sprite.config.json
├── vitest.config.js
├── chromatic.config.json
└── .browserslistrc
```

## Build Output

| Bundle | Contents | Gzipped | Who loads it |
| --- | --- | --- | --- |
| `hds.min.css` | All USWDS components + HDS base + HDS components | 43 KB | Everyone |
| `hds-uswds.min.css` | USWDS utility classes (`.padding-*`, `.margin-*`, etc.) | 48 KB | Sites using USWDS utilities |
| `hds-dataviz.min.css` | Data visualization color palettes | 1.2 KB | Sites rendering charts; standalone-capable |

Vanilla USWDS reference: 73 KB (all components + utilities, no HDS theming).

Intermediate `.css` files are generated during the build and cleaned up automatically. Only `.min.css` and `.min.css.map` files ship. Source maps chain directly to original Sass source.

```html
<!-- All sites -->
<link rel="stylesheet" href="hds.min.css" />
<script src="uswds.min.js" defer></script>

<!-- Also add for sites using USWDS utility classes -->
<link rel="stylesheet" href="hds-uswds.min.css" />
```

Load order does not matter. All styles use CSS cascade layers.

## Sass Architecture

### Entry points and layer structure

All CSS output is organized into named cascade layers declared in every entry point:

```css
@layer uswds, uswds-utils, hds-base, hds-components, hds-dataviz, site;
```

First declaration wins. Subsequent declarations in other bundles are ignored.

| Layer | Source | Contents | Empty if... |
| --- | --- | --- | --- |
| `uswds` | `hds.min.css` | All USWDS component defaults |  |
| `uswds-utils` | `hds-uswds.min.css` | USWDS utility classes | `hds-uswds.min.css` not loaded |
| `hds-base` | `hds.min.css` | Custom properties, element styles, palettes |  |
| `hds-components` | `hds.min.css` | HDS component overrides |  |
| `hds-dataviz` | `hds-dataviz.min.css` | Dataviz palettes | `hds-dataviz.min.css` not loaded |
| `site` | Adopter | Reserved for adopter overrides — always wins |  |

**`hds.scss`** build order:

```
1. _hds-uswds-theme.scss    ← Configure USWDS first (utilities suppressed via
                               $output-these-utilities: ())
2. uswds-core, hds-tokens,  ← Unlayered Sass API — zero CSS output, available
   hds-mixins                  to downstream Sass consumers via @use
3. @layer uswds             ← All USWDS packages via meta.load-css('uswds')
                               Single call = one module graph = fonts emit once
4. @layer hds-base          ← Custom properties, elements, focus, palettes, print
5. @layer hds-components    ← HDS component overrides and custom components
```

**`hds-uswds.scss`** build order:

```
1. _hds-uswds-theme-utils.scss  ← Same config as main theme, utilities unrestricted
2. @layer uswds-utils       ← meta.load-css('uswds-utilities') only
```

USWDS version is pinned and hash-verified. Run `npm run check:uswds` after any USWDS version bump. Run `npm run check:uswds-core` to verify `uswds-core` still emits zero CSS (a regression here would break the token flow above).

### Module singleton rule

`_hds-uswds-theme.scss` must be the first file to `@use "uswds-core" with (...)`. Sass module singletons ensure USWDS is configured once and shared everywhere.

Note that `_hds-tokens.scss` cannot `@use "uswds-core"`; it loads before the theme and would trigger an unconfigured load. It is pure Sass: hex values, maps, and flags only.

### Token flow (future)

This is still notional, and exists only in the prototype `tools/sd-example/` today:

```
tokens.json (Style Dictionary source)
    ↓ build
_hds-tokens.scss (pure Sass variables)
    ↓ @use
_hds-uswds-theme.scss (feeds tokens into USWDS config)
    ↓ @use "uswds-core" with (...)
Everything else (receives configured USWDS)
```

Each component file can have its own `@use` statements for what it needs. Multiple `@use` of the same module doesn't re-emit CSS.

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

HDS focus rings target a 1px dashed Figma spec (`2,3` dasharray) while sidestepping USWDS structural quirks that cause layout shifts. All selectors use `:focus-visible` (keyboard only). A suppression rule in `base/_focus.scss` clears USWDS's `:focus` styles on mouse click so they don't bleed through.

### Three Focus Systems

1. **Hybrid Dashed Ring** — most interactive components (links, buttons, accordion, pagination, in-page nav, breadcrumb, checkbox, radio). Palette-aware via `--hds-palette-focus-*` tokens. Four adaptive treatments (`default`, `bold`, `subtle`, `minimal`) plus one fixed exemption. See DESIGN.md for treatment rationale and Figma deviations.
2. **Solid Blue Element Highlight** — text inputs, textareas, selects. Border thickens to 2px in `--hds-palette-btn-secondary-bg`. Intentionally separate from the dashed system. See `components/_form.scss` and Issue #20.
3. **Surface-inverse Ring** — table cells. Ring color is calculated as the inverse of the cell fill. **Not yet implemented** — currently inherits the global default ring. Tracked as Phase 2 work in DESIGN.md.

### Mixins

All defined in `_hds-mixins.scss` (public Sass surface).

| Mixin                   | Signature                                                                     |
| ----------------------- | ----------------------------------------------------------------------------- |
| `hds-focus-ring`        | `($color: 'default', $shape: 'rect', $pseudo: 'before', $circle-size-px: 24)` |
| `hds-focus-ring-size`   | `($circle-size-px, $pseudo: 'before')`                                        |
| `hds-focus-ring-inline` | `($color: 'default')`                                                         |

`hds-focus-ring` parameters:

- **`$color`** — `'default'`, `'bold'`, `'subtle'`, or `'minimal'`. Resolves to the matching `--hds-palette-focus-*` custom property with a light-scheme fallback for non-palette contexts.
- **`$shape`** — `'rect'` (inherits the host's `border-radius`) or `'circle'`.
- **`$pseudo`** — `'before'` (default) or `'after'`. Default is `'before'` because trailing icons (chevrons, active bars, arrows) conventionally live on `::after`; painting the focus ring on `::before` keeps the global focus rule in `base/_focus.scss` from clobbering those icons. Pass `'after'` only when a host already uses `::before` for something else.
- **`$circle-size-px`** — host size in pixels. Only used when `$shape: 'circle'`. The mask SVG is generated at compile time to match exactly, eliminating `calc()`, percentage, and transform-based rounding bugs.

`hds-focus-ring-size` overrides ring geometry on icon button size modifiers (`--xs`, `--lg`, etc.) without re-declaring the full mixin.

### Application Methods (Dashed Ring)

The mixin you call depends on the host element's layout:

1. **Block elements via SVG mask** — `hds-focus-ring()` on the host. Sets `position: relative`, kills the native outline, paints the ring through an absolute `::before` (or `::after`) pseudo-element with a `mask-image` data-URI SVG. The `2,3` dash pattern is baked into the SVG because native CSS `dashed` produces a different rhythm at 1px. Used by `.usa-button`, icon button circles, accordion headings, pagination links, in-page nav links, primary arrow button.
2. **Inline text via repeating-linear-gradient** — `hds-focus-ring-inline()` on the host. Four `repeating-linear-gradient` layers paint the `2,3` dash spec on bottom, top, left, and right edges of the element's padding box. `background-image` on inline elements fragments naturally per line box — each wrapped line gets its own ring without `box-decoration-break`. The host must have always-on `padding: 0 4px` so left/right edges have space to render; `hds-link-appearance` provides this for links and unstyled buttons, breadcrumbs set it directly. Used by `.usa-link`, `.usa-button--unstyled`, `.usa-breadcrumb__link`.
3. **Form controls via sibling outline** — checkbox and radio labels apply `display: inline-flex`, lock the hidden input with `position: absolute`, then paint a native `outline: 1px dashed var(--hds-palette-focus-minimal)` on the adjacent `<label>`. Pattern lives directly in `components/_form.scss` (no shared mixin).

### Fixed Exemption

`.hds-btn-icon--interactive` uses `hds-focus-ring($shape: 'circle')` like all other icon button roles, but overrides `::before { background-color }` with a hardcoded `$hds-color-carbon-40`. These buttons live over images, video, and 3D content where palette containers don't apply; a fixed mid-contrast ring ensures consistent visibility on dynamic surfaces.

### Tokens and Global Fallback

Semantic tokens (`--hds-palette-focus`, `-bold`, `-subtle`, `-minimal`) are defined in `base/_palettes.scss`. That file also contains the midtone-and-blue palette swap logic that prevents contrast failures (see DESIGN.md "Figma Deviations").

`base/_focus.scss` applies `hds-focus-ring()` with default treatment and rect shape to all natively focusable elements (`button`, `input`, `select`, `textarea`, `[tabindex]`, `[contenteditable]`, `iframe`). Component selectors override this baseline. The baseline is what gives stock USWDS markup an HDS focus ring out of the box — see `stories/guides/USWDSDocumentation.stories.js` for the integration scenario this protects.

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

**CSS loading:** Static `<link>` tags in `preview-head.html` load `hds.min.css` and `hds-uswds.min.css`. Load order does not matter (cascade layers handle specificity). Both are loaded so stories can demonstrate both component and utility class behavior.

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

### Pre-1.0 Verification

- [ ] Spec verification pass across all components against Figma
- [ ] Screen reader testing (NVDA, VoiceOver)

### Post-1.0

- [ ] Framework-specific setup guides (Vite, Next.js, webpack) for Sass load paths
- [ ] Re-evaluate Chromatic a11y tests when independent a11y/visual toggle ships
- [ ] Grid overlay toolbar toggle for verifying component alignment
- [ ] USWDS JS re-initialization: Date picker, time picker, combo box, character count, and file input fall back to native elements in Storybook due to DOMContentLoaded timing. Works correctly in production. See `test-uswds-js.html`.
- [ ] Migrate remaining pending work into GitHub Issues and Discussions

## Contributing

This package is maintained by the NASA HDS team. For conventions on adding new components, formatting code and submitting PRs, please see [CONTRIBUTING.md](CONTRIBUTING.md).
