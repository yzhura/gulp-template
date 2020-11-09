const gulp = require('gulp');


module.exports = function fontReplace() {
    return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
}

