---
'@nasa-hds/core': minor
---

Upgrade to USWDS 3.14.0 and update breadcrumb guidance.

The peer dependency moves to `@uswds/uswds ^3.14.0`. No public HDS symbol is added or removed, but the compiled surface and adopter-facing behavior change in ways worth calling out:

- **Accordion icon position.** USWDS 3.14.0 flipped its default expand/collapse icon to the leading (left) edge. HDS pins `$theme-accordion-icon-position: 'end'` in both theme files to keep the circled chevron on the trailing edge, matching the Figma spec. The new USWDS `usa-accordion--icon-start` / `usa-accordion--icon-end` modifier classes are not supported by HDS Core at this time.
- **Breadcrumb variant model.** USWDS made wrapping the default and moved single-line truncation to a new `usa-breadcrumb--truncate` class (`usa-breadcrumb--wrap` is now inert). The HDS override retargets to `:not(--truncate)` so it stays correct against the new default, and the `--truncate` variant now clips only horizontally so the HDS focus ring stays visible. `--truncate` is documented as unsupported for new work.
- **Breadcrumb long titles.** The current-page label is capped with an ellipsis (`max-width: 40ch`) as a safety net for long titles. Only the non-link current page is ever clipped; ancestor links are always shown in full.
- **Breadcrumb guidance reframed.** The docs no longer recommend hand-authoring each trail. A new "Generating breadcrumbs" section shows producing the HDS pattern from the site tree (Hugo example), plus long-title guidance and a structured-data (RDFa) example.
- **Memorable date markup.** The multi-step form guide adopts the USWDS 3.14.0 per-field hint pattern (group hint `aria-hidden`, per-field `usa-hint usa-sr-only` referenced by each field's `aria-describedby`).
- **Accessibility fixes reaching adopters through the bundle.** The file input error border changes from blue to red under the HDS theme, the range slider border gains contrast, and modal, character count, banner, and language selector behaviors improve. See `docs/508.md` for the full updated conformance record.

**Sass consumption path floor.** USWDS 3.14.0 requires Dart Sass >= 1.99.0. Adopters who consume HDS via the `./scss` entry points must be on Dart Sass 1.99.0 or newer; the compiled-CSS path (`./css`) is unaffected.
