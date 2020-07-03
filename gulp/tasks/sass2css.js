const gulp = require('gulp');
const sass = require('gulp-sass');


module.exports = function styles() {
    return gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'))
}