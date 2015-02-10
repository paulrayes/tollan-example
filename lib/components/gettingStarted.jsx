'use strict';

module.exports = function(React, Router) {
	//var Link = Router.Link;

	return React.createClass({
		render: function() {
			return (
				<div>
					<h1>Getting Started</h1>
					<p>See the README file for instructions on installing Tollan.</p>
					<p>Right now, the recommended way to get started is to clone this website (tollan-example) and take a look at how it's set up.</p>
					<p>Proper documentation is upcoming, eventually.</p>
				</div>
			);
		}
	});
};
