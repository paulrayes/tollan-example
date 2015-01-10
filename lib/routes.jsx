'use strict';

module.exports = function(React, Router) {
	var Route = Router.Route;
	var NotFoundRoute = Router.NotFoundRoute;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var RouteHandler = Router.RouteHandler;

	return (
		<Route path="/" handler={require('./views/App')(React, Router)}>
			<DefaultRoute name="home" handler={require('./views/home')(React, Router)} />
			<Route name="gettingStarted" path="/gettingstarted" handler={require('./views/gettingStarted')(React, Router)} />
			<Route name="documentation" path="/documentation/:whatever" handler={require('./views/documentation')(React, Router)} />
			<NotFoundRoute name="404" handler={require('./views/NotFoundView')(React, Router)} />
		</Route>
	);
};
