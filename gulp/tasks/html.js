var gulp = require('gulp');
var config = require('../config').html;
var livereload = require('gulp-livereload');

gulp.task('html', function()
{
	  return gulp.src(config.src)
	    .pipe(gulp.dest(config.dest))
	    .pipe(livereload())

});
