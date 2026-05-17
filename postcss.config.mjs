import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const plugins = [autoprefixer()];

if (process.env.MINIFY === 'true' || process.env.NODE_ENV === 'production') {
  plugins.push(cssnano({ preset: 'default' }));
}

export default { plugins };
