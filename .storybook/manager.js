// React isn't a declared dependency; HDS Core ships no React. It
// resolves because @storybook/addon-docs depends on it and the
// manager builder provides it to manager entries. If that ever
// stops holding, add react to devDependencies.
import React from 'react';
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

import { COMPONENT_STATUSES, findStatusTag } from './componentStatus.js';

// --- Component status markers --------------------------------
// Marks a component's status:* tag in the sidebar. Only non-default
// statuses carry a marker (see the `sidebar` field in
// componentStatus.js); stable shows nothing. The full label and
// description render on the Guidance page via helpers/StatusBadge.jsx.

// Stories carry the tag, but the manager synthesises the parent
// node and doesn't copy tags onto it. A component with a Guidance
// page becomes a 'group' (three title segments), without one a
// 'component'. Walk down to the first descendant carrying a tag.
const findNodeStatusTag = (item, api) => {
  const direct = findStatusTag(item.tags);
  if (direct) return direct;

  const queue = [...(item.children || [])];
  let guard = 0;
  while (queue.length && guard < 200) {
    guard += 1;
    const child = api.getData(queue.shift());
    if (!child) continue;
    const tag = findStatusTag(child.tags);
    if (tag) return tag;
    if (child.children) queue.push(...child.children);
  }
  return null;
};

const renderLabel = (item, api) => {
  if (item.type !== 'component' && item.type !== 'group') return item.name;
  const tag = findNodeStatusTag(item, api);
  if (!tag) return item.name;
  const { sidebar, label } = COMPONENT_STATUSES[tag];
  if (!sidebar) return item.name; // stable: no sidebar marker
  return React.createElement(
    'span',
    { style: { alignItems: 'center', display: 'inline-flex', gap: '4px' } },
    item.name,
    React.createElement('span', { 'aria-label': label, title: label, role: 'img' }, sidebar),
  );
};

addons.setConfig({
  sidebar: { renderLabel },
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
