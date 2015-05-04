var $ = require('jquery');
var Calculator = require('./views/calculator.js');

$(function () {
    // Wanna always run this with the same starting values? Override `bootstrap`!
    var bootstrap = {};
    // var bootstrap = {
    //     'amount': 13918.84,
    //     'interestRate': 6,
    //     'paymentAmount': 400
    // };

    var app = new Calculator(bootstrap);
    $('.fields-container').append(app.render().el);
});
