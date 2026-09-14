// ============================================================
// Combo Box — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_combo-box.scss` exists
// and `grep -rn "combo-box" src/scss/` returns nothing — not a palette
// bridge, not a print rule, nothing. Every `.usa-combo-box*` selector
// in `dist/css/hds.min.css` is a USWDS default inside `@layer uswds`,
// recolored only by the theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/combo-box/
// USWDS styles: packages/usa-combo-box/src/styles/_usa-combo-box.scss
// USWDS JS:     packages/usa-combo-box/src/index.js — REQUIRED.
//
// This is the most JS-dependent component in the lab set. The author
// writes a `<label>` and a `<select class="usa-select">` inside a
// `.usa-combo-box` div; `enhanceComboBox()` then replaces essentially
// all of it. It moves the label's `for` target onto a new element,
// stamps the label with `id="{selectId}-label"`, hides the authored
// `<select>` with `usa-sr-only` + `aria-hidden` + `tabindex="-1"`,
// blanks its `id` and value, and appends: a `<input type="text"
// role="combobox" class="usa-combo-box__input">` that inherits the
// select's old `id`, a clear-input button, a 1px separator span, a
// toggle-list button, a `<ul role="listbox" id="{selectId}--list">`,
// and a `role="status"` sr-only region. `displayList()` builds the
// `<li role="option">` children on demand with `aria-setsize`,
// `aria-posinset` and the `--focused` / `--selected` classes.
//
// Without that pass the canvas is a bare `<select>` — which is exactly
// what `docs/DOCUMENTATION.md` ("USWDS JS-dependent components") and
// `docs/ARCHITECTURE.md` record as a known Storybook limitation for
// this component. `parameters.uswds` opts this file into the
// re-initialization decorator in `.storybook/preview.js`, which closes
// that gap: these stories render the real enhanced combo box, not the
// native select fallback, and a `<select>` is the one thing the
// baseline must NOT be measured on.
//
// `enhanceComboBox()` guards itself with `if (comboBoxEl.dataset.enhanced)
// return;` and sets `data-enhanced = "true"` when it finishes. The
// `OpenList` story below uses that guard the same way
// `stories/lab/CharacterCount.stories.js` does — it hand-writes the
// post-enhancement DOM with the listbox open so the option states are
// visible in a static baseline, and `data-enhanced` makes `init()`
// skip it. The delegated listeners on `document.body` still reach it.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The visible control is not a themed control. HDS themes
//     `.usa-input`, `.usa-textarea` and `.usa-select` in
//     `src/scss/components/_form.scss`; the field a user actually sees
//     and types into is `.usa-combo-box__input`, which matches none of
//     those selectors. It takes `%block-input-general` +
//     `%block-input-styles` instead
//     (`uswds-core/src/styles/placeholders/_forms.scss`), compiled as
//     `border-color:#2e2e2e` (`$theme-color-base-dark: 'gray-80'`),
//     `border-radius:0`, `color:#000`, `height:2.5rem`, `padding:.5rem`
//     and `font-size:1rem` (`$theme-body-font-size: 'xs'` → 16px).
//     HDS inputs are `var(--hds-palette-border)`,
//     `$hds-border-radius-control`, `var(--hds-palette-control-text)`,
//     `height:auto`, `14px 16px` padding and `size('body','2xs')`
//     (14px). Same form, two different fields.
//   - No background token reaches it. HDS sets
//     `background-color: var(--hds-palette-input-bg)` on
//     `.usa-input/.usa-textarea/.usa-select`; the compiled
//     `.usa-combo-box__input` rule sets none at all, so the field falls
//     back to the browser's `field` colour while its text is pinned to
//     the hardcoded `color:#000` from `%block-input-styles`. The HDS
//     placeholder rule (`.usa-input::placeholder`) does not reach it
//     either, so `data-placeholder` text is browser-default grey.
//   - The listbox is an unthemed white sheet. `.usa-combo-box__list`
//     hardcodes `background-color: color("white")` and
//     `@include u-border(1px, "base-dark")`, and
//     `.usa-combo-box__list-option` hardcodes
//     `border-bottom: 1px solid color("base-lighter")` (`#f0f0f0`).
//     None of those are palette custom properties, so a themed field
//     opens an untouched white panel on all six palettes.
//   - `--selected` is the wrong red for the job.
//     `.usa-combo-box__list-option--selected` compiles to
//     `background-color:#d83933` from `color("primary")`
//     (`$theme-color-primary: 'red-50'`) — USWDS system red, not even
//     NASA Red `#f64137`. `_hds-tokens.scss` states the wayfinding
//     rule directly: red means "go somewhere", never on-page actions;
//     HDS paints on-page selection with `--hds-palette-control-fill`
//     (NASA Blue), which is what `.usa-checkbox`/`.usa-radio` use in
//     `_form.scss`.
//   - ⚠️ Cascade-layer collision on the focused option.
//     `.usa-combo-box__list-option--focused` sets
//     `outline: 2px dashed #162e51` (hardcoded `blue-warm-80v`, not
//     `$theme-focus-color`) in `@layer uswds`. The generated options
//     carry `tabindex`, so `[tabindex]:focus-visible` in
//     `src/scss/base/_focus.scss` matches them and applies
//     `hds-focus-ring`, whose first two declarations are
//     `position: relative; outline: none` — in `@layer hds-base`, which
//     outranks `uswds` regardless of specificity. The result is a
//     split indicator: `displayList()` marks the first (or selected)
//     option `--focused` with `skipFocus: true`, so at list-open the
//     USWDS navy outline shows; the moment `highlightOption()` actually
//     calls `.focus()` the outline is erased and the HDS dashed
//     `--hds-palette-focus` ring replaces it. Two different "current
//     option" treatments inside one keyboard interaction.
//   - The field gets half of the HDS focus treatment. The same
//     element-keyed `input:not([disabled]):focus-visible` rule in
//     `base/_focus.scss` gives `.usa-combo-box__input` the dashed ring,
//     but the solid 2px `var(--hds-palette-btn-secondary-bg)` border
//     highlight in `_form.scss` is class-keyed to
//     `.usa-input/.usa-textarea/.usa-select` and never fires. AGENTS.md
//     records that solid-blue border as the deliberate treatment for
//     form text inputs (Issue #20) — the combo box is the one text
//     field in the system that does not get it.
//   - Everything else is hardcoded USWDS chrome: the separator is
//     `color("gray-cool-20")` (`#c6cace`), the toggle and clear glyphs
//     are `add-background-svg("usa-icons/expand_more" / "close")` at
//     `opacity: .6`, and the disabled state is `u-disabled` —
//     `color:#454545` on `background-color:#c9c9c9`, ignoring
//     `--hds-palette-disabled` / `--hds-palette-disabled-bg` that
//     `.usa-select:disabled` uses two elements away.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Combo Box',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['comboBox'],
  },
};

// --- Option data (module scope: `text`, never `label`) ---

/** NASA centers and facilities — public agency locations. */
const centerOptions = [
  { value: 'ames', text: 'Ames Research Center' },
  { value: 'armstrong', text: 'Armstrong Flight Research Center' },
  { value: 'glenn', text: 'Glenn Research Center' },
  { value: 'goddard', text: 'Goddard Space Flight Center' },
  { value: 'headquarters', text: 'NASA Headquarters' },
  { value: 'jpl', text: 'Jet Propulsion Laboratory' },
  { value: 'johnson', text: 'Johnson Space Center' },
  { value: 'kennedy', text: 'Kennedy Space Center' },
  { value: 'langley', text: 'Langley Research Center' },
  { value: 'marshall', text: 'Marshall Space Flight Center' },
  { value: 'michoud', text: 'Michoud Assembly Facility' },
  { value: 'stennis', text: 'Stennis Space Center' },
  { value: 'wallops', text: 'Wallops Flight Facility' },
  { value: 'white-sands', text: 'White Sands Test Facility' },
];

/**
 * Solar system bodies — the "more than 15 options" case the USWDS
 * usability guidance names as the reason to reach for a combo box at
 * all, and the case where the 12.1em `max-height` scroll on
 * `.usa-combo-box__list` actually engages.
 */
const bodyOptions = [
  { value: 'mercury', text: 'Mercury' },
  { value: 'venus', text: 'Venus' },
  { value: 'earth', text: 'Earth' },
  { value: 'moon', text: 'Moon' },
  { value: 'mars', text: 'Mars' },
  { value: 'phobos', text: 'Phobos' },
  { value: 'deimos', text: 'Deimos' },
  { value: 'ceres', text: 'Ceres' },
  { value: 'vesta', text: 'Vesta' },
  { value: 'bennu', text: 'Bennu' },
  { value: 'ryugu', text: 'Ryugu' },
  { value: 'psyche', text: 'Psyche' },
  { value: 'jupiter', text: 'Jupiter' },
  { value: 'io', text: 'Io' },
  { value: 'europa', text: 'Europa' },
  { value: 'ganymede', text: 'Ganymede' },
  { value: 'callisto', text: 'Callisto' },
  { value: 'saturn', text: 'Saturn' },
  { value: 'titan', text: 'Titan' },
  { value: 'enceladus', text: 'Enceladus' },
  { value: 'mimas', text: 'Mimas' },
  { value: 'iapetus', text: 'Iapetus' },
  { value: 'uranus', text: 'Uranus' },
  { value: 'miranda', text: 'Miranda' },
  { value: 'titania', text: 'Titania' },
  { value: 'neptune', text: 'Neptune' },
  { value: 'triton', text: 'Triton' },
  { value: 'pluto', text: 'Pluto' },
  { value: 'charon', text: 'Charon' },
  { value: 'arrokoth', text: 'Arrokoth' },
  { value: 'eris', text: 'Eris' },
  { value: 'makemake', text: 'Makemake' },
  { value: 'haumea', text: 'Haumea' },
  { value: 'halley', text: '1P/Halley' },
  { value: '67p', text: '67P/Churyumov-Gerasimenko' },
];

// --- Helpers ---

const options = (items) => items.map((o) => `<option value="${o.value}">${o.text}</option>`).join('\n        ');

/**
 * A combo box in its pre-enhancement form — what an author writes and
 * what the USWDS docs page shows. `enhanceComboBox()` reads the
 * `<select>`, the `data-*` attributes on the root and the `label[for]`
 * pairing, then builds the input, buttons, listbox and status region.
 *
 * Every generated id derives from the authored `<select id>`
 * (`{id}--list`, `{id}--list--option-N`, `{id}-label`), so `prefix`
 * has to reach all the way down: the palette stories stack six copies
 * of this markup in one DOM, and `enhanceComboBox()` resolves the
 * label with a document-wide `querySelector`.
 *
 * @param {object} options
 * @param {string} options.prefix       Unique id prefix for this instance
 * @param {string} options.labelText    Field label
 * @param {Array} options.items         `{ value, text }` options
 * @param {string} options.firstOption  Text of the empty first option
 * @param {string} options.defaultValue `data-default-value` — pre-selects an option
 * @param {string} options.placeholder  `data-placeholder` — placeholder on the built input
 * @param {boolean} options.disabled    Native `disabled` on the select
 * @param {boolean} options.ariaDisabled `aria-disabled="true"` on the select
 */
const comboBox = ({
  prefix = 'cb',
  labelText = 'Field center',
  items = centerOptions,
  firstOption = 'Select a center',
  defaultValue = '',
  placeholder = '',
  disabled = false,
  ariaDisabled = false,
} = {}) => {
  const rootAttrs = [
    defaultValue ? `data-default-value="${defaultValue}"` : '',
    placeholder ? `data-placeholder="${placeholder}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const selectAttrs = [disabled ? 'disabled' : '', ariaDisabled ? 'aria-disabled="true"' : '']
    .filter(Boolean)
    .join(' ');

  return `
  <label class="usa-label" for="${prefix}-select">${labelText}</label>
  <div class="usa-combo-box" ${rootAttrs}>
    <select class="usa-select" name="${prefix}-select" id="${prefix}-select" ${selectAttrs}>
      <option value>${firstOption}</option>
      ${options(items)}
    </select>
  </div>`;
};

/**
 * The open listbox, authored as the post-enhancement DOM.
 *
 * The listbox only exists while the component is open, and
 * `.usa-combo-box__list` is `position: absolute`, so nothing about the
 * option styling — the hardcoded white sheet, the `#d83933` selected
 * fill, the `#162e51` focused outline — is visible in a static
 * baseline otherwise. This builder writes what
 * `enhanceComboBox()` + `displayList()` produce (hidden `<select>`,
 * `role="combobox"` input, both buttons, separator, `role="listbox"`
 * `<ul>`, sr-only status) and sets `data-enhanced="true"` on the root
 * so the decorator's `init()` returns early instead of enhancing it a
 * second time. The delegated listeners on `document.body` still reach
 * it, so clicking an option or typing behaves normally.
 *
 * The wrapper's `min-height` is demo scaffolding: the absolutely
 * positioned list would otherwise sit on top of the next block.
 *
 * @param {object} options
 * @param {string} options.prefix        Unique id prefix for this instance
 * @param {string} options.labelText     Field label
 * @param {Array} options.items          `{ value, text }` options to render open
 * @param {string} options.selectedValue Value carrying `--selected` + `--focused`
 */
const openComboBox = ({
  prefix = 'cb-open',
  labelText = 'Field center',
  items = centerOptions.slice(0, 6),
  selectedValue = 'goddard',
} = {}) => {
  const listId = `${prefix}-select--list`;
  const selected = items.find((o) => o.value === selectedValue) || items[0];
  const activeId = `${listId}--option-${items.indexOf(selected)}`;

  const listOptions = items
    .map((o, i) => {
      const isSelected = o.value === selected.value;
      const classes = isSelected
        ? 'usa-combo-box__list-option usa-combo-box__list-option--selected usa-combo-box__list-option--focused'
        : 'usa-combo-box__list-option';
      return `<li
          aria-setsize="${items.length}"
          aria-posinset="${i + 1}"
          aria-selected="${isSelected}"
          id="${listId}--option-${i}"
          class="${classes}"
          tabindex="${isSelected ? '0' : '-1'}"
          role="option"
          data-value="${o.value}"
        >${o.text}</li>`;
    })
    .join('\n        ');

  return `
  <div style="min-height: 20rem;">
    <label class="usa-label" id="${prefix}-select-label" for="${prefix}-select">${labelText}</label>
    <div class="usa-combo-box usa-combo-box--pristine" data-enhanced="true">
      <select class="usa-select usa-sr-only usa-combo-box__select" name="${prefix}-select" aria-hidden="true" tabindex="-1">
        <option value>Select a center</option>
        ${options(items)}
      </select>
      <input
        id="${prefix}-select"
        aria-owns="${listId}"
        aria-controls="${listId}"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-activedescendant="${activeId}"
        autocapitalize="off"
        autocomplete="off"
        class="usa-combo-box__input"
        type="text"
        role="combobox"
        value="${selected.text}"
      />
      <span class="usa-combo-box__clear-input__wrapper" tabindex="-1">
        <button type="button" class="usa-combo-box__clear-input" aria-label="Clear the select contents">&nbsp;</button>
      </span>
      <span class="usa-combo-box__input-button-separator">&nbsp;</span>
      <span class="usa-combo-box__toggle-list__wrapper" tabindex="-1">
        <button type="button" tabindex="-1" class="usa-combo-box__toggle-list" aria-label="Toggle the dropdown list">&nbsp;</button>
      </span>
      <ul tabindex="-1" id="${listId}" class="usa-combo-box__list" role="listbox" aria-labelledby="${prefix}-select-label">
        ${listOptions}
      </ul>
      <div class="usa-combo-box__status usa-sr-only" role="status">${items.length} results available.</div>
    </div>
  </div>`;
};

const comboBoxArgTypes = {
  labelText: { control: 'text', name: 'Label' },
  firstOption: { control: 'text', name: 'Empty option text' },
  placeholder: { control: 'text', name: 'Placeholder (data-placeholder)' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    labelText: 'Field center',
    firstOption: 'Select a center',
    placeholder: '',
  },
  argTypes: comboBoxArgTypes,
  render: (args = {}) => comboBox({ prefix: 'default', ...args }),
};

export const DefaultValue = {
  name: 'Pre-selected value',
  tags: ['!dev', '!test'],
  args: {
    labelText: 'Field center',
    firstOption: 'Select a center',
    defaultValue: 'jpl',
  },
  argTypes: comboBoxArgTypes,
  render: (args = {}) => comboBox({ prefix: 'default-value', defaultValue: 'jpl', ...args }),
};

export const Placeholder = {
  name: 'Placeholder',
  tags: ['!dev', '!test'],
  render: () =>
    comboBox({
      prefix: 'placeholder',
      labelText: 'Field center',
      placeholder: 'Start typing a center name',
    }),
};

export const Disabled = {
  name: 'Disabled',
  tags: ['!dev', '!test'],
  render: () => comboBox({ prefix: 'disabled', labelText: 'Field center (disabled)', disabled: true }),
};

export const AriaDisabled = {
  name: 'Aria-disabled',
  tags: ['!dev', '!test'],
  render: () => comboBox({ prefix: 'aria-disabled', labelText: 'Field center (aria-disabled)', ariaDisabled: true }),
};

export const ManyOptions = {
  name: 'Many options',
  tags: ['!dev', '!test'],
  render: () =>
    comboBox({
      prefix: 'many',
      labelText: 'Target body',
      items: bodyOptions,
      firstOption: 'Select a body',
    }),
};

export const OpenList = {
  name: 'Open listbox',
  tags: ['!dev', '!test'],
  render: () => openComboBox({ prefix: 'open' }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default', comboBox({ prefix: 'all-default' })),
      block('Pre-selected value', comboBox({ prefix: 'all-value', defaultValue: 'jpl' })),
      block('Placeholder', comboBox({ prefix: 'all-placeholder', placeholder: 'Start typing a center name' })),
      block('Disabled', comboBox({ prefix: 'all-disabled', disabled: true })),
      block('Aria-disabled', comboBox({ prefix: 'all-aria-disabled', ariaDisabled: true })),
      block(
        'Many options',
        comboBox({ prefix: 'all-many', labelText: 'Target body', items: bodyOptions, firstOption: 'Select a body' }),
      ),
      block('Open listbox', openComboBox({ prefix: 'all-open' })),
    ]),
};

// --- Palette accessibility tests ---

const paletteStack = (prefix) =>
  stack([
    block('Default', comboBox({ prefix: `${prefix}-default` })),
    block('Pre-selected value', comboBox({ prefix: `${prefix}-value`, defaultValue: 'jpl' })),
    block('Placeholder', comboBox({ prefix: `${prefix}-placeholder`, placeholder: 'Start typing a center name' })),
    block('Disabled', comboBox({ prefix: `${prefix}-disabled`, disabled: true })),
    block('Aria-disabled', comboBox({ prefix: `${prefix}-aria-disabled`, ariaDisabled: true })),
    block(
      'Many options',
      comboBox({
        prefix: `${prefix}-many`,
        labelText: 'Target body',
        items: bodyOptions,
        firstOption: 'Select a body',
      }),
    ),
    block('Open listbox', openComboBox({ prefix: `${prefix}-open` })),
  ]);

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) => paletteStack(palette)),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) => paletteStack(`${palette}-hover`)),
};
