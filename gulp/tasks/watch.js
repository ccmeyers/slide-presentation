/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/livereload.js watches and reloads compiled files
*/

var gulp = require('gulp');
var config = require('../config');
var watchify = require('./browserify');
var watch = require('gulp-watch');
var livereload = require('./livereload');

gulp.task('watch', ['watchify', 'livereload'], function(callback)
{
    watch(config.sass.srcWatch, function()
    {
        gulp.start('sass');
    });


    watch(config.html.src, function()
    {
        gulp.start('html');
    });


    watch(config.images.src, function()
    {
        gulp.start('images');
    });
});
