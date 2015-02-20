'use strict';

var rsync = require('rsyncwrapper').rsync;
var Promise = require('promise');
var bunyan = require('bunyan');
var tasks = require('tollan-gulp');

var log = bunyan.createLogger({
	name: 'glyphicon'
});

module.exports = function() {
	var updateStart = Date.now();
	return new Promise(function(resolve, reject) {
		rsync({
			src: './node_modules/bootstrap/fonts/*.*',
			dest: tasks.config.dest + '/fonts/',
			recursive: true
		}, function (error, stdout, stderr, cmd) {
			if (error) {
				reject(error);
			} else {
				var elapsed = (Date.now() - updateStart);
				log.info('Updated glyphicons in', elapsed, 'ms');
				resolve();
			}
		});
	});
};
