# @nasa/hds-core

NASA Horizon Design System (HDS) Core — design tokens, base styles, and USWDS theme configuration for NASA websites.

HDS Core is a lightweight Sass package that sits on top of the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/) and configures it with NASA's Horizon Design System values. It is CMS-agnostic and works with any web project that uses USWDS.

For complete HDS documentation including color palettes, typography scales, spacing guidelines, and component usage, visit the [HDS Core documentation site](https://website.nasa.gov/hds-core/) (internal NASA access only).

## What This Package Provides

- USWDS theme settings pre-configured with HDS values
- HDS design tokens as Sass variables and CSS custom properties
- Base styles for standard HTML elements
- Shared Sass mixins for typography, buttons, and accessibility
- HDS-specific overrides to USWDS component styles
- HDS icon sprite and font assets (Inter, DM Mono)
- 6 color palettes (3 stable, 3 experimental)
- Pre-compiled CSS for projects without a Sass pipeline

## Requirements

- Node.js (LTS version recommended)
- npm 7+ (auto-installs peer dependencies)
- `@uswds/uswds` ^3.3.0

## Installation

### From npm (when published)

```bash
npm install @uswds/uswds @nasa/hds-core
```

### From GitHub

```bash
npm install @uswds/uswds github:nasa/hds-core
```

### Local development

```bash
npm install @uswds/uswds file:../path/to/hds-core
```

## Usage

### Option A: Sass Pipeline (Recommended)

Best for projects with an existing Sass build process. Gives full access to HDS tokens, USWDS functions, and shared mixins.

**1.** Add these Sass load paths to your compiler:

```
node_modules/@uswds/uswds/packages
node_modules/@nasa/hds-core/src/scss
```

**2.** Import HDS Core in your Sass entry point:

```scss
@forward "@nasa/hds-core/src/scss/styles";
```

To add your own styles on top:

```scss
@forward "@nasa/hds-core/src/scss/styles";
@forward "my-project-styles";
```

**3.** Use USWDS functions and HDS tokens in your Sass:

```scss
.my-component {
  background-color: $hds-color-carbon-05;
  border-left: 4px solid $hds-color-carbon-60;
  color: $hds-color-carbon-90;
  font-family: family("heading");
  font-size: size("heading", "md");
  font-weight: font-weight("semibold");
  padding: units(3);
}
```

**Color convention:**
- HDS brand/Carbon colors → `$hds-color-*` variables
- USWDS state colors → `color("error")`, `color("warning")`, etc.
- Typography/spacing → USWDS functions (`family()`, `size()`, `units()`)

### Option B: Pre-compiled CSS

For projects without a Sass build pipeline:

```html
<link rel="stylesheet" href="path/to/styles.css">
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

See the [HDS documentation site](https://website.nasa.gov/hds-core/) for the complete list of available tokens and custom properties.

## Color Palettes

HDS Core includes 6 color palettes. Apply them via class or data attribute:

```html
<section class="hds-palette-dark">
<!-- or -->
<section data-hds-palette="dark">
```

| Palette | Background | Status |
|---------|------------|--------|
| `white` | Spacesuit White (default) | Stable |
| `light` | Carbon 05 | Stable |
| `midtone` | Carbon 20 | Stable |
| `dark` | Carbon 90 | Experimental |
| `blue` | NASA Blue Shade | Experimental |
| `black` | Carbon Black | Experimental |

**To enable experimental palettes,** set the flag before importing HDS Core:

```scss
$hds-enable-experimental-palettes: true;
@forward "@nasa/hds-core/src/scss/styles";
```

## Icon System

HDS icons are provided as an SVG sprite. Use them with the `.hds-btn-icon` component:

```html
<button class="hds-btn-icon hds-btn-icon--cta" aria-label="Go">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use href="path/to/hds-sprite.svg#arrow-line-right"/>
  </svg>
</button>
```

Icon button roles: `--cta`, `--secondary`, `--outline`, `--utility`, `--social`, `--interactive`

See [ARCHITECTURE.md](ARCHITECTURE.md) for complete icon system documentation.

## Relationship to USWDS

HDS Core is an **extension** of USWDS, not a replacement. It:

- Configures USWDS theme tokens with HDS values
- Overrides specific USWDS component styles to match HDS specifications
- Adds HDS-specific base styles, mixins, and design tokens
- Provides the HDS color palette system

USWDS is a required peer dependency. All USWDS documentation, components, utility classes, and patterns continue to work — they render with HDS values.

Refer to the [USWDS documentation](https://designsystem.digital.gov/) for component usage and the [HDS documentation](https://website.nasa.gov/hds-core/) for HDS-specific guidance.

## Development

### Setup

```bash
git clone https://github.com/nasa/hds-core.git
cd hds-core
npm install
```

> **Note:** `@uswds/uswds` is a peer dependency and will be installed automatically by npm 7+.

### One-time initialization

Copies USWDS static assets (fonts, images, JS) to `dist/` and generates the SVG icon sprite:

```bash
npx gulp init
```

### Build

Compiles Sass to CSS, copies HDS assets, and generates the SVG sprite:

```bash
npx gulp build
```

### Watch

Recompiles automatically when Sass files change:

```bash
npx gulp watch
```

### Preview

To preview the visual test page locally:

```bash
npx serve .
```

Then open `http://localhost:3000/test.html` in your browser.

### Clean build

If you encounter stale assets, delete `dist/` and rebuild:

```bash
rm -rf dist/
npx gulp build
```

### Testing in another project

Install HDS Core locally in a test project:

```bash
cd my-test-project
npm install file:../path/to/hds-core
```

## Project Structure

```
hds-core/
├── src/
│   ├── scss/
│   │   ├── styles.scss              # Entry point
│   │   ├── _hds-tokens.scss         # Design tokens (pure Sass)
│   │   ├── _hds-uswds-theme.scss    # USWDS configuration
│   │   ├── _hds-custom-styles.scss  # Foundations
│   │   ├── _hds-components.scss     # Component styles
│   │   └── _hds-palettes.scss       # Palette definitions
│   └── assets/
│       ├── fonts/
│       └── img/hds-icons/
│
└── dist/                            # Generated
    ├── css/styles.css
    ├── js/
    └── assets/
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.

## What's Not Yet Included

The following are planned for future releases:

- JavaScript behaviors (header resize, social share, etc.)
- HDS component patterns (cards, search, archive layouts)
- Dark palette form elements
- Visual regression testing

## Contributing

This package is maintained by the NASA HDS team. To suggest changes or report issues, please open an issue in this repository.

## License

See [LICENSE.md](LICENSE.md).