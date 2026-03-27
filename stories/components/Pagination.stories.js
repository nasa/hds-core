// ============================================================
// Pagination Stories — @nasa/hds-core
// Covers §7 (USWDS .usa-pagination override + HDS simplified)
//
// Sidebar structure:
//   Guidance   — Pagination.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Bounded (default), Unbounded, Simplified
//              (visible in sidebar)
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

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Pagination',
};

// --- Helpers (used in multiple stories) ---

const label = (text) => `<span class="hds-label">${text}</span>`;

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

// --- Guidance embeds — Bounded (MDX only) ---

export const BoundedMiddlePage = {
  name: 'Bounded — middle page',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 20, currentPage: 6 }),
};

export const BoundedNearEnd = {
  name: 'Bounded — near end',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 20, currentPage: 17 }),
};

export const BoundedLastPage = {
  name: 'Bounded — last page',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 20, currentPage: 20 }),
};

export const BoundedFewPages = {
  name: 'Bounded — all pages visible',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 7, currentPage: 1 }),
};

export const BoundedMinimal = {
  name: 'Bounded — 2 pages',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 2, currentPage: 1 }),
};

// --- Guidance embeds — Unbounded (MDX only) ---

export const UnboundedMiddle = {
  name: 'Unbounded — middle',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 100, currentPage: 10, unbounded: true }),
};

// --- Guidance embeds — Simplified (MDX only) ---

export const SimplifiedFirstPage = {
  name: 'Simplified — first page',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 5, currentPage: 1, simplified: true }),
};

export const SimplifiedLastPage = {
  name: 'Simplified — last page',
  tags: ['!dev'],
  render: () => pagination({ totalPages: 5, currentPage: 5, simplified: true }),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(BoundedMiddlePage.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(BoundedMiddlePage.render),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(BoundedMiddlePage.render),
};
