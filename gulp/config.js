// any external vars needed for config
var neat = require('node-neat').includePaths;


// global base src and dest
var dest = './dist';
var src = './src';

module.exports = {
  sass: {
    src: src + '/sass/*.{sass,scss}',
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
    process: true,
    src: src + '/html/**',
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/javascript/app.js',
      dest: dest + '/assets/js',
      outputName: 'app.js',
      // list of externally available modules to exclude from the bundle
      external: ['jquery', 'underscore']
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
