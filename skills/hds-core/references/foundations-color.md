<!-- Source: ./stories/foundations/Color.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/foundations-color--docs -->
# Color

Color is used in restrained and purposeful ways throughout HDS. With content at the forefront, color gives attention and hierarchy without distraction.

**Red means "go somewhere." Blue means "do something here."** This wayfinding rule applies consistently across all HDS components. NASA Red is for actions that navigate to a new page. NASA Blue is for on-page interactions.

This page covers UI colors. For chart and data visualization colors, see [Data Visualization Palettes](./foundations-data-visualization-palettes.md).

The swatches below are generated from `tokens.json`. Click the info icon on any swatch for its usage guidance. For the full color reference in one place, see the [Design Tokens](?path=/docs/foundations-design-tokens--docs#colors) page.

## Brand colors

The primary brand colors carry the NASA visual identity across all HDS components.

<DesignTokenDocBlock categoryName="Colors" viewType="card" showSearch={false} filterNames={['--hds-color-nasa-red', '--hds-color-nasa-blue', '--hds-color-carbon-black', '--hds-color-spacesuit-white']} />

> **Differs from USWDS:** HDS Core swaps the USWDS primary and secondary color families. In standard USWDS, primary is blue and secondary is red. In HDS Core, `color("primary")` returns NASA Red and `color("secondary")` returns NASA Blue. This means `.usa-button` automatically renders NASA Red and `.usa-button--secondary` renders NASA Blue, matching the HDS wayfinding rule with no extra classes needed.

### Tints & shades

Tints and shades of the primary brand colors provide accessible alternatives for hover states, dark backgrounds, and emphasis.

<DesignTokenDocBlock categoryName="Colors" viewType="card" showSearch={false} filterNames={['--hds-color-nasa-red-tint', '--hds-color-nasa-red-shade', '--hds-color-nasa-blue-tint', '--hds-color-nasa-blue-shade']} />

## Neutrals: Carbon scale

The Carbon scale provides appropriate levels of contrast for text, borders, and subtle backgrounds.

<DesignTokenDocBlock categoryName="Colors" viewType="card" showSearch={false} filterNames={['--hds-color-carbon-90', '--hds-color-carbon-80', '--hds-color-carbon-70', '--hds-color-carbon-60', '--hds-color-carbon-50', '--hds-color-carbon-40', '--hds-color-carbon-30', '--hds-color-carbon-20', '--hds-color-carbon-10', '--hds-color-carbon-05']} />

All neutrals use the token pattern `$hds-color-carbon-{step}` (Sass) or `var(--hds-color-carbon-{step})` (CSS).

## Additional colors

International Orange and Active Green are used sparingly and intentionally.

<DesignTokenDocBlock categoryName="Colors" viewType="card" showSearch={false} filterNames={['--hds-color-international-orange', '--hds-color-active-green']} />

## Accessibility

HDS colors meet **WCAG AA** contrast standards. Body text and headings target **AAA**.

Key text pairings for AAA contrast:

- **Carbon 60** (`#58585B`, 7.09:1 AAA on White): body text on white/light backgrounds
- **Carbon 40** (`#959599`, 7.03:1 AAA on Black): body text on dark/black backgrounds

> **How this works:** NASA Red (`#F64137`) passes **AA Large** (3.66:1) on light backgrounds. Valid for text at 18 pt and above, or 14 pt bold and above, and non-text UI elements. For small body text on light backgrounds, use NASA Red Shade (`#B60109`, 7.00:1 AAA).

For verified contrast ratios, see the [Color Contrast Tool](./foundations-color-contrast-tool.md). For general accessibility guidance, see [Accessibility](./foundations-accessibility.md).

## Using colors in code

HDS Core provides three ways to reference colors:

| Method                    | Syntax                       | Values                                | When to use                                     |
| ------------------------- | ---------------------------- | ------------------------------------- | ----------------------------------------------- |
| **HDS Sass variables**    | `$hds-color-carbon-90`       | Exact HDS hex                         | Custom Sass. Recommended.                       |
| **CSS custom properties** | `var(--hds-color-carbon-90)` | Exact HDS hex                         | Plain CSS / JS. Recommended.                    |
| **USWDS theme tokens**    | `color("base-darker")`       | USWDS system values (differ from HDS) | Inside USWDS mixins only. Not exact HDS values. |

> **How this works:** USWDS theme tokens map to USWDS system colors, which are different values than HDS tokens. For example, `color("base-darker")` returns `#1b1b1b`; `$hds-color-carbon-90` is `#17171B`. Always use HDS variables or custom properties when exact HDS values are required.

### Sass

```scss
.my-component {
  background-color: $hds-color-carbon-05;
  color: $hds-color-carbon-90;
  border: 1px solid $hds-color-carbon-20;
}
```

### CSS

```css
.my-element {
  color: var(--hds-color-carbon-90);
  background: var(--hds-color-carbon-05);
  border-color: var(--hds-color-nasa-blue);
}
```

### Design tokens

HDS ships color values in a DTCG-compliant `tokens.json` file for teams using Style Dictionary or other token tooling. Token paths use unprefixed groups. Add `prefix: 'hds'` in your build config to match HDS output.

```js
// Style Dictionary config example
{
  prefix: 'hds';
}
```

See the project README for full token consumption setup.

### Palette-aware custom properties

HDS provides six palettes that automatically adapt all component colors to their background context. Inside a palette wrapper, use `--hds-palette-*` tokens to respond to the active palette. See [Color Palettes](./foundations-color-palettes.md) for usage, available tokens, and examples.

### Full color reference

Every `--hds-color-*` property is output to `:root` and available globally. See the complete, searchable list with live values on the [Design Tokens](?path=/docs/foundations-design-tokens--docs#colors) page.

For chart and data visualization colors, see [Data Visualization Palettes](./foundations-data-visualization-palettes.md).
