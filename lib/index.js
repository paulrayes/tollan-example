'use strict';

var tollan = require('tollan');
var serveStatic = require('serve-static');

// Tollan configuration
var config = {
	apiPrefix: '/api',
	routes: require('./routes'),
	defaultPageTitle: 'Tollan Example',
	port: 3000
};

// gzip in production
if (process.env.NODE_ENV === 'production') {
	tollan.app.use(require('compression')());
}
// Serve our front-end files
tollan.app.use(serveStatic('build'));

// Start Tollan
tollan.start(config);
