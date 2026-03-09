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
// We use individual copy tasks instead of copyAll/init to avoid
// USWDS overwriting HDS theme files (styles.scss, _uswds-theme.scss, etc.)
exports.init = gulp.series(
  uswds.copyFonts,
  uswds.copyImages,
  uswds.copyJS,
  copyHdsAssets,
  buildSprite
);

exports.build = gulp.series(uswds.compile, copyHdsAssets, buildSprite);