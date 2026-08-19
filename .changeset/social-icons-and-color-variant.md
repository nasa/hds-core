---
'@nasa-hds/core': minor
---

Add social platform icons and an optional brand-color variant for social icon buttons.

**Added: 23 social and platform marks** in the HDS sprite, plus a `mail` glyph derived from the HDS original `tag-mail`. Covers the platforms NASA maintains an official presence on, the share targets used on nasa.gov and plus.nasa.gov, GitHub, and the app/podcast platforms NASA distributes on (Apple, Android, Google Play, Apple Podcasts). All use the existing `logo-` prefix. Brand hex values are cross-checked against the Simple Icons brand dataset and each platform's published brand page, with the source URL recorded inline in `components/_social.scss`. Glyphs are sourced from nasa.gov (public domain), USWDS `usa-icons` (CC0), and Simple Icons (CC0-1.0), normalized to the HDS geometry convention. Bounding boxes are measured from the rendered path rather than read from the donor viewBox, so baked-in padding does not leak into apparent size, and each glyph then gets a clamped optical-size correction toward the set's median ink coverage — narrowing the visual size spread from 2.99x to 1.86x.

App-store badges ("Download on the App Store", "Get it on Google Play", Amazon Appstore, Roku Channel Store) are deliberately **not** included: Apple and Google both require their badge artwork be used unmodified and un-recolored, so a `currentColor` glyph cannot be a compliant badge. Amazon marks are absent because no CC0 source ships them. Provenance and trademark notice: `src/assets/img/hds-icons/README.md`.

**Added: `.hds-btn-icon--social-color`.** Declare the platform with `data-hds-social="facebook"` and add the class to turn brand color on. The attribute sets custom properties but paints nothing on its own, so the class works on the button or on any ancestor — put it on a wrapper to color a whole row. Buttons with no platform hook (`mail`, `share`, `notification`) keep HDS palette colors by design.

**Two platforms ship a glyph but no brand colour.** LinkedIn and Apple Podcasts publish marks that already contain their own container with the glyph knocked out, so on a coloured circle the container reads twice — and their brand guidelines forbid separating mark from container. They fall back to HDS palette colours in the colour variant. Spotify has the same container but keeps its brand green, accepting the doubling. All three render correctly in black and white, which is each platform's official monochrome logo. See the Icon Button docs for "Bring your own logo" if you need different artwork.

**Generic (non-platform) share targets.** `share`, `notification` (bell), `rss`, and `mail` cover the non-platform buttons in a share row. The HDS Figma spec places these on the NASA Blue **secondary** circle rather than the social circle, since they are on-page actions rather than links out to a platform. `rss` is the exception with a colour of its own, but an HDS one rather than a brand one: `data-hds-social="rss"` supplies a palette-aware blue (NASA Blue on light palettes, NASA Blue Tint on dark). `share`, `notification`, and `mail` stay on HDS palette colours. `mail` is the HDS envelope from `tag-mail` scaled up, not USWDS's envelope.

**Added public custom properties:** `--hds-social-brand`, `--hds-social-brand-image`, `--hds-social-on-brand`. Set these yourself in `@layer site` to support a platform HDS does not ship.

**Changed: the USWDS footer social links now render as HDS social buttons.** `.usa-social-link` becomes an HDS circle instead of USWDS's 10%-black square, and HDS Core now ships replacement assets under the USWDS `usa-icons` filenames so a stock footer picks up HDS marks with **no markup change**. USWDS renders these as `<img>`, which CSS cannot recolor, so replacing the asset is the only route.

Two consequences worth checking before you upgrade:

- If you use the USWDS footer, its social row changes appearance. The 48px touch target is preserved via a pseudo-element even though the visible circle is 32px. Consider the `visual-breaking-change` label territory — review your footer after upgrading.
- `usa-icons/twitter.svg` now contains the **X** mark. USWDS still ships the retired bird under that name, so any site pointing at it was rendering a dead brand. `usa-icons/x.svg` is also provided.
- If you load icon assets from `@uswds/uswds` directly rather than `@nasa-hds/core/assets`, you get stock USWDS icons and none of this applies.

**Notes for review.** The HDS Figma social spec dates from 2020 and predates several rebrands; HDS Core follows Figma for structure and each platform's current official lockup for marks and colors. The B&W fill stays Carbon 60 rather than Figma's Carbon 80 — Carbon 80 measures 1.32:1 against the dark palette. SoundCloud, Telegram, and WhatsApp brand fills fall below 3:1 against their glyphs and rely on the WCAG SC 1.4.11 logotype exception. All flagged for creative director review; see docs/DESIGN.md → Social Icons.
