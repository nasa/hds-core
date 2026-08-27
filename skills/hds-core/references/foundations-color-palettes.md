<!-- Source: ./stories/foundations/ColorPalettes.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/foundations-color-palettes--docs -->
# Color Palettes

HDS provides six color palettes that automatically adapt typography, links, buttons, icons, and borders to their background. Wrap any section in a palette class and every HDS component inside it adjusts automatically.

For the full color reference, see [Color](./foundations-color.md).

## How to apply a palette

Use a class or data attribute on any container element:

```html
<section class="hds-palette-dark">
  <!-- Everything inside adapts automatically -->
</section>

<section data-hds-palette="dark">
  <!-- Same result -->
</section>
```

## The six palettes

| Swatch                                                                                                                            | Palette                                  | Class                 | Background                |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------- | ------------------------- |
| <span style={{ display: 'inline-block', width: '1.5em', height: '1em', backgroundColor: '#FFFFFF', border: '1px solid #ccc' }} /> | [White](#white-default)                  | `hds-palette-white`   | Spacesuit White (default) |
| <span style={{ display: 'inline-block', width: '1.5em', height: '1em', backgroundColor: '#F6F6F6', border: '1px solid #ccc' }} /> | [Light](#light)                          | `hds-palette-light`   | Carbon 05                 |
| <span style={{ display: 'inline-block', width: '1.5em', height: '1em', backgroundColor: '#D1D1D1' }} />                           | [Midtone](#midtone)                      | `hds-palette-midtone` | Carbon 20                 |
| <span style={{ display: 'inline-block', width: '1.5em', height: '1em', backgroundColor: '#17171B' }} />                           | [Dark](#dark)                            | `hds-palette-dark`    | Carbon 90                 |
| <span style={{ display: 'inline-block', width: '1.5em', height: '1em', backgroundColor: '#0B3D91' }} />                           | [Blue](#blue)                            | `hds-palette-blue`    | NASA Blue Shade           |
| <span style={{ display: 'inline-block', width: '1.5em', height: '1em', backgroundColor: '#000000' }} />                           | [Black](#black-headers-and-footers-only) | `hds-palette-black`   | Carbon Black              |

### White (default)

The default palette for body content. Use for text-heavy sections, reference pages, and anywhere readability is the primary concern. Most pages are predominantly White.

```html
  <div class="hds-palette-white" style="padding: 2rem;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div>
    <p class="hds-overline">Label text</p>
    <h2 style="margin-top: 0.25rem;">Heading</h2>
    <p style="margin-top: 0.5rem;">
      Paragraph text with a
      <a class="usa-link" href="#">text link</a> and an
      <a class="usa-link usa-link--external" href="https://example.com">external link</a>.
    </p>
    <p class="hds-metadata" style="margin-top: 1rem;">Metadata — Jan 1, 2026</p>
    <p class="hds-caption">Caption text</p>
  </div>
  <div>
    <div style="margin-bottom: 1rem;">
      <a class="hds-btn--primary" href="#">Learn More</a>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
      <a class="usa-button" href="#">Explore</a>
      <button class="usa-button usa-button--outline">Outline</button>
      <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
      </button>
    </div>
  </div>
</div>

  </div>
```

### Light

Provides subtle visual separation from White without a change in text treatment. Use for sections that need gentle differentiation: search bars, form areas, content-dense card grids, or section headers on reference pages.

```html
  <div class="hds-palette-light" style="padding: 2rem;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div>
    <p class="hds-overline">Label text</p>
    <h2 style="margin-top: 0.25rem;">Heading</h2>
    <p style="margin-top: 0.5rem;">
      Paragraph text with a
      <a class="usa-link" href="#">text link</a> and an
      <a class="usa-link usa-link--external" href="https://example.com">external link</a>.
    </p>
    <p class="hds-metadata" style="margin-top: 1rem;">Metadata — Jan 1, 2026</p>
    <p class="hds-caption">Caption text</p>
  </div>
  <div>
    <div style="margin-bottom: 1rem;">
      <a class="hds-btn--primary" href="#">Learn More</a>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
      <a class="usa-button" href="#">Explore</a>
      <button class="usa-button usa-button--outline">Outline</button>
      <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
      </button>
    </div>
  </div>
</div>

  </div>
```

### Midtone

A true middle ground: headings stay dark while muted text and borders shift to accommodate the gray background. Used sparingly for sections that need to stand apart from both light and dark contexts. Midtone is the least common palette across NASA templates.

```html
  <div class="hds-palette-midtone" style="padding: 2rem;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div>
    <p class="hds-overline">Label text</p>
    <h2 style="margin-top: 0.25rem;">Heading</h2>
    <p style="margin-top: 0.5rem;">
      Paragraph text with a
      <a class="usa-link" href="#">text link</a> and an
      <a class="usa-link usa-link--external" href="https://example.com">external link</a>.
    </p>
    <p class="hds-metadata" style="margin-top: 1rem;">Metadata — Jan 1, 2026</p>
    <p class="hds-caption">Caption text</p>
  </div>
  <div>
    <div style="margin-bottom: 1rem;">
      <a class="hds-btn--primary" href="#">Learn More</a>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
      <a class="usa-button" href="#">Explore</a>
      <button class="usa-button usa-button--outline">Outline</button>
      <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
      </button>
    </div>
  </div>
</div>

  </div>
```

### Dark

Serves two roles: as the dominant palette for immersive, media-rich pages, or as accent sections on light pages to create visual rhythm (related articles, featured media, visual callouts). Dark is the most versatile non-White palette.

```html
  <div class="hds-palette-dark" style="padding: 2rem;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div>
    <p class="hds-overline">Label text</p>
    <h2 style="margin-top: 0.25rem;">Heading</h2>
    <p style="margin-top: 0.5rem;">
      Paragraph text with a
      <a class="usa-link" href="#">text link</a> and an
      <a class="usa-link usa-link--external" href="https://example.com">external link</a>.
    </p>
    <p class="hds-metadata" style="margin-top: 1rem;">Metadata — Jan 1, 2026</p>
    <p class="hds-caption">Caption text</p>
  </div>
  <div>
    <div style="margin-bottom: 1rem;">
      <a class="hds-btn--primary" href="#">Learn More</a>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
      <a class="usa-button" href="#">Explore</a>
      <button class="usa-button usa-button--outline">Outline</button>
      <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
      </button>
    </div>
  </div>
</div>

  </div>
```

### Blue

Used with intention for accent sections that need to stand apart from Dark: calls-to-action, visual transitions, or key engagement moments. Blue sections should feel purposeful, not decorative. Not used as a whole-page background.

```html
  <div class="hds-palette-blue" style="padding: 2rem;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div>
    <p class="hds-overline">Label text</p>
    <h2 style="margin-top: 0.25rem;">Heading</h2>
    <p style="margin-top: 0.5rem;">
      Paragraph text with a
      <a class="usa-link" href="#">text link</a> and an
      <a class="usa-link usa-link--external" href="https://example.com">external link</a>.
    </p>
    <p class="hds-metadata" style="margin-top: 1rem;">Metadata — Jan 1, 2026</p>
    <p class="hds-caption">Caption text</p>
  </div>
  <div>
    <div style="margin-bottom: 1rem;">
      <a class="hds-btn--primary" href="#">Learn More</a>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
      <a class="usa-button" href="#">Explore</a>
      <button class="usa-button usa-button--outline">Outline</button>
      <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
      </button>
    </div>
  </div>
</div>

  </div>
```

### Black (headers and footers only)

Reserved for the site header and footer. Do not use Black for content sections within the page body. For dark content areas, use Dark instead.

```html
  <div class="hds-palette-black" style="padding: 2rem;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
  <div>
    <p class="hds-overline">Label text</p>
    <h2 style="margin-top: 0.25rem;">Heading</h2>
    <p style="margin-top: 0.5rem;">
      Paragraph text with a
      <a class="usa-link" href="#">text link</a> and an
      <a class="usa-link usa-link--external" href="https://example.com">external link</a>.
    </p>
    <p class="hds-metadata" style="margin-top: 1rem;">Metadata — Jan 1, 2026</p>
    <p class="hds-caption">Caption text</p>
  </div>
  <div>
    <div style="margin-bottom: 1rem;">
      <a class="hds-btn--primary" href="#">Learn More</a>
    </div>
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
      <a class="usa-button" href="#">Explore</a>
      <button class="usa-button usa-button--outline">Outline</button>
      <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>
      </button>
      <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
      </button>
    </div>
  </div>
</div>

  </div>
```

## Nesting palettes

Palettes can be nested. A child palette overrides its parent for everything inside it. This is useful for creating contrast between adjacent sections:

```html
  <div class="hds-palette-white" style="padding: 2rem;">
    <p class="hds-overline" style="margin-bottom: 1rem;">White (outer)</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
      <div class="hds-palette-light" style="padding: 1.5rem;">
        <p class="hds-overline">Nested: Light</p>
        <h3 style="margin-top: 0.25rem;">Heading</h3>
        <p style="margin-top: 0.5rem;">Paragraph with <a class="usa-link" href="#">link</a>.</p>
        <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next" style="margin-top: 0.75rem;">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
        </button>
      </div>
      <div class="hds-palette-dark" style="padding: 1.5rem;">
        <p class="hds-overline">Nested: Dark</p>
        <h3 style="margin-top: 0.25rem;">Heading</h3>
        <p style="margin-top: 0.5rem;">Paragraph with <a class="usa-link" href="#">link</a>.</p>
        <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next" style="margin-top: 0.75rem;">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
        </button>
      </div>
      <div class="hds-palette-blue" style="padding: 1.5rem;">
        <p class="hds-overline">Nested: Blue</p>
        <h3 style="margin-top: 0.25rem;">Heading</h3>
        <p style="margin-top: 0.5rem;">Paragraph with <a class="usa-link" href="#">link</a>.</p>
        <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next" style="margin-top: 0.75rem;">

<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
        </button>
      </div>
    </div>
  </div>
```

### Component palette support

Most HDS components fully adapt to all six palettes through the `--hds-palette-*` token system. The following exceptions apply:

| Component                                       | Behavior                                                                                                              |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [**Table**](?path=/docs/components-table--docs) | Supports White, Light, Dark, and Black. On Midtone and Blue, falls back to light theme. Full palette support planned. |
| **Site Alert**                                  | Creates its own palette context (emergency = red, info = blue). Ignores parent palette by design.                     |
| **Banner, Header, Footer**                      | Pinned to White. Not themed by HDS yet, so they hold the surface USWDS gives them.                                    |
| **Identifier**                                  | Pinned to Black, matching the background USWDS gives it.                                                              |

A pinned component ignores the palette of the section around it, which is what keeps its text readable on the background it draws for itself. To change one, put the palette class on the component element rather than on a wrapper: `<footer class="usa-footer hds-palette-dark">`.

## Using palette tokens

Inside a palette wrapper, `--hds-palette-*` CSS custom properties automatically resolve to the correct colors for that palette. Every HDS component uses them internally; your custom styles can use these same tokens to adapt to any context instead of relying on hardcoded hex values.

```css
.my-component {
  color: var(--hds-palette-text);
  background: var(--hds-palette-bg);
  border-color: var(--hds-palette-border);
}

.my-heading {
  color: var(--hds-palette-heading);
}

.my-muted-text {
  color: var(--hds-palette-muted);
}

.my-link {
  color: var(--hds-palette-link-text);
  text-decoration-color: var(--hds-palette-link-underline);
}
```

For resolved hex values per palette, see the `color.palette` tier in `tokens.json`.

### Token reference

#### Text and content

| Token                           | Controls                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| `--hds-palette-heading`         | [Heading](./foundations-typography.md#heading-scale) text color                       |
| `--hds-palette-text`            | [Body text](./foundations-typography.md#body-text) color                              |
| `--hds-palette-muted`           | [Labels, captions, metadata](./foundations-typography.md#overlines-metadata-captions) |
| `--hds-palette-bg`              | Section background                                                                                 |
| `--hds-palette-border`          | Default border color                                                                               |
| `--hds-palette-icon`            | Default [icon](./foundations-icons.md) color                                          |
| `--hds-palette-marker`          | [List](./components-list-guidance.md) markers, indicators                             |
| `--hds-palette-blockquote-icon` | [Blockquote](./components-blockquote-guidance.md) decorative icon                     |

#### Links

| Token                          | Controls                                                      |
| ------------------------------ | ------------------------------------------------------------- |
| `--hds-palette-link-text`      | [Link](./components-link-guidance.md) text color |
| `--hds-palette-link-underline` | Link underline color                                          |
| `--hds-palette-link-arrow`     | Link arrow/chevron color                                      |

#### Buttons

| Token                                  | Controls                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------- |
| `--hds-palette-btn-primary-bg`         | [Primary button](./components-button-guidance.md) background   |
| `--hds-palette-btn-primary-bg-hover`   | Primary button hover                                                        |
| `--hds-palette-btn-secondary-bg`       | [Secondary button](./components-button-guidance.md) background |
| `--hds-palette-btn-secondary-bg-hover` | Secondary button hover                                                      |
| `--hds-palette-btn-disabled-bg`        | [Disabled button](./components-button-guidance.md) background  |
| `--hds-palette-btn-disabled-stroke`    | Disabled button border                                                      |
| `--hds-palette-btn-disabled-text`      | Disabled button text                                                        |
| `--hds-palette-btn-filled-text`        | Text on filled buttons                                                      |

#### Form controls

| Token                          | Controls                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `--hds-palette-control-fill`   | [Checkbox/radio](./components-checkbox-guidance.md) fill when checked |
| `--hds-palette-control-text`   | Form control label text                                                            |
| `--hds-palette-control-stroke` | Checkbox/radio border when checked                                                 |
| `--hds-palette-control-border` | Form control border                                                                |
| `--hds-palette-input-bg`       | [Text input](./components-text-input-guidance.md) background          |
| `--hds-palette-disabled`       | Disabled control color                                                             |
| `--hds-palette-disabled-bg`    | Disabled control background                                                        |

#### Error states

| Token                           | Controls                              |
| ------------------------------- | ------------------------------------- |
| `--hds-palette-error-indicator` | Error indicators (field border, icon) |
| `--hds-palette-error-text`      | Error message text                    |

#### Focus indicators

| Token                         | Controls                |
| ----------------------------- | ----------------------- |
| `--hds-palette-focus`         | Default focus ring      |
| `--hds-palette-focus-subtle`  | Subtle focus indicator  |
| `--hds-palette-focus-minimal` | Minimal focus indicator |
| `--hds-palette-focus-bold`    | Bold focus ring         |

#### Utility elements

| Token                                   | Controls                                                                                 |
| --------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--hds-palette-utility-fill`            | [Utility button](./components-icon-button-guidance.md#utility)/element fill |
| `--hds-palette-utility-stroke`          | Utility element border                                                                   |
| `--hds-palette-utility-icon`            | Utility element icon                                                                     |
| `--hds-palette-utility-hover-fill`      | Utility element hover fill                                                               |
| `--hds-palette-utility-hover-stroke`    | Utility element hover border                                                             |
| `--hds-palette-utility-disabled-stroke` | Disabled utility border                                                                  |

#### Social media

| Token                             | Controls                                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `--hds-palette-social-fill`       | [Social media icon](./components-icon-button-guidance.md#social) background |
| `--hds-palette-social-icon`       | Social media icon color                                                                  |
| `--hds-palette-social-hover-fill` | Social media icon hover                                                                  |

For primitive color values, see [Color](./foundations-color.md). For contrast checking, use the [Contrast Checker](./foundations-color-contrast-tool.md).
