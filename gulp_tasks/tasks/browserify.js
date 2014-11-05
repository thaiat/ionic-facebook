'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var chalk = require('chalk');
var constants = require('../common/constants')();

var bundleShare = function(b, dest, bundleName) {
    var bundle = b.bundle();
    bundle
        .on('error', function(err) {
            gutil.log(chalk.red('Browserify failed', '\n', err.message));
            bundle.end();
        })
        .pipe(source(bundleName))
        .pipe(gulp.dest(dest));
};

var browserifyShare = function(src, dest, bundleName) {
    bundleName = bundleName || 'bundle.js';
    // we need to pass these config options to browserify
    var b = browserify({
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    b = watchify(b);
    b.on('update', function() {
        bundleShare(b, dest, bundleName);
    });

    b.on('log', function(msg) {
        gutil.log(chalk.green('browserify'), msg);
    });

    b.add(src);
    bundleShare(b, dest, bundleName);

};

gulp.task('browserify', 'Generates a bundle javascript file with browserify.', function() {
    browserifyShare(constants.browserify.src, constants.browserify.dest, constants.browserify.bundleName);
});