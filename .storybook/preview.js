const preview = {
  parameters: {
    a11y: {
      test: 'error',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Getting Started',
          'Roadmap',
          'Foundations',
          'Components',
          ['*', ['Guidance', 'Playground']],
        ],
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
    (Story, context) => {
      const palette = context.globals.palette;
      if (palette === 'none') {
        return Story();
      }
      return `<div class="hds-palette-${palette}" style="padding: 2rem;">${Story()}</div>`;
    },
    (Story) => {
      const html = Story();
      // USWDS JS runs init() on DOMContentLoaded — before Storybook
      // renders story content. Table sort requires button injection
      // into th[data-sortable] elements, which must happen after
      // story DOM is ready. Uses standard USWDS SVG markup — HDS
      // icon styling is applied via CSS mask-image in §16.3.
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
  ],
};

export default preview;
