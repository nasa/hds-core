# HDS icon sources

Every file here is compiled into `dist/assets/img/hds-sprite.svg` by `npm run sprite`. Glyphs use `fill="currentColor"` so CSS controls their color.

## Geometry convention

`viewBox="-2 -2 24 24"`, glyph normalized so its bounding box has a maximum dimension of 20 units, centered at (10, 10). The viewBox padding is what makes the 60% icon ratio in `.hds-btn-icon` render glyphs at the Figma-intended size.

Bounding boxes are measured from the rendered path, not taken from the source viewBox, so padding baked into a donor asset does not leak into the glyph's apparent size.

`mail` is derived from the HDS original `tag-mail` by dropping its enclosing circle and letting the normalizer scale the envelope up to the standard envelope. That keeps HDS's own angular envelope rather than substituting USWDS's rounded one — extrapolate from HDS iconography wherever the shape already exists.

### Glyph size inside a circular button

Bounding-box normalization is the whole rule: every glyph's longest side is 20 units. It is deliberately **not** adjusted per-mark for perceived weight.

An earlier revision did apply an ink-coverage correction — scaling thin marks up and solid marks down toward a median. It optimized the wrong thing. In a circular container what reads as "size" is how much of the circle's diameter the mark spans, and the ink correction pushed that in the opposite direction: `logo-x` (a thin outline) grew to 23.5 units and spanned 82% of the circle, while `logo-youtube` (solid) shrank to 13.1 units and spanned 56%. Same nominal envelope, a 1.46x visible difference.

With the plain convention that spread drops to 1.29x, and what remains is purely aspect ratio: a 2.2:1 mark such as `logo-soundcloud` cannot span as much of a circle as a 1:1 mark such as `logo-instagram` without being distorted. That residual is inherent and should not be "corrected".

How large the set renders is a separate, CSS-level decision: `components/_social.scss` sizes social glyphs at 70% of the button rather than the 60% used for UI glyphs, which puts the widest marks at ~82% of the circle's diameter. Tune there, not in the artwork.

## Social and brand mark provenance

Brand marks are third-party trademarks. They are included so NASA sites can link to the platforms NASA is actually present on, and are drawn from sources whose licensing is compatible with this project's CC0-1.0 license.

| Glyph | Source | License |
| --- | --- | --- |
| `logo-facebook`, `logo-instagram`, `logo-x`, `logo-youtube` | nasa.gov footer (`.hds-footer-socials`) | Work of the U.S. government — public domain |
| `logo-linkedin`, `logo-flickr`, `logo-github` | `@uswds/uswds` 3.13 `usa-icons` | CC0 1.0 (GSA) |
| `logo-android`, `logo-apple`, `logo-apple-podcasts`, `logo-giphy`, `logo-google-play`, `logo-pinterest`, `logo-reddit`, `logo-snapchat`, `logo-soundcloud`, `logo-spotify`, `logo-telegram`, `logo-threads`, `logo-tiktok`, `logo-tumblr`, `logo-twitch`, `logo-whatsapp` | [Simple Icons](https://simpleicons.org) 16.28 | CC0 1.0 |
| `mail`, `rss` | HDS original | — |

**An SVG license is not a trademark license.** CC0 covers the SVG transcription of a mark; it grants no rights in the mark itself. Use of each mark is governed by that platform's own brand guidelines. Their inclusion here does not indicate endorsement of NASA by the trademark holder, or of the trademark holder by NASA. Use a mark only to refer to the platform it identifies.

## Marks that carry their own container

Spotify, LinkedIn, and Apple Podcasts publish marks that already contain a disc or rounded square with the glyph knocked out, so on the HDS circle the container reads twice and they look slightly heavier than the rest of a row. Cosmetic only — each renders that platform's official monochrome logo, which is what their guidelines require. Bare variants exist under CC BY 4.0 (Font Awesome), a licence this CC0 package does not carry, so they are not used.

## Not included, and why

**App-store badges** ("Download on the App Store", "Get it on Google Play", "available at amazon appstore", "Roku Channel Store"). Apple requires its badge artwork be used unmodified and forbids recoloring beyond the black or creating localized versions; Google requires its badge be used exactly as supplied and not recolored. Both are fixed lockups containing text, so a monochrome `currentColor` glyph cannot be a compliant badge. Sites needing them should use each vendor's supplied artwork directly.

**Amazon marks** (Fire TV, Amazon Appstore). No CC0-licensed source ships them.

**Roku and Apple TV.** Both are wordmarks rather than icon marks and are illegible at icon-button sizes.

## Deliberate deviations from the 2020 HDS Figma spec

The Figma social spec predates several platform rebrands. Structure (32px circle, BW/Color pairing, glyph proportions) follows Figma; brand marks and colors follow each platform's current official lockup. See `docs/DESIGN.md` → Social Icons for the itemized list.
