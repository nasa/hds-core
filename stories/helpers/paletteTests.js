const palettes = ['light', 'midtone', 'dark', 'blue', 'black'];

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

export function paletteRender(renderFn, state) {
  const stateClass = state ? ` pseudo-${state}` : '';
  return () => palettes.map((p) => `<div class="hds-palette-${p}${stateClass}">${renderFn()}</div>`).join('\n');
}
