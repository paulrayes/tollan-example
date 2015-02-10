'use strict';

var saveEvent = require('./eventSaver');
var shortId = require('shortid');

module.exports = function(tollan) {
	var router = tollan.express.Router();
	var forms = tollan.newforms;

	router.post('/dynamic/addItem', function(req, res) {
		var AddItemForm = forms.Form.extend({
			text: forms.CharField()
		});
		var form = new AddItemForm({data: req.body});
		if (!form.validate()) {
			return res.status(400).json({
				errors: form.errors()
			});
		}

		saveEvent('dynamic/itemAdded', {
			id: shortId.generate(),
			text: form.cleanedData.text
		}).then(function(index) {
			res.json({status: 'ok'});
		}, function(err) {
			res.status(500).json({});
		});
	});

	router.use('/contact', require('tollan-contact/api')(tollan, {
		apiKey: 'bczijGJK9AgKANSlzWl2WQ',
		email: 'prayes@asu.edu'
	}));

	router.all('*', function(req, res, next) {
		res.status(404);
		res.end();
	});

	return router;
};
