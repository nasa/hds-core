---
'@nasa/hds-core': minor
---

Focus ring system — new mixins

**Added: `hds-focus-ring-inline` mixin** for inline and multiline elements (links, unstyled buttons, breadcrumbs). Renders a four-sided dashed ring via `repeating-linear-gradient` matching the Figma `2,3` dash spec. Fragments correctly per line box on wrapped text.

**Added: `hds-focus-ring-size($circle-size-px)` mixin** for overriding circle ring geometry on icon button size modifiers without re-declaring the full mixin.
