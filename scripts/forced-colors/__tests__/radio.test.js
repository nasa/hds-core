import { resolve } from 'node:path';

import postcss from 'postcss';
import { compile } from 'sass';
import { expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..', '..', '..');
const selector = '.usa-radio__input:checked + .usa-radio__label::before';

it('keeps the selected radio perceivable in forced-colors mode', () => {
  const { css } = compile(resolve(root, 'src/scss/hds.scss'), {
    loadPaths: [resolve(root, 'node_modules/@uswds/uswds/packages'), resolve(root, 'src/scss')],
    quietDeps: true,
  });
  const stylesheet = postcss.parse(css);
  let selectedColor;

  stylesheet.walkAtRules('media', (media) => {
    if (media.params !== '(forced-colors: active)') return;
    media.walkRules(selector, (rule) => {
      rule.walkDecls('background-color', (decl) => {
        selectedColor = decl.value;
      });
    });
  });

  expect(selectedColor).toBe('SelectedItem');
}, 15_000);
