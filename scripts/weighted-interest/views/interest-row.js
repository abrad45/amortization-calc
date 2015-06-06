// Base
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');

var template = require('../templates/interest-row.tpl');

var interestRow = Backbone.View.extend({
    tagName: 'div',

    className: 'interest-row',

    template: template,

    initialize: function(options) {
        this.options = _.defaults({}, this.options, this.defaults);
    },

    render: function() {
        this.$el.html(this.template(this.options));
        return this;
    }
});

module.exports = interestRow;
