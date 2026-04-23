// ============================================================
// Data Visualization Palettes
//
// Reference-only stories for documenting data viz color palettes.
// Embedded in DataVisualizationPalettes.mdx via <Canvas sourceState="none" />.
//
// Consumers use:
//   CSS/JS:  var(--hds-dataviz-cat-1) through var(--hds-dataviz-cat-12)
//   JS libs: Copy hex values from the Palettes docs page
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

const uswds = {
  // Blues (vivid)
  'blue-5v': '#e8f5ff',
  'blue-10v': '#cfe8ff',
  'blue-20v': '#a1d3ff',
  'blue-30v': '#58b4ff',
  'blue-40v': '#2491ff',
  'blue-50v': '#0076d6',
  'blue-60v': '#005ea2',
  'blue-70v': '#0b4778',
  'blue-80v': '#112f4e',
  // Blue cools (non-vivid)
  'blue-cool-5': '#e7f2f5',
  'blue-cool-10': '#dae9ee',
  'blue-cool-20': '#adcfdc',
  'blue-cool-30': '#82b4c9',
  'blue-cool-40': '#6499af',
  'blue-cool-50': '#3a7d95',
  'blue-cool-60': '#2e6276',
  'blue-cool-70': '#224a58',
  'blue-cool-80': '#14333d',
  // Reds (vivid)
  'red-5v': '#fff3f2',
  'red-10v': '#fde0db',
  'red-20v': '#fdb8ae',
  'red-30v': '#ff8d7b',
  'red-40v': '#fb5a47',
  'red-50v': '#e52207',
  'red-60v': '#b50909',
  'red-70v': '#8b0a03',
  'red-80v': '#5c1111',
  // Oranges (vivid)
  'orange-5v': '#fef2e4',
  'orange-10v': '#fce2c5',
  'orange-20v': '#ffbc78',
  'orange-30v': '#fa9441',
  'orange-40v': '#e66f0e',
  'orange-50v': '#c05600',
  'orange-60v': '#8c471c',
  'orange-70v': '#5f3617',
  'orange-80v': '#352313',
  // Golds (vivid)
  'gold-5v': '#fef0c8',
  'gold-10v': '#ffe396',
  'gold-20v': '#ffbe2e',
  'gold-30v': '#e5a000',
  'gold-40v': '#c2850c',
  'gold-50v': '#936f38',
  'gold-60v': '#7a591a',
  'gold-70v': '#5c410a',
  'gold-80v': '#3b2b15',
  // Golds (non-vivid)
  'gold-5': '#f5f0e6',
  'gold-10': '#f1e5cd',
  'gold-20': '#dec69a',
  'gold-30': '#c7a97b',
  'gold-40': '#ad8b65',
  'gold-50': '#8e704f',
  'gold-60': '#6b5947',
  'gold-70': '#4d4438',
  'gold-80': '#322d26',
  'gold-90': '#191714',
  // Greens (vivid)
  'green-5v': '#ddf9c7',
  'green-10v': '#c5ee93',
  'green-20v': '#98d035',
  'green-30v': '#7fb135',
  'green-40v': '#719f2a',
  'green-50v': '#538200',
  'green-60v': '#466c04',
  'green-70v': '#2f4a0b',
  'green-80v': '#243413',
  // Mints (vivid)
  'mint-5v': '#c9fbeb',
  'mint-10v': '#83fcd4',
  'mint-20v': '#0ceda6',
  'mint-30v': '#04c585',
  'mint-40v': '#00a871',
  'mint-50v': '#008659',
  'mint-60v': '#146947',
  'mint-70v': '#0c4e29',
  'mint-80v': '#0d351e',
  // Mint cools (vivid)
  'mint-cool-5v': '#d5fbf3',
  'mint-cool-10v': '#7efbe1',
  'mint-cool-20v': '#29e1cb',
  'mint-cool-30v': '#1dc2ae',
  'mint-cool-40v': '#00a398',
  'mint-cool-50v': '#008480',
  'mint-cool-60v': '#0f6460',
  'mint-cool-70v': '#0b4b3f',
  'mint-cool-80v': '#123131',
  // Indigo warms (vivid)
  'indigo-warm-5v': '#f5f2ff',
  'indigo-warm-10v': '#e4deff',
  'indigo-warm-20v': '#cfc4fd',
  'indigo-warm-30v': '#b69fff',
  'indigo-warm-40v': '#967efb',
  'indigo-warm-50v': '#745fe9',
  'indigo-warm-60v': '#5942d2',
  'indigo-warm-70v': '#3d2c9d',
  'indigo-warm-80v': '#261f5b',
  // Violet warms (vivid)
  'violet-warm-5v': '#fef2ff',
  'violet-warm-10v': '#fbdcff',
  'violet-warm-20v': '#f4b2ff',
  'violet-warm-30v': '#ee83ff',
  'violet-warm-40v': '#d85bef',
  'violet-warm-50v': '#be32d0',
  'violet-warm-60v': '#93348c',
  'violet-warm-70v': '#711e6c',
  'violet-warm-80v': '#481441',
};

const hex = (token) => {
  const val = uswds[token];
  if (!val) console.warn(`Unknown USWDS token: "${token}"`);
  return val || '#FF00FF';
};

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
      const h = hex(c.token);
      const color = fg(h);
      return `
      <tr>
        <td style="background-color: ${h}; color: ${color};">${c.id}</td>
        <td style="background-color: ${h}; color: ${color};" class="dvp-mono">${c.property}</td>
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

const sequentialStrip = (colors, background = 'transparent') => {
  const swatches = colors.map((c) => `<div style="background-color: ${hex(c.token)};"></div>`).join('');

  const labels = colors
    .map(
      (c) => `
    <div>
      <div>${c.id}</div>
      <div>${hex(c.token)}</div>
    </div>
  `,
    )
    .join('');

  return dvp(
    `
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
          const h = hex(c.token);
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
  { id: '01', property: '--hds-dataviz-cat-1', token: 'blue-70v' },
  { id: '02', property: '--hds-dataviz-cat-2', token: 'red-40v' },
  { id: '03', property: '--hds-dataviz-cat-3', token: 'orange-30v' },
  { id: '04', property: '--hds-dataviz-cat-4', token: 'blue-cool-60' },
  { id: '05', property: '--hds-dataviz-cat-5', token: 'gold-40' },
  { id: '06', property: '--hds-dataviz-cat-6', token: 'blue-40v' },
  { id: '07', property: '--hds-dataviz-cat-7', token: 'red-70v' },
  { id: '08', property: '--hds-dataviz-cat-8', token: 'blue-cool-30' },
  { id: '09', property: '--hds-dataviz-cat-9', token: 'indigo-warm-70v' },
  { id: '10', property: '--hds-dataviz-cat-10', token: 'gold-30v' },
  { id: '11', property: '--hds-dataviz-cat-11', token: 'green-60v' },
  { id: '12', property: '--hds-dataviz-cat-12', token: 'mint-cool-30v' },
];

const catDark = [
  { id: '01', property: '--hds-dataviz-cat-1', token: 'blue-50v' },
  { id: '02', property: '--hds-dataviz-cat-2', token: 'red-40v' },
  { id: '03', property: '--hds-dataviz-cat-3', token: 'orange-20v' },
  { id: '04', property: '--hds-dataviz-cat-4', token: 'blue-cool-50' },
  { id: '05', property: '--hds-dataviz-cat-5', token: 'gold-20' },
  { id: '06', property: '--hds-dataviz-cat-6', token: 'blue-30v' },
  { id: '07', property: '--hds-dataviz-cat-7', token: 'red-20v' },
  { id: '08', property: '--hds-dataviz-cat-8', token: 'blue-cool-30' },
  { id: '09', property: '--hds-dataviz-cat-9', token: 'indigo-warm-50v' },
  { id: '10', property: '--hds-dataviz-cat-10', token: 'gold-20v' },
  { id: '11', property: '--hds-dataviz-cat-11', token: 'green-50v' },
  { id: '12', property: '--hds-dataviz-cat-12', token: 'mint-cool-30v' },
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
  { id: '10', token: 'red-5v' },
  { id: '20', token: 'red-10v' },
  { id: '30', token: 'red-20v' },
  { id: '40', token: 'red-30v' },
  { id: '50', token: 'red-40v' },
  { id: '60', token: 'red-50v' },
  { id: '70', token: 'red-60v' },
  { id: '80', token: 'red-70v' },
  { id: '90', token: 'red-80v' },
];

const seqOranges = [
  { id: '10', token: 'orange-5v' },
  { id: '20', token: 'orange-10v' },
  { id: '30', token: 'orange-20v' },
  { id: '40', token: 'orange-30v' },
  { id: '50', token: 'orange-40v' },
  { id: '60', token: 'orange-50v' },
  { id: '70', token: 'orange-60v' },
  { id: '80', token: 'orange-70v' },
  { id: '90', token: 'orange-80v' },
];

const seqYellows = [
  { id: '10', token: 'gold-5v' },
  { id: '20', token: 'gold-10v' },
  { id: '30', token: 'gold-20v' },
  { id: '40', token: 'gold-30v' },
  { id: '50', token: 'gold-40v' },
  { id: '60', token: 'gold-50v' },
  { id: '70', token: 'gold-60v' },
  { id: '80', token: 'gold-70v' },
  { id: '90', token: 'gold-80v' },
];

const seqGolds = [
  { id: '10', token: 'gold-10' },
  { id: '20', token: 'gold-20' },
  { id: '30', token: 'gold-30' },
  { id: '40', token: 'gold-40' },
  { id: '50', token: 'gold-50' },
  { id: '60', token: 'gold-60' },
  { id: '70', token: 'gold-70' },
  { id: '80', token: 'gold-80' },
  { id: '90', token: 'gold-90' },
];

const seqLimes = [
  { id: '10', token: 'green-5v' },
  { id: '20', token: 'green-10v' },
  { id: '30', token: 'green-20v' },
  { id: '40', token: 'green-30v' },
  { id: '50', token: 'green-40v' },
  { id: '60', token: 'green-50v' },
  { id: '70', token: 'green-60v' },
  { id: '80', token: 'green-70v' },
  { id: '90', token: 'green-80v' },
];

const seqGreens = [
  { id: '10', token: 'mint-5v' },
  { id: '20', token: 'mint-10v' },
  { id: '30', token: 'mint-20v' },
  { id: '40', token: 'mint-30v' },
  { id: '50', token: 'mint-40v' },
  { id: '60', token: 'mint-50v' },
  { id: '70', token: 'mint-60v' },
  { id: '80', token: 'mint-70v' },
  { id: '90', token: 'mint-80v' },
];

const seqAquas = [
  { id: '10', token: 'mint-cool-5v' },
  { id: '20', token: 'mint-cool-10v' },
  { id: '30', token: 'mint-cool-20v' },
  { id: '40', token: 'mint-cool-30v' },
  { id: '50', token: 'mint-cool-40v' },
  { id: '60', token: 'mint-cool-50v' },
  { id: '70', token: 'mint-cool-60v' },
  { id: '80', token: 'mint-cool-70v' },
  { id: '90', token: 'mint-cool-80v' },
];

const seqSlates = [
  { id: '10', token: 'blue-cool-5' },
  { id: '20', token: 'blue-cool-10' },
  { id: '30', token: 'blue-cool-20' },
  { id: '40', token: 'blue-cool-30' },
  { id: '50', token: 'blue-cool-40' },
  { id: '60', token: 'blue-cool-50' },
  { id: '70', token: 'blue-cool-60' },
  { id: '80', token: 'blue-cool-70' },
  { id: '90', token: 'blue-cool-80' },
];

const seqBlues = [
  { id: '10', token: 'blue-5v' },
  { id: '20', token: 'blue-10v' },
  { id: '30', token: 'blue-20v' },
  { id: '40', token: 'blue-30v' },
  { id: '50', token: 'blue-40v' },
  { id: '60', token: 'blue-50v' },
  { id: '70', token: 'blue-60v' },
  { id: '80', token: 'blue-70v' },
  { id: '90', token: 'blue-80v' },
];

const seqPurples = [
  { id: '10', token: 'indigo-warm-5v' },
  { id: '20', token: 'indigo-warm-10v' },
  { id: '30', token: 'indigo-warm-20v' },
  { id: '40', token: 'indigo-warm-30v' },
  { id: '50', token: 'indigo-warm-40v' },
  { id: '60', token: 'indigo-warm-50v' },
  { id: '70', token: 'indigo-warm-60v' },
  { id: '80', token: 'indigo-warm-70v' },
  { id: '90', token: 'indigo-warm-80v' },
];

const seqMagentas = [
  { id: '10', token: 'violet-warm-5v' },
  { id: '20', token: 'violet-warm-10v' },
  { id: '30', token: 'violet-warm-20v' },
  { id: '40', token: 'violet-warm-30v' },
  { id: '50', token: 'violet-warm-40v' },
  { id: '60', token: 'violet-warm-50v' },
  { id: '70', token: 'violet-warm-60v' },
  { id: '80', token: 'violet-warm-70v' },
  { id: '90', token: 'violet-warm-80v' },
];

// ============================================================
// Stories: Categorical
// ============================================================

export const CategoricalLight = {
  name: 'Categorical (light)',
  tags: ['!dev'],
  render: () => categoricalTable(catLight),
};

export const CategoricalDark = {
  name: 'Categorical (dark)',
  tags: ['!dev'],
  render: () => categoricalTable(catDark, 'dark'),
};

// ============================================================
// Stories: Groups
// ============================================================

export const GroupsLight = {
  name: 'Groups (light)',
  tags: ['!dev'],
  render: () => {
    const grid = (title, groups) => {
      const blocks = groups
        .map((group) => {
          const rows = group
            .map((c) => {
              const h = hex(c.token);
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
  render: () => {
    const grid = (title, groups) => {
      const blocks = groups
        .map((group) => {
          const rows = group
            .map((c) => {
              const h = hex(c.token);
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
  render: () => sequentialStrip(seqReds),
};

export const SequentialOranges = {
  name: 'Sequential: Oranges',
  tags: ['!dev'],
  render: () => sequentialStrip(seqOranges),
};

export const SequentialYellows = {
  name: 'Sequential: Yellows',
  tags: ['!dev'],
  render: () => sequentialStrip(seqYellows),
};

export const SequentialGolds = {
  name: 'Sequential: Golds',
  tags: ['!dev'],
  render: () => sequentialStrip(seqGolds),
};

export const SequentialLimes = {
  name: 'Sequential: Limes',
  tags: ['!dev'],
  render: () => sequentialStrip(seqLimes),
};

export const SequentialGreens = {
  name: 'Sequential: Greens',
  tags: ['!dev'],
  render: () => sequentialStrip(seqGreens),
};

export const SequentialAquas = {
  name: 'Sequential: Aquas',
  tags: ['!dev'],
  render: () => sequentialStrip(seqAquas),
};

export const SequentialSlates = {
  name: 'Sequential: Slates',
  tags: ['!dev'],
  render: () => sequentialStrip(seqSlates),
};

export const SequentialBlues = {
  name: 'Sequential: Blues',
  tags: ['!dev'],
  render: () => sequentialStrip(seqBlues),
};

export const SequentialPurples = {
  name: 'Sequential: Purples',
  tags: ['!dev'],
  render: () => sequentialStrip(seqPurples),
};

export const SequentialMagentas = {
  name: 'Sequential: Magentas',
  tags: ['!dev'],
  render: () => sequentialStrip(seqMagentas),
};
