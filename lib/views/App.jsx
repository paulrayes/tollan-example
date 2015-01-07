'use strict';

module.exports = function(React, Router) {
	var Link = Router.Link;
	var RouteHandler = Router.RouteHandler;

	return React.createClass({
		render: function() {
			return (
				<html>
				<head>
					<meta charSet="utf-8" />
					<title>Tollan Example</title>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</head>
				<body>
					<div>
						<h1>Tollan Example Project</h1>

						<hr />
						<a href="/">Home</a> | <a href="/two">Page 2</a>
						<hr />

						<RouteHandler/>
					</div>
				</body>
				</html>
			);
		}
	});
};
