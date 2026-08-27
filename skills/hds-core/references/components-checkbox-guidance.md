<!-- Source: ./stories/components/Checkbox.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-checkbox-guidance--docs -->

# Checkbox

Checkboxes allow users to select zero, one, or multiple options from a list. They use USWDS [`.usa-checkbox`](https://designsystem.digital.gov/components/checkbox/) markup with no additional classes required.

## Variants

### Default

Checkboxes always include a label and are stacked vertically to form a list of options. A group label is included above the options using a `<legend>` inside a `<fieldset>`.

```html
<fieldset class="usa-fieldset">
  <legend class="usa-legend">Missions</legend>

  <div class="usa-checkbox">
    <input class="usa-checkbox__input" id="default-artemis" type="checkbox" name="default" value="artemis" />
    <label class="usa-checkbox__label" for="default-artemis">Artemis</label>
  </div>

  <div class="usa-checkbox">
    <input
      class="usa-checkbox__input"
      id="default-commercial-crew"
      type="checkbox"
      name="default"
      value="commercial-crew"
      checked="checked"
    />
    <label class="usa-checkbox__label" for="default-commercial-crew">Commercial Crew</label>
  </div>

  <div class="usa-checkbox">
    <input class="usa-checkbox__input" id="default-curiosity" type="checkbox" name="default" value="curiosity" />
    <label class="usa-checkbox__label" for="default-curiosity">Curiosity Mars Rover</label>
  </div>

  <div class="usa-checkbox">
    <input class="usa-checkbox__input" id="default-hubble" type="checkbox" name="default" value="hubble" />
    <label class="usa-checkbox__label" for="default-hubble">Hubble Space Telescope</label>
  </div>

  <div class="usa-checkbox">
    <input class="usa-checkbox__input" id="default-jwst" type="checkbox" name="default" value="jwst" />
    <label class="usa-checkbox__label" for="default-jwst">James Webb Space Telescope</label>
  </div>
</fieldset>
```

### States

Checkboxes have default, selected, disabled, and disabled + selected states.

```html
<fieldset class="usa-fieldset">
  <legend class="usa-legend">Checkbox states</legend>

  <div class="usa-checkbox">
    <input class="usa-checkbox__input" id="states-default" type="checkbox" name="states" value="default" />
    <label class="usa-checkbox__label" for="states-default">Default</label>
  </div>

  <div class="usa-checkbox">
    <input
      class="usa-checkbox__input"
      id="states-selected"
      type="checkbox"
      name="states"
      value="selected"
      checked="checked"
    />
    <label class="usa-checkbox__label" for="states-selected">Selected</label>
  </div>

  <div class="usa-checkbox">
    <input
      class="usa-checkbox__input"
      id="states-disabled"
      type="checkbox"
      name="states"
      value="disabled"
      disabled="disabled"
    />
    <label class="usa-checkbox__label" for="states-disabled">Disabled</label>
  </div>

  <div class="usa-checkbox">
    <input
      class="usa-checkbox__input"
      id="states-disabled-checked"
      type="checkbox"
      name="states"
      value="disabled-checked"
      checked="checked"
      disabled="disabled"
    />
    <label class="usa-checkbox__label" for="states-disabled-checked">Disabled + selected</label>
  </div>
</fieldset>
```

### Tiles

Tile checkboxes provide a larger touch target with an optional description. Use tiles when options benefit from additional context.

```html
<form class="usa-form">
  <fieldset class="usa-fieldset">
    <legend class="usa-legend">Select format</legend>

    <div class="usa-checkbox">
      <input
        class="usa-checkbox__input usa-checkbox__input--tile"
        id="tiles-pdf"
        type="checkbox"
        name="tiles"
        value="pdf"
      />
      <label class="usa-checkbox__label" for="tiles-pdf"
        >PDF<span class="usa-checkbox__label-description">Download as a PDF document</span></label
      >
    </div>

    <div class="usa-checkbox">
      <input
        class="usa-checkbox__input usa-checkbox__input--tile"
        id="tiles-csv"
        type="checkbox"
        name="tiles"
        value="csv"
      />
      <label class="usa-checkbox__label" for="tiles-csv"
        >CSV<span class="usa-checkbox__label-description">Download as a spreadsheet</span></label
      >
    </div>

    <div class="usa-checkbox">
      <input
        class="usa-checkbox__input usa-checkbox__input--tile"
        id="tiles-disabled"
        type="checkbox"
        name="tiles"
        value="disabled"
        disabled="disabled"
      />
      <label class="usa-checkbox__label" for="tiles-disabled">Disabled tile</label>
    </div>
  </fieldset>
</form>
```

### With error

When a required checkbox group has no selection, an error message appears below the options inside the fieldset.

```html
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
```

> **Differs from USWDS:** If your site uses standard USWDS error markup, HDS Core supports that order. See [Form: Legacy USWDS support](./components-form-guidance.md#legacy-uswds-support) for details.

## When to use checkboxes

- **Multiple selections:** users can choose zero, one, or any number of options from a list.
- **Filtering:** narrowing search results, galleries, or data tables by category.
- **Toggleable settings:** independent on/off options like notification preferences.
- **Terms and agreements:** a single checkbox to confirm acceptance.

## When to consider something else

- **Mutually exclusive choices:** use [radio buttons](./components-radio-button-guidance.md) when only one option can be selected.
- **Single on/off toggle:** for a binary setting with immediate effect, consider a toggle switch.
- **Long option lists:** for more than about 10 options, consider a filterable list or combo box to reduce scrolling.

## Usability guidance

- **Always wrap in a `<fieldset>` with a `<legend>`.** The legend provides context for the group. Screen readers announce it before each option.
- **Stack vertically.** Horizontal layouts make it harder to scan options and associate labels with checkboxes.
- **Use clear, concise labels.** Each option should be understandable on its own without reading the legend again.
- **Don't pre-select options** unless there is a strong reason (e.g., a recommended default). Unlike radio buttons, checkbox groups can start with nothing selected.
- **Mark required groups clearly.** If the form requires at least one selection, add an asterisk to the legend and display an error message when the form is submitted without a selection.
- **Mark optional groups when most fields are required.** Add "(optional)" to the legend text when most other fields in the form are required.

> **Differs from Figma:** HDS Core uses a custom check icon that differs from the default USWDS checkmark. The selected state uses NASA Blue per the HDS wayfinding rule — blue indicates on-page interaction.

## Accessibility

- **Group with `<fieldset>` and `<legend>`.** Every checkbox group must be wrapped in a `<fieldset>` with a descriptive `<legend>`. This is required — screen readers use the legend to announce context for each option.
- **Unique `id` and matching `for`.** Each `<input>` needs a unique `id`, and its `<label>` must reference it with a matching `for` attribute.
- **Keyboard navigation:** Users move between checkboxes with **Tab** and **Shift+Tab**, and toggle them with **Space**.
- **Error messages:** Add `role="alert"` and an `id` to the error element. Reference that `id` via `aria-describedby` on each checkbox input in the group so screen readers associate the error with every option, not just the last one.
- **VoiceOver on iOS** does not fully support `<fieldset>` and `<legend>`. For maximum compatibility, add `aria-labelledby` referencing the legend `id` on each input.

> **Differs from USWDS:** USWDS recommends avoiding disabled states. Disabled checkboxes have low contrast, don't receive focus, and provide no feedback to screen readers. If you must disable an option, explain why using visible help text and use `aria-disabled="true"` with JavaScript instead of the HTML `disabled` attribute. See the [USWDS disabled state guidance](https://github.com/uswds/uswds/wiki/Disabled-States-Research-Findings-2023) for details.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS checkbox accessibility tests](https://designsystem.digital.gov/components/checkbox/accessibility-tests/) for component-specific manual testing guidance.
