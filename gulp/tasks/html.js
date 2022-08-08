const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rigger = require("gulp-rigger");
const fileinclude = require("gulp-file-include");
const inject = require("gulp-inject-string");
const { jsFiles } = require("./script");
const { cssFiles } = require("./sass2css");
const htmlmin = require("gulp-htmlmin");

module.exports = function html() {
  const injectJsPath = "<!-- inject:js -->";
  const injectCssPath = "<!-- inject:css -->";

  const cssLinks = cssFiles.reduce((prev, cur) => {
    return (prev += `\n\t<link src="./css/${cur}"></link>`);
  }, "");

  const jsScripts = jsFiles.reduce((prev, cur) => {
    return (prev += `\n\t<script src="./js/${cur}" defer></script>`);
  }, "");

  return gulp
    .src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(plumber())
    .pipe(rigger())
    .pipe(inject.after(injectJsPath, jsScripts))
    .pipe(inject.after(injectCssPath, cssLinks))
    .pipe(gulp.dest("dist/"));
};
