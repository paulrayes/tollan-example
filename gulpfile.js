var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var envify = require('envify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var less = require('gulp-less');
var cleancss = new (require("less-plugin-clean-css"))({advanced: true});
var plumber = require('gulp-plumber');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
	'react-router'
];
// Source files
var src = './browser.js';
var css = './lib/styles/*.{less,css}';
var assets = './lib/assets/*.*';
// Destination folder
var dest = './build/';

var debug = (process.env.NODE_ENV === 'development');
var sourceMapping = false;

/**
 * Compiles all our code into main.js
 */
var browserifyTask = function() {
	var bundler = browserify({
		extensions: ['.jsx'],
		entries: [src], // Only need initial file, browserify finds the deps
		transform: [reactify],
		debug: sourceMapping, // Gives us sourcemapping
		cache: {}, packageCache: {}, fullPaths: debug // Requirement of watchify
	});

	if (debug) {
		// Do not include external libraries
		//dependencies.forEach(function(dep) {
		//	bundler.external(dep);
		//});

		// Watchify doesn't work in dist because we turned off fullPaths
		var bundler  = watchify(bundler);
	}

	var rebundle = function() {
		var updateStart = Date.now();
		// Create new bundle that uses the cache for high performance
		var stream = bundler.bundle()
			.pipe(plumber()) // Fix error handling
			.pipe(source('main.js'))
			// Uglify in dist env
			.pipe(gulpif(!debug, streamify(uglify())))
			// Write the output
			.pipe(gulp.dest(dest));

		console.log('Updated main.js in ' + (Date.now() - updateStart) + 'ms');
	}

	bundler.on('update', rebundle);

	rebundle();
};

/**
 * Compiles listed dependencies into vendor.js
 * No watch as these will not typically change
 */
var vendorTask = function() {
	var bundler = browserify({
		debug: sourceMapping, // Gives us sourcemapping
		require: dependencies
	});

	var rebundle = function() {
		var updateStart = Date.now();
		// Create new bundle that uses the cache for high performance
		bundler.bundle()
			.pipe(source('vendor.js'))
			// Uglify in dist env
			//.pipe(gulpif(!debug, streamify(uglify())))
			// Write the output
			.pipe(gulp.dest(dest));

		console.log('Updated vendor.js in ' + (Date.now() - updateStart) + 'ms');
	}

	rebundle();
};

/**
 * Compiles all our CSS into main.css
 */
var lessTask = function() {

	var rebundle = function() {
		var updateStart = Date.now();
		if (debug) {
			gulp.src(css)
				.pipe(plumber()) // Fix error handling
				// No uglify in dev env
				.pipe(less({
				}))
				.pipe(gulp.dest(dest));
		} else {
			gulp.src(css)
				.pipe(plumber()) // Fix error handling
				// Uglify in dist env
				.pipe(less({
					plugins: [cleancss]
				}))
				.pipe(gulp.dest(dest));
		}
		console.log('Updated styles.css in ' + (Date.now() - updateStart) + 'ms');
	};

	rebundle();

	if (debug) {
		gulp.watch(css, rebundle);
	}
};

/**
 * Compiles all our CSS into main.css
 */
var assetsTask = function() {

	var rebundle = function() {
		var updateStart = Date.now();
		gulp.src(assets)
			.pipe(gulp.dest(dest));
		console.log('Updated assets in ' + (Date.now() - updateStart) + 'ms');
	};

	rebundle();

	if (debug) {
		gulp.watch(assets, rebundle);
	}
};

// Finally create the gulp tasks

var task = function() {
	console.log('Building front-end files for ' + process.env.NODE_ENV + ' environment.');
	browserifyTask();
	//vendorTask();
	lessTask();
	assetsTask();
}

gulp.task('default', task);

//task();
