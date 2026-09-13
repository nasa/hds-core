import autoprefixer from 'autoprefixer';
import discardComments from 'postcss-discard-comments';
import cssnano from 'cssnano';

import hdsStamp from './.config/postcss-hds-stamp.mjs';

const plugins = [autoprefixer(), discardComments()];

if (process.env.MINIFY === 'true' || process.env.NODE_ENV === 'production') {
  plugins.push(cssnano({ preset: 'default' }));
}

// Last: the version banner must outlive comment discarding and minification.
plugins.push(hdsStamp());

export default { plugins };
