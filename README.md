```markdown
# HDS Core

NASA's Horizon Design System as a distributable code package.

**HDS Core** (`@nasa/hds-core`) is a CMS-agnostic Sass package that configures USWDS with NASA's Horizon Design System values. It provides HDS colors, typography, spacing, icons, and component styles.

---

## Installation

```bash
npm install @nasa/hds-core @uswds/uswds
```

> `@uswds/uswds` is a peer dependency and must be installed alongside HDS Core.

---

## Usage

### Option A: Sass (Recommended)

Add these Sass load paths to your compiler:

```
node_modules/@uswds/uswds/packages
node_modules/@nasa/hds-core/src/scss
```

Import HDS Core in your Sass entry point:

```scss
@forward "@nasa/hds-core/src/scss/styles";
```

To add your own styles:

```scss
@forward "@nasa/hds-core/src/scss/styles";
@forward "my-project-styles";
```

Use USWDS functions and HDS tokens:

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

Apply via class or data attribute:

```html
<section class="hds-palette-light">...</section>
<section data-hds-palette="dark">...</section>
```

| Palette | Background |
|---------|------------|
| `white` | Spacesuit White (default) |
| `light` | Carbon 05 |
| `midtone` | Carbon 20 |
| `dark` | Carbon 90 |
| `blue` | NASA Blue Shade |
| `black` | Carbon Black (headers/footers only) |

---

## Link Styling

HDS Core does not style base `<a>` tags. Choose your approach:

| Method | Scope | How |
|--------|-------|-----|
| Explicit class | Per-link | `<a class="usa-link" href="#">Link</a>` |
| Prose container | Per-section | `<div class="usa-prose">` wraps body content |
| Global setting | Site-wide | `$theme-global-link-styles: true` in your theme |

---

## Icons

HDS icons are provided as an SVG sprite:

```html
<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
</svg>
```

Icon buttons use `.hds-btn-icon` with role modifiers: `--cta`, `--secondary`, `--outline`, `--utility`, `--social`, `--interactive`

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
| `npx gulp build` | Compile Sass, copy assets, generate sprite |
| `npx gulp watch` | Recompile on file changes |
| `npm run storybook` | Start Storybook at localhost:6006 |

### Clean Build

```bash
rm -rf dist/
npx gulp build
```

### Storybook

Test components with HDS styling:

```bash
npx gulp build
npm run storybook
```

Use the palette switcher (paintbrush icon) in the toolbar to test across all palettes.

---

## Relationship to USWDS

HDS Core is an extension of USWDS, not a replacement. It:

- Configures USWDS theme tokens with HDS values
- Overrides specific USWDS component styles to match HDS specs
- Adds HDS-specific design tokens, mixins, and components
- Provides the HDS color palette system

All USWDS components, utility classes, and patterns continue to work.

---

## Documentation

| Audience | Location |
|----------|----------|
| **Using HDS Core** | This README |
| **Contributing** | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| **Design decisions** | [DESIGN.md](./DESIGN.md) |
| **Designers** | [website.nasa.gov/hds-core](https://website.nasa.gov/hds-core/) |

---

## Contributing

This package is maintained by the NASA HDS team. To suggest changes or report issues, please open an issue in this repository.

---

## License

See [LICENSE.md](./LICENSE.md).
```