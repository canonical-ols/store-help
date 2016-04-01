const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');

const build = require('./build.js');

gulp.task('metalsmith', ['clean'], function (cb) {
  build(cb);
});

gulp.task('images', ['clean'], function() {
  return gulp.src('./assets/img/**')
  .pipe(gulp.dest('build/img/'));
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src('./assets/js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('build/js/'));
});

gulp.task('styles', ['clean'], function () {
  var processors = [
    autoprefixer()
  ];
  return gulp.src([
    'assets/css/normalize.css',
    'assets/css/github-gist.css',
    'assets/css/*.css'
  ])
  .pipe(postcss(processors))
  .pipe(concat('all.css'))
  .pipe(csso())
  .pipe(gulp.dest('build/css/'));
});

gulp.task('clean', function () {
  return del(['build']);
});

gulp.task('watch', ['build'], function() {
  gulp.watch(['src/**/*', 'assets/**/*', 'templates/**/*'], ['build']);
});

gulp.task('build', ['metalsmith', 'images', 'styles']);
gulp.task('default', ['build']);
