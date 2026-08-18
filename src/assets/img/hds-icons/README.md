# HDS icon sources

Every file here is compiled into `dist/assets/img/hds-sprite.svg` by `npm run sprite`. Glyphs use `fill="currentColor"` so CSS controls their color.

## Geometry convention

`viewBox="-2 -2 24 24"`, glyph normalized so its bounding box has a maximum dimension of 20 units, centered at (10, 10). The viewBox padding is what makes the 60% icon ratio in `.hds-btn-icon` render glyphs at the Figma-intended size.

## Social and brand mark provenance

Brand marks are third-party trademarks. They are included so NASA sites can link to the platforms NASA is actually present on, and are drawn from sources whose licensing is compatible with this project's CC0-1.0 license.

| Glyph | Source | License |
| --- | --- | --- |
| `logo-facebook`, `logo-instagram`, `logo-x`, `logo-youtube` | nasa.gov footer (`.hds-footer-socials`) | Work of the U.S. government — public domain |
| `logo-linkedin`, `logo-flickr`, `logo-github`, `mail` | `@uswds/uswds` 3.13 `usa-icons` | CC0 1.0 (GSA) |
| `logo-giphy`, `logo-pinterest`, `logo-reddit`, `logo-snapchat`, `logo-soundcloud`, `logo-spotify`, `logo-telegram`, `logo-threads`, `logo-tiktok`, `logo-tumblr`, `logo-twitch`, `logo-whatsapp` | [Simple Icons](https://simpleicons.org) 16.28 | CC0 1.0 |
| `rss` | HDS original | — |

**An SVG license is not a trademark license.** CC0 covers the SVG transcription of a mark; it grants no rights in the mark itself. Use of each mark is governed by that platform's own brand guidelines. Their inclusion here does not indicate endorsement of NASA by the trademark holder, or of the trademark holder by NASA. Use a mark only to refer to the platform it identifies.

Brand colors for the optional color variant are **not** in `tokens.json` — see `src/scss/components/_social.scss` for why, and for the values.

## Deliberate deviations from the 2020 HDS Figma spec

The Figma social spec predates several platform rebrands. Structure (32px circle, BW/Color pairing, glyph proportions) follows Figma; brand marks and colors follow each platform's current official lockup. See `docs/DESIGN.md` → Social Icons for the itemized list.
