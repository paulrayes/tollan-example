'use strict';

var redis = require('redis');
var client = redis.createClient();

module.exports = function(tollan) {
	var router = tollan.express.Router();

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

	router.all('*', function(req, res, next) {
		res.status(404);
		res.end();
	});

	return router;
};
