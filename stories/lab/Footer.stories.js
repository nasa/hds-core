// ============================================================
// Footer — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE on the footer's own selectors. No
// `src/scss/components/_footer.scss` exists and `grep -rn "usa-footer"
// src/scss/` returns exactly two matches, neither of which theme it:
// `base/_palettes.scss:326` is the surface bridge (see below) and
// `base/_print.scss` is a print rule. The footer shell — return-to-top
// bar, primary nav, secondary section, logo, social links, address —
// is USWDS default styling inside `@layer uswds`, recolored only by
// the shared settings in `_hds-uswds-theme.scss`. The big footer's
// sign-up form is the exception: see the ⚠️ note below.
//
// USWDS docs:   https://designsystem.digital.gov/components/footer/
//               https://designsystem.digital.gov/components/footer/accessibility-tests/
// USWDS styles: packages/usa-footer/src/styles/_usa-footer.scss
// USWDS JS:     packages/usa-footer/src/index.js — REQUIRED for the big footer.
//
// `footer.init()` only does one thing: below a 480px viewport it swaps
// each `.usa-footer__primary-link` heading (`<h4>`, per the authored
// markup below) for a `<button class="usa-footer__primary-link--button">`
// with `aria-expanded`/`aria-controls` wired to a generated id, and
// swaps it back above 480px. `data-tag` records the original tag name
// so the swap is reversible — USWDS 3.14 restricts `data-tag` to actual
// heading tag names and falls back to `h4` otherwise, hardening it
// against XSS via an authored `data-tag` value (docs/USWDS-3.14.0-IMPACT.md
// → "3.3 Footer data-tag (security)"; no HDS styling involved). At the
// Storybook canvas's default width the swap never fires, so the big
// footer's sections render as plain, non-interactive `<h4>` headings —
// which is the documented, correct desktop behavior, not a broken
// story. `parameters.uswds: ['footer']` still opts in so the toggle is
// live at narrow viewports and on resize.
//
// ⚠️ The accordion initial-state decorator in `.storybook/preview.js`
// only queries `.usa-accordion__button[aria-expanded="false"]`. The
// footer's disclosure buttons carry `usa-footer__primary-link--button`,
// not `usa-accordion__button` (confirmed above and in
// `usa-footer/src/index.js`), so that decorator never touches this
// component either way — irrelevant here, unlike Banner.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The bar has no tonal separation from the page. `$theme-footer-*`
//     settings (`_hds-uswds-theme.scss:81-82,385`) don't touch color;
//     `.usa-footer__primary-section` hardcodes `color("base-lightest")`
//     and `.usa-footer__secondary-section` hardcodes `color("base-lighter")`
//     (`_usa-footer.scss:61,186`) — both resolve through HDS's
//     `$theme-color-base-lightest`/`base-lighter` remaps, which the
//     surface bridge then overrides again with a flat
//     `$hds-color-spacesuit-white` background
//     (`base/_palettes.scss:326-333`, `docs/DESIGN.md` → "Header,
//     Footer, and Banner: untouched until Phase 2"). The three visual
//     bands (primary/secondary/return-to-top) collapse into one white
//     panel with only a 1px `base-light` rule between them.
//   - ⚠️ Non-obvious finding, verified: the big footer's sign-up form is
//     *not* stock USWDS. `.usa-label` is a global HDS override
//     (`components/_form.scss:169-174`, `@include hds-type('h6')` +
//     `color: var(--hds-palette-control-text)`), `.usa-input` is too
//     (`_form.scss:111-117` — `background-color: var(--hds-palette-input-bg)`,
//     14px/16px padding, `$hds-border-radius-control`), and `.usa-button`
//     gets the full HDS NASA-Red CTA treatment (`components/_button.scss:68-73`).
//     None of these selectors are scoped away from `.usa-footer`, so an
//     HDS-styled label/input/button sit inside the otherwise-unstyled
//     `.usa-sign-up`/`.usa-form` wrapper — the same "themed control in
//     an unthemed container" mismatch flagged for Card's footer button
//     (`stories/lab/Card.stories.js`), just compounded three ways here.
//   - Unlike Input Mask, Input Prefix/Suffix, Search, and Combo Box
//     (broken by the same `.usa-input` rule elsewhere on this branch),
//     the sign-up input is *not* broken: the surface bridge
//     (`:where(.usa-footer)`, `base/_palettes.scss:326-328`) applies the
//     full `_scheme-light` mixin directly to `.usa-footer`, so
//     `--hds-palette-input-bg`/`-border`/`-control-text` are always
//     defined on the element the input inherits from, regardless of
//     what palette (if any) wraps the page. Contrast holds; only the
//     visual mismatch above remains.
//   - ⚠️ The sign-up `<h3>` heading may not, though. Global heading
//     coloring is scoped to `[data-hds-palette], [class*="hds-palette-"]`
//     descendants only (`$_p`, `base/_elements.scss:25,102-114`). The
//     surface bridge sets custom properties on `.usa-footer` but does
//     not add a `hds-palette-*` class to it, so that rule only reaches
//     `.usa-sign-up__heading` when some ancestor of the footer already
//     carries a `hds-palette-*` class or `data-hds-palette` attribute —
//     it is not guaranteed by the bridge alone. Unverified for a real
//     page with no such ancestor; the six palette stories below all
//     wrap the footer in one, so they cannot surface this gap.
//   - Footer link lists stay plain USWDS. `.usa-footer__primary-link`
//     and `.usa-footer__secondary-link a` carry no `.usa-link` class in
//     the authored markup (confirmed against the USWDS 3.14 twig
//     templates and `usa-footer.json`), and `components/_link.scss`
//     only targets `.usa-link`/`.usa-link--external` — so the HDS
//     dashed-underline treatment and diagonal external arrow never
//     reach these links. They render as bold `ink` text with USWDS's
//     default hover/focus, not HDS's link style.
//   - `.usa-footer__primary-link` in the big footer takes `@include h4`
//     (`_usa-footer.scss:337`), which resolves through
//     `$theme-h4-font-size` etc. in `_hds-uswds-theme.scss` — HDS's type
//     scale — but the family is whatever `$theme-font-role-heading`
//     maps to, independent of `.usa-sign-up__heading`'s `@include h3`
//     a few lines away; the two headings in the same big-footer row can
//     land on different sizes/weights than an HDS heading pair would.
//
// Content note: agency contact details are the published NASA
// Headquarters address (300 E Street SW, Washington, DC 20546) and
// public nasa.gov links. No phone number or email is invented; the
// contact links use `nasa.gov` addresses actually published on
// https://www.nasa.gov/about/contact-nasa/. Social links point at
// NASA's real handles/paths for the network named (`javascript:void(0);`
// hrefs are the same non-functional placeholder USWDS ships upstream).
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Footer',
  parameters: {
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    ...labParams,
    uswds: ['footer'],
  },
};

// --- Helpers ---

// Primary nav link sets, hoisted to module scope so no render function
// ever holds an object array with a `label:` key (docs/DOCUMENTATION.md
// → "Parser safety for object arrays"). Property is `text`.
const bigNavSections = [
  {
    text: 'Missions',
    links: ['Artemis', 'Mars Exploration Program', 'International Space Station', 'Earth Science Missions'],
  },
  {
    text: 'Multimedia',
    links: ['NASA+', 'NASA Images', 'NASA Podcasts', 'NASA Blogs'],
  },
  {
    text: 'About NASA',
    links: ['Leadership', 'Centers and Facilities', 'NASA History', 'Doing Business with NASA'],
  },
  {
    text: 'Connect',
    links: ['Careers', 'Visit NASA', 'Contact NASA', 'Freedom of Information Act'],
  },
];

const mediumSlimLinks = ['NASA.gov', 'About NASA', 'Multimedia', 'Contact NASA'];

const socialNetworks = [
  { text: 'Facebook', icon: 'facebook' },
  { text: 'Twitter', icon: 'twitter' },
  { text: 'YouTube', icon: 'youtube' },
  { text: 'Instagram', icon: 'instagram' },
  { text: 'LinkedIn', icon: 'linkedin' },
];

/** Real, published NASA HQ contact used everywhere an address is needed. */
const nasaAddress = {
  agencyName: 'National Aeronautics and Space Administration',
  contactHeading: 'NASA Headquarters',
  addressLine: '300 E Street SW, Washington, DC 20546',
  phone: '(202) 358-0001',
  email: 'public-inquiries@hq.nasa.gov',
};

/** Social icon row — verbatim USWDS markup, `javascript:void(0);` hrefs per upstream. */
const socialLinks = () => `
  <div class="usa-footer__social-links grid-row grid-gap-1">
    ${socialNetworks
      .map(
        (network) => `
      <div class="grid-col-auto">
        <a class="usa-social-link" href="javascript:void(0);">
          <img class="usa-social-link__icon" src="assets/img/usa-icons/${network.icon}.svg" alt="${network.text}" />
        </a>
      </div>`,
      )
      .join('\n')}
  </div>`;

/** Shared secondary-section contact block (logo, heading, phone/email, address). */
const secondaryContact = () => `
  <p class="usa-footer__contact-heading">${nasaAddress.contactHeading}</p>
  <address class="usa-footer__address">
    <div class="usa-footer__contact-info grid-row grid-gap">
      <div class="grid-col-auto">
        <a href="tel:1-202-358-0001">${nasaAddress.phone}</a>
      </div>
      <div class="grid-col-auto">
        <a href="mailto:public-inquiries@hq.nasa.gov">${nasaAddress.email}</a>
      </div>
    </div>
    <div class="usa-footer__contact-info">${nasaAddress.addressLine}</div>
  </address>`;

/**
 * Medium footer (USWDS's un-modified default) — horizontal primary
 * links, agency logo/name, social links, and contact block.
 *
 * No `img` element for the logo: the lab content rules restrict images
 * to a fixed asset list that has no NASA logotype in it, and the flag
 * or icon assets on that list would misrepresent an agency logo, so
 * this omits `.usa-footer__logo-img` and keeps the text heading only —
 * valid, if incomplete, USWDS markup.
 *
 * @param {object} options
 * @param {string} options.prefix Unique id prefix (medium has no ids, kept for signature parity)
 */
const mediumFooter = ({ prefix = 'medium' } = {}) => `
  <footer class="usa-footer" aria-label="Footer, ${prefix}">
    <div class="grid-container usa-footer__return-to-top">
      <a href="#">Return to top</a>
    </div>
    <div class="usa-footer__primary-section">
      <div class="usa-footer__primary-container grid-row">
        <div class="mobile-lg:grid-col-8">
          <nav class="usa-footer__nav" aria-label="Footer navigation">
            <ul class="grid-row grid-gap">
              ${mediumSlimLinks
                .map(
                  (text) => `
                <li class="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="javascript:void(0);">${text}</a>
                </li>`,
                )
                .join('\n')}
            </ul>
          </nav>
        </div>
        <div class="mobile-lg:grid-col-4">
          <address class="usa-footer__address">
            <div class="grid-row grid-gap">
              <div class="grid-col-auto mobile-lg:grid-col-12 desktop:grid-col-auto">
                <div class="usa-footer__contact-info">
                  <a href="tel:1-202-358-0001">${nasaAddress.phone}</a>
                </div>
              </div>
              <div class="grid-col-auto mobile-lg:grid-col-12 desktop:grid-col-auto">
                <div class="usa-footer__contact-info">
                  <a href="mailto:public-inquiries@hq.nasa.gov">${nasaAddress.email}</a>
                </div>
              </div>
            </div>
          </address>
        </div>
      </div>
    </div>
    <div class="usa-footer__secondary-section">
      <div class="grid-container">
        <div class="grid-row grid-gap">
          <div class="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
            <div class="mobile-lg:grid-col-auto">
              <p class="usa-footer__logo-heading">${nasaAddress.agencyName}</p>
            </div>
          </div>
          <div class="usa-footer__contact-links mobile-lg:grid-col-6">
            ${socialLinks()}
            ${secondaryContact()}
          </div>
        </div>
      </div>
    </div>
  </footer>`;

/**
 * Slim footer — compact single-row nav, contact info, agency logo.
 *
 * @param {object} options
 * @param {string} options.prefix Unique id prefix (slim has no ids, kept for signature parity)
 */
const slimFooter = ({ prefix = 'slim' } = {}) => `
  <footer class="usa-footer usa-footer--slim" aria-label="Footer, ${prefix}">
    <div class="grid-container usa-footer__return-to-top">
      <a href="#">Return to top</a>
    </div>
    <div class="usa-footer__primary-section">
      <div class="usa-footer__primary-container grid-row">
        <div class="mobile-lg:grid-col-8">
          <nav class="usa-footer__nav" aria-label="Footer navigation">
            <ul class="grid-row grid-gap">
              ${mediumSlimLinks
                .map(
                  (text) => `
                <li class="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="javascript:void(0);">${text}</a>
                </li>`,
                )
                .join('\n')}
            </ul>
          </nav>
        </div>
        <div class="mobile-lg:grid-col-4">
          <address class="usa-footer__address">
            <div class="grid-row grid-gap">
              <div class="grid-col-auto mobile-lg:grid-col-12 desktop:grid-col-auto">
                <div class="usa-footer__contact-info">
                  <a href="tel:1-202-358-0001">${nasaAddress.phone}</a>
                </div>
              </div>
              <div class="grid-col-auto mobile-lg:grid-col-12 desktop:grid-col-auto">
                <div class="usa-footer__contact-info">
                  <a href="mailto:public-inquiries@hq.nasa.gov">${nasaAddress.email}</a>
                </div>
              </div>
            </div>
          </address>
        </div>
      </div>
    </div>
    <div class="usa-footer__secondary-section">
      <div class="grid-container">
        <div class="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
          <div class="mobile-lg:grid-col-auto">
            <p class="usa-footer__logo-heading">${nasaAddress.agencyName}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>`;

/**
 * Big footer — collapsible topic nav plus a sign-up form, both requiring
 * unique ids so the six stacked palette copies don't collide.
 *
 * The `<h4>` sections below are the *authored* markup: `footer.init()`
 * only swaps them for `<button>` elements under a 480px viewport (see
 * the header comment), so at the Storybook canvas's default width they
 * stay non-interactive headings — that is the documented behavior, not
 * a missing enhancement.
 *
 * @param {object} options
 * @param {string} options.prefix Unique id prefix for this copy
 */
const bigFooter = ({ prefix = 'big' } = {}) => `
  <footer class="usa-footer usa-footer--big" aria-label="Footer, ${prefix}">
    <div class="grid-container usa-footer__return-to-top">
      <a href="#">Return to top</a>
    </div>
    <div class="usa-footer__primary-section">
      <div class="grid-container">
        <div class="grid-row grid-gap">
          <div class="tablet:grid-col-8">
            <nav class="usa-footer__nav" aria-label="Footer navigation">
              <div class="grid-row grid-gap-4">
                ${bigNavSections
                  .map(
                    (section) => `
                <div class="mobile-lg:grid-col-6 desktop:grid-col-3">
                  <section class="usa-footer__primary-content usa-footer__primary-content--collapsible">
                    <h4 class="usa-footer__primary-link">${section.text}</h4>
                    <ul class="usa-list usa-list--unstyled">
                      ${section.links
                        .map(
                          (linkText) => `
                      <li class="usa-footer__secondary-link">
                        <a href="javascript:void(0);">${linkText}</a>
                      </li>`,
                        )
                        .join('\n')}
                    </ul>
                  </section>
                </div>`,
                  )
                  .join('\n')}
              </div>
            </nav>
          </div>
          <div class="tablet:grid-col-4">
            <div class="usa-sign-up">
              <h3 class="usa-sign-up__heading">Sign up</h3>
              <form class="usa-form">
                <label class="usa-label" for="${prefix}-signup-email">Your email address</label>
                <input
                  class="usa-input"
                  id="${prefix}-signup-email"
                  name="email"
                  type="email"
                  autocomplete="email"
                />
                <button class="usa-button" type="submit">Sign up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="usa-footer__secondary-section">
      <div class="grid-container">
        <div class="grid-row grid-gap">
          <div class="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
            <div class="mobile-lg:grid-col-auto">
              <p class="usa-footer__logo-heading">${nasaAddress.agencyName}</p>
            </div>
          </div>
          <div class="usa-footer__contact-links mobile-lg:grid-col-6">
            ${socialLinks()}
            ${secondaryContact()}
          </div>
        </div>
      </div>
    </div>
  </footer>`;

/** Every documented variant, once, with ids scoped to `prefix`. */
const allVariantBlocks = (prefix) => [
  block('Slim footer', slimFooter({ prefix: `${prefix}-slim` })),
  block('Medium footer (default)', mediumFooter({ prefix: `${prefix}-medium` })),
  block('Big footer (collapsible nav + sign-up)', bigFooter({ prefix: `${prefix}-big` })),
];

// --- Variants ---

export const Slim = {
  name: 'Slim',
  tags: ['!dev', '!test'],
  render: () => slimFooter({ prefix: 'lab-slim' }),
};

export const Medium = {
  name: 'Medium (default)',
  tags: ['!dev', '!test'],
  render: () => mediumFooter({ prefix: 'lab-medium' }),
};

export const Big = {
  name: 'Big (collapsible nav + sign-up)',
  tags: ['!dev', '!test'],
  render: () => bigFooter({ prefix: 'lab-big' }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () => stack(allVariantBlocks('all')),
};

// --- Palette accessibility tests ---
//
// `labPaletteRender` rather than `paletteRender`: the big footer's
// sign-up form carries `id`/`for` on the email field, so the six
// palettes need six id namespaces. The footer is pinned to the white
// palette by the surface bridge in `base/_palettes.scss`, so these six
// should render near-identically — that sameness is the expected
// result, not a rendering failure (see stories/lab/Banner.stories.js
// for the same pattern on a peer bridged component).

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) => stack(allVariantBlocks(palette))),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) => stack(allVariantBlocks(`hover-${palette}`))),
};
