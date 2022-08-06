const gulp = require('gulp');

module.exports = function files() {
  return gulp.src('src/files/*')
    .pipe(gulp.dest('dist/files'));
};