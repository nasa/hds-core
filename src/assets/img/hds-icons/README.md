# HDS icon sources

Every file here is compiled into `dist/assets/img/hds-sprite.svg` by `npm run sprite`. Glyphs use `fill="currentColor"` so CSS controls their color.

## Geometry convention

`viewBox="-2 -2 24 24"`, glyph normalized so its bounding box has a maximum dimension of 20 units, centered at (10, 10). The viewBox padding is what makes the 60% icon ratio in `.hds-btn-icon` render glyphs at the Figma-intended size.

Bounding boxes are measured from the rendered path, not taken from the source viewBox, so padding baked into a donor asset does not leak into the glyph's apparent size.

`mail` is derived from the HDS original `tag-mail` by dropping its enclosing circle and letting the normalizer scale the envelope up to the standard envelope. That keeps HDS's own angular envelope rather than substituting USWDS's rounded one — extrapolate from HDS iconography wherever the shape already exists.

### Optical size correction

Bounding-box normalization alone leaves marks looking unevenly sized, because a solid mark (Telegram's plane) carries far more ink than an outline mark (SoundCloud's waves) at the same bounding box. Each glyph therefore gets a scale correction of `sqrt(target_ink / measured_ink)`, where `target_ink` is the median ink coverage across the set, clamped to `[0.92, 1.18]` and hard-capped so no glyph exceeds the 24-unit frame. This narrows the ink spread from 2.99x to 1.86x without distorting any individual mark.

Marks whose official lockup includes its own container (Spotify, LinkedIn, Pinterest, Apple Podcasts) sit at the top of the remaining range, because the container is ink. That is inherent to those marks, not a normalization error.

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
