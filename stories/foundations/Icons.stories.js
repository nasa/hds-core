export default {
  title: 'Foundations/Icons',
  parameters: {
    layout: 'padded',
  },
};

// ============================================================
// Helpers
// ============================================================

const SPRITE = '/assets/img/hds-sprite.svg';

const icon = (name, size = '1.5rem') => `
  <svg class="hds-icon" aria-hidden="true" focusable="false"
       style="width: ${size}; height: ${size}; fill: currentColor;">
    <use xlink:href="${SPRITE}#${name}"></use>
  </svg>
`;

const iconCell = (name, size = '1.5rem') => `
  <div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
    min-width: 6rem;
    text-align: center;
  ">
    ${icon(name, size)}
    <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">${name}</code>
  </div>
`;

const tagCell = (name) => `
  <div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
    min-width: 7rem;
    text-align: center;
  ">
    ${icon(name, '2.5rem')}
    <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">${name.replace('tag-', '')}</code>
  </div>
`;

const iconGroup = (title, names, size = '1.5rem') => `
  <div style="margin-block-end: 2rem;">
    <h3>${title}</h3>
    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
      ${names.map(n => iconCell(n, size)).join('')}
    </div>
  </div>
`;

// ============================================================
// Icon name lists
// ============================================================

const ARROWS_LINE = [
  'arrow-line-diagonal', 'arrow-line-down', 'arrow-line-left',
  'arrow-line-right', 'arrow-line-up',
];

const ARROWS_CHEVRON = [
  'arrow-chevron-down', 'arrow-chevron-left',
  'arrow-chevron-right', 'arrow-chevron-up',
];

const ARROWS_CIRCLE = [
  'arrow-circle-double-left', 'arrow-circle-double-right',
  'arrow-circle-down', 'arrow-circle-left',
  'arrow-circle-right', 'arrow-circle-up',
];

const ARROWS_FILLED = [
  'arrow-filled-down', 'arrow-filled-left',
  'arrow-filled-right', 'arrow-filled-up',
];

const ACTIONS = [
  'archive', 'calendar', 'check', 'check-circled',
  'close', 'collapse', 'comment', 'download',
  'error', 'expand', 'facility', 'filter',
  'info', 'list', 'location', 'map',
  'menu', 'minus', 'pause', 'play',
  'plus', 'print', 'quote', 'rotate',
  'rss', 'search', 'selection', 'settings',
  'share', 'slideshow', 'sound-off', 'sound-on',
  'subscribe', 'view-grid', 'view-list', 'view-mosaic',
  'view-single', 'x-circled',
];

const SPACE = [
  'asteroid', 'gas-giant', 'moon',
  'orbiter', 'rover', 'terrestrial',
];

const FILES = [
  'file-archive', 'file-audio', 'file-code',
  'file-document', 'file-generic', 'file-image',
  'file-spreadsheet', 'file-video',
];

const TAGS = [
  'tag-activity', 'tag-all', 'tag-article', 'tag-bio',
  'tag-blog', 'tag-data', 'tag-encyclopedia', 'tag-event',
  'tag-feature', 'tag-file', 'tag-gallery', 'tag-image',
  'tag-infographic', 'tag-interactive', 'tag-landing',
  'tag-launch', 'tag-media-advisory', 'tag-movie',
  'tag-notification', 'tag-podcast', 'tag-press-release',
  'tag-previously-aired', 'tag-slideshow', 'tag-sound',
  'tag-status-update', 'tag-subscribe', 'tag-topic', 'tag-video',
];

// ============================================================
// Story 1: System Icons
// ============================================================

export const SystemIcons = {
  name: 'System Icons',
  render: () => `
    <div style="max-width: 72em;">

      <h1>Iconography</h1>
      <p class="usa-intro">
        Icons are recognizable visual symbols that communicate messages at a glance.
        They are used throughout the system to represent common actions and categorize content.
      </p>

      <hr />

      <h2>System Icons</h2>
      <p>
        System icons represent common actions and are used in buttons or alone as
        clickable elements. All icons use <code>currentColor</code> for fill,
        so they automatically adapt to palette context.
      </p>

      ${iconGroup('Arrows / Line', ARROWS_LINE)}
      ${iconGroup('Arrows / Chevron', ARROWS_CHEVRON)}
      ${iconGroup('Arrows / Circle', ARROWS_CIRCLE)}
      ${iconGroup('Arrows / Filled', ARROWS_FILLED)}
      ${iconGroup('Actions &amp; UI', ACTIONS)}
      ${iconGroup('Space &amp; Science', SPACE)}
      ${iconGroup('File Types', FILES)}

    </div>
  `,
};

// ============================================================
// Story 2: Tag Icons
// ============================================================

export const TagIcons = {
  name: 'Tag Icons',
  render: () => `
    <div style="max-width: 72em;">

      <h1>Tag Icons</h1>
      <p class="usa-intro">
        Tag icons represent types of content. They mostly appear in card components
        (often with a label) to help site visitors understand what to expect before
        engaging with content.
      </p>

      <hr />

      <p>
        Tag icons include a built-in circle outline in the glyph itself — they are
        designed to always appear with this container and are optimized for legibility
        at small sizes. Unlike system icons, tag icons are <strong>informational only</strong>
        and do not function as buttons.
      </p>

      <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-block: 2rem;">
        ${TAGS.map(n => tagCell(n)).join('')}
      </div>

      <p style="font-size: 0.875rem; opacity: 0.7;">
        ${TAGS.length} tag icons available. Names in the sprite use the <code>tag-</code> prefix.
      </p>

    </div>
  `,
};

// ============================================================
// Story 3: Usage & Guidelines
// ============================================================

export const UsageGuidelines = {
  name: 'Usage & Guidelines',
  render: () => `
    <div style="max-width: 72em;">

      <h1>Icon Usage &amp; Guidelines</h1>
      <p class="usa-intro">
        Design guidelines, reserved icons, the two-layer architecture,
        and how to use icons in code.
      </p>

      <hr />

      <h2>Icon Design Guidelines</h2>
      <p>
        Icons are designed on a <strong>24×24px</strong> grid (upgraded from the
        original 20×20px). The original 20px icon art is centered within the 24px
        frame with 2px padding on all sides. Depending on context, they appear at
        various sizes in multiples of 4px to align with grid and spacing guidelines.
      </p>
      <p>
        Within the grid, icons use solid shapes or lines with a 2px stroke
        (or 1px if necessary for smaller details). Icons should utilize geometric
        forms and reduce objects to their simplest forms for optimal legibility at
        small sizes.
      </p>

      <div style="display: flex; gap: 2rem; align-items: center; margin-block: 2rem; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="border: 1px dashed var(--hds-palette-border, #D1D1D1); padding: 0.5rem; display: inline-block;">
            ${icon('search', '24px')}
          </div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">24px (1×)</p>
        </div>
        <div style="text-align: center;">
          <div style="border: 1px dashed var(--hds-palette-border, #D1D1D1); padding: 0.5rem; display: inline-block;">
            ${icon('search', '32px')}
          </div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">32px</p>
        </div>
        <div style="text-align: center;">
          <div style="border: 1px dashed var(--hds-palette-border, #D1D1D1); padding: 0.5rem; display: inline-block;">
            ${icon('search', '48px')}
          </div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">48px</p>
        </div>
      </div>

      <hr />

      <h2>Reserved Icons</h2>
      <p>
        Certain icons are reserved for specific uses to ensure continuity across the system.
        Do not use these icons for other purposes.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Icon</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Name</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Reserved Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">${icon('arrow-line-right')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>arrow-line-right</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Primary button, blog navigation (forward)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">${icon('arrow-line-left')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>arrow-line-left</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Blog navigation (back)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">${icon('arrow-line-down')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>arrow-line-down</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Table of contents</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">${icon('arrow-line-diagonal')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>arrow-line-diagonal</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">External link arrow (leaving NASA)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">${icon('arrow-chevron-down')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>arrow-chevron-*</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Pagination, carousels, accordions, slideshows</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">${icon('arrow-circle-up')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>arrow-circle-up/down</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Explore button, scroll-to-continue prompt</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem;">${icon('arrow-filled-down')}</td>
            <td style="padding: 0.75rem;"><code>arrow-filled-*</code></td>
            <td style="padding: 0.75rem;">Table column sorts</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Two-Layer Architecture</h2>
      <p>
        HDS Core separates icon glyphs from their containers. This means a single
        SVG file works across all palettes and contexts — the CSS controls the color.
      </p>

      <div style="display: flex; gap: 3rem; align-items: flex-start; margin-block: 2rem; flex-wrap: wrap;">
        <div>
          <p class="hds-eyebrow" style="margin-block-end: 0.5rem;">Layer 1: Glyph</p>
          <div style="padding: 1rem; border: 1px dashed var(--hds-palette-border, #D1D1D1); display: inline-block;">
            ${icon('download', '2rem')}
          </div>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
            Single-color SVG using <code>currentColor</code>.<br>
            Inherits text color from parent.
          </p>
        </div>
        <div>
          <p class="hds-eyebrow" style="margin-block-end: 0.5rem;">Layer 2: Container</p>
          <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">
            ${icon('download', '1em')}
          </button>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
            CSS-styled circle via <code>.hds-btn-icon</code>.<br>
            Color set by role modifier.
          </p>
        </div>
        <div>
          <p class="hds-eyebrow" style="margin-block-end: 0.5rem;">Inline Glyph</p>
          <span>
            Download file
            <svg class="hds-glyph" aria-hidden="true" focusable="false">
              <use xlink:href="${SPRITE}#download"></use>
            </svg>
          </span>
          <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
            Bare icon via <code>.hds-glyph</code>.<br>
            No button container needed.
          </p>
        </div>
      </div>

      <p>
        <strong>Tag icons are an exception</strong> — their circle outline is baked into the glyph
        because they always appear with it. They are informational labels, not interactive elements.
      </p>

      <hr />

      <h2>Adding New Icons</h2>
      <p>
        When the HDS icon set doesn't include what you need:
      </p>
      <ol>
        <li><strong>Check USWDS icons first</strong> — USWDS includes a large icon set.
          See the <a class="usa-link usa-link--external" href="https://designsystem.digital.gov/components/icon/">USWDS Icon component<span class="usa-sr-only">(external)</span></a>.</li>
        <li><strong>Check Material Icons</strong> — included in the USWDS package.
          Prefer <strong>filled glyphs</strong> over outlined for consistency with HDS style.</li>
        <li><strong>Avoid mixing</strong> with non-USWDS/Material icon sets to maintain visual consistency.</li>
        <li><strong>Custom icons</strong> should follow HDS design guidelines: 24×24px grid,
          2px stroke, geometric forms, optimized for small sizes. New icons go through
          the HDS design review process.</li>
      </ol>

      <hr />

      <h2>Using Icons in Code</h2>

      <h3>SVG Sprite (Recommended)</h3>
      <pre><code>&lt;svg class="hds-icon" aria-hidden="true" focusable="false"&gt;
  &lt;use xlink:href="/assets/img/hds-sprite.svg#download"&gt;&lt;/use&gt;
&lt;/svg&gt;</code></pre>

      <h3>Inline Glyph (No Container)</h3>
      <pre><code>&lt;span&gt;
  Download file
  &lt;svg class="hds-glyph" aria-hidden="true" focusable="false"&gt;
    &lt;use xlink:href="/assets/img/hds-sprite.svg#download"&gt;&lt;/use&gt;
  &lt;/svg&gt;
&lt;/span&gt;</code></pre>

      <h3>Icon Button</h3>
      <pre><code>&lt;button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download"&gt;
  &lt;svg class="hds-icon" aria-hidden="true" focusable="false"&gt;
    &lt;use xlink:href="/assets/img/hds-sprite.svg#download"&gt;&lt;/use&gt;
  &lt;/svg&gt;
&lt;/button&gt;</code></pre>

      <h3>Accessibility</h3>
      <ul>
        <li>Decorative icons: <code>aria-hidden="true"</code> + <code>focusable="false"</code></li>
        <li>Icon-only buttons: add <code>aria-label</code> to the button</li>
        <li>Icons with visible text: the text provides the label, icon is decorative</li>
      </ul>

      <hr />

      <h2>Icon Count</h2>
      <table style="border-collapse: collapse; margin-block: 1rem;">
        <tbody>
          <tr>
            <td style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">System icons (arrows, actions, space, files)</td>
            <td style="padding: 0.5rem 1rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><strong>${ARROWS_LINE.length + ARROWS_CHEVRON.length + ARROWS_CIRCLE.length + ARROWS_FILLED.length + ACTIONS.length + SPACE.length + FILES.length}</strong></td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 1rem;">Tag icons (content type labels)</td>
            <td style="padding: 0.5rem 1rem;"><strong>${TAGS.length}</strong></td>
          </tr>
        </tbody>
      </table>

    </div>
  `,
};