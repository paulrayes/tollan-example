'use strict';

var assign = require('object-assign');
var EventEmitter = require('eventemitter3');

var redis = require('redis');
var client = redis.createClient();
var subscriberClient = null;

var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name: 'eventStreamer'
});

var previousEventCount = 0;
var latestQueriedIndex = 0;
var latestSubscribedIndex = 0;
var usingSubscribed = false;
var INTERVAL = 500; // ms delay between fetching batches of saved events

function processEvent(message) {
	EventStreamer.emit(message.event, message);
	log.info('Processed event ' + message.index + ', ' + message.event);
}

function subscribe() {
	subscriberClient = redis.createClient();
	subscriberClient.subscribe('events');
	subscriberClient.on('message', function(channel, message) {
		message = JSON.parse(message);
		if (usingSubscribed) {
			processEvent(message);
		} else {
			latestSubscribedIndex = message.index;
			if (latestSubscribedIndex === latestQueriedIndex + 1) {
				usingSubscribed = true;
				log.info('Switching over to event stream instead of saved events');
				processEvent(message);
			}
		}
	});
}

function processNew() {
	client.llen('events', function(err, eventCount) {
		if (err) throw err;
		var newCount = eventCount - previousEventCount;
		if (newCount > 100) {
			// Only fetch 100 at a time for rate limiting
			eventCount = previousEventCount + 100;
		} else if (!subscriberClient) {
			// Now that there are less than 100 events, subscribe to new ones
			// (unless we are already subscribed)
			log.info('Subscribing to event stream, still using saved events');
			subscribe();
		}
		if (!usingSubscribed) {
			// Not using subscribed events, so process these if there are new ones
			if (newCount) {
				client.lrange('events', previousEventCount, eventCount, function(err, events) {
					if (err) throw err;

					latestQueriedIndex = eventCount;

					var i = previousEventCount;
					events.forEach(function(message) {
						i++;
						message = JSON.parse(message);
						message.index = i;
						processEvent(message);
					});

					log.info('Processed ' + newCount + ' events');

					previousEventCount = eventCount;
				});
			} else {
				log.info('No new saved events');
				// Just because there are no new saved events doesn't mean we can switch
				// over to using the event stream. An event could have been saved
				// during the time it took us to check if there are new events.
				// The only reliable way to check this is to wait until an event received
				// over our subscription is the one right after the last processed saved
				// event.
			}
			setTimeout(processNew, INTERVAL);
		}
	});
}

var EventStreamer = assign({}, EventEmitter.prototype, {
	start: function() {
		processNew();
	}
});

module.exports = EventStreamer;
