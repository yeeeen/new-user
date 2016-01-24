var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var path = require('path');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('less', function () {
    return gulp.src('./less/style.less') // only compile the entry file
        .pipe(plumber())
        .pipe(less({
            paths: ['./less/']
        }))
        .pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {
            cascade: true
        })
        .pipe(csscomb())
        .pipe(gulp.dest('./assets/css'))
        .pipe(livereload());
});

gulp.task('minifyCSS', function() {
  gulp.src('./assets/css/style.css')
    .pipe(minifyCss())
  .pipe(rename({
    suffix: '.min'
  }))
    .pipe(gulp.dest('./assets/css'))
});



gulp.task('default', function () {
    gulp.watch('./less/*.less', ['less', 'minifyCSS']); // Watch all the .less files, then run the less task
});


