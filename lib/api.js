'use strict';

/*var redis = require('redis');
var client = redis.createClient();
var shortId = require('shortid');*/

module.exports = function(tollan) {
	var router = tollan.express.Router();
	//var forms = tollan.newforms;

	router.get('/test', function(req, res, next) {
		res.end('huh? oh hai!');
	});

	router.all('*', function(req, res, next) {
		res.status(404);
		res.end();
	});

	return router;
};
