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
const reactJsFile = [];

const optimizeScripts = (paths, isProd, sourceName, files) => {
  if(isProd) {
    return browserify(paths)
      .transform(babelify)
      .bundle()
      .on("error", (err) => {
        console.log("JS Error", err);
      })
      .pipe(source(sourceName))
      .pipe(buffer())
      .pipe(hash())
      .pipe(uglify())
      .pipe(rename((path) => generateFileNames(path, files, isProd)))
      .pipe(gulp.dest("dist/js"));
  }

  return browserify(paths, {
    debug: true,
  })
    .transform(babelify)
    .bundle()
    .on("error", (err) => {
      console.log("JS Error", err);
    })
    .pipe(source(sourceName))
    .pipe(rename((path) => generateFileNames(path, files, isProd)))
    .pipe(gulp.dest("dist/js"));
};

module.exports = {
  jsFiles,
  reactJsFile,

  reactScript: function () {
    const jsPaths = ["src/js/index.jsx"];
    const isProd = process.env.NODE_ENV === "production";

    return optimizeScripts(jsPaths, isProd, "react.js", reactJsFile);
  },

  script: function () {
    const jsPaths = ["src/js/main.js"];
    const isProd = process.env.NODE_ENV === "production";

    return optimizeScripts(jsPaths, isProd, "main.js", jsFiles);
  },
};
