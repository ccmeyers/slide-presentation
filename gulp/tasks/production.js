var gulp        = require('gulp');
var config      = require('../config').production;
var minifyCSS   = require('gulp-minify-css');
var minifyHTML  = require('gulp-minify-html');
var uglify      = require('gulp-uglify');
var size        = require('gulp-filesize');


gulp.task('uglify-js', ['browserify'], function() 
{
  return gulp.src(config.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest))
    .pipe(size());
});

gulp.task('minify-css', ['sass'], function() 
{
  return gulp.src(config.css.src)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(config.css.dest))
    .pipe(size());
});

gulp.task('minify-html', ['html'], function() 
{    
  gulp.src(config.html.src)
    .pipe(minifyHTML())
    .pipe(gulp.dest(config.html.dest));
});



gulp.task('production', function()
{
  gulp.start(['images', 'minify-css', 'uglify-js'])
});
