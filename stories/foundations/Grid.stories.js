export default {
  title: 'Foundations/Grid',
  parameters: {
    layout: 'fullscreen',
  },
};

// ============================================================
// Demo styles — scoped via .grid-demo wrapper, never shipped.
// background-clip: content-box clips backgrounds to the content
// area, leaving USWDS grid-gap padding visible as gutters.
// ============================================================

const demoStyles = `<style>
  .grid-demo [class*="grid-col"] {
    background-clip: content-box;
    background-color: var(--hds-color-nasa-blue, #1C67E3);
    opacity: 0.15;
    min-height: 3rem;
  }
  .grid-demo .demo-alt {
    background-color: var(--hds-color-nasa-red, #F64137);
    opacity: 0.2;
  }
</style>`;

/** Wraps content in demo styles + scoping wrapper */
const demo = (content) => `${demoStyles}<div class="grid-demo">${content}</div>`;

// ============================================================
// Helpers
// ============================================================

/** Equal-width column (no inner elements needed — background-clip handles gutters) */
const col = () => '<div class="grid-col"></div>';
const colDemo = (count) => Array.from({ length: count }, col).join('');

// ============================================================
// Guidance embeds (MDX Canvas targets)
// ============================================================

export const TwelveColumn = {
  tags: ['!dev'],
  render: () =>
    demo(`
    <div class="grid-container">
      <div class="grid-row grid-gap">
        ${colDemo(12)}
      </div>
    </div>
  `),
};

export const SidebarContent = {
  tags: ['!dev'],
  render: () =>
    demo(`
    <div class="grid-container">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">2 + 10 (sidebar + content)</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-2 demo-alt"></div>
        <div class="grid-col-10"></div>
      </div>
    </div>
  `),
};

export const CardGrid = {
  tags: ['!dev'],
  render: () =>
    demo(`
    <div class="grid-container">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">3 + 3 + 3 + 3 (card grid)</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-3"></div>
        <div class="grid-col-3"></div>
        <div class="grid-col-3"></div>
        <div class="grid-col-3"></div>
      </div>
    </div>
  `),
};

export const ContentAside = {
  tags: ['!dev'],
  render: () =>
    demo(`
    <div class="grid-container">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">8 + 4 (content + aside)</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-8"></div>
        <div class="grid-col-4 demo-alt"></div>
      </div>
    </div>
  `),
};

export const ResponsiveCards = {
  tags: ['!dev'],
  render: () =>
    demo(`
    <div class="grid-container">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">Responsive: 1 col → 2 col → 4 col</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
      </div>
    </div>
  `),
};

// Embedded in Spacing.mdx — keep here until Spacing gets its own stories file.
export const StackingDemo = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 36em; padding: 1rem;">
      <div style="padding: 1rem;">
        <p class="hds-overline" style="margin: 0;">Featured Mission</p>
        <div style="height: 8px; background: #1C67E3; opacity: 0.2; margin: 0;"></div>
        <h3 style="margin: 0;">Artemis Program</h3>
        <div style="height: 16px; background: #1C67E3; opacity: 0.2; margin: 0;"></div>
        <p style="margin: 0;">NASA's Artemis program aims to land the first woman and first person of color on the Moon.</p>
        <div style="height: 24px; background: #1C67E3; opacity: 0.2; margin: 0;"></div>
        <span style="font-size: 0.8rem;">
          ↑ <code>units(1)</code> 8px — eyebrow to heading<br>
          ↑ <code>units(2)</code> 16px — heading to paragraph<br>
          ↑ <code>units(3)</code> 24px — paragraph to next section
        </span>
      </div>
    </div>
  `,
};

// ============================================================
// Chromatic visual regression (hidden from sidebar)
// Captures one composite story at all 7 HDS breakpoints to
// catch gutter (4→16→24px), margin (16→32px), and container
// max-width regressions. See docs/ARCHITECTURE.md § Pending Work.
// ============================================================

const gridChromaticParams = {
  chromatic: {
    disableSnapshot: false,
    modes: {
      mobile: { viewport: { width: 320, height: 600 } },
      'mobile-lg': { viewport: { width: 480, height: 600 } },
      tablet: { viewport: { width: 640, height: 600 } },
      'tablet-lg': { viewport: { width: 880, height: 600 } },
      desktop: { viewport: { width: 1024, height: 600 } },
      'desktop-lg': { viewport: { width: 1200, height: 600 } },
      widescreen: { viewport: { width: 1400, height: 600 } },
    },
  },
};

export const ChromaticRegression = {
  name: 'Grid regression',
  tags: ['!dev'],
  parameters: gridChromaticParams,
  render: () =>
    demo(`
    <div class="grid-container" style="padding-block: 1rem;">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">12-column</p>
      <div class="grid-row grid-gap">
        ${colDemo(12)}
      </div>
    </div>

    <div class="grid-container" style="margin-block-start: 2rem; padding-block: 1rem;">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">4 + 8 asymmetric</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-4 demo-alt"></div>
        <div class="grid-col-8"></div>
      </div>
    </div>

    <div class="grid-container" style="margin-block-start: 2rem; padding-block: 1rem;">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">Responsive: 12 → 6 → 3</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"></div>
      </div>
    </div>
  `),
};
