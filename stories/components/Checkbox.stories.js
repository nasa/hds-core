// ============================================================
// Checkbox Stories — @nasa/hds-core
// Covers §5.0, §5.6
//
// HDS Figma: Checkbox.pdf
// USWDS: https://designsystem.digital.gov/components/checkbox/
//
// Sidebar structure:
//   Guidance   — Checkbox.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Default, Tiles (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

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
          checkboxItem(prefix, item.value, item.text, {
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

// Hoisted to module scope — avoids label: parser bug in sidebar stories
const missionItems = [
  { value: 'artemis', text: 'Artemis' },
  { value: 'commercial-crew', text: 'Commercial Crew', checked: true },
  { value: 'curiosity', text: 'Curiosity Mars Rover' },
  { value: 'hubble', text: 'Hubble Space Telescope' },
  { value: 'jwst', text: 'James Webb Space Telescope' },
];

const stateItems = [
  { value: 'default', text: 'Default' },
  { value: 'selected', text: 'Selected', checked: true },
  { value: 'disabled', text: 'Disabled', disabled: true },
  { value: 'disabled-checked', text: 'Disabled + selected', disabled: true, checked: true },
];

const tileItems = [
  { value: 'pdf', text: 'PDF', checked: true, description: 'Download as a PDF document' },
  { value: 'csv', text: 'CSV', description: 'Download as a spreadsheet' },
  { value: 'disabled', text: 'Disabled tile', disabled: true },
];

// Shared argTypes for both sidebar stories
const sharedArgTypes = {
  legend: {
    control: 'text',
    description: 'Group label above the checkbox list',
  },
  itemCount: {
    control: { type: 'range', min: 2, max: 5, step: 1 },
    description: 'Number of checkbox options',
  },
  firstChecked: {
    control: 'boolean',
    description: 'First item selected on load',
  },
};

// --- Stories (visible in sidebar) ---

export const Default = {
  args: {
    legend: 'Missions',
    itemCount: 5,
    firstChecked: false,
  },
  argTypes: sharedArgTypes,
  render: (args = {}) => {
    const { legend = 'Missions', itemCount = 5, firstChecked = false } = args;
    const items = missionItems.slice(0, itemCount).map((item, i) => ({
      ...item,
      checked: i === 0 ? firstChecked : item.checked,
    }));

    return checkboxGroup({
      prefix: 'default',
      legend,
      items,
    });
  },
};

export const Tiles = {
  args: {
    legend: 'Select format',
    itemCount: 3,
    firstChecked: false,
  },
  argTypes: sharedArgTypes,
  render: (args = {}) => {
    const { legend = 'Select format', itemCount = 3, firstChecked = false } = args;
    const items = tileItems.slice(0, itemCount).map((item, i) => ({
      ...item,
      checked: i === 0 ? firstChecked : item.checked,
    }));

    return checkboxGroup({
      prefix: 'tiles',
      legend,
      tile: true,
      items,
    });
  },
};

// --- Guidance embeds (MDX only) ---

export const States = {
  tags: ['!dev'],
  render: () =>
    checkboxGroup({
      prefix: 'states',
      legend: 'Checkbox states',
      items: stateItems,
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
