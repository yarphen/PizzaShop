var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function () {
  var tsResult = tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('.', {
           sourceRoot: function(file){ return file.cwd + '/src'; }
      }))
    .pipe(gulp.dest('dist'));
});
gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);

