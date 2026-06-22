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
// CSS format: @layer hds-base { :root { … } }
// Matches the cascade layer in hds.min.css.
// -------------------------------------------------------
StyleDictionary.registerFormat({
  name: 'hds/css/custom-properties',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const lines = dictionary.allTokens.map((token) => `    --${token.name}: ${token.$value ?? token.value};`);
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
            // Exclude dataviz and breakpoint (Sass-only)
            return domain !== 'dataviz' && domain !== 'breakpoint';
          },
        },
      ],
    },
  },
};
