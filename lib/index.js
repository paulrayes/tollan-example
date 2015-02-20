'use strict';

// Transparently support JSX
require('node-jsx').install({extension: '.jsx'});

var tollan = require('tollan-client');
var serveStatic = require('serve-static');

tollan.React = require('react');
tollan.Router = require('react-router');
tollan.newforms = require('newforms');
tollan.BootstrapForm = require('newforms-bootstrap');

// Tollan configuration
tollan.config = {
	apiPrefix: '/api',
	routes: require('./routes')(tollan),
	defaultPageTitle: 'Tollan Example',
	port: 3001
};

// Serve our front-end files
tollan.app.use(serveStatic('build'));

// Use our API
// Could also have the API on a separate server/process, so it could be on a
// separate physical machine, for scalability.
// TODO: should be able to have the API on a separate process
var api = require('./api')(tollan);
var actionRoutes = require('./actionRoutes')(tollan);
var modelRoutes = require('./modelRoutes')(tollan);

tollan.app.use(config.apiPrefix+'/action', actionRoutes);
tollan.app.use(config.apiPrefix+'/model', modelRoutes);
tollan.app.use(config.apiPrefix, api);

var eventStreamer = require('./eventStreamer');
var dynamicItemAddedProjection = require('./projections/dynamicItemAdded');
dynamicItemAddedProjection.then(function(projection) {
	eventStreamer.on('dynamic/itemAdded', projection);
	eventStreamer.start();
});

// Start Tollan
tollan.start();
