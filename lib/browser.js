'use strict';

var tollan = require('tollan');

var config = {
	apiPrefix: '/api',
	routes: require('./routes')(tollan)
};

tollan.mount(config);
