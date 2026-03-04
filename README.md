# @nasa/hds-core

**NASA Horizon Design System (HDS) Core** — design tokens, base styles, and USWDS theme configuration for NASA websites.

HDS Core is a lightweight Sass package that sits on top of the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/) and configures it with NASA's Horizon Design System values. It is meant to be CMS-agnostic and work with any web project that uses USWDS.

For complete HDS documentation including color palettes, typography scales, spacing guidelines, grid specifications, and component usage, visit the [HDS Core documentation site](https://website.nasa.gov/hds-core) (internal NASA access only).

---

## What This Package Provides

- USWDS theme settings pre-configured with HDS values
- HDS design tokens as Sass maps and CSS custom properties
- HDS extended color palette registered with USWDS's utility system
- Base styles for standard HTML elements
- Shared Sass mixins for typography, buttons, and accessibility
- HDS-specific overrides to USWDS component styles
- HDS icon and font assets (Inter, DM Mono)
- Pre-compiled CSS for projects without a Sass pipeline

---

## Requirements

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm
- [@uswds/uswds](https://www.npmjs.com/package/@uswds/uswds) ^3.3.0

---

## Installation

### From npm (when published)

```bash
npm install @uswds/uswds @nasa/hds-core
```

### From GitHub

```bash
npm install @uswds/uswds
npm install github:nasa/hds-core
```

### Local development

```bash
npm install @uswds/uswds
npm install file:../path/to/hds-core
```

---

## Usage

### Option A: Sass Pipeline (Recommended)

Best for projects with an existing Sass build process. Gives full access to HDS tokens, USWDS functions, and shared mixins.

**1. Add these Sass load paths to your compiler:**

```
node_modules/@uswds/uswds/packages
node_modules/@nasa/hds-core/src/scss
```

<details>
<summary>Gulp example</summary>

```js
.pipe(
  sass({
    includePaths: [
      "./node_modules/@uswds/uswds/packages",
      "./node_modules/@nasa/hds-core/src/scss",
    ],
  })
)
```

</details>

<details>
<summary>Webpack example</summary>

```js
{
  loader: "sass-loader",
  options: {
    sassOptions: {
      includePaths: [
        "./node_modules/@uswds/uswds/packages",
        "./node_modules/@nasa/hds-core/src/scss",
      ],
    },
  },
}
```

</details>

<details>
<summary>Vite example</summary>

```js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          "./node_modules/@uswds/uswds/packages",
          "./node_modules/@nasa/hds-core/src/scss",
        ],
      },
    },
  },
};
```

</details>

**2. Import HDS Core in your Sass entry point:**

```scss
@forward "@nasa/hds-core/src/scss/styles";
```

To add your own styles on top:

```scss
@forward "@nasa/hds-core/src/scss/styles";
@forward "my-project-styles";
```

**3. Use USWDS functions with HDS values in your Sass:**

```scss
.my-component {
  background-color: color("base-lighter");
  border-left: 4px solid color("base-mid-darker");
  color: color("base-darker");
  font-family: family("heading");
  font-size: size("heading", "md");
  font-weight: font-weight("semibold");
  padding: units(3);
}
```

All standard USWDS functions (`color()`, `size()`, `family()`, `font-weight()`, `units()`), mixins (`@include at-media()`, `@include u-bg()`), and utility classes (`.bg-primary`, `.text-base-darker`, `.padding-3`) work normally and resolve to HDS values.

### Option B: Pre-compiled CSS

For projects without a Sass build pipeline:

```html
<link rel="stylesheet" href="node_modules/@uswds/uswds/dist/css/uswds.min.css">
<link rel="stylesheet" href="node_modules/@nasa/hds-core/dist/css/hds-core.css">
<script src="node_modules/@uswds/uswds/dist/js/uswds.min.js"></script>
```

HDS tokens are available as CSS custom properties:

```css
.my-element {
  color: var(--hds-color-nasa-blue);
  font-weight: var(--hds-font-weight-bold);
  line-height: var(--hds-line-height-body);
  border-radius: var(--hds-border-radius-button);
}
```

See the [HDS documentation site](https://TODO-ADD-URL-HERE) for the complete list of available tokens and custom properties.

---

## Relationship to USWDS

HDS Core is an extension of USWDS, not a replacement. It:

1. **Configures** USWDS theme tokens with HDS values
2. **Extends** USWDS with additional color tokens via `$global-color-palettes`
3. **Overrides** specific USWDS component styles to match HDS specifications
4. **Adds** HDS-specific base styles, mixins, and design tokens

USWDS is a required peer dependency. All USWDS documentation, components, utility classes, and patterns continue to work — they just render with HDS values. Refer to the [USWDS documentation](https://designsystem.digital.gov/) for component usage and the [HDS documentation](https://TODO-ADD-URL-HERE) for HDS-specific guidance.

---

## Project Structure

```
hds-core/
├── package.json
├── gulpfile.js
├── .browserslistrc
├── .gitignore
├── README.md
│
├── src/
│   ├── scss/
│   │   ├── styles.scss                          # Main Sass entry point
│   │   ├── _hds-tokens.scss                     # HDS design tokens
│   │   ├── _hds-uswds-theme.scss                # USWDS theme configuration
│   │   ├── _hds-uswds-theme-custom-styles.scss  # USWDS component overrides
│   │   ├── _hds-mixins.scss                     # Shared Sass mixins
│   │   └── _hds-base.scss                       # Base HTML element styles
│   │
│   └── assets/
│       ├── fonts/
│       │   ├── inter/                           # Inter font files
│       │   └── dm-mono/                         # DM Mono font files
│       └── img/
│           ├── hds-icons/                       # HDS SVG icons
│           └── nasa-logo.svg
│
└── dist/                                        # Generated by build
    ├── css/
    │   └── hds-core.css
    └── assets/
        ├── fonts/
        └── img/
```

---

## Development

### Setup

```bash
git clone https://github.com/nasa/hds-core.git
cd hds-core
npm install
npm install @uswds/uswds
```

### One-time initialization

Copies USWDS static assets (fonts, icons, JS) to `dist/`:

```bash
npx gulp init
```

### Build

Compiles Sass to CSS and copies HDS assets to `dist/`:

```bash
npx gulp build
```

### Watch

Recompiles automatically when Sass files change:

```bash
npx gulp watch
```

### Testing in another project

Install HDS Core locally in a test project:

```bash
cd my-test-project
npm install file:../path/to/hds-core
```

---

## What's Not Yet Included

The following are planned for future releases:

- JavaScript behaviors (header resize, social share, etc.)
- HDS component patterns (cards, search, archive layouts)
- HDS color scheme palettes (light, midtone, dark variants)

---

## Contributing

This package is maintained by the NASA HDS team. To suggest changes or report issues, please open an issue in this repository.

---

## License

TBD — pending NASA open source review.
