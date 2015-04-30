// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');

var payment = Backbone.Model.extend({

    defaults: {
        'monthNumber': 0,
        'paymentNumber': 0,
        'remainingBalance': 0,
        'date': '1/1900',
        'interestPaid': 0,
        'totalInterestPaid': 0
    }
});

module.exports = payment;
