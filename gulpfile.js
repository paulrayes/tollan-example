'use strict';

var gulp = require('gulp');
var tollanGulp = require('tollan/tollanGulp');
var buildTask = tollanGulp.build;
//var lintTask = tollanGulp.lint;
var bunyan = require('bunyan');

var log = bunyan.createLogger({
	name: 'gulp'
});

/**
 * Compiles all our CSS into main.css
 */
var glyphiconTask = function() {
	var updateStart = Date.now();
	gulp.src('./node_modules/bootstrap/fonts/*.*')
		.pipe(gulp.dest(tollanGulp.dest + '/fonts/'))
		.on('end', function() {
			var elapsed = (Date.now() - updateStart);
			log.info('[gulp] Copied glyphicons in', elapsed, 'ms');
		});
};

gulp.task('default', function() {
	//lintTask();
	glyphiconTask();
	buildTask();
});
