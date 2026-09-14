// ============================================================
// Language Selector — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_language-selector.scss`
// exists and no HDS rule anywhere in `src/scss/` targets
// `.usa-language*` — not even a palette bridge or dark-context mapping
// in `base/_palettes.scss`. Confirmed via `grep -rn "usa-language"
// src/scss/` (zero matches). Everything below is USWDS default
// styling inside `@layer uswds`, recolored only by the HDS theme
// settings in `_hds-uswds-theme.scss` that the component happens to
// consume (mostly button settings — see observations below).
//
// USWDS docs:   https://designsystem.digital.gov/components/language-selector/
// USWDS styles: packages/usa-language-selector/src/styles/_usa-language-selector.scss
// USWDS JS:     packages/usa-language-selector/src/index.js — REQUIRED
//               for the three-or-more dropdown variant.
//
// init() wires a click handler on `.usa-language__link` that toggles
// `aria-expanded` and the submenu's `hidden` attribute
// (uswds-core/src/js/utils/toggle.js), builds a FocusTrap over
// `.usa-language__submenu`, and binds an Escape-key handler — fixed in
// USWDS 3.14 (see docs/USWDS-3.14.0-IMPACT.md, "Language selector —
// the Escape key handler was fixed") — that closes the dropdown and
// refocuses the trigger. Without it the trigger button does nothing on
// click. `parameters.uswds: ['languageSelector']` opts this file into
// the decorator in `.storybook/preview.js` that runs that pass, so the
// toggle, focus trap, and Escape close are live in the canvas. The
// `Open` story below is authored directly with the open-state
// attributes (`aria-expanded="true"`, no `hidden`) rather than reached
// by a click, since lab stories carry no play function — closing it,
// Escape, outside-click, and the focus trap are therefore a coverage
// limit of this file, not something these stories exercise.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-language__submenu` hardcodes `background-color:
//     color("primary-darker")` — NASA Red 70v under the HDS theme
//     (`$theme-color-primary-darker: 'red-70v'` in
//     `_hds-uswds-theme.scss`) — instead of a `--hds-palette-*` custom
//     property. The dropdown panel is a fixed NASA-Red-Shade box on
//     every HDS palette, including blue, dark, and black, where a red
//     panel is the surface an author would least expect.
//   - The same rule hardcodes submenu link and hover color to
//     `color("white")` rather than `--hds-palette-link-text`. Text
//     stays legible only because the fixed red panel happens to
//     contrast against white — an accidental pairing, not a themed
//     one, and it will not adapt if the panel background is ever
//     re-themed without also touching this rule.
//   - The trigger is `.usa-language__link.usa-button`, so it inherits
//     the full HDS button theme from `components/_button.scss`: square
//     corners (`$theme-button-border-radius` → `$hds-border-radius:
//     0`), Inter type (`$theme-button-font-family: 'heading'`), NASA
//     Red fill, and the HDS focus-ring override in
//     `button-interactive-states`. The panel it opens gets none of
//     this — a themed trigger over an unthemed panel.
//   - No `$theme-navigation-font-family` override exists in
//     `_hds-uswds-theme.scss` (unlike `$theme-body-font-family: 'body'`
//     and `$theme-button-font-family: 'heading'`), so the submenu
//     list's `font-size`/`line-height` resolve against USWDS's own
//     un-overridden `"ui"` default rather than an HDS type slot.
//   - Cascade-layer trap, checked selector by selector: `base/_focus.scss`'s
//     bare `button:not([disabled]):focus-visible` lives in `@layer
//     hds-base`, but never reaches the trigger in practice — the more
//     specific `.usa-button` override in `@layer hds-components`
//     (`components/_button.scss`) wins regardless, since later layers
//     beat earlier ones at any specificity. The dropdown's plain `<a>`
//     submenu items match *no* HDS selector at all: `_focus.scss` has
//     no bare `a:focus-visible` rule, and `hds-link-appearance`
//     (`components/_link.scss`) is scoped to `.usa-link`. Keyboard
//     focus on a submenu item therefore falls through to the browser's
//     native outline — USWDS's own rule only sets `outline-offset`,
//     never a color or width — while `_focus.scss`'s
//     `a:focus:not(:focus-visible) { outline: none; }` *does* reach
//     the same links and suppresses that outline on mouse click.
//   - `.usa-language--small .usa-button` keys off
//     `$theme-header-font-family` and `$theme-button-small-width`,
//     neither of which `_hds-uswds-theme.scss` sets, so the
//     header-sized trigger's type and minimum width are USWDS
//     defaults too.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Language Selector',
  parameters: {
    ...labParams,
    uswds: ['languageSelector'],
  },
};

// --- Helpers ---

// Content: English and Spanish are the two languages NASA actually
// publishes in (nasa.gov and nasa.gov/es). French and Chinese are
// generic examples only, to show what a three-or-more dropdown looks
// like with more entries — not a claim about NASA's own translations.
const languageOptions = [
  { text: 'English', textEn: '', lang: 'en' },
  { text: 'Español', textEn: '(Spanish)', lang: 'es' },
  { text: 'Français', textEn: '(French)', lang: 'fr' },
  { text: '中文', textEn: '(Chinese)', lang: 'zh' },
];

/**
 * Two-language toggle — a single button, no dropdown. Matches
 * `usa-language-selector.twig`'s default demo exactly (`role="button"`
 * on a native `<button>` is redundant but is what USWDS itself emits).
 *
 * @param {object} options
 * @param {string} options.text Visible label
 * @param {string} options.lang `lang`/`xml:lang` of the label text
 */
const twoLanguageToggle = ({ text = 'Español', lang = 'es' } = {}) => `
  <div class="usa-language-container">
    <button type="button" class="usa-button" role="button">
      <span lang="${lang}" xml:lang="${lang}">${text}</span>
    </button>
  </div>`;

/**
 * Three-or-more dropdown. Carries `id` / `aria-controls`, so every
 * caller must pass a unique `prefix`.
 *
 * @param {object} options
 * @param {string} options.prefix    Unique id prefix
 * @param {string} options.label     Trigger label
 * @param {boolean} options.small    Apply `.usa-language--small`
 * @param {boolean} options.unstyled Apply `.usa-button--unstyled` to the trigger
 * @param {boolean} options.open     Author the open-state attributes directly
 * @param {Array}   options.languages `{ text, textEn, lang }` entries
 * @param {string}  options.more     Trailing "more languages" link text
 */
const languageDropdown = ({
  prefix = 'lang',
  label = 'Languages',
  small = false,
  unstyled = false,
  open = false,
  languages = languageOptions,
  more = 'Selected content in additional languages',
} = {}) => {
  const panelId = `${prefix}-language-options`;
  const containerClass = `usa-language-container${small ? ' usa-language--small' : ''}`;
  const triggerClass = `usa-button${unstyled ? ' usa-button--unstyled' : ''} usa-language__link`;

  const options = languages
    .map(
      (item) => `
        <li class="usa-language__submenu-item">
          <a href="#">
            <span lang="${item.lang}" xml:lang="${item.lang}">
              <strong>${item.text}</strong>${item.textEn ? ` ${item.textEn}` : ''}
            </span>
          </a>
        </li>`,
    )
    .join('');

  return `
    <div class="${containerClass}">
      <ul class="usa-language__primary usa-accordion">
        <li class="usa-language__primary-item">
          <button
            type="button"
            class="${triggerClass}"
            aria-expanded="${open ? 'true' : 'false'}"
            aria-controls="${panelId}"
          >
            ${label}
          </button>
          <ul id="${panelId}" class="usa-language__submenu"${open ? '' : ' hidden'}>
            ${options}
            <li class="usa-language__submenu-item">
              <a href="#">${more}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>`;
};

const twoLanguageArgTypes = {
  text: { control: 'text', name: 'Label' },
  lang: { control: 'text', name: 'lang attribute' },
};

// --- Variants ---

export const TwoLanguages = {
  name: 'Two languages',
  tags: ['!dev', '!test'],
  args: {
    text: 'Español',
    lang: 'es',
  },
  argTypes: twoLanguageArgTypes,
  render: (args = {}) => twoLanguageToggle(args),
};

export const ThreeOrMore = {
  name: 'Three or more (closed)',
  tags: ['!dev', '!test'],
  render: (args = {}) => languageDropdown({ ...args, prefix: 'three' }),
};

export const Small = {
  name: 'Small (header size)',
  tags: ['!dev', '!test'],
  render: (args = {}) => languageDropdown({ ...args, prefix: 'small', small: true }),
};

export const Unstyled = {
  name: 'Unstyled',
  tags: ['!dev', '!test'],
  render: (args = {}) => languageDropdown({ ...args, prefix: 'unstyled', unstyled: true }),
};

export const Open = {
  name: 'Open (authored, no interaction)',
  tags: ['!dev', '!test'],
  render: (args = {}) => languageDropdown({ ...args, prefix: 'open', open: true }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Two languages', twoLanguageToggle()),
      block('Three or more (closed)', languageDropdown({ prefix: 'all-three' })),
      block('Small (header size)', languageDropdown({ prefix: 'all-small', small: true })),
      block('Unstyled', languageDropdown({ prefix: 'all-unstyled', unstyled: true })),
      block('Open (authored, no interaction)', languageDropdown({ prefix: 'all-open', open: true })),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Two languages', twoLanguageToggle()),
      block('Three or more (closed)', languageDropdown({ prefix: `${palette}-three` })),
      block('Small (header size)', languageDropdown({ prefix: `${palette}-small`, small: true })),
      block('Unstyled', languageDropdown({ prefix: `${palette}-unstyled`, unstyled: true })),
      block('Open (authored, no interaction)', languageDropdown({ prefix: `${palette}-open`, open: true })),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Two languages', twoLanguageToggle()),
      block('Three or more (closed)', languageDropdown({ prefix: `${palette}-three-hover` })),
      block('Small (header size)', languageDropdown({ prefix: `${palette}-small-hover`, small: true })),
      block('Unstyled', languageDropdown({ prefix: `${palette}-unstyled-hover`, unstyled: true })),
      block('Open (authored, no interaction)', languageDropdown({ prefix: `${palette}-open-hover`, open: true })),
    ]),
  ),
};
