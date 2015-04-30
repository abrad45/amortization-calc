// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = $; //@todo ugh why?

// Views
var ResultsTable = require('./results-table.js');
var ResultRow = require('./result-row.js');

// Models
var Payment = require('../models/payment.js');

// Collections
var Payments = require('../collections/payments.js');

// Templates
var template = require('../templates/inputs.tpl');

var calculator = Backbone.View.extend({
    el: '.amore-calculator',

    template: template,

    events: {
        'keyup .form-control': 'updateValues',
        'click .calculate': 'calculate'
    },

    defaults: {
        'debug': true,
        'amount': 25000,
        'interestRate': 6.5,
        'paymentAmount': 200
    },

    initialize: function(options) {
        this.options = _.defaults({}, options, this.defaults);

        this.collection = new Payments();

        this.listenTo(this.collection, 'reset', this.renderPaymentRows);

        this.render();
        this.assignVariables();
    },

    assignVariables: function() {
        this.$amount = this.$el.find('.loan-amount');
        this.$interestRate = this.$el.find('.interest-rate');
        this.$paymentAmount = this.$el.find('.payment-amount');

        this.amount = this.options.amount;
        this.interestRate = this.options.interestRate;
        this.paymentAmount = this.options.paymentAmount;
        this.paymentData = [];

        // For displaying date stuff
        this.resetDateData();
    },

    updateValues: function() {
        this.amount = +this.$amount.val();
        this.interestRate = +this.$interestRate.val();
        this.paymentAmount = +this.$paymentAmount.val();
    },

    generateAndUpdateDate: function() {
        var currentDate = (1 + this.month) + '/' + this.year;

        // December rolls to January
        if (this.month === 11) {
            this.month = 0;
            this.year++;
        } else {
            this.month++;
        }

        return currentDate;
    },

    resetDateData: function() {
        // simple enough way to get the two digit year. obviously
        // won't work prior to 2000 but the future is now.
        this.year = new Date().getFullYear() - 2000;
        this.month = new Date().getMonth();

    },

    calculate: function(e) {
        e.preventDefault();
        var remainingBalance = this.amount;
        var totalInterestPaid = 0;
        var monthlyInterest = 0;
        this.paymentData = [];

        // each month, the following things happen:
        // 1. Figure out how much interest you owe this month
        // 2. Add it to your remainingBalance
        // 3. Make a payment, reducing your remainingBalance by your paymentAmount
        for (var numberOfMonths = 0; remainingBalance > this.paymentAmount; numberOfMonths++) {
            // 1. Figure out how much interest you owe this month
            monthlyInterest = (remainingBalance * (this.interestRate / 100) / 12);

            // If your monthly payment amount won't even cover interest,
            // you'll never pay things off, and we'll enter an infinite loop.
            // This prevents that by bailing out.
            if(monthlyInterest > this.paymentAmount) {
                alert('Whoa, partner. You\'ll never pay off your loan at that rate.');
                return;
            }

            // 2. Add it to your remainingBalance
            remainingBalance += monthlyInterest;

            // 2. Make a payment, reducing your remainingBalance by your paymentAmount
            remainingBalance -= this.paymentAmount;

            // Log all the data
            totalInterestPaid += monthlyInterest;
            currentMonthData = {
                'monthNumber': (1 + this.month),
                'paymentNumber': (1 + numberOfMonths),
                'remainingBalance': remainingBalance,
                'date': this.generateAndUpdateDate(),
                'interestPaid': monthlyInterest,
                'totalInterestPaid': totalInterestPaid
            };

            this.paymentData.push(new Payment(currentMonthData));
        }

        // let's get that last payment handled, shall we?
        this.calculateFinalPayment();

        this.collection.reset(this.paymentData);
        this.resetDateData();
    },

    /**
     * So the final month's payment is trickier since the amount
     * will be less than the amount being paid each prior month.
     *
     */
    calculateFinalPayment: function() {
        var penultimatePayment = _.last(this.paymentData).toJSON();
        var remainingBalance = penultimatePayment.remainingBalance;
        var monthlyInterest = (remainingBalance * (this.interestRate / 100) / 12);

        remainingBalance = penultimatePayment.remainingBalance + monthlyInterest;

        var currentMonthData = {
            'monthNumber': (1 + this.month),
            'paymentNumber': (1 + penultimatePayment.paymentNumber),
            'remainingBalance': remainingBalance,
            'date': this.generateAndUpdateDate(),
            'interestPaid': monthlyInterest,
            'totalInterestPaid': penultimatePayment.totalInterestPaid + monthlyInterest
        };

        this.paymentData.push(currentMonthData);
    },

    render: function() {
        this.$el.html(this.template(this.options));
        var resultsTable = new ResultsTable();
        return this;
    },

    renderPaymentRows: function(payment) {
        this.$('.month-results').html('');
        this.collection.forEach(function(payment) {
            new ResultRow(payment.toJSON());
        });
    },
});

module.exports = calculator;
