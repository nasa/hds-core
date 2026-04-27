import { hdsUiIcons, hdsTagIcons, hdsLogoIcons } from '../helpers/icons';

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
const USWDS_SPRITE = '/assets/img/sprite.svg';

const icon = (name, size = '1.5rem', sprite = SPRITE) => `
  <svg class="hds-icon" aria-hidden="true" focusable="false"
       style="width: ${size}; height: ${size}; fill: currentColor;">
    <use xlink:href="${sprite}#${name}"></use>
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
      ${names.map((n) => iconCell(n, size)).join('')}
    </div>
  </div>
`;

// ============================================================
// Derived subcategories from shared icon arrays
// ============================================================

const byPrefix = (arr, prefix) => arr.filter((n) => n.startsWith(prefix));
const without = (arr, ...prefixes) => arr.filter((n) => !prefixes.some((p) => n.startsWith(p)));

const ARROWS_LINE = byPrefix(hdsUiIcons, 'arrow-line-');
const ARROWS_CHEVRON = byPrefix(hdsUiIcons, 'arrow-chevron-');
const ARROWS_CIRCLE = byPrefix(hdsUiIcons, 'arrow-circle-');
const ARROWS_FILLED = byPrefix(hdsUiIcons, 'arrow-filled-');
const FILES = byPrefix(hdsUiIcons, 'file-');
const SPACE = ['asteroid', 'gas-giant', 'moon', 'orbiter', 'rover', 'terrestrial'].filter((n) =>
  hdsUiIcons.includes(n),
);
const ACTIONS = without(hdsUiIcons, 'arrow-', 'file-', 'logo-').filter((n) => !SPACE.includes(n));

// ============================================================
// Stories
// ============================================================

export const SystemIcons = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 72em;">
      ${iconGroup('Arrows / Line', ARROWS_LINE)}
      ${iconGroup('Arrows / Chevron', ARROWS_CHEVRON)}
      ${iconGroup('Arrows / Circle', ARROWS_CIRCLE)}
      ${iconGroup('Arrows / Filled', ARROWS_FILLED)}
      ${iconGroup('Actions & UI', ACTIONS)}
      ${iconGroup('Space & Science', SPACE)}
      ${iconGroup('File Types', FILES)}
    </div>
  `,
};

export const TagIconsGrid = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 72em;">
      <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
        ${hdsTagIcons.map((n) => tagCell(n)).join('')}
      </div>
      <p style="font-size: 0.875rem; opacity: 0.7; margin-block-start: 1rem;">
        ${hdsTagIcons.length} tag icons available. Names in the sprite use the <code>tag-</code> prefix.
      </p>
    </div>
  `,
};

export const LogoIcons = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 72em;">
      <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
        ${hdsLogoIcons.map((n) => iconCell(n, '2rem')).join('')}
      </div>
      <p style="font-size: 0.875rem; opacity: 0.7; margin-block-start: 1rem;">
        ${hdsLogoIcons.length} logo icons available. Names in the sprite use the <code>logo-</code> prefix.
      </p>
    </div>
  `,
};

export const SizingDemo = {
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <div style="border: 1px dashed #D1D1D1; padding: 0.5rem; display: inline-block;">
          ${icon('search', '24px')}
        </div>
        <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">24px (1×)</p>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px dashed #D1D1D1; padding: 0.5rem; display: inline-block;">
          ${icon('search', '32px')}
        </div>
        <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">32px</p>
      </div>
      <div style="text-align: center;">
        <div style="border: 1px dashed #D1D1D1; padding: 0.5rem; display: inline-block;">
          ${icon('search', '48px')}
        </div>
        <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.25rem;">48px</p>
      </div>
    </div>
  `,
};

export const ReservedIcons = {
  tags: ['!dev'],
  render: () => `
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
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">${icon('arrow-line-right')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-right</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Primary button, blog navigation (forward)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">${icon('arrow-line-left')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-left</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Blog navigation (back)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">${icon('arrow-line-down')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-down</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Table of contents</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">${icon('arrow-line-diagonal')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-line-diagonal</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">External link arrow (leaving NASA)</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">${icon('arrow-chevron-down')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-chevron-*</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Pagination, carousels, accordions, slideshows</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">${icon('arrow-circle-up')}</td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;"><code>arrow-circle-up/down</code></td>
            <td style="padding: 0.75rem; border-bottom: 1px solid #E3E3E3;">Explore button, scroll-to-continue prompt</td>
          </tr>
          <tr>
            <td style="padding: 0.75rem;">${icon('arrow-filled-down')}</td>
            <td style="padding: 0.75rem;"><code>arrow-filled-*</code></td>
            <td style="padding: 0.75rem;">Table column sorts</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};

export const TwoLayerDemo = {
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; gap: 3rem; align-items: flex-start; flex-wrap: wrap;">
      <div>
        <p class="hds-overline" style="margin-block-end: 0.5rem;">Layer 1: Glyph</p>
        <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">
          ${icon('download', '2rem')}
        </div>
        <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
          Single-color SVG using <code>currentColor</code>.<br>
          Inherits text color from parent.
        </p>
      </div>
      <div>
        <p class="hds-overline" style="margin-block-end: 0.5rem;">Layer 2: Container</p>
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download">
          ${icon('download', '1em')}
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
            <use xlink:href="${SPRITE}#download"></use>
          </svg>
        </span>
        <p style="font-size: 0.75rem; opacity: 0.7; margin-block-start: 0.5rem;">
          Bare icon via <code>.hds-glyph</code>.<br>
          No button container needed.
        </p>
      </div>
    </div>
  `,
};

export const UswdsIconDemo = {
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 72em;">
      <div style="display: flex; gap: 3rem; align-items: flex-start; flex-wrap: wrap;">
        <div style="text-align: center;">
          <p class="hds-overline" style="margin-block-end: 0.5rem;">HDS sprite</p>
          <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">
            ${icon('download', '2rem', SPRITE)}
          </div>
          <p style="font-size: 0.65rem; opacity: 0.7; margin-block-start: 0.5rem;">
            <code>hds-sprite.svg#download</code>
          </p>
        </div>
        <div style="text-align: center;">
          <p class="hds-overline" style="margin-block-end: 0.5rem;">USWDS sprite</p>
          <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">
            ${icon('thumb_up_alt', '2rem', USWDS_SPRITE)}
          </div>
          <p style="font-size: 0.65rem; opacity: 0.7; margin-block-start: 0.5rem;">
            <code>sprite.svg#thumb_up_alt</code>
          </p>
        </div>
        <div style="text-align: center;">
          <p class="hds-overline" style="margin-block-end: 0.5rem;">USWDS (Material)</p>
          <div style="padding: 1rem; border: 1px dashed #D1D1D1; display: inline-block;">
            ${icon('science', '2rem', USWDS_SPRITE)}
          </div>
          <p style="font-size: 0.65rem; opacity: 0.7; margin-block-start: 0.5rem;">
            <code>sprite.svg#science</code>
          </p>
        </div>
      </div>
    </div>
  `,
};

// ============================================================
// Visual Regression (Chromatic only — not shown in sidebar)
// ============================================================

export const SpriteRegression = {
  tags: ['!dev'],
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  render: () => {
    const allIcons = [...hdsUiIcons, ...hdsTagIcons, ...hdsLogoIcons];
    return `
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fill, 64px);
        gap: 4px;
        padding: 1rem;
        color: #1b1b1b;
      ">
        ${allIcons
          .map(
            (name) => `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            padding: 4px;
          ">
            ${icon(name, '40px')}
            <span style="font-size: 0.5rem; opacity: 0.6; text-align: center; word-break: break-all;">${name}</span>
          </div>
        `,
          )
          .join('')}
      </div>
      <p style="font-size: 0.75rem; color: #71767a; padding: 0 1rem;">
        ${allIcons.length} glyphs from hds-sprite.svg — visual regression baseline
      </p>
    `;
  },
};
