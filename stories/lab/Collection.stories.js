// ============================================================
// Collection — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_collection.scss` exists
// and no HDS rule targets `.usa-collection*` or `.usa-tag*` anywhere
// in `src/scss/` (confirmed by grep). Everything below is USWDS
// default styling inside `@layer uswds`, recolored only where its own
// `$theme-*` settings happen to resolve through the HDS theme.
//
// USWDS docs:   https://designsystem.digital.gov/components/collection/
// USWDS styles: packages/usa-collection/src/styles/_usa-collection.scss
//               packages/usa-tag/src/styles/_usa-tag.scss (metadata tags)
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - Heading links (`.usa-link`) DO inherit the full HDS link theme —
//     dashed underline, hover state, and `hds-focus-ring-inline` on
//     `:focus-visible` — via `src/scss/components/_link.scss`, which
//     themes `.usa-link` globally regardless of container. This is the
//     one part of the component that is fully on-brand.
//   - Body and heading text render in the wrong typeface. USWDS sets
//     `$theme-collection-font-family: "ui"` and
//     `$theme-collection-header-typeset: "ui", "md", 3` (component
//     settings, unmodified by HDS). `_hds-uswds-theme.scss` remaps
//     `$theme-font-role-ui: 'serif'` -> `$theme-font-type-serif: 'inter'`,
//     so collection text renders in Inter — not the Public Sans that
//     `$theme-body-font-family: 'body'` (-> `sans` -> `public-sans`)
//     gives the rest of HDS body copy.
//   - A bare `.usa-collection__meta-item` tag (`.usa-tag` with no
//     modifier) hardcodes `background-color: color("base-dark")`
//     (`gray-80` under the HDS theme) with reverse text. There is no
//     `$theme-tag-*` setting at all to intercept this — confirmed no
//     such file exists next to `packages/usa-tag/src/styles/`. It reads
//     as a dark, unbranded gray badge on every palette.
//   - `.usa-tag--new` is hardcoded to `u-bg("accent-warm-dark")`
//     (`orange-50v` under the HDS theme) with white text — an orange
//     accent outside HDS's NASA Red/Blue role colors, and, like the
//     plain tag, static regardless of the surrounding palette.
//   - The calendar-date block's month/day colors resolve through
//     `color("primary")` (`red-50`, NASA Red, under the HDS theme), so
//     that part is on-brand by coincidence. But its corners use
//     `radius("sm")` directly with no `$theme-collection-*` radius
//     setting to catch — squarely against HDS's
//     `$hds-border-radius: 0px` convention (`src/scss/_hds-tokens.scss`).
//   - Nothing in `_usa-collection.scss` or `_usa-tag.scss` references
//     `--hds-palette-*`. Meta text, tag backgrounds, and calendar-date
//     colors are identical on all six palettes; only the heading link
//     recolors per palette.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Collection',
  parameters: labParams,
};

// --- Helpers ---

/**
 * One `.usa-collection__item`.
 *
 * @param {object} options
 * @param {string} options.heading      Item heading text
 * @param {string} options.href         Heading link target
 * @param {string} options.description  Body copy (omitted if empty)
 * @param {string} options.author       "By <author>" meta line (omitted if empty)
 * @param {{text: string, datetime: string}} options.date Meta `<time>` (omitted if null)
 * @param {string} options.source       Single condensed-style meta line (omitted if empty)
 * @param {string[]} options.tags       Plain `.usa-tag` metadata
 * @param {string} options.newTag       `.usa-tag--new` metadata (omitted if empty)
 * @param {{src: string, alt: string}} options.img Thumbnail (omitted if null)
 * @param {{month: string, day: string, datetime: string}} options.calendarDate Calendar date block (omitted if null)
 */
const collectionItem = ({
  heading = 'Artemis II Crew Completes Water Survival Training',
  href = '#',
  description = '',
  author = '',
  date = null,
  source = '',
  tags = [],
  newTag = '',
  img = null,
  calendarDate = null,
} = {}) => {
  const infoItems = [];
  if (author) infoItems.push(`By ${author}`);
  if (date) infoItems.push(`<time datetime="${date.datetime}">${date.text}</time>`);
  if (source) infoItems.push(source);

  const topicItems = tags.map((text) => `<li class="usa-collection__meta-item usa-tag">${text}</li>`);
  if (newTag) topicItems.push(`<li class="usa-collection__meta-item usa-tag usa-tag--new">${newTag}</li>`);

  return `
  <li class="usa-collection__item">
    ${img ? `<img class="usa-collection__img" src="${img.src}" alt="${img.alt}" />` : ''}
    ${
      calendarDate
        ? `<div class="usa-collection__calendar-date">
      <time datetime="${calendarDate.datetime}">
        <span class="usa-collection__calendar-date-month">${calendarDate.month}</span>
        <span class="usa-collection__calendar-date-day">${calendarDate.day}</span>
      </time>
    </div>`
        : ''
    }
    <div class="usa-collection__body">
      <h4 class="usa-collection__heading">
        <a class="usa-link" href="${href}">${heading}</a>
      </h4>
      ${description ? `<p class="usa-collection__description">${description}</p>` : ''}
      ${
        infoItems.length
          ? `<ul class="usa-collection__meta" aria-label="More information">
        ${infoItems.map((html) => `<li class="usa-collection__meta-item">${html}</li>`).join('')}
      </ul>`
          : ''
      }
      ${
        topicItems.length
          ? `<ul class="usa-collection__meta" aria-label="Topics">
        ${topicItems.join('')}
      </ul>`
          : ''
      }
    </div>
  </li>`;
};

/**
 * @param {string[]} items `.usa-collection__item` markup strings
 * @param {object} [options]
 * @param {boolean} [options.condensed] Add `.usa-collection--condensed`
 */
const collectionList = (items, { condensed = false } = {}) => `
  <ul class="usa-collection${condensed ? ' usa-collection--condensed' : ''}">
    ${items.join('\n')}
  </ul>`;

/** Default variant content — news items with author + date metadata. */
const defaultItems = ({ heading, description, author } = {}) => [
  collectionItem({
    heading,
    description,
    author,
    date: { text: 'January 14, 2026', datetime: '2026-01-14T10:00:00-06:00' },
  }),
  collectionItem({
    heading: 'Perseverance Rover Caches Tenth Rock Sample at Jezero Crater',
    description:
      'The rover cached a duplicate rock core at a surface depot as a backup path for eventual sample return to Earth.',
    author: 'NASA Jet Propulsion Laboratory',
    date: { text: 'May 6, 2026', datetime: '2026-05-06T09:00:00-07:00' },
  }),
];

/** Condensed variant content — dataset releases, heading + single meta line only. */
const condensedItems = () => [
  collectionItem({
    heading: 'MODIS Land Surface Temperature and Emissivity Data Set Updated',
    source: 'NASA Earthdata — LP DAAC',
  }),
  collectionItem({
    heading: 'GRACE Follow-On Monthly Mass Grid Product Refreshed for Q2 2026',
    source: 'NASA Earthdata — PO.DAAC',
  }),
  collectionItem({
    heading: 'Landsat 9 Collection 2 Surface Reflectance Data Refresh',
    source: 'USGS/NASA Landsat Science',
  }),
];

/** Media variant content — thumbnail images alongside body copy. */
const mediaItems = () => [
  collectionItem({
    heading: 'Webb Telescope Returns New View of the Pillars of Creation',
    description: 'The infrared observatory captured a sharper view of the star-forming region in the Eagle Nebula.',
    author: 'NASA Goddard Space Flight Center',
    date: { text: 'April 2, 2026', datetime: '2026-04-02T11:00:00-04:00' },
    img: { src: 'assets/img/circle-124.png', alt: '' },
  }),
  collectionItem({
    heading: 'Curiosity Rover Images Ancient Mud Cracks in Gale Crater',
    description:
      'The images show cracked mud that hardened billions of years ago, evidence of repeated wet-dry cycles.',
    author: 'NASA Jet Propulsion Laboratory',
    date: { text: 'March 11, 2026', datetime: '2026-03-11T09:00:00-07:00' },
    img: { src: 'assets/img/circle-124.png', alt: '' },
  }),
];

/** Calendar date variant content — upcoming public events. */
const calendarItems = () => [
  collectionItem({
    heading: 'International Observe the Moon Night Returns to NASA Visitor Centers',
    description:
      'The annual public event invites communities worldwide to observe the Moon together and learn about the Artemis campaign.',
    calendarDate: { month: 'OCT', day: '10', datetime: '2026-10-10T19:00:00-04:00' },
  }),
  collectionItem({
    heading: 'NASA Advisory Council Human Exploration and Operations Committee Meets',
    description:
      'The committee receives a status update on Artemis campaign readiness and commercial low Earth orbit destination progress.',
    calendarDate: { month: 'NOV', day: '4', datetime: '2026-11-04T09:00:00-05:00' },
  }),
];

/** Tags variant content — publication/dataset listings with topic + "new" metadata. */
const tagItems = () => [
  collectionItem({
    heading: 'NASA Earthdata Publishes Updated Global Precipitation Measurement Collection',
    description:
      'The IMERG Final Run product combines satellite and rain gauge data into a half-hourly global precipitation estimate.',
    author: 'NASA Earthdata — GES DISC',
    date: { text: 'June 9, 2026', datetime: '2026-06-09T00:00:00Z' },
    tags: ['Earth Science', 'Open Data'],
    newTag: 'New',
  }),
  collectionItem({
    heading: 'Open-Source Release: Astropy 7.0',
    description:
      'The community-developed Python package for astronomy adds support for an updated World Coordinate System standard.',
    author: 'NASA Astrophysics Data System',
    date: { text: 'February 18, 2026', datetime: '2026-02-18T00:00:00Z' },
    tags: ['Astrophysics', 'Software'],
  }),
];

const infoArgTypes = {
  heading: { control: 'text', name: 'Heading' },
  description: { control: 'text', name: 'Description' },
  author: { control: 'text', name: 'Author' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    heading: 'Artemis II Crew Completes Water Survival Training',
    description:
      'Astronauts Reid Wiseman, Victor Glover, Christina Koch, and Jeremy Hansen practiced open-water egress and recovery procedures.',
    author: 'NASA Johnson Space Center',
  },
  argTypes: infoArgTypes,
  render: (args = {}) => collectionList(defaultItems(args)),
};

export const Condensed = {
  name: 'Condensed',
  tags: ['!dev', '!test'],
  render: () => collectionList(condensedItems(), { condensed: true }),
};

export const WithMedia = {
  name: 'With media',
  tags: ['!dev', '!test'],
  render: () => collectionList(mediaItems()),
};

export const WithCalendarDate = {
  name: 'With calendar date',
  tags: ['!dev', '!test'],
  render: () => collectionList(calendarItems()),
};

export const WithTags = {
  name: 'With tags',
  tags: ['!dev', '!test'],
  render: () => collectionList(tagItems()),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    stack([
      block('Default', collectionList(defaultItems(args))),
      block('Condensed', collectionList(condensedItems(), { condensed: true })),
      block('With media', collectionList(mediaItems())),
      block('With calendar date', collectionList(calendarItems())),
      block('With tags', collectionList(tagItems())),
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
