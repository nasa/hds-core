export default {
  title: 'Foundations/Color Palettes',
  parameters: {
    layout: 'fullscreen',
  },
};

const icon = (name) => `
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#${name}"></use>
  </svg>`;

const paletteSample = (content = '') => `
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
    <div>
      <p class="hds-label">Label text</p>
      <h2 style="margin-top: 0.25rem;">Heading</h2>
      <p style="margin-top: 0.5rem;">
        Paragraph text with a
        <a class="usa-link" href="#">text link</a> and an
        <a class="usa-link usa-link--external" href="https://example.com">external link</a>.
      </p>
      <p class="hds-metadata" style="margin-top: 1rem;">Metadata — Jan 1, 2026</p>
      <p class="hds-caption">Caption text</p>
    </div>
    <div>
      <div style="margin-bottom: 1rem;">
        <a class="hds-btn--primary" href="#">Learn More</a>
      </div>
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem;">
        <a class="usa-button" href="#">Explore</a>
        <button class="usa-button usa-button--outline">Outline</button>
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">
          ${icon('download')}
        </button>
        <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download">
          ${icon('download')}
        </button>
        <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next">
          ${icon('arrow-chevron-right')}
        </button>
      </div>
    </div>
  </div>
`;

export const White = {
  tags: ['!dev'],
  render: () => `
    <div class="hds-palette-white" style="padding: 2rem;">
      ${paletteSample()}
    </div>
  `,
};

export const Light = {
  tags: ['!dev'],
  render: () => `
    <div class="hds-palette-light" style="padding: 2rem;">
      ${paletteSample()}
    </div>
  `,
};

export const Midtone = {
  tags: ['!dev'],
  render: () => `
    <div class="hds-palette-midtone" style="padding: 2rem;">
      ${paletteSample()}
    </div>
  `,
};

export const Dark = {
  tags: ['!dev'],
  render: () => `
    <div class="hds-palette-dark" style="padding: 2rem;">
      ${paletteSample()}
    </div>
  `,
};

export const Blue = {
  tags: ['!dev'],
  render: () => `
    <div class="hds-palette-blue" style="padding: 2rem;">
      ${paletteSample()}
    </div>
  `,
};

export const Black = {
  tags: ['!dev'],
  render: () => `
    <div class="hds-palette-black" style="padding: 2rem;">
      ${paletteSample()}
    </div>
  `,
};

export const Nested = {
  tags: ['!dev'],
  render: () => `
    <div class="hds-palette-white" style="padding: 2rem;">
      <p class="hds-label" style="margin-bottom: 1rem;">White (outer)</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
        <div class="hds-palette-light" style="padding: 1.5rem;">
          <p class="hds-label">Nested: Light</p>
          <h3 style="margin-top: 0.25rem;">Heading</h3>
          <p style="margin-top: 0.5rem;">Paragraph with <a class="usa-link" href="#">link</a>.</p>
          <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next" style="margin-top: 0.75rem;">
            ${icon('arrow-chevron-right')}
          </button>
        </div>
        <div class="hds-palette-dark" style="padding: 1.5rem;">
          <p class="hds-label">Nested: Dark</p>
          <h3 style="margin-top: 0.25rem;">Heading</h3>
          <p style="margin-top: 0.5rem;">Paragraph with <a class="usa-link" href="#">link</a>.</p>
          <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next" style="margin-top: 0.75rem;">
            ${icon('arrow-chevron-right')}
          </button>
        </div>
        <div class="hds-palette-blue" style="padding: 1.5rem;">
          <p class="hds-label">Nested: Blue</p>
          <h3 style="margin-top: 0.25rem;">Heading</h3>
          <p style="margin-top: 0.5rem;">Paragraph with <a class="usa-link" href="#">link</a>.</p>
          <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next" style="margin-top: 0.75rem;">
            ${icon('arrow-chevron-right')}
          </button>
        </div>
      </div>
    </div>
  `,
};
