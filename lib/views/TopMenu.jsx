'use strict';

module.exports = function(React, Router) {
	var Link = Router.Link;
	var RouteHandler = Router.RouteHandler;

	return React.createClass({
		render: function() {
			return (
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div id="navbar" className="">
							<ul className="nav navbar-nav">
								<li><Link to="home">About</Link></li>
								<li><Link to="gettingStarted">Getting Started</Link></li>
								<li><Link to="documentation">Documentation</Link></li>
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><a href="https://bitbucket.org/leoninepublishers/tollan">Bitbucket</a></li>
							</ul>
						</div>
					</div>
				</nav>
			);
		}
	});
};
