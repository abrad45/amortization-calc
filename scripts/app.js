var Router = require('./routers/router.js');
var Backbone = require('backbone');

/**
 * The fun starts here...
 */

var router = new Router();

Backbone.history.start();
