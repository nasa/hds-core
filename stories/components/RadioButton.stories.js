// ============================================================
// Radio Button Stories — @nasa/hds-core
// Covers §5.0, §5.7
//
// HDS Figma: Radio Buttons.pdf
// USWDS: https://designsystem.digital.gov/components/radio-buttons/
//
// Sidebar structure:
//   Components / Radio Button / Guidance  — RadioButton.mdx
//   Components / Radio Button / Playground — interactive story with controls
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Radio Button',
};

// --- Helpers ---

const label = (text) => `<p class="hds-label" style="margin-bottom: 0.5rem">${text}</p>`;

const radioItem = (prefix, value, labelText, opts = {}) => {
  const { checked = false, disabled = false, tile = false, description = '' } = opts;
  const inputClass = tile ? 'usa-radio__input usa-radio__input--tile' : 'usa-radio__input';
  const id = `${prefix}-${value}`;
  // Disabled radios need a unique name so checked + disabled renders
  // independently from the rest of the group in the States story.
  const name = disabled ? `${prefix}-${value}` : prefix;

  return `
    <div class="usa-radio">
      <input
        class="${inputClass}"
        id="${id}"
        type="radio"
        name="${name}"
        value="${value}"
        ${checked ? 'checked="checked"' : ''}
        ${disabled ? 'disabled="disabled"' : ''}
      />
      <label class="usa-radio__label" for="${id}">${labelText}${
        description ? `<span class="usa-checkbox__label-description">${description}</span>` : ''
      }</label>
    </div>
  `;
};

const radioGroup = ({
  prefix = 'radio',
  legend = 'Select one mission type',
  items = [],
  tile = false,
  horizontal = false,
} = {}) => {
  const wrapper = tile ? '<form class="usa-form">' : '';
  const wrapperClose = tile ? '</form>' : '';
  const itemsHtml = items
    .map((item) =>
      radioItem(prefix, item.value, item.label, {
        checked: item.checked,
        disabled: item.disabled,
        tile,
        description: item.description,
      }),
    )
    .join('');

  return `
    ${wrapper}
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">${legend}</legend>
      ${horizontal ? `<div style="display: flex; gap: 24px;">${itemsHtml}</div>` : itemsHtml}
    </fieldset>
    ${wrapperClose}
  `;
};

const missionTypes = [
  { value: 'crewed', label: 'Crewed', checked: true },
  { value: 'robotic', label: 'Robotic' },
  { value: 'flyby', label: 'Flyby' },
];

// --- Guidance embeds (hidden from sidebar) ---

export const Default = {
  tags: ['!dev'],
  render: () =>
    radioGroup({
      prefix: 'default',
      items: missionTypes,
    }),
};

export const Horizontal = {
  tags: ['!dev'],
  render: () =>
    radioGroup({
      prefix: 'horiz',
      legend: 'Label',
      horizontal: true,
      items: [
        { value: 'yes', label: 'Yes', checked: true },
        { value: 'no', label: 'No' },
      ],
    }),
};

export const States = {
  tags: ['!dev'],
  render: () =>
    radioGroup({
      prefix: 'states',
      legend: 'Radio button states',
      items: [
        { value: 'default', label: 'Default' },
        { value: 'selected', label: 'Selected', checked: true },
        { value: 'disabled', label: 'Disabled', disabled: true },
        { value: 'disabled-checked', label: 'Disabled + selected', disabled: true, checked: true },
      ],
    }),
};

export const Tiles = {
  tags: ['!dev'],
  render: () =>
    radioGroup({
      prefix: 'tiles',
      legend: 'Select destination',
      tile: true,
      items: [
        { value: 'moon', label: 'Moon', checked: true },
        { value: 'mars', label: 'Mars', description: 'Red planet exploration' },
        { value: 'disabled', label: 'Disabled tile', disabled: true },
      ],
    }),
};

export const WithError = {
  tags: ['!dev'],
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Select a destination</legend>
      ${radioItem('err', 'moon', 'Moon')}
      ${radioItem('err', 'mars', 'Mars')}
      <span class="usa-error-message" role="alert">Please select a destination</span>
    </fieldset>
  `,
};

// --- Palette accessibility tests (hidden from sidebar) ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(States.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(States.render, 'hover'),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(States.render, 'focus-visible'),
};

// --- Playground (visible in sidebar) ---

export const Playground = {
  name: 'Playground',
  argTypes: {
    legend: {
      control: 'text',
      description: 'Group label above the radio buttons',
    },
    itemCount: {
      control: { type: 'range', min: 2, max: 6, step: 1 },
      description: 'Number of radio button options',
    },
    tile: {
      control: 'boolean',
      description: 'Use tile variant with larger touch targets',
    },
    horizontal: {
      control: 'boolean',
      description: 'Lay out options horizontally (only for 2–3 short options)',
    },
  },
  args: {
    legend: 'Select one mission type',
    itemCount: 3,
    tile: false,
    horizontal: false,
  },
  render: (args) => {
    const allItems = [
      { value: 'crewed', label: 'Crewed', checked: true },
      { value: 'robotic', label: 'Robotic' },
      { value: 'flyby', label: 'Flyby' },
      { value: 'orbiter', label: 'Orbiter' },
      { value: 'lander', label: 'Lander' },
      { value: 'rover', label: 'Rover' },
    ];

    return radioGroup({
      prefix: 'playground',
      legend: args.legend,
      tile: args.tile,
      horizontal: args.horizontal,
      items: allItems.slice(0, args.itemCount),
    });
  },
};
