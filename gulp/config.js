// any external vars needed for config
var neat = require('node-neat').includePaths;


// global base src and dest
var dest = './dist';
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + '/sass/*.{sass,scss}',
    srcWatch: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/assets/css',
    settings: {
      imagePath: 'images', // Used by the image-url helper
      includePaths: neat,
      sourceComments: 'map'
    },
    sourcemaps: {
      includeContent: false,
      sourceRoot: src
    }
  },
  images: {
    src: src + '/images/**',
    dest: dest + '/assets/images'
  },
  html: {
    src: src + '/html/*.html',
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/javascript/app.js',
      dest: dest + '/assets/js',
      outputName: 'app.js'
    }]
  },
  production: {
    css: {
      src: dest + '/assets/css/*.css',
      dest: dest + '/assets/css'
    },
    js: {
      src: dest + '/assets/js/*.js',
      dest: dest + '/assets/js'
    },
    html: {
      src: dest + '/*.html',
      dest: dest
    }
  }
};
