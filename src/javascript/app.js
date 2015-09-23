var slidePresentation = require('./includes/slidePresentation');

var app = {

  init: function() {
    slidePresentation.init();
  }

}

$(document).ready( app.init );
