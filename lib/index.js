'use strict';

var tollan = require('tollan');
var serveStatic = require('serve-static');

// Tollan configuration
var config = {
	apiPrefix: '/api',
	routes: require('./routes')(tollan),
	defaultPageTitle: 'Tollan Example',
	port: 3001
};

// gzip in production
if (process.env.NODE_ENV !== 'development') {
	tollan.app.use(require('compression')());
}
// Serve our front-end files
tollan.app.use(serveStatic('build'));

var requestsServed = 0;
tollan.app.use(function(req, res, next) {
	if (process.env.NODE_ENV !== 'development') {
		req.id = ++requestsServed;
	}
	next();
});

// Log requests
var genReqId = function(req) {
	return req.id;
};
var levelFn = function(status, err) {
	if (err || status >= 500) {
		// server internal error or error
		return 'error';
	} else if (status > 400) {
		// client error
		return 'warn';
	} else if (status === 400) {
		// validation error
		return 'info';
	}
	return 'info';
};

if (process.env.NODE_ENV !== 'development') {
	tollan.app.use(require('express-bunyan-logger')({
		parseUA: false,
		genReqId: genReqId,
		levelFn: levelFn
	}));
} else {
	tollan.app.use(require('express-bunyan-logger')({
		parseUA: false,
		excludes: ['req', '*'],
		src: true,
		genReqId: genReqId,
		levelFn: levelFn,
		format: ':method :url :status-code :response-time ms :res-headers[content-length] '
	}));
}

// Use our API
// Could also have the API on a separate server/process, so it could be on a
// separate physical machine, for scalability.
// TODO: should be able to have the API on a separate process
var api = require('./api')(tollan);

tollan.app.use(config.apiPrefix, api);

// Start Tollan
tollan.start(config);
