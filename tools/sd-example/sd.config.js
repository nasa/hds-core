import StyleDictionary from 'style-dictionary';

export default {
  source: ['../../tokens.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      prefix: 'hds',
      buildPath: 'output/',
      files: [
        {
          destination: 'hds-tokens.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] !== 'dataviz',
        },
        {
          destination: 'hds-dataviz-tokens.scss',
          format: 'scss/variables',
          filter: (token) => token.path[0] === 'dataviz',
        },
      ],
    },
  },
};
