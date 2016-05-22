var gulp = require('gulp');
var flatten = require('gulp-flatten')
var inject = require('gulp-inject');
var runSequence = require('run-sequence');
var del = require('del');
var config = require('./gulp.config.json');

gulp.task('default', function (callback) {
  runSequence('build', callback);
});

gulp.task('build', function (callback) {
  runSequence('delete-build', 'copy-build', 'index', callback);
});

gulp.task('index', function () {
  var indexSrc = config.build.vendor.concat(config.build.js);
  return gulp.src(config.html.main)
    .pipe(inject(gulp.src(indexSrc), {ignorePath: 'build'}))
    .pipe(gulp.dest(config.build.path));
});

gulp.task('delete-build', function () {
  return del(config.build.path, {force: true});
});

gulp.task('copy-build', ['copy-js', 'copy-vendor']);

gulp.task('copy-js', function () {
  return gulp.src(config.src.js)
    .pipe(flatten())
    .pipe(gulp.dest(config.build.jspath));
});

gulp.task('copy-vendor', function () {
  var vendorPaths = config.vendor.js.concat(config.vendor.map);
  return gulp.src(vendorPaths)
    .pipe(gulp.dest(config.build.vendorpath));
});
