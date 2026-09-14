// ============================================================
// Banner — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_banner.scss` exists.
// `grep -rn "usa-banner" src/scss/` returns four matches and none of
// them theme the component: `base/_palettes.scss:326` is the surface
// bridge (see below), `base/_print.scss:56` hides the bar in print,
// `components/_site-alert.scss:10` is a comment, and
// `components/_accordion.scss:39` is the HDS accordion's scope guard
// (`$_accordion-guard: ':not(.usa-banner *):not(.usa-nav *)'`) which
// deliberately keeps the themed accordion OUT of the banner. So the
// banner and its toggle are USWDS defaults inside `@layer uswds`,
// recolored only by the shared settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/banner/
// USWDS styles: packages/usa-banner/src/styles/_usa-banner.scss
//               packages/usa-accordion/src/styles/_usa-accordion.scss
// USWDS JS:     packages/usa-banner/src/index.js — REQUIRED
//               packages/usa-accordion/src/index.js — REQUIRED
//
// The banner is an accordion in disguise. `banner.init()` walks
// `.usa-banner__header [aria-controls]` and calls the shared `toggle`
// util, which sets `aria-expanded` on the trigger and adds or removes
// `hidden` on the `#id` it controls; the delegated CLICK handler then
// toggles both that attribute and the `.usa-banner__header--expanded`
// class that drives the mobile close button. Without that pass the
// authored markup renders with the guidance panel permanently open and
// no initial state at all, so `parameters.uswds` opts this file into
// the decorator in `.storybook/preview.js`.
//
// ⚠️ `banner.init()` reads `button.getAttribute(EXPANDED_CLASS)` where
// `EXPANDED_CLASS = "usa-banner__header--expanded"` — a class name used
// as an attribute name, so it is always `null` and `expanded` is always
// `false`. Every banner it touches is forced closed no matter what the
// markup authored. `accordion.init()` reads the real `aria-expanded`
// and honours it, so the expanded stories below declare
// `uswds: ['accordion']` alone to get a baseline of the open state.
// The older accordion decorator in `.storybook/preview.js` only
// collapses panels whose trigger is `aria-expanded="false"`; it never
// opens one, so it agrees with both.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The bar has no tonal separation from the page. HDS leaves
//     `$theme-banner-background-color` at the USWDS default
//     `"base-lightest"` (uswds-core `_settings-components.scss:40`) but
//     remaps `$theme-color-base-lightest: 'white'`
//     (`_hds-uswds-theme.scss:74`) where stock USWDS ships `gray-5`. The
//     surface bridge then repaints it `$hds-color-spacesuit-white`
//     (#ffffff) from the higher `hds-base` layer. A borderless white bar
//     on a white page is invisible until it is expanded.
//   - The banner typesets in the wrong family. `$theme-banner-font-family`
//     is the USWDS default `"ui"`, and HDS maps
//     `$theme-font-role-ui: 'serif'` → `$theme-font-type-serif: 'inter'`
//     (`_hds-uswds-theme.scss:233–235`), so the compliance bar renders in
//     Inter while HDS body copy around it is Public Sans
//     (`$theme-font-role-body: 'sans'`).
//   - The "Here's how you know" trigger is not a link colour.
//     `.usa-banner__button` and `.usa-banner__header-action` both run
//     `set-link-from-bg($theme-banner-background-color, $theme-banner-link-color)`
//     with `$theme-banner-link-color` left at `default`, which resolves
//     against HDS's `$theme-link-color: 'ink'`
//     (`_hds-uswds-theme.scss:203`) — black underlined text, with the
//     chevron `::after` tinted from the same token.
//   - ⚠️ Focus-ring collision at mobile widths (source-derived, not
//     rendered). `base/_focus.scss` gives every enabled button
//     `hds-focus-ring`, and that mixin (`_hds-mixins.scss:96–135`) sets
//     `position: relative` plus a masked `::before` on the host. Below
//     `tablet` `.usa-banner__button` is `u-pin("left")` + `u-pin("y")`
//     (i.e. `position: absolute`) and, when expanded, paints its own
//     `base-lighter` close swatch in `::before`. `hds-base` outranks
//     `uswds`, so keyboard focus there should both re-position the
//     trigger and erase the close swatch.
//   - It does not vary across palettes, on purpose. `base/_palettes.scss:326`
//     pins `:where(.usa-banner, .usa-header, .usa-footer)` to
//     `_scheme-light` with `--hds-palette-bg: $hds-color-spacesuit-white`.
//     That is a readability guardrail, not theming (AGENTS.md → "USWDS
//     surface bridges"), so the six palette copies below are expected to
//     be near-identical. A difference between them would be the bug.
//
// Content note: the banner's copy is fixed by policy — USWDS usability
// guidance says not to customise it — so the strings below are the
// published USWDS text verbatim rather than NASA subject matter. NASA is
// a civil agency on a `.gov` domain; the `.mil` variants are included
// for coverage of the documented markup only.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Banner',
  parameters: {
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    ...labParams,
    uswds: ['banner', 'accordion'],
  },
};

/**
 * Parameters for stories that author an already-expanded panel.
 *
 * `banner.init()` forces every trigger closed (see the ⚠️ note above),
 * so these stories run `accordion.init()` alone, which reads the real
 * `aria-expanded`. The banner's own click handler is delegated from
 * `document.body` by the shipped bundle and still works either way.
 */
const expandedParams = { ...labParams, uswds: ['accordion'] };

// --- Helpers ---

/**
 * The padlock SVG from the USWDS markup, verbatim.
 *
 * The hardcoded `fill="#000000"` is upstream's; `_usa-banner.scss` sets
 * `.usa-banner__lock-image path { fill: currentColor }`, so the
 * attribute never wins. `aria-labelledby` points at the `<desc>`, which
 * is why both ids have to be unique per copy.
 *
 * @param {string} prefix Unique id prefix for this copy
 */
const lockSvg = (prefix) => `<span class="icon-lock"><svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="64"
              viewBox="0 0 52 64"
              class="usa-banner__lock-image"
              role="img"
              aria-labelledby="${prefix}-lock-description"
              focusable="false"
            >
              <title id="${prefix}-lock-title">Lock</title>
              <desc id="${prefix}-lock-description">Locked padlock icon</desc>
              <path
                fill="#000000"
                fill-rule="evenodd"
                d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"
              />
            </svg></span>`;

/**
 * A government banner in its authored (pre-`init()`) form.
 *
 * The trigger carries `aria-controls`, the panel carries the matching
 * `id`, and the lock SVG carries `aria-labelledby` — three id pairings
 * that would collide six times over in the stacked palette stories, so
 * every builder takes a `prefix`.
 *
 * `lang` is not in the published USWDS markup; it is added here so the
 * Spanish copies satisfy WCAG 3.1.2 (Language of Parts).
 *
 * @param {object} options
 * @param {string} options.prefix         Unique id prefix for this copy
 * @param {string} options.regionName     `aria-label` for the `<section>`
 * @param {string} options.headerText     Bar text, mirrored to screen readers
 * @param {string} options.actionText     Trigger text ("Here's how you know")
 * @param {string} options.domainHeading  First guidance column heading
 * @param {string} options.domainBody     First guidance column copy
 * @param {string} options.httpsHeading   Second guidance column heading
 * @param {string} options.httpsPretext   Copy before the inline padlock
 * @param {string} options.httpsPosttext  Copy after the inline padlock
 * @param {string} options.lang           `lang` attribute on the `<section>`
 * @param {boolean} options.expanded      Author the panel open
 */
const banner = ({
  prefix = 'banner',
  regionName = 'Official website of the United States government',
  headerText = 'An official website of the United States government',
  actionText = 'Here’s how you know',
  domainHeading = 'Official websites use .gov',
  domainBody = 'A <strong>.gov</strong> website belongs to an official government organization in the United States.',
  httpsHeading = 'Secure .gov websites use HTTPS',
  httpsPretext = 'A <strong>lock</strong> (',
  httpsPosttext = ') or <strong>https://</strong> means you’ve safely connected to the .gov website. Share sensitive information only on official, secure websites.',
  lang = '',
  expanded = false,
} = {}) => `
  <section class="usa-banner"${lang ? ` lang="${lang}"` : ''} aria-label="${regionName}">
    <div class="usa-accordion">
      <header class="usa-banner__header${expanded ? ' usa-banner__header--expanded' : ''}">
        <div class="usa-banner__inner">
          <div class="grid-col-auto">
            <img aria-hidden="true" class="usa-banner__header-flag" src="assets/img/us_flag_small.png" alt="" />
          </div>
          <div class="grid-col-fill tablet:grid-col-auto" aria-hidden="true">
            <p class="usa-banner__header-text">${headerText}</p>
            <p class="usa-banner__header-action">${actionText}</p>
          </div>
          <button
            type="button"
            class="usa-accordion__button usa-banner__button"
            aria-expanded="${expanded}"
            aria-controls="${prefix}-content"
          >
            <span class="usa-banner__button-text">${actionText}</span>
          </button>
        </div>
      </header>
      <div class="usa-banner__content usa-accordion__content" id="${prefix}-content">
        <div class="grid-row grid-gap-lg">
          <div class="usa-banner__guidance tablet:grid-col-6">
            <img
              class="usa-banner__icon usa-media-block__img"
              src="assets/img/icon-dot-gov.svg"
              role="img"
              alt=""
              aria-hidden="true"
            />
            <div class="usa-media-block__body">
              <p><strong>${domainHeading}</strong><br />${domainBody}</p>
            </div>
          </div>
          <div class="usa-banner__guidance tablet:grid-col-6">
            <img
              class="usa-banner__icon usa-media-block__img"
              src="assets/img/icon-https.svg"
              role="img"
              alt=""
              aria-hidden="true"
            />
            <div class="usa-media-block__body">
              <p><strong>${httpsHeading}</strong><br />${httpsPretext}${lockSvg(prefix)}${httpsPosttext}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

// Copy sets, hoisted to module scope so no render function ever holds
// an object array (docs/DOCUMENTATION.md → "Parser safety for object
// arrays"). No key is named `label` — the `<section>` name is
// `regionName` for the same reason.

const dotMilContent = {
  regionName: 'Official website of the United States government,',
  domainHeading: 'Official websites use .mil',
  domainBody: 'A <strong>.mil</strong> website belongs to an official U.S. Department of Defense organization.',
  httpsHeading: 'Secure .mil websites use HTTPS',
  httpsPosttext:
    ') or <strong>https://</strong> means you’ve safely connected to the .mil website. Share sensitive information only on official, secure websites.',
};

const spanishContent = {
  lang: 'es',
  regionName: 'Un sitio oficial del Gobierno de Estados Unidos',
  headerText: 'Un sitio oficial del Gobierno de Estados Unidos',
  actionText: 'Así es como usted puede verificarlo',
  domainHeading: 'Los sitios web oficiales usan .gov',
  domainBody: 'Un sitio web <strong>.gov</strong> pertenece a una organización oficial del Gobierno de Estados Unidos.',
  httpsHeading: 'Los sitios web seguros .gov usan HTTPS',
  httpsPretext: 'Un <strong>candado</strong> (',
  httpsPosttext:
    ') o <strong>https://</strong> significa que usted se conectó de forma segura a un sitio web .gov. Comparta información sensible sólo en sitios web oficiales y seguros.',
};

const spanishDotMilContent = {
  ...spanishContent,
  regionName: 'Un sitio oficial del Gobierno de Estados Unidos,',
  domainHeading: 'Los sitios web oficiales usan .mil',
  domainBody:
    'Un sitio web <strong>.mil</strong> pertenece a una organización oficial del Departamento de Defensa de EE. UU.',
  httpsHeading: 'Los sitios web seguros .mil usan HTTPS',
  httpsPosttext:
    ') o <strong>https://</strong> significa que usted se conectó de forma segura a un sitio web .mil. Comparta información sensible sólo en sitios web oficiales y seguros.',
};

const contentArgTypes = {
  headerText: { control: 'text', name: 'Bar text' },
  actionText: { control: 'text', name: 'Trigger text' },
  regionName: { control: 'text', name: 'Section aria-label' },
  expanded: { control: 'boolean', name: 'Expanded' },
};

/** Every documented variant, once, with ids scoped to `prefix`. */
const allVariantBlocks = (prefix) => [
  block('Default — .gov, collapsed', banner({ prefix: `${prefix}-default` })),
  block('Default — .gov, expanded', banner({ prefix: `${prefix}-expanded`, expanded: true })),
  block('.mil domain, collapsed', banner({ prefix: `${prefix}-mil`, ...dotMilContent })),
  block('Spanish — .gov, collapsed', banner({ prefix: `${prefix}-es`, ...spanishContent })),
  block('Spanish — .gov, expanded', banner({ prefix: `${prefix}-es-expanded`, ...spanishContent, expanded: true })),
  block('Spanish — .mil, collapsed', banner({ prefix: `${prefix}-es-mil`, ...spanishDotMilContent })),
];

// --- Variants ---

export const Default = {
  name: 'Default (.gov)',
  tags: ['!dev', '!test'],
  args: {
    headerText: 'An official website of the United States government',
    actionText: 'Here’s how you know',
    regionName: 'Official website of the United States government',
    expanded: false,
  },
  argTypes: contentArgTypes,
  render: (args = {}) => banner({ ...args, prefix: 'lab-default' }),
};

export const Expanded = {
  name: 'Expanded (.gov)',
  tags: ['!dev', '!test'],
  parameters: expandedParams,
  args: {
    headerText: 'An official website of the United States government',
    actionText: 'Here’s how you know',
    regionName: 'Official website of the United States government',
    expanded: true,
  },
  argTypes: contentArgTypes,
  render: (args = {}) => banner({ ...args, prefix: 'lab-expanded', expanded: true }),
};

export const DotMil = {
  name: '.mil domain',
  tags: ['!dev', '!test'],
  render: () => banner({ prefix: 'lab-mil', ...dotMilContent }),
};

export const DotMilExpanded = {
  name: '.mil domain, expanded',
  tags: ['!dev', '!test'],
  parameters: expandedParams,
  render: () => banner({ prefix: 'lab-mil-expanded', ...dotMilContent, expanded: true }),
};

export const Spanish = {
  name: 'Spanish (.gov)',
  tags: ['!dev', '!test'],
  render: () => banner({ prefix: 'lab-es', ...spanishContent }),
};

export const SpanishExpanded = {
  name: 'Spanish (.gov), expanded',
  tags: ['!dev', '!test'],
  parameters: expandedParams,
  render: () => banner({ prefix: 'lab-es-expanded', ...spanishContent, expanded: true }),
};

export const SpanishDotMil = {
  name: 'Spanish (.mil)',
  tags: ['!dev', '!test'],
  render: () => banner({ prefix: 'lab-es-mil', ...spanishDotMilContent }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  // `accordion` alone, so the two expanded blocks stay open — see the
  // `banner.init()` note in the header comment.
  parameters: expandedParams,
  render: () => stack(allVariantBlocks('all')),
};

// --- Palette accessibility tests ---
//
// `labPaletteRender` rather than `paletteRender`: every copy carries
// `id` / `aria-controls` / `aria-labelledby`, so the six palettes need
// six id namespaces. The banner is pinned to the white palette by the
// surface bridge in `base/_palettes.scss`, so these six should render
// near-identically — that sameness is the expected result, not a
// rendering failure.

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: { ...labPaletteParams, uswds: ['accordion'] },
  render: labPaletteRender((palette) => stack(allVariantBlocks(palette))),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: { ...labPaletteHoverParams, uswds: ['accordion'] },
  render: labPaletteRender((palette) => stack(allVariantBlocks(`hover-${palette}`))),
};
