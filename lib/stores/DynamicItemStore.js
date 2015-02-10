'use strict';

var EventEmitter = require('eventemitter3');
var assign = require('object-assign');
var Promise = require('promise');

module.exports = function(tollan) {
	var DynamicItemStore = assign({}, EventEmitter.prototype, {
		getAll: function() {
			return new Promise(function(resolve, reject) {
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
