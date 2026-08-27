<!-- Source: ./stories/components/Form.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-form-guidance--docs -->
# Form

Forms are groups of related input fields that allow users to enter information or configure options. HDS forms use USWDS [`.usa-form`](https://designsystem.digital.gov/components/form/) markup. HDS recommends a different DOM order for error messages than vanilla USWDS (see [Legacy USWDS support](#legacy-uswds-support)).

## Variants

### Default (single column)

Most forms use a single column of fields with related inputs grouped into fieldsets. Keep fields at a readable width rather than stretching them across the full page.

```html
<form class="usa-form usa-form--large">
  <fieldset class="usa-fieldset">
    <legend class="usa-legend usa-legend--large">Personal Information</legend>

    <div class="usa-form-group">
      <label class="usa-label" for="group-first">First name</label>
      <input class="usa-input" id="group-first" name="group-first" type="text">
      <span class="usa-hint">Help text (optional)</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="group-last">Last name</label>
      <input class="usa-input" id="group-last" name="group-last" type="text">
      <span class="usa-hint">Help text (optional)</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="group-title">Title</label>
      <input class="usa-input" id="group-title" name="group-title" type="text">
      <span class="usa-hint">Help text (optional)</span>
    </div>
  </fieldset>

  <fieldset class="usa-fieldset">
    <legend class="usa-legend usa-legend--large">Contact Information</legend>

    <div class="usa-form-group">
      <label class="usa-label" for="group-email">Email address</label>
      <input class="usa-input" id="group-email" name="group-email" type="email">
      <span class="usa-hint">Help text (optional)</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="group-phone">Phone number</label>
      <input class="usa-input" id="group-phone" name="group-phone" type="tel">
      <span class="usa-hint">Help text (optional)</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="group-center">NASA center</label>
      <select class="usa-select" name="group-center" id="group-center">
        <option value="">- Select -</option>
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
      <input class="usa-input" id="group-username" name="group-username" type="text">
      <span class="usa-hint">Help text (optional)</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="group-password">Password</label>
      <input class="usa-input" id="group-password" name="group-password" type="password">
      <span class="usa-hint">8 character minimum</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="group-confirm">Confirm password</label>
      <input class="usa-input" id="group-confirm" name="group-confirm" type="password">
      <span class="usa-hint">Help text (optional)</span>
    </div>
  </fieldset>
</form>
```

### Required fields

Mark required fields with an asterisk and include instructional text at the top of the form. See [Required vs. optional fields](#required-vs-optional-fields) for full guidance on when to use each convention.

```html
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
      <input class="usa-input" id="req-name" name="req-name" type="text" required="">
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="req-email">
        Contact email <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
      </label>
      <input class="usa-input" id="req-email" name="req-email" type="email" required="">
      <span class="usa-hint" id="req-email-hint">e.g., mission-lead@nasa.gov</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="req-nickname">Nickname (optional)</label>
      <input class="usa-input" id="req-nickname" name="req-nickname" type="text">
    </div>
  </fieldset>
</form>
```

### Mixed elements

Forms often combine text inputs, selects, checkboxes, and radio buttons. Use fieldsets with descriptive legends to group related controls by theme.

```html
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
      <input class="usa-input" id="mix-name" name="mix-name" type="text" required="">
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="mix-type">
        Mission type <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
      </label>
      <select class="usa-select" id="mix-type" name="mix-type" required="">
        <option value="">- Select -</option>
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
      <input class="usa-checkbox__input" id="mix-earth" type="checkbox" name="mix-interests" value="earth">
      <label class="usa-checkbox__label" for="mix-earth">Earth Science</label>
    </div>
    <div class="usa-checkbox">
      <input class="usa-checkbox__input" id="mix-planetary" type="checkbox" name="mix-interests" value="planetary">
      <label class="usa-checkbox__label" for="mix-planetary">Planetary Science</label>
    </div>
    <div class="usa-checkbox">
      <input class="usa-checkbox__input" id="mix-astro" type="checkbox" name="mix-interests" value="astro">
      <label class="usa-checkbox__label" for="mix-astro">Astrophysics</label>
    </div>
  </fieldset>

  <fieldset class="usa-fieldset">
    <legend class="usa-legend">Mission category</legend>
    <div class="usa-radio">
      <input class="usa-radio__input" id="mix-exploration" type="radio" name="mix-category" value="exploration" checked="checked">
      <label class="usa-radio__label" for="mix-exploration">Exploration</label>
    </div>
    <div class="usa-radio">
      <input class="usa-radio__input" id="mix-science" type="radio" name="mix-category" value="science">
      <label class="usa-radio__label" for="mix-science">Science</label>
    </div>
    <div class="usa-radio">
      <input class="usa-radio__input" id="mix-technology" type="radio" name="mix-category" value="technology">
      <label class="usa-radio__label" for="mix-technology">Technology</label>
    </div>
  </fieldset>
</form>
```

### Multi-step form

Complex forms with clear thematic sections can be split across multiple pages using a step indicator to show progress. This reduces the feeling of being overwhelmed by a long form, but should only be used when there are natural groupings (Contact Information, Payment Information, Event Details).

> **Differs from Figma:** HDS Figma includes a Stepper component for multi-step forms. This pattern is not yet implemented in HDS Core.

For a preview of how USWDS multi-step form markup currently renders with HDS Core styling applied, see the [Multi-Step Form integration test](?path=/docs/guides-existing-uswds-site-multi-step-form--docs).

## Field types

| Field                                                                 | Use case                                           |
| --------------------------------------------------------------------- | -------------------------------------------------- |
| [Text Input](./components-text-input-guidance.md)        | Short strings: names, addresses, phone numbers     |
| [Textarea](./components-text-input-guidance.md#textarea) | Multiple lines: questions, feedback, descriptions  |
| [Select](./components-select-guidance.md)                | Choose one item from a longer list of options      |
| [Checkbox](./components-checkbox-guidance.md)            | Select one or multiple options from a set          |
| [Radio Button](./components-radio-button-guidance.md)    | Choose exactly one option from two or more choices |

### Additional USWDS fields

The following field types render with default USWDS styling inside HDS. They are functional and accessible but not yet themed to match the HDS visual spec.

| Field                                                                     | Use case                                 |
| ------------------------------------------------------------------------- | ---------------------------------------- |
| [Switch](https://designsystem.digital.gov/components/switch/)             | Binary on/off settings                   |
| [File Input](https://designsystem.digital.gov/components/file-input/)     | Attach single or multiple files          |
| [Date Picker](https://designsystem.digital.gov/components/date-picker/)   | Select a date in the correct format      |
| [Range Slider](https://designsystem.digital.gov/components/range-slider/) | Select a number or range from a data set |

## Building forms

### Labels and help text

All fields should have a clear, concise label explaining the desired input. Toggles and single-option checkboxes are possible exceptions since they include a built-in label.

Help text sits below the field and provides specific guidance on rules or expected formatting: character limits, date format, accepted file types. Link help text to the input with `aria-describedby` so screen readers announce it when the field receives focus.

### Placeholder text

Placeholder text shows an example value inside the field that disappears when the user begins typing. Use it sparingly for simple forms where it reinforces expected format. Never use placeholder text as a substitute for a label.

> **Differs from Figma:** HDS Figma shows a floating label variant where the label sits inside the field and shifts above on focus. This pattern requires JavaScript and is deferred to a future phase.

### Required vs. optional fields

Forms should contain the minimum fields necessary. Follow these conventions:

- **When most fields are required:** mark optional fields by adding "(optional)" to the label.
- **When a form has a mix:** mark required fields with an asterisk and include instructional text at the top of the form: "Required fields are marked with an asterisk (\*)."
- **Single-field forms** do not need required indicators.

Always add the HTML `required` attribute to required fields for native browser validation and screen reader announcement.

### Grouping fields

Stack fields vertically in a single column as a default. When related fields are short and logically paired (city + state, first name + last name), they can share a row. Match field width to expected content length so users get a visual hint about the answer.

Use `<fieldset>` and `<legend>` to group thematically related controls. For longer forms with many groups, consider the [multi-step approach](#multi-step-form) rather than one scrolling page.

### Form actions

Form actions sit below all fields and follow a consistent visual hierarchy:

- **Primary action (CTA button):** submits the form or advances to the next step. Use a descriptive verb matching the form's intent ("Register for Event," "Submit Question") rather than generic text like "Submit."
- **Secondary action (Outline button):** provides an alternate action such as navigating to the previous step.
- **Tertiary action (text link):** cancels the submission and returns to the previous page.

```html
<div style="display: flex; gap: 1rem; align-items: center;">
  <button class="usa-button" type="submit">Register for Event</button>
  <button class="usa-button usa-button--outline" type="button">Back</button>
  <a href="#" class="usa-link">Cancel</a>
</div>
```

> **How this works:** In production, wrap form actions in a `.usa-button-group` container for proper spacing and responsive behavior. Button Group component testing is in progress.

## Validation

### Inline validation (recommended)

Inline validation reveals errors as the user completes the form. When a field loses focus and fails validation, the field border turns red and an error message with an icon appears below the field.

Error messages should describe the issue and how to fix it. Common errors include incorrect formatting, required fields left blank, or input that exceeds character limits.

```html
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
      <input class="usa-input usa-input--error" id="val-name" name="val-name" type="text" aria-invalid="true" aria-describedby="val-name-error" required="">
      <span class="usa-error-message" id="val-name-error" role="alert">This field is required</span>
    </div>

    <div class="usa-form-group usa-form-group--error">
      <label class="usa-label" for="val-email">
        Email address <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
      </label>
      <input class="usa-input usa-input--error" id="val-email" name="val-email" type="email" value="james.green.nasa.gov" aria-invalid="true" aria-describedby="val-email-hint val-email-error" required="">
      <span class="usa-hint" id="val-email-hint">e.g., mission-lead@nasa.gov</span>
      <span class="usa-error-message" id="val-email-error" role="alert">Incorrect email address format</span>
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="val-phone">Phone number (optional)</label>
      <input class="usa-input" id="val-phone" name="val-phone" type="tel" value="301-286-2000">
    </div>

    <div class="usa-form-group">
      <label class="usa-label" for="val-center">
        NASA center <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
      </label>
      <select class="usa-select" id="val-center" name="val-center" required="">
        <option value="">- Select -</option>
        <option value="goddard" selected="">Goddard Space Flight Center</option>
        <option value="johnson">Johnson Space Center</option>
        <option value="kennedy">Kennedy Space Center</option>
      </select>
    </div>
  </fieldset>
</form>
```

### Server-side validation (fallback)

Server-side validation occurs after the form is submitted. If errors are detected, they appear below each field and are summarized below the form actions. The submit button should be disabled until errors are corrected.

Use this approach as a fallback when inline validation is not technically feasible. If validation takes time to complete, show a loading indicator.

```html
<form class="usa-form usa-form--large">
  <fieldset class="usa-fieldset">
    <legend class="usa-legend usa-legend--large">Sign up for [Event]</legend>

    <div class="usa-form-group">
      <label class="usa-label" for="srv-name">Full Name</label>
      <input class="usa-input" id="srv-name" name="srv-name" type="text" value="Jim Green">
    </div>

    <div class="usa-form-group usa-form-group--error">
      <label class="usa-label" for="srv-email">Email Address</label>
      <input class="usa-input usa-input--error" id="srv-email" name="srv-email" type="email" value="james.green.nasa.gov" aria-invalid="true" aria-describedby="srv-email-error">
      <span class="usa-error-message" id="srv-email-error" role="alert">Incorrect email address format</span>
    </div>

    <div class="usa-form-group usa-form-group--error">
      <label class="usa-label" for="srv-terms">
        <input class="usa-checkbox__input" id="srv-terms" type="checkbox" name="srv-terms" aria-invalid="true" aria-describedby="srv-terms-error">
        <span class="usa-checkbox__label" for="srv-terms">I agree to the terms and conditions</span>
      </label>
      <span class="usa-error-message" id="srv-terms-error" role="alert">This field is required</span>
    </div>
  </fieldset>

  <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1.5rem;">
    <button class="usa-button" type="submit" disabled="">Sign Up</button>
  </div>

  <hr style="border: none; border-top: 2px solid var(--hds-palette-error-indicator, #F64137); margin-top: 2rem;">

  <span class="usa-error-message" role="alert" style="margin-top: 1rem;">
    Correct the following fields before submitting this form: incorrect email address format, agree to the terms and conditions.
  </span>
</form>
```

### Success state

After successful submission, a confirmation message should replace the form body. The message should confirm what was submitted, explain any follow-up the user can expect, and provide clear next steps. This pattern requires JavaScript and is not demonstrated here.

## Usability guidance

- **Keep forms short.** Only ask for information you need. Every additional field reduces completion rates.
- **Use a single column layout.** Vertical stacking is easiest to scan. See [Grouping fields](#grouping-fields).
- **Group related fields with fieldsets.** Use descriptive legends so users understand each section's context. See [Grouping fields](#grouping-fields).
- **Match field width to expected input.** A zip code field should be narrower than a street address field. See [Grouping fields](#grouping-fields).
- **Write specific error messages.** "Incorrect email address format" is more useful than "Invalid input." See [Validation](#validation).
- **Avoid disabled states when possible.** Disabled fields have low contrast and are invisible to keyboard users. See [Accessibility](#accessibility).
- **Use descriptive submit labels.** "Register for Event" is clearer than "Submit." See [Form actions](#form-actions).
- **Provide immediate feedback.** Inline validation lets users correct errors without submitting the form. See [Inline validation](#inline-validation-recommended).

## Legacy USWDS support

The recommended HDS markup places error messages after the input in the DOM, matching the visual order users see on screen:

```html
<!-- Recommended HDS markup -->
<label> ... </label>
<input aria-invalid="true" aria-describedby="hint-id error-id" />
<span class="usa-hint" id="hint-id"> ... </span>
<span class="usa-error-message" id="error-id" role="alert"> ... </span>
```

Standard USWDS markup places the error message before the input. HDS Core supports this order without any visual difference. The `role="alert"` attribute ensures screen readers announce the error immediately regardless of DOM position.

```html
<form class="usa-form usa-form--large">
  <div class="usa-form-group usa-form-group--error">
    <label class="usa-label" for="legacy-email">
      Email address <abbr title="required" class="usa-hint usa-hint--required">*</abbr>
    </label>
    <span class="usa-error-message" id="legacy-email-error" role="alert">Incorrect email address format</span>
    <span class="usa-hint" id="legacy-email-hint">e.g., mission-lead@nasa.gov</span>
    <input class="usa-input usa-input--error" id="legacy-email" name="legacy-email" type="email" value="james.green.nasa.gov" aria-invalid="true" aria-describedby="legacy-email-hint legacy-email-error">
  </div>
</form>
```

```html
<!-- Legacy USWDS markup — supported -->
<label> ... </label>
<span class="usa-error-message" id="error-id" role="alert"> ... </span>
<span class="usa-hint" id="hint-id"> ... </span>
<input aria-invalid="true" aria-describedby="hint-id error-id" />
```

> **Differs from USWDS:** USWDS places the error message before the input for legacy screen reader compatibility. Modern screen readers handle `role="alert"` reliably regardless of DOM position. Update to the recommended markup when practical.

## Accessibility

- **Use fieldsets and legends.** Group related controls in a `<fieldset>` with a `<legend>` describing the group. This is especially important for radio button and checkbox groups where the question text belongs in the legend.
- **Mark required fields.** Add the `required` attribute to required inputs. Combine with a visible asterisk and instructional text at the top of the form.
- **Link help text and errors with `aria-describedby`.** Reference both IDs on the input when both are present: `aria-describedby="hint-id error-id"`.
- **Use `role="alert"` on error messages.** This announces errors immediately when they appear in the DOM.
- **Prefer `aria-disabled="true"` over `disabled`.** The `disabled` attribute removes elements from the tab order entirely. If you must disable a control, use `aria-disabled="true"` with JavaScript to prevent interaction while keeping the element focusable. See the [USWDS disabled state research](https://github.com/uswds/uswds/wiki/Disabled-States-Research-Findings-2023) for details.
- **Keyboard navigation:** users move between fields with Tab and Shift+Tab and activate buttons with Enter or Space.
- **Known screen reader issues:** VoiceOver on iOS has limited support for fieldset and legend elements. Address this by adding `aria-labelledby` on each input referencing the legend and label IDs. VoiceOver on macOS has partial `aria-describedby` support on text inputs. See [a11ysupport.io](https://a11ysupport.io/tech/aria/aria-describedby_attribute) for current status.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS form page](https://designsystem.digital.gov/components/form/) for general form accessibility guidance and known issues with screen readers. More specific accessibility tips and common patterns can be found on the [USWDS form templates](https://designsystem.digital.gov/templates/form-templates/) page.
