'use strict';

var redis = require('redis');
var client = redis.createClient();
var Promise = require('promise');

var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name: 'dynamic'
});

var latestIndex = -1;

function process(message) {
	if (message.index > latestIndex) {
		client.hset('dynamic/items', message.data.id, message.data.text);
		client.incr('dynamic/latestIndex');
		latestIndex++;
		log.info('Added ' + message.data.text + ' to list');
	}
}

module.exports = new Promise(function(resolve, reject) {
	client.get('dynamic/latestIndex', function(err, index) {
		if (err) {
			reject(err);
		}
		latestIndex = index;
		resolve(process);
	});
});
