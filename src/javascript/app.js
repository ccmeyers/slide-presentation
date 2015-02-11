// include different backbone view files
var homeView = require('./includes/home');

var app = {
    
    start: function()
    {
        var home = new homeView();
    },
}

app.start();