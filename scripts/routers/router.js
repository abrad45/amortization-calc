// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = $;

// Views
var Amortization = require('../views/calculator.js');
var WeightedInterest = require('../views/weighted-interest.js');

var router = Backbone.Router.extend({
    routes: {
        '': 'renderAmortization',
        'amortization': 'renderAmortization',
        'weighted-interest': 'renderWeightedInterest'
    },

    initialize: function() {
        // Wanna always run this with the same starting values? Override `bootstrap`!
        var bootstrap = {};
        // var bootstrap = {
        //     'amount': 13918.84,
        //     'interestRate': 6,
        //     'paymentAmount': 400
        // };

        this.amortizationView = new Amortization(bootstrap);

        this.weightedInterestView = new WeightedInterest();

        this.$fieldsContainer = $('.fields-container');
        this.$resultsContainer = $('.results-container');
    },

    renderAmortization: function() {
        this.$fieldsContainer.html(this.amortizationView.render().el);
    },

    renderWeightedInterest: function() {
        // @todo this is hacky and should be done with a teardown call in calculator.js
        this.$resultsContainer.html('');
        this.$fieldsContainer.html(this.weightedInterestView.render().el);
    }
});

module.exports = router;
