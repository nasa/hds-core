// ============================================================
// Table Stories — @nasa/hds-core
// Covers §16 (USWDS .usa-table override, Tier 1)
//
// Sidebar structure:
//   Guidance   — Table.mdx
//   Playground — interactive variant switcher
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Table',
};

// --- Helpers ---

const label = (text) => `<p class="hds-label">${text}</p>`;

// --- Story markup functions ---

const basicTable = ({ prefix = 'basic' }) => `
  <table class="usa-table" aria-describedby="${prefix}-desc">
    <caption>Moon missions by decade</caption>
    <thead>
      <tr>
        <th scope="col">Mission</th>
        <th scope="col">Year</th>
        <th scope="col">Agency</th>
        <th scope="col">Outcome</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Apollo 11</th>
        <td>1969</td>
        <td>NASA</td>
        <td>Success</td>
      </tr>
      <tr>
        <th scope="row">Apollo 13</th>
        <td>1970</td>
        <td>NASA</td>
        <td>Aborted</td>
      </tr>
      <tr>
        <th scope="row">Luna 24</th>
        <td>1976</td>
        <td>Soviet Union</td>
        <td>Success</td>
      </tr>
      <tr>
        <th scope="row">Chandrayaan-3</th>
        <td>2023</td>
        <td>ISRO</td>
        <td>Success</td>
      </tr>
      <tr>
        <th scope="row">Artemis II</th>
        <td>2025</td>
        <td>NASA</td>
        <td>Planned</td>
      </tr>
    </tbody>
  </table>
  <p class="hds-caption" id="${prefix}-desc">
    Source: NASA History Division. Last updated March 2026.
  </p>
`;

const captionSubtitleTable = ({ prefix = 'subtitle' }) => `
  <table class="usa-table" aria-describedby="${prefix}-desc">
    <caption>
      <strong>Close approach data</strong>
      <span>Close approaches to the Earth by near-Earth objects (NEOs)</span>
    </caption>
    <thead>
      <tr>
        <th scope="col">Object</th>
        <th scope="col">Close-approach date</th>
        <th scope="col" class="text-right">Distance (AU)</th>
        <th scope="col" class="text-right">Velocity (km/s)</th>
        <th scope="col">Diameter</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">2021 TX1</th>
        <td>2021-Oct-07</td>
        <td class="text-right">1.27</td>
        <td class="text-right">17.82</td>
        <td>9.3 m – 21 m</td>
      </tr>
      <tr>
        <th scope="row">2015 TQ21</th>
        <td>2021-Oct-07</td>
        <td class="text-right">10.70</td>
        <td class="text-right">20.73</td>
        <td>8.8 m – 20 m</td>
      </tr>
      <tr>
        <th scope="row">2021 TZ1</th>
        <td>2021-Oct-09</td>
        <td class="text-right">3.74</td>
        <td class="text-right">4.17</td>
        <td>5.7 m – 13 m</td>
      </tr>
      <tr>
        <th scope="row">2021 TS3</th>
        <td>2021-Oct-14</td>
        <td class="text-right">10.85</td>
        <td class="text-right">4.15</td>
        <td>9.7 m – 22 m</td>
      </tr>
      <tr>
        <th scope="row">2020 KA</th>
        <td>2021-Nov-06</td>
        <td class="text-right">14.89</td>
        <td class="text-right">4.85</td>
        <td>8.4 m – 19 m</td>
      </tr>
    </tbody>
  </table>
  <p class="hds-caption" id="${prefix}-desc">
    This table shows close approaches to the Earth by near-Earth objects (NEOs).
    Data are not available prior to 1900 A.D. nor after 2200 A.D.
  </p>
`;

const sortableTable = ({ prefix = 'sortable' }) => `
  <table class="usa-table" aria-describedby="${prefix}-desc">
    <caption>Planetary fact sheet</caption>
    <thead>
      <tr>
        <th scope="col" data-sortable>Planet</th>
        <th scope="col" data-sortable class="text-right">Mass (10²⁴ kg)</th>
        <th scope="col" data-sortable class="text-right">Diameter (km)</th>
        <th scope="col" data-sortable aria-sort="descending" class="text-right">Gravity (m/s²)</th>
        <th scope="col">Type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Mercury</th>
        <td data-sort-value="0.330" class="text-right">0.330</td>
        <td data-sort-value="4879" class="text-right">4,879</td>
        <td data-sort-value="3.7" class="text-right">3.7</td>
        <td>Terrestrial</td>
      </tr>
      <tr>
        <th scope="row">Venus</th>
        <td data-sort-value="4.87" class="text-right">4.87</td>
        <td data-sort-value="12104" class="text-right">12,104</td>
        <td data-sort-value="8.9" class="text-right">8.9</td>
        <td>Terrestrial</td>
      </tr>
      <tr>
        <th scope="row">Earth</th>
        <td data-sort-value="5.97" class="text-right">5.97</td>
        <td data-sort-value="12756" class="text-right">12,756</td>
        <td data-sort-value="9.8" class="text-right">9.8</td>
        <td>Terrestrial</td>
      </tr>
      <tr>
        <th scope="row">Mars</th>
        <td data-sort-value="0.642" class="text-right">0.642</td>
        <td data-sort-value="6792" class="text-right">6,792</td>
        <td data-sort-value="3.7" class="text-right">3.7</td>
        <td>Terrestrial</td>
      </tr>
      <tr>
        <th scope="row">Jupiter</th>
        <td data-sort-value="1898" class="text-right">1,898</td>
        <td data-sort-value="142984" class="text-right">142,984</td>
        <td data-sort-value="23.1" class="text-right">23.1</td>
        <td>Gas giant</td>
      </tr>
      <tr>
        <th scope="row">Saturn</th>
        <td data-sort-value="568" class="text-right">568</td>
        <td data-sort-value="120536" class="text-right">120,536</td>
        <td data-sort-value="9.0" class="text-right">9.0</td>
        <td>Gas giant</td>
      </tr>
    </tbody>
  </table>
  <div class="usa-sr-only usa-table__announcement-region" aria-live="polite"></div>
  <p class="hds-caption" id="${prefix}-desc">
    Source: NASA Planetary Fact Sheet. Values are approximate.
  </p>
`;

const borderlessTable = ({ prefix = 'borderless' }) => `
  <table class="usa-table usa-table--borderless">
    <caption>Orbital parameters</caption>
    <thead>
      <tr>
        <th scope="col">Parameter</th>
        <th scope="col">Value</th>
        <th scope="col">Unit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Distance to Moon</th>
        <td>384,400</td>
        <td>km</td>
      </tr>
      <tr>
        <th scope="row">Orbital period</th>
        <td>27.3</td>
        <td>days</td>
      </tr>
      <tr>
        <th scope="row">Surface gravity</th>
        <td>1.62</td>
        <td>m/s²</td>
      </tr>
    </tbody>
  </table>
`;

const compactTable = ({ prefix = 'compact' }) => `
  <table class="usa-table usa-table--compact">
    <caption>Element abundance</caption>
    <thead>
      <tr>
        <th scope="col">Element</th>
        <th scope="col">Symbol</th>
        <th scope="col">Atomic number</th>
        <th scope="col" class="text-right">Solar abundance</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Hydrogen</th>
        <td>H</td>
        <td>1</td>
        <td class="text-right">73.46%</td>
      </tr>
      <tr>
        <th scope="row">Helium</th>
        <td>He</td>
        <td>2</td>
        <td class="text-right">24.85%</td>
      </tr>
      <tr>
        <th scope="row">Oxygen</th>
        <td>O</td>
        <td>8</td>
        <td class="text-right">0.77%</td>
      </tr>
      <tr>
        <th scope="row">Carbon</th>
        <td>C</td>
        <td>6</td>
        <td class="text-right">0.29%</td>
      </tr>
      <tr>
        <th scope="row">Neon</th>
        <td>Ne</td>
        <td>10</td>
        <td class="text-right">0.13%</td>
      </tr>
      <tr>
        <th scope="row">Iron</th>
        <td>Fe</td>
        <td>26</td>
        <td class="text-right">0.10%</td>
      </tr>
    </tbody>
  </table>
`;

const wideTable = ({ prefix = 'wide' }) => `
  <table class="usa-table">
    <caption>Mission timeline</caption>
    <thead>
      <tr>
        <th scope="col">Mission</th>
        <th scope="col">Launch date</th>
        <th scope="col">Vehicle</th>
        <th scope="col">Launch site</th>
        <th scope="col">Duration</th>
        <th scope="col">Orbit type</th>
        <th scope="col">Crew size</th>
        <th scope="col">Primary objective</th>
        <th scope="col">Secondary objective</th>
        <th scope="col">Landing site</th>
        <th scope="col">Recovery</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Artemis I</th>
        <td>Nov 16, 2022</td>
        <td>SLS Block 1</td>
        <td>KSC LC-39B</td>
        <td>25d 10h</td>
        <td>Lunar DRO</td>
        <td>0 (uncrewed)</td>
        <td>Orion flight test</td>
        <td>Heat shield reentry test</td>
        <td>Pacific Ocean</td>
        <td>USS Portland</td>
        <td>Complete</td>
      </tr>
      <tr>
        <th scope="row">Artemis II</th>
        <td>Apr 2026</td>
        <td>SLS Block 1</td>
        <td>KSC LC-39B</td>
        <td>~10 days</td>
        <td>Lunar flyby</td>
        <td>4</td>
        <td>Crewed lunar flyby</td>
        <td>Life support validation</td>
        <td>Pacific Ocean</td>
        <td>TBD</td>
        <td>Planned</td>
      </tr>
      <tr>
        <th scope="row">Artemis III</th>
        <td>2027</td>
        <td>SLS Block 1</td>
        <td>KSC LC-39B</td>
        <td>~30 days</td>
        <td>Lunar orbit + landing</td>
        <td>4</td>
        <td>Crewed lunar landing</td>
        <td>South pole exploration</td>
        <td>Lunar south pole</td>
        <td>TBD</td>
        <td>Planned</td>
      </tr>
    </tbody>
  </table>
`;

const scrollableTable = ({ prefix = 'scroll' }) => `
  <div class="usa-table-container--scrollable" tabindex="0">
    ${wideTable({ prefix })}
  </div>
`;

const interactiveTable = ({ prefix = 'interactive' }) => `
  <table class="usa-table">
    <caption>Mission documents</caption>
    <thead>
      <tr>
        <th scope="col">Document</th>
        <th scope="col">Mission</th>
        <th scope="col">Type</th>
        <th scope="col">Size</th>
        <th scope="col">Source</th>
        <th scope="col">Download</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">
          <a class="usa-link" href="#">Artemis I Press Kit</a>
        </th>
        <td>Artemis I</td>
        <td>PDF</td>
        <td>4.2 MB</td>
        <td>
          <a class="usa-link" href="#">NASA Technical Reports</a>
        </td>
        <td>
          <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download Artemis I Press Kit" type="button">
            <svg class="hds-icon" aria-hidden="true" focusable="false">
              <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
            </svg>
          </button>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <a class="usa-link" href="#">Orion Heat Shield Analysis</a>
        </th>
        <td>Artemis I</td>
        <td>PDF</td>
        <td>12.8 MB</td>
        <td>
          <a class="usa-link usa-link--external" href="https://arc.aiaa.org">AIAA Digital Library</a>
        </td>
        <td>
          <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download Orion Heat Shield Analysis" type="button">
            <svg class="hds-icon" aria-hidden="true" focusable="false">
              <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
            </svg>
          </button>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <a class="usa-link" href="#">SLS Block 1 Fact Sheet</a>
        </th>
        <td>Artemis II</td>
        <td>PDF</td>
        <td>1.1 MB</td>
        <td>
          <a class="usa-link" href="#">NASA Facts Online</a>
        </td>
        <td>
          <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download SLS Block 1 Fact Sheet" type="button">
            <svg class="hds-icon" aria-hidden="true" focusable="false">
              <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
            </svg>
          </button>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <a class="usa-link" href="#">Crew Biographical Data</a>
        </th>
        <td>Artemis II</td>
        <td>HTML</td>
        <td>—</td>
        <td>
          <a class="usa-link usa-link--external" href="https://en.wikipedia.org">Wikipedia</a>
        </td>
        <td>—</td>
      </tr>
      <tr>
        <th scope="row">
          <a class="usa-link" href="#">Lunar Surface Science Plan</a>
        </th>
        <td>Artemis III</td>
        <td>PDF</td>
        <td>8.5 MB</td>
        <td>
          <a class="usa-link usa-link--external" href="https://scholar.google.com">Google Scholar</a>
        </td>
        <td>
          <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download Lunar Surface Science Plan" type="button">
            <svg class="hds-icon" aria-hidden="true" focusable="false">
              <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
`;

// --- Guidance embeds (hidden from sidebar) ---

export const Default = {
  tags: ['!dev'],
  render: () => basicTable({ prefix: 'default' }),
};

export const CaptionSubtitle = {
  name: 'Caption with subtitle',
  tags: ['!dev'],
  render: () => captionSubtitleTable({ prefix: 'capsub' }),
};

export const Sortable = {
  tags: ['!dev'],
  render: () => sortableTable({ prefix: 'sort' }),
};

export const Borderless = {
  tags: ['!dev'],
  render: () => borderlessTable({ prefix: 'bless' }),
};

export const Compact = {
  tags: ['!dev'],
  render: () => compactTable({ prefix: 'compact' }),
};

export const Scrollable = {
  tags: ['!dev'],
  render: () => scrollableTable({ prefix: 'scroll' }),
};

export const Interactive = {
  name: 'Links and buttons in cells',
  tags: ['!dev'],
  render: () => interactiveTable({ prefix: 'interact' }),
};

// --- Palette accessibility tests (hidden from sidebar) ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(Sortable.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(Sortable.render, 'hover'),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(Sortable.render, 'focus-visible'),
};

// --- Playground (visible in sidebar) ---

export const Playground = {
  args: {
    content: 'sortable',
    striped: false,
    borderless: false,
    compact: false,
    scrollable: false,
  },
  argTypes: {
    content: {
      control: 'select',
      options: ['default', 'caption-subtitle', 'sortable', 'interactive', 'wide'],
      description: 'Table content',
    },
    striped: {
      control: 'boolean',
      description: 'Alternating row backgrounds (.usa-table--striped)',
    },
    borderless: {
      control: 'boolean',
      description: 'Remove borders and header background (.usa-table--borderless)',
    },
    compact: {
      control: 'boolean',
      description: 'Reduced padding (.usa-table--compact)',
    },
    scrollable: {
      control: 'boolean',
      description: 'Horizontal scroll container (.usa-table-container--scrollable)',
    },
  },
  render: (args) => {
    const modifiers = [
      args.striped ? 'usa-table--striped' : '',
      args.borderless ? 'usa-table--borderless' : '',
      args.compact ? 'usa-table--compact' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const contents = {
      default: basicTable({ prefix: 'pg-basic' }),
      'caption-subtitle': captionSubtitleTable({ prefix: 'pg-capsub' }),
      sortable: sortableTable({ prefix: 'pg-sort' }),
      interactive: interactiveTable({ prefix: 'pg-interact' }),
      wide: wideTable({ prefix: 'pg-wide' }),
    };

    let html = contents[args.content] || contents['default'];

    // Inject modifier classes into the usa-table class attribute
    if (modifiers) {
      html = html.replace('class="usa-table"', `class="usa-table ${modifiers}"`);
      html = html.replace('class="usa-table ', `class="usa-table ${modifiers} `);
    }

    // Wrap in scrollable container if toggled
    if (args.scrollable) {
      html = `<div class="usa-table-container--scrollable" tabindex="0">${html}</div>`;
    }

    return html;
  },
};
