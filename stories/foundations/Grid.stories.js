export default {
  title: 'Foundations/Grid',
  parameters: {
    layout: 'fullscreen',
  },
};

const colDemo = (count) => {
  let cols = '';
  for (let i = 0; i < count; i++) {
    cols += `<div class="grid-col" style="
      background: var(--hds-color-nasa-blue, #1C67E3);
      opacity: 0.15;
      min-height: 3rem;
      border-left: 1px solid rgba(0,0,0,0.08);
      border-right: 1px solid rgba(0,0,0,0.08);
    "></div>`;
  }
  return cols;
};

export const TwelveColumn = {
  tags: ['!dev'],
  render: () => `
    <div class="grid-container" style="padding-block: 1rem;">
      <div class="grid-row grid-gap">
        ${colDemo(12)}
      </div>
    </div>
  `,
};

export const SidebarContent = {
  tags: ['!dev'],
  render: () => `
    <div class="grid-container" style="padding-block: 1rem;">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">2 + 10 (sidebar + content)</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-2" style="background: var(--hds-color-nasa-red, #F64137); opacity: 0.2; min-height: 3rem;"></div>
        <div class="grid-col-10" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
      </div>
    </div>
  `,
};

export const CardGrid = {
  tags: ['!dev'],
  render: () => `
    <div class="grid-container" style="padding-block: 1rem;">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">3 + 3 + 3 + 3 (card grid)</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
      </div>
    </div>
  `,
};

export const ContentAside = {
  tags: ['!dev'],
  render: () => `
    <div class="grid-container" style="padding-block: 1rem;">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">8 + 4 (content + aside)</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-8" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        <div class="grid-col-4" style="background: var(--hds-color-nasa-red, #F64137); opacity: 0.2; min-height: 3rem;"></div>
      </div>
    </div>
  `,
};

export const ResponsiveCards = {
  tags: ['!dev'],
  render: () => `
    <div class="grid-container" style="padding-block: 1rem;">
      <p style="font-size: 0.75rem; opacity: 0.6; margin-block-end: 0.5rem;">Responsive: 1 col → 2 col → 4 col</p>
      <div class="grid-row grid-gap">
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        <div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
      </div>
    </div>
  `,
};

export const StackingDemo = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 36em; padding: 1rem;">
      <div style="padding: 1rem;">
        <p class="hds-eyebrow" style="margin: 0;">Featured Mission</p>
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
