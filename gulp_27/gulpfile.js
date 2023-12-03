const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function styles() {
  return gulp
    .src('./src/style.css')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./dist'));
}

function scripts() {
  return gulp
    .src('./src/script.js')
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
}

function build() {
  styles();
  scripts();
}

exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.default = gulp.series(styles, scripts);
