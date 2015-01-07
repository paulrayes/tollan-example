
module.exports = function(React) {
	return React.createClass({
		render: function() {
			return (
				<div>
					<h1>{this.props.status}</h1>
					<p>{this.props.message}</p>
				</div>
			);
		}
	});
};
