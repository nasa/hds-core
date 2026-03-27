// ============================================================
// Checkbox Stories — @nasa/hds-core
// Covers §5.0, §5.6
//
// HDS Figma: Checkbox.pdf
// USWDS: https://designsystem.digital.gov/components/checkbox/
//
// Sidebar structure:
//   Components / Checkbox / Guidance  — Checkbox.mdx
//   Components / Checkbox / Playground — interactive story with controls
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Checkbox',
};

// --- Helpers ---

const label = (text) => `<p class="hds-label" style="margin-bottom: 0.5rem">${text}</p>`;

const checkboxItem = (prefix, value, labelText, opts = {}) => {
  const { checked = false, disabled = false, tile = false, description = '' } = opts;
  const inputClass = tile ? 'usa-checkbox__input usa-checkbox__input--tile' : 'usa-checkbox__input';
  const id = `${prefix}-${value}`;

  return `
    <div class="usa-checkbox">
      <input
        class="${inputClass}"
        id="${id}"
        type="checkbox"
        name="${prefix}"
        value="${value}"
        ${checked ? 'checked="checked"' : ''}
        ${disabled ? 'disabled="disabled"' : ''}
      />
      <label class="usa-checkbox__label" for="${id}">${labelText}${
        description ? `<span class="usa-checkbox__label-description">${description}</span>` : ''
      }</label>
    </div>
  `;
};

const checkboxGroup = ({ prefix = 'check', legend = 'Missions', items = [], tile = false } = {}) => {
  const wrapper = tile ? '<form class="usa-form">' : '';
  const wrapperClose = tile ? '</form>' : '';

  return `
    ${wrapper}
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">${legend}</legend>
      ${items
        .map((item) =>
          checkboxItem(prefix, item.value, item.label, {
            checked: item.checked,
            disabled: item.disabled,
            tile,
            description: item.description,
          }),
        )
        .join('')}
    </fieldset>
    ${wrapperClose}
  `;
};

const missionItems = [
  { value: 'artemis', label: 'Artemis' },
  { value: 'commercial-crew', label: 'Commercial Crew', checked: true },
  { value: 'curiosity', label: 'Curiosity Mars Rover' },
  { value: 'hubble', label: 'Hubble Space Telescope' },
  { value: 'jwst', label: 'James Webb Space Telescope' },
];

// --- Guidance embeds (hidden from sidebar) ---

export const Default = {
  tags: ['!dev'],
  render: () =>
    checkboxGroup({
      prefix: 'default',
      legend: 'Missions',
      items: missionItems,
    }),
};

export const States = {
  tags: ['!dev'],
  render: () =>
    checkboxGroup({
      prefix: 'states',
      legend: 'Checkbox states',
      items: [
        { value: 'default', label: 'Default' },
        { value: 'selected', label: 'Selected', checked: true },
        { value: 'disabled', label: 'Disabled', disabled: true },
        { value: 'disabled-checked', label: 'Disabled + selected', disabled: true, checked: true },
      ],
    }),
};

export const WithError = {
  tags: ['!dev'],
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Select areas of interest</legend>
      ${checkboxItem('err', 'earth', 'Earth Science')}
      ${checkboxItem('err', 'planetary', 'Planetary Science')}
      <span class="usa-error-message" role="alert">Please select at least one area of interest</span>
    </fieldset>
  `,
};

export const Tiles = {
  tags: ['!dev'],
  render: () =>
    checkboxGroup({
      prefix: 'tiles',
      legend: 'Select format',
      tile: true,
      items: [
        { value: 'pdf', label: 'PDF', checked: true, description: 'Download as a PDF document' },
        { value: 'csv', label: 'CSV', description: 'Download as a spreadsheet' },
        { value: 'disabled', label: 'Disabled tile', disabled: true },
      ],
    }),
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
      description: 'Group label above the checkbox list',
    },
    itemCount: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of checkbox options',
    },
    tile: {
      control: 'boolean',
      description: 'Use tile variant with larger touch targets',
    },
    firstChecked: {
      control: 'boolean',
      description: 'First item selected on load',
    },
  },
  args: {
    legend: 'Missions',
    itemCount: 5,
    tile: false,
    firstChecked: false,
  },
  render: (args) => {
    const items = missionItems.slice(0, args.itemCount).map((item, i) => ({
      ...item,
      checked: i === 0 ? args.firstChecked : false,
    }));

    return checkboxGroup({
      prefix: 'playground',
      legend: args.legend,
      tile: args.tile,
      items,
    });
  },
};
