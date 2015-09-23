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
          if ( !($currentPanel.hasClass('section5')) ) {
            that.findNext();
          } else {
            if ($currentPanel.hasClass('first') || $currentPanel.hasClass('second')) {
              that.fragmentedPanelDown();
            } else {
              that.findNext();
            }
          }
        } else if (e.keyCode === 38 || e.keyCode === 33) {
          e.preventDefault();
          if ( !($currentPanel.hasClass('section5')) ) {
            that.findPrev();
          } else {
            if ($currentPanel.hasClass('second') || $currentPanel.hasClass('third')) {
              that.fragmentedPanelUp();
            } else {
              that.findPrev();
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
      $section5 = $('.section5');
      if ($section5.hasClass('first')) {
        $('li.active').removeClass('active');
        $('.company-two').addClass('active');
        $('.company.active').hide().removeClass('active');
        $('.company:eq(1)').fadeIn().addClass('active');
        $section5.removeClass('first').addClass('second');
      } else if ($section5.hasClass('second')) {
        $('li.active').removeClass('active');
        $('.company-three').addClass('active');
        $('.company.active').hide().removeClass('active');
        $('.company:eq(2)').fadeIn().addClass('active');
        $section5.removeClass('second').addClass('third');
      }
    },

    fragmentedPanelUp: function() {
      var that = this;
      $section5 = $('.section5');
      if ($section5.hasClass('third')) {
        $('li.active').removeClass('active');
        $('.company-two').addClass('active');
        $('.company.active').hide().removeClass('active');
        $('.company:eq(1)').fadeIn().addClass('active');
        $section5.removeClass('third').addClass('second');
      } else if ($section5.hasClass('second')) {
        $('li.active').removeClass('active');
        $('.company-one').addClass('active');
        $('.company.active').hide().removeClass('active');
        $('.company:eq(0)').fadeIn().addClass('active');
        $section5.removeClass('second').addClass('first');
      }
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
      var waypoint4down = new Waypoint({
        element: $('.section4'),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section4').addClass('currentPanel');
            $('.section3').removeClass('currentPanel');
          }
        },
        offset: 200
      });
      var waypoint4up = new Waypoint({
        element: $('.section4'),
        handler: function(direction) {
          if (direction === 'up') {
            $('.section4').addClass('currentPanel');
            $('.section5').removeClass('currentPanel');
          }
        },
        offset: 100
      });
      var waypoint5down = new Waypoint({
        element: $('.section5'),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section5').addClass('currentPanel');
            $('.section4').removeClass('currentPanel');
          }
        },
        offset: 200
      });
      var waypoint5up = new Waypoint({
        element: $('.section5'),
        handler: function(direction) {
          if (direction === 'up') {
            $('.section5').addClass('currentPanel');
            $('.section6').removeClass('currentPanel');
          }
        },
        offset: 100
      });
      var waypoint6down = new Waypoint({
        element: $('.section6'),
        handler: function(direction) {
          if (direction === 'down') {
            $('.section6').addClass('currentPanel');
            $('.section5').removeClass('currentPanel');
          }
        },
        offset: 200
      });
      var waypoint6up = new Waypoint({
        element: $('.section6'),
        handler: function(direction) {
          if (direction === 'up') {
            $('.section6').addClass('currentPanel');
          }
        },
        offset: 100
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
