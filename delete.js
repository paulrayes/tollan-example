'use strict';

var redis = require('redis');
var client = redis.createClient();
//var shortId = require('shortid');

//client.del('messages');
client.del('dynamic/items');

client.quit();

/*function sleep(ms) {
	var end = Date.now() + ms;
	while (Date.now() <= end) {
		// do nothing
	}
}

var messageCount = 0;

client.on('error', function(err) {
	console.log('[error]', err);
});

var channels = ['channelOne', 'channelTwo'];

function publish() {
	var channel = channels[Math.floor(Math.random()*channels.length)];
	var message = {
		event: channel,
		data: shortId.generate(),
		time: Date.now()
	};
	message = JSON.stringify(message);

	console.log(message);

	client.rpush('messages', message);
	setTimeout(publish, 250);
}

console.log(Math.floor(Date.now()/1000));

function start() {
	client.llen('messages', function(err, count) {
		if (err) throw err;
		messageCount = count;
		publish();
	});
}

start();*/
