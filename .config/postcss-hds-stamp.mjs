/**
 * ============================================================
 * HDS Version Stamp — PostCSS plugin
 * @nasa-hds/core
 * ============================================================
 * Puts the HDS and USWDS versions inside the compiled CSS, so a
 * deployed stylesheet can answer "what am I running?" on its own.
 *
 * Adopters without a build step copy `dist/` onto a server and lose
 * every other trace of provenance: no package.json, no lockfile, no
 * install log. Support requests then start from a file nobody can
 * identify, and pre-v1.0 minors that rename custom properties are
 * impossible to reason about. USWDS solves this the same way — its
 * own dist ships `/*! uswds v3.13.0 *​/`.
 *
 * WHAT IT EMITS
 *   1. A banner comment at the top of every bundle. `/*!` survives
 *      postcss-discard-comments and cssnano, which is why the plugin
 *      also runs last in the chain.
 *   2. `--hds-version` and `--hds-uswds-version` on `:root`, in
 *      hds.min.css only. Both are machine-readable at runtime:
 *
 *        getComputedStyle(document.documentElement)
 *          .getPropertyValue('--hds-version')
 *
 *      Only the required bundle carries them. Emitting the same
 *      property from all three would let a stale add-on copy silently
 *      win the cascade and misreport the version; the per-file banner
 *      is what identifies the optional bundles.
 *   3. A real version in USWDS's own banner. HDS compiles USWDS from
 *      source, where the string is the literal placeholder
 *      `uswds @version` — USWDS substitutes it in its own build, so
 *      without this our bundles would ship the unsubstituted token.
 *
 * The versions are read at build time, so the stamp follows the
 * changesets version bump with no file to regenerate or keep in sync.
 * ============================================================
 */

import fs from 'node:fs';

const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const HDS_VERSION = read('./package.json').version;
const USWDS_VERSION = read('./node_modules/@uswds/uswds/package.json').version;

/** Bundles that carry the custom properties, keyed by output filename. */
const STAMPS_PROPERTIES = new Set(['hds.min.css', 'hds.css']);

export default function hdsStamp() {
  return {
    postcssPlugin: 'postcss-hds-stamp',

    OnceExit(root, { result, Comment, Rule, Declaration, AtRule }) {
      const file = result.opts.to ? result.opts.to.split('/').pop() : '';

      // USWDS's placeholder banner, emitted from its Sass source.
      root.walkComments((comment) => {
        if (comment.text.includes('uswds @version')) {
          comment.text = comment.text.replace('uswds @version', `uswds v${USWDS_VERSION}`);
        }
      });

      if (STAMPS_PROPERTIES.has(file)) {
        const rule = new Rule({ selector: ':root' });
        // Unquoted: `getPropertyValue('--hds-version')` then reads back as
        // `0.9.0` rather than `'0.9.0'`, which is what a support request or a
        // console one-liner actually wants.
        rule.append(new Declaration({ prop: '--hds-version', value: HDS_VERSION }));
        rule.append(new Declaration({ prop: '--hds-uswds-version', value: USWDS_VERSION }));

        // hds-base is already declared in every bundle's layer order;
        // layers merge, so appending here needs no other coordination.
        const layer = new AtRule({ name: 'layer', params: 'hds-base' });
        layer.append(rule);
        root.append(layer);
      }

      const banner = new Comment({
        text: `! @nasa-hds/core v${HDS_VERSION}${file ? ` — ${file}` : ''} | uswds v${USWDS_VERSION} | CC0 1.0 | https://github.com/nasa/hds-core `,
      });
      banner.raws.left = '';
      banner.raws.right = '';

      // After @charset, which must stay first.
      const charset = root.first?.name === 'charset' ? root.first : null;
      if (charset) charset.after(banner);
      else root.prepend(banner);
    },
  };
}
