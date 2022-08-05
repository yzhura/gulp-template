const gulp = require("gulp");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const rigger = require("gulp-rigger");
const uglify = require("gulp-uglify");
const hash = require('gulp-hash-filename');
const rename = require("gulp-rename");
const { generateFileNames } = require("../utils/utils.js");
const jsFiles = [];

module.exports = {
  jsFiles,
  script: () => {
    const isProd  = process.env.NODE_ENV === "production";

    if (isProd ) {
      return gulp
        .src("src/js/*.js")
        .pipe(hash())
        .pipe(
          babel({
            presets: ["@babel/env"],
          })
        )
        .pipe(uglify())
        .pipe(rename((path) => generateFileNames(path, jsFiles, isProd)))
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
      .pipe(rename((path) => generateFileNames(path, jsFiles, isProd)))
      .pipe(gulp.dest("dist/js"));
  }
};
