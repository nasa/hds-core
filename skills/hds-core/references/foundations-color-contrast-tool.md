<!-- Source: ./stories/foundations/ColorContrastTool.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/foundations-color-contrast-tool--docs -->
<style>
  {`
    /* Hide the "Default" column (3rd column) in the Storybook Controls table */
    table.docblock-argstable th:nth-child(3),
    table.docblock-argstable td:nth-child(3) {
      display: none;
    }
    
    /* Force-hide TOC via CSS as a fallback */
    .sbdocs-tocNode, [class^="sbdocs-toc"] {
      display: none !important;
    }
  `}
</style>

# Color Contrast Tool

Check the contrast ratio between any two HDS primitive colors.

> **Note:** HDS palettes handle accessible pairings automatically. This tool is for verifying custom color combinations outside the palette system. For the complete contrast reference, see the accessibility appendix in `docs/508.md`.

<Controls of={ColorContrastToolStories.Checker} />

<Canvas of={ColorContrastToolStories.Checker} sourceState="none" />
