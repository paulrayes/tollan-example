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

						<h2>Logging Levels</h2>
						<p>Tollan uses the following log levels. Your modules should use the same ones.</p>
						<p>You can log something with tollan.level, i.e., tollan.warn(text).</p>

						<p><strong>ERROR</strong>: This module or component has had a failure preventing it from doing what it is supposed to do. Maybe there was an unhandled exception, an internal error, or we could not connect to a required database.</p>
						<p><strong>WARN</strong>: This module or component seems to be working fine, but one of our dependencies has had a failure preventing us from doing what we are supposed to do. That other module probably has had an exception.</p>
						<p><strong>INFO</strong>: Miscellaneous information related to normal operation, like logging requests. Could also be a failure that is not preventing us from doing what we are supposed to do.</p>
						<p><strong>DEBUG</strong>: Debug information, wherever possible tests should be used instead.</p>
						<p><strong>PROFILE</strong>: Similar to INFO but records the time since the last PROFILE log for this component and request.</p>

						<p>Exceptions are unhandled errors, these crash the application. It is always better to check for an error anywhere they could occur.</p>

						<p>Errors must be fixed, they are something not working. Warnings will most likely (but not always) be caused by an error elsewhere, in that case fixing the error will fix the error.</p>

						<p>You should not throw errors, this is an anti-pattern in Node.js as it is an asynchronous language. Instead use callbacks or fail a promise.</p>

						<p>An unhandled operational error (could not connect to database, file does not exist, etc) is a warning; if you handle it (use cached data, create the file, etc) it becomes just information.</p>
						<p>Programmer errors (tried to read property of undefined, missing required argument, etc) are always errors or exceptions.</p>

						<p>For a detailed explanation of Node.js error handling, see <a href="http://www.joyent.com/developers/node/design/errors">Joylent</a>.</p>
					</div>
				</div>
			);
		}
	});
};
