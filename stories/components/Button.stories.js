// ============================================================
// Button Stories — @nasa/hds-core
// CSS: components/_button.scss, components/_primary-arrow-button.scss
//
// Sidebar structure:
//   Guidance   — Button.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Primary Arrow, CTA (default), Secondary Filled,
//              Outline, Unstyled, All Variants (visible in sidebar)
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Button',
};

// --- Helpers (used in multiple stories) ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

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

// Shared Chromatic parameters for focus test stories
const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
  },
};

// --- Stories (visible in sidebar) ---

export const PrimaryArrow = {
  name: 'Primary Arrow',
  args: {
    text: 'Explore the Mission',
    external: false,
    size: 'default',
  },
  argTypes: {
    text: {
      control: 'text',
      name: 'Label',
      description: 'Link text content',
    },
    external: {
      control: 'boolean',
      description: 'External link — arrow changes from line to diagonal',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl', '2xl'],
      description: 'Button size — default is 18px text / 24px circle',
    },
  },
  render: (args = {}) => {
    const { text = 'Explore the Mission', external = false, size = 'default' } = args;
    const externalClass = external ? ' usa-link--external' : '';
    const sizeClass = size && size !== 'default' ? ` hds-btn--primary--${size}` : '';
    const href = external ? 'https://flickr.com' : '#';
    return `<a class="hds-btn--primary${sizeClass}${externalClass}" href="${href}">${text}</a>`;
  },
};

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

export const AllVariants = {
  name: 'All Variants',
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
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

// --- Guidance embeds (MDX only) ---

export const PrimaryArrowSizes = {
  name: 'Primary arrow sizes',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center;">
      <div>
        <span class="hds-overline">XS (14px)</span>
        <div style="margin-top: 0.5rem;">
          <a class="hds-btn--primary hds-btn--primary--xs" href="#">Explore</a>
        </div>
      </div>
      <div>
        <span class="hds-overline">SM (16px)</span>
        <div style="margin-top: 0.5rem;">
          <a class="hds-btn--primary hds-btn--primary--sm" href="#">Explore</a>
        </div>
      </div>
      <div>
        <span class="hds-overline">Default (18px)</span>
        <div style="margin-top: 0.5rem;">
          <a class="hds-btn--primary" href="#">Explore</a>
        </div>
      </div>
      <div>
        <span class="hds-overline">LG (22px)</span>
        <div style="margin-top: 0.5rem;">
          <a class="hds-btn--primary hds-btn--primary--lg" href="#">Explore</a>
        </div>
      </div>
      <div>
        <span class="hds-overline">XL (29px)</span>
        <div style="margin-top: 0.5rem;">
          <a class="hds-btn--primary hds-btn--primary--xl" href="#">Explore</a>
        </div>
      </div>
      <div>
        <span class="hds-overline">2XL (36px)</span>
        <div style="margin-top: 0.5rem;">
          <a class="hds-btn--primary hds-btn--primary--2xl" href="#">Explore</a>
        </div>
      </div>
    </div>
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(AllVariants.render),
};

// --- Focus tests (Chromatic modes + play function) ---

export const FocusButton = {
  name: 'Focus [button]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: flex-start;">
      ${btn('usa-button', 'CTA Button')}
      ${btn('usa-button usa-button--secondary', 'Secondary')}
      ${btn('usa-button usa-button--outline', 'Outline')}
    </div>
  `,
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const button = canvas.getByRole('button', { name: 'CTA Button' });
    await expect(button).toHaveFocus();
  },
};

export const FocusPrimaryArrow = {
  name: 'Focus [primary arrow]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => '<a class="hds-btn--primary" href="#">Explore the Mission</a>',
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const link = canvas.getByRole('link', { name: 'Explore the Mission' });
    await expect(link).toHaveFocus();
  },
};
