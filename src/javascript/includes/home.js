var Backbone = require('backbone');
var $ = require('jquery');
var _ = Backbone._;
Backbone.$ = $;

'use strict';

module.exports = Backbone.View.extend({

    el: $('.home'),

    events: {
        "click .link": "open",
    },

    initialize: function() {
        this.render();
    },

    open: function() {
        $('body').css({
            'background-color': 'gray',
            'color': 'white'
        });
    },

    render: function() {
        // Any DOM rendering goes here
    }

});