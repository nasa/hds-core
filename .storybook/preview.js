// ============================================================
// HDS Core Storybook Preview Configuration
// @nasa/hds-core
// ============================================================
// Configures the story rendering environment: palette toolbar,
// viewport presets, accessibility testing, story sort order,
// docs settings, and decorators.
// ============================================================

import initInPageNav from './utils/in-page-nav-init';

const preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
    chromatic: { disableSnapshot: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
      toc: {
        headingSelector: 'h2, h3',
        title: 'On this page',
      },
    },
    options: {
      storySort: {
        includeNames: true,
        order: [
          'Overview',
          ['Introduction', 'Design Standards', 'Getting Started', 'Installation', 'Roadmap'],
          'Foundations',
          'Components',
          ['*', ['Guidance', '*']],
          'Guides',
          ['Existing USWDS Site', 'React', 'No-Build Environments', 'Sass Configuration'],
        ],
      },
    },
    viewport: {
      options: {
        mobile: {
          name: 'Mobile (320px)',
          styles: { width: '320px', height: '568px' },
        },
        mobileLg: {
          name: 'Mobile LG (480px)',
          styles: { width: '480px', height: '896px' },
        },
        tablet: {
          name: 'Tablet (640px)',
          styles: { width: '640px', height: '1024px' },
        },
        tabletLg: {
          name: 'Tablet LG (880px)',
          styles: { width: '880px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop (1024px)',
          styles: { width: '1024px', height: '768px' },
        },
        desktopLg: {
          name: 'Desktop LG (1200px)',
          styles: { width: '1200px', height: '900px' },
        },
        widescreen: {
          name: 'Widescreen (1400px)',
          styles: { width: '1400px', height: '900px' },
        },
        tv: {
          name: 'TV (1920px) — no CSS breakpoint yet',
          styles: { width: '1920px', height: '1080px' },
        },
      },
    },
  },
  globalTypes: {
    palette: {
      description: 'HDS Palette',
      defaultValue: 'none',
      toolbar: {
        title: 'Palette',
        icon: 'paintbrush',
        items: [
          { value: 'none', title: 'No palette (default)' },
          { value: 'white', title: 'White' },
          { value: 'light', title: 'Light' },
          { value: 'midtone', title: 'Midtone' },
          { value: 'dark', title: 'Dark' },
          { value: 'blue', title: 'Blue' },
          { value: 'black', title: 'Black (header/footer)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    // Palette wrapper — wraps story content in palette class
    // when a palette is selected via the toolbar
    (Story, context) => {
      const palette = context.globals.palette;
      if (palette === 'none') {
        return Story();
      }
      return `<div class="hds-palette-${palette}" style="padding: 2rem;">${Story()}</div>`;
    },

    // USWDS accordion initial state — USWDS JS attaches
    // delegated click handlers to document.body on
    // DOMContentLoaded (before Storybook renders stories),
    // so expand/collapse interactivity works automatically.
    // But USWDS never set the initial hidden state on elements
    // that didn't exist at DOMContentLoaded. This decorator
    // collapses accordion panels whose trigger has
    // aria-expanded="false" and hides mobile nav elements.
    //
    // NOT shipped to consumers. In production, uswds.min.js
    // handles initial state natively on page load.
    (Story) => {
      const html = Story();

      setTimeout(() => {
        // Collapse accordion panels whose button starts closed
        document.querySelectorAll('.usa-accordion__button[aria-expanded="false"]').forEach((btn) => {
          const id = btn.getAttribute('aria-controls');
          if (!id) return;
          const content = document.getElementById(id);
          if (content) content.hidden = true;
        });

        // Hide mobile nav (USWDS shows via .is-visible on toggle)
        document.querySelectorAll('.usa-nav:not(.is-visible)').forEach((nav) => {
          nav.setAttribute('hidden', '');
        });
      }, 0);

      return html;
    },

    // USWDS table sort initialization — USWDS JS runs init() on
    // DOMContentLoaded, before Storybook renders story content.
    // Table sort requires button injection into th[data-sortable]
    // elements, which must happen after story DOM is ready.
    // setTimeout(0) defers to the next microtask, after Storybook
    // has inserted the story HTML into the DOM.
    (Story) => {
      const html = Story();

      setTimeout(() => {
        const headers = document.querySelectorAll('th[data-sortable]:not(:has(.usa-table__header__button))');
        if (!headers.length) return;

        headers.forEach((header) => {
          const button = document.createElement('button');
          button.setAttribute('tabindex', '0');
          button.classList.add('usa-table__header__button');
          // Standard USWDS SVG — visually replaced by CSS mask-image,
          // kept in DOM for accessibility and High Contrast Mode.
          button.innerHTML = `
            <svg class="usa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g class="descending" fill="transparent">
                <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z" />
              </g>
              <g class="ascending" fill="transparent">
                <path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z" />
              </g>
              <g class="unsorted" fill="transparent">
                <polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"/>
              </g>
            </svg>`;

          const headerName = header.innerText;
          const isSorted = header.getAttribute('aria-sort');
          const sortState = isSorted && isSorted !== 'none' ? `sorted ${isSorted}` : 'unsorted';
          header.setAttribute('aria-label', `${headerName}, sortable column, currently ${sortState}`);
          button.setAttribute(
            'title',
            `Click to sort by ${headerName} in ${isSorted === 'ascending' ? 'descending' : 'ascending'} order.`,
          );

          header.appendChild(button);
        });

        // Set data-sort-active on pre-sorted columns so sorted
        // column background styling applies on first render.
        document.querySelectorAll('th[data-sortable][aria-sort]').forEach((header) => {
          const sortValue = header.getAttribute('aria-sort');
          if (!sortValue || sortValue === 'none') return;

          const table = header.closest('.usa-table');
          if (!table) return;
          const tbody = table.querySelector('tbody');
          if (!tbody) return;
          const headerIndex = Array.from(header.parentNode.children).indexOf(header);

          tbody.querySelectorAll('tr').forEach((tr) => {
            Array.from(tr.children).forEach((td) => td.removeAttribute('data-sort-active'));
            if (tr.children[headerIndex]) {
              tr.children[headerIndex].setAttribute('data-sort-active', 'true');
            }
          });
        });
      }, 0);

      return html;
    },

    // USWDS in-page navigation initialization — same timing
    // issue as table sort. USWDS JS expects .usa-in-page-nav
    // elements to exist on DOMContentLoaded, but Storybook
    // injects story content after that. setTimeout(0) defers
    // init until after the story HTML is in the DOM.
    //
    // Uses ported USWDS createInPageNav() logic from
    // .storybook/utils/in-page-nav-init.js. Idempotent —
    // skips elements that already contain a built nav.
    //
    // NOT shipped to consumers. In production, uswds.min.js
    // handles initialization natively.
    (Story) => {
      const html = Story();

      setTimeout(() => {
        initInPageNav(document);
      }, 0);

      return html;
    },
  ],
};

export default preview;
