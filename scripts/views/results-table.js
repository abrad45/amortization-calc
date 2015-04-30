// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');

// Views
var resultRow = require('./result-row.js');

// Templates
var template = require('../templates/results-table.tpl');

var resultsTable = Backbone.View.extend({
    el: '.amore-results-display',

    template: template,

    defaults: {},

    initialize: function(options) {
        this.options = _.defaults({}, options, this.defaults);

        this.render();
    },

    render: function() {
        this.$el.html(this.template(this.options));

        for (var row in this.options) {
            var tmp = new resultRow(this.options[row]);
        }

        return this;
    }
});

module.exports = resultsTable;
