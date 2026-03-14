const gulp = require("gulp");
const uswds = require("@uswds/compile");
const svgSprite = require("gulp-svg-sprite");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

// USWDS compile paths
uswds.settings.version = 3;
uswds.paths.dist.css = "./dist/css";
uswds.paths.dist.img = "./dist/assets/img";
uswds.paths.dist.fonts = "./dist/assets/fonts";
uswds.paths.dist.js = "./dist/js";
uswds.paths.src.projectSass = "./src/scss";

// This tells USWDS where theme files live for compilation.
// We use individual copy tasks (not init/copyAll) to avoid
// USWDS overwriting our HDS theme files.
uswds.paths.dist.theme = "./src/scss";

// Copy HDS fonts and icons to dist
function copyHdsAssets() {
  return gulp
    .src("src/assets/**/*", { encoding: false })
    .pipe(gulp.dest("dist/assets"));
}

// Generate SVG sprite from flat icon directory
function buildSprite() {
  return gulp
    .src("src/assets/img/hds-icons/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: ".",
            sprite: "hds-sprite.svg",
          },
        },
        shape: {
          id: {
            generator: function (name) {
              return name.replace(/\.svg$/, "");
            },
          },
        },
      })
    )
    .pipe(gulp.dest("dist/assets/img"));
}

// Minify compiled CSS (runs after uswds.compile)
function minifyCss() {
  return gulp
    .src("dist/css/styles.css", { sourcemaps: true })
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css", { sourcemaps: "." }));
}

// Tasks
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.copyAssets = copyHdsAssets;
exports.sprite = buildSprite;
exports.minifyCss = minifyCss;

// Init: Copy USWDS assets (fonts, images, JS) + HDS assets + sprite
// Uses individual copy tasks instead of init/copyAll to prevent
// USWDS from overwriting HDS theme files in src/scss/
exports.init = gulp.series(
  uswds.copyFonts,
  uswds.copyImages,
  uswds.copyJS,
  copyHdsAssets,
  buildSprite
);

exports.build = gulp.series(
  uswds.compile,
  copyHdsAssets,
  buildSprite,
  minifyCss
);