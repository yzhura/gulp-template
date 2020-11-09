const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babelRollup = require('rollup-plugin-babel');

module.exports = function script() {
  return gulp.src('src/js/*.js')
    .pipe(rollup({ plugins: [babelRollup(), resolve(), commonjs()] }, 'umd'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rigger())
    .pipe(babel({
      presets: ['@babel/env']
     }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
};