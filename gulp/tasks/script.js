const gulp = require("gulp");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const rigger = require("gulp-rigger");
const uglify = require("gulp-uglify");
const hash = require('gulp-hash-filename');

module.exports = function script() {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    return gulp
      .src("src/js/*.js")
      .pipe(hash())
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(uglify())
      .pipe(gulp.dest("dist/js"));
  }

  return gulp
    .src("src/js/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rigger())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"));
};
