const palettes = ['white', 'light', 'midtone', 'dark', 'blue', 'black'];

export const paletteA11yParams = {
  a11y: {
    config: {
      rules: [
        { id: 'landmark-unique', enabled: false },
        { id: 'landmark-no-duplicate-banner', enabled: false },
        { id: 'landmark-no-duplicate-contentinfo', enabled: false },
        { id: 'landmark-no-duplicate-main', enabled: false },
      ],
    },
  },
};

export const pseudoParams = {
  chromatic: { disableSnapshot: false },
  hover: { pseudo: { hover: true } },
  focusVisible: { pseudo: { focusVisible: true } },
};

export function paletteRender(renderFn) {
  return () => palettes.map((p) => `<div class="hds-palette-${p}">${renderFn()}</div>`).join('\n');
}
