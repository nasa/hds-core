---
'@nasa-hds/core': minor
---

Add social platform icons and an optional brand-color variant for social icon buttons.

**Added: 19 social platform marks** in the HDS sprite, plus a plain `mail` glyph. Covers the platforms NASA maintains an official presence on, the share targets used on nasa.gov and plus.nasa.gov, and GitHub. All use the existing `logo-` prefix. Sourced from nasa.gov (public domain), USWDS `usa-icons` (CC0), and Simple Icons (CC0-1.0), normalized to the HDS geometry convention. Provenance and trademark notice: `src/assets/img/hds-icons/README.md`.

**Added: `.hds-btn-icon--social-color`.** Declare the platform with `data-hds-social="facebook"` and add the class to turn brand color on. The attribute sets custom properties but paints nothing on its own, so the class works on the button or on any ancestor — put it on a wrapper to color a whole row. Buttons with no platform hook (`rss`, `mail`) keep HDS palette colors by design.

**Added public custom properties:** `--hds-social-brand`, `--hds-social-brand-image`, `--hds-social-on-brand`. Set these yourself in `@layer site` to support a platform HDS does not ship.

**Changed: the USWDS footer social links now render as HDS social buttons.** `.usa-social-link` becomes an HDS circle instead of USWDS's 10%-black square, and HDS Core now ships replacement assets under the USWDS `usa-icons` filenames so a stock footer picks up HDS marks with **no markup change**. USWDS renders these as `<img>`, which CSS cannot recolor, so replacing the asset is the only route.

Two consequences worth checking before you upgrade:

- If you use the USWDS footer, its social row changes appearance. The 48px touch target is preserved via a pseudo-element even though the visible circle is 32px. Consider the `visual-breaking-change` label territory — review your footer after upgrading.
- `usa-icons/twitter.svg` now contains the **X** mark. USWDS still ships the retired bird under that name, so any site pointing at it was rendering a dead brand. `usa-icons/x.svg` is also provided.
- If you load icon assets from `@uswds/uswds` directly rather than `@nasa-hds/core/assets`, you get stock USWDS icons and none of this applies.

**Notes for review.** The HDS Figma social spec dates from 2020 and predates several rebrands; HDS Core follows Figma for structure and each platform's current official lockup for marks and colors. The B&W fill stays Carbon 60 rather than Figma's Carbon 80 — Carbon 80 measures 1.32:1 against the dark palette. SoundCloud, Telegram, and WhatsApp brand fills fall below 3:1 against their glyphs and rely on the WCAG SC 1.4.11 logotype exception. All flagged for creative director review; see docs/DESIGN.md → Social Icons.
