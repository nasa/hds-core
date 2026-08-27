<!-- Source: ./stories/components/Select.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-select-guidance--docs -->
# Select

Select fields allow users to choose one option from a dropdown list. They use USWDS [`.usa-select`](https://designsystem.digital.gov/components/select/) markup. HDS recommends a different DOM order for error messages than vanilla USWDS (see [Form: Legacy USWDS support](./components-form-guidance.md#legacy-uswds-support)).

## Variants

### Default

Every select includes a label above the field. The first option is a placeholder prompt that is not a valid selection.

```html
<form class="usa-form">
  <div class="usa-form-group">
    <label class="usa-label" for="default-field">Topic</label>
    <select class="usa-select" name="default-field" id="default-field" aria-describedby="default-hint">
      <option value="">- Select -</option>
      <option value="humans">Humans in Space</option><option value="moon">Moon to Mars</option><option value="earth">Earth</option><option value="solar">Solar System</option><option value="universe">Universe</option>
    </select>
    <span class="usa-hint" id="default-hint">Help text (optional)</span>

  </div>
</form>
```

### With help text

Help text below the field provides guidance on what the selection controls. Link it to the select with `aria-describedby`.

```html
<form class="usa-form">
  <div class="usa-form-group">
    <label class="usa-label" for="help-field">Mission type</label>
    <select class="usa-select" name="help-field" id="help-field" aria-describedby="help-hint">
      <option value="">- Select -</option>
      <option value="crewed">Crewed</option><option value="robotic">Robotic</option><option value="flyby">Flyby</option>
    </select>
    <span class="usa-hint" id="help-hint">Choose the primary mission category</span>

  </div>
</form>
```

### With selected value

A select with an existing selection.

```html
<form class="usa-form">
  <div class="usa-form-group">
    <label class="usa-label" for="value-field">Topic</label>
    <select class="usa-select" name="value-field" id="value-field" aria-describedby="value-hint">
      <option value="">- Select -</option>
      <option value="humans" selected="">Humans in Space</option><option value="moon">Moon to Mars</option><option value="earth">Earth</option><option value="solar">Solar System</option><option value="universe">Universe</option>
    </select>
    <span class="usa-hint" id="value-hint">Help text (optional)</span>

  </div>
</form>
```

### Many options

When a list has 7 or more options, a select field is appropriate over radio buttons.

```html
<form class="usa-form">
  <div class="usa-form-group">
    <label class="usa-label" for="many-field">NASA center</label>
    <select class="usa-select" name="many-field" id="many-field" aria-describedby="many-hint">
      <option value="">- Select -</option>
      <option value="ames">Ames Research Center</option><option value="armstrong">Armstrong Flight Research Center</option><option value="glenn">Glenn Research Center</option><option value="goddard">Goddard Space Flight Center</option><option value="jpl">Jet Propulsion Laboratory</option><option value="johnson">Johnson Space Center</option><option value="kennedy">Kennedy Space Center</option><option value="langley">Langley Research Center</option><option value="marshall">Marshall Space Flight Center</option><option value="stennis">Stennis Space Center</option>
    </select>
    <span class="usa-hint" id="many-hint">Use a select field when there are 7 or more options</span>

  </div>
</form>
```

### Error

When validation fails, the field border turns red and an error message with an icon appears below the field.

```html
<form class="usa-form">
  <div class="usa-form-group usa-form-group--error">
    <label class="usa-label" for="error-modern-field">NASA center</label>
    <select class="usa-select usa-input--error" name="error-modern-field" id="error-modern-field" aria-invalid="true" aria-describedby="error-modern-hint error-modern-error">
      <option value="">- Select -</option>
      <option value="ames">Ames Research Center</option><option value="armstrong">Armstrong Flight Research Center</option><option value="glenn">Glenn Research Center</option><option value="goddard">Goddard Space Flight Center</option><option value="jpl">Jet Propulsion Laboratory</option><option value="johnson">Johnson Space Center</option><option value="kennedy">Kennedy Space Center</option><option value="langley">Langley Research Center</option><option value="marshall">Marshall Space Flight Center</option><option value="stennis">Stennis Space Center</option>
    </select>
    <span class="usa-hint" id="error-modern-hint">Choose the center closest to your location</span>
    <span class="usa-error-message" id="error-modern-error" role="alert">Please select a NASA center</span>
  </div>
</form>
```

On longer messages, the icon stays top-aligned to the first line.

```html
<form class="usa-form">
  <div class="usa-form-group usa-form-group--error">
    <label class="usa-label" for="error-multiline-field">NASA center</label>
    <select class="usa-select usa-input--error" name="error-multiline-field" id="error-multiline-field" aria-invalid="true" aria-describedby="error-multiline-hint error-multiline-error">
      <option value="">- Select -</option>
      <option value="ames">Ames Research Center</option><option value="armstrong">Armstrong Flight Research Center</option><option value="glenn">Glenn Research Center</option><option value="goddard">Goddard Space Flight Center</option><option value="jpl">Jet Propulsion Laboratory</option><option value="johnson">Johnson Space Center</option><option value="kennedy">Kennedy Space Center</option><option value="langley">Langley Research Center</option><option value="marshall">Marshall Space Flight Center</option><option value="stennis">Stennis Space Center</option>
    </select>
    <span class="usa-hint" id="error-multiline-hint">Help text (optional)</span>
    <span class="usa-error-message" id="error-multiline-error" role="alert">Please select a valid NASA center. If your center is not listed, contact your program office for assistance.</span>
  </div>
</form>
```

> **Differs from USWDS:** If your site uses standard USWDS error markup (error message before the select), HDS Core supports that order. See [Form: Legacy USWDS support](./components-form-guidance.md#legacy-uswds-support) for details.

### Disabled

Disabled selects prevent interaction. The label dims to match.

```html
<form class="usa-form">
  <div class="usa-form-group usa-form-group--disabled">
    <label class="usa-label" for="disabled-field">Topic</label>
    <select class="usa-select" name="disabled-field" id="disabled-field" disabled="" aria-describedby="disabled-hint">
      <option value="">- Select -</option>

    </select>
    <span class="usa-hint" id="disabled-hint">Help text (optional)</span>

  </div>
</form>
```

> **Differs from USWDS:** USWDS recommends avoiding disabled states. Disabled selects have low contrast, don't receive focus, and provide no feedback to screen readers. If you must disable a field, explain why using visible help text and use `aria-disabled="true"` with JavaScript instead of the HTML `disabled` attribute. See the [USWDS disabled state guidance](https://github.com/uswds/uswds/wiki/Disabled-States-Research-Findings-2023) for details.

## When to use select fields

- **7 or more options:** select fields conserve space when the list is too long for radio buttons.
- **Familiar option sets:** when users already know the options (for example, state, country, NASA center) and don't need to compare them visually.
- **Single selection from a long list:** selecting one item from a large predefined set.

## When to consider something else

- **Fewer than 7 options:** use [radio buttons](./components-radio-button-guidance.md). Users can see and compare all options without opening a dropdown.
- **Multiple selections:** use [checkboxes](./components-checkbox-guidance.md). Native `<select multiple>` has poor usability and screen reader support.
- **Searchable lists:** for very long lists (50+ items), a combo box with typeahead filtering is more efficient. Combo box is deferred to a future phase.
- **Free-form input:** use a [text input](./components-text-input-guidance.md) when the answer can't be predicted from a fixed set.
- **Navigation:** don't use selects for navigation. Use links or a menu.

## Usability guidance

- **Always include a visible label.** Labels go above the field, never inside it.
- **Start with a placeholder option.** Use a prompt like "- Select -" as the first option with an empty value. This prevents accidental submission of the first real option.
- **Order options logically.** Alphabetical works for most lists. Use frequency or priority order when one option is much more common.
- **Keep option text concise.** Long option text gets truncated in narrow selects. If options need description, consider radio button tiles instead.
- **Don't use for fewer than 7 options.** Radio buttons are almost always a better experience for short lists.
- **Mark required fields with an asterisk.** Combine with a text description at the top of the form.
- **Mark optional fields when most are required.** Add "(optional)" to the label text.

> **Differs from Figma:** HDS Figma shows a custom dropdown panel with rounded corners and a blue highlight for the selected item. HDS Core uses the native browser `` dropdown, which varies by operating system. Custom dropdown panels require JavaScript and are deferred to a future phase.

## Accessibility

- **Every select needs a `<label>`.** The label's `for` attribute must match the select's `id`. Clicking the label must focus the select.
- **Link help text and error messages with `aria-describedby`.** When both are present, reference both IDs in order: `aria-describedby="hint-id error-id"`.
- **Use `role="alert"` on error messages.** This ensures screen readers announce the error immediately when it appears.
- **Add the `required` attribute** to required fields for native browser validation and screen reader announcement.
- **Keyboard navigation:** users open the select with Space, Enter, or arrow keys (varies by browser). They navigate options with arrow keys and confirm with Enter.
- **Don't auto-submit on change.** Changing a select option should not automatically submit a form or navigate to a new page. Users expect to review their selection before submitting.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS select accessibility tests](https://designsystem.digital.gov/components/select/accessibility-tests/) for component-specific manual testing guidance.
