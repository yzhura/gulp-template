const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const shorthand = require("gulp-shorthand");
const autoprefixer = require("gulp-autoprefixer");
const gulpStylelint = require("gulp-stylelint");
const rename = require("gulp-rename");
const hash = require('gulp-hash-filename');
const { generateFileNames } = require("../utils/utils.js");
const cssFiles = [];

module.exports = {
  cssFiles,
  styles: () => {
    const isProd = process.env.NODE_ENV === "production";
  
    if (isProd) {
      return gulp
        .src("src/styles/*.scss")
        .pipe(hash())
        .pipe(plumber())
        .pipe(sass())
        .pipe(
          autoprefixer({
            cascade: false,
          })
        )
        .pipe(cleanCSS())
        .pipe(rename((path) => generateFileNames(path, cssFiles, isProd)))
        .pipe(gulp.dest("dist/css"));
    }
    return (
      gulp
        .src("src/styles/*.scss")
        .pipe(plumber())
        // .pipe(gulpStylelint({
        //   failAfterError: false,
        //   reporters: [
        //     {
        //       formatter: 'string',
        //       console: true
        //     }
        //   ]
        // }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(
          autoprefixer({
            cascade: false,
          })
        )
        // .pipe(cleanCSS({
        //   debug: true,
        //   compatibility: '*'
        // }, details => {
        //   console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
        // }))
        .pipe(sourcemaps.write("."))
        .pipe(rename((path) => generateFileNames(path, cssFiles, isProd)))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
    );
  }
};
