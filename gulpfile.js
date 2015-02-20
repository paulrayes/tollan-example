'use strict';

var gulp = require('gulp');
//var tollanGulp = require('tollan/tollanGulp');
//var buildTask = tollanGulp.build;
//var lintTask = tollanGulp.lint;
var tasks = require('tollan-gulp');
var Promise = require('promise');


var dev = tasks.config.dev;

/**
 * Compiles all our CSS into main.css
 */
var glyphiconTask = require('./lib/tasks/glyphicon');

function watch() {
	tasks.watch.scripts();
	tasks.watch.styles();
	tasks.watch.assets();
}

gulp.task('default', function() {
	return Promise.all([
		tasks.composite.scripts(),
		tasks.composite.styles(),
		tasks.assets(),
		glyphiconTask()
	]).then(function() {
		if (dev) {
			watch();
		}
		return;
	}).catch(function(err) {
		throw(err);
	});
});
