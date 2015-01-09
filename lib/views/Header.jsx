'use strict';

module.exports = function(React, Router) {
	return React.createClass({
		shouldComponentUpdate: function(nextProps, nextState) {
			return false;
		},
		render: function() {
			return (
				<div className="logo">
					<p className="text-center visible-xs"><img src="logo.png" width="82%" /></p>
					<p className="text-center hidden-xs"><img src="logo.png" height="88" width="421" /></p>
				</div>
			);
		}
	});
};
