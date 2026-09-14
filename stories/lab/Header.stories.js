// ============================================================
// Header — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_header.scss` exists.
// `grep -rn "usa-header\|usa-nav\b\|usa-site-title\|usa-skipnav" src/scss/`
// returns exactly two matches, neither of which theme it:
// `base/_palettes.scss:326` is the surface bridge (`.usa-banner`,
// `.usa-header`, `.usa-footer` pinned to the white palette — see below)
// and `base/_print.scss:58-60` hides `.usa-nav`/`.usa-skipnav` on
// print. `usa-nav`, `usa-site-title`, and `usa-skipnav` have no
// matches of their own beyond those two. (`src/scss/components/_accordion.scss:39`
// has a `:not(.usa-nav *)` guard on its own selectors — that excludes
// nav content from accordion styling, it does not style nav.)
// Everything below is USWDS default styling inside `@layer uswds`,
// recolored only by the HDS theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/header/
//               https://designsystem.digital.gov/components/header/accessibility-tests/
// USWDS styles: packages/usa-header/src/styles/_usa-header.scss
//               packages/usa-header/src/styles/_usa-megamenu.scss
//               packages/usa-header/src/styles/_usa-nav-container.scss
//               packages/usa-header/src/styles/_usa-navbar.scss
//               packages/usa-nav/src/styles/_usa-nav.scss (the nav panel,
//                 primary/secondary lists, submenus — a separate package)
//               packages/usa-skipnav/src/styles/_usa-skipnav.scss
//               usa-site-title has no styles of its own — its markup
//                 (`.usa-logo`/`.usa-logo__text`) is styled entirely by
//                 `_usa-header.scss`.
// USWDS JS:     packages/usa-header/src/index.js — REQUIRED. Key: `navigation`
//               (`packages/uswds-core/src/js/index.js:14,38` aliases the
//               header module to that name; `parameters.uswds: ['navigation']`
//               below opts into it).
//
// `init()` wires: the mobile menu toggle (`.usa-menu-btn` opens,
// `.usa-nav__close`/`.usa-overlay` close, toggling `.is-visible` on the
// nav and overlay); a `FocusTrap` over the nav while the mobile menu is
// open; click-to-toggle on each `.usa-nav__link` submenu trigger
// (`aria-expanded`/`aria-controls`, closing any other open submenu
// first); `Escape` and focus-out to collapse an open submenu; and a
// resize handler that snaps the mobile nav closed if the viewport grows
// past the point where the close button would be hidden. It also hides
// the rest of the page from assistive tech (`aria-hidden`) while the
// mobile nav is open. Without it, the submenu buttons carry the right
// ARIA but nothing ever expands, and the mobile "Menu" button does
// nothing — the component would be inert.
//
// ⚠️ Storybook-only rendering artifact, verified: the accordion
// initial-state decorator in `.storybook/preview.js:139-142` sets the
// `hidden` attribute on every `.usa-nav:not(.is-visible)` after render.
// Our authored markup never carries `.is-visible` (USWDS only adds it
// when the mobile menu is toggled open), and `usa-nav/src/styles/_usa-nav.scss:111-113`
// sets only `float`/`position` on `.usa-nav` at desktop width — no
// author rule sets `display` there — so nothing in any `@layer`
// out-cascades the `[hidden]` UA rule's `display: none`. Net effect:
// `<nav class="usa-nav">` — primary links and search included — renders
// invisible in every story below, at every canvas width, until someone
// removes the attribute in devtools. This is a side effect of the
// decorator (explicitly "NOT shipped to consumers", per its own
// comment) reacting to the shared `.usa-accordion__button` class the
// nav's submenu triggers also carry — not a production bug: a real page
// never runs this decorator, and `<nav>`'s default `display: block`
// shows the desktop nav with no JS needed.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `$theme-header-min-width: 'desktop'` and `$theme-header-max-width: 'widescreen'`
//     (`_hds-uswds-theme.scss:386-387`) are the only header-specific
//     settings HDS supplies, and both are literal USWDS breakpoint
//     keywords — not an HDS-authored nav pattern.
//   - The desktop collapse point they resolve to is USWDS's own
//     `desktop` breakpoint, 1024px (`packages/uswds-core/src/styles/tokens/units/spacing.scss:93-95`),
//     which happens to equal HDS's own `desktop` token (`tokens.json`
//     `breakpoint.desktop` = "1024px"). The two scales agree here by
//     coincidence of USWDS's default, not because the header consumes
//     the HDS breakpoint token.
//   - The search `[type="search"]`/`.usa-input` hits the global HDS
//     text-input override (`components/_form.scss:111-117`) —
//     `background-color: var(--hds-palette-input-bg)`,
//     `padding: 14px 16px`, `border-radius: $hds-border-radius-control`
//     replace USWDS's own compact search-field sizing.
//   - The search submit `.usa-button` gets the full NASA-Red CTA
//     treatment (`components/_button.scss:68-92`), so the header ships
//     a wide red button with a small white icon inside it instead of
//     USWDS's small icon-only search affordance.
//   - Nav link color is hardcoded to `color($nav-link-color)`
//     (`base-dark`, `usa-nav/src/styles/_usa-nav.scss` — `$nav-link-color`),
//     not a `--hds-palette-*` custom property, so primary nav links do
//     not adapt to a palette wrapper the way an HDS-themed link would.
//   - Cascade-layer check, confirmed: `base/_focus.scss:25`'s bare
//     `button:not([disabled]):focus-visible` (`@layer hds-base`, per
//     `hds.scss:51-53`) DOES reach `.usa-menu-btn`, `.usa-nav__close`,
//     and the `.usa-accordion__button.usa-nav__link` submenu triggers —
//     none carry a `.usa-button` class. It does NOT reach the search
//     submit button: `.usa-button:focus-visible` is declared again in
//     `components/_button.scss` inside `@layer hds-components`
//     (`hds.scss:55-58`), which is later in the layer order than
//     `hds-base` and wins regardless of the bare rule's specificity —
//     so the search button gets the HDS button focus treatment, and
//     everything else in the nav gets the HDS bare-button ring.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Header',
  parameters: {
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    ...labParams,
    uswds: ['navigation'],
  },
};

// --- Helpers ---

// Nav content hoisted to module scope, property named `text` (never
// `label`) so no render function holds an object array a `label:` key
// could break the Storybook indexer on (docs/DOCUMENTATION.md →
// "Parser safety for object arrays").
const missionLinks = ['Artemis', 'Mars Exploration Program', 'International Space Station', 'Earth Science Missions'];
const newsLinks = ['Image of the Day', 'Latest News', 'NASA+'];

const megaColumns = [
  { text: 'Missions', links: ['Artemis', 'Mars Exploration Program', 'International Space Station'] },
  { text: 'Science', links: ['Earth Science', 'Astrophysics', 'Heliophysics'] },
  { text: 'Multimedia', links: ['NASA+', 'NASA Images', 'NASA Podcasts'] },
  { text: 'About NASA', links: ['Leadership', 'Careers', 'Contact NASA'] },
];

const secondaryLinks = ['NASA en Español', 'Contact NASA'];

/** Skip navigation link — authored before the header, per USWDS guidance. */
const skipNav = () => `<a class="usa-skipnav" href="#main-content">Skip to main content</a>`;

/** Mobile menu backdrop — required for `init()`'s toggle to have a target. */
const overlay = () => `<div class="usa-overlay"></div>`;

/** Site title (`usa-site-title` package) — markup-only, no styles of its own. */
const siteTitle = ({ text = 'NASA', href = '/' } = {}) => `
  <div class="usa-logo">
    <em class="usa-logo__text">
      <a href="${href}" title="Home">${text}</a>
    </em>
  </div>`;

const menuBtn = () => `<button type="button" class="usa-menu-btn">Menu</button>`;

const navClose = () => `
  <button type="button" class="usa-nav__close">
    <img src="assets/img/usa-icons/close.svg" role="img" alt="Close" />
  </button>`;

/**
 * Inline search markup exactly as shown on the header docs page — the
 * standalone Search component has its own lab story and is not read or
 * modified here.
 *
 * @param {object} options
 * @param {string} options.prefix Unique id prefix for the `for`/`id` pair
 */
const searchForm = ({ prefix = 'header' } = {}) => `
  <section aria-label="Search component">
    <form class="usa-search usa-search--small" role="search">
      <label class="usa-sr-only" for="${prefix}-search-field">Search</label>
      <input class="usa-input" id="${prefix}-search-field" type="search" name="search" />
      <button class="usa-button" type="submit">
        <img src="assets/img/usa-icons-bg/search--white.svg" class="usa-search__submit-icon" alt="Search" />
      </button>
    </form>
  </section>`;

/** Plain list submenu (basic dropdown). */
const submenu = ({ id, items }) => `
  <ul id="${id}" class="usa-nav__submenu">
    ${items
      .map(
        (text) => `
    <li class="usa-nav__submenu-item">
      <a href="javascript:void(0);"><span>${text}</span></a>
    </li>`,
      )
      .join('\n')}
  </ul>`;

/** Multi-column megamenu panel. */
const megamenuPanel = (id) => `
  <div id="${id}" class="usa-nav__submenu usa-megamenu">
    <div class="grid-row grid-gap-4">
      ${megaColumns
        .map(
          (col) => `
      <div class="usa-col">
        <ul class="usa-nav__submenu-list">
          ${col.links
            .map(
              (text) => `
          <li class="usa-nav__submenu-item">
            <a href="javascript:void(0);">${text}</a>
          </li>`,
            )
            .join('\n')}
        </ul>
      </div>`,
        )
        .join('\n')}
    </div>
  </div>`;

/**
 * `usa-nav__primary` list — two dropdown sections plus one simple link.
 *
 * @param {object} options
 * @param {string} options.prefix   Unique id prefix for the submenu ids
 * @param {boolean} options.megamenu Render dropdowns as megamenu panels
 */
const primaryNav = ({ prefix = 'nav', megamenu = false } = {}) => `
  <ul class="usa-nav__primary usa-accordion">
    <li class="usa-nav__primary-item">
      <button
        type="button"
        class="usa-accordion__button usa-nav__link usa-current"
        aria-expanded="false"
        aria-controls="${prefix}-section-missions"
      >
        <span>Missions</span>
      </button>
      ${
        megamenu
          ? megamenuPanel(`${prefix}-section-missions`)
          : submenu({ id: `${prefix}-section-missions`, items: missionLinks })
      }
    </li>
    <li class="usa-nav__primary-item">
      <button
        type="button"
        class="usa-accordion__button usa-nav__link"
        aria-expanded="false"
        aria-controls="${prefix}-section-news"
      >
        <span>News &amp; Events</span>
      </button>
      ${
        megamenu ? megamenuPanel(`${prefix}-section-news`) : submenu({ id: `${prefix}-section-news`, items: newsLinks })
      }
    </li>
    <li class="usa-nav__primary-item">
      <a href="javascript:void(0);" class="usa-nav-link">
        <span>About NASA</span>
      </a>
    </li>
  </ul>`;

/**
 * Basic header — `.usa-header--basic`, dropdown menu wrapped inside
 * `.usa-nav-container` alongside the navbar.
 *
 * @param {object} options
 * @param {string} options.prefix        Unique id prefix for this copy
 * @param {string} options.siteTitleText Site title text
 * @param {boolean} options.megamenu     Render dropdowns as megamenu panels
 */
const basicHeader = ({ prefix = 'basic', siteTitleText = 'NASA', megamenu = false } = {}) => `
  ${skipNav()}
  ${overlay()}
  <header class="usa-header usa-header--basic${megamenu ? ' usa-header--megamenu' : ''}" aria-label="Header, ${prefix}">
    <div class="usa-nav-container">
      <div class="usa-navbar">
        ${siteTitle({ text: siteTitleText })}
        ${menuBtn()}
      </div>
      <nav aria-label="Primary navigation, ${prefix}" class="usa-nav">
        ${navClose()}
        ${primaryNav({ prefix, megamenu })}
        ${searchForm({ prefix })}
      </nav>
    </div>
  </header>`;

/**
 * Extended header — `.usa-header--extended`, navbar outside the nav,
 * secondary links + search inside `.usa-nav__secondary`. Never gets
 * `.usa-header--megamenu` — the docs' extended-with-megamenu markup
 * omits that modifier; `.usa-header--extended .usa-megamenu.usa-nav__submenu`
 * positioning (`_usa-header.scss`) applies without it.
 *
 * @param {object} options
 * @param {string} options.prefix        Unique id prefix for this copy
 * @param {string} options.siteTitleText Site title text
 * @param {boolean} options.megamenu     Render dropdowns as megamenu panels
 */
const extendedHeader = ({ prefix = 'extended', siteTitleText = 'NASA', megamenu = false } = {}) => `
  ${skipNav()}
  ${overlay()}
  <header class="usa-header usa-header--extended" aria-label="Header, ${prefix}">
    <div class="usa-navbar">
      ${siteTitle({ text: siteTitleText })}
      ${menuBtn()}
    </div>
    <nav aria-label="Primary navigation, ${prefix}" class="usa-nav">
      <div class="usa-nav__inner">
        ${navClose()}
        ${primaryNav({ prefix, megamenu })}
        <div class="usa-nav__secondary">
          <ul class="usa-nav__secondary-links">
            ${secondaryLinks
              .map((text) => `<li class="usa-nav__secondary-item"><a href="javascript:void(0);">${text}</a></li>`)
              .join('\n')}
          </ul>
          ${searchForm({ prefix })}
        </div>
      </div>
    </nav>
  </header>`;

const siteTitleArgTypes = {
  siteTitleText: { control: 'text', name: 'Site title' },
};

// --- Variants ---

export const Basic = {
  name: 'Basic header',
  tags: ['!dev', '!test'],
  args: { siteTitleText: 'NASA' },
  argTypes: siteTitleArgTypes,
  render: (args = {}) => basicHeader({ ...args, prefix: 'basic' }),
};

export const BasicMegamenu = {
  name: 'Basic header with megamenu',
  tags: ['!dev', '!test'],
  render: () => basicHeader({ prefix: 'basic-mega', megamenu: true }),
};

export const Extended = {
  name: 'Extended header',
  tags: ['!dev', '!test'],
  args: { siteTitleText: 'NASA' },
  argTypes: siteTitleArgTypes,
  render: (args = {}) => extendedHeader({ ...args, prefix: 'extended' }),
};

export const ExtendedMegamenu = {
  name: 'Extended header with megamenu',
  tags: ['!dev', '!test'],
  render: () => extendedHeader({ prefix: 'extended-mega', megamenu: true }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Basic header', basicHeader({ prefix: 'all-basic' })),
      block('Basic header with megamenu', basicHeader({ prefix: 'all-basic-mega', megamenu: true })),
      block('Extended header', extendedHeader({ prefix: 'all-extended' })),
      block('Extended header with megamenu', extendedHeader({ prefix: 'all-extended-mega', megamenu: true })),
    ]),
};

// --- Palette accessibility tests ---
//
// `labPaletteRender` rather than `paletteRender`: every variant carries
// `id`/`aria-controls` (submenus) and `for`/`id` (search field), so the
// six stacked palette copies need six id namespaces. The header is
// pinned to the white palette by the surface bridge in
// `base/_palettes.scss`, so these six should render near-identically —
// that sameness is the expected result, not a rendering failure (see
// stories/lab/Footer.stories.js and Banner.stories.js for the same
// pattern on peer bridged components).

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Basic header', basicHeader({ prefix: `${palette}-basic` })),
      block('Basic header with megamenu', basicHeader({ prefix: `${palette}-basic-mega`, megamenu: true })),
      block('Extended header', extendedHeader({ prefix: `${palette}-extended` })),
      block('Extended header with megamenu', extendedHeader({ prefix: `${palette}-extended-mega`, megamenu: true })),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Basic header', basicHeader({ prefix: `hover-${palette}-basic` })),
      block('Basic header with megamenu', basicHeader({ prefix: `hover-${palette}-basic-mega`, megamenu: true })),
      block('Extended header', extendedHeader({ prefix: `hover-${palette}-extended` })),
      block(
        'Extended header with megamenu',
        extendedHeader({ prefix: `hover-${palette}-extended-mega`, megamenu: true }),
      ),
    ]),
  ),
};
