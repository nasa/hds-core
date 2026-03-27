import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'HDS Core',
    brandUrl: 'https://github.com/nasa/hds-core',
  }),
});
