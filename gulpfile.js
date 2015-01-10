'use strict';

var gulp = require('gulp');
var tollanGulp = require('tollan/tollanGulp');
var buildTask = tollanGulp.build;
var lintTask = tollanGulp.lint;

gulp.task('default', function() {
	lintTask();
	buildTask();
});
