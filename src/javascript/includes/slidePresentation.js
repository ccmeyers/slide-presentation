$ = require('jquery');
jQuery = $;
var waypoint = require('../vendor/waypoints/lib/jquery.waypoints.js');

var slidePresentation = {

  init: function() {
    this.getCurrentPanel();
    this.slider();
    this.clickToActivateFragment();
  },

  slider: function(e) {
    var that = this;
    var movement;
    $(document).on('keydown', function(e){
      var $currentPanel = $('.currentPanel');
      if (e.keyCode === 40 || e.keyCode === 32 || e.keyCode === 13  || e.keyCode === 34) {
        e.preventDefault();
        if ( !($currentPanel.hasClass('fragmented')) || $currentPanel.hasClass('last-fragment') ) {
          that.findNext();
        } else {
          movement = 'down';
          that.fragmentedPanel(movement);
        }
      } else if (e.keyCode === 38 || e.keyCode === 33) {
        e.preventDefault();
        if ( !($currentPanel.hasClass('fragmented')) || $currentPanel.hasClass('first-fragment') ) {
          that.findPrev();
        } else {
          movement = 'up';
          that.fragmentedPanel(movement);
        }
      }
    });
  },

  scrollToElement: function(panel) {
    $('html, body').animate({
      scrollTop: panel.offset().top - 102
    }, 200);
  },

  findNext: function() {
    var that = this;
    var $currentPanel = $('.currentPanel');
    var nextPanel = $currentPanel.nextAll('section');
    if (nextPanel.length > 0) {
      that.scrollToElement(nextPanel);
    }
  },

  findPrev: function() {
    var that = this;
    var $currentPanel = $('.currentPanel');
    var prevPanel = $currentPanel.prevAll('section');
    if (prevPanel.length > 0) {
      that.scrollToElement(prevPanel);
    }
  },

  fragmentedPanel: function(movement) {
    var that = this;
    var currentFragmentedPanel = $('.currentPanel.fragmented');
    var currentFragmentedParts = currentFragmentedPanel.find('.fragmented-part.active');
    currentFragmentedParts.each(function(){
      var fragmentIndex = $(this).index();
      var nextFragment = fragmentIndex + 1;
      var prevFragment = fragmentIndex - 1;
      var checkForLast = fragmentIndex + 2;
      var checkForFirst = fragmentIndex - 2;
      if (movement === 'down') {
        if ($('.currentPanel .fragmented-part.part'+nextFragment).length > 0) {
          if ($('.currentPanel .fragmented-part.part'+checkForLast).length > 0) {
            currentFragmentedParts.removeClass('active');
            $('.currentPanel .fragmented-part.part'+nextFragment).addClass('active');
            currentFragmentedPanel.removeClass('first-fragment');
            currentFragmentedPanel.removeClass('last-fragment');
          } else {
            currentFragmentedParts.removeClass('active');
            $('.currentPanel .fragmented-part.part'+nextFragment).addClass('active');
            currentFragmentedPanel.removeClass('first-fragment');
            currentFragmentedPanel.addClass('last-fragment');
          }
        }
      } else if (movement === 'up') {
        if (prevFragment >= 0) {
          if (checkForFirst >= 0) {
            currentFragmentedParts.removeClass('active');
            $('.currentPanel .fragmented-part.part'+prevFragment).addClass('active');
            currentFragmentedPanel.removeClass('first-fragment');
            currentFragmentedPanel.removeClass('last-fragment');
          } else {
            currentFragmentedParts.removeClass('active');
            $('.currentPanel .fragmented-part.part'+prevFragment).addClass('active');
            currentFragmentedPanel.removeClass('last-fragment');
            currentFragmentedPanel.addClass('first-fragment');
          }
        }
      }
    });
  },

  getCurrentPanel: function() {
    $('section').each(function(){
      var index = $(this).index();
      var nextIndex = index + 1;
      var prevIndex = index - 1;
      var waypointsDown = new Waypoint({
        element: $('.section'+index),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section'+index).addClass('currentPanel');
            if (prevIndex > 0) {
              $('.section'+prevIndex).removeClass('currentPanel');
            }
          }
        },
        offset: 200
      });
      var waypointsUp = new Waypoint({
        element: $('.section'+index),
        handler: function(direction) {
          if (direction === 'up') {
            $('.section'+index).addClass('currentPanel');
            if ($('.section'+index).length > 0) {
              $('.section'+nextIndex).removeClass('currentPanel');
            }
          }
        },
        offset: 100
      });
    });
  },

  clickToActivateFragment: function() {
    $('.fragmented .fragmented-part').each(function(){
      $(this).on('click', function(){
        var index = $(this).index();
        if (!($(this).hasClass('active'))) {
          $('.currentPanel .fragmented-part.active').removeClass('active');
          $('.currentPanel .fragmented-part.part'+index).addClass('active');
        }
      });
    });
  }
}

module.exports = slidePresentation;
