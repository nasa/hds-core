<!-- Source: ./stories/foundations/Icons.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/foundations-icons--docs -->
# Icons

Icons are recognizable visual symbols that communicate messages at a glance. They are used throughout HDS to represent common actions and categorize content. All icons use `currentColor` for fill, so they automatically adapt to any [palette](./foundations-color-palettes.md) context.

## System icons

System icons represent common actions and are used in [Icon Buttons](./components-icon-button-guidance.md) or alone as inline glyphs. They are designed on a **24×24px grid** with 2px stroke weight.

```html
  <div style="max-width: 72em;">

<div style="margin-block-end: 2rem;">
  <h3>Arrows / Line</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-line-diagonal"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-line-diagonal</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-line-down"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-line-down</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-line-left"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-line-left</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-line-right"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-line-right</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-line-up"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-line-up</code>
</div>

  </div>
</div>

<div style="margin-block-end: 2rem;">
  <h3>Arrows / Chevron</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-down"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-chevron-down</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-chevron-left</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-chevron-right</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-up"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-chevron-up</code>
</div>

  </div>
</div>

<div style="margin-block-end: 2rem;">
  <h3>Arrows / Circle</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-circle-double-left"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-circle-double-left</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-circle-double-right"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-circle-double-right</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-circle-down"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-circle-down</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-circle-left"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-circle-left</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-circle-right"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-circle-right</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-circle-up"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-circle-up</code>
</div>

  </div>
</div>

<div style="margin-block-end: 2rem;">
  <h3>Arrows / Filled</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-filled-down"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-filled-down</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-filled-left"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-filled-left</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-filled-right"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-filled-right</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#arrow-filled-up"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">arrow-filled-up</code>
</div>

  </div>
</div>

<div style="margin-block-end: 2rem;">
  <h3>Actions &amp; UI</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#archive"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">archive</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#calendar"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">calendar</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#check"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">check</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#check-circled"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">check-circled</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#close"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">close</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#collapse"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">collapse</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#comment"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">comment</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">download</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#error"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">error</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#expand"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">expand</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#facility"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">facility</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#filter"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">filter</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#info"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">info</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#list"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">list</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#location"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">location</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#map"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">map</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#menu"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">menu</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#minus"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">minus</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#notification"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">notification</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#pause"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">pause</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#play"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">play</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#plus"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">plus</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#print"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">print</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#quote"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">quote</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#rotate"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">rotate</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#rss"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">rss</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#search"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">search</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#selection"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">selection</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#settings"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">settings</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#share"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">share</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#slideshow"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">slideshow</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#sound-off"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">sound-off</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#sound-on"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">sound-on</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#view-grid"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">view-grid</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#view-list"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">view-list</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#view-mosaic"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">view-mosaic</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#view-single"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">view-single</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#x-circled"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">x-circled</code>
</div>

  </div>
</div>

<div style="margin-block-end: 2rem;">
  <h3>Space &amp; Science</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#asteroid"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">asteroid</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#gas-giant"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">gas-giant</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#moon"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">moon</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#orbiter"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">orbiter</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#rover"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">rover</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#terrestrial"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">terrestrial</code>
</div>

  </div>
</div>

<div style="margin-block-end: 2rem;">
  <h3>File Types</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-archive"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-archive</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-audio"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-audio</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-code"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-code</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-document"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-document</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-generic"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-generic</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-image"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-image</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-spreadsheet"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-spreadsheet</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#file-video"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">file-video</code>
</div>

  </div>
</div>

  </div>
```

## Tag icons

Tag icons represent types of content. They appear in card components (often with a label) to help visitors understand what to expect before engaging with content.

Unlike system icons, tag icons include a built-in circle outline in the glyph itself — they are **informational only** and do not function as buttons.

```html
  <div style="max-width: 72em;">
    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-all"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">all</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-announcement"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">announcement</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-audio"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">audio</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-bookmark"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">bookmark</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-comment"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">comment</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-data"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">data</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-document"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">document</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-edit"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">edit</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-event"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">event</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-folder"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">folder</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-gallery"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">gallery</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-graph"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">graph</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-image"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">image</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-interactive"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">interactive</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-landing"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">landing</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-launch"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">launch</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-mail"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">mail</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-movie"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">movie</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-notification"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">notification</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-person"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">person</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-play"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">play</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-podcast"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">podcast</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-reference"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">reference</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-repeat"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">repeat</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-slideshow"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">slideshow</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-star"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">star</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-status-update"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">status-update</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 7rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2.5rem; height: 2.5rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#tag-topic"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">topic</code>
</div>

    </div>
    <p style="font-size: 0.875rem; opacity: 0.7; margin-block-start: 1rem;">
      28 tag icons available. Names in the sprite use the <code>tag-</code> prefix.
    </p>
  </div>
```

## Logos

Logo icons are third-party platform marks. As social media and platform integrations are added, new logos will appear here.

```html
  <div style="max-width: 72em;">
    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2rem; height: 2rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#logo-figma"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">logo-figma</code>
</div>

<div style="
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  min-width: 6rem;
  text-align: center;
">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2rem; height: 2rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#logo-uswds"></use>
</svg>

  <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">logo-uswds</code>
</div>

    </div>
    <p style="font-size: 0.875rem; opacity: 0.7; margin-block-start: 1rem;">
      2 logo icons available. Names in the sprite use the <code>logo-</code> prefix.
    </p>
  </div>
```

## Sizing

Icons appear at various sizes in multiples of 4px to align with [Spacing](./foundations-spacing.md) guidelines. The glyph art is designed at 20px within the 24px frame (2px padding on all sides).

```html
  <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
    <div style="text-align: center;">
      <div style="border: 1px dashed #D1D1D1; padding: 0.5rem; display: inline-block;">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 24px; height: 24px; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#search"></use>
</svg>

      </div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">24px (1×)</p>
    </div>
    <div style="text-align: center;">
      <div style="border: 1px dashed #D1D1D1; padding: 0.5rem; display: inline-block;">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 32px; height: 32px; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#search"></use>
</svg>

      </div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">32px</p>
    </div>
    <div style="text-align: center;">
      <div style="border: 1px dashed #D1D1D1; padding: 0.5rem; display: inline-block;">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 48px; height: 48px; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#search"></use>
</svg>

      </div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">48px</p>
    </div>
  </div>
```

## Reserved icons

Certain icons are reserved for specific uses to ensure continuity across the system. Do not use these icons for other purposes.

```html
    <div style="max-width: 72em;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #D1D1D1;">Icon</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #D1D1D1;">Name</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid #D1D1D1;">Reserved usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">
  <svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-line-right"></use>
  </svg>
</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-right</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Primary button, blog navigation (forward)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">
  <svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-line-left"></use>
  </svg>
</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-left</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Blog navigation (back)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">
  <svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-line-down"></use>
  </svg>
</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-down</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Table of contents</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">
  <svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-line-diagonal"></use>
  </svg>
</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-diagonal</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">External link arrow (leaving NASA)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">
  <svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-chevron-down"></use>
  </svg>
</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-chevron-*</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Pagination, carousels, accordions, slideshows</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">
  <svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-circle-up"></use>
  </svg>
</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-circle-up/down</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Explore button, scroll-to-continue prompt</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem;">
  <svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1.5rem; height: 1.5rem; fill: currentColor;">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-filled-down"></use>
  </svg>
</td>
            <td style="padding: 0.75rem;"><code>arrow-filled-*</code></td>
            <td style="padding: 0.75rem;">Table column sorts</td>
          </tr>
        </tbody>
      </table>
    </div>
```

## Two-layer architecture

HDS separates icon glyphs from their containers. A single SVG works across all palettes and contexts — CSS controls the color.

```html
  <div style="display: flex; gap: 3rem; align-items: flex-start; flex-wrap: wrap;">
    <div>
      <p class="hds-overline" style="margin-block-end: 0.5rem;">Layer 1: Glyph</p>
      <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2rem; height: 2rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>

      </div>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
        Single-color SVG using <code>currentColor</code>.<br>
        Inherits text color from parent.
      </p>
    </div>
    <div>
      <p class="hds-overline" style="margin-block-end: 0.5rem;">Layer 2: Container</p>
      <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 1em; height: 1em; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>

      </button>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
        CSS-styled circle via <code>.hds-btn-icon</code>.<br>
        Color set by role modifier.
      </p>
    </div>
    <div>
      <p class="hds-overline" style="margin-block-end: 0.5rem;">Inline Glyph</p>
      <span>
        Download file
        <svg class="hds-glyph" aria-hidden="true" focusable="false">
          <use xlink:href="assets/img/hds-sprite.svg#download"></use>
        </svg>
      </span>
      <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
        Bare icon via <code>.hds-glyph</code>.<br>
        No button container needed.
      </p>
    </div>
  </div>
```

**Tag icons are an exception** — their circle outline is baked into the glyph because they always appear with it.

## Using icons in code

### SVG sprite (recommended)

```html
<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
</svg>
```

### Inline glyph (no container)

```html
<span>
  Download file
  <svg class="hds-glyph" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
  </svg>
</span>
```

### Icon button

```html
<button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
  </svg>
</button>
```

See [Icon Button](./components-icon-button-guidance.md) for all button variants and usage guidance.

## Using USWDS and Material icons

USWDS ships with its own icon sprite (`sprite.svg`) which includes both USWDS and Material Design icons. These work alongside HDS icons using the same markup pattern — just reference the USWDS sprite instead:

```html
  <div style="max-width: 72em;">
    <div style="display: flex; gap: 3rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="text-align: center;">
        <p class="hds-overline" style="margin-block-end: 0.5rem;">HDS sprite</p>
        <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2rem; height: 2rem; fill: currentColor;">
  <use xlink:href="assets/img/hds-sprite.svg#download"></use>
</svg>

        </div>
        <p style="font-size: 0.65rem; opacity: 0.7; margin-block-start: 0.5rem;">
          <code>hds-sprite.svg#download</code>
        </p>
      </div>
      <div style="text-align: center;">
        <p class="hds-overline" style="margin-block-end: 0.5rem;">USWDS sprite</p>
        <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2rem; height: 2rem; fill: currentColor;">
  <use xlink:href="assets/img/sprite.svg#thumb_up_alt"></use>
</svg>

        </div>
        <p style="font-size: 0.65rem; opacity: 0.7; margin-block-start: 0.5rem;">
          <code>sprite.svg#thumb_up_alt</code>
        </p>
      </div>
      <div style="text-align: center;">
        <p class="hds-overline" style="margin-block-end: 0.5rem;">USWDS (Material)</p>
        <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">

<svg class="hds-icon" aria-hidden="true" focusable="false" style="width: 2rem; height: 2rem; fill: currentColor;">
  <use xlink:href="assets/img/sprite.svg#science"></use>
</svg>

        </div>
        <p style="font-size: 0.65rem; opacity: 0.7; margin-block-start: 0.5rem;">
          <code>sprite.svg#science</code>
        </p>
      </div>
    </div>
  </div>
```

```html
<!-- HDS icon -->
<svg class="hds-icon" aria-hidden="true" focusable="false">
  <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
</svg>

<!-- USWDS / Material icon -->
<svg class="usa-icon" aria-hidden="true" focusable="false">
  <use xlink:href="/assets/img/sprite.svg#thumb_up_alt"></use>
</svg>
```

**Always check the HDS icon set first.** HDS icons are designed specifically for NASA digital products and maintain visual consistency across the system. Use USWDS or Material icons only when HDS doesn't include what you need.

When using Material icons, prefer **filled** glyphs over outlined for consistency with the HDS icon style.

For the full USWDS icon inventory, see the [USWDS Icon component](https://designsystem.digital.gov/components/icon/).

## Accessibility

- **Decorative icons** (next to visible text): add `aria-hidden="true"` and `focusable="false"` to the `<svg>`
- **Icon-only buttons** (no visible text): add `aria-label` to the button element describing the action
- **Icons with visible text**: the text provides the accessible label — the icon is decorative

For detailed ARIA requirements, see each component's Accessibility section and the [Accessibility](./foundations-accessibility.md) foundation.

## Adding new icons

When the HDS icon set above doesn't include what you need:

1. **Check USWDS icons** — the USWDS sprite (`dist/assets/img/sprint.svg`) includes hundreds of icons, which are also included as individual .svg files (`dist/assets/img/usa-icons/`)
2. **Check Material icons** — included as individual .svg files in the USWDS package (`dist/assets/img/material-icons/`)
3. **Custom icons** should follow HDS design guidelines: 20x20px icon centered on a 24×24px grid, 2px stroke (1px for fine details), geometric forms, optimized for small sizes. New icons go through the HDS design review process.

Avoid mixing with icon sets outside USWDS/Material to maintain visual consistency.
