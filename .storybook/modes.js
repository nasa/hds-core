// .storybook/modes.js
// ============================================================
// Chromatic palette modes for HDS Core
// @nasa-hds/core
// ============================================================
// Used by FocusTest stories to capture :focus-visible rings
// on each palette background independently.
//
// Import in story files, NOT in preview.js — importing here
// avoids TurboSnap full rebuilds when modes change.
//
// Usage in a story:
//   import { paletteModes } from '../../.storybook/modes';
//
//   parameters: {
//     chromatic: {
//       disableSnapshot: false,
//       modes: paletteModes,
//     },
//   },
// ============================================================

export const paletteModes = {
  white: { palette: 'white' },
  light: { palette: 'light' },
  midtone: { palette: 'midtone' },
  dark: { palette: 'dark' },
  blue: { palette: 'blue' },
  black: { palette: 'black' },
};
