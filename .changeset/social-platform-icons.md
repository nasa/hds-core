---
'@nasa-hds/core': minor
---

Add social platform icons to the HDS sprite.

**Added: 23 social and platform marks**, plus a `mail` glyph derived from the HDS original `tag-mail`. Covers the platforms NASA maintains an official presence on, the share targets used on nasa.gov and plus.nasa.gov, GitHub, and the app/podcast platforms NASA distributes on. All use the existing `logo-` prefix.

Glyphs are sourced from nasa.gov (public domain), USWDS `usa-icons` (CC0), and Simple Icons (CC0-1.0), then normalized to the HDS geometry convention. Bounding boxes are measured from the rendered path rather than read from the donor viewBox, so padding baked into a donor asset does not leak into apparent size. Social glyphs render at 70% of the button rather than the 60% used for UI glyphs, since brand marks are denser and read undersized at 60%. Provenance and trademark notice: `src/assets/img/hds-icons/README.md`.

**Grayscale only.** `.hds-btn-icon--social` is the whole component; there is no brand-color variant. The glyph is Carbon 05 on Carbon 60 (6.51:1) on every palette, so no per-platform contrast exception is needed.

**Generic share targets.** `share`, `notification` (bell), `rss`, and `mail` cover the non-platform buttons in a share row. The HDS Figma spec places these on the NASA Blue **secondary** circle rather than the social circle, since they are on-page actions rather than links out to a platform. `mail` is the HDS envelope from `tag-mail` scaled up, not USWDS's envelope.

App-store badges ("Download on the App Store", "Get it on Google Play", Amazon Appstore, Roku Channel Store) are deliberately **not** included: Apple and Google both require their badge artwork be used unmodified and un-recolored, so a `currentColor` glyph cannot be a compliant badge. Amazon marks are absent because no CC0 source ships them.

**Changed: the USWDS footer social links now render as HDS social buttons.** `.usa-social-link` becomes an HDS circle instead of USWDS's 10%-black square, and HDS Core now ships replacement assets under the USWDS `usa-icons` filenames so a stock footer picks up HDS marks with **no markup change**. USWDS renders these as `<img>`, which CSS cannot recolor, so replacing the asset is the only route.

Two consequences worth checking before you upgrade:

- If you use the USWDS footer, its social row changes appearance. The 48px touch target is preserved via a pseudo-element even though the visible circle is 32px. This is `visual-breaking-change` territory — review your footer after upgrading.
- `usa-icons/twitter.svg` now contains the **X** mark. USWDS still ships the retired bird under that name, so any site pointing at it was rendering a dead brand. `usa-icons/x.svg` is also provided.
