'use strict';

module.exports = function(React, Router) {
	var Link = Router.Link;
	var RouteHandler = Router.RouteHandler;

	return React.createClass({
		render: function() {
			return (
				<div>
					<h1>Tollan Example Project</h1>

					<hr />
					<Link to="home">Home</Link> | <Link to="two">Page 2</Link>
					<hr />

					<RouteHandler/>
				</div>
			);
		}
	});
};
