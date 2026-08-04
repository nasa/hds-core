/**
 * HDS Version Stamp — PostCSS plugin
 *
 * Stamps the HDS + USWDS versions into every compiled bundle: a `/*!` banner
 * on all bundles, plus --hds-version / --hds-uswds-version on :root in
 * hds.min.css only (a stale copy of an optional bundle must not win the
 * cascade and misreport the version).
 *
 * Runs last in the postcss chain so the banner survives comment-discarding
 * and minification. Versions are read at build time, so the stamp tracks the
 * changesets bump with nothing to regenerate.
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
      const file = result.opts.to ? result.opts.to.split(/[\\/]/).pop() : '';

      // We compile USWDS from source, so its banner ships the literal
      // `uswds @version` placeholder that USWDS substitutes in its own build.
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
