# HDS Core

NASA's Horizon Design System as a distributable code package.

HDS Core (`@nasa/hds-core`) is a CMS-agnostic Sass package that configures [USWDS](https://designsystem.digital.gov/) with NASA's Horizon Design System values. It provides HDS colors, typography, spacing, icons, and component styles as a theme layer on top of USWDS — not a replacement.

**Status:** Pre-1.0. API and class names may change between minor versions.

## What's Included

- **CSS/Sass theme** — USWDS configured with HDS colors, typography, spacing, and component styles
- **Design tokens** — `$hds-color-*` Sass variables and `var(--hds-color-*)` CSS custom properties
- **Color palette system** — Six palettes (white, light, midtone, dark, blue, black) with automatic component adaptation
- **SVG icon sprite** — HDS icons compiled into `hds-sprite.svg`
- **Fonts** — Inter, Public Sans, DM Mono
- **Storybook documentation** — Foundations (color, typography, spacing, icons, grid) and component guidance

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Access to the [HDS Core repository](https://github.com/nasa/hds-core) (request from the HDS team)

### As a dependency in your project

HDS Core will be published to npm as `@nasa/hds-core` for the v1.0 release. Until then, install directly from the GitHub repository:

```bash
npm install git+https://github.com/nasa/hds-core.git @uswds/uswds
```

This installs HDS Core to `node_modules/@nasa/hds-core`, so all Sass load paths and import patterns work the same as they will with the eventual npm package.

`@uswds/uswds` is a peer dependency and must be installed alongside HDS Core.

### For local development

To contribute to HDS Core itself:

```bash
git clone https://github.com/nasa/hds-core.git
cd hds-core
npm install
npm run build
npm run dev
```

Storybook opens at `localhost:6006`. Sass changes recompile automatically.

## GitHub Codespaces

HDS Core includes a devcontainer that fully automates the development environment. When you open the repo in a [GitHub Codespace](https://github.com/features/codespaces):

1. Node.js, extensions, and editor settings are configured automatically
2. `npm install`, `npm run build`, and Playwright are set up as part of container creation
3. Storybook starts automatically and opens in your browser

No terminal commands are needed — just wait for the Codespace to finish building. The first time you open it, VS Code will prompt "This workspace has tasks that run automatically. Allow?" — click **Allow**.

A dedicated terminal tab labeled "HDS Core Dev" shows Storybook and Sass build output. The default terminal is free for other commands.

If you encounter issues with a fresh Codespace, please [open an issue](https://github.com/nasa/hds-core/issues).

## Usage

HDS Core supports two integration paths:

- **Sass (recommended)** — Full access to USWDS settings, HDS variables, and USWDS functions. Your custom styles use the same tokens as HDS Core.
- **Pre-compiled CSS** — Drop in a `<link>` tag with no build tooling. Limited to CSS custom properties for customization.

Quick start for Sass:

```scss
// Your entry point
@forward '@nasa/hds-core/src/scss/styles';
@forward 'my-project-styles';
```

Quick start for pre-compiled CSS:

```html
<link rel="stylesheet" href="path/to/hds-core/dist/css/styles.min.css" />
```

For full setup instructions — load paths, project structure, USWDS settings, HDS tokens, and common mistakes — see the **Getting Started** guide in Storybook.

## Storybook

Storybook is the primary documentation for HDS Core. It includes:

- **Getting Started** — Integration guide covering Sass setup, pre-compiled CSS, USWDS settings, and HDS tokens
- **Foundations** — Color, color palettes, typography, spacing, icons, grid, data visualization, accessibility
- **Components** — Guidance pages with usage rules, variant demos, and accessibility requirements
- **Playground** — Interactive stories with palette switching and viewport testing

### Running Storybook locally

```bash
npm run build         # Build CSS (first time only, or after pulling changes)
npm run dev           # Starts Storybook + Sass watch
```

Use the **palette switcher** (paintbrush icon in the toolbar) to test components across all six HDS palettes.

### Static Storybook build

To generate a static Storybook for sharing without a running dev server:

```bash
npm run build-storybook               # Outputs to storybook-static/
npx http-server storybook-static      # Serves at localhost:8080
```

Install `http-server` globally if you don't have it: `npm install -g http-server`.

## Build Reference

### Commands

| Command                   | Purpose                                                      |
| ------------------------- | ------------------------------------------------------------ |
| `npm run dev`             | Sass watch + Storybook — day-to-day development              |
| `npm run build`           | Full production build — assets, Sass, sprite, minify         |
| `npm run storybook`       | Start Storybook only (no Sass watch)                         |
| `npm run build-storybook` | Static Storybook build to `storybook-static/`                |
| `npm run watch`           | Sass watch only (also runs inside `dev`)                     |
| `npm run init`            | Copy assets and generate sprite without compiling Sass       |
| `npm test`                | Run all tests once (CI)                                      |
| `npm run test:watch`      | Run tests in watch mode                                      |
| `npm run test:visual`     | Visual regression tests via Chromatic (on demand)            |
| `npm run format`          | Format source files with Prettier                            |
| `npm run format:check`    | Check formatting without writing changes                     |

`init` is available if you need to refresh USWDS or HDS assets (fonts, images, icons) without a full recompile. For most workflows, `build` is all you need — it handles asset copying, Sass compilation, sprite generation, and CSS minification in one step.

### Clean Build

```bash
rm -rf dist/
npm run build
```

### Build Output

```
dist/
├── css/
│   ├── styles.css              ← Development
│   ├── styles.css.map          ← Sourcemap
│   ├── styles.min.css          ← Production
│   └── styles.min.css.map      ← Sourcemap for minified
└── assets/
    ├── fonts/
    └── img/
        └── hds-sprite.svg
```

## Relationship to USWDS

HDS Core is an extension of USWDS, not a replacement. It:

- Configures USWDS theme tokens with HDS values (including primary/secondary color swap)
- Overrides specific USWDS component styles to match HDS specs
- Adds HDS-specific design tokens, mixins, and components
- Provides the HDS color palette system
- Respects all USWDS global style flags (`$theme-global-content-styles`, etc.)

All USWDS components, utility classes, and patterns continue to work.

## Documentation

| Need              | Location                    |
| ----------------- | --------------------------- |
| Using HDS Core    | This README                 |
| Integration guide | Storybook → Getting Started |
| Visual reference  | Storybook                   |
| Design decisions  | DESIGN.md                   |
| Architecture      | ARCHITECTURE.md             |
| Docs conventions  | DOCUMENTATION.md            |
| 508 conformance   | 508.md                      |

## Contributing

This package is maintained by the NASA HDS team. To suggest changes or report issues, please [open an issue](https://github.com/nasa/hds-core/issues) in this repository.

For technical architecture, file conventions, and how the codebase is organized, see [ARCHITECTURE.md](ARCHITECTURE.md).

## License

See [LICENSE.md](LICENSE.md).
