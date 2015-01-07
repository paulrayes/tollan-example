'use strict';

module.exports = function(React, Router) {
	var Route = Router.Route;
	var NotFoundRoute = Router.NotFoundRoute;
	var DefaultRoute = Router.DefaultRoute;
	var Link = Router.Link;
	var RouteHandler = Router.RouteHandler;

	var getView = function(path) {
		return require('./views/' + path)(React, Router);
	}

	return (
		<Route path="/" handler={getView('App')}>
			<DefaultRoute handler={getView('Home')} />
			<Route path="/two" handler={getView('Page2')} />
			<NotFoundRoute name="404" handler={getView('NotFoundView')} />
		</Route>
	);
};
