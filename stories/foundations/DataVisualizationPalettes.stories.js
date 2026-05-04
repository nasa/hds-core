// ============================================================
// Data Visualization Palettes
//
// Reference-only stories for documenting data viz color palettes.
// Embedded in DataVisualizationPalettes.mdx via <Canvas sourceState="none" />.
//
// Consumers use:
//   CSS/JS:  var(--hds-dataviz-color-cat-1) through var(--hds-dataviz-color-cat-12)
//            var(--hds-dataviz-color-seq-{hue}-{step}) for sequential
//   JS libs: Copy hex values from the Palettes docs page
//
// Enable: $hds-enable-dataviz-tokens: true in _hds-tokens.scss
//
// Architecture:
//   - Scoped <style> block per DOCUMENTATION.md demo-only pattern
//   - USWDS hex values in one const map (single source of truth)
//   - HDS colors via var(--hds-color-*) CSS custom properties
//   - WCAG AA auto text color via JS luminance function
//   - Semantic <table> with <th scope="col"> for categorical/groups
//
// Maintainer reference — HDS Figma name → USWDS token:
//   cat-1:  Blue 80   → blue-70v       cat-7:  Red 80    → red-70v
//   cat-2:  Red 50    → red-40v        cat-8:  Slate 40  → blue-cool-30
//   cat-3:  Orange 40 → orange-30v     cat-9:  Purple 80 → indigo-warm-70v
//   cat-4:  Slate 70  → blue-cool-60   cat-10: Yellow 40 → gold-30v
//   cat-5:  Gold 40   → gold-40        cat-11: Lime 70   → green-60v
//   cat-6:  Blue 50   → blue-40v       cat-12: Aqua 40   → mint-cool-30v
// ============================================================

import { datavizColors } from '../helpers/hdsDatavizColors';

export default {
  title: 'Foundations/Data Visualization Palettes',
  parameters: {
    layout: 'fullscreen',
  },
};

// ============================================================
// USWDS color tokens (data visualization only)
// Verify against: node_modules/@uswds/uswds/src/data/colors.json
// ============================================================

// ============================================================
// WCAG AA luminance — auto text color
// ============================================================

const hexToRgb = (h) => {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const luminance = ([r, g, b]) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const contrast = (a, b) => {
  const la = luminance(hexToRgb(a));
  const lb = luminance(hexToRgb(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

const fg = (bgHex) => (contrast(bgHex, '#ffffff') >= 4.5 ? '#fff' : '#000');

// ============================================================
// Scoped demo styles — isolates from Storybook global CSS
// ============================================================

const dvpStyles = `
  <style>
    .dvp {
      padding: 1.5rem;
      font-family: var(--hds-font-family-code, 'DM Mono', monospace);
      font-size: 0.8rem;
    }
    .dvp-light { background: var(--hds-color-carbon-05); }
    .dvp-dark  { background: var(--hds-color-carbon-90); }
    .dvp-transparent { background: transparent; }

    .dvp table {
      width: 100%;
      border-collapse: collapse;
      border: none;
    }
    .dvp th,
    .dvp td {
      border: none;
      padding: 0.5rem 0.75rem;
      font-family: inherit;
      font-size: inherit;
      font-weight: 400;
    }
    .dvp th {
      font-size: 0.7rem;
      font-weight: 500;
      padding: 0.35rem 0.75rem;
    }
    .dvp-light th { color: var(--hds-color-carbon-60); }
    .dvp-dark th  { color: var(--hds-color-carbon-40); }
    .dvp .dvp-right { text-align: right; }
    .dvp .dvp-left  { text-align: left; }
    .dvp .dvp-mono  { font-family: var(--hds-font-family-code, 'DM Mono', monospace); }

    .dvp-strip {
      display: flex;
      height: 3rem;
      overflow: hidden;
    }
    .dvp-strip > div { flex: 1; }
    .dvp-strip-prefix {
      margin: 0 0 0.75rem;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .dvp-light .dvp-strip-prefix { color: var(--hds-color-carbon-60); }
    .dvp-dark .dvp-strip-prefix  { color: var(--hds-color-carbon-40); }
    .dvp-transparent .dvp-strip-prefix { color: var(--hds-color-carbon-60); }
    .dvp-strip-labels {
      display: flex;
      margin-top: 0.5rem;
      font-size: 0.7rem;
      line-height: 1.4;
    }
    .dvp-strip-labels > div { flex: 1; padding-right: 4px; }
    .dvp-light .dvp-strip-labels { color: var(--hds-color-carbon-60); }
    .dvp-dark .dvp-strip-labels  { color: var(--hds-color-carbon-40); }
    .dvp-transparent .dvp-strip-labels { color: var(--hds-color-carbon-60); }

    .dvp-groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .dvp-groups table { font-size: 0.75rem; }
    .dvp-groups td { padding: 0.4rem 0.6rem; }
  </style>
`;

// ============================================================
// Helper: wrap content in scoped demo container
// ============================================================

const dvp = (content, background = 'light') => `<div class="dvp dvp-${background}">${dvpStyles}${content}</div>`;

// ============================================================
// Helper: categorical table
// ============================================================

const categoricalTable = (colors, background = 'light') => {
  const rows = colors
    .map((c) => {
      const h = c.hex;
      const color = fg(h);
      return `
      <tr>
        <td style="background-color: ${h}; color: ${color};">${c.id}</td>
        <td style="background-color: ${h}; color: ${color};" class="dvp-mono">${c.property}</td>
        <td style="background-color: ${h}; color: ${color};">${c.semantic || ''}</td>
        <td style="background-color: ${h}; color: ${color};" class="dvp-right">${h}</td>
      </tr>`;
    })
    .join('');

  return dvp(
    `
    <table>
      <thead>
        <tr>
          <th scope="col" class="dvp-left">#</th>
          <th scope="col" class="dvp-left">CSS Custom Property</th>
          <th scope="col" class="dvp-left">Semantic Match</th>
          <th scope="col" class="dvp-right">Hex</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `,
    background,
  );
};

// ============================================================
// Helper: sequential strip
// ============================================================

const sequentialStrip = (family, colors, background = 'transparent') => {
  const swatches = colors.map((c) => `<div style="background-color: ${c.hex};"></div>`).join('');

  const labels = colors
    .map(
      (c) => `
    <div>
      <div>${c.id}</div>
      <div>${c.hex}</div>
    </div>
  `,
    )
    .join('');

  return dvp(
    `
    <p class="dvp-strip-prefix"><code>--hds-dataviz-color-seq-${family}-*</code></p>
    <div class="dvp-strip">${swatches}</div>
    <div class="dvp-strip-labels">${labels}</div>
  `,
    background,
  );
};

// ============================================================
// Helper: group grid
// ============================================================

const groupGrid = (groups, background = 'light') => {
  const blocks = groups
    .map((group) => {
      const rows = group
        .map((c) => {
          const h = c.hex;
          const color = fg(h);
          return `
        <tr>
          <td style="background-color: ${h}; color: ${color};">${c.property}</td>
          <td style="background-color: ${h}; color: ${color};" class="dvp-right">${h}</td>
        </tr>`;
        })
        .join('');
      return `<table><tbody>${rows}</tbody></table>`;
    })
    .join('');

  return dvp(
    `
    <div class="dvp-groups">${blocks}</div>
  `,
    background,
  );
};

// ============================================================
// Data: Categorical palettes
// ============================================================

const catLight = [
  { id: '01', property: '--hds-dataviz-color-cat-1', hex: datavizColors.cat.light[1], semantic: 'Blue 70' },
  { id: '02', property: '--hds-dataviz-color-cat-2', hex: datavizColors.cat.light[2], semantic: 'Red 50' },
  {
    id: '03',
    property: '--hds-dataviz-color-cat-3',
    hex: datavizColors.cat.light[3],
    semantic: 'Orange ~38',
  },
  { id: '04', property: '--hds-dataviz-color-cat-4', hex: datavizColors.cat.light[4], semantic: 'Slate 70' },
  {
    id: '05',
    property: '--hds-dataviz-color-cat-5',
    hex: datavizColors.cat.light[5],
    semantic: 'Gold ~38',
  },
  { id: '06', property: '--hds-dataviz-color-cat-6', hex: datavizColors.cat.light[6], semantic: 'Blue 50' },
  {
    id: '07',
    property: '--hds-dataviz-color-cat-7',
    hex: datavizColors.cat.light[7],
    semantic: 'Red ~79',
  },
  { id: '08', property: '--hds-dataviz-color-cat-8', hex: datavizColors.cat.light[8], semantic: 'Slate 40' },
  { id: '09', property: '--hds-dataviz-color-cat-9', hex: datavizColors.cat.light[9], semantic: 'Purple 80' },
  { id: '10', property: '--hds-dataviz-color-cat-10', hex: datavizColors.cat.light[10], semantic: 'Yellow 40' },
  { id: '11', property: '--hds-dataviz-color-cat-11', hex: datavizColors.cat.light[11], semantic: 'Lime 70' },
  { id: '12', property: '--hds-dataviz-color-cat-12', hex: datavizColors.cat.light[12], semantic: 'Aqua 40' },
];

const catDark = [
  { id: '01', property: '--hds-dataviz-color-cat-1', hex: datavizColors.cat.dark[1], semantic: 'Blue 60' },
  { id: '02', property: '--hds-dataviz-color-cat-2', hex: datavizColors.cat.dark[2], semantic: 'Red 50' },
  { id: '03', property: '--hds-dataviz-color-cat-3', hex: datavizColors.cat.dark[3], semantic: 'Orange 30' },
  { id: '04', property: '--hds-dataviz-color-cat-4', hex: datavizColors.cat.dark[4], semantic: 'Slate 60' },
  { id: '05', property: '--hds-dataviz-color-cat-5', hex: datavizColors.cat.dark[5], semantic: 'Gold 30' },
  { id: '06', property: '--hds-dataviz-color-cat-6', hex: datavizColors.cat.dark[6], semantic: 'Blue 40' },
  { id: '07', property: '--hds-dataviz-color-cat-7', hex: datavizColors.cat.dark[7], semantic: 'Red 30' },
  { id: '08', property: '--hds-dataviz-color-cat-8', hex: datavizColors.cat.dark[8], semantic: 'Slate 40' },
  { id: '09', property: '--hds-dataviz-color-cat-9', hex: datavizColors.cat.dark[9], semantic: 'Purple 60' },
  { id: '10', property: '--hds-dataviz-color-cat-10', hex: datavizColors.cat.dark[10], semantic: 'Yellow 30' },
  { id: '11', property: '--hds-dataviz-color-cat-11', hex: datavizColors.cat.dark[11], semantic: 'Lime 60' },
  { id: '12', property: '--hds-dataviz-color-cat-12', hex: datavizColors.cat.dark[12], semantic: 'Aqua 40' },
];

// ============================================================
// Data: Smaller categorical groupings
// ============================================================

const groupsLight1 = [[catLight[0]], [catLight[1]], [catLight[2]], [catLight[10]]];
const groupsLight2 = [
  [catLight[0], catLight[2]],
  [catLight[1], catLight[6]],
  [catLight[2], catLight[8]],
  [catLight[10], catLight[11]],
];
const groupsLight3 = [
  [catLight[0], catLight[2], catLight[11]],
  [catLight[1], catLight[6], catLight[5]],
  [catLight[2], catLight[8], catLight[1]],
  [catLight[10], catLight[11], catLight[0]],
];
const groupsLight4 = [
  [catLight[0], catLight[2], catLight[11], catLight[10]],
  [catLight[1], catLight[6], catLight[5], catLight[11]],
  [catLight[2], catLight[8], catLight[1], catLight[9]],
  [catLight[10], catLight[11], catLight[0], catLight[9]],
];
const groupsLight5 = [
  [catLight[0], catLight[2], catLight[11], catLight[10], catLight[4]],
  [catLight[1], catLight[6], catLight[5], catLight[11], catLight[8]],
  [catLight[2], catLight[8], catLight[1], catLight[9], catLight[6]],
  [catLight[10], catLight[11], catLight[0], catLight[9], catLight[6]],
];

const groupsDark1 = [[catDark[0]], [catDark[1]], [catDark[2]], [catDark[10]]];
const groupsDark2 = [
  [catDark[0], catDark[2]],
  [catDark[1], catDark[6]],
  [catDark[2], catDark[8]],
  [catDark[10], catDark[11]],
];
const groupsDark3 = [
  [catDark[0], catDark[2], catDark[11]],
  [catDark[1], catDark[6], catDark[5]],
  [catDark[2], catDark[8], catDark[1]],
  [catDark[10], catDark[11], catDark[0]],
];
const groupsDark4 = [
  [catDark[0], catDark[2], catDark[11], catDark[10]],
  [catDark[1], catDark[6], catDark[5], catDark[11]],
  [catDark[10], catDark[11], catDark[0], catDark[9]],
  [catDark[2], catDark[8], catDark[1], catDark[9]],
];
const groupsDark5 = [
  [catDark[0], catDark[2], catDark[11], catDark[10], catDark[4]],
  [catDark[1], catDark[6], catDark[5], catDark[11], catDark[8]],
  [catDark[10], catDark[11], catDark[0], catDark[9], catDark[6]],
  [catDark[2], catDark[8], catDark[1], catDark[9], catDark[6]],
];

// ============================================================
// Data: Sequential palettes
// ============================================================

const seqReds = [
  { id: '10', hex: datavizColors.seq.red[0] },
  { id: '20', hex: datavizColors.seq.red[1] },
  { id: '30', hex: datavizColors.seq.red[2] },
  { id: '40', hex: datavizColors.seq.red[3] },
  { id: '50', hex: datavizColors.seq.red[4] },
  { id: '60', hex: datavizColors.seq.red[5] },
  { id: '70', hex: datavizColors.seq.red[6] },
  { id: '80', hex: datavizColors.seq.red[7] },
  { id: '90', hex: datavizColors.seq.red[8] },
  { id: '100', hex: datavizColors.seq.red[9] },
];

const seqOranges = [
  { id: '10', hex: datavizColors.seq.orange[0] },
  { id: '20', hex: datavizColors.seq.orange[1] },
  { id: '30', hex: datavizColors.seq.orange[2] },
  { id: '40', hex: datavizColors.seq.orange[3] },
  { id: '50', hex: datavizColors.seq.orange[4] },
  { id: '60', hex: datavizColors.seq.orange[5] },
  { id: '70', hex: datavizColors.seq.orange[6] },
  { id: '80', hex: datavizColors.seq.orange[7] },
  { id: '90', hex: datavizColors.seq.orange[8] },
  { id: '100', hex: datavizColors.seq.orange[9] },
];

const seqYellows = [
  { id: '10', hex: datavizColors.seq.yellow[0] },
  { id: '20', hex: datavizColors.seq.yellow[1] },
  { id: '30', hex: datavizColors.seq.yellow[2] },
  { id: '40', hex: datavizColors.seq.yellow[3] },
  { id: '50', hex: datavizColors.seq.yellow[4] },
  { id: '60', hex: datavizColors.seq.yellow[5] },
  { id: '70', hex: datavizColors.seq.yellow[6] },
  { id: '80', hex: datavizColors.seq.yellow[7] },
  { id: '90', hex: datavizColors.seq.yellow[8] },
  { id: '100', hex: datavizColors.seq.yellow[9] },
];

const seqGolds = [
  { id: '10', hex: datavizColors.seq.gold[0] },
  { id: '20', hex: datavizColors.seq.gold[1] },
  { id: '30', hex: datavizColors.seq.gold[2] },
  { id: '40', hex: datavizColors.seq.gold[3] },
  { id: '50', hex: datavizColors.seq.gold[4] },
  { id: '60', hex: datavizColors.seq.gold[5] },
  { id: '70', hex: datavizColors.seq.gold[6] },
  { id: '80', hex: datavizColors.seq.gold[7] },
  { id: '90', hex: datavizColors.seq.gold[8] },
  { id: '100', hex: datavizColors.seq.gold[9] },
];

const seqLimes = [
  { id: '10', hex: datavizColors.seq.lime[0] },
  { id: '20', hex: datavizColors.seq.lime[1] },
  { id: '30', hex: datavizColors.seq.lime[2] },
  { id: '40', hex: datavizColors.seq.lime[3] },
  { id: '50', hex: datavizColors.seq.lime[4] },
  { id: '60', hex: datavizColors.seq.lime[5] },
  { id: '70', hex: datavizColors.seq.lime[6] },
  { id: '80', hex: datavizColors.seq.lime[7] },
  { id: '90', hex: datavizColors.seq.lime[8] },
  { id: '100', hex: datavizColors.seq.lime[9] },
];

const seqGreens = [
  { id: '10', hex: datavizColors.seq.green[0] },
  { id: '20', hex: datavizColors.seq.green[1] },
  { id: '30', hex: datavizColors.seq.green[2] },
  { id: '40', hex: datavizColors.seq.green[3] },
  { id: '50', hex: datavizColors.seq.green[4] },
  { id: '60', hex: datavizColors.seq.green[5] },
  { id: '70', hex: datavizColors.seq.green[6] },
  { id: '80', hex: datavizColors.seq.green[7] },
  { id: '90', hex: datavizColors.seq.green[8] },
  { id: '100', hex: datavizColors.seq.green[9] },
];

const seqAquas = [
  { id: '10', hex: datavizColors.seq.aqua[0] },
  { id: '20', hex: datavizColors.seq.aqua[1] },
  { id: '30', hex: datavizColors.seq.aqua[2] },
  { id: '40', hex: datavizColors.seq.aqua[3] },
  { id: '50', hex: datavizColors.seq.aqua[4] },
  { id: '60', hex: datavizColors.seq.aqua[5] },
  { id: '70', hex: datavizColors.seq.aqua[6] },
  { id: '80', hex: datavizColors.seq.aqua[7] },
  { id: '90', hex: datavizColors.seq.aqua[8] },
  { id: '100', hex: datavizColors.seq.aqua[9] },
];

const seqSlates = [
  { id: '10', hex: datavizColors.seq.slate[0] },
  { id: '20', hex: datavizColors.seq.slate[1] },
  { id: '30', hex: datavizColors.seq.slate[2] },
  { id: '40', hex: datavizColors.seq.slate[3] },
  { id: '50', hex: datavizColors.seq.slate[4] },
  { id: '60', hex: datavizColors.seq.slate[5] },
  { id: '70', hex: datavizColors.seq.slate[6] },
  { id: '80', hex: datavizColors.seq.slate[7] },
  { id: '90', hex: datavizColors.seq.slate[8] },
  { id: '100', hex: datavizColors.seq.slate[9] },
];

const seqBlues = [
  { id: '10', hex: datavizColors.seq.blue[0] },
  { id: '20', hex: datavizColors.seq.blue[1] },
  { id: '30', hex: datavizColors.seq.blue[2] },
  { id: '40', hex: datavizColors.seq.blue[3] },
  { id: '50', hex: datavizColors.seq.blue[4] },
  { id: '60', hex: datavizColors.seq.blue[5] },
  { id: '70', hex: datavizColors.seq.blue[6] },
  { id: '80', hex: datavizColors.seq.blue[7] },
  { id: '90', hex: datavizColors.seq.blue[8] },
  { id: '100', hex: datavizColors.seq.blue[9] },
];

const seqPurples = [
  { id: '10', hex: datavizColors.seq.purple[0] },
  { id: '20', hex: datavizColors.seq.purple[1] },
  { id: '30', hex: datavizColors.seq.purple[2] },
  { id: '40', hex: datavizColors.seq.purple[3] },
  { id: '50', hex: datavizColors.seq.purple[4] },
  { id: '60', hex: datavizColors.seq.purple[5] },
  { id: '70', hex: datavizColors.seq.purple[6] },
  { id: '80', hex: datavizColors.seq.purple[7] },
  { id: '90', hex: datavizColors.seq.purple[8] },
  { id: '100', hex: datavizColors.seq.purple[9] },
];

const seqMagentas = [
  { id: '10', hex: datavizColors.seq.magenta[0] },
  { id: '20', hex: datavizColors.seq.magenta[1] },
  { id: '30', hex: datavizColors.seq.magenta[2] },
  { id: '40', hex: datavizColors.seq.magenta[3] },
  { id: '50', hex: datavizColors.seq.magenta[4] },
  { id: '60', hex: datavizColors.seq.magenta[5] },
  { id: '70', hex: datavizColors.seq.magenta[6] },
  { id: '80', hex: datavizColors.seq.magenta[7] },
  { id: '90', hex: datavizColors.seq.magenta[8] },
  { id: '100', hex: datavizColors.seq.magenta[9] },
];

// ============================================================
// Stories: Categorical
// ============================================================

export const CategoricalLight = {
  name: 'Categorical (light)',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => categoricalTable(catLight),
};

export const CategoricalDark = {
  name: 'Categorical (dark)',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => categoricalTable(catDark, 'dark'),
};

// ============================================================
// Stories: Groups
// ============================================================

export const GroupsLight = {
  name: 'Groups (light)',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const grid = (title, groups) => {
      const blocks = groups
        .map((group) => {
          const rows = group
            .map((c) => {
              const h = c.hex;
              const color = fg(h);
              return `
            <tr>
              <td style="background-color: ${h}; color: ${color};" class="dvp-mono">${c.property}</td>
              <td style="background-color: ${h}; color: ${color};">${c.semantic || ''}</td>
              <td style="background-color: ${h}; color: ${color};" class="dvp-right dvp-mono">${h}</td>
            </tr>`;
            })
            .join('');
          return `<table><tbody>${rows}</tbody></table>`;
        })
        .join('');
      return `
        <p style="margin: 1.5rem 0 0.5rem; font-size: 0.8rem; font-weight: 500; color: var(--hds-color-carbon-60);">${title}</p>
        <div class="dvp-groups">${blocks}</div>
      `;
    };

    return dvp(`
      ${grid('1-Color Groups', groupsLight1)}
      ${grid('2-Color Groups', groupsLight2)}
      ${grid('3-Color Groups', groupsLight3)}
      ${grid('4-Color Groups', groupsLight4)}
      ${grid('5-Color Groups', groupsLight5)}
    `);
  },
};

export const GroupsDark = {
  name: 'Groups (dark)',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => {
    const grid = (title, groups) => {
      const blocks = groups
        .map((group) => {
          const rows = group
            .map((c) => {
              const h = c.hex;
              const color = fg(h);
              return `
            <tr>
              <td style="background-color: ${h}; color: ${color};" class="dvp-mono">${c.property}</td>
              <td style="background-color: ${h}; color: ${color};">${c.semantic || ''}</td>
              <td style="background-color: ${h}; color: ${color};" class="dvp-right dvp-mono">${h}</td>
            </tr>`;
            })
            .join('');
          return `<table><tbody>${rows}</tbody></table>`;
        })
        .join('');
      return `
        <p style="margin: 1.5rem 0 0.5rem; font-size: 0.8rem; font-weight: 500; color: var(--hds-color-carbon-40);">${title}</p>
        <div class="dvp-groups">${blocks}</div>
      `;
    };

    return dvp(
      `
      ${grid('1-Color Groups', groupsDark1)}
      ${grid('2-Color Groups', groupsDark2)}
      ${grid('3-Color Groups', groupsDark3)}
      ${grid('4-Color Groups', groupsDark4)}
      ${grid('5-Color Groups', groupsDark5)}
    `,
      'dark',
    );
  },
};

// ============================================================
// Stories: Sequential
// ============================================================

export const SequentialReds = {
  name: 'Sequential: Reds',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('red', seqReds),
};

export const SequentialOranges = {
  name: 'Sequential: Oranges',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('orange', seqOranges),
};

export const SequentialYellows = {
  name: 'Sequential: Yellows',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('yellow', seqYellows),
};

export const SequentialGolds = {
  name: 'Sequential: Golds',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('gold', seqGolds),
};

export const SequentialLimes = {
  name: 'Sequential: Limes',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('lime', seqLimes),
};

export const SequentialGreens = {
  name: 'Sequential: Greens',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('green', seqGreens),
};

export const SequentialAquas = {
  name: 'Sequential: Aquas',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('aqua', seqAquas),
};

export const SequentialSlates = {
  name: 'Sequential: Slates',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('slate', seqSlates),
};

export const SequentialBlues = {
  name: 'Sequential: Blues',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('blue', seqBlues),
};

export const SequentialPurples = {
  name: 'Sequential: Purples',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('purple', seqPurples),
};

export const SequentialMagentas = {
  name: 'Sequential: Magentas',
  tags: ['!dev'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => sequentialStrip('magenta', seqMagentas),
};

// ============================================================
// Stories: All Variants (Chromatic Baseline)
// ============================================================

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev'],
  render: () => {
    const seqFamilies = [
      { name: 'Red', data: seqReds },
      { name: 'Orange', data: seqOranges },
      { name: 'Yellow', data: seqYellows },
      { name: 'Gold', data: seqGolds },
      { name: 'Lime', data: seqLimes },
      { name: 'Green', data: seqGreens },
      { name: 'Aqua', data: seqAquas },
      { name: 'Slate', data: seqSlates },
      { name: 'Blue', data: seqBlues },
      { name: 'Purple', data: seqPurples },
      { name: 'Magenta', data: seqMagentas },
    ];

    const headers = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
    const headerRow =
      '<tr><th class="dvp-left">Hue Family</th>' +
      headers.map((h) => `<th class="dvp-right">${h}</th>`).join('') +
      '</tr>';

    const seqRows = seqFamilies
      .map((fam) => {
        const cells = fam.data
          .map((c) => {
            const color = fg(c.hex);
            return `<td style="background-color: ${c.hex}; color: ${color};" class="dvp-right dvp-mono">${c.hex}</td>`;
          })
          .join('');
        return `<tr><th class="dvp-left">${fam.name}</th>${cells}</tr>`;
      })
      .join('');

    const sequentialTable = dvp(
      `<table>
        <thead>${headerRow}</thead>
        <tbody>${seqRows}</tbody>
      </table>`,
      'light',
    );

    return `<div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--hds-color-carbon-05); font-family: var(--hds-font-family-sans, sans-serif);">
      <div>
        <h2 style="margin: 0 0 1rem 1.5rem; font-size: 1.5rem; color: var(--hds-color-carbon-100);">Sequential Palettes</h2>
        ${sequentialTable}
      </div>
      <div>
        <h2 style="margin: 0 0 1rem 1.5rem; font-size: 1.5rem; color: var(--hds-color-carbon-100);">Categorical (Light)</h2>
        ${categoricalTable(catLight, 'light')}
      </div>
      <div>
        <h2 style="margin: 0 0 1rem 1.5rem; font-size: 1.5rem; color: var(--hds-color-carbon-100);">Categorical (Dark)</h2>
        ${categoricalTable(catDark, 'dark')}
      </div>
    </div>`;
  },
};
