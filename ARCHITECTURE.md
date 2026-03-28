# HDS Core Architecture

Technical decisions and conventions for contributors.

Last updated: 2026-03-28

## Package Overview

| Key          | Value                                       |
| ------------ | ------------------------------------------- |
| Name         | `@nasa/hds-core`                            |
| Foundation   | CMS-agnostic Sass on `@uswds/uswds ^3.13.0` |
| Build tools  | Gulp + `@uswds/compile`, `gulp-svg-sprite`  |
| Minification | `gulp-clean-css`, `gulp-rename`             |
| Testing      | Vitest 4.x, Playwright (Chromium)           |
| Storybook    | v10, Vite, HTML template literals           |

## File Structure

```

hds-core/ ├── .devcontainer/ # Codespace config ├── .github/ # Issue/discussion templates ├── .vscode/ │ └── tasks.json # Auto-starts npm run dev on folder open ├── .storybook/ │ ├── main.js │ ├── manager.js # Sidebar branding (NASA meatball + HDS Core) │ ├── manager-head.html # Custom font for sidebar branding │ ├── preview.js │ └── preview-head.html │ ├── src/ │ ├── scss/ │ │ ├── styles.scss ← Entry point │ │ ├── \_hds-tokens.scss ← Pure Sass (NO uswds-core) │ │ ├── \_hds-uswds-theme.scss ← USWDS configuration │ │ ├── \_hds-custom-styles.scss ← Mixins, base styles, palettes wiring │ │ ├── \_hds-components.scss ← Component overrides │ │ └── \_hds-palettes.scss ← 6 palette definitions │ └── assets/ │ ├── fonts/{inter,dm-mono}/ │ └── img/ │ ├── hds-icons/ # Themeable SVGs → sprite │ ├── hds-buttons/ # Fixed-color graphics │ └── nasa-branding/ │ ├── stories/ # Storybook (not shipped) │ ├── helpers/ │ │ ├── Note.jsx # Callout component │ │ ├── icons.js # Icon ID arrays │ │ └── paletteTests.js # Palette a11y test helpers │ ├── assets/ # Screenshots (not shipped) │ ├── overview/ │ │ ├── Overview.mdx │ │ ├── Getting Started.mdx │ │ └── Roadmap.mdx │ ├── foundations/ │ │ ├── Accessibility.mdx │ │ ├── Color.mdx │ │ ├── ColorPalettes.mdx │ │ ├── ColorPalettes.stories.js │ │ ├── DataVisualization.mdx │ │ ├── DataVisualizationPalettes.mdx │ │ ├── Grid.mdx │ │ ├── Grid.stories.js │ │ ├── Icons.mdx │ │ ├── Icons.stories.js │ │ ├── Spacing.mdx │ │ ├── Typography.mdx │ │ └── Typography.stories.js │ └── components/ │ ├── {Component}.mdx # Guidance page │ └── {Component}.stories.js # Sidebar variant stories │ ├── dist/ # Build output │ ├── css/ │ │ ├── styles.css │ │ ├── styles.css.map │ │ ├── styles.min.css │ │ └── styles.min.css.map │ └── assets/{fonts,img}/ │ ├── gulpfile.js ├── vitest.config.js ├── test.html # Visual test page (not shipped) ├── .prettierrc ├── .prettierignore └── .browserslistrc

```

## Sass Load Order

USWDS requires `uswds-core` to be configured before anything else loads it. This load order is critical — changing it will break the build.

```

styles.scss → \_hds-uswds-theme.scss @use "hds-tokens" ← Pure Sass, no uswds-core @use "uswds-core" with (...) ← First load, configured → uswds ← Uses configured uswds-core → \_hds-custom-styles.scss → \_hds-components.scss → \_hds-palettes.scss

```

⚠️ `_hds-tokens.scss` cannot `@use "uswds-core"` — this would load it unconfigured.

`_hds-components.scss` accesses shared mixins via `@use "hds-custom-styles" as *` at the top of the file. Sass modules are singletons — this doesn't re-emit CSS.

## File Responsibilities

| File | Purpose |
| --- | --- |
| `_hds-tokens.scss` | Pure Sass variables/maps. No USWDS dependency. Brand colors, type scale, weights, line-heights, letterspacing, border tokens. |
| `_hds-uswds-theme.scss` | Configures USWDS via `@use "uswds-core" with (...)`. Primary/secondary swap, font families, type scale, grid, button settings. |
| `_hds-custom-styles.scss` | CSS custom properties (§1), shared mixins (§2), utilities (§3), base element styles (§4, gated behind USWDS flags), palette wiring (§5), print styles (§6). §2 includes the `hds-utility-circle` mixin (colors only — layout and sizing come from icon button base §12.1) and `hds-link-appearance` mixin. |
| `_hds-components.scss` | USWDS component overrides (`usa-*`) + HDS-only components (`hds-*`). See Component Sections below. |
| `_hds-palettes.scss` | 6 palette definitions with shared scheme mixins. 23+ semantic CSS custom properties per palette. Blue palette uses unique tokens for secondary button contrast (Blue Tint / Blue instead of Blue / Blue Shade). |

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

Palette scheme architecture, utility circle tokens, and per-palette overrides are documented in code comments in `_hds-palettes.scss` and in DESIGN.md § Palette Scheme Architecture.

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

Bare HTML element styles in `_hds-custom-styles.scss` §4 are gated behind USWDS flags:

| Flag | Controls | Default |
| --- | --- | --- |
| `$theme-style-body-element` | `<body>` | `false` |
| `$theme-global-content-styles` | `h1`–`h6`, blockquote, table, lists, code, hr, img, figure, forms, bare `<button>` | `false` |
| `$theme-global-paragraph-styles` | `<p>` (also enabled by content flag) | `false` |
| `$theme-global-link-styles` | `<a>` (also enabled by content flag) | `false` |

Because these flags default to `false`, §4 styles do not emit in the default configuration. Bare elements inside `.usa-prose` receive USWDS styling (via USWDS's internal mixins) but not HDS-specific overrides for line-height, letterspacing, list spacing, link treatment, or table colors. The `.usa-list` and `.usa-table` component overrides (§17, §16) are always active and unaffected by these flags — only bare elements without component classes are impacted.

Focus styles (§4.11), palette wiring (§5), all `usa-*` overrides, and all `hds-*` components are always active regardless of these flags.

## Focus Ring Architecture

Two layers: USWDS theme settings + global palette-aware `:focus-visible` in §4.11. Components with special focus needs override locally. See DESIGN.md § Focus Ring for design rationale.

## Component Sections (`_hds-components.scss`)

| Section | Component | Tier | Subsections |
| --- | --- | --- | --- |
| §1 | Navigation (header, footer, nav) | 1 |  |
| §2 | Banner | 1 |  |
| §3 | Breadcrumb | 1 |  |
| §4 | Buttons (CTA, secondary, outline, unstyled) | 1 | §4.1 Focus, §4.2 CTA, §4.3 Secondary, §4.4 Disabled, §4.5 Outline, §4.6 Inverse, §4.7 Unstyled, §4.8 Blue palette secondary→outline |
| §5 | Forms | 1 |  |
| §6 | In-Page Navigation | 1 |  |
| §7 | Pagination | 1+3 |  |
| §8 | Accordion | 1 |  |
| §9 | Alerts | 1 |  |
| §10 | Grid Utilities | 1 |  |
| §11 | Primary Arrow Button | 3 | §11.1 Base, §11.2 Sizes (6-size scale) |
| §12 | Icon Buttons | 3 | §12.1 Base (24px default), §12.2 Roles (colors only), §12.3 Sizes (8-size scale) |
| §13 | Links | 1+3 |  |
| §14 | Intro Text | 1 |  |
| §15 | Site Alert | 1 |  |
| §16 | Table | 1 | §16.1 Base, §16.2 Sorted column, §16.3 Sort interaction, §16.4 Borderless, §16.5 Dark palette (dark + black only), §16.6 Print |
| §17 | List | 1 | §17.1 Base, §17.2 Unordered, §17.3 Ordered, §17.4 Unstyled |

Each section has detailed code comments covering palette behavior, hover/disabled states, and USWDS override notes. See DESIGN.md for design rationale.

## Icon Architecture

**Themeable icons** (`hds-icons/`): Use `currentColor`, compiled into `hds-sprite.svg`. Color controlled by CSS. 15 icons renamed in v0.6.0 for USWDS naming consistency — see release notes for the full mapping.

**Fixed-color graphics** (`hds-buttons/`): Colors baked in. Not in sprite, referenced as standalone files.

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

`dev` runs two processes via `concurrently`: Gulp watch (Sass → CSS on save) and Storybook. The full development loop: edit `src/scss/*.scss` → Gulp recompiles to `dist/css/styles.css` → Storybook hot-reloads the CSS in the browser.

## Testing

| Script               | Purpose                      |
| -------------------- | ---------------------------- |
| `npm test`           | Run all tests once (CI mode) |
| `npm run test:watch` | Watch mode (development)     |

Vitest runs every exported story in headless Chromium via `@storybook/addon-vitest/vitest-plugin` (story discovery) and Playwright. Each story gets a render check and an axe-core accessibility check (WCAG 2.1 A + AA). Palette-aware components have hidden `PaletteA11y` stories that test contrast across all five non-default palettes, including hover and focus-visible states for interactive components. See `stories/helpers/paletteTests.js` for the helper pattern and DOCUMENTATION.md for story conventions.

**Watch mode ignores non-component files** (`vitest.config.js`): Markdown docs, `package.json`, config files, and raw Sass source (`src/`) do not trigger reruns. Tests rerun when `dist/css/` changes (Gulp output) or when story files change. This keeps the feedback loop fast during documentation and config edits.

**Test results are CLI-only.** The `@storybook/addon-vitest` Storybook UI addon is not used — it requires Vitest to run as a sidecar process connected to Storybook, which adds significant latency to the Storybook UI for all users. Test output lives in the terminal via `npm test` or `npm run test:watch`. The `@storybook/addon-a11y` panel in Storybook still provides per-story accessibility inspection in the browser.

## Storybook

**Version:** Storybook 10 with Vite (ESM-only)

**Stories:** HTML template literals (not React/Twig). JSX used only for docs helpers (`Note.jsx`).

**CSS loading:** Static `<link>` in `preview-head.html`, not a Vite module import. Avoids caching issues when CSS is rebuilt externally by Gulp.

**Addons:**

- `@storybook/addon-docs` — documentation pages + remark-gfm
- `@storybook/addon-a11y` — per-story accessibility checks in UI panel, axe-core checks in Vitest
- `storybook-addon-pseudo-states` — hover/focus/active simulation

**Server flags:** `--no-open` (devcontainer port forwarding handles the browser tab) and `--ci` (skips interactive prompts — auto-selects next port if 6006 is occupied, prevents the process from hanging in unattended environments).

**Codespaces:** Vite file watching requires polling mode. Configured in `main.js`.

For story model, branding, viewport presets, sidebar sort, and all documentation conventions, see DOCUMENTATION.md.

### Codespaces

The devcontainer (`.devcontainer/devcontainer.json`) automates the full setup:

- **`postCreateCommand`**: Runs once when the Codespace is created or rebuilt. Installs npm dependencies, runs a full build, and installs Playwright's Chromium binary and OS dependencies.
- **Auto-start task** (`.vscode/tasks.json`): Runs `npm run dev` every time the Codespace opens, in a dedicated terminal tab labeled "HDS Core Dev." The first time a user opens the Codespace, VS Code will prompt "This workspace has tasks that run automatically. Allow?" — they need to click Allow once.

The intended Codespace experience: open → wait for build → Storybook auto-opens in browser → dedicated terminal shows Gulp + Storybook output → default terminal is free for commands.

### Sections with CSS but no stories yet

| Section | Component                  | Notes                                |
| ------- | -------------------------- | ------------------------------------ |
| §1      | Navigation (header/footer) | Complex — Phase 2                    |
| §2      | Banner                     | Uses USWDS JS for expand/collapse    |
| §6      | In-Page Navigation         | Uses USWDS JS for scroll spy         |
| §9      | Alerts                     | Pure USWDS, not in HDS Figma         |
| §10     | Grid Utilities             | Responsive reverse, horizontal lists |

## Pending Work

Bugs tracked in [GitHub Issues](https://github.com/nasa/hds-core/issues).

### Components

- [ ] Composed Forms review: USWDS `.usa-form-group--error` inserts a left border not present in HDS Figma. Error inline icon (red circle exclamation) present in HDS Figma but absent in USWDS — needs to be added.
- [ ] 4xl type token (120px): custom classes for H1-2xl / Number-lg
- [ ] Wire `$hds-extended-palette` for USWDS utility class generation
- [ ] Extract `_hds-mixins.scss` from `_hds-custom-styles.scss` §2

### Pre-1.0 Verification

- [ ] Spec verification pass across all components against Figma
- [ ] Screen reader testing (NVDA, VoiceOver)
- [ ] test.html: Replace with realistic integration page

### Post-1.0 Infrastructure

- [ ] Framework-specific setup guides (Vite, Next.js, webpack) for Sass load paths (Phase 2)
- [ ] Replace `@uswds/compile` with direct sass + autoprefixer (Phase 2)
- [ ] Gulp 5 migration (clears 11 dev-dependency vulnerabilities from Gulp 4's dependency chain)
- [ ] Triage pending work for Phase 2+ into GitHub Issues and Discussions
