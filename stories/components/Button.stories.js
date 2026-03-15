// ============================================================
// Button Stories
// @nasa/hds-core
// ============================================================
// Covers §4 (USWDS button overrides) and provides visual
// testing for palette-aware behavior.
//
// NOTE: Hover/focus/active states require real interaction
// or the storybook-addon-pseudo-states addon. A static matrix
// of interactive states will be added in the Storybook
// modernization pass.
//
// Palette testing: Use the paintbrush toolbar switcher to
// cycle palettes. The "All Variants" and "Disabled States"
// stories include a built-in dark context for outline-inverse.
// ============================================================

export default {
  title: 'Components/Button',
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text content',
    },
    variant: {
      control: 'select',
      options: [
        'usa-button (CTA)',
        'usa-button--secondary (Filled Blue)',
        'usa-button--outline',
        'usa-button--outline inverse',
        'usa-button--unstyled',
      ],
      mapping: {
        'usa-button (CTA)': '',
        'usa-button--secondary (Filled Blue)': 'usa-button--secondary',
        'usa-button--outline': 'usa-button--outline',
        'usa-button--outline inverse': 'usa-button--outline usa-button--inverse',
        'usa-button--unstyled': 'usa-button--unstyled',
      },
      description: 'USWDS button variant class',
    },
    disabled: {
      control: 'boolean',
      description: 'Native disabled attribute',
    },
    ariaDisabled: {
      control: 'boolean',
      description: 'aria-disabled attribute (styled but still interactive)',
    },
  },
  args: {
    label: 'Download',
    variant: 'usa-button (CTA)',
    disabled: false,
    ariaDisabled: false,
  },
};


// ============================================================
// Playground
// ============================================================
// Interactive single button. Use controls panel to change
// variant, text, and disabled state. Use palette toolbar
// to test across all 6 palettes.
// ============================================================

export const Playground = {
  render: ({ label, variant, disabled, ariaDisabled }) => {
    const needsDarkBg = variant === 'usa-button--outline usa-button--inverse';
    const attrs = [];
    if (disabled) attrs.push('disabled="disabled"');
    if (ariaDisabled && !disabled) attrs.push('aria-disabled="true"');

    const button = `
      <button
        class="usa-button ${variant}"
        type="button"
        ${attrs.join(' ')}
      >${label}</button>
    `;

    if (needsDarkBg) {
      return `
        <div style="background-color: var(--hds-palette-bg, #17171B); padding: 2rem;">
          ${button}
        </div>
      `;
    }
    return button;
  },
};


// ============================================================
// All Variants
// ============================================================
// Side-by-side matrix for quick visual comparison.
// Includes a dark strip for outline-inverse.
// ============================================================

export const AllVariants = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">CTA (Primary Red)</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button" type="button">Download</button>
        </div>
      </div>

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Secondary Filled (Blue)</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--secondary" type="button">Download</button>
        </div>
      </div>

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Outline — On Light</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--outline" type="button">Download</button>
        </div>
      </div>

      <div style="background-color: #17171B; padding: 2rem; margin: 0 -1rem;">
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #B9B9BB; margin-bottom: 1rem;">Outline — On Dark (Inverse Fallback)</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--outline usa-button--inverse" type="button">Download</button>
        </div>
      </div>

      <div style="background-color: #17171B; padding: 2rem; margin: 0 -1rem;" data-hds-palette="dark">
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #B9B9BB; margin-bottom: 1rem;">Outline — Dark Palette (Automatic)</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--outline" type="button">Download</button>
        </div>
      </div>

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Unstyled</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--unstyled" type="button">Download</button>
        </div>
      </div>
<div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Primary Arrow (§11) — Internal</h3>
        <div style="display: flex; gap: 2rem; align-items: center;">
          <a class="hds-btn--primary" href="#">Explore</a>
          <a class="hds-btn--primary" href="#">Learn More</a>
        </div>
      </div>

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Primary Arrow (§11) — External</h3>
        <div style="display: flex; gap: 2rem; align-items: center;">
          <a class="hds-btn--primary usa-link--external" href="https://flickr.com">View on Flickr</a>
          <a class="hds-btn--primary usa-link--external" href="https://youtube.com">Watch on YouTube</a>
        </div>
      </div>

      <div style="background-color: #17171B; padding: 2rem; margin: 0 -1rem;" data-hds-palette="dark">
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #B9B9BB; margin-bottom: 1rem;">Primary Arrow (§11) — Dark Palette</h3>
        <div style="display: flex; gap: 2rem; align-items: center;">
          <a class="hds-btn--primary" href="#">Explore</a>
          <a class="hds-btn--primary usa-link--external" href="https://flickr.com">View on Flickr</a>
        </div>
      </div>
      
    </div>
  `,
  argTypes: {
    label: { table: { disable: true } },
    variant: { table: { disable: true } },
    disabled: { table: { disable: true } },
    ariaDisabled: { table: { disable: true } },
  },
};


// ============================================================
// Disabled States
// ============================================================
// Verifies HDS color-based disabled (not USWDS opacity).
// Shows both `disabled` and `aria-disabled` per USWDS guidance.
// ============================================================

export const DisabledStates = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Filled — disabled</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button" type="button" disabled="disabled">CTA</button>
          <button class="usa-button usa-button--secondary" type="button" disabled="disabled">Secondary</button>
        </div>
      </div>

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Filled — aria-disabled</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button" type="button" aria-disabled="true">CTA</button>
          <button class="usa-button usa-button--secondary" type="button" aria-disabled="true">Secondary</button>
        </div>
      </div>

      <div>
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #58585B; margin-bottom: 1rem;">Outline — disabled (on light)</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--outline" type="button" disabled="disabled">Outline</button>
          <button class="usa-button usa-button--outline" type="button" aria-disabled="true">aria-disabled</button>
        </div>
      </div>

      <div style="background-color: #17171B; padding: 2rem; margin: 0 -1rem;">
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #B9B9BB; margin-bottom: 1rem;">Outline — disabled (inverse fallback)</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--outline usa-button--inverse" type="button" disabled="disabled">Outline</button>
          <button class="usa-button usa-button--outline usa-button--inverse" type="button" aria-disabled="true">aria-disabled</button>
        </div>
      </div>

      <div style="background-color: #17171B; padding: 2rem; margin: 0 -1rem;" data-hds-palette="dark">
        <h3 class="site-preview-heading" style="font-family: Inter, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #B9B9BB; margin-bottom: 1rem;">Outline — disabled (dark palette)</h3>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="usa-button usa-button--outline" type="button" disabled="disabled">Outline</button>
          <button class="usa-button usa-button--outline" type="button" aria-disabled="true">aria-disabled</button>
        </div>
      </div>

    </div>
  `,
  argTypes: {
    label: { table: { disable: true } },
    variant: { table: { disable: true } },
    disabled: { table: { disable: true } },
    ariaDisabled: { table: { disable: true } },
  },
};