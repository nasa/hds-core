---
'@nasa-hds/core': patch
---

Icons and state indicators now stay visible in forced-colors mode (Windows High Contrast). Forced colors repaints any background color that is not a system color in the page color, which erased icons and fills drawn that way. They now use system colors, which the browser keeps:

- **Accordion:** the chevron is drawn in `ButtonText`. It replaces the USWDS plus/minus icon in this mode, which shared its pseudo-element with the focus ring and vanished whenever the button had focus.
- **Site alert:** the emergency and info icons are drawn in `CanvasText`.
- **Error message:** the icon on `.usa-error-message` (checkbox, radio, text input, and select errors) is drawn in `CanvasText`.
- **Checkbox:** a checked box is filled with `Highlight` with the check cut out of it, so it shows on light and dark themes; before, it looked unchecked on light themes. Disabled and checked uses `GrayText`. The box outline no longer disappears on focus, and the same fix applies to radio buttons.
- **Text input, textarea, and select:** focus now draws a solid outline, as buttons and pagination do, instead of relying on a border that only gets thicker.
- **Side navigation and in-page navigation:** the current-page bar is drawn in `Highlight`, so it reads as a marker instead of a gap in the line.

Default rendering is unchanged. Refs #229.
