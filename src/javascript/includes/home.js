var Backbone = require('backbone');
var $ = require('jquery');
var _ = Backbone._;
Backbone.$ = $;

'use strict';

module.exports = Backbone.View.extend({

    el: $('.yourParentElement'),

    events: {
        "click .link": "yourFunction",
    },

    initialize: function() {
        this.render();
    },

    yourFunction: function() {
        $('body').css({
            'background-color': 'gray',
            'color': 'white'
        });
    },

    render: function() {
        // Any DOM rendering goes here
    }

});