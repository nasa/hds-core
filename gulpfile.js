const gulp = require("gulp");
const uswds = require("@uswds/compile");
const svgSprite = require("gulp-svg-sprite");

// USWDS compile paths
uswds.settings.version = 3;
uswds.paths.dist.css = "./dist/css";
uswds.paths.dist.img = "./dist/assets/img";
uswds.paths.dist.fonts = "./dist/assets/fonts";
uswds.paths.dist.js = "./dist/js";
uswds.paths.src.projectSass = "./src/scss";

// NOTE: We intentionally do NOT set uswds.paths.dist.theme
// HDS Core provides its own theme files; we don't want USWDS
// to scaffold or overwrite them.

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

// Tasks
exports.compile = uswds.compile;
exports.watch = uswds.watch;
exports.copyAssets = copyHdsAssets;
exports.sprite = buildSprite;

// Init: Copy USWDS assets (fonts, images, JS) + HDS assets + sprite
// Uses copyAll instead of init to avoid overwriting HDS theme files
exports.init = gulp.series(uswds.copyAll, copyHdsAssets, buildSprite);

exports.build = gulp.series(uswds.compile, copyHdsAssets, buildSprite);