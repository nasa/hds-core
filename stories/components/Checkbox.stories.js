// ============================================================
// Checkbox Stories — @nasa-hds/core
// CSS: components/_form.scss
//
// Sidebar structure:
//   Guidance   — Checkbox.mdx
//   Stories    — Default, Tiles, All Variants (visible in sidebar)
//
// Checkbox errors are group-level, not field-level. The error
// message sits after all checkbox items inside the fieldset.
// Each checkbox references the error via aria-describedby.
// Legacy USWDS order is documented in Form.mdx
// (Components/Form/Guidance#legacy-uswds-support).
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Checkbox',
};

// --- Helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

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

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
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

export const AllVariants = {
  name: 'All Variants',
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Default')}
        <div style="margin-top: 0.5rem;">
          ${checkboxGroup({
            prefix: 'av-default',
            legend: 'Checkbox states',
            items: stateItems,
          })}
        </div>
      </div>
      <div>
        ${label('Tiles')}
        <div style="margin-top: 0.5rem;">
          ${checkboxGroup({
            prefix: 'av-tiles',
            legend: 'Select format',
            tile: true,
            items: tileItems,
          })}
        </div>
      </div>
      <div>
        ${label('Error')}
        <div style="margin-top: 0.5rem;">
          <fieldset class="usa-fieldset">
            <legend class="usa-legend">Select areas of interest</legend>
            <div class="usa-checkbox">
              <input
                class="usa-checkbox__input"
                id="av-err-earth"
                type="checkbox"
                name="av-err"
                value="earth"
                aria-describedby="av-err-group-error"
              />
              <label class="usa-checkbox__label" for="av-err-earth">Earth Science</label>
            </div>
            <div class="usa-checkbox">
              <input
                class="usa-checkbox__input"
                id="av-err-planetary"
                type="checkbox"
                name="av-err"
                value="planetary"
                aria-invalid="true"
                aria-describedby="av-err-group-error"
              />
              <label class="usa-checkbox__label" for="av-err-planetary">Planetary Science</label>
            </div>
            <span class="usa-error-message" id="av-err-group-error" role="alert">Please select at least one area of interest</span>
          </fieldset>
        </div>
      </div>
    </div>
  `,
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
    <fieldset class="usa-fieldset" aria-describedby="err-group-error">
      <legend class="usa-legend">Select areas of interest</legend>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="err-earth"
          type="checkbox"
          name="err"
          value="earth"
          aria-describedby="err-group-error"
        />
        <label class="usa-checkbox__label" for="err-earth">Earth Science</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="err-planetary"
          type="checkbox"
          name="err"
          value="planetary"
          aria-invalid="true"
          aria-describedby="err-group-error"
        />
        <label class="usa-checkbox__label" for="err-planetary">Planetary Science</label>
      </div>
      <span class="usa-error-message" id="err-group-error" role="alert">Please select at least one area of interest</span>
    </fieldset>
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

export const FocusCheckbox = {
  name: 'Focus [checkbox]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () =>
    checkboxGroup({
      prefix: 'focus',
      legend: 'Missions',
      items: [
        { value: 'artemis', text: 'Artemis' },
        { value: 'commercial-crew', text: 'Commercial Crew' },
      ],
    }),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const checkbox = canvas.getByRole('checkbox', { name: 'Artemis' });
    await expect(checkbox).toHaveFocus();
  },
};
