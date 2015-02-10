'use strict';

var redis = require('redis');
var client = redis.createClient();
var Promise = require('promise');

var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name: 'eventSaver'
});

function saveEvent(event, data) {
	return new Promise(function(resolve, reject) {
		var message = {
			time: Date.now(),
			event: event,
			data: data
		};
		client.rpush('events', JSON.stringify(message), function(err, length) {
			if (err) {
				log.error(err);
				reject(err);
			}
			message.index = length;
			client.publish('events', JSON.stringify(message), function(err) {
				if (err) {
					log.error(err);
					reject(err);
				}
				log.info('Saved event ' + event + ' with index ' + length);
				resolve(message);
			});
		});
	})

}

module.exports = saveEvent;
