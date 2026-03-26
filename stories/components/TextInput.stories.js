// ============================================================
// Text Input Stories — @nasa/hds-core
// Covers §5.1, §5.2, §5.3, §5.4, §5.5, §5.8, §5.9 (partial)
//
// HDS Figma: Text and Select Fields.pdf
// USWDS: https://designsystem.digital.gov/components/text-input/
//
// Sidebar structure:
//   Components / Text Input / Guidance  — TextInput.mdx (future)
//   Components / Text Input / Playground — TBD
// ============================================================

export default {
  title: 'Components/Text Input',
};

// --- Default ---

export const Default = {
  name: 'Default',
  render: () => `
    <div class="usa-form-group">
      <label class="usa-label" for="input-default">Text input label</label>
      <input class="usa-input" id="input-default" name="input-default" type="text" />
      <span class="usa-hint">Help text (optional)</span>
    </div>
  `,
};

// --- With placeholder ---

export const Placeholder = {
  name: 'Placeholder',
  render: () => `
    <div class="usa-form-group">
      <label class="usa-label" for="input-placeholder">Text input label</label>
      <input class="usa-input" id="input-placeholder" name="input-placeholder" type="text" placeholder="e.g., Artemis I" />
      <span class="usa-hint">Help text (optional)</span>
    </div>
  `,
};

// --- With value ---

export const WithValue = {
  name: 'With value',
  render: () => `
    <div class="usa-form-group">
      <label class="usa-label" for="input-value">Text input label</label>
      <input class="usa-input" id="input-value" name="input-value" type="text" value="James Webb Space Telescope" />
      <span class="usa-hint">Help text (optional)</span>
    </div>
  `,
};

// --- With help text linked via aria-describedby ---

export const WithHelpText = {
  name: 'With help text',
  render: () => `
    <div class="usa-form-group">
      <label class="usa-label" for="input-help">Email address</label>
      <input class="usa-input" id="input-help" name="input-help" type="email" aria-describedby="input-help-hint" />
      <span class="usa-hint" id="input-help-hint">e.g., mission-lead@nasa.gov</span>
    </div>
  `,
};

// --- Disabled ---

export const Disabled = {
  name: 'Disabled',
  render: () => `
    <div class="usa-form-group usa-form-group--disabled">
      <label class="usa-label" for="input-disabled">Text input label</label>
      <input class="usa-input" id="input-disabled" name="input-disabled" type="text" value="Cannot edit" disabled />
      <span class="usa-hint" id="input-disabled-hint">Help text (optional)</span>
    </div>
  `,
};

// --- Error ---

export const Error = {
  name: 'Error',
  render: () => `
    <div class="usa-form-group usa-form-group--error">
      <label class="usa-label" for="input-error">Text input label</label>
      <input class="usa-input usa-input--error" id="input-error" name="input-error" type="text" aria-describedby="input-error-hint input-error-message" />
      <span class="usa-hint" id="input-error-hint">Help text (optional)</span>
      <span class="usa-error-message" id="input-error-message" role="alert">Error explanation text</span>
    </div>
  `,
};

// --- Success ---

export const Success = {
  name: 'Success',
  render: () => `
    <div class="usa-form-group">
      <label class="usa-label" for="input-success">Text input label</label>
      <input class="usa-input usa-input--success" id="input-success" name="input-success" type="text" value="james.green@nasa.gov" />
      <span class="usa-hint">Help text (optional)</span>
    </div>
  `,
};

// --- Textarea ---

export const Textarea = {
  name: 'Textarea',
  render: () => `
    <div class="usa-form-group">
      <label class="usa-label" for="textarea-default">Textarea label</label>
      <textarea class="usa-textarea" id="textarea-default" name="textarea-default"></textarea>
      <span class="usa-hint">Help text (optional)</span>
    </div>
  `,
};

// --- Input widths ---

export const Widths = {
  name: 'Widths',
  render: () => `
    <div class="usa-form-group">
      <label class="usa-label" for="width-2xs">Width 2xs (5ex)</label>
      <input class="usa-input usa-input--2xs" id="width-2xs" name="width-2xs" type="text" />
    </div>
    <div class="usa-form-group">
      <label class="usa-label" for="width-xs">Width xs (9ex)</label>
      <input class="usa-input usa-input--xs" id="width-xs" name="width-xs" type="text" />
    </div>
    <div class="usa-form-group">
      <label class="usa-label" for="width-sm">Width sm (13ex)</label>
      <input class="usa-input usa-input--sm" id="width-sm" name="width-sm" type="text" />
    </div>
    <div class="usa-form-group">
      <label class="usa-label" for="width-md">Width md (20ex)</label>
      <input class="usa-input usa-input--md" id="width-md" name="width-md" type="text" />
    </div>
    <div class="usa-form-group">
      <label class="usa-label" for="width-lg">Width lg (30ex)</label>
      <input class="usa-input usa-input--lg" id="width-lg" name="width-lg" type="text" />
    </div>
    <div class="usa-form-group">
      <label class="usa-label" for="width-xl">Width xl (40ex)</label>
      <input class="usa-input usa-input--xl" id="width-xl" name="width-xl" type="text" />
    </div>
    <div class="usa-form-group">
      <label class="usa-label" for="width-2xl">Width 2xl (50ex)</label>
      <input class="usa-input usa-input--2xl" id="width-2xl" name="width-2xl" type="text" />
    </div>
  `,
};
