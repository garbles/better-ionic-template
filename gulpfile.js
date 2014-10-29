var gulp = require('gulp'),
  gutil = require('gulp-util'),
  bower = require('bower'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  slim = require('gulp-slim'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber');

function buildTask (ext, compileStream) {
  var paths = ['./src/*.' + ext, './src/**/*.' + ext];

  gulp.task(ext, function (done) {
    gulp.src(paths)
      .pipe(compileStream)
      .pipe(gulp.dest('./www'))
      .on('end', done);
  });

  gulp.task(ext + '-watch', [ext], function(done) {
    gulp.src(paths)
      .pipe(plumber())
      .pipe(watch(paths))
      .pipe(compileStream)
      .pipe(gulp.dest('./www'))
      .on('end', done);
  });
}

buildTask('scss', sass());
buildTask('coffee', coffee());
buildTask('slim', slim({ options: ['disable_escape=true', 'logic_less=true'] }));

gulp.task('watch', ['scss-watch', 'coffee-watch', 'slim-watch']);
gulp.task('build', ['scss', 'coffee', 'slim'])
