const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rigger = require("gulp-rigger");
const fileinclude = require("gulp-file-include");
const inject = require("gulp-inject-string");
const { jsFiles, reactJsFile } = require("./script");
const { cssFiles } = require("./sass2css");
const htmlmin = require("gulp-htmlmin");

module.exports = function html() {
  const isProd = process.env.NODE_ENV === "production";
  const injectJsPath = "<!-- inject:js -->";
  const injectReactJsPath = "<!-- inject:reactjs -->";
  const injectCssPath = "<!-- inject:css -->";

  const cssLinks = cssFiles.reduce((prev, cur) => {
    return (prev += `\n\t<link rel="stylesheet" href="./css/${cur}"></link>`);
  }, "");

  const jsScripts = jsFiles.reduce((prev, cur) => {
    return (prev += `\n\t<script src="./js/${cur}" defer></script>`);
  }, "");

  const reactJsScript = reactJsFile.reduce((prev, cur, ind) => {
    if(!isProd) {
      prev += `\n\t<script>var DEVELOPMENT_MODE = true;</script>`
    }
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
    .pipe(inject.after(injectReactJsPath, reactJsScript))
    .pipe(inject.after(injectCssPath, cssLinks))
    .pipe(gulp.dest("dist/"));
};
