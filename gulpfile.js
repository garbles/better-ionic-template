var gulp = require('gulp'),
  gutil = require('gulp-util'),
  bower = require('bower'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber'),
  sh = require('shelljs');

var paths = {
  sass: ['./scss/*.scss', './scss/**/*.scss'],
  coffee: ['./scripts/*.coffee', './scripts/**/*.coffee']
};
paths.all = (paths.sass).concat(paths.coffee);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(watch(paths.sass))
    .pipe(sass())
    .pipe(gulp.dest('./www/css'))
    .on('end', done);
});

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
    .pipe(plumber())
    .pipe(watch(paths.coffee))
    .pipe(coffee())
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});

gulp.task('watch', ['sass', 'coffee']);
