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

gulp.task('publish', function(){
  gulp.src('app/dist/**/*.*')
  .pipe(gulp.dest('./'));
})

gulp.task('optimize-imgs', function(){
  return gulp.src('./img/*')
        .pipe(imagemin({ optimizationLevel: 5, progressive: true }))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('watch', function(){
  gulp.watch('styles/**/*.scss', ['sass']);
});
