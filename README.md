Aera
==================

Includes the following:

- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds)
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Shimming non common-js vendor code with other dependencies (like a jQuery plugin)
- Separate minification task for production builds


TO use:

### Install npm dependencies
```
npm install
```


### Run gulp
```
gulp
```

This will run the `default` gulp task defined in `gulp/tasks/default.js`, which has the following task dependencies: `['sass', 'images', 'html', 'watch']`
- The `sass` task compiles your css files.
- `images` moves images copies images from a source folder, performs optimizations, the outputs them into the build folder
- `html` doesn't do anything in dev, but minifies HTML for production
- `watch` has `watchify` as a dependency, which will run the browserifyTask with a `devMode` flag that enables sourcemaps and watchify, a browserify add-on that enables caching for super fast recompiling. The task itself starts watching source files and will re-run the appropriate tasks when those files change.

### Configuration
All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of the project.


#### Production files

There is also a `production` task you can run:
```
gulp production
```
This will run JavaScript tests, then re-build optimized, compressed css and js files to the build folder, as well as output their file sizes to the console. It's a shortcut for running the following tasks: `images`, `minify-html`, `minify-css`, `uglifyJs`.

##An explanation of the custom slide presentation build

For future knowledge:

To add Panels:
The panel should be built in an HTML5 `<section></section>` tag and have a class that corresponds with its index (i.e. the fifth section should have `class="section5"`, the sixth section should have `class="section6"`)

To add a Fragmented Panel:
Add the `fragmented` class to the section (i.e. `class="section5 fragmented"`). The intererior parts that are fragmented should have two classes: `fragmented-part` and 'part'+index of part, such as `part5` (i.e. class="fragmented-part part5")
Add the `active` class to the first part. If there are multiple parts that are grouped active together, make sure they get the same 'part'+index class.

Please note: for some reason the index of my first section is 1 instead of 0. I have no clue why. The index of my first fragmented-part is 0, which is to be expected. Consequently, the first <section> has a class of 'section1' while the first 'fragmented-part' has a class of 'part0'. If anyone reading this figures out why there's this weirdness going on, I'd love your insight. 
