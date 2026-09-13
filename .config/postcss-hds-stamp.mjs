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
 *
 * Scoped to the HDS bundles by output filename -- see STAMPABLE. The version
 * string is deliberately excluded from the CSS-output hash; see
 * scripts/css-output-hash.sh.
 */

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Resolve from this file, not the working directory: postcss is not always
// invoked from the repo root (editor integrations, Vite, a nested build), and
// a cwd-relative read throws when it isn't.
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

// Read USWDS's manifest by path rather than `require('@uswds/uswds/package.json')`:
// USWDS does not list `./package.json` in its own exports map, so the specifier
// form throws ERR_PACKAGE_PATH_NOT_EXPORTED.
const HDS_VERSION = read(path.join(REPO_ROOT, 'package.json')).version;
const USWDS_VERSION = read(path.join(REPO_ROOT, 'node_modules/@uswds/uswds/package.json')).version;

/** Bundles that carry the custom properties, keyed by output filename. */
const STAMPS_PROPERTIES = new Set(['hds.min.css', 'hds.css']);

/**
 * Only our own published bundles get stamped. The root postcss config is
 * picked up by Vite too (Storybook runs `@storybook/html-vite` with no
 * `css.postcss` override), and without this guard every CSS chunk Storybook
 * processes gets an HDS banner naming an unrelated file.
 */
const STAMPABLE = new Set([
  ...STAMPS_PROPERTIES,
  'hds-uswds.min.css',
  'hds-uswds.css',
  'hds-dataviz.min.css',
  'hds-dataviz.css',
]);

export default function hdsStamp() {
  return {
    postcssPlugin: 'postcss-hds-stamp',

    OnceExit(root, { result, Comment, Rule, Declaration, AtRule }) {
      const file = result.opts.to ? result.opts.to.split(/[\\/]/).pop() : '';
      if (!STAMPABLE.has(file)) return;

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
