var Backbone = require('backbone');
var $ = require('jquery');
var _ = Backbone._;
Backbone.$ = $;

'use strict';

module.exports = Backbone.View.extend({

    el: $('body'),

    events: {
        "keydown body": "jump",
    },

    initialize: function() {
        this.render();
    },

    jump: function(e) {
      e.preventDefault();
      console.log('e.keyCode', e.keyCode);
      if (e.keyCode === 32) {
        console.log('jump!');
      }
    },

    render: function() {
        // Any DOM rendering goes here
    }

});
