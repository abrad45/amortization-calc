// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = $;

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
        'amount': 25000,
        'interestRate': 6.5,
        'paymentAmount': 350
    },

    /**
     * Off we go!
     *
     * @param  {object} options     possibly null set of options
     */
    initialize: function(options) {
        this.options = _.defaults({}, options, this.defaults);

        this.collection = new Payments();
        this.listenTo(this.collection, 'reset', this.renderPaymentRows);

        this.render();

        // We have to render the fields first, or else it's
        // really hard to cache selectors to them ;)
        this.assignVariables();
    },

    /**
     * Let's cache / prep some stuff! This prepares some local
     * variables so we don't have to look them up twice.
     */
    assignVariables: function() {
        // Form fields
        this.$amount = this.$el.find('.loan-amount');
        this.$interestRate = this.$el.find('.interest-rate');
        this.$paymentAmount = this.$el.find('.payment-amount');

        // Options shortcuts
        this.amount = this.options.amount;
        this.interestRate = this.options.interestRate;
        this.paymentAmount = this.options.paymentAmount;

        // Will hold models. Gets passed into `this.collection.reset()`
        this.paymentData = [];
    },

    /**
     * Simple enough way to get the two digit year. Obviously
     * won't work prior to 2000 or after 3000. Ooooooops!
     */
    resetDateData: function() {
        this.year = new Date().getFullYear() - 2000;
        this.month = new Date().getMonth();
    },

    /**
     * Ensures that the local variables for amount, interestRate
     * and paymentAmount always reflect the values the user
     * enters in the form fields
     *
     * Could be more efficient if we had one of these per field,
     * rather than setting all variables when you keyup in any
     * field but optimizations can come later.
     */
    updateValues: function() {
        // Coerce all these values from
        // strings to numbers with the `+`
        this.amount = +this.$amount.val();
        this.interestRate = +this.$interestRate.val();
        this.paymentAmount = +this.$paymentAmount.val();
    },

    /**
     * So we need a date for use in the table rows. This
     * gives it to us and preps the values for next time
     *
     * @return {string}     date in format m/yy
     */
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

    /**
     * How many days are in a given month?
     *
     * @param  {integer} m      month 1-12
     * @param  {integer} y      two-digit year
     * @return {integer}        number of days in m/y
     */
    daysInMonth: function(year, month) {
        var d = new Date((2000 + year), (1 + month), 0);
        return d.getDate();
    },

    /**
     * This is the big one! calculates every month's payment but the
     * last. Thoroughly documented inline, but the gist of it is...
     *
     * Each month, the following things happen in order:
     * 1. Figure out how much interest you owe this month
     * 2. Add it to your remainingBalance
     * 3. Make a payment, reducing your remainingBalance by your paymentAmount
     *
     * @param  {event} e
     */
    calculate: function(e) {
        e.preventDefault();

        // Preps `this.month` and `this.year` for use in
        // calculations and the like.
        this.resetDateData();

        // make some local vars and reset `this.paymentData`
        var remainingBalance = this.amount;
        var totalInterestPaid = 0;
        var monthlyInterest = 0;
        this.paymentData = [];

        for (var numberOfMonths = 1; remainingBalance > this.paymentAmount; numberOfMonths++) {
            // 1. Figure out how much interest you owe this month
            monthlyInterest = (remainingBalance * (this.interestRate / 100) / 12);

            // If your monthly payment amount won't even cover interest,
            // you'll never pay things off, and we'll enter an infinite loop.
            // This prevents a browser crash by bailing out.
            //
            // This only matters the first iteration through the loop
            if (monthlyInterest > this.paymentAmount) {
                // Alerts are gross. I should do this with Backbone or something
                alert('Whoa, partner. You\'ll never pay off your loan at that rate.');
                return;
            }

            // 2. Add it to your remainingBalance
            remainingBalance += monthlyInterest;

            // 2. Make a payment, reducing your remainingBalance by your paymentAmount
            remainingBalance -= this.paymentAmount;

            // Log all the things!
            totalInterestPaid += monthlyInterest;
            currentMonthData = {
                'monthNumber': (1 + this.month),
                'paymentNumber': numberOfMonths,
                'remainingBalance': remainingBalance,
                'date': this.generateAndUpdateDate(),
                'interestPaid': monthlyInterest,
                'totalInterestPaid': totalInterestPaid
            };

            // Put all the models in `this.paymentData`
            // and then reset the collection with them
            this.paymentData.push(new Payment(currentMonthData));
        }

        // At this point, `remainingBalance < this.paymentAmount`
        // so we need to calculate the final payment. Let's do it!
        this.calculateFinalPayment();

        // What's the total amount? We should put that somewhere!
        this.calculateTotalPayment();

        this.collection.reset(this.paymentData);
    },

    /**
     * So the final month's payment is trickier since the amount owed
     * will be less than the amount being paid each prior month.
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

    /**
     * @todo calculates the total amount of money
     * paid over the length of the loan repayment
     */
    calculateTotalPayment: function() {
        // var penultimatePaymentAmount = _.last(this.paymentData).toJSON().remainingBalance;
        // var subTotalAmount = (this.paymentData.length - 1) * this.paymentAmount;
        // console.log(subTotalAmount + penultimatePaymentAmount);
    },

    /**
     * Draw a table with nothing in it.
     */
    render: function() {
        this.$el.html(this.template(this.options));
        this.resultsTable = new ResultsTable();
        return this;
    },

    /**
     * Clears out the payments table and renders new rows inside it
     */
    renderPaymentRows: function(payment) {
        this.resultsTable.render();
        this.collection.forEach(function(payment) {
            new ResultRow(payment.toJSON());
        });
    },
});

module.exports = calculator;
