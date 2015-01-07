'use strict';

var tollan = require('tollan');

var config = {
	apiPrefix: '/api',
	routes: require('./lib/routes'),
	notFoundView: require('./lib/notFoundView')
}

tollan.start(config);
