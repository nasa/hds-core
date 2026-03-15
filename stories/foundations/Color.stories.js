export default {
  title: 'Foundations/Color',
  parameters: {
    layout: 'padded',
  },
};

// ============================================================
// Helpers
// ============================================================

const swatch = (name, hex, token, textColor = '#fff') => `
  <div style="display: flex; align-items: stretch; margin-bottom: 2px;">
    <div style="
      background-color: ${hex};
      width: 4rem;
      min-height: 3rem;
      border: 1px solid rgba(0,0,0,0.1);
    "></div>
    <div style="padding: 0.4rem 0.75rem; font-size: 0.8rem; line-height: 1.4;">
      <strong>${name}</strong><br>
      <code style="font-size: 0.7rem;">${hex}</code><br>
      <span style="font-size: 0.7rem; opacity: 0.6;">${token}</span>
    </div>
  </div>
`;

const swatchLarge = (name, hex, token, description, textColor = '#fff') => `
  <div style="flex: 1; min-width: 200px;">
    <div style="
      background-color: ${hex};
      color: ${textColor};
      padding: 1.5rem;
      min-height: 6rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      border: 1px solid rgba(0,0,0,0.1);
    ">
      <strong style="font-size: 1rem;">${name}</strong><br>
      <code style="font-size: 0.75rem; opacity: 0.8;">${hex}</code>
    </div>
    <div style="padding: 0.5rem 0; font-size: 0.75rem;">
      <code>${token}</code><br>
      <span style="opacity: 0.6;">${description}</span>
    </div>
  </div>
`;

// ============================================================
// Story 1: Brand Colors
// ============================================================

export const BrandColors = {
  name: 'Brand Colors',
  render: () => `
    <div style="max-width: 72em;">

      <h1>HDS Color</h1>
      <p class="usa-intro">
        Color is used in very restrained and purposeful ways throughout the system.
        With content at the forefront, this allows for the unique NASA content to be
        the center of attention.
      </p>

      <hr />

      <h2>Designed for AAA Accessibility</h2>
      <p>
        HDS has been designed to ensure that the majority of the sighted public will
        be able to interact with every element without strain or issues. The system
        ensures that all text has a contrast ratio of at least <strong>7.0</strong>
        to meet the highest accessibility standards.
      </p>

      <hr />

      <h2>Primary Palette</h2>
      <p>
        The primary palette consists of black, white, red, and blue. These colors
        are used in logical ways throughout the site to highlight actions when they
        are important. We use a restricted palette to give attention and hierarchy
        to our content without distraction.
      </p>

      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-block: 2rem;">
        ${swatchLarge('Carbon Black', '#000000', '$hds-color-carbon-black', 'Text, backgrounds, headings', '#fff')}
        ${swatchLarge('Spacesuit White', '#FFFFFF', '$hds-color-spacesuit-white', 'Backgrounds, button text, icons', '#000')}
        ${swatchLarge('NASA Red', '#F64137', '$hds-color-nasa-red', 'Primary buttons, CTA, navigation away', '#fff')}
        ${swatchLarge('NASA Blue', '#1C67E3', '$hds-color-nasa-blue', 'Secondary buttons, on-page actions', '#fff')}
      </div>

      <hr />

      <h2>Extended Palette</h2>
      <p>
        The extended palette consists of a tint and shade for the brand colors.
        Usage of these colors varies depending on the touchpoint, but they ensure
        that your combinations are always AAA accessible.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-block: 2rem;">
        ${swatchLarge('NASA Red / Tint', '#FF5C52', '$hds-color-nasa-red-tint', 'Error highlights, hover states', '#000')}
        ${swatchLarge('NASA Red / Shade', '#B60109', '$hds-color-nasa-red-shade', 'Error dark, button hover', '#fff')}
        ${swatchLarge('NASA Blue / Tint', '#288BFF', '$hds-color-nasa-blue-tint', 'Active elements, dark palette buttons', '#000')}
        ${swatchLarge('NASA Blue / Shade', '#0B3D91', '$hds-color-nasa-blue-shade', 'Blue palette background', '#fff')}
      </div>

      <hr />

      <h2>Neutrals — Carbon Scale</h2>
      <p>
        Neutrals have varying degrees of value that allow for the appropriate levels
        of contrast across the system. They are used for text and subtle backgrounds
        to de-emphasize secondary content.
      </p>

      <div style="margin-block: 2rem;">
        ${swatch('Carbon Black', '#000000', '$hds-color-carbon-black')}
        ${swatch('Carbon 90', '#17171B', '$hds-color-carbon-90')}
        ${swatch('Carbon 80', '#2E2E32', '$hds-color-carbon-80')}
        ${swatch('Carbon 70', '#444447', '$hds-color-carbon-70')}
        ${swatch('Carbon 60', '#58585B', '$hds-color-carbon-60 — Text on White')}
        ${swatch('Carbon 50', '#77777A', '$hds-color-carbon-50')}
        ${swatch('Carbon 40', '#959599', '$hds-color-carbon-40 — Text on Black')}
        ${swatch('Carbon 30', '#B9B9BB', '$hds-color-carbon-30')}
        ${swatch('Carbon 20', '#D1D1D1', '$hds-color-carbon-20')}
        ${swatch('Carbon 10', '#E3E3E3', '$hds-color-carbon-10')}
        ${swatch('Carbon 05', '#F6F6F6', '$hds-color-carbon-05')}
        ${swatch('Spacesuit White', '#FFFFFF', '$hds-color-spacesuit-white')}
      </div>

      <hr />

      <h2>Additional Colors</h2>
      <p>
        International Orange and Active Green are colors that are used sparingly
        and intentionally.
      </p>

      <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; margin-block: 2rem;">
        ${swatchLarge('International Orange', '#EA6F24', '$hds-color-international-orange', 'Blockquote icon, status indicators', '#000')}
        ${swatchLarge('Active Green', '#47DA84', '$hds-color-active-green', 'Confirmation, active status', '#000')}
      </div>

    </div>
  `,
};

// ============================================================
// Story 2: Color Roles
// ============================================================

export const ColorRoles = {
  name: 'Color Roles',
  render: () => `
    <div style="max-width: 72em;">

      <h1>Color Roles</h1>
      <p class="usa-intro">
        HDS uses color in specific ways to develop memorable visual cues and patterns.
        The main use for color should always be purposeful and intentional.
      </p>

      <hr />

      <h2>Color for Wayfinding</h2>
      <p>
        <strong>Red is always used to indicate navigating to a new page.</strong>
        Blue, however, is always used for elements that are interactive but keep the
        user on the same page.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Role</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Color</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Meaning</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
              <span style="display: inline-block; width: 1em; height: 1em; background: #F64137; border-radius: 50%; vertical-align: middle; margin-right: 0.5em;"></span>
              Primary
            </td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">NASA Red</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Navigates away</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>.usa-button</code>, <code>.hds-btn--primary</code>, <code>.hds-btn-icon--cta</code></td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
              <span style="display: inline-block; width: 1em; height: 1em; background: #1C67E3; border-radius: 50%; vertical-align: middle; margin-right: 0.5em;"></span>
              Secondary
            </td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">NASA Blue</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Stays on page</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>.usa-button--secondary</code>, <code>.usa-button--outline</code>, <code>.hds-btn-icon--secondary</code></td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
              <span style="display: inline-block; width: 1em; height: 1em; background: #77777A; border-radius: 50%; vertical-align: middle; margin-right: 0.5em;"></span>
              Neutral
            </td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Carbon scale</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">UI controls</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>.hds-btn-icon--utility</code>, text links, borders</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
              <span style="display: inline-block; width: 1em; height: 1em; background: #EA6F24; border-radius: 50%; vertical-align: middle; margin-right: 0.5em;"></span>
              Significance
            </td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">International Orange</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Status, emphasis</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Blockquote icon, status indicators</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem;">
              <span style="display: inline-block; width: 1em; height: 1em; background: #47DA84; border-radius: 50%; vertical-align: middle; margin-right: 0.5em;"></span>
              Active
            </td>
            <td style="padding: 0.75rem;">Active Green</td>
            <td style="padding: 0.75rem;">Confirmation</td>
            <td style="padding: 0.75rem;">Active missions, completion status</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Color for Significance</h2>
      <p>
        Beyond wayfinding, color is used sparingly across the site only to show
        status, call attention to timely events, and give emphasis to the human
        element of quotes.
      </p>

      <hr />

      <h2>Primary / Secondary Swap</h2>
      <p>
        HDS Core swaps the USWDS default color families so that USWDS components
        automatically render with HDS brand colors:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-block: 1.5rem; max-width: 36em;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);"></th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">USWDS Default</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">HDS Core</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>color("primary")</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Blue</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
              <span style="display: inline-block; width: 0.8em; height: 0.8em; background: #F64137; border-radius: 2px; vertical-align: middle; margin-right: 0.3em;"></span>
              NASA Red
            </td>
          </tr>
          <tr>
            <td style="padding: 0.5rem;"><code>color("secondary")</code></td>
            <td style="padding: 0.5rem;">Red</td>
            <td style="padding: 0.5rem;">
              <span style="display: inline-block; width: 0.8em; height: 0.8em; background: #1C67E3; border-radius: 2px; vertical-align: middle; margin-right: 0.3em;"></span>
              NASA Blue
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        This means <code>.usa-button</code> automatically renders NASA Red and
        <code>.usa-button--secondary</code> renders NASA Blue — matching the HDS
        wayfinding rule with zero custom overrides needed.
      </p>

    </div>
  `,
};

// ============================================================
// Story 3: Using Colors (Developer Reference)
// ============================================================

export const UsingColors = {
  name: 'Using Colors',
  render: () => `
    <div style="max-width: 72em;">

      <h1>Using Colors in Code</h1>
      <p class="usa-intro">
        HDS Core provides three ways to reference colors. They serve different
        purposes and produce different results for Carbon colors.
      </p>

      <hr />

      <h2>Three Color Systems</h2>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Method</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Syntax</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Values</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Use When</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><strong>HDS Sass variables</strong></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$hds-color-carbon-90</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
              <span style="display: inline-block; width: 0.8em; height: 0.8em; background: #17171B; border-radius: 2px; vertical-align: middle; margin-right: 0.3em;"></span>
              Exact HDS hex
            </td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Custom Sass ✅ Recommended</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><strong>CSS custom properties</strong></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>var(--hds-color-carbon-90)</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
              <span style="display: inline-block; width: 0.8em; height: 0.8em; background: #17171B; border-radius: 2px; vertical-align: middle; margin-right: 0.3em;"></span>
              Exact HDS hex
            </td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Plain CSS / JS ✅ Recommended</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem;"><strong>USWDS theme tokens</strong></td>
            <td style="padding: 0.75rem;"><code>color("base-darker")</code></td>
            <td style="padding: 0.75rem;">
              <span style="display: inline-block; width: 0.8em; height: 0.8em; background: #1b1b1b; border-radius: 2px; vertical-align: middle; margin-right: 0.3em;"></span>
              Approximate
            </td>
            <td style="padding: 0.75rem;">USWDS mixins only ⚠️ Approximate</td>
          </tr>
        </tbody>
      </table>

      <div style="background: var(--hds-color-carbon-05, #F6F6F6); border-left: 4px solid var(--hds-color-nasa-blue, #1C67E3); padding: 1.5rem; margin-block: 2rem;">
        <strong>Why the difference?</strong>
        <p style="margin-block: 0.5rem 0;">
          USWDS theme tokens require USWDS system color strings (e.g., <code>"gray-90"</code>),
          not arbitrary hex values. The HDS Carbon scale doesn't have exact matches
          in USWDS's system palette. For example:<br><br>
          <code>color("base-darker")</code> → USWDS <code>gray-90</code> → <code style="background: #1b1b1b; color: #fff; padding: 0.1em 0.3em;">#1b1b1b</code><br>
          <code>$hds-color-carbon-90</code> → exact → <code style="background: #17171B; color: #fff; padding: 0.1em 0.3em;">#17171B</code><br><br>
          Close, but not identical. All HDS component styles use exact values.
        </p>
      </div>

      <hr />

      <h2>Sass Examples</h2>

      <pre><code>// ✅ Recommended — exact HDS hex values
.my-component {
  background-color: $hds-color-carbon-05;
  color: $hds-color-carbon-90;
  border: 1px solid $hds-color-carbon-20;
}

// ✅ Good for state colors (exact match doesn't matter)
.my-error {
  border-color: color("error");
  color: color("error-dark");
}

// ⚠️ Approximate — fine for USWDS utilities, not for custom styles
.bg-base-darker { /* USWDS utility — uses gray-90 approximation */ }</code></pre>

      <hr />

      <h2>CSS Custom Property Examples</h2>

      <pre><code>/* ✅ Exact HDS colors */
.my-element {
  color: var(--hds-color-carbon-90);
  background: var(--hds-color-carbon-05);
  border-color: var(--hds-color-nasa-blue);
}

/* ✅ Palette-aware (adapts to palette context) */
.my-element {
  color: var(--hds-palette-text);
  background: var(--hds-palette-bg);
  border-color: var(--hds-palette-border);
}</code></pre>

      <hr />

      <h2>All CSS Custom Properties</h2>
      <p>These are output to <code>:root</code> and available globally:</p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0.5rem; margin-block: 1.5rem; font-size: 0.8rem; font-family: var(--hds-font-family-code, 'DM Mono', monospace);">
        <div><code>--hds-color-carbon-black</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#000;vertical-align:middle;border:1px solid #ccc;"></span></div>
        <div><code>--hds-color-carbon-90</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#17171B;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-80</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#2E2E32;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-70</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#444447;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-60</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#58585B;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-50</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#77777A;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-40</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#959599;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-30</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#B9B9BB;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-20</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#D1D1D1;vertical-align:middle;"></span></div>
        <div><code>--hds-color-carbon-10</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#E3E3E3;vertical-align:middle;border:1px solid #ccc;"></span></div>
        <div><code>--hds-color-carbon-05</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#F6F6F6;vertical-align:middle;border:1px solid #ccc;"></span></div>
        <div><code>--hds-color-spacesuit-white</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#FFF;vertical-align:middle;border:1px solid #ccc;"></span></div>
        <div><code>--hds-color-nasa-red</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#F64137;vertical-align:middle;"></span></div>
        <div><code>--hds-color-nasa-red-tint</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#FF5C52;vertical-align:middle;"></span></div>
        <div><code>--hds-color-nasa-red-shade</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#B60109;vertical-align:middle;"></span></div>
        <div><code>--hds-color-nasa-blue</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#1C67E3;vertical-align:middle;"></span></div>
        <div><code>--hds-color-nasa-blue-tint</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#288BFF;vertical-align:middle;"></span></div>
        <div><code>--hds-color-nasa-blue-shade</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#0B3D91;vertical-align:middle;"></span></div>
        <div><code>--hds-color-international-orange</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#EA6F24;vertical-align:middle;"></span></div>
        <div><code>--hds-color-active-green</code> <span style="display:inline-block;width:0.8em;height:0.8em;background:#47DA84;vertical-align:middle;"></span></div>
      </div>

    </div>
  `,
};
