'use strict';

var redis = require('redis');
var subscriberClient = redis.createClient();

function sleep(ms) {
	var end = Date.now() + ms;
	while (Date.now() <= end) {
		// do nothing
	}
}

function processMessage(message) {
	//console.log(JSON.parse(message));
	message = JSON.parse(message);
	//setTimeout(function() {
		//console.log(message);
	//}, 100);
	if (message.event === 'dynamic/itemAdded') {
		subscriberClient.hset('dynamic/items', message.data.id, message.data.text);
	}
	console.log('[info] [subscriber] Processed event ' + message.event + ' with data ' + JSON.stringify(message.data));

	sleep(10);
}

var previousMessageCount = 0;
var INTERVAL = 650;
var INTERVAL_NEW = 50;
function processNew() {
	subscriberClient.llen('messages', function(err, messageCount) {
		if (err) throw err;
		var newCount = messageCount - previousMessageCount;
		if (newCount > 100) {
			newCount = 100;
		}
		messageCount = previousMessageCount + newCount;
		if (newCount) {
			subscriberClient.lrange('messages', previousMessageCount, messageCount, function(err, messages) {
				if (err) throw err;

				var firstMessageTime = JSON.parse(messages[0]).time;
				var delay = Date.now() - firstMessageTime;
				if (delay > INTERVAL) {
					console.log('[warn] Current processing delay is',
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
