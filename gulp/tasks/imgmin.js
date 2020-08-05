const gulp = require('gulp');
const imagemin = require('gulp-imagemin');


module.exports = function imgMin() {
    return gulp.src('src/sourceimages/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
}

