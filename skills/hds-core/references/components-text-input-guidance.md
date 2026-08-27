<!-- Source: ./stories/components/TextInput.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-text-input-guidance--docs -->

# Text Input

Text inputs and textareas capture text from users. Text inputs handle short strings (names, email addresses, URLs). Textareas handle longer content (messages, descriptions). Both use USWDS [`.usa-input`](https://designsystem.digital.gov/components/text-input/) and `.usa-textarea` markup. HDS recommends a different DOM order for error states (see [Form: Legacy USWDS support](./components-form-guidance.md#legacy-uswds-support)).

## Variants

### Default

Every text input includes a label above the field.

```html
<div class="usa-form-group">
  <label class="usa-label" for="default-field">Text input label</label>
  <input class="usa-input" id="default-field" name="default-field" type="text" />
</div>
```

### With help text

Help text provides formatting guidance, character limits, or accepted values. Link it to the input with `aria-describedby` so screen readers announce it when the field receives focus.

```html
<div class="usa-form-group">
  <label class="usa-label" for="help-field">Email address</label>
  <input class="usa-input" id="help-field" name="help-field" type="email" aria-describedby="help-hint" />
  <span class="usa-hint" id="help-hint">Enter your .gov or .mil email address</span>
</div>
```

### Placeholder

Placeholder text shows a brief example of expected input. It disappears when the user begins typing and should never replace a label.

```html
<div class="usa-form-group">
  <label class="usa-label" for="placeholder-field">Text input label</label>
  <input class="usa-input" id="placeholder-field" name="placeholder-field" type="text" placeholder="e.g., Artemis I" />
</div>
```

### With value

A field with an existing value.

```html
<div class="usa-form-group">
  <label class="usa-label" for="value-field">Text input label</label>
  <input class="usa-input" id="value-field" name="value-field" type="text" value="James Webb Space Telescope" />
</div>
```

### Textarea

Textareas handle longer text content. They are resizable by default.

```html
<div class="usa-form-group">
  <label class="usa-label" for="textarea-field">Textarea label</label>
  <textarea class="usa-textarea" id="textarea-field" name="textarea-field" aria-describedby="textarea-hint"></textarea>
  <span class="usa-hint" id="textarea-hint">Help text (optional)</span>
</div>
```

### Input widths

Width classes constrain an input to match an expected data format (zip codes, phone numbers, dates) without affecting validation behavior.

```html
<div class="usa-form-group">
  <label class="usa-label" for="w-2xs-field">Width 2xs (5ex)</label>
  <input class="usa-input usa-input--2xs" id="w-2xs-field" name="w-2xs-field" type="text" />
</div>

<div class="usa-form-group">
  <label class="usa-label" for="w-xs-field">Width xs (9ex)</label>
  <input class="usa-input usa-input--xs" id="w-xs-field" name="w-xs-field" type="text" />
</div>

<div class="usa-form-group">
  <label class="usa-label" for="w-sm-field">Width sm (13ex)</label>
  <input class="usa-input usa-input--sm" id="w-sm-field" name="w-sm-field" type="text" />
</div>

<div class="usa-form-group">
  <label class="usa-label" for="w-md-field">Width md (20ex)</label>
  <input class="usa-input usa-input--md" id="w-md-field" name="w-md-field" type="text" />
</div>

<div class="usa-form-group">
  <label class="usa-label" for="w-lg-field">Width lg (30ex)</label>
  <input class="usa-input usa-input--lg" id="w-lg-field" name="w-lg-field" type="text" />
</div>

<div class="usa-form-group">
  <label class="usa-label" for="w-xl-field">Width xl (40ex)</label>
  <input class="usa-input usa-input--xl" id="w-xl-field" name="w-xl-field" type="text" />
</div>

<div class="usa-form-group">
  <label class="usa-label" for="w-2xl-field">Width 2xl (50ex)</label>
  <input class="usa-input usa-input--2xl" id="w-2xl-field" name="w-2xl-field" type="text" />
</div>
```

### Error

When validation fails, the field border turns red and an error message with an icon appears below the field. Error messages appear after the input so the visual and reading order match.

```html
<div class="usa-form-group usa-form-group--error">
  <label class="usa-label" for="error-modern-field">Email address</label>
  <input
    class="usa-input usa-input--error"
    id="error-modern-field"
    name="error-modern-field"
    type="email"
    value="james.green.nasa.gov"
    aria-invalid="true"
    aria-describedby="error-modern-hint error-modern-error"
  />
  <span class="usa-hint" id="error-modern-hint">e.g., mission-lead@nasa.gov</span>
  <span class="usa-error-message" id="error-modern-error" role="alert">Incorrect email address format</span>
</div>
```

On longer messages, the icon stays top-aligned to the first line.

```html
<div class="usa-form-group usa-form-group--error">
  <label class="usa-label" for="error-multiline-field">Password</label>
  <input
    class="usa-input usa-input--error"
    id="error-multiline-field"
    name="error-multiline-field"
    type="password"
    aria-invalid="true"
    aria-describedby="error-multiline-hint error-multiline-error"
  />
  <span class="usa-hint" id="error-multiline-hint">Help text (optional)</span>
  <span class="usa-error-message" id="error-multiline-error" role="alert"
    >Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one
    number, and one special character such as ! or @.</span
  >
</div>
```

> **Differs from USWDS:** If your site uses standard USWDS error markup (error message before the input), HDS Core supports that order. See [Form: Legacy USWDS support](./components-form-guidance.md#legacy-uswds-support) for details.

### Success

A green border indicates the field value has passed validation.

```html
<div class="usa-form-group">
  <label class="usa-label" for="success-field">Text input label</label>
  <input
    class="usa-input usa-input--success"
    id="success-field"
    name="success-field"
    type="text"
    value="james.green@nasa.gov"
    aria-describedby="success-hint"
  />
  <span class="usa-hint" id="success-hint">Help text (optional)</span>
</div>
```

> **Differs from USWDS:** The success border is a USWDS feature carried forward for compatibility. HDS Figma does not specify a success state for form fields. Use sparingly and only when your application needs explicit positive validation feedback.

### Disabled

Disabled fields prevent interaction. The label dims to match. Help text remains at normal contrast to stay readable.

```html
<div class="usa-form-group usa-form-group--disabled">
  <label class="usa-label" for="disabled-field">Text input label</label>
  <input
    class="usa-input"
    id="disabled-field"
    name="disabled-field"
    type="text"
    value="Cannot edit"
    disabled=""
    aria-describedby="disabled-hint"
  />
  <span class="usa-hint" id="disabled-hint">Help text (optional)</span>
</div>
```

> **Differs from USWDS:** USWDS recommends avoiding disabled states. Disabled inputs have low contrast, don't receive focus, and provide no feedback to screen readers. If you must disable a field, explain why using visible help text and use `aria-disabled="true"` with JavaScript instead of the HTML `disabled` attribute. See the [USWDS disabled state guidance](https://github.com/uswds/uswds/wiki/Disabled-States-Research-Findings-2023) for details.

## When to use text inputs

- **Short text:** names, email addresses, phone numbers, search terms, single-line responses.
- **Free-form input:** when the answer cannot be predicted from a fixed set of options.
- **Longer content:** use a textarea for messages, descriptions, or multi-line input.

## When to consider something else

- **Choosing from a list:** use [radio buttons](./components-radio-button-guidance.md) for fewer than 7 options or a [select field](./components-select-guidance.md) for 7 or more.
- **Multiple selections from a list:** use [checkboxes](./components-checkbox-guidance.md).
- **Date input:** use a date picker for calendar dates rather than a free-text field.
- **Yes/No questions:** use radio buttons rather than a text field.

## Usability guidance

- **Always include a visible label.** Labels go above the field. Never rely on placeholder text alone. It disappears on focus and is not announced by all screen readers.
- **Use help text for formatting guidance.** Character limits, accepted formats, and examples go in help text below the field, not in the label.
- **Match width to expected input.** Use width classes to give users a visual hint about expected length.
- **Mark required fields with an asterisk.** Include a note at the top of the form: "Required fields are marked with an asterisk (\*)."
- **Mark optional fields when most are required.** Add "(optional)" to the label text.
- **Use `inputmode` for mobile keyboards.** Set `inputmode="email"`, `inputmode="tel"`, or `inputmode="numeric"` to show the appropriate keyboard on mobile devices.
- **Write specific error messages.** Describe what went wrong and how to fix it. "Incorrect email address format" is more useful than "Invalid input."

> **Differs from Figma:** For compact fields (for example, a single email input in a subscription banner), HDS Figma shows the label inside the field as placeholder text that moves above on focus. This floating label pattern requires JavaScript and is deferred to a future phase.

## Accessibility

- **Every input needs a `<label>`.** The label's `for` attribute must match the input's `id`. Clicking the label must focus the input.
- **Link help text and error messages with `aria-describedby`.** When both are present, reference both IDs in order: `aria-describedby="hint-id error-id"`. Screen readers announce the label first, then the description.
- **Use `role="alert"` on error messages.** This announces the error immediately when it appears in the DOM, regardless of focus position.
- **Add the `required` attribute** to required fields. This enables native browser validation and announces "required" to screen readers.
- **Keyboard navigation:** users move between fields with Tab and Shift+Tab.
- **Do not use `autocomplete="off"`** unless there is a specific security requirement. Autocomplete helps users complete forms faster and reduces errors.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS text input accessibility tests](https://designsystem.digital.gov/components/text-input/accessibility-tests/) for component-specific manual testing guidance.
