'use strict';

module.exports = function(React, Router) {
	return React.createClass({
		shouldComponentUpdate: function(nextProps, nextState) {
			return false;
		},
		render: function() {
			return (
				<div className="footer">
					<hr />
					<p className="text-center">Copyright &copy; 2014 Paul Rayes</p>
					<p className="text-center">
						Code licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0.txt">Apache 2.0 license</a>.<br />
						Documentation licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
					</p>
				</div>
			);
		}
	});
};
