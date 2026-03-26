// ============================================================
// Radio Button Stories — @nasa/hds-core
// Covers §5.0, §5.7
//
// HDS Figma: Radio Buttons.pdf
// USWDS: https://designsystem.digital.gov/components/radio-buttons/
//
// Sidebar structure:
//   Components / Radio Button / Guidance  — RadioButton.mdx (future)
//   Components / Radio Button / Playground — TBD
// ============================================================

export default {
  title: 'Components/Radio Button',
};

// --- Default (vertical, with default selection per HDS guidance) ---

export const Default = {
  name: 'Default',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Select one mission type</legend>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-crewed"
          type="radio"
          name="mission-type"
          value="crewed"
          checked="checked"
        />
        <label class="usa-radio__label" for="radio-crewed">Crewed</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-robotic"
          type="radio"
          name="mission-type"
          value="robotic"
        />
        <label class="usa-radio__label" for="radio-robotic">Robotic</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-flyby"
          type="radio"
          name="mission-type"
          value="flyby"
        />
        <label class="usa-radio__label" for="radio-flyby">Flyby</label>
      </div>
    </fieldset>
  `,
};

// --- Horizontal (Yes/No — matches HDS Figma example) ---

export const Horizontal = {
  name: 'Horizontal',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Label</legend>
      <div style="display: flex; gap: 24px;">
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="radio-yes"
            type="radio"
            name="yes-no"
            value="yes"
            checked="checked"
          />
          <label class="usa-radio__label" for="radio-yes">Yes</label>
        </div>
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="radio-no"
            type="radio"
            name="yes-no"
            value="no"
          />
          <label class="usa-radio__label" for="radio-no">No</label>
        </div>
      </div>
    </fieldset>
  `,
};

// --- All states ---

export const States = {
  name: 'States',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Radio button states</legend>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-state-default"
          type="radio"
          name="states"
          value="default"
        />
        <label class="usa-radio__label" for="radio-state-default">Default</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-state-selected"
          type="radio"
          name="states"
          value="selected"
          checked="checked"
        />
        <label class="usa-radio__label" for="radio-state-selected">Selected</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-state-disabled"
          type="radio"
          name="states-disabled"
          value="disabled"
          disabled="disabled"
        />
        <label class="usa-radio__label" for="radio-state-disabled">Disabled</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-state-disabled-checked"
          type="radio"
          name="states-disabled-checked"
          value="disabled-checked"
          disabled="disabled"
          checked="checked"
        />
        <label class="usa-radio__label" for="radio-state-disabled-checked">Disabled + selected</label>
      </div>
    </fieldset>
  `,
};

// --- With error ---

export const WithError = {
  name: 'With error',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Select a destination</legend>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-err-moon"
          type="radio"
          name="destination-err"
          value="moon"
        />
        <label class="usa-radio__label" for="radio-err-moon">Moon</label>
      </div>
      <div class="usa-radio">
        <input
          class="usa-radio__input"
          id="radio-err-mars"
          type="radio"
          name="destination-err"
          value="mars"
        />
        <label class="usa-radio__label" for="radio-err-mars">Mars</label>
      </div>
      <span class="usa-error-message" role="alert">Please select a destination</span>
    </fieldset>
  `,
};

// --- Tiles ---

export const Tiles = {
  name: 'Tiles',
  render: () => `
    <form class="usa-form">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Select destination</legend>
        <div class="usa-radio">
          <input
            class="usa-radio__input usa-radio__input--tile"
            id="radio-tile-moon"
            type="radio"
            name="destination-tile"
            value="moon"
            checked="checked"
          />
          <label class="usa-radio__label" for="radio-tile-moon">Moon</label>
        </div>
        <div class="usa-radio">
          <input
            class="usa-radio__input usa-radio__input--tile"
            id="radio-tile-mars"
            type="radio"
            name="destination-tile"
            value="mars"
          />
          <label class="usa-radio__label" for="radio-tile-mars">
            Mars
            <span class="usa-checkbox__label-description">Red planet exploration</span>
          </label>
        </div>
        <div class="usa-radio">
          <input
            class="usa-radio__input usa-radio__input--tile"
            id="radio-tile-disabled"
            type="radio"
            name="destination-tile"
            value="disabled"
            disabled="disabled"
          />
          <label class="usa-radio__label" for="radio-tile-disabled">
            Disabled tile
          </label>
        </div>
      </fieldset>
    </form>
  `,
};
