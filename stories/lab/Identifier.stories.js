// ============================================================
// Identifier — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. `grep -rn "usa-identifier" src/scss/` returns one
// match: `base/_palettes.scss:335`, the surface bridge (see below).
// No `src/scss/components/_identifier.scss` exists. Everything below
// is USWDS default styling inside `@layer uswds`, recolored only by
// the shared settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/identifier/
// USWDS styles: packages/usa-identifier/src/styles/_usa-identifier.scss
// USWDS JS:     none — `identifier` is not a key in
//               `uswds-core/src/js/index.js`; the component is static
//               markup with no `init()` pass.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-identifier` calls `set-text-and-bg($theme-identifier-background-color)`
//     where `$theme-identifier-background-color` stays the USWDS default
//     `"base-darkest"` (uswds-core `_settings-components.scss:110`), and
//     HDS remaps `$theme-color-base-darkest: 'black'`
//     (`_hds-uswds-theme.scss:86`). Compiled:
//     `.usa-identifier{color:#fff;background-color:#000}`
//     (`dist/css/hds.min.css`). That happens to agree with the surface
//     bridge below, which independently pins `--hds-palette-bg` to
//     `$hds-color-carbon-black` — two separately-derived blacks, not one
//     source of truth, so a future change to `$theme-color-base-darkest`
//     could make them disagree.
//   - The bar typesets in the wrong family. `$theme-identifier-font-family`
//     is the USWDS default `"ui"`, and HDS maps
//     `$theme-font-role-ui: 'serif'` → `$theme-font-type-serif: 'inter'`
//     (`_hds-uswds-theme.scss:232,235`), so the identifier renders in
//     Inter while HDS body copy is Public Sans
//     (`$theme-font-role-body: 'sans'`) — the same mismatch already
//     flagged for Banner.
//   - The masthead and USA.gov links are not a distinct link color.
//     `$theme-identifier-primary-link-color: default` resolves through
//     `set-link-from-bg`'s WCAG token search rather than a literal
//     value; compiled output shows `color:#fff` for both
//     `.usa-identifier__identity-disclaimer a` and
//     `.usa-identifier__section--usagov a` (`dist/css/hds.min.css`) —
//     identical to the surrounding body text color. `$theme-link-color:
//     'ink'` (`_hds-uswds-theme.scss:203`, mapping to
//     `$theme-color-base-ink: 'black'`) can't pass contrast on this
//     black surface, so the algorithm substitutes white; the links are
//     legible but distinguishable only by their underline, not by hue.
//   - The domain line and required-links text both stay the USWDS
//     default `"base-light"` (`$theme-identifier-identity-domain-color`,
//     `$theme-identifier-secondary-link-color`), and HDS remaps
//     `$theme-color-base-light: 'gray-10'` (`_hds-uswds-theme.scss:78`)
//     → compiled `#e6e6e6`. Against `#000` that is comfortably high
//     contrast, but it is incidental — `gray-10` was not chosen for
//     this component.
//   - No interactive element gets an HDS focus ring. Every clickable
//     thing in the identifier is a plain `<a>` with no `tabindex`, and
//     `base/_focus.scss`'s `:focus-visible` selector list —
//     `[contenteditable='true']`, `[tabindex]`, `iframe`, `button`,
//     `input`, `select`, `textarea` (lines 21–28) — never matches a
//     bare anchor, so `hds-focus-ring` never applies. USWDS doesn't
//     fill the gap either: `set-link-from-bg`
//     (`uswds-core/src/styles/mixins/helpers/set-link-from-bg.scss`)
//     only defines base/`:visited`/`:hover`/`:active`, and the
//     `typeset-link` mixin that does add `:focus { @include focus-outline }`
//     (`uswds-core/src/styles/mixins/typography/typeset.scss:92-94`) is
//     never invoked here — `.usa-identifier` calls the plain `typeset()`
//     mixin, which only sets family/size/line-height. Keyboard focus on
//     every identifier link falls through to the bare browser default
//     outline.
//   - It does not vary across palettes, on purpose, and it is pinned
//     BLACK, not white. `base/_palettes.scss:335-342` pins
//     `:where(.usa-identifier)` to `_scheme-dark` with
//     `--hds-palette-bg: $hds-color-carbon-black` — unlike the banner,
//     header, and footer bridges just above it, which pin to
//     `_scheme-light` / white (`_palettes.scss:326-333`). That is
//     because the identifier is the one surface bridge whose real
//     background is dark (AGENTS.md → "USWDS surface bridges";
//     docs/DESIGN.md line 36). It is a readability guardrail, not
//     theming, so the six palette copies below are expected to be
//     near-identical — a difference between them would be the bug.
//
// Content note: NASA is an independent civil agency with no parent
// department, so the masthead names NASA itself as the "official
// website of" entity — the pattern the 2024-11-07 USWDS guidance
// update describes for a site that is its own agency's primary site.
// The "multiple parents and logos" variant instead pairs NASA with the
// Jet Propulsion Laboratory (jpl.nasa.gov), a real NASA field
// installation with its own public site. Required-link URLs
// (nasa.gov/about, /accessibility, /foia, /no-fear-act,
// oig.nasa.gov, and the NASA web privacy policy page) and the
// USA.gov link are the real, currently published destinations,
// confirmed against nasa.gov in this session. The USWDS docs page
// explicitly does not document a "required links only" stripped-down
// variant — its usage guidance reads "if you use the identifier,
// include the entire identifier... don't delete sections or required
// links" — so the minimal variant covered below is the documented
// "No logos" example (masthead text with no logo images), not a
// links-only fragment.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Identifier',
  parameters: labParams,
};

// --- Helpers ---

/** One `<li>` in the required-links nav. */
const requiredLink = (text, href) => `
          <li class="usa-identifier__required-links-item">
            <a href="${href}" class="usa-identifier__required-link usa-link">${text}</a>
          </li>`;

// The published, real required-links destinations. Hoisted to module
// scope and keyed `text`, not `label` (docs/DOCUMENTATION.md → "Parser
// safety for object arrays").
const requiredLinks = [
  { text: 'About NASA', href: 'https://www.nasa.gov/about/' },
  { text: 'Accessibility statement', href: 'https://www.nasa.gov/accessibility/' },
  { text: 'FOIA requests', href: 'https://www.nasa.gov/foia/' },
  { text: 'No FEAR Act data', href: 'https://www.nasa.gov/no-fear-act/' },
  { text: 'Office of the Inspector General', href: 'https://oig.nasa.gov/' },
  { text: 'Privacy Policy', href: 'https://www.nasa.gov/nasa-web-privacy-policy-and-important-notices/' },
];

const requiredLinksNav = () => `
      <nav class="usa-identifier__section usa-identifier__section--required-links" aria-label="Important links">
        <div class="usa-identifier__container">
          <ul class="usa-identifier__required-links-list">
            ${requiredLinks.map((l) => requiredLink(l.text, l.href)).join('')}
          </ul>
        </div>
      </nav>`;

const usagovSection = () => `
      <section class="usa-identifier__section usa-identifier__section--usagov" aria-label="U.S. government information and services">
        <div class="usa-identifier__container">
          <div class="usa-identifier__usagov-description">Looking for U.S. government information and services?</div>
          <a href="https://www.usa.gov/" class="usa-link">Visit USA.gov</a>
        </div>
      </section>`;

/**
 * One `.usa-identifier__logo` entry.
 *
 * @param {string} href Destination for the logo link
 * @param {string} name Agency/org name, used in the required `alt` text
 */
const logo = (href, name) => `
          <a href="${href}" class="usa-identifier__logo">
            <img class="usa-identifier__logo-img" src="assets/img/circle-124.png" alt="${name} logo" role="img" />
          </a>`;

/**
 * The full identifier component, matching the USWDS 3.14 docs page
 * markup verbatim (`packages/usa-identifier/src/usa-identifier.twig`;
 * confirmed against the live docs page and against the placeholder
 * copy already used in `stories/guides/USWDSLandingPage.stories.js`).
 *
 * No `id` / `aria-controls` / `for` pairing exists anywhere in this
 * markup, so — unlike Banner — no `prefix` parameter is needed for the
 * stacked palette stories; `aria-label` values may repeat freely.
 *
 * @param {object} options
 * @param {string} options.domain           Domain line, e.g. "nasa.gov"
 * @param {string} options.logos            Pre-built `.usa-identifier__logos` HTML, or '' for none
 * @param {string} options.disclaimer       Identity-disclaimer paragraph body (raw HTML)
 * @param {boolean} options.taxpayer        Append the taxpayer-expense sentence
 */
const identifier = ({
  domain = 'nasa.gov',
  logos = logo('https://www.nasa.gov/', 'NASA'),
  disclaimer = '<span aria-hidden="true">An </span>official website of the <a href="https://www.nasa.gov/">National Aeronautics and Space Administration</a>',
  taxpayer = false,
} = {}) => `
  <div class="usa-identifier">
    <section class="usa-identifier__section usa-identifier__section--masthead" aria-label="Agency identifier">
      <div class="usa-identifier__container">
        ${logos ? `<div class="usa-identifier__logos">${logos}</div>` : ''}
        <section class="usa-identifier__identity" aria-label="Agency description">
          <p class="usa-identifier__identity-domain">${domain}</p>
          <p class="usa-identifier__identity-disclaimer">
            ${disclaimer}${taxpayer ? '. Produced and published at taxpayer expense.' : ''}
          </p>
        </section>
      </div>
    </section>
    ${requiredLinksNav()}
    ${usagovSection()}
  </div>
`;

const contentArgTypes = {
  domain: { control: 'text', name: 'Domain' },
  taxpayer: { control: 'boolean', name: 'Taxpayer disclaimer' },
};

/** Every documented variant, once. */
const allVariantBlocks = () => [
  block('Default (.gov)', identifier()),
  block('No logos', identifier({ logos: '' })),
  block(
    'Multiple parents and logos',
    identifier({
      domain: 'jpl.nasa.gov',
      logos: `${logo('https://www.nasa.gov/', 'NASA')}${logo('https://www.jpl.nasa.gov/', 'Jet Propulsion Laboratory')}`,
      disclaimer:
        '<span aria-hidden="true">An </span>official website of the <a href="https://www.nasa.gov/">National Aeronautics and Space Administration</a> and the <a href="https://www.jpl.nasa.gov/">Jet Propulsion Laboratory</a>',
    }),
  ),
  block('Taxpayer disclaimer', identifier({ taxpayer: true })),
];

// --- Variants ---

export const Default = {
  name: 'Default (.gov)',
  tags: ['!dev', '!test'],
  args: { domain: 'nasa.gov', taxpayer: false },
  argTypes: contentArgTypes,
  render: (args = {}) => identifier(args),
};

export const NoLogos = {
  name: 'No logos',
  tags: ['!dev', '!test'],
  render: () => identifier({ logos: '' }),
};

export const MultipleLogos = {
  name: 'Multiple parents and logos',
  tags: ['!dev', '!test'],
  render: () =>
    identifier({
      domain: 'jpl.nasa.gov',
      logos: `${logo('https://www.nasa.gov/', 'NASA')}${logo('https://www.jpl.nasa.gov/', 'Jet Propulsion Laboratory')}`,
      disclaimer:
        '<span aria-hidden="true">An </span>official website of the <a href="https://www.nasa.gov/">National Aeronautics and Space Administration</a> and the <a href="https://www.jpl.nasa.gov/">Jet Propulsion Laboratory</a>',
    }),
};

export const TaxpayerDisclaimer = {
  name: 'Taxpayer disclaimer',
  tags: ['!dev', '!test'],
  render: () => identifier({ taxpayer: true }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () => stack(allVariantBlocks()),
};

// --- Palette accessibility tests ---
//
// Plain `paletteRender`, not the id-prefixed variant: nothing in this
// markup carries an `id`, `for`, or `aria-controls`. The identifier is
// pinned to the BLACK palette by the surface bridge in
// `base/_palettes.scss` (dark, unlike banner/header/footer's white
// pin — see the header comment), so these six copies are expected to
// render near-identically; a difference between them would be the bug.

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
