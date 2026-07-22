import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

// -------------------------------------------------------
// Name transform: drop 'default' as the last path segment.
// border.radius.default → hds-border-radius (not hds-border-radius-default)
// Runs after name/kebab so token.name is already set with prefix.
// -------------------------------------------------------
StyleDictionary.registerTransform({
  name: 'name/hds/drop-default',
  type: 'name',
  filter: (token) => token.path[token.path.length - 1] === 'default',
  transform: (token) => token.name.replace(/-default$/, ''),
});

// -------------------------------------------------------
// Letter-spacing value transform: normalize '0em' → '0' (unitless).
// CSS accepts both, but unitless is canonical for zero values.
// All other values pass through unchanged (e.g. '-0.07em' stays '-0.07em').
// -------------------------------------------------------
StyleDictionary.registerTransform({
  name: 'value/hds/ls-normalize-zero',
  type: 'value',
  filter: (token) => token.path[0] === 'letter-spacing',
  transform: (token) => {
    const v = token.$value ?? token.value;
    return v === '0em' ? '0' : v;
  },
});

// -------------------------------------------------------
// Design-token annotations for the storybook-design-token addon.
// Each domain group is preceded by a loud comment the addon parses
// (@tokens <label> / @presenter <Presenter>) to render searchable,
// typed token previews in Storybook. Presenter names must match the
// addon's enum. These comments live in the Sass source only — they are
// stripped from the minified CSS, so the public contract is unchanged.
// -------------------------------------------------------
const tokenCategory = (token) => {
  const [domain, sub] = token.path;
  switch (domain) {
    case 'color':
      return { label: 'Colors', presenter: 'Color' };
    case 'border':
      return sub === 'radius'
        ? { label: 'Border Radius', presenter: 'BorderRadius' }
        : { label: 'Border Widths', presenter: 'Border' };
    case 'focus':
      return { label: 'Focus', presenter: 'Border' };
    case 'layout':
      return { label: 'Layout', presenter: 'Spacing' };
    case 'spacing':
      return { label: 'Spacing', presenter: 'Spacing' };
    case 'line-height':
      return { label: 'Line Heights', presenter: 'LineHeight' };
    case 'letter-spacing':
      return { label: 'Letter Spacing', presenter: 'LetterSpacing' };
    case 'font-weight':
      return { label: 'Font Weights', presenter: 'FontWeight' };
    case 'font-size':
      return { label: 'Font Sizes', presenter: 'FontSize' };
    case 'font-family':
      return { label: 'Font Families', presenter: 'FontFamily' };
    default:
      return { label: domain, presenter: null };
  }
};

// -------------------------------------------------------
// CSS format: @layer hds-base { :root { … } }
// Matches the cascade layer in hds.min.css. Emits a design-token
// annotation block before each domain group (see tokenCategory).
// -------------------------------------------------------
StyleDictionary.registerFormat({
  name: 'hds/css/custom-properties',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const lines = [];
    let currentLabel = null;
    for (const token of dictionary.allTokens) {
      const { label, presenter } = tokenCategory(token);
      if (label !== currentLabel) {
        if (lines.length) lines.push('');
        lines.push('    /**');
        lines.push(`     * @tokens ${label}`);
        if (presenter) lines.push(`     * @presenter ${presenter}`);
        lines.push('     */');
        currentLabel = label;
      }
      const value = token.$value ?? token.value;
      // Append the token's description as an inline comment. The addon reads
      // a same-line trailing comment as the token's description; sourcing it
      // from tokens.json keeps usage guidance in one place. Stripped from the
      // minified CSS, so the public contract is unaffected.
      const rawDesc = token.$description ?? token.description ?? '';
      const desc = rawDesc.replace(/\s+/g, ' ').replace(/\*\//g, '* /').trim();
      lines.push(`    --${token.name}: ${value};` + (desc ? ` /* ${desc} */` : ''));
    }
    return `${header}@layer hds-base {\n  :root {\n${lines.join('\n')}\n  }\n}\n`;
  },
});

// -------------------------------------------------------
// Shared transform list for both platforms.
// Omits size/rem intentionally; HDS dimension values are px, not rem.
// Omitting size/rem keeps 1px as 1px (not 0.0625rem).
// -------------------------------------------------------
const hdsTransforms = [
  'attribute/cti',
  'name/kebab',
  'name/hds/drop-default',
  'color/css',
  'value/hds/ls-normalize-zero',
];

StyleDictionary.registerTransformGroup({
  name: 'hds/scss',
  transforms: hdsTransforms,
});

StyleDictionary.registerTransformGroup({
  name: 'hds/css',
  transforms: hdsTransforms,
});

export default {
  source: ['tokens.json'],
  platforms: {
    scss: {
      transformGroup: 'hds/scss',
      prefix: 'hds',
      buildPath: 'src/scss/',
      files: [
        {
          destination: '_hds-tokens.scss',
          format: 'scss/variables',
          filter: (token) => {
            // Exclude dataviz and typography composites (source of truth only)
            return token.path[0] !== 'dataviz' && token.$type !== 'typography';
          },
        },
      ],
    },
    css: {
      transformGroup: 'hds/css',
      prefix: 'hds',
      buildPath: 'src/scss/base/',
      files: [
        {
          destination: '_custom-properties.scss',
          format: 'hds/css/custom-properties',
          filter: (token) => {
            const domain = token.path[0];
            // Exclude dataviz, breakpoint (Sass-only), and typography composites
            return domain !== 'dataviz' && domain !== 'breakpoint' && token.$type !== 'typography';
          },
        },
      ],
    },
  },
};
