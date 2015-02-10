'use strict';

module.exports = function(tollan) {
	var React = tollan.React;
	var Router = tollan.Router;
	var Route = Router.Route;
	var NotFoundRoute = Router.NotFoundRoute;
	var DefaultRoute = Router.DefaultRoute;
	//var Link = Router.Link;
	//var RouteHandler = Router.RouteHandler;

	var contact = require('tollan-contact');

	var contactHandler = contact(tollan, {
		campaignSend: function(fields) {
			return {
				to: 'pjoerayes@live.com'
			};
		}
	});

	return (
		<Route path="/" handler={require('./components/App')(React, Router)}>
			<DefaultRoute name="home" handler={require('./components/home')(React, Router)} />
			<Route name="gettingStarted" path="/gettingstarted" handler={require('./components/gettingStarted')(React, Router)} />
			<Route name="documentation" path="/documentation/:whatever" handler={require('./components/documentation')(React, Router)} />
			<Route name="contact" handler={contactHandler(tollan)} />
			<Route name="dynamic" handler={require('./components/dynamic')(tollan)} />
			<NotFoundRoute name="404" handler={require('./components/NotFoundView')(React, Router)} />
		</Route>
	);
};
