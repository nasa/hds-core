// ============================================================
// Checkbox Stories — @nasa/hds-core
// Covers §5.0, §5.6
//
// HDS Figma: Checkbox.pdf
// USWDS: https://designsystem.digital.gov/components/checkbox/
//
// Sidebar structure:
//   Components / Checkbox / Guidance  — Checkbox.mdx (future)
//   Components / Checkbox / Playground — TBD
// ============================================================

export default {
  title: 'Components/Checkbox',
};

// --- Default (with one selected) ---

export const Default = {
  name: 'Default',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Missions</legend>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-artemis"
          type="checkbox"
          name="missions"
          value="artemis"
        />
        <label class="usa-checkbox__label" for="check-artemis">Artemis</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-crew"
          type="checkbox"
          name="missions"
          value="commercial-crew"
          checked="checked"
        />
        <label class="usa-checkbox__label" for="check-crew">Commercial Crew</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-curiosity"
          type="checkbox"
          name="missions"
          value="curiosity"
        />
        <label class="usa-checkbox__label" for="check-curiosity">Curiosity Mars Rover</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-hubble"
          type="checkbox"
          name="missions"
          value="hubble"
        />
        <label class="usa-checkbox__label" for="check-hubble">Hubble Space Telescope</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-jwst"
          type="checkbox"
          name="missions"
          value="jwst"
        />
        <label class="usa-checkbox__label" for="check-jwst">James Webb Space Telescope</label>
      </div>
    </fieldset>
  `,
};

// --- All states ---

export const States = {
  name: 'States',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Checkbox states</legend>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-state-default"
          type="checkbox"
          name="states"
          value="default"
        />
        <label class="usa-checkbox__label" for="check-state-default">Default</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-state-selected"
          type="checkbox"
          name="states"
          value="selected"
          checked="checked"
        />
        <label class="usa-checkbox__label" for="check-state-selected">Selected</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-state-disabled"
          type="checkbox"
          name="states"
          value="disabled"
          disabled="disabled"
        />
        <label class="usa-checkbox__label" for="check-state-disabled">Disabled</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-state-disabled-checked"
          type="checkbox"
          name="states"
          value="disabled-checked"
          disabled="disabled"
          checked="checked"
        />
        <label class="usa-checkbox__label" for="check-state-disabled-checked">Disabled + selected</label>
      </div>
    </fieldset>
  `,
};

// --- With error ---

export const WithError = {
  name: 'With error',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Select areas of interest</legend>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-err-earth"
          type="checkbox"
          name="interests-err"
          value="earth"
        />
        <label class="usa-checkbox__label" for="check-err-earth">Earth Science</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-err-planetary"
          type="checkbox"
          name="interests-err"
          value="planetary"
        />
        <label class="usa-checkbox__label" for="check-err-planetary">Planetary Science</label>
      </div>
      <span class="usa-error-message" role="alert">Please select at least one area of interest</span>
    </fieldset>
  `,
};

// --- Tiles ---

export const Tiles = {
  name: 'Tiles',
  render: () => `
    <form class="usa-form">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Select format</legend>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input usa-checkbox__input--tile"
            id="check-tile-pdf"
            type="checkbox"
            name="format"
            value="pdf"
            checked="checked"
          />
          <label class="usa-checkbox__label" for="check-tile-pdf">
            PDF
            <span class="usa-checkbox__label-description">Download as a PDF document</span>
          </label>
        </div>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input usa-checkbox__input--tile"
            id="check-tile-csv"
            type="checkbox"
            name="format"
            value="csv"
          />
          <label class="usa-checkbox__label" for="check-tile-csv">
            CSV
            <span class="usa-checkbox__label-description">Download as a spreadsheet</span>
          </label>
        </div>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input usa-checkbox__input--tile"
            id="check-tile-disabled"
            type="checkbox"
            name="format"
            value="disabled"
            disabled="disabled"
          />
          <label class="usa-checkbox__label" for="check-tile-disabled">
            Disabled tile
          </label>
        </div>
      </fieldset>
    </form>
  `,
};

// --- In a filter panel (HDS Figma use case) ---

export const FilterPanel = {
  name: 'Filter panel',
  render: () => `
    <fieldset class="usa-fieldset">
      <legend class="usa-legend">Content type</legend>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-filter-articles"
          type="checkbox"
          name="content-type"
          value="articles"
          checked="checked"
        />
        <label class="usa-checkbox__label" for="check-filter-articles">Articles</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-filter-features"
          type="checkbox"
          name="content-type"
          value="features"
          checked="checked"
        />
        <label class="usa-checkbox__label" for="check-filter-features">Features</label>
      </div>
      <div class="usa-checkbox">
        <input
          class="usa-checkbox__input"
          id="check-filter-press"
          type="checkbox"
          name="content-type"
          value="press"
        />
        <label class="usa-checkbox__label" for="check-filter-press">Press Releases</label>
      </div>
    </fieldset>
  `,
};
