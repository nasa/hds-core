export default {
  title: 'Foundations/Motion',
};

// ============================================================
// Demo styles — scoped via .motion-demo wrapper, never shipped.
// The swatches read the real --hds-motion-* properties, so they
// also demonstrate the reduced-motion behavior: switch the OS
// preference on and every swatch below changes instantly.
// ============================================================

// `text` rather than `label` — Storybook's story indexer misreads a
// `label:` key inside a render function as a JS label statement.
const speeds = [
  { key: 'blink', text: 'Blink', value: '350ms', curve: 'Snap', easing: 'var(--hds-motion-easing-snap)' },
  { key: 'fast', text: 'Fast', value: '500ms', curve: 'Default', easing: 'var(--hds-motion-easing)' },
  { key: 'medium', text: 'Medium', value: '1000ms', curve: 'Default', easing: 'var(--hds-motion-easing)' },
  { key: 'slow', text: 'Slow', value: '1500ms', curve: 'Default', easing: 'var(--hds-motion-easing)' },
];

const demoStyles = `<style>
  .motion-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 34rem;
  }
  .motion-demo__swatch {
    background: none;
    border: 0;
    cursor: pointer;
    display: block;
    padding: 0;
    text-align: left;
    width: 100%;
  }
  .motion-demo__caption {
    color: var(--hds-palette-text, #17171b);
    display: block;
    font-size: 0.875rem;
    margin-block-end: 0.25rem;
  }
  .motion-demo__track {
    background-color: var(--hds-color-carbon-10);
    height: 2.5rem;
  }
  ${speeds
    .map(
      (s) => `
  .motion-demo__track--${s.key} {
    transition: background-color var(--hds-motion-duration-${s.key}) ${s.easing};
  }
  .motion-demo__swatch:hover .motion-demo__track--${s.key},
  .motion-demo__swatch:focus-visible .motion-demo__track--${s.key} {
    background-color: var(--hds-color-nasa-blue);
  }`,
    )
    .join('')}
</style>`;

const swatch = (s) => `
  <button type="button" class="motion-demo__swatch">
    <span class="motion-demo__caption">${s.text} — ${s.value}, ${s.curve} curve</span>
    <span class="motion-demo__track motion-demo__track--${s.key}"></span>
  </button>`;

// ============================================================
// Guidance embeds (MDX Canvas targets)
// ============================================================

export const SpeedComparison = {
  name: 'Speed comparison',
  tags: ['!dev'],
  render: () => `${demoStyles}<div class="motion-demo">${speeds.map(swatch).join('')}</div>`,
};
