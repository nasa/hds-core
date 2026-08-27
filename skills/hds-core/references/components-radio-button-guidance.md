<!-- Source: ./stories/components/RadioButton.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-radio-button-guidance--docs -->

# Radio Button

Radio buttons allow users to select exactly one option from a list. They use USWDS [`.usa-radio`](https://designsystem.digital.gov/components/radio-buttons/) markup with no additional classes required.

## Variants

### Default (vertical)

Radio buttons always include a label and are stacked vertically by default. A group label is included above the options using a `<legend>` inside a `<fieldset>`. Radio button groups should always have a default selection.

```html
<fieldset class="usa-fieldset">
  <legend class="usa-legend">Select one mission type</legend>

  <div class="usa-radio">
    <input class="usa-radio__input" id="default-crewed" type="radio" name="default" value="crewed" checked="checked" />
    <label class="usa-radio__label" for="default-crewed">Crewed</label>
  </div>

  <div class="usa-radio">
    <input class="usa-radio__input" id="default-robotic" type="radio" name="default" value="robotic" />
    <label class="usa-radio__label" for="default-robotic">Robotic</label>
  </div>

  <div class="usa-radio">
    <input class="usa-radio__input" id="default-flyby" type="radio" name="default" value="flyby" />
    <label class="usa-radio__label" for="default-flyby">Flyby</label>
  </div>
</fieldset>
```

### Horizontal

For short lists with brief labels (e.g., Yes/No), radio buttons can be laid out horizontally. Keep horizontal groups to 2–3 options maximum.

```html
<fieldset class="usa-fieldset">
  <legend class="usa-legend">Label</legend>
  <div style="display: flex; gap: 24px;">
    <div class="usa-radio">
      <input class="usa-radio__input" id="horiz-yes" type="radio" name="horiz" value="yes" checked="checked" />
      <label class="usa-radio__label" for="horiz-yes">Yes</label>
    </div>

    <div class="usa-radio">
      <input class="usa-radio__input" id="horiz-no" type="radio" name="horiz" value="no" />
      <label class="usa-radio__label" for="horiz-no">No</label>
    </div>
  </div>
</fieldset>
```

### States

Radio buttons have default, selected, disabled, and disabled + selected states.

```html
<fieldset class="usa-fieldset">
  <legend class="usa-legend">Radio button states</legend>

  <div class="usa-radio">
    <input class="usa-radio__input" id="states-default" type="radio" name="states" value="default" />
    <label class="usa-radio__label" for="states-default">Default</label>
  </div>

  <div class="usa-radio">
    <input
      class="usa-radio__input"
      id="states-selected"
      type="radio"
      name="states"
      value="selected"
      checked="checked"
    />
    <label class="usa-radio__label" for="states-selected">Selected</label>
  </div>

  <div class="usa-radio">
    <input
      class="usa-radio__input"
      id="states-disabled"
      type="radio"
      name="states-disabled"
      value="disabled"
      disabled="disabled"
    />
    <label class="usa-radio__label" for="states-disabled">Disabled</label>
  </div>

  <div class="usa-radio">
    <input
      class="usa-radio__input"
      id="states-disabled-checked"
      type="radio"
      name="states-disabled-checked"
      value="disabled-checked"
      checked="checked"
      disabled="disabled"
    />
    <label class="usa-radio__label" for="states-disabled-checked">Disabled + selected</label>
  </div>
</fieldset>
```

### Tiles

Tile radio buttons provide a larger touch target with an optional description. Use tiles when options benefit from additional context.

```html
<form class="usa-form">
  <fieldset class="usa-fieldset">
    <legend class="usa-legend">Select destination</legend>

    <div class="usa-radio">
      <input
        class="usa-radio__input usa-radio__input--tile"
        id="tiles-moon"
        type="radio"
        name="tiles"
        value="moon"
        checked="checked"
      />
      <label class="usa-radio__label" for="tiles-moon">Moon</label>
    </div>

    <div class="usa-radio">
      <input class="usa-radio__input usa-radio__input--tile" id="tiles-mars" type="radio" name="tiles" value="mars" />
      <label class="usa-radio__label" for="tiles-mars"
        >Mars<span class="usa-checkbox__label-description">Red planet exploration</span></label
      >
    </div>

    <div class="usa-radio">
      <input
        class="usa-radio__input usa-radio__input--tile"
        id="tiles-disabled"
        type="radio"
        name="tiles-disabled"
        value="disabled"
        disabled="disabled"
      />
      <label class="usa-radio__label" for="tiles-disabled">Disabled tile</label>
    </div>
  </fieldset>
</form>
```

### With error

When a required radio button group has no selection on submit, an error message appears below the options inside the fieldset.

```html
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
```

> **Differs from USWDS:** If your site uses standard USWDS error markup, HDS Core supports that order. See [Form: Legacy USWDS support](./components-form-guidance.md#legacy-uswds-support) for details.

## When to use radio buttons

- **Mutually exclusive choices:** only one option can be selected at a time (for example, mission type, yes/no questions).
- **Short lists:** 6 or fewer options that the user should be able to see and compare at once.
- **Important choices:** when the user needs to see all options before deciding, rather than picking from a hidden dropdown.

## When to consider something else

- **Multiple selections:** use [checkboxes](./components-checkbox-guidance.md) when users can select more than one option.
- **7 or more options:** use a [select field](./components-select-guidance.md) to save space and reduce visual complexity.
- **Binary toggles with immediate effect:** use a toggle switch for on/off settings that take effect immediately.

## Usability guidance

- **Always pre-select one option.** Unlike checkboxes, radio button groups should have a default selection. Users cannot deselect all radio buttons in a group — they can only switch between options.
- **Always wrap in a `<fieldset>` with a `<legend>`.** The legend provides context for the group. Screen readers announce it before each option.
- **Use clear, concise labels.** Each option should be understandable on its own without reading the legend again.
- **Keep lists short.** For 7 or more options, switch to a select field. Long radio lists increase scanning time and push content below the fold.
- **Prefer vertical stacking.** Horizontal layout is only appropriate for 2–3 options with short labels. Vertical lists are easier to scan and more reliable across screen sizes.
- **Don't use for actions.** Radio buttons record a preference — they don't trigger navigation or submit a form. Use buttons for actions.

> **Differs from Figma:** The selected state uses NASA Blue per the HDS wayfinding rule — blue indicates on-page interaction. The radio dot, gap ring, and outer border all use palette-aware blue values.

## Accessibility

- **Group with `<fieldset>` and `<legend>`.** Every radio button group must be wrapped in a `<fieldset>` with a descriptive `<legend>`. This is required — screen readers use the legend to announce context for each option.
- **Unique `id` and matching `for`.** Each `<input>` needs a unique `id`, and its `<label>` must reference it with a matching `for` attribute.
- **Keyboard navigation:** Users **Tab** to the radio group as a whole, then use **arrow keys** (up/down or left/right) to move between options. Arrow keys both move focus and select the option — this is standard browser behavior.
- **Pre-selection aids keyboard users.** A pre-selected option ensures the group is reachable via Tab. An unselected radio group may be skipped entirely by keyboard navigation in some browsers.
- **Error messages:** Add `role="alert"` and an `id` to the error element. Reference that `id` via `aria-describedby` on each radio input in the group so screen readers associate the error with every option, not just the last one.
- **VoiceOver on iOS** does not fully support `<fieldset>` and `<legend>`. For maximum compatibility, add `aria-labelledby` referencing the legend `id` on each input.

> **Differs from USWDS:** USWDS recommends avoiding disabled states. Disabled radio buttons have low contrast, don't receive focus, and provide no feedback to screen readers. If you must disable an option, explain why using visible help text and use `aria-disabled="true"` with JavaScript instead of the HTML `disabled` attribute. See the [USWDS disabled state guidance](https://github.com/uswds/uswds/wiki/Disabled-States-Research-Findings-2023) for details.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS radio button accessibility tests](https://designsystem.digital.gov/components/radio-buttons/accessibility-tests/) for component-specific manual testing guidance.
