import autoprefixer from 'autoprefixer';
import discardComments from 'postcss-discard-comments';
import cssnano from 'cssnano';

const plugins = [autoprefixer(), discardComments()];

if (process.env.MINIFY === 'true' || process.env.NODE_ENV === 'production') {
  plugins.push(cssnano({ preset: 'default' }));
}

export default { plugins };
