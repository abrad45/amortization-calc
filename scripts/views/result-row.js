// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
var Numeral = require('numeral');

var template = require('../templates/result-row.tpl');

var resultsRow = Backbone.View.extend({
    tagName: 'tr',

    attributes: function() {
        return {
            class: 'payment month-' + this.model.get('monthNumber')
        };
    },

    template: template,

    defaults: {
        'monthNumber': '1',
        'payment_number': '0',
        'date': '1/1900',
        'interestPaid': 0,
        'totalInterestPaid': 0,
        'remainingBalance': 0,
        'moneyFormat': '$0,0.00',
        'numeral': Numeral
    },

    initialize: function(options) {
        this.options = _.defaults({}, this.model.toJSON(), this.defaults);
    },

    render: function() {
        this.$el.html(this.template(this.options));
        return this;
    }
});

module.exports = resultsRow;
