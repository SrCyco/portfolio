'use strict'; 

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');

 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('../app/css'))
    .pipe(browserSync.stream());
  });

  gulp.task('scripts', function(){
    return gulp.src('js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('../app/js'))
  });
  gulp.task('html', function(){
    return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('../app'))
  });

  gulp.task('images', function(){
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../app/images'));
  });
 
  gulp.task('watch', function () {
    browserSync.init({
      server: "../app/"
    });
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch('js/*.js', gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch("*.html", gulp.series('html')).on('change', browserSync.reload);

});