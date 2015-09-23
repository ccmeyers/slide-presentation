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
        this.companiesActivate();
    },

    slider: function(e) {
      var that = this;
      $(document).on('keydown', function(e){
        var $currentPanel = $('.currentPanel');
        if (e.keyCode === 40 || e.keyCode === 32 || e.keyCode === 13  || e.keyCode === 34) {
          e.preventDefault();
          if ( !($currentPanel.hasClass('fragmented')) ) {
            that.findNext();
          } else {
            if ($currentPanel.hasClass('last-fragment')) {
              that.findNext();
            } else {
              that.fragmentedPanelDown();
            }
          }
        } else if (e.keyCode === 38 || e.keyCode === 33) {
          e.preventDefault();
          if ( !($currentPanel.hasClass('fragmented')) ) {
            that.findPrev();
          } else {
            if ($currentPanel.hasClass('first-fragment')) {
              that.findPrev();
            } else {
              that.fragmentedPanelUp();
            }
          }
        }
      });
    },

    scrollToElement: function(panel) {
      $('html, body').animate({
        scrollTop: panel.offset().top - 103
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

    fragmentedPanelDown: function() {
      var that = this;
      var currentFragmentedPanel = $('.currentPanel.fragmented');
      var currentFragmentedParts = currentFragmentedPanel.find('.fragmented-part.active');
      currentFragmentedParts.each(function(){
        var fragmentIndex = $(this).index();
        var nextFragment = fragmentIndex + 1;
        var checkLast = fragmentIndex + 2;
        if ($('.fragmented-part.part'+nextFragment).length > 0) {
          if ($('.fragmented-part.part'+checkLast).length > 0) {
            currentFragmentedParts.removeClass('active');
            $('.fragmented-part.part'+nextFragment).addClass('active');
            currentFragmentedPanel.removeClass('first-fragment');
            currentFragmentedPanel.removeClass('last-fragment');
          } else {
            currentFragmentedParts.removeClass('active');
            $('.fragmented-part.part'+nextFragment).addClass('active');
            currentFragmentedPanel.removeClass('first-fragment');
            currentFragmentedPanel.addClass('last-fragment');
          }
        }
      });
    },

    fragmentedPanelUp: function() {
      var that = this;
      var currentFragmentedPanel = $('.currentPanel.fragmented');
      var currentFragmentedParts = currentFragmentedPanel.find('.fragmented-part.active');
      currentFragmentedParts.each(function(){
        var fragmentIndex = $(this).index();
        var prevFragment = fragmentIndex - 1;
        var checkFirst = fragmentIndex - 2;
        if (prevFragment >= 0) {
          if (checkFirst >= 0) {
            currentFragmentedParts.removeClass('active');
            $('.fragmented-part.part'+prevFragment).addClass('active');
            currentFragmentedPanel.removeClass('first-fragment');
            currentFragmentedPanel.removeClass('last-fragment');
          } else {
            currentFragmentedParts.removeClass('active');
            $('.fragmented-part.part'+prevFragment).addClass('active');
            currentFragmentedPanel.removeClass('last-fragment');
            currentFragmentedPanel.addClass('first-fragment');
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

    companiesActivate: function() {
      $('.companies li').each(function(){
        $(this).on('click', function(){
          var index = $(this).index();
          if (!($(this).hasClass('active'))) {
            $('li.active').removeClass('active');
            $(this).addClass('active');
            $('.company.active').hide().removeClass('active');
            $('.company:eq('+index+')').fadeIn().addClass('active');
          }
        });
      });
    }

});
