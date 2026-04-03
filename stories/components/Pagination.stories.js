// ============================================================
// Pagination Stories — @nasa/hds-core
// CSS: components/_pagination.scss
//
// Sidebar structure:
//   Guidance   — Pagination.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Bounded (default), Unbounded, Simplified,
//              All Variants (visible in sidebar)
//
// Numbered variants use HDS icon buttons for prev/next with
// HDS sprite chevrons. Simplified variant uses HDS composed
// buttons (.hds-pagination__simplified-btn).
//
// NOTE: The story helpers generate static HTML snapshots that
// simulate pagination states for demo purposes. On a real site,
// this logic is handled by your application or framework.
// USWDS pagination does not include JavaScript — the developer
// generates the correct markup for each page state.
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Pagination',
};

// --- Helpers (used in multiple stories) ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

const chevronLeft = `
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="/assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg>`;

const chevronRight = `
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="/assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg>`;

/**
 * Build a pagination nav.
 * @param {Object} opts
 * @param {number}  opts.totalPages   - total page count (bounded only)
 * @param {number}  opts.currentPage  - 1-based current page
 * @param {boolean} opts.simplified   - Previous/Next only (no numbers)
 * @param {boolean} opts.unbounded    - unknown total (no last page shown)
 */
const pagination = ({ totalPages = 20, currentPage = 1, simplified = false, unbounded = false } = {}) => {
  const isFirst = currentPage === 1;
  const isLast = !unbounded && currentPage === totalPages;

  // ---- Simplified variant ----
  if (simplified) {
    return `
      <nav class="usa-pagination" aria-label="Pagination">
        <ul class="usa-pagination__list">
          <li class="usa-pagination__item usa-pagination__arrow">
            <button
              class="hds-pagination__simplified-btn"
              ${isFirst ? 'disabled' : ''}
              aria-label="Previous page"
            >
              ${chevronLeft}
              <span class="hds-pagination__simplified-text">Previous</span>
            </button>
          </li>
          <li class="usa-pagination__item usa-pagination__arrow">
            <button
              class="hds-pagination__simplified-btn"
              ${isLast ? 'disabled' : ''}
              aria-label="Next page"
            >
              <span class="hds-pagination__simplified-text">Next</span>
              ${chevronRight}
            </button>
          </li>
        </ul>
      </nav>`;
  }

  // ---- Prev button ----
  const prev = `
    <li class="usa-pagination__item usa-pagination__arrow">
      <button
        class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl"
        aria-label="Previous page"
        ${isFirst ? 'disabled' : ''}
      >${chevronLeft}</button>
    </li>`;

  // ---- Next button ----
  const next = `
    <li class="usa-pagination__item usa-pagination__arrow">
      <button
        class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl"
        aria-label="Next page"
        ${isLast ? 'disabled' : ''}
      >${chevronRight}</button>
    </li>`;

  // ---- Page slots ----
  const slots = buildSlots(totalPages, currentPage, !unbounded);

  const pageItems = slots
    .map((slot) => {
      if (slot === '…') {
        return `<li class="usa-pagination__item usa-pagination__overflow"
          aria-label="ellipsis indicating non-visible pages"><span>…</span></li>`;
      }

      const page = typeof slot === 'object' ? slot.page : slot;
      const isLastPage = typeof slot === 'object' && slot.last;
      const isCurrent = page === currentPage;
      const ariaLabel = isLastPage ? `Last page, page ${page}` : `Page ${page}`;

      return `
        <li class="usa-pagination__item usa-pagination__page-no">
          <a
            class="usa-pagination__button${isCurrent ? ' usa-current' : ''}"
            href="#"
            aria-label="${ariaLabel}"
            ${isCurrent ? 'aria-current="page"' : ''}
          >${page}</a>
        </li>`;
    })
    .join('\n');

  return `
    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">
        ${prev}
        ${pageItems}
        ${next}
      </ul>
    </nav>`;
};

/**
 * Determine which page numbers and ellipses to show.
 *
 * Bounded (known total):
 *   - ≤7 pages: show all
 *   - 8+: show 1, last, current region, ellipsis
 *   - Last page tagged with { page, last: true } for aria-label
 *
 * Unbounded (unknown total):
 *   - No last page shown
 *   - Ends with trailing ellipsis
 *   - Shows extra forward neighbor since no last-page slot
 */
function buildSlots(total, current, bounded = true) {
  if (bounded && total <= 7) {
    const slots = [];
    for (let i = 1; i <= total; i++) {
      slots.push(i === total ? { page: i, last: true } : i);
    }
    return slots;
  }

  const slots = [];
  const nearStart = current <= 4;

  if (bounded) {
    const nearEnd = current >= total - 3;

    if (nearStart) {
      for (let i = 1; i <= 5; i++) slots.push(i);
      slots.push('…');
      slots.push({ page: total, last: true });
    } else if (nearEnd) {
      slots.push(1);
      slots.push('…');
      for (let i = total - 4; i <= total; i++) {
        slots.push(i === total ? { page: i, last: true } : i);
      }
    } else {
      slots.push(1);
      slots.push('…');
      slots.push(current - 1);
      slots.push(current);
      slots.push(current + 1);
      slots.push('…');
      slots.push({ page: total, last: true });
    }
  } else {
    if (nearStart) {
      for (let i = 1; i <= 5; i++) slots.push(i);
      slots.push('…');
    } else {
      slots.push(1);
      slots.push('…');
      slots.push(current - 1);
      slots.push(current);
      slots.push(current + 1);
      slots.push(current + 2);
      slots.push('…');
    }
  }

  return slots;
}

// --- Stories (visible in sidebar) ---

export const Bounded = {
  name: 'Bounded (default)',
  args: {
    totalPages: 20,
    currentPage: 1,
  },
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages — set to 7 or fewer to see all pages without ellipsis',
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Currently active page (1-based)',
    },
  },
  render: (args = {}) => {
    const { totalPages = 20, currentPage = 1 } = args;
    const total = Math.max(1, totalPages);
    const current = Math.min(Math.max(1, currentPage), total);
    return pagination({ totalPages: total, currentPage: current });
  },
};

export const Unbounded = {
  args: {
    currentPage: 3,
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Currently active page (1-based) — no known last page',
    },
  },
  render: (args = {}) => {
    const { currentPage = 3 } = args;
    const current = Math.max(1, currentPage);
    return pagination({ totalPages: 100, currentPage: current, unbounded: true });
  },
};

export const Simplified = {
  args: {
    totalPages: 5,
    currentPage: 2,
  },
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages',
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Currently active page (1-based)',
    },
  },
  render: (args = {}) => {
    const { totalPages = 5, currentPage = 2 } = args;
    const total = Math.max(1, totalPages);
    const current = Math.min(Math.max(1, currentPage), total);
    return pagination({ totalPages: total, currentPage: current, simplified: true });
  },
};

export const AllVariants = {
  name: 'All Variants',
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-unique', enabled: false }],
      },
    },
  },
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Bounded (page 6 of 20)')}
        <div style="margin-top: 0.5rem;">
          ${pagination({ totalPages: 20, currentPage: 6 })}
        </div>
      </div>
      <div>
        ${label('Unbounded (page 10)')}
        <div style="margin-top: 0.5rem;">
          ${pagination({ totalPages: 100, currentPage: 10, unbounded: true })}
        </div>
      </div>
      <div>
        ${label('Simplified (page 2 of 5)')}
        <div style="margin-top: 0.5rem;">
          ${pagination({ totalPages: 5, currentPage: 2, simplified: true })}
        </div>
      </div>
    </div>
  `,
};

// --- Guidance embeds (MDX only) ---

export const BoundedStates = {
  name: 'Bounded states',
  tags: ['!dev'],
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-unique', enabled: false }],
      },
    },
  },
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        ${label('Middle page (6 of 20) — ellipsis on both sides')}
        ${pagination({ totalPages: 20, currentPage: 6 })}
      </div>
      <div>
        ${label('Near end (17 of 20) — ellipsis shifts left')}
        ${pagination({ totalPages: 20, currentPage: 17 })}
      </div>
      <div>
        ${label('Last page (20 of 20) — next arrow disabled')}
        ${pagination({ totalPages: 20, currentPage: 20 })}
      </div>
      <div>
        ${label('All pages visible (7 pages) — no ellipsis')}
        ${pagination({ totalPages: 7, currentPage: 1 })}
      </div>
      <div>
        ${label('Minimal (2 pages)')}
        ${pagination({ totalPages: 2, currentPage: 1 })}
      </div>
    </div>
  `,
};

export const SimplifiedStates = {
  name: 'Simplified states',
  tags: ['!dev'],
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-unique', enabled: false }],
      },
    },
  },
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        ${label('First page — previous disabled')}
        ${pagination({ totalPages: 5, currentPage: 1, simplified: true })}
      </div>
      <div>
        ${label('Last page — next disabled')}
        ${pagination({ totalPages: 5, currentPage: 5, simplified: true })}
      </div>
    </div>
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(AllVariants.render),
};

// --- Focus tests (Chromatic modes + play function) ---

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
  },
};

export const FocusPageNumber = {
  name: 'Focus [page number]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => pagination({ totalPages: 20, currentPage: 6 }),
  play: async ({ canvas, userEvent }) => {
    // Tab past Previous arrow icon button → land on first page number link
    await userEvent.tab(); // Previous arrow (icon button — covered by Icon Button FocusTest)
    await userEvent.tab(); // Page 1 link — STOP
    const pageLink = canvas.getByRole('link', { name: 'Page 1' });
    await expect(pageLink).toHaveFocus();
  },
};

export const FocusSimplified = {
  name: 'Focus [simplified]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => pagination({ totalPages: 5, currentPage: 2, simplified: true }),
  play: async ({ canvas, userEvent }) => {
    // Tab to first simplified button (Previous)
    await userEvent.tab();
    const prevBtn = canvas.getByRole('button', { name: 'Previous page' });
    await expect(prevBtn).toHaveFocus();
  },
};
