const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Foundations',
          'Components',
          ['*', ['Guidance', 'Reference', 'Playground']],
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
          { value: 'none', title: 'None (default)' },
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
  ],
};

export default preview;
