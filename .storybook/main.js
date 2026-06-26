import remarkGfm from 'remark-gfm';

const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-a11y',
    'storybook-addon-pseudo-states',
    '@chromatic-com/storybook',
    {
      name: 'storybook-design-token',
      options: { designTokenGlob: 'src/scss/base/_custom-properties.scss' },
    },
  ],
  features: {
    disableSaveFromUI: true,
  },
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: ['../dist', '../stories/assets'],
  viteFinal: async (config) => {
    config.server = config.server || {};
    config.server.watch = config.server.watch || {};
    config.server.watch.usePolling = true;
    config.server.watch.interval = 1000;
    return config;
  },
};

export default config;
