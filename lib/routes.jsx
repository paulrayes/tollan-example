'use strict';

module.exports = function(React, Router) {
	var Route = Router.Route;
	var NotFoundRoute = Router.NotFoundRoute;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var RouteHandler = Router.RouteHandler;

	return (
		<Route name="home" path="/" handler={require('./views/App')(React, Router)}>
			<DefaultRoute handler={require('./views/Home')(React, Router)} />
			<Route name="two" path="/two" handler={require('./views/Page2')(React, Router)} />
			<NotFoundRoute name="404" handler={require('./views/NotFoundView')(React, Router)} />
		</Route>
	);
};
