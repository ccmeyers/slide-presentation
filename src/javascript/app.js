var slidePresentation = require('./includes/slidePresentation');
var videos = require('./includes/videos');

var app = {

  init: function() {
    slidePresentation.init();
    videos.init();
  }

}

$(document).ready( app.init );
