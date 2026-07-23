// ============================================================
// Radio Button Stories — @nasa-hds/core
// CSS: components/_form.scss
//
// Sidebar structure:
//   Guidance   — RadioButton.mdx
//   Stories    — Default, Horizontal, Tiles, All Variants
//              (visible in sidebar)
//
// Radio button errors are group-level, not field-level. The
// error message sits after all radio items inside the fieldset.
// Each radio input references the error via aria-describedby.
// Legacy USWDS order is documented in Form.mdx
// (Components/Form/Guidance#legacy-uswds-support).
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Radio Button',
};

// --- Helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

const radioItem = (prefix, value, labelText, opts = {}) => {
  const { checked = false, disabled = false, tile = false, description = '' } = opts;
  const inputClass = tile ? 'usa-radio__input usa-radio__input--tile' : 'usa-radio__input';
  const id = `${prefix}-${value}`;
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

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
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

export const AllVariants = {
  name: 'All Variants',
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Default')}
        <div style="margin-top: 0.5rem;">
          ${radioGroup({
            prefix: 'av-default',
            legend: 'Radio button states',
            items: stateItems,
          })}
        </div>
      </div>
      <div>
        ${label('Horizontal')}
        <div style="margin-top: 0.5rem;">
          ${radioGroup({
            prefix: 'av-horiz',
            legend: 'Label',
            horizontal: true,
            items: [
              { value: 'yes', text: 'Yes', checked: true },
              { value: 'no', text: 'No' },
            ],
          })}
        </div>
      </div>
      <div>
        ${label('Tiles')}
        <div style="margin-top: 0.5rem;">
          ${radioGroup({
            prefix: 'av-tiles',
            legend: 'Select destination',
            tile: true,
            items: tileItems,
          })}
        </div>
      </div>
<div>
        ${label('Error')}
        <div style="margin-top: 0.5rem;">
          <fieldset class="usa-fieldset">
            <legend class="usa-legend">Select a destination</legend>
            <div class="usa-radio">
              <input
                class="usa-radio__input"
                id="av-err-moon"
                type="radio"
                name="av-err"
                value="moon"
                aria-describedby="av-err-group-error"
              />
              <label class="usa-radio__label" for="av-err-moon">Moon</label>
            </div>
            <div class="usa-radio">
              <input
                class="usa-radio__input"
                id="av-err-mars"
                type="radio"
                name="av-err"
                value="mars"
                aria-invalid="true"
                aria-describedby="av-err-group-error"
              />
              <label class="usa-radio__label" for="av-err-mars">Mars</label>
            </div>
            <span class="usa-error-message" id="av-err-group-error" role="alert">Please select a destination</span>
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
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="err-moon"
          type="radio"
          name="err"
          value="moon"
          aria-describedby="err-group-error"
        />
        <label class="usa-radio__label" for="err-moon">Moon</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="err-mars"
          type="radio"
          name="err"
          value="mars"
          aria-invalid="true"
          aria-describedby="err-group-error"
        />
        <label class="usa-radio__label" for="err-mars">Mars</label>
      </div>
      <span class="usa-error-message" id="err-group-error" role="alert">Please select a destination</span>
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

export const FocusRadio = {
  name: 'Focus [radio]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () =>
    radioGroup({
      prefix: 'focus',
      legend: 'Select one mission type',
      items: [
        { value: 'crewed', text: 'Crewed', checked: true },
        { value: 'robotic', text: 'Robotic' },
      ],
    }),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const radio = canvas.getByRole('radio', { name: 'Crewed' });
    await expect(radio).toHaveFocus();
  },
};
