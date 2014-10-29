var gulp = require('gulp'),
  gutil = require('gulp-util'),
  bower = require('bower'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  slim = require('gulp-slim'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber');

var paths = {
  sass: ['./src/*.scss', './src/**/*.scss'],
  coffee: ['./src/*.coffee', './src/**/*.coffee'],
  slim: ['./src/*.slim', './src/**/*.slim']
};
paths.all = (paths.sass).concat(paths.coffee).concat(paths.slim);

gulp.task('sass', function (done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./www'))
    .on('end', done);
})

gulp.task('sass-watch', ['sass'], function(done) {
  gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(watch(paths.sass))
    .pipe(sass())
    .pipe(gulp.dest('./www'))
    .on('end', done);
});

gulp.task('coffee', function (done) {
  gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(gulp.dest('./www'))
    .on('end', done);
});

gulp.task('coffee-watch', ['coffee'], function(done) {
  gulp.src(paths.coffee)
    .pipe(plumber())
    .pipe(watch(paths.coffee))
    .pipe(coffee())
    .pipe(gulp.dest('./www'))
    .on('end', done);
});

gulp.task('slim', function (done) {
  gulp.src(paths.slim)
    .pipe(slim({
      options: ['disable_escape=true', 'logic_less=true']
    }))
    .pipe(gulp.dest('./www'))
    .on('end', done);
});

gulp.task('slim-watch', ['slim'], function(done) {
  gulp.src(paths.slim)
    .pipe(plumber())
    .pipe(watch(paths.slim))
    .pipe(slim({
      options: ['disable_escape=true', 'logic_less=true']
    }))
    .pipe(gulp.dest('./www'))
    .on('end', done);
});

gulp.task('watch', ['sass-watch', 'coffee-watch', 'slim-watch']);
gulp.task('build', ['sass', 'coffee', 'slim'])
