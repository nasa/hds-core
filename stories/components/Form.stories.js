// ============================================================
// Form Stories — @nasa-hds/core
// CSS: components/_form.scss
//
// Sidebar structure:
//   Guidance   — Form.mdx
//   Stories    — Required fields, Grouped sections, Mixed elements,
//               Validation flow
//
// Composed form patterns demonstrating multiple fields, fieldsets,
// validation flows, and form actions together. Individual element
// stories live in their own files:
//   TextInput.stories.js, Select.stories.js,
//   Checkbox.stories.js, RadioButton.stories.js
//
// Error state markup:
//   Recommended (HDS) — label > input > hint > error
//   Legacy (USWDS)    — label > error > input > hint
//   Both are supported. See ErrorLegacyMarkup story and the
//   Legacy USWDS support section in Form.mdx.
//
// TODO: ServerSideValidation error summary — style bulleted list
// with red bullets per Figma spec. Deferred pending CSS work on
// the summary block pattern.
// ============================================================

export default {
  title: 'Components/Form',
};

// --- Stories (visible in sidebar) ---

export const RequiredFields = {
  name: 'Required fields',
  render: () => `
    <form class="usa-form usa-form--large">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Mission registration</legend>
        <p class="usa-hint" style="margin-top: 0">
          Required fields are marked with an asterisk (<abbr title="required" class="usa-hint usa-hint--required">*</abbr>).
        </p>

        <div class="usa-form-group">
          <label class="usa-label" for="req-name">
            Mission name <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="req-name" name="req-name" type="text" required />
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="req-email">
            Contact email <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="req-email" name="req-email" type="email" required />
          <span class="usa-hint" id="req-email-hint">e.g., mission-lead@nasa.gov</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="req-nickname">Nickname (optional)</label>
          <input class="usa-input" id="req-nickname" name="req-nickname" type="text" />
        </div>
      </fieldset>
    </form>
  `,
};

export const GroupedSections = {
  name: 'Grouped sections',
  render: () => `
    <form class="usa-form usa-form--large">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend--large">Personal Information</legend>

        <div class="usa-form-group">
          <label class="usa-label" for="group-first">First name</label>
          <input class="usa-input" id="group-first" name="group-first" type="text" />
          <span class="usa-hint">Help text (optional)</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="group-last">Last name</label>
          <input class="usa-input" id="group-last" name="group-last" type="text" />
          <span class="usa-hint">Help text (optional)</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="group-title">Title</label>
          <input class="usa-input" id="group-title" name="group-title" type="text" />
          <span class="usa-hint">Help text (optional)</span>
        </div>
      </fieldset>

      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend--large">Contact Information</legend>

        <div class="usa-form-group">
          <label class="usa-label" for="group-email">Email address</label>
          <input class="usa-input" id="group-email" name="group-email" type="email" />
          <span class="usa-hint">Help text (optional)</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="group-phone">Phone number</label>
          <input class="usa-input" id="group-phone" name="group-phone" type="tel" />
          <span class="usa-hint">Help text (optional)</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="group-center">NASA center</label>
          <select class="usa-select" name="group-center" id="group-center">
            <option value>- Select -</option>
            <option value="goddard">Goddard Space Flight Center</option>
            <option value="johnson">Johnson Space Center</option>
            <option value="kennedy">Kennedy Space Center</option>
            <option value="jpl">Jet Propulsion Laboratory</option>
            <option value="marshall">Marshall Space Flight Center</option>
          </select>
          <span class="usa-hint">Help text (optional)</span>
        </div>
      </fieldset>

      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend--large">Account Information</legend>

        <div class="usa-form-group">
          <label class="usa-label" for="group-username">Username</label>
          <input class="usa-input" id="group-username" name="group-username" type="text" />
          <span class="usa-hint">Help text (optional)</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="group-password">Password</label>
          <input class="usa-input" id="group-password" name="group-password" type="password" />
          <span class="usa-hint">8 character minimum</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="group-confirm">Confirm password</label>
          <input class="usa-input" id="group-confirm" name="group-confirm" type="password" />
          <span class="usa-hint">Help text (optional)</span>
        </div>
      </fieldset>
    </form>
  `,
};

export const MixedElements = {
  name: 'Mixed elements',
  render: () => `
    <form class="usa-form usa-form--large">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend--large">Mission proposal</legend>
        <p class="usa-hint" style="margin-top: 0">
          Required fields are marked with an asterisk (<abbr title="required" class="usa-hint usa-hint--required">*</abbr>).
        </p>

        <div class="usa-form-group">
          <label class="usa-label" for="mix-name">
            Mission name <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input" id="mix-name" name="mix-name" type="text" required />
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="mix-type">
            Mission type <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <select class="usa-select" id="mix-type" name="mix-type" required>
            <option value>- Select -</option>
            <option value="crewed">Crewed</option>
            <option value="robotic">Robotic</option>
            <option value="flyby">Flyby</option>
          </select>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="mix-desc">Description (optional)</label>
          <textarea class="usa-textarea" id="mix-desc" name="mix-desc"></textarea>
        </div>
      </fieldset>

      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Areas of interest</legend>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="mix-earth"
            type="checkbox"
            name="mix-interests"
            value="earth"
          />
          <label class="usa-checkbox__label" for="mix-earth">Earth Science</label>
        </div>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="mix-planetary"
            type="checkbox"
            name="mix-interests"
            value="planetary"
          />
          <label class="usa-checkbox__label" for="mix-planetary">Planetary Science</label>
        </div>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="mix-astro"
            type="checkbox"
            name="mix-interests"
            value="astro"
          />
          <label class="usa-checkbox__label" for="mix-astro">Astrophysics</label>
        </div>
      </fieldset>

      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Mission category</legend>
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="mix-exploration"
            type="radio"
            name="mix-category"
            value="exploration"
            checked="checked"
          />
          <label class="usa-radio__label" for="mix-exploration">Exploration</label>
        </div>
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="mix-science"
            type="radio"
            name="mix-category"
            value="science"
          />
          <label class="usa-radio__label" for="mix-science">Science</label>
        </div>
        <div class="usa-radio">
          <input
            class="usa-radio__input"
            id="mix-technology"
            type="radio"
            name="mix-category"
            value="technology"
          />
          <label class="usa-radio__label" for="mix-technology">Technology</label>
        </div>
      </fieldset>
    </form>
  `,
};

export const ValidationFlow = {
  name: 'Validation flow',
  render: () => `
    <form class="usa-form usa-form--large">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend--large">Contact information</legend>
        <p class="usa-hint" style="margin-top: 0">
          Required fields are marked with an asterisk (<abbr title="required" class="usa-hint usa-hint--required">*</abbr>).
        </p>

        <div class="usa-form-group usa-form-group--error">
          <label class="usa-label" for="val-name">
            Full name <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input usa-input--error" id="val-name" name="val-name" type="text"
            aria-invalid="true" aria-describedby="val-name-error" required />
          <span class="usa-error-message" id="val-name-error" role="alert">This field is required</span>
        </div>

        <div class="usa-form-group usa-form-group--error">
          <label class="usa-label" for="val-email">
            Email address <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <input class="usa-input usa-input--error" id="val-email" name="val-email" type="email"
            value="james.green.nasa.gov" aria-invalid="true" aria-describedby="val-email-hint val-email-error" required />
          <span class="usa-hint" id="val-email-hint">e.g., mission-lead@nasa.gov</span>
          <span class="usa-error-message" id="val-email-error" role="alert">Incorrect email address format</span>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="val-phone">Phone number (optional)</label>
          <input class="usa-input" id="val-phone" name="val-phone" type="tel" value="301-286-2000" />
        </div>

        <div class="usa-form-group">
          <label class="usa-label" for="val-center">
            NASA center <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
          </label>
          <select class="usa-select" id="val-center" name="val-center" required>
            <option value>- Select -</option>
            <option value="goddard" selected>Goddard Space Flight Center</option>
            <option value="johnson">Johnson Space Center</option>
            <option value="kennedy">Kennedy Space Center</option>
          </select>
        </div>
      </fieldset>
    </form>
  `,
};

// --- Guidance embeds (MDX only) ---

// TODO: Use .usa-button-group wrapper once Button Group component is tested.
export const FormActions = {
  name: 'Form actions',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; gap: 1rem; align-items: center;">
      <button class="usa-button" type="submit">Register for Event</button>
      <button class="usa-button usa-button--outline" type="button">Back</button>
      <a href="#" class="usa-link">Cancel</a>
    </div>
  `,
};

export const ServerSideValidation = {
  name: 'Server-side validation',
  tags: ['!dev'],
  render: () => `
    <form class="usa-form usa-form--large">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend usa-legend--large">Sign up for [Event]</legend>

        <div class="usa-form-group">
          <label class="usa-label" for="srv-name">Full Name</label>
          <input class="usa-input" id="srv-name" name="srv-name" type="text" value="Jim Green" />
        </div>

        <div class="usa-form-group usa-form-group--error">
          <label class="usa-label" for="srv-email">Email Address</label>
          <input class="usa-input usa-input--error" id="srv-email" name="srv-email" type="email"
            value="james.green.nasa.gov" aria-invalid="true" aria-describedby="srv-email-error" />
          <span class="usa-error-message" id="srv-email-error" role="alert">Incorrect email address format</span>
        </div>

        <div class="usa-form-group usa-form-group--error">
          <label class="usa-label" for="srv-terms">
            <input class="usa-checkbox__input" id="srv-terms" type="checkbox" name="srv-terms"
              aria-invalid="true" aria-describedby="srv-terms-error" />
            <span class="usa-checkbox__label" for="srv-terms">I agree to the terms and conditions</span>
          </label>
          <span class="usa-error-message" id="srv-terms-error" role="alert">This field is required</span>
        </div>
      </fieldset>

      <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem;">
        <button class="usa-button" type="submit" disabled>Sign Up</button>
      </div>

      <hr style="border: none; border-top: 2px solid var(--hds-palette-error-indicator, #F64137); margin-top: 2rem;" />

      <span class="usa-error-message" role="alert" style="margin-top: 1rem;">
        Correct the following fields before submitting this form: incorrect email address format, agree to the terms and conditions.
      </span>
    </form>
  `,
};

export const ErrorLegacyMarkup = {
  name: 'Error (legacy USWDS markup)',
  tags: ['!dev'],
  render: () => `
    <form class="usa-form usa-form--large">
      <div class="usa-form-group usa-form-group--error">
        <label class="usa-label" for="legacy-email">
          Email address <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
        </label>
        <span class="usa-error-message" id="legacy-email-error" role="alert">Incorrect email address format</span>
        <span class="usa-hint" id="legacy-email-hint">e.g., mission-lead@nasa.gov</span>
        <input class="usa-input usa-input--error" id="legacy-email" name="legacy-email" type="email"
          value="james.green.nasa.gov" aria-invalid="true" aria-describedby="legacy-email-hint legacy-email-error" />
      </div>
    </form>
  `,
};
