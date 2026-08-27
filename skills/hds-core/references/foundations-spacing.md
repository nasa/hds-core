<!-- Source: ./stories/foundations/Spacing.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/foundations-spacing--docs -->

# Spacing

All elements, components, and modules should align to an **8px baseline grid** whenever possible. HDS Core uses USWDS `units()` spacing tokens, which map to multiples of 8px and are exposed to CSS authors as `--hds-spacing-*` custom properties.

For grid layout and breakpoints, see [Grid](./foundations-grid.md).

## Spacing scale

The scale below is generated from `tokens.json`, so it always matches what ships. Whole-number steps are the primary layout scale. Fractional steps (`0-5`, `1-5`, `2-5`) are intermediate values for component-internal spacing only, never for layout. Click on the info icon on any token for its usage guidance.

<DesignTokenDocBlock categoryName="Spacing" viewType="table" />

## Spacing in practice

Vertical rhythm between elements uses consistent spacing tokens:

```html
<div style="max-width: 36em; padding: 1rem;">
  <div style="padding: 1rem;">
    <p class="hds-overline" style="margin: 0;">Featured Mission</p>
    <div style="height: 8px; background: #1C67E3; opacity: 0.2; margin: 0;"></div>
    <h3 style="margin: 0;">Artemis Program</h3>
    <div style="height: 16px; background: #1C67E3; opacity: 0.2; margin: 0;"></div>
    <p style="margin: 0;">NASA's Artemis program aims to land the first woman and first person of color on the Moon.</p>
    <div style="height: 24px; background: #1C67E3; opacity: 0.2; margin: 0;"></div>
    <span style="font-size: 0.8rem;">
      ↑ <code>units(1)</code> 8px — eyebrow to heading<br />
      ↑ <code>units(2)</code> 16px — heading to paragraph<br />
      ↑ <code>units(3)</code> 24px — paragraph to next section
    </span>
  </div>
</div>
```

## Responsive spacing

Component separation increases with screen size:

| Context                 | Mobile / Tablet | Desktop           | Widescreen        |
| ----------------------- | --------------- | ----------------- | ----------------- |
| Element stacking        | `units(2)` 16px | `units(2)` 16px   | `units(2)` 16px   |
| Component separation    | `units(4)` 32px | `units(6)` 48px   | `units(9)` 72px   |
| Layout section division | `units(8)` 64px | `units(15)` 120px | `units(30)` 240px |

## Using spacing in Sass

You can either use the curated HDS Core spacing scale through Sass variables like `$hds-spacing-2` (mirroring the CSS property names above), or the full range of [USWDS spacing units](https://designsystem.digital.gov/design-tokens/spacing-units/) through their `units()` function:

```scss
// USWDS units() function
.my-component {
  padding: units(3); // 24px
  margin-block-end: units(6); // 48px
  gap: units(2); // 16px
}

// HDS Core Sass variables
.my-component {
  padding: $hds-spacing-3; // 24px
  margin-block-end: $hds-spacing-6; // 48px
  gap: $hds-spacing-2; // 16px
}

// Common component patterns
.card {
  padding: units(3); // 24px internal padding
  margin-block-end: units(4); // 32px between cards
}

.section {
  padding-block: units(8); // 64px section padding
}
```

For the full USWDS spacing token reference, see the [USWDS spacing utilities documentation](https://designsystem.digital.gov/design-tokens/spacing-units/).
