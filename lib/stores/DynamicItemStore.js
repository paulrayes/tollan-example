'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PPromise = require('promise');

module.exports = function(tollan) {
	var DynamicItemStore = assign({}, EventEmitter.prototype, {
		getAll: function() {
			//return tollan.api.getModel('dynamic/items');
			return new PPromise(function(resolve, reject) {
				tollan.api.getModel('dynamic/items')
					.then(function(items) {
						console.log(items);
						resolve(items);
					});
			});
		}
	});

	return DynamicItemStore;
};
