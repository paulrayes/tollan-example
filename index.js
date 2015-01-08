'use strict';

var tollan = require('tollan');
var serveStatic = require('serve-static');

var config = {
	apiPrefix: '/api',
	routes: require('./lib/routes')
};

tollan.app.use(serveStatic('build'));

tollan.start(config);
