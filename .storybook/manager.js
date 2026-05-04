import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',

    // Typography
    fontBase: '"Public Sans", sans-serif',
    fontCode: '"DM Mono", monospace',

    // Brand
    brandTitle: 'NASA HDS Core',
    brandUrl: 'https://github.com/nasa/hds-core',

    // Colors
    colorPrimary: '#F64137', // NASA Red
    colorSecondary: '#1C67E3', // NASA Blue - changes active tabs and sidebar icons

    // UI
    appBg: '#F6F6F6', // Carbon 05
    appContentBg: '#FFFFFF', // Spacesuit White
    appBorderColor: '#D1D1D1', // Carbon 20
    appBorderRadius: 4,

    // Text colors
    textColor: '#17171B', // Carbon 90
    textInverseColor: '#FFFFFF',

    // Toolbar default and active colors
    barTextColor: '#58585B', // Carbon 60
    barSelectedColor: '#1C67E3', // NASA Blue
    barBg: '#FFFFFF',

    // Form colors
    inputBg: '#FFFFFF',
    inputBorder: '#959599', // Carbon 40
    inputTextColor: '#17171B',
    inputBorderRadius: 4,
  }),
});
