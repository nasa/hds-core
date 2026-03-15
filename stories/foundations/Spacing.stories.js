export default {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
  },
};

// ============================================================
// Helper
// ============================================================

const spacingBar = (px, token, usage) => `
  <tr>
    <td style="padding: 0.75rem; vertical-align: middle; white-space: nowrap; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
      <code>units(${token})</code>
    </td>
    <td style="padding: 0.75rem; vertical-align: middle; white-space: nowrap; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
      ${px}px
    </td>
    <td style="padding: 0.75rem; vertical-align: middle; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3); width: 100%;">
      <div style="
        background-color: var(--hds-color-nasa-blue, #1C67E3);
        height: 1rem;
        width: ${px}px;
        max-width: 100%;
        opacity: 0.5;
        border-radius: 2px;
      "></div>
    </td>
    <td style="padding: 0.75rem; vertical-align: middle; font-size: 0.8rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">
      ${usage}
    </td>
  </tr>
`;

// ============================================================
// Story 1: Spacing Scale
// ============================================================

export const SpacingScale = {
  name: 'Spacing Scale',
  render: () => `
    <div style="max-width: 72em;">

      <h1>Spacing</h1>
      <p class="usa-intro">
        Whenever possible, all elements, components, and modules should align to
        an 8px square baseline grid for all breakpoints.
      </p>

      <hr />

      <h2>Base-8 System</h2>
      <p>
        HDS spacing is built on a base-8 grid. All spacing values are multiples
        of 8px, which creates consistent vertical and horizontal rhythm across
        the system. USWDS <code>units()</code> tokens map to these values.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Token</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Value</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Visual</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Usage</th>
          </tr>
        </thead>
        <tbody>
          ${spacingBar(8, '1', 'Strong / extremely close content relationship')}
          ${spacingBar(16, '2', 'Element stacking, horizontal and vertical')}
          ${spacingBar(24, '3', 'Content section separation within same component')}
          ${spacingBar(32, '4', 'Component separation (mobile, tablet); form field + label')}
          ${spacingBar(48, '6', 'Component separation (desktop)')}
          ${spacingBar(72, '9', 'Component separation (widescreen)')}
          ${spacingBar(120, '15', 'Layout section division (desktop-lg and below)')}
          ${spacingBar(240, '30', 'Layout section division (widescreen)')}
        </tbody>
      </table>

      <hr />

      <h2>Sub-Unit Values</h2>
      <p>For fine-grained adjustments, USWDS provides fractional and small unit tokens:</p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem; max-width: 40em;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Token</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Value</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Example Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(0.5)</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">4px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Icon gap, tight inline spacing</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(1)</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">8px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Tight element stacking</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(1.5)</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">12px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Button padding, list item gaps</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(2)</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">16px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Default element stacking</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem;"><code>units(2.5)</code></td>
            <td style="padding: 0.5rem;">20px</td>
            <td style="padding: 0.5rem;">Button inline padding</td>
          </tr>
        </tbody>
      </table>

    </div>
  `,
};

// ============================================================
// Story 2: Spacing in Practice
// ============================================================

export const SpacingInPractice = {
  name: 'Spacing in Practice',
  render: () => `
    <div style="max-width: 72em;">

      <h1>Spacing in Practice</h1>
      <p class="usa-intro">
        How spacing tokens map to real component and layout patterns.
      </p>

      <hr />

      <h2>Component Stacking</h2>
      <p>Vertical rhythm between elements uses consistent spacing tokens.</p>

      <div style="margin-block: 2rem; max-width: 36em;">
        <div style="border: 1px dashed var(--hds-palette-border, #D1D1D1); padding: 1rem;">
          <p class="hds-eyebrow" style="margin: 0;">Featured Mission</p>
          <div style="height: 8px; background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.2; margin: 0;"></div>
          <h3 style="margin: 0;">Artemis Program</h3>
          <div style="height: 16px; background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.2; margin: 0;"></div>
          <p style="margin: 0;">NASA's Artemis program aims to land the first woman and first person of color on the Moon.</p>
          <div style="height: 24px; background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.2; margin: 0;"></div>
          <span style="font-size: 0.8rem;">
            ↑ <code>units(1)</code> 8px — eyebrow to heading<br>
            ↑ <code>units(2)</code> 16px — heading to paragraph<br>
            ↑ <code>units(3)</code> 24px — paragraph to next section
          </span>
        </div>
      </div>

      <hr />

      <h2>Responsive Spacing</h2>
      <p>Component separation increases with screen size:</p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem; max-width: 40em;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Context</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Mobile/Tablet</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Desktop</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Widescreen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Element stacking</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(2)</code> 16px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(2)</code> 16px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(2)</code> 16px</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Component separation</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(4)</code> 32px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(6)</code> 48px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>units(9)</code> 72px</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem;">Layout section division</td>
            <td style="padding: 0.5rem;"><code>units(8)</code> 64px</td>
            <td style="padding: 0.5rem;"><code>units(15)</code> 120px</td>
            <td style="padding: 0.5rem;"><code>units(30)</code> 240px</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Using Spacing in Sass</h2>

      <pre><code>// USWDS units() function — always use this for spacing
.my-component {
  padding: units(3);           // 24px
  margin-block-end: units(6);  // 48px
  gap: units(2);               // 16px
}

// Common component patterns
.card {
  padding: units(3);           // 24px internal padding
  margin-block-end: units(4);  // 32px between cards
}

.section {
  padding-block: units(8);     // 64px section padding
}</code></pre>

    </div>
  `,
};
