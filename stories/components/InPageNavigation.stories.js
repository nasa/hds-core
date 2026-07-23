// ============================================================
// In-Page Navigation Stories — @nasa-hds/core
// CSS: components/_in-page-nav.scss
//
// Sidebar structure:
//   Guidance   — InPageNavigation.mdx (Canvas embed, usage rules)
//   Stories    — Default (visible in sidebar)
//
// USWDS JS builds the nav link list at runtime from headings
// in the content area. In Storybook, a decorator in preview.js
// runs a ported version of the USWDS init logic after story
// render (setTimeout(0) pattern, same as table sort). This is
// Storybook-only tooling — consumers use uswds.min.js natively.
//
// Requires <main> element — USWDS JS defaults to scanning
// <main> for headings. Without it, the aside stays empty and
// :empty { display: none } hides the component entirely.
// Each story uses data-main-content-selector with a unique ID
// so multiple instances don't collide.
//
// PaletteA11y uses per-palette stories (not stacked
// paletteRender) because USWDS JS needs unique <main> IDs
// to initialize each instance. Same pattern as Typography.
// ============================================================

import { expect } from 'storybook/test';
import initInPageNav from '../../.storybook/utils/in-page-nav-init';

export default {
  title: 'Components/In-Page Navigation',
  parameters: {
    chromatic: { delay: 300 },
    a11y: {
      config: {
        rules: [{ id: 'landmark-no-duplicate-main', enabled: false }],
      },
    },
  },
};

// --- Helpers ---

const defaultSections = [
  {
    text: 'Mission Overview',
    content: `<p>The Europa Clipper mission will conduct a detailed reconnaissance
      of Jupiter's moon Europa to determine whether the icy world could harbor
      conditions suitable for life.</p>`,
  },
  {
    text: 'Science Objectives',
    content: `<p>The mission aims to produce high-resolution images of Europa's
      surface, determine its composition, look for signs of recent or ongoing
      geological activity, and measure the thickness of the moon's icy shell.</p>`,
  },
  {
    text: 'Instruments',
    content: `<p>Europa Clipper carries nine science instruments including cameras,
      spectrometers, an ice-penetrating radar, and a magnetometer to study the
      moon's ice shell, ocean, and geology.</p>`,
  },
  {
    text: 'Mission Timeline',
    content: `<p>Launched in October 2024, the spacecraft will arrive at Jupiter
      in 2030. It will perform nearly 50 close flybys of Europa over its
      primary mission.</p>`,
  },
  {
    text: 'Key Discoveries',
    content: `<p>Previous missions, including Galileo, revealed evidence of a
      subsurface ocean beneath Europa's ice crust — one of the most promising
      places to search for life beyond Earth.</p>`,
  },
];

const subsectionData = [
  {
    text: 'Overview',
    content: `<p>The Artemis program aims to land the first woman and first person
      of color on the Moon, establish a sustainable presence, and prepare for
      future human missions to Mars.</p>`,
  },
  {
    text: 'Artemis Missions',
    content: `<p>The Artemis campaign includes a series of increasingly complex
      missions, each building on the last to expand human exploration of the
      lunar surface.</p>`,
    subsections: [
      {
        text: 'Artemis I',
        content: `<p>An uncrewed flight test that sent the Orion spacecraft around
          the Moon and back, validating systems for future crewed missions.</p>`,
      },
      {
        text: 'Artemis II',
        content: `<p>The first crewed Artemis flight, sending four astronauts on a
          lunar flyby to test Orion's life support and navigation systems.</p>`,
      },
      {
        text: 'Artemis III',
        content: `<p>The first crewed lunar landing since Apollo 17, targeting the
          lunar south pole where water ice may be accessible.</p>`,
      },
    ],
  },
  {
    text: 'Lunar Gateway',
    content: `<p>A small space station in lunar orbit that will serve as a staging
      point for missions to the Moon's surface and eventually deeper into the
      solar system.</p>`,
  },
  {
    text: 'Science at the South Pole',
    content: `<p>The lunar south pole features permanently shadowed craters that may
      contain water ice — a resource that could support long-duration exploration
      and serve as rocket propellant.</p>`,
    subsections: [
      {
        text: 'VIPER Rover',
        content: `<p>The Volatiles Investigating Polar Exploration Rover will map
          and drill for water ice near the lunar south pole.</p>`,
      },
      {
        text: 'Surface Experiments',
        content: `<p>Artemis astronauts will deploy instruments to study the lunar
          environment, including seismometers, heat probes, and sample
          collection tools.</p>`,
      },
    ],
  },
  {
    text: 'International Partners',
    content: `<p>Artemis includes contributions from ESA, JAXA, CSA, and other
      international partners, reflecting a shared commitment to peaceful
      exploration.</p>`,
  },
];

/**
 * Build the developer markup for an in-page navigation component.
 * USWDS JS builds the nav link list from headings at runtime.
 *
 * Uses <main> because USWDS JS defaults to scanning <main> for
 * headings. data-main-content-selector points to the unique ID
 * so multiple instances don't collide.
 *
 * @param {Object} options
 * @param {string} options.prefix               Unique ID prefix (required)
 * @param {Array}  options.sections             Section data array
 * @param {string} [options.titleText]          Navigation heading text
 * @param {string} [options.headingElements]    Heading levels for JS to scan
 * @param {string} [options.minimumHeadingCount] Min headings to initialize
 */
const inPageNav = ({
  prefix,
  sections,
  titleText = 'Contents',
  headingElements = 'h2 h3',
  minimumHeadingCount = '3',
}) => {
  const contentId = `${prefix}-content`;

  const sectionHtml = sections
    .map((section) => {
      let html = `<h2>${section.text}</h2>\n${section.content}`;
      if (section.subsections) {
        html += section.subsections.map((sub) => `<h3>${sub.text}</h3>\n${sub.content}`).join('\n');
      }
      return html;
    })
    .join('\n');

  return `
    <div class="usa-in-page-nav-container">
      <aside
        class="usa-in-page-nav"
        data-title-text="${titleText}"
        data-title-heading-level="h4"
        data-heading-elements="${headingElements}"
        data-main-content-selector="#${contentId}"
        data-minimum-heading-count="${minimumHeadingCount}"
      ></aside>
      <main id="${contentId}" class="main-content usa-prose">
        ${sectionHtml}
      </main>
    </div>
  `;
};

// Per-palette story helpers

const perPaletteA11yParams = {
  chromatic: { disableSnapshot: false, delay: 300 },
};

const paletteRender = (palette, prefix) => () => `
  <div class="hds-palette-${palette}" style="padding: 2rem;">
    ${inPageNav({ prefix, sections: subsectionData })}
  </div>
`;

// Chromatic modes
const supportedModes = {
  white: { palette: 'white' },
  light: { palette: 'light' },
  midtone: { palette: 'midtone' },
  dark: { palette: 'dark' },
  blue: { palette: 'blue' },
  black: { palette: 'black' },
};

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    delay: 300,
    modes: supportedModes,
  },
};

// --- Stories (visible in sidebar) ---

export const Default = {
  parameters: {
    docs: { story: { height: '500px' } },
  },
  render: () =>
    inPageNav({
      prefix: 'default',
      sections: subsectionData,
    }),
};

// --- Palette accessibility tests (per-palette, not stacked) ---
// Per-palette because USWDS JS needs unique <main> IDs.

export const PaletteA11yWhite = {
  name: 'Palette a11y [white]',
  tags: ['!dev'],
  parameters: perPaletteA11yParams,
  render: paletteRender('white', 'pa11y-white'),
};

export const PaletteA11yLight = {
  name: 'Palette a11y [light]',
  tags: ['!dev'],
  parameters: perPaletteA11yParams,
  render: paletteRender('light', 'pa11y-light'),
};

export const PaletteA11yDark = {
  name: 'Palette a11y [dark]',
  tags: ['!dev'],
  parameters: perPaletteA11yParams,
  render: paletteRender('dark', 'pa11y-dark'),
};

export const PaletteA11yBlack = {
  name: 'Palette a11y [black]',
  tags: ['!dev'],
  parameters: perPaletteA11yParams,
  render: paletteRender('black', 'pa11y-black'),
};

export const PaletteA11yMidtone = {
  name: 'Palette a11y [midtone]',
  tags: ['!dev'],
  parameters: perPaletteA11yParams,
  render: paletteRender('midtone', 'pa11y-midtone'),
};

export const PaletteA11yBlue = {
  name: 'Palette a11y [blue]',
  tags: ['!dev'],
  parameters: perPaletteA11yParams,
  render: paletteRender('blue', 'pa11y-blue'),
};

// --- Focus tests ---

export const FocusNavLink = {
  name: 'Focus [nav link]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => inPageNav({ prefix: 'focus', sections: defaultSections.slice(0, 3) }),
  play: async ({ canvas }) => {
    // Call init directly — play functions run after DOM is ready
    // but the decorator's setTimeout(0) may not have fired yet.
    // initInPageNav is idempotent so double-init is safe.
    initInPageNav(document);

    // Tab into the nav: first tab lands on the "Contents"
    // heading (tabindex="0"), second tab reaches the first link.
    const link = canvas.getByRole('link', { name: 'Mission Overview' });
    link.focus();
    await expect(link).toHaveFocus();
  },
};
