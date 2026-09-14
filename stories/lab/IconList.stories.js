// ============================================================
// Icon List — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_icon-list.scss` exists
// and `grep -rn "usa-icon-list" src/scss/` returns nothing at all —
// not even a surface-bridge or print match. Everything below is
// USWDS default styling inside `@layer uswds`, recolored only by the
// HDS theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/icon-list/
// USWDS styles: packages/usa-icon-list/src/styles/_usa-icon-list.scss
//               (also packages/usa-icon/src/styles/_usa-icon.scss for
//               the `.usa-icon` base rules the list depends on)
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - Unlike most lab components, the *text* here is not stranded: the
//     "always active" palette wiring in `base/_elements.scss` sets
//     `color: var(--hds-palette-text)` on every element inside a
//     `.hds-palette-*` container and `color: var(--hds-palette-heading)`
//     on `h1`–`h6`. Since `.usa-icon-list__content` and
//     `.usa-icon-list__title` set no color of their own
//     (`_usa-icon-list.scss` only sets `font-size`/`padding`/`margin`
//     on them), the list's body copy and rich-content headings inherit
//     the correct HDS palette color on all six palettes.
//   - The icon glyph is a different story. `.usa-icon` sets
//     `fill: currentColor` (`packages/usa-icon/src/styles/_usa-icon.scss`),
//     so an *uncolored* icon (no `.usa-icon-list--{color}` modifier, no
//     `text-{color}` utility on `.usa-icon-list__icon`) also inherits
//     `--hds-palette-text` correctly. The moment a color is applied —
//     which is how the USWDS docs page demonstrates the component in
//     every example but one — `_usa-icon-list.scss`'s `@each $color,
//     $grades in $all-project-colors` loop sets `color: color($prefix)`,
//     a static USWDS system color (e.g. `$theme-color-primary: 'red-50'`,
//     `$theme-color-success: 'green-cool-30v'`). That color is fixed on
//     every palette; it never reads `--hds-palette-*`.
//   - `.usa-icon-list` and its `<li>` items are NOT reached by HDS's own
//     `.usa-list` rules in `src/scss/components/_list.scss` — the
//     USWDS icon-list markup never carries the `.usa-list` class (only
//     `.usa-icon-list`, `.usa-icon-list__item`, etc.), so the smaller
//     (14px) list-item type, the NASA Blue `::marker`, and the DM Mono
//     `::before` ordered-numeral treatment documented there do not
//     apply here at all — not because of a specificity loss, but
//     because the selectors simply never match. This component is
//     genuinely untouched, not partially double-themed.
//   - `$theme-icon-list-font-family: 'body'` and
//     `$theme-icon-list-title-font-family: 'heading'`
//     (`uswds-core/.../_settings-components.scss`, un-overridden) both
//     happen to resolve through HDS's own role mapping
//     (`$theme-font-role-body: 'sans'` → Public Sans,
//     `$theme-font-role-heading: 'serif'` → Inter) to the same
//     typefaces HDS uses for body copy and headings — so, unlike Tag's
//     `'ui'` role (which resolves to Inter for label text), icon-list
//     typography does not read as foreign.
//   - Icon *size*, however, is untouched by any HDS token: `$icon-size:
//     px-to-rem($theme-body-font-size)` times a hardcoded `1.5` factor,
//     and each `.usa-icon-list--size-{token}` responsive variant reads
//     raw `$all-type-scale` values with no HDS override — this is the
//     stock USWDS type scale, not the `-1 step` HDS applies to
//     `.usa-list` items.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Icon List',
  parameters: labParams,
};

// --- Helpers ---

const uswdsSprite = 'assets/img/sprite.svg';
const hdsSprite = 'assets/img/hds-sprite.svg';

/**
 * One `.usa-icon-list__item`.
 *
 * @param {object} options
 * @param {string} options.icon    Icon id in the chosen sprite
 * @param {string} options.sprite  `uswds` | `hds` — which sprite file to reference
 * @param {string} options.color   `.usa-icon-list__icon` utility color, e.g. `green` (no `text-` prefix)
 * @param {string} options.content Inner markup for `.usa-icon-list__content` — plain text or heading + body
 */
const iconListItem = ({ icon = 'check_circle', sprite = 'uswds', color = '', content = '' } = {}) => `
    <li class="usa-icon-list__item">
      <div class="usa-icon-list__icon${color ? ` text-${color}` : ''}">
        <svg class="usa-icon" aria-hidden="true" role="img">
          <use href="${sprite === 'hds' ? hdsSprite : uswdsSprite}#${icon}"></use>
        </svg>
      </div>
      <div class="usa-icon-list__content">${content}</div>
    </li>`;

/**
 * `<ul class="usa-icon-list">` wrapper.
 *
 * @param {object} options
 * @param {Array<object>} options.items Item option objects, passed to `iconListItem`
 * @param {string} options.color        `.usa-icon-list--{color}` list-level modifier (no prefix)
 * @param {string} options.size         `.usa-icon-list--size-{token}` modifier (no prefix)
 */
const iconList = ({ items = [], color = '', size = '' } = {}) => {
  const classes = ['usa-icon-list', color ? `usa-icon-list--${color}` : '', size ? `usa-icon-list--size-${size}` : '']
    .filter(Boolean)
    .join(' ');
  return `<ul class="${classes}">\n${items.map((item) => iconListItem(item)).join('\n')}\n    </ul>`;
};

/** Heading + body markup for `.usa-icon-list__content` in the rich-content variant. */
const richContent = (title, body) => `<h4 class="usa-icon-list__title">${title}</h4>\n<p>${body}</p>`;

// Fixed item data — hoisted to module scope per docs/DOCUMENTATION.md
// "Parser safety for object arrays" (no `label:` keys are used here,
// but the convention is followed for consistency with other lab files).

const checklistItems = [
  { icon: 'check_circle', color: 'green', content: 'Spacecraft telemetry confirmed nominal' },
  { icon: 'check_circle', color: 'green', content: 'Launch pad cleared for final countdown' },
  { icon: 'cancel', color: 'red', content: 'Weather constraints violated — hold count' },
];

const openDataItems = [
  { icon: 'thumb_up_alt', content: 'Available to any researcher at no cost' },
  { icon: 'thumb_up_alt', content: 'Updated as new mission data arrives' },
  { icon: 'thumb_up_alt', content: 'Documented with mission-standard metadata' },
];

const astronautCandidateItems = [
  {
    icon: 'help',
    color: 'blue',
    content: '<span class="text-bold">Eligibility.</span> Do you meet the U.S. citizenship and degree requirements?',
  },
  {
    icon: 'help',
    color: 'blue',
    content: '<span class="text-bold">Experience.</span> Do you have the required flight or professional experience?',
  },
  {
    icon: 'help',
    color: 'blue',
    content: '<span class="text-bold">Timing.</span> Is the astronaut candidate application window currently open?',
  },
];

const launchViewingItems = [
  {
    icon: 'check_circle',
    color: 'ink',
    content: richContent(
      'Check the launch window',
      'Launch times shift as engineers work toward T-0; confirm the current target time before you travel.',
    ),
  },
  {
    icon: 'check_circle',
    color: 'ink',
    content: richContent(
      'Choose a public viewing site',
      'NASA visitor centers, such as the one at Kennedy Space Center, publish approved viewing locations for each launch.',
    ),
  },
  {
    icon: 'check_circle',
    color: 'ink',
    content: richContent(
      'Monitor for weather holds',
      'Range safety rules can scrub a launch attempt with little notice; check for updates through the countdown.',
    ),
  },
];

const hdsSpriteItems = [
  { icon: 'check-circled', sprite: 'hds', color: 'green', content: 'Orion heat shield inspection complete' },
  {
    icon: 'x-circled',
    sprite: 'hds',
    color: 'red',
    content: 'Do not proceed — anomaly detected in propulsion telemetry',
  },
];

const sizeArgTypes = {
  size: {
    control: 'select',
    options: ['', 'xs', 'sm', 'md', 'lg', 'xl'],
    name: 'Size modifier',
  },
};

const colorArgTypes = {
  color: {
    control: 'select',
    options: ['primary', 'secondary', 'error', 'success'],
    name: 'Color modifier',
  },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: { size: '' },
  argTypes: sizeArgTypes,
  render: (args = {}) => iconList({ items: checklistItems, size: args.size }),
};

export const ColorModifier = {
  name: 'Color modifier',
  tags: ['!dev', '!test'],
  args: { color: 'primary' },
  argTypes: colorArgTypes,
  render: (args = {}) => iconList({ items: openDataItems, color: args.color || 'primary' }),
};

export const SizeLarge = {
  name: 'Size — large, inline bold',
  tags: ['!dev', '!test'],
  render: () => iconList({ items: astronautCandidateItems, size: 'lg' }),
};

export const RichContent = {
  name: 'Rich content (heading + body)',
  tags: ['!dev', '!test'],
  render: () => iconList({ items: launchViewingItems }),
};

export const HdsSpriteIcons = {
  name: 'HDS sprite icons',
  tags: ['!dev', '!test'],
  render: () => iconList({ items: hdsSpriteItems }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default', iconList({ items: checklistItems })),
      block('Color modifier (primary)', iconList({ items: openDataItems, color: 'primary' })),
      block('Size — large, inline bold', iconList({ items: astronautCandidateItems, size: 'lg' })),
      block('Rich content (heading + body)', iconList({ items: launchViewingItems })),
      block('HDS sprite icons', iconList({ items: hdsSpriteItems })),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: paletteRender(AllVariants.render),
};
