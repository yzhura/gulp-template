const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const hash = require("gulp-hash-filename");
const rename = require("gulp-rename");
const { generateFileNames } = require("../utils/utils.js");
const jsFiles = [];
const jsPaths = ["src/js/main.js"]

module.exports = {
  jsFiles,
  script: function () {
    const isProd = process.env.NODE_ENV === "production";
    if(process.env.WITH_REACT === 'true') {
      jsPaths.push('src/js/app.jsx')
    }

    if (isProd) {
      return browserify(jsPaths)
        .transform(babelify)
        .bundle()
        .on("error", (err) => {
          console.log("JS Error", err);
        })
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(hash())
        .pipe(uglify())
        .pipe(rename((path) => generateFileNames(path, jsFiles, isProd)))
        .pipe(gulp.dest("dist/js"));
      }
  
    return browserify(jsPaths, {
      debug: true,
    })
      .transform(babelify)
      .bundle()
      .on("error", (err) => {
        console.log("JS Error", err);
      })
      .pipe(source("main.js"))
      .pipe(rename((path) => generateFileNames(path, jsFiles, isProd)))
      .pipe(gulp.dest("dist/js"));
  }
}