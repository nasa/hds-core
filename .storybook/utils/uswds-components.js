// ============================================================
// USWDS component re-initialization for Storybook
// @nasa-hds/core
// ============================================================
// Storybook-only. NOT shipped to consumers.
//
// Consumers load `uswds.min.js`, which runs `behavior.on(document.body)`
// for every component once, on DOMContentLoaded. That single call does
// two separate things:
//
//   1. Attaches delegated event listeners to `document.body`.
//   2. Runs each component's `init(root)` — the DOM enhancement pass
//      that builds combo box listboxes, date picker calendars, file
//      input drop targets, character count messages, and so on.
//
// In Storybook, DOMContentLoaded fires before any story is rendered.
// Step 1 still works for every story, because the listeners live on
// `document.body` and story markup is a descendant of it. Step 2 never
// runs for story markup, because that markup did not exist yet — so
// JS-enhanced components render as their bare, pre-enhancement HTML.
//
// This module runs step 2 (and only step 2) against a story's DOM.
// Calling `behavior.on()` here instead would re-attach the delegated
// listeners a second time and fire every handler twice.
//
// Usage — declare the components a story needs in its parameters:
//
//   export default {
//     title: 'Components/Combo Box',
//     parameters: { uswds: ['comboBox'] },
//   };
//
// Valid names are the keys of the USWDS component index; see
// `uswdsComponentNames` below.
// ============================================================

import components from '@uswds/uswds/js';

/** Component keys accepted in `parameters.uswds`. */
export const uswdsComponentNames = Object.keys(components);

/**
 * Modal's `init()` relocates each `.usa-modal` into a wrapper appended
 * to `document.body`, outside the story root. Storybook re-renders the
 * story root without touching those wrappers, so they survive story
 * navigation, args changes, and hot reloads — leaving orphaned modals
 * stacked in the document and duplicate IDs for axe to trip over.
 *
 * Remove wrappers whose modal is no longer connected to a rendered
 * story, and reset the body state a still-open modal would have left.
 */
function cleanUpStaleModals(root) {
  document.querySelectorAll('.usa-modal-wrapper').forEach((wrapper) => {
    if (!root.contains(wrapper)) wrapper.remove();
  });

  document.body.classList.remove('usa-js-modal--active', 'usa-js-no-click');
  document.querySelectorAll('[data-modal-hidden]').forEach((el) => {
    el.removeAttribute('data-modal-hidden');
    el.removeAttribute('aria-hidden');
  });
}

/**
 * Run the DOM enhancement pass for the named USWDS components.
 *
 * Call this once per render, scoped to that render's own container.
 * Several USWDS `init()` routines rewrite the markup they enhance
 * rather than detecting prior enhancement, so running one twice over
 * the same DOM nests the result — a tooltip trigger ends up wrapped in
 * a wrapper wrapped in a wrapper. Storybook rebuilds story markup from
 * scratch on every render, so one call per render against the story's
 * own canvas is always a first initialization.
 *
 * Unknown names are reported rather than thrown, so one typo in a
 * story does not blank the canvas.
 *
 * @param {string[]} names Component keys, e.g. `['comboBox', 'modal']`
 * @param {HTMLElement|Document} [root=document.body] Scope to enhance
 */
export default function initUswdsComponents(names, root) {
  const scope = root || document.body;

  if (names.includes('modal')) cleanUpStaleModals(scope);

  names.forEach((name) => {
    const component = components[name];

    if (!component) {
      console.warn(
        `initUswdsComponents: unknown USWDS component "${name}". ` +
          `Expected one of: ${uswdsComponentNames.join(', ')}.`,
      );
      return;
    }

    // `init` is optional — a few components (button, skipnav, password)
    // are delegation-only and need nothing beyond the listeners the
    // shipped bundle already attached.
    if (typeof component.init !== 'function') return;

    try {
      component.init(scope);
    } catch (error) {
      console.warn(`initUswdsComponents: "${name}" failed to initialize.`, error);
    }
  });
}
