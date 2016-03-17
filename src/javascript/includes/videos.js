$ = require('jquery');
jQuery = $;
var waypoint = require('../vendor/waypoints/lib/jquery.waypoints.min.js');
var vide = require('vide');

'use strict';

var videos = {

  init: function() {
    this.videoWaypoints();
  },

  videoWaypoints: function() {
    var cloudsVideo = $('#clouds-video').data('vide').getVideoObject();
    cloudsVideo.pause();
    var cloudsVideoWaypoint = new Waypoint({
      element: $('#clouds-video'),
      handler: function(direction) {
        if (direction === 'down') {
          cloudsVideo.pause();
        } else {
          cloudsVideo.play();
        }
      },
      offset: '-100%'
    });
    var cloudsVideoOffsetWaypoint = new Waypoint({
      element: $('#clouds-video'),
      handler: function(direction) {
        if (direction === 'down') {
          cloudsVideo.play();
        } else {
          cloudsVideo.pause();
        }
      },
      offset: '100%'
    });
  }

}

module.exports = videos;