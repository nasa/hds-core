import { beforeAll, describe, expect, it } from 'vitest';
import { resolve } from 'node:path';
import { compile } from 'sass';
import postcss from 'postcss';

let rules;
beforeAll(() => {
  const { css } = compile(resolve('src/scss/hds.scss'), {
    loadPaths: [resolve('node_modules/@uswds/uswds/packages'), resolve('src/scss')],
    quietDeps: true,
    logger: { warn() {}, debug() {} },
  });
  rules = [];
  postcss.parse(css).walkAtRules('media', (media) => {
    if (media.params === '(forced-colors: active)') {
      media.walkRules((rule) => rules.push(rule));
    }
  });
}, 30000);

function declarations(selector) {
  const values = {};
  for (const rule of rules) {
    if (rule.selectors.some((entry) => entry.replace(/["\']/g, '') === selector.replace(/["\']/g, ''))) {
      rule.walkDecls((decl) => {
        values[decl.prop] = { value: decl.value, important: Boolean(decl.important) };
      });
    }
  }
  return values;
}

const button = '.usa-table th[data-sortable] .usa-table__header__button';

describe('table sorting in forced colors', () => {
  it('removes the button mask so the existing focus outline is not clipped', () => {
    expect(declarations(button)['mask-image']).toEqual({ value: 'none', important: true });
    expect(declarations(button).outline).toBeUndefined();
    expect(declarations(button).position?.value).toBe('absolute');
  });

  it('removes the icon background across sorted, hovered and dark-palette states', () => {
    expect(declarations(button)['background-color']).toEqual({ value: 'transparent', important: true });
  });

  it('reveals the existing USWDS SVG fallback', () => {
    expect(declarations(`${button} .usa-icon`).display?.value).toBe('inline-block');
  });

  it.each([
    [':not([aria-sort])', 'unsorted'],
    ['[aria-sort="none"]', 'unsorted'],
    ['[aria-sort="ascending"]', 'ascending'],
    ['[aria-sort="descending"]', 'descending'],
  ])('paints the active %s glyph with a system color', (state, glyph) => {
    const selector = `.usa-table th[data-sortable]${state} .usa-table__header__button .usa-icon > g.${glyph}`;
    expect(declarations(selector).fill?.value.toLowerCase()).toBe('buttontext');
  });
});
