// ============================================================
// Select Stories — @nasa/hds-core
// Covers §5.1, §5.2, §5.3, §5.8
//
// HDS Figma: Text and Select Fields.pdf, Dropdown Menus.pdf
// USWDS: https://designsystem.digital.gov/components/select/
//
// Sidebar structure:
//   Components / Select / Guidance  — Select.mdx (future)
//   Components / Select / Playground — TBD
// ============================================================

export default {
  title: 'Components/Select',
};

// --- Default ---

export const Default = {
  name: 'Default',
  render: () => `
    <form class="usa-form">
      <div class="usa-form-group">
        <label class="usa-label" for="select-default">Topic</label>
        <select class="usa-select" name="select-default" id="select-default">
          <option value>- Select -</option>
          <option value="humans">Humans in Space</option>
          <option value="moon">Moon to Mars</option>
          <option value="earth">Earth</option>
          <option value="solar">Solar System</option>
          <option value="universe">Universe</option>
        </select>
        <span class="usa-hint">Help text (optional)</span>
      </div>
    </form>
  `,
};

// --- With selected value ---

export const WithValue = {
  name: 'With value',
  render: () => `
    <form class="usa-form">
      <div class="usa-form-group">
        <label class="usa-label" for="select-value">Topic</label>
        <select class="usa-select" name="select-value" id="select-value">
          <option value>- Select -</option>
          <option value="humans" selected>Humans in Space</option>
          <option value="moon">Moon to Mars</option>
          <option value="earth">Earth</option>
          <option value="solar">Solar System</option>
          <option value="universe">Universe</option>
        </select>
        <span class="usa-hint">Help text (optional)</span>
      </div>
    </form>
  `,
};

// --- With help text linked via aria-describedby ---

export const WithHelpText = {
  name: 'With help text',
  render: () => `
    <form class="usa-form">
      <div class="usa-form-group">
        <label class="usa-label" for="select-help">Mission type</label>
        <select class="usa-select" name="select-help" id="select-help" aria-describedby="select-help-hint">
          <option value>- Select -</option>
          <option value="crewed">Crewed</option>
          <option value="robotic">Robotic</option>
          <option value="flyby">Flyby</option>
        </select>
        <span class="usa-hint" id="select-help-hint">Choose the primary mission category</span>
      </div>
    </form>
  `,
};

// --- Disabled ---

export const Disabled = {
  name: 'Disabled',
  render: () => `
    <form class="usa-form">
      <div class="usa-form-group usa-form-group--disabled">
        <label class="usa-label" for="select-disabled">Topic</label>
        <select class="usa-select" name="select-disabled" id="select-disabled" disabled>
          <option value>- Select -</option>
        </select>
        <span class="usa-hint">Help text (optional)</span>
      </div>
    </form>
  `,
};

// --- Error ---

export const Error = {
  name: 'Error',
  render: () => `
    <form class="usa-form">
      <div class="usa-form-group usa-form-group--error">
        <label class="usa-label" for="select-error">Topic</label>
        <select class="usa-select usa-input--error" name="select-error" id="select-error" aria-describedby="select-error-hint select-error-message">
          <option value>- Select -</option>
          <option value="humans">Humans in Space</option>
          <option value="moon">Moon to Mars</option>
          <option value="earth">Earth</option>
        </select>
        <span class="usa-hint" id="select-error-hint">Help text (optional)</span>
        <span class="usa-error-message" id="select-error-message" role="alert">Error explanation text</span>
      </div>
    </form>
  `,
};

// --- Many options (7+ triggers select over radio per HDS guidance) ---

export const ManyOptions = {
  name: 'Many options (7+)',
  render: () => `
    <form class="usa-form">
      <div class="usa-form-group">
        <label class="usa-label" for="select-many">NASA center</label>
        <select class="usa-select" name="select-many" id="select-many">
          <option value>- Select -</option>
          <option value="ames">Ames Research Center</option>
          <option value="armstrong">Armstrong Flight Research Center</option>
          <option value="glenn">Glenn Research Center</option>
          <option value="goddard">Goddard Space Flight Center</option>
          <option value="jpl">Jet Propulsion Laboratory</option>
          <option value="johnson">Johnson Space Center</option>
          <option value="kennedy">Kennedy Space Center</option>
          <option value="langley">Langley Research Center</option>
          <option value="marshall">Marshall Space Flight Center</option>
          <option value="stennis">Stennis Space Center</option>
        </select>
        <span class="usa-hint">Use a select field when there are 7 or more options</span>
      </div>
    </form>
  `,
};
