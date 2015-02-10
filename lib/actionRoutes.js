'use strict';

var redis = require('redis');
var client = redis.createClient();
var shortId = require('shortid');

module.exports = function(tollan) {
	var router = tollan.express.Router();
	var forms = tollan.newforms;

	router.post('/dynamic/addItem', function(req, res) {
		//console.log(req.body);
		var AddItemForm = forms.Form.extend({
			text: forms.CharField()
		});
		var form = new AddItemForm({data: req.body});
		if (!form.validate()) {
			return res.status(400).json({
				errors: form.errors()
			});
		}
		client.rpush('messages', JSON.stringify({
			time: Date.now(),
			event: 'dynamic/itemAdded',
			data: {
				id: shortId.generate(),
				text: form.cleanedData.text
			}
		}), function(err) {
			if (err) {
				return res.status(500).json({});
			}
			return res.json({status: 'ok'});
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
