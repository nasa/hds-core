---
'@nasa-hds/core': minor
---

Add motion tokens and apply them across HDS components.

HDS now has a motion scale: two easing curves and four durations, available as `$hds-motion-*` Sass variables and `--hds-motion-*` custom properties. Each duration pairs with one curve, and the pairing rules live in the token descriptions and on the new Foundations → Motion page.

Components that respond to hover — buttons, icon buttons, the primary arrow button, pagination, breadcrumb, side and in-page navigation links, the accordion chevron, and sortable table headers — now transition instead of switching instantly. States arrive on the shortest duration and settle back on a slower one, so a control feels like it is answering you rather than blinking. Focus rings, error states, disabled toggles, and current-page indicators are deliberately excluded and remain instant.

When a visitor has asked for reduced motion, HDS removes its motion entirely rather than shortening it. This works automatically, with no configuration. Motion you write yourself is covered too, as long as you use the custom properties:

```css
.my-thing {
  transition: background-color var(--hds-motion-duration-fast) var(--hds-motion-easing);
}
```

This is a visible change to how existing components feel. Nothing moves that did not move before, and no layout or markup changed, but hover states now take up to half a second to complete. Review any place where you have layered your own hover styling on top of an HDS component.

Three components previously used hardcoded timings (accordion chevron, primary arrow button, pagination). Those now use the token scale, which makes them slightly slower than before.
