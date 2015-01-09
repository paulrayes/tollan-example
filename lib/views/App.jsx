'use strict';


module.exports = function(React, Router) {
	var TopMenu = require('./TopMenu')(React, Router);
	var Header = require('./Header')(React, Router);
	var Footer = require('./Footer')(React, Router);

	var Link = Router.Link;
	var RouteHandler = Router.RouteHandler;

	return React.createClass({
		render: function() {
			return (
				<div>
					<Header />

					<TopMenu />

					<RouteHandler />

					<Footer />
				</div>
			);
		}
	});
};
