<!-- Source: ./stories/foundations/Grid.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/foundations-grid--docs -->

# Grid

The basis of NASA.gov is a strong foundation for positioning elements on screen. Designing to the grid helps create seamless, easy-to-follow experiences and visual consistency across different screen sizes.

HDS Core uses the [USWDS layout grid](https://designsystem.digital.gov/utilities/layout-grid/) with 12 columns at all breakpoints. For spacing tokens, see [Spacing](./foundations-spacing.md).

## 12-column grid

Resize your browser to see the grid respond. Uses USWDS `.grid-container`, `.grid-row`, and `.grid-col` classes.

```html
<style>
  .grid-demo [class*='grid-col'] {
    background-clip: content-box;
    background-color: var(--hds-color-nasa-blue, #1c67e3);
    opacity: 0.15;
    min-height: 3rem;
  }
  .grid-demo .demo-alt {
    background-color: var(--hds-color-nasa-red, #f64137);
    opacity: 0.2;
  }
</style>
<div class="grid-demo">
  <div class="grid-container">
    <div class="grid-row grid-gap">
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
      <div class="grid-col"></div>
    </div>
  </div>
</div>
```

## Breakpoints

All breakpoints use 12 columns. Gutters increase at wider breakpoints to create more whitespace between columns.

| Breakpoint   | Range   | Gutter | HDS Figma name  |
| ------------ | ------- | ------ | --------------- |
| `mobile`     | ≥320px  | 4px    | Small (Mobile)  |
| `mobile-lg`  | ≥480px  | 4px    | Small (Mobile)  |
| `tablet`     | ≥640px  | 16px   | Medium (Tablet) |
| `tablet-lg`  | ≥880px  | 16px   | Medium (Tablet) |
| `desktop`    | ≥1024px | 16px   | Large (Desktop) |
| `desktop-lg` | ≥1200px | 16px   | Large (Desktop) |
| `widescreen` | ≥1400px | 24px   | XL (Display)    |

> **Differs from Figma:** The HDS Figma spec defines a TV breakpoint at 1920px. This is deferred in HDS Core because USWDS does not have a built-in TV breakpoint. It will be revisited when TV-scale layouts are needed.

## Layout tokens

Site margins, column gutters, and the content max-width are exposed as `--hds-layout-*` custom properties (generated from `tokens.json`). Breakpoints themselves are Sass-only (they drive media queries, which custom properties cannot), so they are not in this table.

<DesignTokenDocBlock categoryName="Layout" viewType="table" />

## Common layouts

```html
<style>
  .grid-demo [class*='grid-col'] {
    background-clip: content-box;
    background-color: var(--hds-color-nasa-blue, #1c67e3);
    opacity: 0.15;
    min-height: 3rem;
  }
  .grid-demo .demo-alt {
    background-color: var(--hds-color-nasa-red, #f64137);
    opacity: 0.2;
  }
</style>
<div class="grid-demo">
  <div class="grid-container">
    <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">2 + 10 (sidebar + content)</p>
    <div class="grid-row grid-gap">
      <div class="grid-col-2 demo-alt"></div>
      <div class="grid-col-10"></div>
    </div>
  </div>
</div>
```

```html
<style>
  .grid-demo [class*='grid-col'] {
    background-clip: content-box;
    background-color: var(--hds-color-nasa-blue, #1c67e3);
    opacity: 0.15;
    min-height: 3rem;
  }
  .grid-demo .demo-alt {
    background-color: var(--hds-color-nasa-red, #f64137);
    opacity: 0.2;
  }
</style>
<div class="grid-demo">
  <div class="grid-container">
    <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">3 + 3 + 3 + 3 (card grid)</p>
    <div class="grid-row grid-gap">
      <div class="grid-col-3"></div>
      <div class="grid-col-3"></div>
      <div class="grid-col-3"></div>
      <div class="grid-col-3"></div>
    </div>
  </div>
</div>
```

```html
<style>
  .grid-demo [class*='grid-col'] {
    background-clip: content-box;
    background-color: var(--hds-color-nasa-blue, #1c67e3);
    opacity: 0.15;
    min-height: 3rem;
  }
  .grid-demo .demo-alt {
    background-color: var(--hds-color-nasa-red, #f64137);
    opacity: 0.2;
  }
</style>
<div class="grid-demo">
  <div class="grid-container">
    <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">8 + 4 (content + aside)</p>
    <div class="grid-row grid-gap">
      <div class="grid-col-8"></div>
      <div class="grid-col-4 demo-alt"></div>
    </div>
  </div>
</div>
```

```html
<style>
  .grid-demo [class*='grid-col'] {
    background-clip: content-box;
    background-color: var(--hds-color-nasa-blue, #1c67e3);
    opacity: 0.15;
    min-height: 3rem;
  }
  .grid-demo .demo-alt {
    background-color: var(--hds-color-nasa-red, #f64137);
    opacity: 0.2;
  }
</style>
<div class="grid-demo">
  <div class="grid-container">
    <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">Responsive: 1 col → 2 col → 4 col</p>
    <div class="grid-row grid-gap">
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
      <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
    </div>
  </div>
</div>
```

## Using the grid

```html
<!-- Basic 12-column container -->
<div class="grid-container">
  <div class="grid-row grid-gap">
    <div class="grid-col-8">Main content</div>
    <div class="grid-col-4">Sidebar</div>
  </div>
</div>

<!-- Responsive columns -->
<div class="grid-container">
  <div class="grid-row grid-gap">
    <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">Card</div>
    <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3">Card</div>
  </div>
</div>

<!-- Reverse column order on mobile (HDS utility) -->
<div class="grid-container">
  <div class="grid-row grid-gap grid-reverse-mobile">
    <div class="grid-col-8">Appears second on mobile</div>
    <div class="grid-col-4">Appears first on mobile</div>
  </div>
</div>
```

For the full USWDS grid API, see the [USWDS Layout Grid documentation](https://designsystem.digital.gov/utilities/layout-grid/).

## Glossary

**Margin**: The outer whitespace around the grid container. HDS Core uses 16px margins on mobile and 32px on desktop+.

**Gutter**: The space between columns. Gutter widths are fixed values at each breakpoint range. Wider gutters create more whitespace between columns on larger screens.

**Column**: Columns make up the content width of your design. All designs sit within the width of the columns. Columns change width depending on screen size.

**Layout region**: Areas of the layout that contain content. Layout regions can span over any number of columns and resize with the grid.

**Fixed grid**: Has a maximum width (1200px in HDS Core). Designed for content-focused pages where maximum readability matters.

**Fluid grid**: Uses 100% of the screen's width. Designed for complex screens, dashboards, and web applications.

## Grid settings

These USWDS settings control grid behavior in HDS Core:

| Setting | Value | Description |
| --- | --- | --- |
| `$theme-grid-container-max-width` | `"desktop-lg"` | Container max-width (1200px). HDS defers the Proposal's `tv` (1920px). |
| `$theme-site-margins-breakpoint` | `"desktop"` | Where margins switch from mobile to desktop |
| `$theme-site-margins-mobile-width` | `2` (16px) | Site margins below desktop |
| `$theme-site-margins-width` | `4` (32px) | Site margins at desktop+ |
| `$theme-column-gap-mobile` | `"05"` (4px) | Responsive column gutter below desktop |
| `$theme-column-gap-desktop` | `2` (16px) | Responsive column gutter at desktop+ |
| `$theme-column-gap-sm` | `2px` | `.grid-gap-sm` utility size |
| `$theme-column-gap-md` | `2` (16px) | `.grid-gap-md` utility size (USWDS default gap) |
| `$theme-column-gap-lg` | `3` (24px) | `.grid-gap-lg` utility size |
