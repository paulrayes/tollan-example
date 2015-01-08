var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
	'react-router'
];
// Main source file
var src = './browser.js';
// Destination folders for each environment
var dest = {
	'dev': './build/',
	'dist': './build/'
};

/**
 * Compiles all our code into main.js
 */
var browserifyTask = function(env) {
	var bundler = browserify({
		extensions: ['.jsx'],
		entries: [src], // Only need initial file, browserify finds the deps
		transform: [reactify], // We want to convert JSX to normal javascript
		debug: (env==='dev'), // Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: (env==='dev') // Requirement of watchify
	});

	// Do not include external libraries
	dependencies.forEach(function(dep) {
		bundler.external(dep);
	});

	if (env === 'dev') {
		// Watchify doesn't work in dist because we turned off fullPaths
		var bundler  = watchify(bundler);
	}

	var rebundle = function() {
		var updateStart = Date.now();
		// Create new bundle that uses the cache for high performance
		var stream = bundler.bundle()
			.pipe(source('main.js'))
			// Uglify in dist env
			.pipe(gulpif((env === 'dist'), streamify(uglify())))
			// Write the output
			.pipe(gulp.dest(dest[env]));

		console.log('Updated main.js in ', (Date.now() - updateStart) + 'ms');
	}

	bundler.on('update', rebundle);

	rebundle();
};

/**
 * Compiles listed dependencies into vendor.js
 * No watch as these will not typically change
 */
var vendorTask = function(env) {
	var bundler = browserify({
		debug: (env==='dev'), // Gives us sourcemapping
		require: dependencies
	});

	var rebundle = function() {
		var updateStart = Date.now();
		// Create new bundle that uses the cache for high performance
		bundler.bundle()
			.pipe(source('vendor.js'))
			// Uglify in dist env
			.pipe(gulpif((env === 'dist'), streamify(uglify())))
			// Write the output
			.pipe(gulp.dest(dest[env]));

		console.log('Updated vendor.js in ', (Date.now() - updateStart) + 'ms');
	}

	rebundle();
};

// Finally create the gulp tasks
gulp.task('dev', function() {
	browserifyTask('dev');
	vendorTask('dev');
});

gulp.task('dist', function() {
	browserifyTask('dist');
	vendorTask('dist');
});
