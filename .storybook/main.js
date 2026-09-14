import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';

import { STATUS_TAGS } from './componentStatus.js';

const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm, remarkAlert],
          },
        },
      },
    },
    '@storybook/addon-a11y',
    'storybook-addon-pseudo-states',
    '@chromatic-com/storybook',
    {
      // Searchable, typed token previews sourced from the generated
      // custom properties (annotations emitted by .config/sd.config.js).
      name: 'storybook-design-token',
      options: { designTokenGlob: 'src/scss/base/_custom-properties.scss' },
    },
  ],
  features: {
    disableSaveFromUI: true,
  },
  // Registering the statuses surfaces them in the sidebar's tag
  // filter. Options are explicit so stories keep appearing in the
  // sidebar and in each Guidance page's Stories block.
  tags: Object.fromEntries(
    STATUS_TAGS.map((tag) => [tag, { excludeFromSidebar: false, excludeFromDocsStories: false }]),
  ),
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
