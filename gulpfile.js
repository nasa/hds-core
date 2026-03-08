const gulp = require("gulp");
const uswds = require("@uswds/compile");
const svgSprite = require("gulp-svg-sprite");

// USWDS compile paths
uswds.settings.version = 3;
uswds.paths.dist.css = "./dist/css";
uswds.paths.dist.theme = "./src/scss";
uswds.paths.dist.img = "./dist/assets/img";
uswds.paths.dist.fonts = "./dist/assets/fonts";
uswds.paths.dist.js = "./dist/js";
uswds.paths.src.projectSass = "./src/scss";

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
              // Strip path and .svg extension → clean ID
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

exports.init = gulp.series(uswds.init, copyHdsAssets, buildSprite);
exports.build = gulp.series(uswds.compile, copyHdsAssets, buildSprite);