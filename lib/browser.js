'use strict';

var tollan = require('tollan-client');

tollan.React = require('react');
tollan.Router = require('react-router');
tollan.newforms = require('newforms');
tollan.BootstrapForm = require('newforms-bootstrap');

tollan.config = {
	apiPrefix: '/api',
	routes: require('./routes')(tollan)
};

tollan.mount();
