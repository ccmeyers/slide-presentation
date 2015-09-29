$ = require('jquery');
jQuery = $;
var waypoint = require('../vendor/waypoints/lib/jquery.waypoints.js');

var slidePresentation = {

  init: function() {
    this.getCurrentPanel();
    this.slider();
    this.clickToActivateFragment();
  },

  vars: {
    activeClass: 'active',
    fragmentedClass: 'fragmented',
    firstFragmentClass: 'first-fragment',
    lastFragmentClass: 'last-fragment',
    addFragmentClass: 'add-fragmented'
  },

  slider: function(e) {
    var that = this;
    $(document).on('keydown', function(e){
      var currentPanel = $('.current-panel');
      if (e.keyCode === 40 || e.keyCode === 32 || e.keyCode === 13  || e.keyCode === 34) {
        e.preventDefault();
        if (currentPanel.hasClass(that.vars.fragmentedClass) && !(currentPanel.hasClass(that.vars.lastFragmentClass))) {
          that.fragmentedPanel('down');
        } else if (currentPanel.hasClass(that.vars.addFragmentClass) && !(currentPanel.hasClass(that.vars.lastFragmentClass))) {
          that.addFragment();
        } else {
          that.findNext();
        }
      } else if (e.keyCode === 38 || e.keyCode === 33) {
        e.preventDefault();
        if ( currentPanel.hasClass(that.vars.fragmentedClass) && !(currentPanel.hasClass(that.vars.firstFragmentClass)) ) {
          that.fragmentedPanel('up');
        } else {
          that.findPrev();
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
    var that = this,
        currentPanel = $('.current-panel'),
        nextPanel = currentPanel.next('section');
    if (nextPanel.length > 0) {
      that.scrollToElement(nextPanel);
    }
  },

  findPrev: function() {
    var that = this,
        currentPanel = $('.current-panel'),
        prevPanel = currentPanel.prev('section');
    if (prevPanel.length > 0) {
      that.scrollToElement(prevPanel);
    }
  },

  fragmentedPanel: function(movement) {
    var that = this,
        currentFragmentedPanel = $('.current-panel.fragmented'),
        currentFragmentedParts = currentFragmentedPanel.find('.fragmented-part.active');
    currentFragmentedParts.each(function(){
      var fragmentIndex = $(this).index(),
          nextFragment = $('.current-panel .fragmented-part.part'+fragmentIndex).next(),
          prevFragment = $('.current-panel .fragmented-part.part'+fragmentIndex).prev(),
          checkForLast = nextFragment.next(),
          checkForFirst = fragmentIndex - 2;
      if (movement === 'down' && nextFragment.length > 0) {
        if (checkForLast.length > 0) {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          nextFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.firstFragmentClass);
          currentFragmentedPanel.removeClass(that.vars.lastFragmentClass);
        } else {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          nextFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.firstFragmentClass);
          currentFragmentedPanel.addClass(that.vars.lastFragmentClass);
        }
      } else if (movement === 'up' && prevFragment.length > 0) {
        if (checkForFirst >= 0) {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          prevFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.firstFragmentClass).removeClass(that.vars.lastFragmentClass);
        } else {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          prevFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.lastFragmentClass).addClass(that.vars.firstFragmentClass);
        }
      }
    });
  },

  addFragment: function() {
    var that = this,
        currentAddFragmentedPanel = $('.current-panel.add-fragmented'),
        currentAddFragmentedParts = currentAddFragmentedPanel.find('.add-fragmented-part.active');
    currentAddFragmentedParts.each(function(){
      var addFragmentIndex = $(this).index(),
          currentAddFragment = $('.current-panel .add-fragmented-part.part'+addFragmentIndex),
          nextAddFragment = currentAddFragment.next(),
          checkForLastAddFragment = nextAddFragment.next();
      if (nextAddFragment.length > 0) {
        if (checkForLastAddFragment.length > 0) {
          nextAddFragment.addClass(that.vars.activeClass);
        } else {
          nextAddFragment.addClass(that.vars.activeClass);
          currentAddFragmentedPanel.addClass(that.vars.lastFragmentClass);
        }
      }
    });
  },

  getCurrentPanel: function() {
    $('section').each(function(){
      var index = $(this).index(),
          currentSection = $('.section'+index),
          nextSection = currentSection.next(),
          prevSection = currentSection.prev();
          currentPanelClass = 'current-panel';
      var waypointsDown = new Waypoint({
        element: currentSection,
        handler: function(direction) {
          if (direction === 'down') {
            currentSection.addClass(currentPanelClass);
            if (prevSection.length > 0) {
              prevSection.removeClass(currentPanelClass);
            }
          }
        },
        offset: 200
      });
      var waypointsUp = new Waypoint({
        element: currentSection,
        handler: function(direction) {
          if (direction === 'up') {
            currentSection.addClass(currentPanelClass);
            if (currentSection.length > 0) {
              nextSection.removeClass(currentPanelClass);
            }
          }
        },
        offset: 100
      });
    });
  },

  clickToActivateFragment: function() {
    var fragmentedParts = $('.fragmented .fragmented-part');
    fragmentedParts.each(function(){
      $(this).on('click', function(){
        var index = $(this).index(),
            parentSection = $(this).parents('section'),
            activeFragmentedParts = parentSection.find('.fragmented-part.active'),
            currentFragmentedParts = parentSection.find('.fragmented-part.part'+index),
            isLastFragment = currentFragmentedParts.next().length === 0,
            isFirstFragment = currentFragmentedParts.prev().length === 0;
        if (!($(this).hasClass(that.vars.activeClass))) {
          activeFragmentedParts.removeClass(that.vars.activeClass);
          currentFragmentedParts.addClass(that.vars.activeClass);
          if (isLastFragment) {
            parentSection.removeClass(that.vars.firstFragmentClass).addClass(that.vars.lastFragmentClass);
          } else if (isFirstFragment) {
            parentSection.removeClass(that.vars.lastFragmentClass).addClass(that.vars.firstFragmentClass);
          } else {
            parentSection.removeClass(that.vars.firstFragmentClass).removeClass(that.vars.lastFragmentClass);
          }
        }
      });
    });
  }
}

module.exports = slidePresentation;
