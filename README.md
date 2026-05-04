# HDS Core

NASA's Horizon Design System as a distributable code package.

HDS Core (`@nasa/hds-core`) is a CMS-agnostic Sass package that configures [USWDS](https://designsystem.digital.gov/) with NASA's Horizon Design System values. It provides HDS colors, typography, spacing, icons, and component styles as a theme layer on top of USWDS — not a replacement. All USWDS components, utility classes, and patterns continue to work, themed to match HDS. USWDS JavaScript is unmodified — HDS Core is CSS-only.

**Status:** Pre-1.0. API and class names may change between minor versions.

## What's Included

- **CSS/Sass theme** — USWDS configured with HDS colors, typography, spacing, and component styles
- **Design tokens** — `$hds-color-*` Sass variables and `var(--hds-color-*)` CSS custom properties
- **Color palette system** — Six palettes (white, light, midtone, dark, blue, black) with automatic component adaptation
- **SVG icon sprite** — HDS icons compiled into `hds-sprite.svg`
- **Fonts** — Inter, Public Sans, DM Mono
- **Storybook documentation** — Foundations (color, typography, spacing, icons, grid) and component guidance

HDS Core ships two CSS bundles:

| Bundle | Contents | Who needs it |
| --- | --- | --- |
| `hds.css` | HDS theme + selective USWDS foundation + HDS-themed components | **Everyone** |
| `hds-uswds.css` | Remaining USWDS component packages + utilities | Sites using unthemed USWDS components |

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Access to the [HDS Core repository](https://github.com/nasa/hds-core) (request from the HDS team)

### Install

HDS Core will be published to npm as `@nasa/hds-core` for the v1.0 release. Until then, install directly from the GitHub repository:

```bash
npm install git+https://github.com/nasa/hds-core.git @uswds/uswds
```
````

`@uswds/uswds` is a peer dependency and must be installed alongside HDS Core.

## Usage

### New HDS site

Load the primary bundle and USWDS JavaScript:

```html
<link rel="stylesheet" href="path/to/hds-core/dist/css/hds.min.css" />
<script src="path/to/hds-core/dist/js/uswds.min.js" defer></script>
```

This gives you HDS-themed components plus all USWDS foundation styles (typography, grid, layout). If your site uses USWDS components that HDS hasn't themed yet (cards, modals, hero, etc.), add the addon bundle:

```html
<link rel="stylesheet" href="path/to/hds-core/dist/css/hds-uswds.min.css" />
<link rel="stylesheet" href="path/to/hds-core/dist/css/hds.min.css" />
<script src="path/to/hds-core/dist/js/uswds.min.js" defer></script>
```

⚠️ **Load order matters:** `hds-uswds.css` must load **before** `hds.css` so HDS overrides win the cascade.

### Existing USWDS site

If your site already uses USWDS 3.x, adopting HDS Core requires **no markup changes**. Replace your stylesheet, keep your JS:

```html
<!-- Before -->
<link rel="stylesheet" href="/css/uswds.min.css" />
<script src="/js/uswds.min.js" defer></script>

<!-- After -->
<link rel="stylesheet" href="path/to/hds-core/dist/css/hds-uswds.min.css" />
<link rel="stylesheet" href="path/to/hds-core/dist/css/hds.min.css" />
<script src="/js/uswds.min.js" defer></script>
```

Your site renders in the HDS visual identity. See the **Existing USWDS Site** guide in Storybook for what to review after adopting (button intent, dark sections, utility classes).

### Sass (recommended for full control)

Configure your Sass compiler with these load paths:

- `node_modules/@uswds/uswds/packages`
- `node_modules/@nasa/hds-core/src/scss`

```scss
// your-project.scss
@forward '@nasa/hds-core/src/scss/hds';
@forward 'my-project-styles';
```

This gives you full access to HDS Sass variables, USWDS functions (`family()`, `size()`, `units()`, `color()`), and theme configuration. For full setup instructions — USWDS settings, HDS tokens, global element style flags, reserved settings, and common mistakes — see the **Getting Started** guide in Storybook.

**If you have your own PostCSS pipeline:** Consider adding [PurgeCSS](https://purgecss.com/) to strip unused selectors from the HDS bundle. This is especially effective for sites that only use a subset of USWDS components.

## Storybook

Storybook is the primary documentation for HDS Core. It includes:

- **Getting Started** — Integration guide covering Sass setup, pre-compiled CSS, USWDS settings, and HDS tokens
- **Foundations** — Color, color palettes, typography, spacing, icons, grid, data visualization, accessibility
- **Components** — Guidance pages with usage rules, variant demos, and accessibility requirements
- **Guides** — Existing USWDS site adoption, React setup

### Browsing Storybook

Until HDS Core is publicly released, run Storybook locally:

```bash
npm run build         # Build CSS (first time, or after pulling changes)
npm run dev           # Starts Storybook + Sass watch
```

Use the **palette switcher** (paintbrush icon in the toolbar) to test components across all six HDS palettes.

To generate a static Storybook for sharing without a dev server:

```bash
npm run build-storybook               # Outputs to storybook-static/
npx http-server storybook-static      # Serves at localhost:8080
```

## Development

### Local setup

```bash
git clone https://github.com/nasa/hds-core.git
cd hds-core
npm install
npm run build
npm run dev
```

### GitHub Codespaces

HDS Core includes a devcontainer that fully automates the development environment. When you open the repo in a [GitHub Codespace](https://github.com/features/codespaces):

1. Node.js, extensions, and editor settings are configured automatically
2. `npm install`, `npm run build`, and Playwright are set up as part of container creation
3. Storybook starts automatically and opens in your browser

No terminal commands needed — just wait for the build to finish. The first time, VS Code will prompt "This workspace has tasks that run automatically. Allow?" — click **Allow**.

### Build commands

| Command               | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| `npm run dev`         | Sass watch + Storybook — day-to-day development          |
| `npm run build`       | Full production build — assets, Sass, autoprefix, minify |
| `npm run watch`       | Sass watch only (also runs inside `dev`)                 |
| `npm run init`        | Copy assets + sprite without compiling Sass              |
| `npm test`            | Run all tests once (CI)                                  |
| `npm run test:watch`  | Run tests in watch mode                                  |
| `npm run test:visual` | Visual regression tests via Chromatic (on demand)        |
| `npm run check:uswds` | Verify USWDS packages haven't changed (auto on install)  |

### Build output

```
dist/
├── css/
│   ├── hds.css              ← Primary bundle (dev, autoprefixed)
│   ├── hds.min.css          ← Primary bundle (production, minified)
│   ├── hds-uswds.css        ← USWDS addon (dev, autoprefixed)
│   └── hds-uswds.min.css    ← USWDS addon (production, minified)
├── js/
│   └── uswds.min.js         ← USWDS JavaScript (copied from @uswds/uswds)
└── assets/
    ├── fonts/               ← Inter, DM Mono, Public Sans + USWDS extras
    └── img/
        └── hds-sprite.svg   ← HDS icon sprite
```

## Documentation

| Need                 | Location                                 |
| -------------------- | ---------------------------------------- |
| Quick start          | This README                              |
| Integration guide    | Storybook → Getting Started              |
| Existing USWDS sites | Storybook → Guides → Existing USWDS Site |
| Visual reference     | Storybook                                |
| Design decisions     | DESIGN.md                                |
| Architecture         | ARCHITECTURE.md                          |
| Docs conventions     | DOCUMENTATION.md                         |
| 508 conformance      | 508.md                                   |

## Contributing

This package is maintained by the NASA HDS team. To suggest changes or report issues, please [open an issue](https://github.com/nasa/hds-core/issues) in this repository.

For technical architecture, file conventions, and how the codebase is organized, see [ARCHITECTURE.md](ARCHITECTURE.md).

## License

See [LICENSE.md](LICENSE.md).

