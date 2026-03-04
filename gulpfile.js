/**
 * gulpfile.js
 * @nasa/hds-core
 *
 * Builds HDS Core CSS from Sass source using @uswds/compile.
 * Also copies static assets (fonts, icons) to dist/.
 *
 * Available commands:
 *   npx gulp build        — full build (Sass + assets)
 *   npx gulp buildSass    — compile Sass to CSS only
 *   npx gulp copyAssets   — copy fonts and icons to dist/ only
 *   npx gulp watch        — watch Sass for changes and recompile
 *   npx gulp init         — one-time USWDS asset initialization
 */

const uswds = require("@uswds/compile");
const gulp = require("gulp");
const path = require("path");

// ============================================================
// USWDS VERSION
// ============================================================
uswds.settings.version = 3;

// ============================================================
// PATH SETTINGS
// ============================================================
// These tell @uswds/compile where to find things and where
// to put compiled output.

uswds.paths.dist.theme = "./src/scss";       // where our Sass source lives
uswds.paths.dist.css = "./dist/css";         // compiled CSS output
uswds.paths.dist.fonts = "./dist/assets/fonts";  // USWDS fonts output
uswds.paths.dist.img = "./dist/assets/img";  // USWDS images output
uswds.paths.dist.js = "./dist/assets/js";    // USWDS JS output

// ============================================================
// SASS ENTRY POINT
// ============================================================
// Override the default @uswds/compile entry point to use
// our own styles.scss instead of the USWDS default.

uswds.paths.dist.sassEntryPoint = "./src/scss/styles.scss";

// ============================================================
// ASSET COPY TASK
// ============================================================
// Copies HDS-specific fonts and icons from src/assets/ to
// dist/assets/. USWDS assets (public-sans, usa-icons, etc.)
// are handled separately by the uswds.copyAssets task.

function copyHdsAssets() {
  return gulp
    .src("./src/assets/**/*", { encoding: false })
    .pipe(gulp.dest("./dist/assets/"));
}

// ============================================================
// EXPORTED GULP TASKS
// ============================================================

// One-time setup: copies USWDS static assets (fonts, icons,
// JS) to dist/. Run once after npm install.
exports.init = uswds.init;

// Compile Sass to CSS only
exports.buildSass = uswds.compile;

// Copy HDS assets only
exports.copyAssets = copyHdsAssets;

// Full build: compile Sass + copy HDS assets
exports.build = gulp.series(
  uswds.compile,
  copyHdsAssets
);

// Watch Sass for changes and recompile automatically
exports.watch = uswds.watch;

// Default task (running `npx gulp` with no arguments)
exports.default = exports.build;