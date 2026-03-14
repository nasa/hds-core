export default {
  title: 'Components/Icon Button',
};

// Helper to reduce repetition
const icon = (name) => `
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#${name}"></use>
  </svg>`;

export const AllRoles = {
  name: 'All Roles',
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--cta" aria-label="Navigate to page">
          ${icon('arrow-line-right')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">CTA</div>
      </div>

      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download file">
          ${icon('download')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Secondary</div>
      </div>

      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Share page">
          ${icon('share')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Outline</div>
      </div>

      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Settings">
          ${icon('settings')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Utility</div>
      </div>

      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--social" aria-label="RSS feed">
          ${icon('rss')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Social</div>
      </div>

      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--interactive" aria-label="More info">
          ${icon('info')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Interactive</div>
      </div>
    </div>

    <p style="margin-top: 2rem; font-size: 14px; color: var(--hds-palette-muted, #717171);">
      <strong>Red</strong> = navigates away &nbsp;·&nbsp;
      <strong>Blue</strong> = stays on page &nbsp;·&nbsp;
      <strong>Neutral</strong> = UI controls
    </p>
  `,
};

export const Sizes = {
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center;">
      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--sm" aria-label="Play">
          ${icon('play')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Small</div>
      </div>

      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Play">
          ${icon('play')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Default</div>
      </div>

      <div style="text-align: center;">
        <button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--lg" aria-label="Play">
          ${icon('play')}
        </button>
        <div style="margin-top: 0.5rem; font-size: 12px;">Large</div>
      </div>
    </div>
  `,
};

export const MixedUsage = {
  name: 'Mixed Usage',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <strong>Social row:</strong>
        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
          <a class="hds-btn-icon hds-btn-icon--social" href="#" aria-label="RSS feed">
            ${icon('rss')}
          </a>
          <a class="hds-btn-icon hds-btn-icon--social" href="#" aria-label="Subscribe">
            ${icon('subscribe')}
          </a>
          <a class="hds-btn-icon hds-btn-icon--social" href="#" aria-label="Share">
            ${icon('share')}
          </a>
        </div>
      </div>

      <div>
        <strong>Action bar:</strong>
        <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
          <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">
            ${icon('download')}
          </button>
          <button class="hds-btn-icon hds-btn-icon--outline" aria-label="Print">
            ${icon('print')}
          </button>
          <button class="hds-btn-icon hds-btn-icon--utility" aria-label="Expand">
            ${icon('expand')}
          </button>
        </div>
      </div>

      <div>
        <strong>CTA with text:</strong>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
          <span style="font-weight: 600;">Explore the mission</span>
          <a class="hds-btn-icon hds-btn-icon--cta hds-btn-icon--sm" href="#" aria-label="Go to mission page">
            ${icon('arrow-line-right')}
          </a>
        </div>
      </div>
    </div>
  `,
};