# HDS Core

**NASA's Horizon Design System as a distributable code package.**

HDS Core (`@nasa/hds-core`) is a CMS-agnostic Sass package that configures [USWDS](https://designsystem.digital.gov/) with NASA's Horizon Design System values. It provides the HDS color palette, typography, spacing, icons, and component styles.

## Installation

```bash
npm install @nasa/hds-core @uswds/uswds
```

> **Note:** `@uswds/uswds` is a peer dependency and must be installed alongside HDS Core.

## Usage

### Option A: Sass (Recommended)

1. Add these Sass load paths to your compiler:

   ```
   node_modules/@uswds/uswds/packages
   node_modules/@nasa/hds-core/src/scss
   ```

2. Import HDS Core in your Sass entry point:

   ```scss
   @forward "@nasa/hds-core/src/scss/styles";
   ```

   To add your own styles:

   ```scss
   @forward "@nasa/hds-core/src/scss/styles";
   @forward "my-project-styles";
   ```

3. Use USWDS functions and HDS tokens:

   ```scss
   .my-component {
     background-color: $hds-color-carbon-05;
     color: $hds-color-carbon-90;
     font-family: family("heading");
     font-size: size("heading", "md");
     padding: units(3);
   }
   ```

### Option B: Pre-compiled CSS

```html
<link rel="stylesheet" href="path/to/hds-core/dist/css/styles.css">
```

Use CSS custom properties:

```css
.my-element {
  color: var(--hds-color-nasa-blue);
  font-weight: var(--hds-font-weight-bold);
}
```

---

## Color Palettes

HDS Core includes 6 color palettes. Apply via data attribute:

```html
<section data-hds-palette="white">...</section>
<section data-hds-palette="light">...</section>
<section data-hds-palette="midtone">...</section>
```

| Palette | Background | Status |
|---------|------------|--------|
| `white` | Spacesuit White | Stable (default) |
| `light` | Carbon 05 | Stable |
| `midtone` | Carbon 20 | Stable |
| `dark` | Carbon 90 | Experimental |
| `blue` | NASA Blue Shade | Experimental |
| `black` | Carbon Black | Experimental |

**To enable experimental palettes:**

```scss
$hds-enable-experimental-palettes: true;
@forward "@nasa/hds-core/src/scss/styles";
```

---

## Icons

HDS icons are provided as an SVG sprite:

```html
<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
</svg>
```

Icon buttons use `.hds-btn-icon` with role modifiers: `--cta`, `--secondary`, `--outline`, `--utility`, `--social`, `--interactive`

See [ARCHITECTURE.md](ARCHITECTURE.md) for complete icon system documentation.

---

## Relationship to USWDS

HDS Core is an **extension** of USWDS, not a replacement. It:

- Configures USWDS theme tokens with HDS values
- Overrides specific USWDS component styles to match HDS specifications
- Adds HDS-specific design tokens, mixins, and components
- Provides the HDS color palette system

USWDS is a required peer dependency. All USWDS components, utility classes, and patterns continue to work — they render with HDS values.

**Documentation:**
- [USWDS documentation](https://designsystem.digital.gov/) — component usage
- [HDS documentation](https://website.nasa.gov/hds-core/) — HDS-specific guidance

---

## Development

### Setup

```bash
git clone https://github.com/nasa/hds-core.git
cd hds-core
npm install
```

### Commands

| Command | Purpose |
|---------|---------|
| `npx gulp init` | One-time setup: copies USWDS assets, generates icon sprite |
| `npx gulp build` | Compiles Sass, copies assets, generates sprite |
| `npx gulp watch` | Recompiles on file changes |
| `npx serve .` | Preview at `http://localhost:3000/test.html` |

### Clean Build

```bash
rm -rf dist/
npx gulp build
```

---

## Project Structure

```
hds-core/
├── src/
│   ├── scss/
│   │   ├── styles.scss           # Entry point
│   │   ├── _hds-tokens.scss      # Design tokens
│   │   ├── _hds-uswds-theme.scss # USWDS configuration
│   │   ├── _hds-custom-styles.scss
│   │   ├── _hds-components.scss
│   │   └── _hds-palettes.scss
│   └── img/
│       ├── hds-icons/            # Themeable icons → sprite
│       ├── hds-buttons/          # Fixed-color button graphics
│       └── nasa-branding/        # NASA logo and brand assets
│
└── dist/                         # Generated output
    ├── css/styles.css
    └── assets/
        ├── fonts/
        └── img/
            ├── hds-sprite.svg
            ├── hds-icons/
            ├── hds-buttons/
            └── nasa-branding/
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed documentation.

---

## What's Not Yet Included

- JavaScript behaviors (header resize, social share, etc.)
- HDS component patterns (cards, search, archive layouts)
- Dark palette form elements
- Visual regression testing

---

## Contributing

This package is maintained by the NASA HDS team. To suggest changes or report issues, please open an issue in this repository.

## License

See [LICENSE.md](LICENSE.md).