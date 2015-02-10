'use strict';

var redis = require('redis');
var client = redis.createClient();
var shortId = require('shortid');

module.exports = function(tollan) {
	var router = tollan.express.Router();
	var forms = tollan.newforms;

	router.get('/test', function(req, res, next) {
		res.end('huh? oh hai!');
	});

	router.post('/dynamic/addItem', function(req, res) {
		console.log(req.body);
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
			return res.json({});
		});
	});
	router.get('/dynamic/items', function(req, res) {
		client.hgetall('dynamic/items', function(err, items) {
			if (err) {
				return res.status(500).json({});
			}
			var result = [];
			for (var id in items) {
				result.push({
					id: id,
					text: items[id]
				});
			}
			return res.json(result);
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
