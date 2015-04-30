var $ = require('jquery');
var Calculator = require('./views/calculator.js');

var bootstrap = {
    'amount': 13918.84,
    'interestRate': 6,
    'paymentAmount': 400
};

$(function () {
    var app = new Calculator(bootstrap);
});
