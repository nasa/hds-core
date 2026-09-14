// ============================================================
// Process List — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_process-list.scss`
// exists and no HDS rule targets `.usa-process-list*` (`grep -rn
// "usa-process-list" src/scss/` returns nothing). Everything below is
// USWDS default styling inside `@layer uswds`, recolored only by the
// HDS theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/process-list/
// USWDS styles: packages/usa-process-list/src/styles/_usa-process-list.scss
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - No `$theme-process-list-counter-*` setting is overridden in
//     `_hds-uswds-theme.scss` (zero matches for "process-list"). The
//     counter's border and numeral color (`-border-color` /
//     `-text-color`, both `"ink"` by default — `uswds-core/src/styles/
//     settings/_settings-components.scss:149,156`) resolve to true
//     Carbon Black only because HDS repoints the *global*
//     `$theme-color-base-ink` from USWDS's own `"gray-90"` to `'black'`
//     (`_hds-uswds-theme.scss:88`) — an incidental effect of an
//     unrelated remap, not process-list theming.
//   - `$theme-process-list-connector-color` is left at its USWDS
//     default, `"primary-lighter"` (`_settings-components.scss:157`).
//     Because HDS repoints the whole `primary` family to NASA Red
//     (`$theme-color-primary-lighter: 'red-10'`,
//     `_hds-uswds-theme.scss:99`), the vertical line joining each step
//     resolves to `#f8e1de` — NASA Red at its lightest tint
//     (`uswds-core/src/styles/tokens/color/_red.scss:4`). This is the
//     one NASA color in the component, and it is hardcoded rather than
//     palette-aware.
//   - `$theme-process-list-counter-background-color` and `-gap-color`
//     are both the literal system color `"white"`
//     (`_settings-components.scss:148,153`), not a `--hds-palette-*`
//     custom property. Every numbered circle is a fixed white disc
//     with a white halo on all six palettes — the same hardcoded-
//     white-surface pattern already flagged for Card
//     (`stories/lab/Card.stories.js`) — so on the dark, blue, and
//     black palettes the numbers read as bright cutouts, not part of
//     the surface.
//   - HDS's own ordered-list numerals (`ol.usa-list > li::before` in
//     `src/scss/components/_list.scss`) do NOT reach this component:
//     every selector there is scoped to the `.usa-list` class, and
//     `usa-process-list` markup carries no `usa-list` class (confirmed
//     in `usa-process-list/src/usa-process-list.twig`). No collision —
//     but also none of the DM Mono, NASA-Blue numeral treatment HDS
//     gives its own ordered lists elsewhere.
//   - `src/scss/base/_palettes.scss` has no bridge or dark-context
//     entry for `.usa-process-list` (no match for the class), so
//     nothing in the component reads `--hds-palette-*` — it does not
//     adapt across the six-palette system by design, not oversight.
//   - Links inside a step's body content (`.usa-process-list__item p
//     a`) DO inherit the always-on HDS focus treatment: `src/scss/
//     base/_focus.scss` matches bare `a:focus-visible` globally,
//     independent of component theming. This is the one part of the
//     component that already reads as HDS.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Process List',
  parameters: labParams,
};

// --- Helpers ---

/**
 * One `.usa-process-list__item`.
 *
 * @param {object} options
 * @param {string} options.heading     Step heading text
 * @param {string} options.headingTag  Heading element — the USWDS a11y
 *                                     guidance requires a semantic
 *                                     level chosen per page context,
 *                                     not a fixed tag (`h4` is only the
 *                                     docs page's example).
 * @param {string} options.headingClass Extra `.usa-process-list__heading` classes
 * @param {string} options.itemClass   Extra `.usa-process-list__item` classes
 * @param {string} options.body        Step body copy
 * @param {string} options.bodyClass   Extra classes on the body `<p>`
 * @param {string[]} options.bullets   Nested `<ul>` items under the body
 * @param {string} options.linkText    Optional link text under the body
 * @param {string} options.linkHref    Optional link href (defaults to `#`)
 */
const step = ({
  heading = 'Step',
  headingTag = 'h4',
  headingClass = '',
  itemClass = '',
  body = '',
  bodyClass = '',
  bullets = [],
  linkText = '',
  linkHref = '#',
} = {}) => `
    <li class="usa-process-list__item${itemClass ? ` ${itemClass}` : ''}">
      <${headingTag} class="usa-process-list__heading${headingClass ? ` ${headingClass}` : ''}">${heading}</${headingTag}>
      ${body ? `<p${bodyClass ? ` class="${bodyClass}"` : ''}>${body}</p>` : ''}
      ${
        bullets.length
          ? `<ul>
        ${bullets.map((bullet) => `<li>${bullet}</li>`).join('\n        ')}
      </ul>`
          : ''
      }
      ${linkText ? `<p><a class="usa-link" href="${linkHref}">${linkText}</a></p>` : ''}
    </li>`;

/** @param {object} options @param {object[]} options.steps @param {string} options.listClass */
const processList = ({ steps = [], listClass = '' } = {}) => `
  <ol class="usa-process-list${listClass ? ` ${listClass}` : ''}">
    ${steps.map((s) => step(s)).join('\n')}
  </ol>`;

// --- Content (module scope — see docs/DOCUMENTATION.md "Parser safety for object arrays") ---

const launchCampaignSteps = [
  {
    heading: 'Roll the vehicle to the pad',
    bodyClass: 'margin-top-05',
    body: 'The integrated rocket and spacecraft move from the Vehicle Assembly Building to the launch pad atop a crawler-transporter, at about one mile per hour.',
    bullets: [
      'The crawler-transporter carries the full stack the several-mile route to the pad.',
      'Ground teams verify structural and environmental readiness once the vehicle is in place.',
      'Access arms and umbilical connections attach for propellant loading and crew access.',
    ],
  },
  {
    heading: 'Run the wet dress rehearsal',
    body: 'Launch teams load cryogenic propellant into the rocket and rehearse the countdown timeline down to just before engine ignition, without lifting off.',
  },
  {
    heading: 'Hold the launch readiness review',
    body: 'Mission managers confirm that the rocket, spacecraft, and ground systems are ready to support the launch attempt and set the target date.',
  },
  {
    heading: 'Complete the terminal count and liftoff',
    body: 'The final countdown loads any remaining propellant, arms flight systems, and releases the vehicle from the pad at T-0.',
  },
];

const dataRequestSteps = [
  {
    heading: 'Search Earthdata Search',
    body: 'Browse the Earthdata Search catalog for the dataset, instrument, and time range you need.',
    linkText: 'Earthdata Search',
  },
  {
    heading: 'Create an Earthdata Login',
    body: 'Register for a free Earthdata Login account. It is required before any data order can be downloaded.',
    linkText: 'Earthdata Login',
  },
  {
    heading: 'Request and download the data',
    body: 'Add the granules you need to your cart, submit the order, and download them directly or through the Harmony API.',
    linkText: 'Harmony API documentation',
  },
];

const customSizingSteps = [
  {
    heading: 'Roll the vehicle to the pad.',
    headingClass: 'font-sans-xl line-height-sans-1',
    itemClass: 'padding-bottom-4',
    body: 'The crawler-transporter carries the full stack to the launch pad ahead of the countdown.',
    bodyClass: 'font-sans-lg margin-top-1 text-light',
  },
  {
    heading: 'Run the wet dress rehearsal.',
    headingClass: 'font-sans-xl line-height-sans-1',
    itemClass: 'padding-bottom-4',
    body: 'Teams load propellant and rehearse the countdown timeline without lifting off.',
    bodyClass: 'font-sans-lg margin-top-1 text-light',
  },
  {
    heading: 'Complete the terminal count and liftoff.',
    headingClass: 'font-sans-xl line-height-sans-1',
    body: 'The final countdown arms flight systems and releases the vehicle from the pad at T-0.',
    bodyClass: 'font-sans-lg margin-top-1 text-light',
  },
];

const noTextSteps = [
  {
    heading: 'Roll the vehicle to the pad.',
    headingTag: 'p',
    headingClass: 'font-sans-xl line-height-sans-1',
    itemClass: 'padding-bottom-4',
  },
  {
    heading: 'Run the wet dress rehearsal.',
    headingTag: 'p',
    headingClass: 'font-sans-xl line-height-sans-1',
    itemClass: 'padding-bottom-4',
  },
  {
    heading: 'Complete the terminal count and liftoff.',
    headingTag: 'p',
    headingClass: 'font-sans-xl line-height-sans-1',
  },
];

const contentArgTypes = {
  heading: { control: 'text', name: 'First step heading' },
  body: { control: 'text', name: 'First step body' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    heading: launchCampaignSteps[0].heading,
    body: launchCampaignSteps[0].body,
  },
  argTypes: contentArgTypes,
  render: (args = {}) => {
    const { heading = launchCampaignSteps[0].heading, body = launchCampaignSteps[0].body } = args;
    return processList({
      steps: [{ ...launchCampaignSteps[0], heading, body }, ...launchCampaignSteps.slice(1)],
    });
  },
};

export const HeadingLevels = {
  name: 'Heading levels',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block(
        'h2 — process list is the page’s primary heading structure',
        processList({ steps: dataRequestSteps.map((s) => ({ ...s, headingTag: 'h2' })) }),
      ),
      block(
        'h4 — default, nested under headings already on the page',
        processList({ steps: launchCampaignSteps.slice(0, 3) }),
      ),
    ]),
};

export const CustomSizing = {
  name: 'Custom sizing',
  tags: ['!dev', '!test'],
  render: () => processList({ steps: customSizingSteps }),
};

export const NoText = {
  name: 'No text (heading only)',
  tags: ['!dev', '!test'],
  render: () => processList({ steps: noTextSteps }),
};

export const WithLinks = {
  name: 'With body content and links',
  tags: ['!dev', '!test'],
  render: () => processList({ steps: dataRequestSteps }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    stack([
      block(
        'Default',
        processList({
          steps: [{ ...launchCampaignSteps[0], ...args }, ...launchCampaignSteps.slice(1)],
        }),
      ),
      block(
        'Heading levels',
        stack([
          block('h2', processList({ steps: dataRequestSteps.map((s) => ({ ...s, headingTag: 'h2' })) })),
          block('h4 (default)', processList({ steps: launchCampaignSteps.slice(0, 3) })),
        ]),
      ),
      block('Custom sizing', processList({ steps: customSizingSteps })),
      block('No text (heading only)', processList({ steps: noTextSteps })),
      block('With body content and links', processList({ steps: dataRequestSteps })),
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
