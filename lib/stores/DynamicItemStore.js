'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PPromise = require('promise');

module.exports = function(tollan) {
	var DynamicItemStore = assign({}, EventEmitter.prototype, {
		getAll: function() {
			return new PPromise(function(resolve, reject) {
				tollan.api.get('dynamic/items')
					.then(function(resp) {
						//console.log(resp);
						if (resp.statusCode === 200) {
							resolve(JSON.parse(resp.body));
						} else {
							reject(resp);
						}
					});
			});
		}
	});

	return DynamicItemStore;
};
