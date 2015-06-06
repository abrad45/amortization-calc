// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = $;

// Views
var Amortization = require('./amortization/views/calculator.js');
var WeightedInterest = require('./weighted-interest/views/weighted-interest.js');

var router = Backbone.Router.extend({
    routes: {
        '': 'renderAmortization',
        'amortization': 'renderAmortization',
        'weighted-interest': 'renderWeightedInterest'
    },

    initialize: function() {
        this.$fieldsContainer = $('.fields-container');
        this.$resultsContainer = $('.results-container');
    },

    renderAmortization: function() {
        // Wanna always run this with the same starting values? Override `bootstrap`!
        var bootstrap = {};
        // var bootstrap = {
        //     'amount': 13918.84,
        //     'interestRate': 6,
        //     'paymentAmount': 400
        // };

        var amortizationView = new Amortization(bootstrap);
        this.$fieldsContainer.html(amortizationView.render().el);
    },

    renderWeightedInterest: function() {
        var weightedInterestView = new WeightedInterest();

        // @todo this is hacky and should be done with a teardown call in calculator.js
        this.$resultsContainer.html('');
        this.$fieldsContainer.html(weightedInterestView.render().el);
    }
});

module.exports = router;
