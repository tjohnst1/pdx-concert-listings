var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['watch']);

gulp.task('sass', function(){
  return gulp.src('styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  gulp.watch('styles/**/*.scss', ['sass']);
});
