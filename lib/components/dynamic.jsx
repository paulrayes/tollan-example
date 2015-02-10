'use strict';

module.exports = function(tollan) {
	//var Link = Router.Link;
	var Router = tollan.Router;
	var React = tollan.React;
	var forms = tollan.newforms;

	var DynamicItemStore = require('../stores/DynamicItemStore')(tollan);

	var ItemList = React.createClass({
		getInitialState: function() {
			return {
				items: []
			};
		},
		reloadList: function() {
			DynamicItemStore.getAll()
				.then(function(items) {
					if (this.isMounted()) {
						this.setState({
							items: items
						});
						setTimeout(this.reloadList, 5000);
					}
				}.bind(this));
		},
		componentDidMount: function() {
			this.reloadList();
		},
		render: function() {
			if (this.state.items.length > 0) {
				var itemElements = [];
				this.state.items.forEach(function(item) {
					itemElements.push(<li key={item.id}>{item.text}</li>);
				});
				return (
					<div>
						{this.state.items.length} Items:
						<ul>
							{itemElements}
						</ul>
					</div>
				);
			} else {
				return (
					<div>There are no items, you should add some.</div>
				);
			}
		}
	});

	var AddItemForm = forms.Form.extend({
		text: forms.CharField()
	});

	var AddItem = React.createClass({
		getInitialState: function() {
			return {
				processing: false
			};
		},
		onFormChange: function() {
			this.forceUpdate();
		},
		onFormSubmit: function(e) {
			e.preventDefault();

			var form = this.refs.addItemForm.getForm();
			var isValid = form.validate();
			if (isValid) {

				this.setState({processing: true});

				tollan.api.postAction('dynamic/addItem', form.cleanedData)
					.then(function(response) {
						if (response.statusCode === 200) {
							this.setState({processing: false});
						} else if (response.statusCode === 400) {
							// Validation error on the server
							// Recreate the errors from the server and update our form
							var errors = forms.ErrorObject.fromJSON(response.body.errors);
							form.setErrors(errors);
							this.setState({processing: false});
							this.forceUpdate();
						} else {
							form.addError(null, 'We encountered an error (code: ' + response.statusCode + ') sending your message. Please try again later.');
							this.setState({processing: false});
						}
					}.bind(this), function(response) {
						console.log(response);
					}.bind(this));
			}
		},
		render: function() {
			return (
				<form action="" method="POST" onSubmit={this.onFormSubmit} onChange={this.onFormChange}>
					<forms.RenderForm form={AddItemForm} ref="addItemForm" />
					<input type="submit" />
				</form>
			);
		}
	});

	return React.createClass({
		mixins: [Router.State],

		render: function() {
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
						<h1>Dynamic Data</h1>
						<p>This example demonstrates the use of client and server stores, the server event log, processing the server event log, and retreiving data from the back-end.</p>

						<h2>List</h2>
						<p>This list is retreived from a back-end store every five seconds.</p>
						<ItemList />

						<h2>Add Item</h2>
						<p>Submitting this form with valid data will send an event to the back-end which will be stored in the event log. The form does nothing else.</p>
						<AddItem />

					</div>
				</div>
			);
		}
	});
};
