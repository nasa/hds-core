export default {
  title: 'Foundations/Palette Spec',
};

const icon = (name) => `
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#${name}"></use>
  </svg>`;

export const Default = {
  name: 'Palette Reference',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 0;">

      <!-- Label -->
      <p class="hds-label">Label Carbon 60</p>

      <!-- Heading -->
      <h1 style="margin-top: 0.25rem;">Heading Black</h1>

      <!-- Paragraph + External Link -->
      <p style="margin-top: 0.5rem;">
        Paragraph Text Carbon 90 &nbsp;
        <a class="usa-link usa-link--external"
           href="https://example.com" rel="noreferrer">External link</a>
      </p>

      <!-- Metadata -->
      <p class="hds-metadata" style="margin-top: 1rem;">Metadata Carbon 60</p>

      <!-- Caption -->
      <p class="hds-caption">Caption/Supplemental Text Carbon 60</p>

      <!-- Primary Arrow Button -->
      <div style="margin-top: 1.5rem;">
        <a class="hds-btn--primary" href="#">Carbon Black</a>
      </div>

      <!-- Label + Utility Glyph + Checkbox row -->
      <div style="display: flex; align-items: center; gap: 1.5rem; margin-top: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="
            font-family: inherit;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: var(--hds-palette-muted, #58585B);
          ">Carbon 60</span>
          <svg class="hds-glyph" aria-hidden="true" focusable="false"
               style="width: 1.25em; height: 1.25em;">
            <use xlink:href="/assets/img/hds-sprite.svg#arrow-circle-down"></use>
          </svg>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <input class="usa-checkbox__input" id="spec-check" type="checkbox"
                 name="spec-check" checked>
          <label class="usa-checkbox__label" for="spec-check">Text</label>
        </div>
      </div>

      <!-- CTA + Icon Buttons row -->
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-top: 1.5rem;">
        <a class="usa-button" href="#" style="flex-shrink: 0;">Explore</a>

        <a class="hds-btn-icon hds-btn-icon--social" href="#" aria-label="Share"
           style="flex-shrink: 0;">
          ${icon('share')}
        </a>

        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download"
                style="flex-shrink: 0;">
          ${icon('download')}
        </button>

        <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Download"
                style="flex-shrink: 0;">
          ${icon('download')}
        </button>

        <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Next"
                style="flex-shrink: 0;">
          ${icon('arrow-chevron-right')}
        </button>
      </div>

    </div>
  `,
};