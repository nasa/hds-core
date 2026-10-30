// Forced-colors regression test for icons and state indicators (#229).
//
// Forced-colors mode (Windows High Contrast) repaints every author
// background-color that is not a system color as Canvas, the page color.
// An icon drawn with mask-image + background-color then paints Canvas on
// Canvas and disappears; so does a state fill or a marker bar. Box-shadow
// is dropped, so anything drawn with it needs an outline instead.
//
// Each case renders component markup against the compiled Sass in
// Chromium with forced colors emulated, on a light and a dark system
// palette, and checks the computed result: the indicator still paints in
// something other than Canvas, or the control still draws an outline.

import { resolve } from 'node:path';

import { chromium } from 'playwright';
import { compile } from 'sass';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '..', '..', '..');

const checkbox = (attrs) =>
  `<div class="usa-checkbox"><input class="usa-checkbox__input" id="cb" type="checkbox" ${attrs}><label class="usa-checkbox__label" for="cb">Artemis</label></div>`;

const siteAlert = (variant) =>
  `<section class="usa-site-alert usa-site-alert--${variant}" aria-label="Site alert"><div class="usa-alert"><div class="usa-alert__body"><p class="usa-alert__text">Scheduled site maintenance</p></div></div></section>`;

const accordion = `<div class="usa-accordion"><h4 class="usa-accordion__heading"><button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="acc">What is HDS?</button></h4><div id="acc" class="usa-accordion__content" hidden><p>Answer</p></div></div>`;

// `paint`: the pseudo-element renders and its background is not Canvas.
// `outline`: the element draws a visible outline. `focus` tabs to the
// first focusable element first, so :focus-visible applies.
const CASES = [
  { name: 'accordion chevron', html: accordion, target: '.usa-accordion__button', pseudo: '::after', check: 'paint' },
  {
    name: 'accordion chevron, focused',
    html: accordion,
    target: '.usa-accordion__button',
    pseudo: '::after',
    check: 'paint',
    focus: true,
  },
  {
    name: 'emergency site alert icon',
    html: siteAlert('emergency'),
    target: '.usa-alert__body',
    pseudo: '::before',
    check: 'paint',
  },
  {
    name: 'info site alert icon',
    html: siteAlert('info'),
    target: '.usa-alert__body',
    pseudo: '::before',
    check: 'paint',
  },
  {
    name: 'error message icon',
    html: '<span class="usa-error-message">Select at least one mission</span>',
    target: '.usa-error-message',
    pseudo: '::before',
    check: 'paint',
  },
  {
    name: 'checked checkbox',
    html: checkbox('checked'),
    target: '.usa-checkbox__label',
    pseudo: '::before',
    check: 'paint',
  },
  {
    name: 'disabled checked checkbox',
    html: checkbox('checked disabled'),
    target: '.usa-checkbox__label',
    pseudo: '::before',
    check: 'paint',
  },
  {
    name: 'checkbox box, focused',
    html: checkbox(''),
    target: '.usa-checkbox__label',
    pseudo: '::before',
    check: 'outline',
    focus: true,
  },
  {
    name: 'radio circle, focused',
    html: '<div class="usa-radio"><input class="usa-radio__input" id="rb" type="radio" name="rb"><label class="usa-radio__label" for="rb">Crewed</label></div>',
    target: '.usa-radio__label',
    pseudo: '::before',
    check: 'outline',
    focus: true,
  },
  {
    name: 'text input, focused',
    html: '<label class="usa-label" for="ti">Mission name</label><input class="usa-input" id="ti" type="text">',
    target: '.usa-input',
    check: 'outline',
    focus: true,
  },
  {
    name: 'select, focused',
    html: '<label class="usa-label" for="se">Topic</label><select class="usa-select" id="se"><option>Moon</option></select>',
    target: '.usa-select',
    check: 'outline',
    focus: true,
  },
  {
    name: 'side navigation current-page bar',
    html: '<nav aria-label="Side navigation"><ul class="usa-sidenav"><li class="usa-sidenav__item"><a href="#moon" class="usa-current">Moon</a></li><li class="usa-sidenav__item"><a href="#mars">Mars</a></li></ul></nav>',
    target: '.usa-current',
    pseudo: '::after',
    check: 'paint',
  },
  {
    name: 'in-page navigation current-section bar',
    html: '<nav class="usa-in-page-nav" aria-label="On this page"><ul class="usa-in-page-nav__list"><li class="usa-in-page-nav__item"><a href="#overview" class="usa-in-page-nav__link usa-current">Overview</a></li></ul></nav>',
    target: '.usa-current',
    pseudo: '::after',
    check: 'paint',
  },
];

let css;
let browser;

beforeAll(async () => {
  css = compile(resolve(root, 'src/scss/hds.scss'), {
    loadPaths: [resolve(root, 'node_modules/@uswds/uswds/packages'), resolve(root, 'src/scss')],
    quietDeps: true,
  }).css;
  browser = await chromium.launch();
}, 60_000);

afterAll(async () => {
  await browser?.close();
});

describe.each(['light', 'dark'])('forced colors, %s system palette', (colorScheme) => {
  let context;
  let page;

  beforeAll(async () => {
    context = await browser.newContext({ forcedColors: 'active', colorScheme });
    page = await context.newPage();
  });

  afterAll(async () => {
    await context?.close();
  });

  it.each(CASES)('$name stays visible', async ({ html, target, pseudo = null, check, focus }) => {
    // Inline <style>: a file:// stylesheet would be blocked on about:blank.
    await page.setContent(`<style>${css}</style><main>${html}</main>`);
    if (focus) await page.keyboard.press('Tab');

    const result = await page.$eval(
      target,
      (el, pseudoElt) => {
        const probe = document.body.appendChild(document.createElement('div'));
        probe.style.backgroundColor = 'Canvas';
        const canvas = getComputedStyle(probe).backgroundColor;
        probe.remove();

        const style = getComputedStyle(el, pseudoElt);
        return {
          forcedColors: matchMedia('(forced-colors: active)').matches,
          hdsLoaded: getComputedStyle(document.documentElement).getPropertyValue('--hds-color-nasa-blue') !== '',
          canvas,
          display: style.display,
          content: style.content,
          backgroundColor: style.backgroundColor,
          outlineStyle: style.outlineStyle,
          outlineWidth: parseFloat(style.outlineWidth),
          outlineColor: style.outlineColor,
        };
      },
      pseudo,
    );

    // Positive controls: the media query really matched, and the HDS
    // stylesheet applied (a UA focus outline would otherwise pass).
    expect(result.forcedColors).toBe(true);
    expect(result.hdsLoaded).toBe(true);

    if (check === 'paint') {
      expect(result.display).not.toBe('none');
      if (pseudo) expect(result.content).not.toBe('none');
      expect(alpha(result.backgroundColor)).toBeGreaterThan(0);
      expect(rgb(result.backgroundColor)).not.toBe(rgb(result.canvas));
    } else {
      expect(result.outlineStyle).not.toBe('none');
      expect(result.outlineWidth).toBeGreaterThanOrEqual(1);
      expect(alpha(result.outlineColor)).toBeGreaterThan(0);
    }
  });
});

function channels(color) {
  return color.match(/[\d.]+/g).map(Number);
}

function rgb(color) {
  return channels(color).slice(0, 3).join(',');
}

function alpha(color) {
  return channels(color)[3] ?? 1;
}
