import { resolve } from 'node:path';

import postcss from 'postcss';
import { compile } from 'sass';
import { expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..', '..', '..');
const selector = '.usa-link--external::after';

it('keeps the external-link arrow perceivable in forced-colors mode', () => {
  const { css } = compile(resolve(root, 'src/scss/hds.scss'), {
    loadPaths: [resolve(root, 'node_modules/@uswds/uswds/packages'), resolve(root, 'src/scss')],
    quietDeps: true,
  });
  const stylesheet = postcss.parse(css);
  let arrowColor;
  let adjust;

  stylesheet.walkAtRules('media', (media) => {
    if (media.params !== '(forced-colors: active)') return;
    media.walkRules(selector, (rule) => {
      rule.walkDecls('background-color', (decl) => {
        arrowColor = decl.value;
      });
      rule.walkDecls('forced-color-adjust', (decl) => {
        adjust = decl.value;
      });
    });
  });

  // forced-color-adjust: none is required here — forced-colors drops
  // mask-image painting outright, so the color alone isn't enough.
  expect(adjust).toBe('none');
  expect(arrowColor).toBe('CanvasText');
}, 15_000);
