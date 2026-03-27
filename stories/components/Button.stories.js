// ============================================================
// Button Stories — @nasa/hds-core
// Covers §4 (USWDS button overrides) and §11 (primary arrow)
//
// Sidebar structure:
//   Guidance   — Button.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — CTA (default), Secondary Filled, Outline,
//              Unstyled, Primary Arrow (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Button',
};

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

const btn = (classes, text, opts = {}) => {
  const attrs = [];
  if (opts.disabled) attrs.push('disabled="disabled"');
  if (opts.ariaDisabled) attrs.push('aria-disabled="true"');
  return `<button class="${classes}" type="button"${attrs.length ? ' ' + attrs.join(' ') : ''}>${text}</button>`;
};

// Shared argTypes for filled/outline button stories
const disabledArgTypes = {
  label: {
    control: 'text',
    description: 'Button text content',
  },
  disabled: {
    control: 'boolean',
    description: 'Native disabled attribute — removes from tab order',
  },
  ariaDisabled: {
    control: 'boolean',
    description: 'aria-disabled — styled as disabled but remains focusable',
  },
};

const stateVariants = [
  { text: 'CTA', classes: 'usa-button' },
  { text: 'Secondary', classes: 'usa-button usa-button--secondary' },
  { text: 'Outline', classes: 'usa-button usa-button--outline' },
  { text: 'Unstyled', classes: 'usa-button usa-button--unstyled' },
];

// --- Stories (visible in sidebar) ---

export const CTA = {
  name: 'CTA (default)',
  args: {
    label: 'Download Report',
    disabled: false,
    ariaDisabled: false,
  },
  argTypes: disabledArgTypes,
  render: (args = {}) => {
    const { label: text = 'Download Report', disabled = false, ariaDisabled = false } = args;
    return btn('usa-button', text, { disabled, ariaDisabled: ariaDisabled && !disabled });
  },
};

export const SecondaryFilled = {
  name: 'Secondary Filled',
  args: {
    label: 'Apply Filters',
    disabled: false,
    ariaDisabled: false,
  },
  argTypes: disabledArgTypes,
  render: (args = {}) => {
    const { label: text = 'Apply Filters', disabled = false, ariaDisabled = false } = args;
    return btn('usa-button usa-button--secondary', text, { disabled, ariaDisabled: ariaDisabled && !disabled });
  },
};

export const Outline = {
  name: 'Outline',
  args: {
    label: 'View Details',
    disabled: false,
    ariaDisabled: false,
  },
  argTypes: disabledArgTypes,
  render: (args = {}) => {
    const { label: text = 'View Details', disabled = false, ariaDisabled = false } = args;
    return btn('usa-button usa-button--outline', text, { disabled, ariaDisabled: ariaDisabled && !disabled });
  },
};

export const Unstyled = {
  name: 'Unstyled',
  args: {
    label: 'Cancel',
    disabled: false,
    ariaDisabled: false,
  },
  argTypes: disabledArgTypes,
  render: (args = {}) => {
    const { label: text = 'Cancel', disabled = false, ariaDisabled = false } = args;
    return btn('usa-button usa-button--unstyled', text, { disabled, ariaDisabled: ariaDisabled && !disabled });
  },
};

export const PrimaryArrow = {
  name: 'Primary Arrow',
  args: {
    label: 'Explore the Mission',
    external: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Link text content',
    },
    external: {
      control: 'boolean',
      description: 'External link — arrow changes from line to diagonal',
    },
  },
  render: (args = {}) => {
    const { label: text = 'Explore the Mission', external = false } = args;
    const externalClass = external ? ' usa-link--external' : '';
    const href = external ? 'https://flickr.com' : '#';
    return `<a class="hds-btn--primary${externalClass}" href="${href}">${text}</a>`;
  },
};

// --- Guidance embeds (MDX only) ---

export const PrimaryArrowPair = {
  name: 'Primary Arrow pair',
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
  name: 'Filled variants',
  tags: ['!dev'],
  render: () =>
    grid(`
    ${gridItem('Call to Action', btn('usa-button', 'Download Report'))}
    ${gridItem('Secondary Filled', btn('usa-button usa-button--secondary', 'Apply Filters'))}
    ${gridItem('Unstyled', btn('usa-button usa-button--unstyled', 'Cancel'))}
  `),
};

export const DisabledStates = {
  name: 'Disabled states',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Filled — disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('Call to Action', btn('usa-button', 'Download Report', { disabled: true }))}
            ${gridItem('Secondary Filled', btn('usa-button usa-button--secondary', 'Apply Filters', { disabled: true }))}
          `)}
        </div>
      </div>
      <div>
        ${label('Filled — aria-disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('Call to Action', btn('usa-button', 'Download Report', { ariaDisabled: true }))}
            ${gridItem('Secondary Filled', btn('usa-button usa-button--secondary', 'Apply Filters', { ariaDisabled: true }))}
          `)}
        </div>
      </div>
      <div>
        ${label('Outline — disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('disabled', btn('usa-button usa-button--outline', 'View Details', { disabled: true }))}
            ${gridItem('aria-disabled', btn('usa-button usa-button--outline', 'View Details', { ariaDisabled: true }))}
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
            ${gridItem('CTA', btn('usa-button', 'Download Report'))}
            ${gridItem('Secondary', btn('usa-button usa-button--secondary', 'Apply Filters'))}
            ${gridItem('Unstyled', btn('usa-button usa-button--unstyled', 'Cancel'))}
          `)}
        </div>
      </div>
      <div>
        ${label('Outline')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('Outline', btn('usa-button usa-button--outline', 'View Details'))}
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
            ${gridItem('CTA', btn('usa-button', 'Download Report', { disabled: true }))}
            ${gridItem('Secondary', btn('usa-button usa-button--secondary', 'Apply Filters', { disabled: true }))}
            ${gridItem('Outline', btn('usa-button usa-button--outline', 'View Details', { disabled: true }))}
          `)}
        </div>
      </div>
    </div>
  `,
};

export const States = {
  name: 'States (all variants)',
  render: () => {
    const header = `
      <div style="display: grid; grid-template-columns: 7rem repeat(2, auto); gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
        <div></div>
        ${label('Default')}
        ${label('Disabled')}
      </div>`;

    const rows = stateVariants
      .map(
        (v) => `
      <div style="display: grid; grid-template-columns: 7rem repeat(2, auto); gap: 1rem; align-items: center;">
        ${label(v.text)}
        <div>${btn(v.classes, 'Label')}</div>
        <div>${btn(v.classes, 'Label', { disabled: true })}</div>
      </div>`,
      )
      .join('');

    return `
      ${header}
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${rows}
      </div>
      <p style="margin-top: 1.5rem; font-size: 14px; color: var(--hds-palette-muted, #717171);">
        Hover states require mouse interaction — hover each button above to preview.
        Active matches hover on all variants. Primary Arrow excluded (link, not button).
      </p>
    `;
  },
};

// --- Palette accessibility tests ---
// TODO: Secondary button contrast fails AA on dark palettes — see GitHub Discussion #24

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yDisabled = {
  name: 'Palette a11y [disabled]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(States.render),
};

export const PaletteA11yStates = {
  name: 'Palette a11y [states]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
  render: paletteRender(States.render),
};
