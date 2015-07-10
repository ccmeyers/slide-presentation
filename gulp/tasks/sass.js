var gulp         = require('gulp');
var livereload   = require('gulp-livereload');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var autoprefixer = require('gulp-autoprefixer');
var neat         = require('node-neat').includePaths;

gulp.task('sass', function ()
{
  return gulp.src(config.src)
    // .pipe(sourcemaps.init(config.sourcemaps))
    .pipe(sass(
        config.settings
    ))
    .on('error', handleErrors)
    // .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest(config.dest))
    .pipe(livereload())
});
