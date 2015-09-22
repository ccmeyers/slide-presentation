var Backbone = require('backbone');
$ = require('jquery');
jQuery = $;
var _ = Backbone._;
Backbone.$ = $;
waypoint = require('../vendor/waypoints/lib/jquery.waypoints.js');

'use strict';

module.exports = Backbone.View.extend({

    el: $('document'),

    events: {
        "keydown body": "jump",
    },

    initialize: function() {
        this.getCurrentPanel();
        this.slider();
    },

    slider: function(e) {
      var that = this;
      $(document).on('keydown', function(e){
        if (e.keyCode === 40 || e.keyCode === 32 || e.keyCode === 13) {
          e.preventDefault();
          var nextPanel = $('.currentPanel').nextAll('section');
          if (nextPanel.length > 0) {
            that.scrollToElement(nextPanel);
          }
        } else if (e.keyCode === 38) {
          e.preventDefault();
          var prevPanel = $('.currentPanel').prevAll('section');
          if (prevPanel.length > 0) {
            that.scrollToElement(prevPanel);
          }
        }
      })
    },

    scrollToElement: function(panel) {
      $('html, body').animate({
        scrollTop: panel.offset().top - 103
      }, 200);
    },

    getCurrentPanel: function() {
      var waypoint1down = new Waypoint({
        element: $('.section1'),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section1').addClass('currentPanel');
          } else {
            $('.section1').addClass('currentPanel');
            $('.section2').removeClass('currentPanel');
          }
        },
        offset: 200
      });
      var waypoint1up = new Waypoint({
        element: $('.section1'),
        handler: function(direction) {
          if (direction === 'up') {
            $('.section1').addClass('currentPanel');
            $('.section2').removeClass('currentPanel');
          }
        },
        offset: 100
      });
      var waypoint2down = new Waypoint({
        element: $('.section2'),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section2').addClass('currentPanel');
            $('.section1').removeClass('currentPanel');
          }
        },
        offset: 200
      });
      var waypoint2up = new Waypoint({
        element: $('.section2'),
        handler: function(direction) {
          if (direction === 'up') {
            $('.section2').addClass('currentPanel');
            $('.section3').removeClass('currentPanel');
          }
        },
        offset: 100
      });
      var waypoint3down = new Waypoint({
        element: $('.section3'),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section3').addClass('currentPanel');
            $('.section2').removeClass('currentPanel');
          }
        },
        offset: 200
      });
      var waypoint3up = new Waypoint({
        element: $('.section3'),
        handler: function(direction) {
          if (direction === 'up') {
            $('.section3').addClass('currentPanel');
            $('.section4').removeClass('currentPanel');
          }
        },
        offset: 100
      });
      var waypoint4 = new Waypoint({
        element: $('.section4'),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section4').addClass('currentPanel');
            $('.section3').removeClass('currentPanel');
          } else {
            $('.section4').addClass('currentPanel');
          }
        },
        offset: 200
      });
    }

});
