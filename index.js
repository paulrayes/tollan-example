'use strict';

var tollan = require('tollan');
var serveStatic = require('serve-static');

var config = {
	apiPrefix: '/api',
	routes: require('./lib/routes')
};

// gzip in production
if (process.env.NODE_ENV === 'production') {
	tollan.app.use(require('compression')());
}
// Serve our front-end files
tollan.app.use(serveStatic('build'));

tollan.start(config);
