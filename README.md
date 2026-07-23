# @nasa-hds/core

[![Status: Pre-1.0](https://img.shields.io/badge/Status-Pre--1.0-orange.svg)](#) [![Release: v0.8.0](https://img.shields.io/badge/Release-v0.8.0-blue.svg)](https://github.com/nasa/hds-core/releases) [![npm](https://img.shields.io/npm/v/@nasa-hds/core.svg)](https://www.npmjs.com/package/@nasa-hds/core) [![USWDS: 3.13+](https://img.shields.io/badge/USWDS-3.13+-005ea2.svg)](https://github.com/uswds/uswds)

> **Pre-1.0:** API and class names may change between minor versions.

## What is HDS Core?

NASA Horizon Design System (HDS) Core is a CSS design system built as a theme layer on top of the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/). It applies NASA brand typography, color, spacing and component styling as required by NASA's web modernization policy [NID 2800.147](https://nodis3.gsfc.nasa.gov/OPD_Docs/NID_2800_147_.pdf) and [design standards](https://nasa.github.io/hds-core/?path=/docs/overview-design-standards--docs).

HDS Core is intended for standalone NASA websites, applications and platforms approved to operate outside of the agency's flagship content management system (`www.nasa.gov` and `science.nasa.gov`), as well as microapps and embeds within the flagship that aren't styled by the CMS theme.

Before adopting HDS Core, please read our [Getting Started guide](https://nasa.github.io/hds-core/?path=/docs/overview-getting-started--docs) to confirm your project aligns with NASA's web modernization and consolidation strategy. Interagency, non-.gov, and other non-NASA-branded sites should use [USWDS](https://designsystem.digital.gov/) instead.

## Requirements

- Node.js 20+
- npm 10+
- Peer dependency: `@uswds/uswds` 3.13+

**Browser support:** `> 2%, last 2 versions, not dead` (matches USWDS targets; IE not supported)

## Documentation

Full documentation, component examples, and integration guides are published in a Storybook at <https://nasa.github.io/hds-core/>. Key pages include:

- [Getting Started](https://nasa.github.io/hds-core/?path=/docs/overview-getting-started--docs): Figure out whether HDS Core is the right tool for your project
- [Installation](https://nasa.github.io/hds-core/?path=/docs/overview-installation--docs): Technical setup for teams adopting HDS Core
- Guides for [existing USWDS sites](https://nasa.github.io/hds-core/?path=/docs/guides-existing-uswds-site-guidance--docs), [React](https://nasa.github.io/hds-core/?path=/docs/guides-react-guidance--docs), [no-build environments](https://nasa.github.io/hds-core/?path=/docs/guides-no-build-environments--docs) and [Sass configuration](https://nasa.github.io/hds-core/?path=/docs/guides-sass-configuration--docs)

## Installation

```bash
npm install @nasa-hds/core @uswds/uswds
```

`@uswds/uswds` is a peer dependency and must be installed alongside HDS Core.

## What Ships

```
dist/
  css/
    hds.min.css         # Required: all USWDS components + HDS theme
    hds.min.css.map
    hds-uswds.min.css   # Optional: USWDS utility classes (.padding-*, etc.)
    hds-uswds.min.css.map
    hds-dataviz.min.css # Optional: data visualization color palettes
    hds-dataviz.min.css.map
  assets/
    fonts/              # Inter, DM Mono, Public Sans (woff2)
    img/                # USWDS images and HDS icons
  js/
    uswds.js            # USWDS JavaScript (unmodified)
src/
  scss/                 # Public Sass API: tokens, mixins, theme config
```

## Usage

### Required (all sites)

```html
<link rel="stylesheet" href="node_modules/@nasa-hds/core/dist/css/hds.min.css" />
```

### Optional: USWDS utility classes

For sites that rely on USWDS [utility classes](https://designsystem.digital.gov/utilities/) (`.padding-2`, `.margin-top-3`, etc.):

```html
<link rel="stylesheet" href="node_modules/@nasa-hds/core/dist/css/hds-uswds.min.css" />
<link rel="stylesheet" href="node_modules/@nasa-hds/core/dist/css/hds.min.css" />
```

Load order does not matter. All styles use CSS cascade layers.

### Optional: Data visualization

```html
<link rel="stylesheet" href="node_modules/@nasa-hds/core/dist/css/hds-dataviz.min.css" />
```

Can be loaded standalone without `hds.min.css` for embedded chart contexts.

### Sass API

```scss
@use '@nasa-hds/core/scss' as hds;
```

Exposes HDS tokens, mixins, and USWDS core utilities for use in your own Sass pipeline.

## Bundle Sizes (gzipped)

| File                  | Size   | Notes                                     |
| --------------------- | ------ | ----------------------------------------- |
| `hds.min.css`         | 43 KB  | Required; HDS/USWDS styles and components |
| `hds-uswds.min.css`   | 48 KB  | Optional; USWDS utility classes           |
| `hds-dataviz.min.css` | 1.2 KB | Optional; HDS data visualization styles   |

## Contributing to HDS Core

```bash
npm install
npm run dev    # Sass watch + Storybook
npm test       # Unit tests + USWDS version checks
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting changes, the public API contract and the versioning policy.

For architecture details and build pipeline documentation, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).

## License

HDS Core is released into the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), except for bundled fonts (SIL OFL 1.1) and NASA trademarks/insignia. See [LICENSE.md](LICENSE.md) for full terms and attribution.
