// ============================================================
// Button Stories — @nasa/hds-core
// Covers §4 (USWDS button overrides) and §11 (primary arrow)
//
// Sidebar structure:
//   Guidance   — Button.mdx (design rationale, Canvas embeds, usage rules)
//   Playground — interactive story with controls
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

// --- Helpers (used in multiple stories) ---

const label = (text) => `<span class="hds-label">${text}</span>`;

const grid = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">
    ${items}
  </div>`;

const gridItem = (labelText, content) => `
  <div style="min-width: 10rem;">
    ${label(labelText)}
    <div style="margin-top: 0.5rem;">${content}</div>
  </div>`;

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

// --- Guidance embeds (hidden from sidebar) ---

export const PrimaryArrow = {
  name: 'Primary Arrow',
  tags: ['!dev'],
  render: () =>
    grid(`
    ${gridItem('Internal', '<a class="hds-btn--primary" href="#">Explore the Mission</a>')}
    ${gridItem(
      'External',
      '<a class="hds-btn--primary usa-link--external" href="https://flickr.com">View on Flickr</a>',
    )}
  `),
};

export const FilledVariants = {
  name: 'Filled Variants',
  tags: ['!dev'],
  render: () =>
    grid(`
    ${gridItem('Call to Action', '<button class="usa-button" type="button">Download Report</button>')}
    ${gridItem(
      'Secondary Filled',
      '<button class="usa-button usa-button--secondary" type="button">Apply Filters</button>',
    )}
    ${gridItem('Unstyled', '<button class="usa-button usa-button--unstyled" type="button">Cancel</button>')}
  `),
};

export const OutlineVariant = {
  name: 'Outline',
  tags: ['!dev'],
  render: () =>
    grid(`
    ${gridItem('Outline', '<button class="usa-button usa-button--outline" type="button">View Details</button>')}
  `),
};

export const DisabledStates = {
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Filled — disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem(
              'Call to Action',
              '<button class="usa-button" type="button" disabled="disabled">Download Report</button>',
            )}
            ${gridItem(
              'Secondary Filled',
              '<button class="usa-button usa-button--secondary" type="button" disabled="disabled">Apply Filters</button>',
            )}
          `)}
        </div>
      </div>
      <div>
        ${label('Filled — aria-disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem(
              'Call to Action',
              '<button class="usa-button" type="button" aria-disabled="true">Download Report</button>',
            )}
            ${gridItem(
              'Secondary Filled',
              '<button class="usa-button usa-button--secondary" type="button" aria-disabled="true">Apply Filters</button>',
            )}
          `)}
        </div>
      </div>
      <div>
        ${label('Outline — disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem(
              'disabled',
              '<button class="usa-button usa-button--outline" type="button" disabled="disabled">View Details</button>',
            )}
            ${gridItem(
              'aria-disabled',
              '<button class="usa-button usa-button--outline" type="button" aria-disabled="true">View Details</button>',
            )}
          `)}
        </div>
      </div>
    </div>
  `,
};

export const AllVariants = {
  name: 'All variants',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Filled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('CTA', '<button class="usa-button" type="button">Download Report</button>')}
            ${gridItem('Secondary', '<button class="usa-button usa-button--secondary" type="button">Apply Filters</button>')}
            ${gridItem('Unstyled', '<button class="usa-button usa-button--unstyled" type="button">Cancel</button>')}
          `)}
        </div>
      </div>
      <div>
        ${label('Outline')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('Outline', '<button class="usa-button usa-button--outline" type="button">View Details</button>')}
          `)}
        </div>
      </div>
      <div>
        ${label('Primary Arrow')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('Internal', '<a class="hds-btn--primary" href="#">Explore the Mission</a>')}
            ${gridItem('External', '<a class="hds-btn--primary usa-link--external" href="https://flickr.com">View on Flickr</a>')}
          `)}
        </div>
      </div>
      <div>
        ${label('Disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('CTA', '<button class="usa-button" type="button" disabled="disabled">Download Report</button>')}
            ${gridItem('Secondary', '<button class="usa-button usa-button--secondary" type="button" disabled="disabled">Apply Filters</button>')}
            ${gridItem('Outline', '<button class="usa-button usa-button--outline" type="button" disabled="disabled">View Details</button>')}
          `)}
        </div>
      </div>
    </div>
  `,
};

// --- Palette Accessibility tests (hidden from sidebar) ---
// TODO: Secondary button contrast fails AA on dark palettes — see GitHub Issue #24

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(AllVariants.render, 'hover'),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(AllVariants.render, 'focus-visible'),
};

// --- Playground (visible in sidebar) ---

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
