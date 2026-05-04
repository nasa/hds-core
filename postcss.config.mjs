import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const plugins = [autoprefixer()];

if (process.env.MINIFY === 'true') {
  plugins.push(cssnano({ preset: 'default' }));
}

export default { plugins };
