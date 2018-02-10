// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
var Numeral = require('numeral');
Backbone.$ = $;

// Views
var InterestRow = require('./interest-row.js');

// Templates
var template = require('../templates/weighted-interest.tpl');

var weightedInterest = Backbone.View.extend({
    className: 'interest-calculator',

    template: template,

    events: {
        'keyup .form-control': 'calculate',
        'click .button-add-loan': 'renderInterestRow'
    },

    /**
     * Off we go!
     *
     * @param  {object} options     possibly null set of options
     */
    initialize: function(options) {
        this.options = _.defaults({}, options, this.defaults);
    },

    /**
     * Let's cache / prep some stuff! This prepares some local
     * variables so we don't have to look them up twice.
     */
    cacheSelectors: function() {
        // I had these cached, but if you switched back and forth
        // from view to view, the cached value would be used in-
        // stead of redefining the value, so no caching here :/
        this.$interestRowsContainer = this.$('.individual-loans');
        this.$resultSummary = this.$('.interest-summary');

        this.$loans = this.$('.loan-with-interest');
    },

    /**
     * Renders an interest summary after calculating the total
     * amount and the weighted average interest rate
     */
    calculate: function() {
        var weightFactor = 0;
        var total = 0;

        // formula from
        // http://loanconsolidation.ed.gov/help/rate.html
        this.$loans.each(function () {
            var amount = $(this).find('.loan-amount').val();
            var rate = $(this).find('.interest-rate').val();

            weightFactor += (amount * rate);
            total += (+amount);
        });

        this.renderInterestSummary({
            'amount': total,
            'rate': (weightFactor/total).toFixed(3)
        });
    },

    /**
     * Draw a container for some rows to be put into.
     */
    render: function() {
        this.$el.html(this.template(this.options));

        // Now that the fields are rendered, let's
        // cache selectors to a bunch of 'em
        this.cacheSelectors();

        // Let's start with 3 fields.
        this.renderInterestRow();
        this.renderInterestRow();
        this.renderInterestRow();

        return this;
    },

    /**
     * Renders a row of fields for one loan (amount and rate).
     */
    renderInterestRow: function() {
        var row = new InterestRow();

        this.$interestRowsContainer.append(row.render().el);

        this.cacheSelectors();
    },

    /**
     * Prints a summary of the money owed and at what rate.
     *
     * @param  {object} data    contains `amount` and `rate`
     */
    renderInterestSummary: function(data) {
        // @todo this is ugly and should be handled better (subviews?)
        this.$resultSummary
            .html('')
            .append($('<h3 />', {
                'text': 'You owe a total of ' + Numeral(data.amount).format('$0,0.00') + ' at an interest rate of ' + data.rate + '%.'
            }));
    }
});

module.exports = weightedInterest;
