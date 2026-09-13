// ============================================================
// Card — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_card.scss` exists and
// no HDS rule targets `.usa-card*`. Everything below is USWDS default
// styling inside `@layer uswds`, recolored only by the HDS theme
// settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/card/
// USWDS styles: packages/usa-card/src/styles/_usa-card.scss
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-card__container` hardcodes `set-text-and-bg("white")`, so a
//     card stays a white box with ink text on every HDS palette. On the
//     dark, blue, and black palettes it reads as a bright cutout rather
//     than a surface, and any `--hds-palette-*` value inside it resolves
//     against the surrounding palette, not the white card.
//   - `$theme-card-border-radius` resolves through the HDS theme, so
//     cards keep a rounded border while every themed HDS component is
//     square-cornered.
//   - Footer buttons pick up the full HDS button theme, so a themed
//     button sits inside an unthemed container — the most visible
//     mismatch in this component.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Card',
  parameters: labParams,
};

// --- Helpers ---

const media = (modifier = '') => `
      <div class="usa-card__media${modifier ? ` ${modifier}` : ''}">
        <div class="usa-card__img">
          <img src="assets/img/circle-124.png" alt="" />
        </div>
      </div>`;

/**
 * @param {object} options
 * @param {string} options.heading    Card heading text
 * @param {string} options.body       Card body copy
 * @param {string} options.action     Footer link text
 * @param {string} options.cardClass  Extra `.usa-card` modifiers
 * @param {string} options.mediaClass `.usa-card__media` modifier
 * @param {boolean} options.withMedia Render the media block
 */
const card = ({
  heading = 'Artemis II',
  body = 'The first crewed mission of NASA’s Artemis campaign will send four astronauts around the Moon.',
  action = 'Read the mission overview',
  cardClass = '',
  mediaClass = '',
  withMedia = false,
} = {}) => `
  <ul class="usa-card-group">
    <li class="usa-card ${cardClass}">
      <div class="usa-card__container">
        <div class="usa-card__header">
          <h4 class="usa-card__heading">${heading}</h4>
        </div>
        ${withMedia ? media(mediaClass) : ''}
        <div class="usa-card__body">
          <p>${body}</p>
        </div>
        <div class="usa-card__footer">
          <a href="#" class="usa-button">${action}</a>
        </div>
      </div>
    </li>
  </ul>
`;

/** Card group with three cards, the way cards are used in production. */
const cardGroup = () => `
  <ul class="usa-card-group">
    ${[
      {
        heading: 'Artemis II',
        body: 'Four astronauts will fly around the Moon and return, testing Orion’s life support systems with crew aboard.',
      },
      {
        heading: 'Europa Clipper',
        body: 'A flagship mission to investigate whether Jupiter’s moon Europa could support life in its subsurface ocean.',
      },
      {
        heading: 'Roman Space Telescope',
        body: 'A wide-field infrared observatory that will survey the sky a hundred times faster than Hubble.',
      },
    ]
      .map(
        (item) => `
    <li class="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4">
      <div class="usa-card__container">
        <div class="usa-card__header">
          <h4 class="usa-card__heading">${item.heading}</h4>
        </div>
        ${media()}
        <div class="usa-card__body">
          <p>${item.body}</p>
        </div>
        <div class="usa-card__footer">
          <a href="#" class="usa-button">Read more</a>
        </div>
      </div>
    </li>`,
      )
      .join('')}
  </ul>
`;

const contentArgTypes = {
  heading: { control: 'text', name: 'Heading' },
  body: { control: 'text', name: 'Body copy' },
  action: { control: 'text', name: 'Footer link' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    heading: 'Artemis II',
    body: 'The first crewed mission of NASA’s Artemis campaign will send four astronauts around the Moon.',
    action: 'Read the mission overview',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => card(args),
};

export const WithMedia = {
  name: 'With media',
  tags: ['!dev', '!test'],
  args: {
    heading: 'Europa Clipper',
    body: 'A flagship mission to investigate whether Jupiter’s moon Europa could support life beneath its ice shell.',
    action: 'Read the mission overview',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => card({ ...args, withMedia: true }),
};

export const HeaderFirst = {
  name: 'Header first',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    card({
      ...args,
      heading: 'Perseverance rover',
      body: 'Collecting rock cores in Jezero Crater for eventual return to Earth.',
      cardClass: 'usa-card--header-first',
      withMedia: true,
    }),
};

export const Flag = {
  name: 'Flag',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    card({
      ...args,
      heading: 'Parker Solar Probe',
      body: 'The closest any spacecraft has flown to the Sun, sampling the solar corona directly.',
      cardClass: 'usa-card--flag',
      withMedia: true,
    }),
};

export const FlagMediaRight = {
  name: 'Flag, media right',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    card({
      ...args,
      heading: 'Juno at Jupiter',
      body: 'Mapping Jupiter’s gravity and magnetic fields from a polar orbit.',
      cardClass: 'usa-card--flag usa-card--media-right',
      mediaClass: 'usa-card__media--inset',
      withMedia: true,
    }),
};

export const MediaInset = {
  name: 'Media inset',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    card({
      ...args,
      heading: 'Webb Space Telescope',
      body: 'Observing the earliest galaxies in infrared from the second Lagrange point.',
      mediaClass: 'usa-card__media--inset',
      withMedia: true,
    }),
};

export const MediaExdent = {
  name: 'Media exdent',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    card({
      ...args,
      heading: 'Hubble Space Telescope',
      body: 'Three decades of observations from low Earth orbit, still returning new science.',
      mediaClass: 'usa-card__media--exdent',
      withMedia: true,
    }),
};

export const CardGroup = {
  name: 'Card group',
  tags: ['!dev', '!test'],
  render: () => cardGroup(),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    stack([
      block('Default', card({ ...args })),
      block('With media', card({ heading: 'Europa Clipper', withMedia: true })),
      block(
        'Header first',
        card({
          heading: 'Perseverance rover',
          cardClass: 'usa-card--header-first',
          withMedia: true,
        }),
      ),
      block('Flag', card({ heading: 'Parker Solar Probe', cardClass: 'usa-card--flag', withMedia: true })),
      block(
        'Flag, media right',
        card({
          heading: 'Juno at Jupiter',
          cardClass: 'usa-card--flag usa-card--media-right',
          mediaClass: 'usa-card__media--inset',
          withMedia: true,
        }),
      ),
      block(
        'Media inset',
        card({ heading: 'Webb Space Telescope', mediaClass: 'usa-card__media--inset', withMedia: true }),
      ),
      block(
        'Media exdent',
        card({ heading: 'Hubble Space Telescope', mediaClass: 'usa-card__media--exdent', withMedia: true }),
      ),
      block('Card group', cardGroup()),
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
