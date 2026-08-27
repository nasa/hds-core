<!-- Source: ./stories/foundations/Typography.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/foundations-typography--docs -->
# Typography

Typography helps create clear hierarchies, organize information, provide visual interest, and guide users through the site. HDS uses three open-source font families, each with a specific role.

For spacing between typographic elements, see [Spacing](./foundations-spacing.md).

## Font stack

HDS uses three open-source font families, each with a specific role. All are available through [Google Fonts](https://fonts.google.com).

```html
<div style="max-width: 64em;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">

    <div>
      <p class="hds-overline" style="margin-block-end: 0.5rem;">Display &amp; Heading Typeface</p>
      <p style="font-family: var(--hds-font-family-heading); font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; line-height: 1.1; margin-block: 0.5rem;">
        Inter
      </p>
      <p style="font-family: var(--hds-font-family-heading); font-size: 1rem; line-height: 1.6; margin-block-start: 0.5rem;">
        National Aeronautics and Space Administration
      </p>
      <p style="margin-block-start: 1rem; font-size: 0.875rem;">
        Inter is a variable font family carefully crafted for computer screens.
        Its tall x-height aids readability of mixed-case and lower-case text.
        Used for display type, headings, buttons, and UI elements.
      </p>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
        Sass: <code>family("heading")</code>, <code>family("ui")</code><br>
        Weights: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)
      </p>
    </div>

    <div>
      <p class="hds-overline" style="margin-block-end: 0.5rem;">Body Typeface</p>
      <p style="font-family: var(--hds-font-family-body); font-size: 2rem; font-weight: 700; line-height: 1.1; margin-block: 0.5rem;">
        Public Sans
      </p>
      <p style="font-family: var(--hds-font-family-body); font-size: 1rem; line-height: 1.6; margin-block-start: 0.5rem;">
        National Aeronautics and Space Administration
      </p>
      <p style="margin-block-start: 1rem; font-size: 0.875rem;">
        Public Sans is a strong, neutral typeface for interfaces and text.
        It has more personality than Inter, and its flare makes it a better
        typeface for readability with large bodies of text.
      </p>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
        Sass: <code>family("body")</code><br>
        Weights: Light (300), Regular (400), Bold (700)
      </p>
    </div>

    <div>
      <p class="hds-overline" style="margin-block-end: 0.5rem;">Numbers &amp; Labels Typeface</p>
      <p style="font-family: var(--hds-font-family-code); font-size: 2rem; font-weight: 500; line-height: 1.1; margin-block: 0.5rem;">
        DM Mono
      </p>
      <p style="font-family: var(--hds-font-family-code); font-size: 1rem; line-height: 1.6; margin-block-start: 0.5rem;">
        National Aeronautics and Space Administration
      </p>
      <p style="margin-block-start: 1rem; font-size: 0.875rem;">
        DM Mono is a monospace font, perfect for reading numbers and small
        labels. HDS uses it to give emphasis and create a more technical look
        and feel.
      </p>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
        Sass: <code>family("code")</code>, <code>family("alt")</code><br>
        Weights: Light (300), Regular (400), Medium (500)
      </p>
    </div>

  </div>
</div>
```

> **Differs from USWDS:** USWDS has four font slots. HDS maps Inter to the "serif" slot, so `family("serif")` returns Inter (a sans-serif font). Always use role tokens like `family("heading")` rather than type tokens like `family("serif")` to avoid confusion.

## Heading scale

H1–H3 use Inter Bold; H4–H6 use Inter SemiBold for a lighter hierarchy.

```html
  <div style="max-width: 64em;">
    <table style="width: 100%; border-collapse: collapse;">
      <tbody>

<tr>
  <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
    <code>.hds-h1</code>
  </td>
  <td style="vertical-align: top; padding-bottom: 1.5rem;">
    <h1 class="hds-h1" style="margin: 0;">
      National Aeronautics and Space Administration
    </h1>
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
      Inter · Bold · fluid 32→48px · line-height: 1.0 · letter-spacing: -0.03em
    </p>
  </td>
</tr>

<tr>
  <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
    <code>.hds-h2</code>
  </td>
  <td style="vertical-align: top; padding-bottom: 1.5rem;">
    <h2 class="hds-h2" style="margin: 0;">
      National Aeronautics and Space Administration
    </h2>
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
      Inter · Bold · fluid 28→36px · line-height: 1.06 · letter-spacing: -0.02em
    </p>
  </td>
</tr>

<tr>
  <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
    <code>.hds-h3</code>
  </td>
  <td style="vertical-align: top; padding-bottom: 1.5rem;">
    <h3 class="hds-h3" style="margin: 0;">
      National Aeronautics and Space Administration
    </h3>
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
      Inter · Bold · 22px (md) · line-height: 1.15 · letter-spacing: -0.02em
    </p>
  </td>
</tr>

<tr>
  <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
    <code>.hds-h4</code>
  </td>
  <td style="vertical-align: top; padding-bottom: 1.5rem;">
    <h4 class="hds-h4" style="margin: 0;">
      National Aeronautics and Space Administration
    </h4>
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
      Inter · SemiBold · 18px (sm) · line-height: 1.35 · letter-spacing: -0.02em
    </p>
  </td>
</tr>

<tr>
  <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
    <code>.hds-h5</code>
  </td>
  <td style="vertical-align: top; padding-bottom: 1.5rem;">
    <h5 class="hds-h5" style="margin: 0;">
      National Aeronautics and Space Administration
    </h5>
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
      Inter · SemiBold · 16px (xs) · line-height: 1.25 · letter-spacing: -0.02em
    </p>
  </td>
</tr>

<tr>
  <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
    <code>.hds-h6</code>
  </td>
  <td style="vertical-align: top; padding-bottom: 1.5rem;">
    <h6 class="hds-h6" style="margin: 0;">
      National Aeronautics and Space Administration
    </h6>
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
      Inter · SemiBold · 14px (2xs) · line-height: 1.35 · letter-spacing: -0.01em
    </p>
  </td>
</tr>

      </tbody>
    </table>
  </div>
```

> **Differs from Figma:** H1 and H2 use `fluid-size()` and render at Figma-spec pixel values (32–48px and 28–36px respectively, scaling with viewport). H3–H6 use USWDS `size()` tokens with cap-height normalization; HDS currently uses the same cap-height for all three font families, so rendered sizes match expected values (22/18/16/14px). Per-font cap-height tuning is planned before v1.0.

## Display sizes

Display typefaces are intended for large sizes, giving emphasis to the most important headline on the page.

```html
<div style="max-width: 64em; overflow-x: auto;" tabindex="0">
  <div style="margin-block-end: 2rem;">
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">.hds-display-2xl · Inter Bold · fluid 100→120px · line-height: 1.0 · letter-spacing: -0.05em</p>
    <p class="hds-display-2xl" style="margin: 0;">NASA</p>
  </div>
  <div>
    <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">.hds-display-xl · Inter Bold · fluid 60→80px · line-height: 1.0 · letter-spacing: -0.05em</p>
    <p class="hds-display-xl" style="margin: 0;">NASA</p>
  </div>
</div>
```

## Body text

```html
<div class="usa-prose" style="max-width: 64em;">
  <p>
    The body typefaces are designed for large fields of text. These fields of text
    can be found on something small, like a card, or large areas, like an article.
    Public Sans provides excellent readability at body sizes with a neutral,
    professional tone.
  </p>
  <p style="font-size: 0.75rem; opacity: 0.7;">
    <code>&lt;p&gt;</code> · Public Sans Regular · 16px (xs) · line-height: 1.62 (≈160%)
  </p>
</div>
```

## Intro / lead text

Use `.usa-intro` for the opening paragraph of a page or section. See the [Intro Text](./components-intro-text-guidance.md) component for full usage guidance.

```html
<div style="max-width: 64em;">
  <p class="usa-intro">
    The Horizon Design System is an adaptable system of building blocks and
    templates that support the best practices of user interface design.
  </p>
  <p style="font-size: 0.75rem; opacity: 0.7;">
    <code>.usa-intro</code> · Public Sans Regular · 18px (sm) · line-height: 1.5
  </p>
</div>
```

## Overlines, metadata & captions

Three visually similar but typographically distinct treatments for small supportive text:

```html
<div style="max-width: 64em;">
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr>
        <th style="text-align: left; padding-bottom: 0.75rem;">Class</th>
        <th style="text-align: left; padding-bottom: 0.75rem;">Rendered</th>
        <th style="text-align: left; padding-bottom: 0.75rem;">Font</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-overline</code></td>
        <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-overline">Featured Mission</span></td>
        <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">DM Mono Medium (500) · 12px · uppercase · 0.3em spacing</td>
      </tr>
      <tr>
        <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-metadata</code></td>
        <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-metadata">March 14, 2026 · 5 min read</span></td>
        <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">Inter Bold (700) · 12px · uppercase · 0.025em spacing</td>
      </tr>
      <tr>
        <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-caption</code></td>
        <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-caption">Image credit: NASA/JPL-Caltech</span></td>
        <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">Public Sans Regular (400) · 12px · 0.025em spacing</td>
      </tr>
    </tbody>
  </table>
</div>
```

> **Differs from Figma:** HDS Figma calls all three of these styles "Labels", but that term conflicts with HTML `&lt;label&gt;` elements and USWDS `.usa-label` form labels. HDS Core uses distinct class names to avoid confusion: `.hds-overline`: called "Label" in HDS Figma and "Label (div)" in the HDS Core Proposal. `.hds-metadata`: derived from usage patterns (dates, counts, categories) with size standardized to 12px. `.hds-caption`: called "Figcaption" in the HDS Core Proposal.

## Blockquote

Blockquotes use Inter Light at heading scale for a conversational look, with a decorative quote icon and optional attribution. See the [Blockquote](./components-blockquote-guidance.md) component for full usage guidance.

```html
<div style="padding-left: 3rem; max-width: 64em;">
  <blockquote class="hds-blockquote">
    <p>We choose to go to the Moon in this decade and do the other things,
      not because they are easy, but because they are hard.</p>
    <div class="hds-blockquote__attribution">
      <span class="hds-blockquote__name">President John F. Kennedy</span>
    </div>
  </blockquote>
</div>
```

> **Differs from USWDS:** USWDS does not include a blockquote component. Bare `&lt;blockquote&gt;` elements receive this treatment automatically inside `.usa-prose` or when `$theme-global-content-styles` is `true`. Outside those contexts, use the `.hds-blockquote` class shown here.

## Numbers

The numbers typeface brings a technical feel to the system, from countdowns to statistical displays.

```html
<div style="max-width: 64em;">
  <div style="display: flex; flex-wrap: wrap; gap: 3rem; align-items: baseline; margin-block: 1rem;">
    <div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">.hds-stat-lg · fluid 80→180px</p>
      <span class="hds-stat-lg">12</span>
    </div>
    <div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">.hds-stat-md · fluid 32→48px</p>
      <span class="hds-stat-md">12</span>
    </div>
    <div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">.hds-stat-sm · fluid 28→36px</p>
      <span class="hds-stat-sm">12</span>
    </div>
    <div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">.hds-stat-xs · fluid 22→28px</p>
      <span class="hds-stat-xs">12</span>
    </div>
  </div>
  <p style="font-size: 0.75rem; opacity: 0.7;">
    DM Mono Light (300) · line-height: 1.0 (lg/md/sm), 1.15 (xs) · letter-spacing: -0.05em (lg), 0 (others)      </p>
</div>
```

## Code

```html
    <div class="usa-prose" style="max-width: 64em;">
      <pre><code>const mission = 'Artemis';
console.log(`Next stop: ${mission}`);</code></pre>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        <code>&lt;code&gt;</code> / <code>&lt;pre&gt;</code> · DM Mono Regular · 12px (3xs) · letter-spacing 0.1em · palette-aware blue
      </p>
    </div>
```

## Using typography in Sass

```scss
// Role-based font families
.my-heading {
  font-family: family('heading'); // Inter
}

.my-body {
  font-family: family('body'); // Public Sans
}

.my-label {
  font-family: family('code'); // DM Mono
}

// Size tokens
.my-element {
  font-size: size('heading', 'md'); // 22px
  font-size: size('body', 'xs'); // 16px
}
```

For the full USWDS typography token reference, see the [USWDS typography utilities documentation](https://designsystem.digital.gov/design-tokens/typesetting/overview/).
