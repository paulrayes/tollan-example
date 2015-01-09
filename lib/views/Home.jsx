'use strict';

module.exports = function(React, Router) {
	var Link = Router.Link;

	return React.createClass({
		render: function() {
			return (
				<div>
					<div className="jumbotron">
						<h1><small>Build the websites of the future, today</small></h1>
						<p>Tollan is an isomorphic framework for Node.js and the browser. It uses server-side rendering to provide a fast initial page load time, then switches to client-side rendering for enhanced performance and functionality.</p>
						<p>With Tollan, you get all the benefits of a single-page-application with none of the drawbacks.</p>
					</div>

					<div className="row">
						<div className="col-sm-6">
							<h2>Isomorphic</h2>
							<p>Tollan renders the initial page on the server, and subsequent pages in the browser, using the exact same routes and views. This means the initial page can be displayed very quickly, before any Javascript loads, and subsequent pages do not have to reload anything.</p>
						</div>
						<div className="col-sm-6">
							<h2>ReactJS</h2>
							<p>Tollan uses ReactJS for the views, which allows you to divide your user interface into modular components that you can then use like a standard DOM element. These components are then rendered extremely fast, using a virtual DOM to compute the minimum set of changes required to the real DOM.</p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<h2>Uni-directional data flow</h2>
							<p>Data in Tollan flows in one direction, inspired by the Flux architecture. All in your application, whether it is from an AJAX response, user input, or server push, enters at a single point in an event. Your modules then listen to these events to update their internal state.</p>
						</div>
						<div className="col-sm-6">
							<h2>Progressive enhancement</h2>
							<p>By rendering the initial page on the server, your users get a basic website experience without any Javascript or browser plugins. Interactivity is then added on top of the initial page. This is more friendly to screen readers, search engine crawlers, and provides a more performance experience overall.</p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<h2>Automated build process</h2>
							<p>Everything required for the client-side application is automatically built for you using Browserify and Gulp. You're free to spend your time writing code, not setting up an environment or waiting for a build process to complete.</p>
						</div>
						<div className="col-sm-6">
							<h2>Test-driven by default</h2>
							<p>TODO</p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<h2>Mobile-first</h2>
							<p>Mobile networks can be slow, which is especially detrimental to standard single-page-applications. Isomorphic applications render much sooner, and require fewer round trips overall, resulting in a faster mobile experience and helping to conserve battery life.</p>
						</div>
						<div className="col-sm-6">
							<h2>Aggressive caching</h2>
							<p>TODO</p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<h2>Built-in REST API</h2>
							<p>TODO</p>
						</div>
						<div className="col-sm-6">
							<h2>Completely modular</h2>
							<p>TODO</p>
						</div>
					</div>
				</div>
			);
		}
	});
};
