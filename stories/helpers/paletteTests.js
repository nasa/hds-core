const palettes = ['white', 'light', 'midtone', 'dark', 'blue', 'black'];

export const paletteA11yParams = {
  chromatic: { disableSnapshot: false },
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
  // Hover states now transition in over the blink duration, so Chromatic can
  // catch a half-finished colour if it snapshots immediately. The delay covers
  // the longest hover transition with room to spare. The chromatic block also
  // repeats disableSnapshot because story files spread this after
  // paletteA11yParams, and the spread replaces the whole object.
  hover: {
    pseudo: { hover: true },
    chromatic: { disableSnapshot: false, delay: 600 },
  },
  focusVisible: { pseudo: { focusVisible: true } },
};

export function paletteRender(renderFn) {
  return () =>
    palettes.map((p) => `<div class="hds-palette-${p}" style="padding: 2rem;">${renderFn()}</div>`).join('\n');
}
