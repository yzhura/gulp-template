//npm run start
//npm run build

const gulp = require('gulp');

const server = require('./gulp/tasks/server');
const styles = require('./gulp/tasks/sass2css');
const imgMin = require('./gulp/tasks/imgmin');
const clean = require('./gulp/tasks/clean');

function setMode(isProduction = false) {
    return cb => {
      process.env.NODE_ENV = isProduction ? 'production' : 'development'
      cb()
    }
}

const dev = gulp.parallel(styles, imgMin);

const build = gulp.series(clean, dev)

module.exports.start = gulp.series(setMode(), build, server);
module.exports.build = gulp.series(setMode(true), build)