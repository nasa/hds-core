import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
};

// ============================================================
// Heading Scale
// ============================================================

const headingSpec = (tag, size, weight, weightLabel, lineHeight, letterSpacing) => `
  <tr>
    <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
      <code>&lt;${tag}&gt;</code>
    </td>
    <td style="vertical-align: top; padding-bottom: 1.5rem;">
      <${tag} style="margin: 0; font-family: var(--hds-font-family-heading);">
        National Aeronautics and Space Administration
      </${tag}>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
        Inter ${weightLabel} · ${size} · line-height: ${lineHeight} · letter-spacing: ${letterSpacing}
      </p>
    </td>
  </tr>
`;

export const HeadingScale = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 64em;">
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${headingSpec('h1', '48px (2xl)', 700, 'Bold', '1 (100%)', '-1.5px')}
          ${headingSpec('h2', '36px (xl)', 700, 'Bold', '1.1 (110%)', '-1px')}
          ${headingSpec('h3', '22px (md)', 700, 'Bold', '1.2 (120%)', '-0.5px')}
          ${headingSpec('h4', '18px (sm)', 600, 'SemiBold', '1.3 (130%)', '-0.5px')}
          ${headingSpec('h5', '16px (xs)', 600, 'SemiBold', '1.2 (120%)', '-0.5px')}
          ${headingSpec('h6', '14px (2xs)', 600, 'SemiBold', '1.3 (130%)', '-0.25px')}
        </tbody>
      </table>
    </div>
  `,
};

// ============================================================
// Display Sizes
// ============================================================

export const DisplaySizes = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 64em; overflow-x: auto;" tabindex="0">
      <div style="margin-block-end: 2rem;">
        <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">H1-2xl · Inter Bold · 120px · line-height: 1</p>
        <p style="font-family: var(--hds-font-family-heading); font-size: 120px; font-weight: 700; line-height: 1; letter-spacing: -5.5px; margin: 0;">
          NASA
        </p>
      </div>
      <div>
        <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">H1-xl · Inter Bold · 80px · line-height: 1.1</p>
        <p style="font-family: var(--hds-font-family-heading); font-size: 80px; font-weight: 700; line-height: 1.1; letter-spacing: -3px; margin: 0;">
          NASA
        </p>
      </div>
    </div>
  `,
};

// ============================================================
// Blockquote
// ============================================================

export const Blockquote = {
  tags: ['!dev'],
  render: () => `
    <div style="padding-left: 3rem; max-width: 64em;">
      <blockquote class="hds-blockquote">
        <p>We choose to go to the Moon in this decade and do the other things,
          not because they are easy, but because they are hard.</p>
        <div class="hds-blockquote__attribution">
          <span class="hds-blockquote__name">President John F. Kennedy</span>
        </div>
      </blockquote>
    </div>
  `,
};

// ============================================================
// Labels, Metadata & Captions
// ============================================================

export const SmallText = {
  tags: ['!dev'],
  render: () => `
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
            <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">DM Mono Medium (500) · 12px · uppercase · 3.5px spacing</td>
          </tr>
          <tr>
            <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-metadata</code></td>
            <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-metadata">March 14, 2026 · 5 min read</span></td>
            <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">Inter Bold (700) · 12px · uppercase · 0.25px spacing</td>
          </tr>
          <tr>
            <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-caption</code></td>
            <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-caption">Image credit: NASA/JPL-Caltech</span></td>
            <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">Public Sans Regular (400) · 12px · 0.25px spacing</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};

// ============================================================
// Intro Text
// ============================================================

export const IntroText = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 64em;">
      <p class="usa-intro">
        The Horizon Design System is an adaptable system of building blocks and
        templates that support the best practices of user interface design.
      </p>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        <code>.usa-intro</code> · Public Sans Light · 22px (md) · line-height: 1.35
      </p>
    </div>
  `,
};

// ============================================================
// Body Text
// ============================================================

export const BodyText = {
  tags: ['!dev'],
  render: () => `
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
  `,
};

// ============================================================
// Numbers
// ============================================================

export const Numbers = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 64em;">
      <div style="display: flex; flex-wrap: wrap; gap: 3rem; align-items: baseline; margin-block: 1rem;">
        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-lg · 120px</p>
          <span style="font-family: var(--hds-font-family-code); font-size: 120px; font-weight: 300; line-height: 1; letter-spacing: -3px;">
            12
          </span>
        </div>
        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-md · 48px</p>
          <span style="font-family: var(--hds-font-family-code); font-size: 48px; font-weight: 300; line-height: 1; letter-spacing: 0;">
            12
          </span>
        </div>
        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-sm · 36px</p>
          <span style="font-family: var(--hds-font-family-code); font-size: 36px; font-weight: 300; line-height: 1; letter-spacing: 0;">
            12
          </span>
        </div>
        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-xs · 28px</p>
          <span style="font-family: var(--hds-font-family-code); font-size: 28px; font-weight: 300; line-height: 1.1; letter-spacing: 0;">
            12
          </span>
        </div>
      </div>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        DM Mono Light · line-height: 100% (lg/md/sm), 110% (xs) · letterspacing: -3px (lg), 0 (others)
      </p>
    </div>
  `,
};

// ============================================================
// Code
// ============================================================

export const Code = {
  tags: ['!dev'],
  render: () => `
    <div class="usa-prose" style="max-width: 64em;">
      <pre><code>const mission = 'Artemis';
console.log(\`Next stop: \${mission}\`);</code></pre>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        <code>&lt;code&gt;</code> / <code>&lt;pre&gt;</code> · DM Mono Regular · 14px (2xs) · line-height: 1.35
      </p>
    </div>
  `,
};

// ============================================================
// Font Stack
// ============================================================

export const FontStack = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 64em;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">

        <div>
          <p class="hds-overline" style="margin-block-end: 0.5rem;">Display & Heading Typeface</p>
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
          <p class="hds-overline" style="margin-block-end: 0.5rem;">Numbers & Labels Typeface</p>
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
  `,
};

// ============================================================
// All Variants — combined render for PaletteA11y testing.
// Includes every palette-aware typographic element to catch
// unintended changes outside of built components.
// ============================================================

const allVariantsRender = () => `
  <div class="usa-prose" style="max-width: 64em;">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <p>Body text — Public Sans at 16px. The body typefaces are designed for large fields of text, from cards to articles.</p>

    <p class="usa-intro">Intro text — Public Sans Light at 22px for opening paragraphs.</p>

    <p class="hds-overline">Overline Label</p>
    <p class="hds-metadata">Metadata · March 14, 2026</p>
    <p class="hds-caption">Image credit: NASA/JPL-Caltech</p>

    <div style="padding-left: 3rem;">
      <blockquote class="hds-blockquote">
        <p>We choose to go to the Moon in this decade and do the other things,
          not because they are easy, but because they are hard.</p>
        <div class="hds-blockquote__attribution">
          <span class="hds-blockquote__name">President John F. Kennedy</span>
        </div>
      </blockquote>
    </div>

    <p style="font-family: var(--hds-font-family-code); font-size: 48px; font-weight: 300; line-height: 1;">
      12
    </p>

    <pre><code>const mission = 'Artemis';</code></pre>
  </div>
`;

// --- Palette Accessibility tests (hidden from sidebar) ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(allVariantsRender),
};
