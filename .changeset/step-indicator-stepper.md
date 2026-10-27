---
'@nasa-hds/core': minor
---

Add the HDS Step Indicator (the Figma Stepper), an experimental restyle of USWDS `.usa-step-indicator`.

Existing USWDS step indicator markup picks up HDS styles with no changes: 6px bars in palette-aware blues on all six palettes, titles and captions from the HDS type ramp, and no white box behind the bars on dark palettes. Segments now fill the row instead of stopping at 240px, and the gap between them is 4px.

New, all in the `usa-step-indicator` namespace:

- `.usa-step-indicator--condensed`: bars only, with a "Step X of Y" line from the USWDS header. Default step indicators collapse to this form below 640px.
- `.usa-step-indicator__segment--error`: a red bar and alert icon for a step whose answers need fixing.
- `.usa-step-indicator__segment-caption`: an optional line under each step title.
- `--hds-palette-step-track`, `--hds-palette-step-complete`, and `--hds-palette-step-current` palette custom properties.

Completed steps now show a check icon. Below 640px, step titles are hidden visually rather than removed, so screen readers still read every step's name. See Components → Step Indicator in Storybook.
