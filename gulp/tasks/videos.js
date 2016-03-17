var changed    = require('gulp-changed');
var gulp       = require('gulp');
var config     = require('../config').videos;
var livereload = require('gulp-livereload');

gulp.task('videos', function() 
{
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
    // .pipe(browserSync.reload({stream:true}));
    .pipe(livereload())
});
