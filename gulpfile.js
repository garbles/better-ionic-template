var gulp = require('gulp'),
  gutil = require('gulp-util'),
  bower = require('bower'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  slim = require('gulp-slim'),
  watch = require('gulp-watch'),
  inject = require('gulp-inject'),
  plumber = require('gulp-plumber');

var buildPaths = { all: [] };
['scss', 'coffee', 'slim'].forEach(function (ext) {
  var paths = ['./src/*.' + ext, './src/**/*.' + ext];
  buildPaths[ext] = paths;
  buildPaths.all = buildPaths.all.concat(paths);
});

function buildTask (ext, compileStream) {
  var paths = buildPaths[ext];

  gulp.task(ext, function (done) {
    gulp.src(paths)
      .pipe(compileStream)
      .pipe(gulp.dest('./www'))
      .on('end', done);
  });

  gulp.task(ext + '-watch', function(done) {
    gulp.src(paths)
      .pipe(watch(paths))
      .pipe(plumber())
      .pipe(compileStream)
      .pipe(gulp.dest('./www'))
      .on('end', done);
  });
}

buildTask('scss', sass());
buildTask('coffee', coffee());
buildTask('slim', slim({ options: ['disable_escape=true', 'logic_less=true'] }));

gulp.task('build', ['scss', 'coffee', 'slim']);
gulp.task('watch', ['scss-watch', 'coffee-watch', 'slim-watch']);
