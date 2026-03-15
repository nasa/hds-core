export default {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
};

// ============================================================
// Story 1: Font Stack
// ============================================================

export const FontStack = {
  name: 'Font Stack',
  render: () => `
    <div style="max-width: 64em;">

      <h1>HDS Font Stack</h1>
      <p class="usa-intro">
        The Horizon Design System utilizes a combination of three font families
        to create purposeful texture. This stack was designed to help guide users
        to read and understand the hierarchy of information.
      </p>

      <hr />

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-block: 2rem;">

        <!-- Inter -->
        <div>
          <p class="hds-eyebrow" style="margin-block-end: 0.5rem;">Display &amp; Heading Typeface</p>
          <p style="font-family: var(--hds-font-family-heading, Inter, sans-serif); font-size: 2rem; font-weight: 700; letter-spacing: -0.5px; line-height: 1.1; margin-block: 0.5rem;">
            Inter
          </p>
          <p style="font-family: var(--hds-font-family-heading, Inter, sans-serif); font-size: 1rem; line-height: 1.6; margin-block-start: 0.5rem;">
            The National Aeronautics and Space Administration
          </p>
          <p style="margin-block-start: 1rem; font-size: 0.875rem;">
            Inter is a variable font family carefully crafted for computer screens.
            It features a tall x-height to aid in readability of mixed-case and
            lower-case text. Used for display type, headings, buttons, and UI elements.
          </p>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
            Role: <code>family("heading")</code>, <code>family("ui")</code><br>
            Weights: Light (300), Regular (400), Medium (500), SemiBold (600), Bold (700)<br>
            Stack: Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif
          </p>
        </div>

        <!-- Public Sans -->
        <div>
          <p class="hds-eyebrow" style="margin-block-end: 0.5rem;">Body Typeface</p>
          <p style="font-family: var(--hds-font-family-body, 'Public Sans', sans-serif); font-size: 2rem; font-weight: 700; line-height: 1.1; margin-block: 0.5rem;">
            Public Sans
          </p>
          <p style="font-family: var(--hds-font-family-body, 'Public Sans', sans-serif); font-size: 1rem; line-height: 1.6; margin-block-start: 0.5rem;">
            The National Aeronautics and Space Administration
          </p>
          <p style="margin-block-start: 1rem; font-size: 0.875rem;">
            Public Sans is a strong, neutral typeface for interfaces and text.
            It has more personality than Inter, and its flare makes it a better
            typeface for readability with large bodies of text.
          </p>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
            Role: <code>family("body")</code><br>
            Weights: Light (300), Regular (400), Bold (700)<br>
            Stack: 'Public Sans', Helvetica, Arial, sans-serif
          </p>
        </div>

        <!-- DM Mono -->
        <div>
          <p class="hds-eyebrow" style="margin-block-end: 0.5rem;">Numbers &amp; Labels Typeface</p>
          <p style="font-family: var(--hds-font-family-code, 'DM Mono', monospace); font-size: 2rem; font-weight: 500; line-height: 1.1; margin-block: 0.5rem;">
            DM Mono
          </p>
          <p style="font-family: var(--hds-font-family-code, 'DM Mono', monospace); font-size: 1rem; line-height: 1.6; margin-block-start: 0.5rem;">
            The National Aeronautics and Space Administration
          </p>
          <p style="margin-block-start: 1rem; font-size: 0.875rem;">
            DM Mono is a monospace font. This characteristic makes it the perfect
            typeface for reading numbers and small labels. HDS uses it to give
            emphasis and create a more technical look and feel.
          </p>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
            Role: <code>family("code")</code>, <code>family("alt")</code><br>
            Weights: Light (300), Regular (400), Medium (500)<br>
            Stack: 'DM Mono', 'Consolas', 'Courier', monospace
          </p>
        </div>

      </div>

      <hr />

      <h2>An Evolving Legacy</h2>
      <p>
        NASA's legacy brand is rooted in classic sans serif typography — iconic Helvetica Bold &amp; Light.
        While great for print, Helvetica doesn't render well on digital interfaces.
        Inter captures the essence of Helvetica but has been crafted specifically for digital touchpoints.
      </p>
      <p>
        All three typefaces are open source and available for everyone to access
        freely through <a class="usa-link usa-link--external" href="https://fonts.google.com">Google Fonts<span class="usa-sr-only">(external)</span></a>.
      </p>

    </div>
  `,
};

// ============================================================
// Story 2: Heading Scale
// ============================================================

const headingSpec = (tag, size, weight, weightLabel, lineHeight, letterSpacing) => `
  <tr>
    <td style="vertical-align: top; white-space: nowrap; padding-right: 1.5rem;">
      <code>&lt;${tag}&gt;</code>
    </td>
    <td style="vertical-align: top; padding-bottom: 1.5rem;">
      <${tag} style="margin: 0;">The National Aeronautics and Space Administration</${tag}>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block: 0.5rem 0;">
        Inter ${weightLabel} · ${size} · line-height: ${lineHeight} · letter-spacing: ${letterSpacing}
      </p>
    </td>
  </tr>
`;

export const HeadingScale = {
  name: 'Heading Scale',
  render: () => `
    <div style="max-width: 64em;">

      <h1>Heading Scale</h1>
      <p class="usa-intro">
        The heading typefaces are designed to draw attention to content.
        H1–H3 use bold weight; H4–H6 use semibold for a lighter hierarchy.
      </p>

      <hr />

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

      <hr />

      <h2>Display Sizes</h2>
      <p>Display typefaces are intended for use at large sizes, giving emphasis
        to the most important headline on the page.</p>

      <div style="margin-block: 2rem; overflow-x: auto;">
        <p style="font-size: 0.75rem; opacity: 0.7;">H1-2xl · Inter Bold · 120px · line-height: 1</p>
        <p style="font-family: var(--hds-font-family-heading, Inter, sans-serif); font-size: 120px; font-weight: 700; line-height: 1; letter-spacing: -5.5px; margin: 0;">
          NASA
        </p>
      </div>

      <div style="margin-block: 2rem; overflow-x: auto;">
        <p style="font-size: 0.75rem; opacity: 0.7;">H1-xl · Inter Bold · 80px · line-height: 1.1</p>
        <p style="font-family: var(--hds-font-family-heading, Inter, sans-serif); font-size: 80px; font-weight: 700; line-height: 1.1; letter-spacing: -3px; margin: 0;">
          NASA
        </p>
      </div>

      <hr />

      <h2>Blockquote</h2>
      <blockquote>
        <p>We choose to go to the Moon in this decade and do the other things,
          not because they are easy, but because they are hard.</p>
        <cite>President John F. Kennedy</cite>
      </blockquote>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        Inter Light · 36px (xl) · line-height: 1.35 · letter-spacing: -1px
      </p>

    </div>
  `,
};

// ============================================================
// Story 3: Utility Classes & Body Text
// ============================================================

export const UtilityClasses = {
  name: 'Utility Classes',
  render: () => `
    <div style="max-width: 64em;">

      <h1>Typography Utilities</h1>
      <p class="usa-intro">
        HDS provides semantic typography classes for labels, metadata, captions,
        intro text, body copy, and numbers.
      </p>

      <hr />

      <!-- Labels & Metadata -->
      <h2>Labels, Metadata &amp; Captions</h2>
      <p>Three visually similar but typographically distinct treatments for
        small supportive text.</p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 1.5rem;">
        <thead>
          <tr>
            <th style="text-align: left; padding-bottom: 0.75rem;">Class</th>
            <th style="text-align: left; padding-bottom: 0.75rem;">Rendered</th>
            <th style="text-align: left; padding-bottom: 0.75rem;">Font</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-label</code></td>
            <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-label">NASA Eyes on the Solar System</span></td>
            <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">DM Mono Bold · 12px · uppercase · 0.25px spacing</td>
          </tr>
          <tr>
            <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-eyebrow</code></td>
            <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-eyebrow">Featured Mission</span></td>
            <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">DM Mono Bold · 12px · uppercase · 0.25px spacing</td>
          </tr>
          <tr>
            <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-metadata</code></td>
            <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-metadata">March 14, 2026 · 5 min read</span></td>
            <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">Inter Bold · 12px · uppercase · 0.25px spacing</td>
          </tr>
          <tr>
            <td style="padding-bottom: 1rem; vertical-align: top;"><code>.hds-caption</code></td>
            <td style="padding-bottom: 1rem; vertical-align: top;"><span class="hds-caption">Image credit: NASA/JPL-Caltech</span></td>
            <td style="padding-bottom: 1rem; vertical-align: top; font-size: 0.75rem; opacity: 0.7;">Public Sans Normal · 12px</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <!-- Intro Text -->
      <h2>Intro / Lead Text</h2>
      <p class="usa-intro">
        The Horizon Design System is an adaptable system of building blocks and
        templates that support the best practices of user interface design.
      </p>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        <code>.usa-intro</code> · Public Sans Light · 22px (md) · line-height: 1.35
      </p>

      <hr />

      <!-- Body Text -->
      <h2>Body Text</h2>
      <p>
        The body typefaces are designed for large fields of text. These fields of text
        can be found on something small, like a card, or large areas, like an article.
        Public Sans provides excellent readability at body sizes with a neutral,
        professional tone.
      </p>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        <code>&lt;p&gt;</code> · Public Sans Regular · 16px (xs) · line-height: 1.62 (≈160%)
      </p>

      <hr />

      <!-- Numbers -->
      <h2>Numbers</h2>
      <p>The numbers typeface brings a technical feel to the system — from countdowns
        to statistical displays.</p>

      <div style="display: flex; flex-wrap: wrap; gap: 3rem; align-items: baseline; margin-block: 1.5rem;">

        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-lg · 120px</p>
          <span style="font-family: var(--hds-font-family-code, 'DM Mono', monospace); font-size: 120px; font-weight: 300; line-height: 1; letter-spacing: -3px;">
            12
          </span>
        </div>

        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-md · 48px</p>
          <span style="font-family: var(--hds-font-family-code, 'DM Mono', monospace); font-size: 48px; font-weight: 300; line-height: 1; letter-spacing: 0;">
            12
          </span>
        </div>

        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-sm · 36px</p>
          <span style="font-family: var(--hds-font-family-code, 'DM Mono', monospace); font-size: 36px; font-weight: 300; line-height: 1; letter-spacing: 0;">
            12
          </span>
        </div>

        <div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-end: 0.25rem;">Number-xs · 28px</p>
          <span style="font-family: var(--hds-font-family-code, 'DM Mono', monospace); font-size: 28px; font-weight: 300; line-height: 1.1; letter-spacing: 0;">
            12
          </span>
        </div>

      </div>

      <p style="font-size: 0.75rem; opacity: 0.7;">
        DM Mono Light · line-height: 100% (lg/md/sm), 110% (xs) · letterspacing: -3px (lg), 0 (others)
      </p>

      <hr />

      <h2>Code</h2>
      <pre><code>const mission = 'Artemis';
console.log(\`Next stop: \${mission}\`);</code></pre>
      <p style="font-size: 0.75rem; opacity: 0.7;">
        <code>&lt;code&gt;</code> / <code>&lt;pre&gt;</code> · DM Mono Regular · 14px (2xs) · line-height: 1.35
      </p>

    </div>
  `,
};
