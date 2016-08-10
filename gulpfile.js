var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var haml = require('gulp-ruby-haml');
var twig = require('gulp-twig');
var prettify = require('gulp-html-prettify');

gulp.task('prettify',['templates'], function() {
  return gulp.src('app/*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})


gulp.task('haml', function(){
   return gulp.src('app/haml/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('app'))
});

gulp.task('sass', function(){
  gulp.src('app/scss/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('templates',['haml'], function() {
  return gulp.src('app/*.html')
    .pipe(twig())
    .pipe(gulp.dest('app'))

});

gulp.task('watch', ['sass','templates','browserSync','prettify'], function (){
  gulp.watch('app/js/**/*.js', browserSync.reload); 
  gulp.watch('app/js/**/*.css', browserSync.reload); 
  gulp.watch('app/haml/**/*.haml', ['prettify']); 
	gulp.watch('app/scss/*.scss', ['sass']); 
  // Other watchers
})

gulp.task('default', ['watch']);