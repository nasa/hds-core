// ============================================================
// Radio Button Stories — @nasa/hds-core
// Covers §5.0, §5.7
//
// HDS Figma: Radio Buttons.pdf
// USWDS: https://designsystem.digital.gov/components/radio-buttons/
//
// Sidebar structure:
//   Guidance   — RadioButton.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Default, Tiles, Horizontal (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

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
      radioItem(prefix, item.value, item.text, {
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

// Hoisted to module scope — avoids label: parser bug in sidebar stories
const missionTypes = [
  { value: 'crewed', text: 'Crewed', checked: true },
  { value: 'robotic', text: 'Robotic' },
  { value: 'flyby', text: 'Flyby' },
  { value: 'orbiter', text: 'Orbiter' },
  { value: 'lander', text: 'Lander' },
  { value: 'rover', text: 'Rover' },
];

const tileItems = [
  { value: 'moon', text: 'Moon', checked: true },
  { value: 'mars', text: 'Mars', description: 'Red planet exploration' },
  { value: 'disabled', text: 'Disabled tile', disabled: true },
];

const stateItems = [
  { value: 'default', text: 'Default' },
  { value: 'selected', text: 'Selected', checked: true },
  { value: 'disabled', text: 'Disabled', disabled: true },
  { value: 'disabled-checked', text: 'Disabled + selected', disabled: true, checked: true },
];

// Shared argTypes
const sharedArgTypes = {
  legend: {
    control: 'text',
    description: 'Group label above the radio buttons',
  },
  itemCount: {
    control: { type: 'range', min: 2, max: 6, step: 1 },
    description: 'Number of radio button options',
  },
};

// --- Stories (visible in sidebar) ---

export const Default = {
  args: {
    legend: 'Select one mission type',
    itemCount: 3,
  },
  argTypes: sharedArgTypes,
  render: (args = {}) => {
    const { legend = 'Select one mission type', itemCount = 3 } = args;
    return radioGroup({
      prefix: 'default',
      legend,
      items: missionTypes.slice(0, itemCount),
    });
  },
};

export const Tiles = {
  args: {
    legend: 'Select destination',
    itemCount: 3,
  },
  argTypes: sharedArgTypes,
  render: (args = {}) => {
    const { legend = 'Select destination', itemCount = 3 } = args;
    return radioGroup({
      prefix: 'tiles',
      legend,
      tile: true,
      items: tileItems.slice(0, itemCount),
    });
  },
};

export const Horizontal = {
  args: {
    legend: 'Label',
  },
  argTypes: {
    legend: {
      control: 'text',
      description: 'Group label above the radio buttons',
    },
  },
  render: (args = {}) => {
    const { legend = 'Label' } = args;
    return radioGroup({
      prefix: 'horiz',
      legend,
      horizontal: true,
      items: [
        { value: 'yes', text: 'Yes', checked: true },
        { value: 'no', text: 'No' },
      ],
    });
  },
};

// --- Guidance embeds (MDX only) ---

export const States = {
  tags: ['!dev'],
  render: () =>
    radioGroup({
      prefix: 'states',
      legend: 'Radio button states',
      items: stateItems,
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

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(States.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(States.render),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(States.render),
};
