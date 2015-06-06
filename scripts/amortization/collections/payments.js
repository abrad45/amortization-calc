// Base
var Backbone = require('backbone');

// Models
var Payment = require('../models/payment.js');

var payments = Backbone.Collection.extend({
    model: Payment
});

module.exports = payments;
