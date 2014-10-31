var gulp = require('gulp'),
  gutil = require('gulp-util'),
  bower = require('bower'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  slim = require('gulp-slim'),
  watch = require('gulp-watch'),
  inject = require('gulp-inject'),
  plumber = require('gulp-plumber'),
  del = require('del');

var srcPaths = { all: [] };
['scss', 'coffee', 'slim'].forEach(function (ext) {
  var paths = ['./src/*.' + ext, './src/**/*.' + ext];
  srcPaths[ext] = paths;
  srcPaths.all = srcPaths.all.concat(paths);
});

var buildPaths = { all: [] };
['css', 'js', 'html'].forEach(function (ext) {
  var paths = ['./www/*.' + ext, './www/**/*.' + ext];
  buildPaths[ext] = paths;
  buildPaths.all = buildPaths.all.concat(paths);
});
buildPaths.all = buildPaths.all.concat(['!./www/lib/']);

function buildTask (ext, buildExt, compiles) {
  var paths = srcPaths[ext],
    build = buildPaths[buildExt];

  gulp.task(ext + '-clean', function (done) {
    del(build, done);
  });

  gulp.task(ext, [ext + '-clean'], function () {
    return gulp.src(paths)
      .pipe(plumber())
      .pipe(compiles)
      .pipe(gulp.dest('./www'));
  });

  gulp.task(ext + '-watch', [ext + '-clean'], function() {
    return gulp.src(paths)
      .pipe(watch(paths))
      .pipe(plumber())
      .pipe(compiles)
      .pipe(gulp.dest('./www'));
  });
}

buildTask('scss', 'css', sass());
buildTask('coffee', 'js', coffee());
buildTask('slim', 'html', slim({ options: ['disable_escape=true', 'logic_less=true'] }));

gulp.task('build', ['scss', 'coffee', 'slim']);
gulp.task('clean', ['scss-clean', 'coffee-clean', 'slim-clean']);
gulp.task('watch', ['scss-watch', 'coffee-watch', 'slim-watch']);

gulp.task('inject', function () {
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(buildPaths.all, { read: false }), {
      relative: true
    }))
    .pipe(gulp.dest('./www'));
});
