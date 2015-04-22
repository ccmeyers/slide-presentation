var gulp = require('gulp');
var config = require('../config').html;
var browserSync  = require('browser-sync');
var livereload = require('gulp-livereload');

gulp.task('html', function() 
{

  if (config.process == true)
  {
	  return gulp.src(config.src)
	    .pipe(gulp.dest(config.dest))
	    // .pipe(browserSync.reload({stream:true}));
	    .pipe(livereload())
  }

  else
  {
	  return gulp.src(config.src)
	    // .pipe(gulp.dest(config.dest))
	    // .pipe(browserSync.reload({stream:true}));
	    .pipe(livereload())
  }
  
});
