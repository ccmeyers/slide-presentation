$ = require('jquery');
jQuery = $;
var waypoint = require('waypoints');
var vimeo = require('../vendor/froogaloop/froogaloop.min.js');

var slidePresentation = {

  init: function() {
    this.getCurrentPanel();
    this.slider();
    this.clickToActivateFragment();
    this.clickToNextFragment();
    this.clickToPrevFragment();
    this.clickToPlayVideo();
  },

  vars: {
    activeClass: 'active',
    fragmentedClass: 'fragmented',
    firstFragmentClass: 'first-fragment',
    lastFragmentClass: 'last-fragment',
    addFragmentClass: 'add-fragmented',
    videoClass: 'video',
    videoPlayingClass: 'video-playing'
  },

  //this is the main slide functionality that detects keyCodes and either slides to next, previous, or enacts the fragmentedPanel functionality if needed

  slider: function(e) {
    var that = this;
    $(document).on('keydown', function(e){
      var currentPanel = $('.current-panel');
      if (e.keyCode === 40 || e.keyCode === 32 || e.keyCode === 13  || e.keyCode === 34 || e.keyCode === 39) {
        e.preventDefault();
        if (currentPanel.hasClass(that.vars.fragmentedClass) && !(currentPanel.hasClass(that.vars.lastFragmentClass))) {
          //check to see if it's a fragmented slide that's not on its last fragment
          that.fragmentedPanel('down');
        } else if (currentPanel.hasClass(that.vars.addFragmentClass) && !(currentPanel.hasClass(that.vars.lastFragmentClass))) {
          //check to see if it's an add fragment slide that's not on its last fragment
          that.addFragment();
        } else if (currentPanel.hasClass(that.vars.videoPlayingClass)) {
          //if video is playing, pause before going to the next slide
          that.pauseVideo();
          that.findNext();
        } else {
          that.findNext();
        }
      } else if (e.keyCode === 38 || e.keyCode === 33 || e.keyCode === 37) {
        e.preventDefault();
        if ( currentPanel.hasClass(that.vars.fragmentedClass) && !(currentPanel.hasClass(that.vars.firstFragmentClass)) ) {
          that.fragmentedPanel('up');
        } else {
          that.findPrev();
        }
      }
    });
  },

  //detecting the current panel using Waypoints (http://imakewebthings.com/waypoints/)
  //a waypoint is created for each section so that section gets the class "current-panel" when it is in view
  getCurrentPanel: function() {
    var navHeight = $('header').outerHeight() - 1;

    $('section').each(function(){
      var index = $(this).index('section'),
          currentSection = $('section').get(index),
          nextSection = $(currentSection).next(),
          prevSection = $(currentSection).prev();
          currentPanelClass = 'current-panel';

      var waypointsDown = new Waypoint({
        element: currentSection,
        handler: function(direction) {
          if (direction === 'down') {
            $(currentSection).addClass(currentPanelClass);
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
            $(currentSection).addClass(currentPanelClass);
            if ($(currentSection).length > 0) {
              nextSection.removeClass(currentPanelClass);
            }
          }
        },
        offset: navHeight
      });
    });
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

  scrollToElement: function(panel) {
    var navHeight = $('header').outerHeight();
    $('html, body').animate({
      scrollTop: panel.offset().top - navHeight
    }, 200);
  },

  //if a slide has fragments, the keyCodes will move through the fragments, constantly checking for the last or first fragment so it knows when to move to next or prev slide -- there is also additional if statements to check if the slide has videos that need to be played or paused
  fragmentedPanel: function(movement) {
    var that = this,
        currentFragmentedPanel = $('.current-panel.fragmented'),
        currentFragmentedParts = currentFragmentedPanel.find('.fragmented-part.active');
    currentFragmentedParts.each(function(){
      var fragmentIndex = $(this).index('.current-panel .fragmented-part'),
          fragment = $('.current-panel .fragmented-part').get(fragmentIndex),
          nextFragment = $(fragment).next(),
          prevFragment = $(fragment).prev(),
          checkForLast = nextFragment.next(),
          checkForFirst = fragmentIndex - 2,
          hasSubnav = currentFragmentedPanel.find('.fragment-subnav').length;
      if (hasSubnav) {
        var activeSubnav = $('.current-panel .fragment-subnav.active'),
            nextSubnav = $('.current-panel .fragment-subnav').get(fragmentIndex + 1),
            prevSubnav = $('.current-panel .fragment-subnav').get(fragmentIndex - 1);
      }
      if (movement === 'down' && nextFragment.length > 0) {
        if (nextFragment.hasClass(that.vars.videoClass)) {
          that.playVideo();
        }
        if (checkForLast.length > 0) {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          nextFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.firstFragmentClass);
          currentFragmentedPanel.removeClass(that.vars.lastFragmentClass);
          if (hasSubnav) {
            activeSubnav.removeClass(that.vars.activeClass);
            $(nextSubnav).addClass(that.vars.activeClass);
          }
        } else {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          nextFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.firstFragmentClass);
          currentFragmentedPanel.addClass(that.vars.lastFragmentClass);
          if (hasSubnav) {
            activeSubnav.removeClass(that.vars.activeClass);
            $(nextSubnav).addClass(that.vars.activeClass);
          }
        }
      } else if (movement === 'up' && prevFragment.length > 0) {
        if ($('.current-panel .fragmented-part.active').hasClass(that.vars.videoClass)) {
          that.pauseVideo();
        }
        if (checkForFirst >= 0) {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          prevFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.firstFragmentClass).removeClass(that.vars.lastFragmentClass);
          if (hasSubnav) {
            activeSubnav.removeClass(that.vars.activeClass);
            $(prevSubnav).addClass(that.vars.activeClass);
          }
        } else {
          currentFragmentedParts.removeClass(that.vars.activeClass);
          prevFragment.addClass(that.vars.activeClass);
          currentFragmentedPanel.removeClass(that.vars.lastFragmentClass).addClass(that.vars.firstFragmentClass);
          if (hasSubnav) {
            activeSubnav.removeClass(that.vars.activeClass);
            $(prevSubnav).addClass(that.vars.activeClass);
          }
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
          currentAddFragment = $('.current-panel .add-fragmented-part').get(addFragmentIndex),
          nextAddFragment = $(currentAddFragment).next(),
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

  //for the ability to click through fragments through prev/next arrows 
  clickToNextFragment: function() {
    var that = this;
    var nextArrow = $('.next-arrow');
    nextArrow.on('click', function() {
      var parentSection = $(this).parents('section'),
          currentFragmentedPart = $(this).parents('.current-panel .fragmented-part.active'),
          nextFragmentedPart = currentFragmentedPart.next(),
          isLastFragment = nextFragmentedPart.next().length === 0;

      currentFragmentedPart.removeClass(that.vars.activeClass);
      nextFragmentedPart.addClass(that.vars.activeClass);
      parentSection.removeClass(that.vars.firstFragmentClass);

      if (isLastFragment) {
        parentSection.removeClass(that.vars.firstFragmentClass).addClass(that.vars.lastFragmentClass);
      } else {
        parentSection.removeClass(that.vars.firstFragmentClass).removeClass(that.vars.lastFragmentClass);
      }
    });
  },

  clickToPrevFragment: function() {
    var that = this;
    var prevArrow = $('.prev-arrow');

    prevArrow.on('click', function() {
      var parentSection = $(this).parents('section'),
          currentFragmentedPart = $(this).parents('.current-panel .fragmented-part'),
          prevFragmentedPart = currentFragmentedPart.prev('.fragmented-part'),
          isFirstFragment = prevFragmentedPart.prev('.fragmented-part').length === 0;

      currentFragmentedPart.removeClass(that.vars.activeClass);
      prevFragmentedPart.addClass(that.vars.activeClass);
      parentSection.removeClass(that.vars.lastFragmentClass);

      if (isFirstFragment) {
        parentSection.removeClass(that.vars.lastFragmentClass).addClass(that.vars.firstFragmentClass);
      } else {
        parentSection.removeClass(that.vars.firstFragmentClass).removeClass(that.vars.lastFragmentClass);
      }
    });
  },

  //for the ability to use a fragment subnav
  clickToActivateFragment: function() {
    var that = this;
    var fragmentedParts = $('.fragmented .fragment-subnav');
    fragmentedParts.each(function(){
      $(this).on('click', function(){
        var index = $(this).index(),
            parentSection = $(this).parents('section'),
            activeSubnav = parentSection.find('.fragment-subnav.active'),
            activeFragmentedPart = parentSection.find('.fragmented-part.active'),
            targetFragmentedPart = parentSection.find('.fragmented-part').get(index),
            isLastFragment = $(targetFragmentedPart).next().length === 0,
            isFirstFragment = $(targetFragmentedPart).prev().length === 0;
            
        console.log('activeFragmentedPart: ', activeFragmentedPart);
        console.log('targetFragmentedPart: ', targetFragmentedPart);

        activeSubnav.removeClass(that.vars.activeClass);
        $(this).addClass(that.vars.activeClass);
        activeFragmentedPart.removeClass(that.vars.activeClass);
        $(targetFragmentedPart).addClass(that.vars.activeClass);

        if (isLastFragment) {
          parentSection.removeClass(that.vars.firstFragmentClass).addClass(that.vars.lastFragmentClass);
        } else if (isFirstFragment) {
          parentSection.removeClass(that.vars.lastFragmentClass).addClass(that.vars.firstFragmentClass);
        } else {
          parentSection.removeClass(that.vars.firstFragmentClass).removeClass(that.vars.lastFragmentClass);
        }
      });
    });
  },

  pauseVideo: function() {
    var that = this;
    var currentFragmentedPanel = $('.current-panel.fragmented'),
        videoId = $('.current-panel .fragmented-part.video').find('iframe').attr('id'),
        iframe = $('#'+videoId)[0],
        player = $f(iframe);
    player.api('pause');
    currentFragmentedPanel.removeClass(that.vars.videoPlayingClass);
  },

  playVideo: function() {
    var that = this;
    var currentFragmentedPanel = $('.current-panel.fragmented'),
        videoId = $('.current-panel .fragmented-part.video').find('iframe').attr('id'),
        iframe = $('#'+videoId)[0],
        player = $f(iframe);
    player.api('play');
    currentFragmentedPanel.addClass(that.vars.videoPlayingClass);
  },

  clickToPlayVideo: function() {
    var that = this;
    $('iframe').each(function() {
      var iframeId = $(this).attr('id'),
          iframe = $('#'+iframeId)[0],
          player = $f(iframe),
          clickLayer = $(this).parents('.video').prev('.video-img');

      clickLayer.on('click', function() {
        console.log('clicking');
        var parentSection = $(this).parents('section');
        $(this).removeClass(that.vars.activeClass).next().addClass(that.vars.activeClass);
        parentSection.removeClass(that.vars.firstFragmentClass).addClass(that.vars.lastFragmentClass).addClass(that.vars.videoPlayingClass);
        player.api('play');
      });
    });
  }
}

module.exports = slidePresentation;