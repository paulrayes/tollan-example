'use strict';

var redis = require('redis');
var client = redis.createClient();

module.exports = function(tollan) {

	function processMessage(message) {
		message = JSON.parse(message);
		if (message.event === 'dynamic/itemAdded') {
			client.hset('dynamic/items', message.data.id, message.data.text);
		}
		console.log('[info] [eventStreamer] Processed event ' + message.event + ' with data ' + JSON.stringify(message.data));
	}

	var previousMessageCount = 0;
	var INTERVAL = 500;
	var INTERVAL_NEW = 50;
	function processNew() {
		client.llen('messages', function(err, messageCount) {
			if (err) throw err;
			var newCount = messageCount - previousMessageCount;
			if (newCount > 100) {
				newCount = 100;
			}
			messageCount = previousMessageCount + newCount;
			if (newCount) {
				client.lrange('messages', previousMessageCount, messageCount, function(err, messages) {
					if (err) throw err;

					var firstMessageTime = JSON.parse(messages[0]).time;
					var delay = Date.now() - firstMessageTime;
					if (delay > INTERVAL) {
						console.log('[warn] Current event processing delay is',
							Math.round(delay/1000),
							'seconds');
					}

					messages.forEach(function(message) {
						processMessage(message);
					});

					console.log('[info] Processed', newCount, 'messages');

					previousMessageCount = messageCount;
					setTimeout(processNew, INTERVAL_NEW);
				});
			} else {
				//console.log('[info] No new messages');
				setTimeout(processNew, INTERVAL);
			}
		});
	}

	processNew();	
};
