export default {
  title: 'Foundations/Iconography',
};

const allIcons = [
  'archive',
  'arrow-chevron-down',
  'arrow-chevron-left',
  'arrow-chevron-right',
  'arrow-chevron-up',
  'arrow-circle-double-left',
  'arrow-circle-double-right',
  'arrow-circle-down',
  'arrow-circle-left',
  'arrow-circle-right',
  'arrow-circle-up',
  'arrow-filled-down',
  'arrow-filled-left',
  'arrow-filled-right',
  'arrow-filled-up',
  'arrow-line-diagonal',
  'arrow-line-down',
  'arrow-line-left',
  'arrow-line-right',
  'arrow-line-up',
  'asteroid',
  'calendar',
  'check-circled',
  'check',
  'close',
  'collapse',
  'comment',
  'download',
  'error',
  'expand',
  'facility',
  'file-archive',
  'file-audio',
  'file-code',
  'file-document',
  'file-generic',
  'file-image',
  'file-spreadsheet',
  'file-video',
  'filter',
  'gas-giant',
  'info',
  'list',
  'location',
  'map',
  'menu',
  'minus',
  'moon',
  'orbiter',
  'pause',
  'play',
  'plus',
  'print',
  'quote',
  'rotate',
  'rover',
  'rss',
  'search',
  'selection',
  'settings',
  'share',
  'slideshow',
  'sound-off',
  'sound-on',
  'subscribe',
  'tag-activity',
  'tag-all',
  'tag-article',
  'tag-bio',
  'tag-blog',
  'tag-data',
  'tag-encyclopedia',
  'tag-event',
  'tag-feature',
  'tag-file',
  'tag-gallery',
  'tag-image',
  'tag-infographic',
  'tag-interactive',
  'tag-landing',
  'tag-launch',
  'tag-media-advisory',
  'tag-movie',
  'tag-notification',
  'tag-podcast',
  'tag-press-release',
  'tag-previously-aired',
  'tag-slideshow',
  'tag-sound',
  'tag-status-update',
  'tag-subscribe',
  'tag-topic',
  'tag-video',
  'terrestrial',
  'view-grid',
  'view-list',
  'view-mosaic',
  'view-single',
  'x-circled',
];

export const AllIcons = {
  name: 'All Icons',
  render: () => `
    <div style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 1.5rem;
    ">
      ${allIcons.map(name => `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 0.5rem;
          border-radius: 4px;
          border: 1px solid var(--hds-palette-border, #d1d1d1);
        ">
          <svg class="hds-icon" aria-hidden="true" focusable="false"
               style="width: 24px; height: 24px; fill: currentColor;">
            <use xlink:href="/assets/img/hds-sprite.svg#${name}"></use>
          </svg>
          <code style="font-size: 10px; text-align: center; word-break: break-all;">${name}</code>
        </div>
      `).join('')}
    </div>
  `,
};

export const ArrowFamily = {
  name: 'Arrow Family',
  render: () => {
    const arrows = allIcons.filter(n => n.startsWith('arrow-'));
    return `
      <p style="margin-bottom: 1rem;">
        Arrow icons grouped by type. Use the palette switcher to verify
        they adapt to all palettes via <code>currentColor</code>.
      </p>
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
      ">
        ${arrows.map(name => `
          <div style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
          ">
            <svg class="hds-icon" aria-hidden="true" focusable="false"
                 style="width: 24px; height: 24px; fill: currentColor; flex-shrink: 0;">
              <use xlink:href="/assets/img/hds-sprite.svg#${name}"></use>
            </svg>
            <code style="font-size: 11px;">${name}</code>
          </div>
        `).join('')}
      </div>
    `;
  },
};

export const TagFamily = {
  name: 'Tag Family',
  render: () => {
    const tags = allIcons.filter(n => n.startsWith('tag-'));
    return `
      <p style="margin-bottom: 1rem;">
        Tag icons for content type indicators.
      </p>
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
      ">
        ${tags.map(name => `
          <div style="
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
          ">
            <svg class="hds-icon" aria-hidden="true" focusable="false"
                 style="width: 24px; height: 24px; fill: currentColor; flex-shrink: 0;">
              <use xlink:href="/assets/img/hds-sprite.svg#${name}"></use>
            </svg>
            <code style="font-size: 11px;">${name}</code>
          </div>
        `).join('')}
      </div>
    `;
  },
};