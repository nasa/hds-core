// ============================================================
// Modal — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_modal.scss` exists and
// `grep -rn "usa-modal" src/scss/` returns nothing — not even a
// non-theming match in `base/_palettes.scss` or `base/_print.scss`.
// Everything below is USWDS default styling inside `@layer uswds`,
// recolored only by the HDS theme settings in `_hds-uswds-theme.scss`
// (which does not set any `$theme-modal-*` variable — every one of
// them resolves to its upstream default).
//
// USWDS docs:   https://designsystem.digital.gov/components/modal/
// USWDS styles: packages/usa-modal/src/styles/_usa-modal.scss
// USWDS JS:     packages/usa-modal/src/index.js — REQUIRED, and load-bearing
//               in a way no other lab component is.
//
// `init()` does not toggle a class on the authored `.usa-modal` — it
// *relocates* it. `setUpModal()` leaves a hidden placeholder div where
// the modal was authored, wraps the real element in a new
// `.usa-modal-wrapper.is-hidden` > `.usa-modal-overlay` pair, and
// appends that wrapper to `document.body` (`rebuildModal`,
// `setUpModal`, packages/usa-modal/src/index.js). Storybook's canvas is
// a container inside the story root, not `document.body`, so the
// wrapper renders *outside the canvas entirely*. A closed modal
// therefore contributes nothing visible to the canvas or to a
// Chromatic snapshot of it — not "a hidden box", literally absent from
// the subtree Storybook renders into. `.storybook/utils/uswds-components.js`
// documents this exact relocation and runs `cleanUpStaleModals()` before
// each re-init so orphaned wrappers from a previous story render don't
// accumulate on `document.body` across navigations.
//
// Unlike Combo Box and Character Count, `init()` has no
// `data-enhanced`-style opt-out or idempotency guard — reading
// `setUpModal`/`rebuildModal`/`cleanUpModal` in full shows no check for
// prior enhancement at all, only a hard requirement that the element
// have an `id` (it throws otherwise). There is no upstream hook that
// lets authored markup alone render the *open*, on-screen dialog state
// (fixed overlay, centered panel, focus trap, `aria-modal="true"`):
// that state exists only after `toggleModal()` runs from a real click,
// which this file cannot do without a play function. The stories below
// are trigger-button stories — honest about what is actually in the
// canvas post-`init()`, not a demonstration of the modal panel itself.
// See the triage fragment for the themed-Modal follow-up this implies.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-modal` hardcodes `background: white` and
//     `@include set-text-from-bg('white')` (_usa-modal.scss), the same
//     pattern as Card's `.usa-card__container` — a white box with ink
//     text regardless of `--hds-palette-*`. It is moot for the palette
//     tests below in a stronger way than Card, though: `init()` moves
//     the real panel to `document.body`, so once open it sits outside
//     every `.hds-palette-*` ancestor entirely, not merely opaque to one.
//   - `$theme-modal-border-radius: 'lg'`, `$theme-modal-default-max-width:
//     'mobile-lg'`, `$theme-modal-lg-max-width: 'tablet-lg'`, and
//     `$theme-modal-lg-content-max-width: 'tablet'` are all upstream
//     defaults (packages/uswds-core/src/styles/settings/_settings-components.scss)
//     — `_hds-uswds-theme.scss` sets none of them. The panel keeps a
//     rounded corner against otherwise square HDS surfaces.
//   - `.usa-modal__heading` uses `@include u-font('heading', 'lg')` and
//     `.usa-modal__main` copy inherits `@include typeset` — USWDS's
//     heading and body type scale, not HDS typography, since nothing
//     in `_hds-uswds-theme.scss` or a component override intercepts it.
//   - Every button inside the modal (open trigger, footer buttons, the
//     `usa-modal__close` icon button) is a `.usa-button`, and
//     `src/scss/components/_button.scss` themes `.usa-button` fully in
//     `@layer hds-components` — NASA Red fills, HDS hover/active states.
//     So the one HDS-themed thing in this component is its buttons,
//     sitting inside an otherwise fully-USWDS white panel — the same
//     "themed content in an unthemed container" split Card has.
//   - Confirmed cascade-layer trap (sixth instance on this branch):
//     `src/scss/base/_focus.scss` line 25 matches
//     `button:not([disabled]):focus-visible` — a bare element selector
//     with no class qualifier — inside `@layer hds-base`. USWDS gives
//     `.usa-modal__close:focus { outline-offset: 0; }` inside `@layer
//     uswds` (_usa-modal.scss). `hds-base` outranks `uswds` regardless
//     of specificity (AGENTS.md → "Cascade layer order"), so the HDS
//     dashed `hds-focus-ring` mixin wins on the close button and both
//     footer buttons, not USWDS's own modal-tuned offset. Because the
//     open panel lives outside any `.hds-palette-*` ancestor once
//     relocated, the ring's `--hds-palette-focus` custom property is
//     never set there and always resolves through the mixin's built-in
//     fallback (`_hds-mixins.scss`), never an ambient page palette.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Modal',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    // See the header comment: this is what relocates `.usa-modal`
    // out of the canvas, not what shows it.
    uswds: ['modal'],
  },
};

// --- Helpers ---

const closeIcon = () =>
  `<svg class="usa-icon" aria-hidden="true" focusable="false" role="img"><use href="assets/img/sprite.svg#close"></use></svg>`;

/**
 * A modal trigger plus its authored (pre-relocation) `.usa-modal`
 * markup. `init()` moves the `.usa-modal` element to `document.body`
 * on render, so nothing after the trigger button is visible in the
 * canvas — see the header comment. The markup is still written in
 * full because `id` / `aria-labelledby` / `aria-describedby` /
 * `aria-controls` wiring has to be correct for the relocated dialog to
 * be the right one, even though that dialog cannot be inspected here.
 *
 * @param {object} options
 * @param {string} options.prefix      Unique id root — required so six
 *   stacked palette copies don't collide and wire every trigger to the
 *   first modal in the document (see stories/lab/labHelpers.js).
 * @param {string} options.triggerText Trigger button label
 * @param {string} options.heading     Modal heading text
 * @param {string} options.description Modal description paragraph
 * @param {string} options.modalClass  Extra `.usa-modal` modifier classes
 * @param {boolean} options.forceAction Adds `data-force-action` and
 *   drops the `usa-modal__close` icon button, per USWDS docs guidance
 *   for forced-action modals.
 * @param {string} options.confirmText Primary footer button label
 * @param {string} options.cancelText  Secondary (unstyled) footer button label
 */
const modal = ({
  prefix = 'modal',
  triggerText = 'Open modal',
  heading = 'End the current spacewalk?',
  description = 'Telemetry shows suit consumables below the planned margin. This cannot be undone once confirmed.',
  modalClass = '',
  forceAction = false,
  confirmText = 'End spacewalk',
  cancelText = 'Continue spacewalk',
} = {}) => {
  const modalId = `${prefix}-modal`;
  const headingId = `${prefix}-heading`;
  const descId = `${prefix}-desc`;

  return `
  <div>
    <button type="button" class="usa-button" aria-controls="${modalId}" data-open-modal>${triggerText}</button>
    <div
      class="usa-modal ${modalClass}"
      id="${modalId}"
      aria-labelledby="${headingId}"
      aria-describedby="${descId}"
      ${forceAction ? 'data-force-action' : ''}
    >
      <div class="usa-modal__content">
        <div class="usa-modal__main">
          <h2 class="usa-modal__heading" id="${headingId}">${heading}</h2>
          <div class="usa-prose">
            <p id="${descId}">${description}</p>
          </div>
          <div class="usa-modal__footer">
            <ul class="usa-button-group">
              <li class="usa-button-group__item">
                <button type="button" class="usa-button" data-close-modal>${confirmText}</button>
              </li>
              <li class="usa-button-group__item">
                <button type="button" class="usa-button usa-button--unstyled padding-105 text-center" data-close-modal>${cancelText}</button>
              </li>
            </ul>
          </div>
        </div>
        ${
          forceAction
            ? ''
            : `<button type="button" class="usa-button usa-modal__close" aria-label="Close this window" data-close-modal>${closeIcon()}</button>`
        }
      </div>
    </div>
  </div>`;
};

const triggerArgTypes = {
  triggerText: { control: 'text', name: 'Trigger label' },
  heading: { control: 'text', name: 'Modal heading' },
  description: { control: 'text', name: 'Modal description' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    triggerText: 'Open default modal',
    heading: 'End the current spacewalk?',
    description: 'Telemetry shows suit consumables below the planned margin. This cannot be undone once confirmed.',
  },
  argTypes: triggerArgTypes,
  render: (args = {}) => modal({ ...args, prefix: 'default' }),
};

export const Large = {
  name: 'Large (usa-modal--lg)',
  tags: ['!dev', '!test'],
  args: {
    triggerText: 'Open large modal',
    heading: 'Review the full mission timeline',
    description:
      'This timeline covers every phase of the Artemis II flight, from launch through splashdown. Review each milestone before confirming the schedule.',
  },
  argTypes: triggerArgTypes,
  render: (args = {}) => modal({ ...args, prefix: 'large', modalClass: 'usa-modal--lg' }),
};

export const ForcedAction = {
  name: 'Forced action (data-force-action)',
  tags: ['!dev', '!test'],
  render: () =>
    modal({
      prefix: 'forced',
      triggerText: 'Open forced-action modal',
      heading: 'Your session will end soon',
      description:
        "You've been inactive for too long. Choose to stay signed in or sign out. Otherwise you'll be signed out automatically in 5 minutes.",
      forceAction: true,
      confirmText: 'Yes, stay signed in',
      cancelText: 'Sign out',
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default', modal({ prefix: 'all-default' })),
      block('Large (usa-modal--lg)', modal({ prefix: 'all-large', modalClass: 'usa-modal--lg' })),
      block(
        'Forced action (data-force-action)',
        modal({
          prefix: 'all-forced',
          triggerText: 'Open forced-action modal',
          heading: 'Your session will end soon',
          description:
            "You've been inactive for too long. Choose to stay signed in or sign out. Otherwise you'll be signed out automatically in 5 minutes.",
          forceAction: true,
          confirmText: 'Yes, stay signed in',
          cancelText: 'Sign out',
        }),
      ),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Default', modal({ prefix: `${palette}-default` })),
      block('Large (usa-modal--lg)', modal({ prefix: `${palette}-large`, modalClass: 'usa-modal--lg' })),
      block(
        'Forced action (data-force-action)',
        modal({
          prefix: `${palette}-forced`,
          triggerText: 'Open forced-action modal',
          forceAction: true,
          confirmText: 'Yes, stay signed in',
          cancelText: 'Sign out',
        }),
      ),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Default', modal({ prefix: `${palette}-hover-default` })),
      block('Large (usa-modal--lg)', modal({ prefix: `${palette}-hover-large`, modalClass: 'usa-modal--lg' })),
      block(
        'Forced action (data-force-action)',
        modal({
          prefix: `${palette}-hover-forced`,
          triggerText: 'Open forced-action modal',
          forceAction: true,
          confirmText: 'Yes, stay signed in',
          cancelText: 'Sign out',
        }),
      ),
    ]),
  ),
};
