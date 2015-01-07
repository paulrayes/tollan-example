'use strict';

var tollan = require('tollan');

var config = {
	apiPrefix: '/api',
	routes: require('./lib/routes')
};

tollan.start(config);
