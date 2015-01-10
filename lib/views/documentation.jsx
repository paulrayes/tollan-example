'use strict';

module.exports = function(React, Router) {
	//var Link = Router.Link;

	return React.createClass({
		mixins: [Router.State],

		render: function() {
			var whatever = this.getParams();
			return (
				<div className="row">
					<div className="col-sm-3">
						<ul className="nav nav-pills nav-stacked">
							<li><a href="#">Whatever</a></li>
							<li><a href="#">Whatever</a></li>
							<li><a href="#">Whatever</a></li>
							<li><a href="#">Whatever</a></li>
							<li><a href="#">Whatever</a></li>
						</ul>
					</div>
					<div className="col-sm-9">
						<h1>Documentation</h1>
						<p>Write some stuff here okay</p>
						<p>whatever = {whatever}</p>
					</div>
				</div>
			);
		}
	});
};
