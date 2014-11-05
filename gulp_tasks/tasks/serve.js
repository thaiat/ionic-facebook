'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var webserver = $.webserver;
var browserSync = require('browser-sync');
var openBrowser = require('open');
var gutil = require('gulp-util');
var chalk = require('chalk');

var constants = require('../common/constants')();

var serverConfig = {
    host: constants.serve.host,
    root: constants.serve.root,
    port: constants.serve.port,
    livereload: constants.serve.livereload
};

gulp.task('serve', 'Launches a livereload server.', ['browserify', 'style', 'style:watch'], function() {
    gulp.src(serverConfig.root)
        .pipe(webserver({
            host: serverConfig.host,
            port: serverConfig.port,
            livereload: {
                enable: true,
                port: serverConfig.livereload
            }
        }));
    //console.log('Started connect web server on http://localhost:' + serverConfig.port + '.');
    openBrowser('http://' + serverConfig.host + ':' + serverConfig.port);
});

gulp.task('browsersync', 'Launches a browserSync server.', ['browserify', 'style', 'style:watch'], function() {
    var config = {
        files: [serverConfig.root + '/index.html', serverConfig.root + '/scripts/bundle.js', serverConfig.root + '/styles/main.css', serverConfig.root + '/styles/main.min.css'],
        tunnel: 'yoobic',
        server: {
            baseDir: serverConfig.root,
            middleware: [
                function(req, res, next) {
                    //console.log("Hi from middleware");
                    next();
                }
            ]
        },
        host: serverConfig.host,
        port: serverConfig.port,
        logLevel: 'info', // info, debug , silent
        open: false,
        browser: ['google chrome'], // ['google chrome', 'firefox'],
        notify: true,
        logConnections: false
    };

    browserSync(config);

});

gulp.task('bowersync', false, function() {
    gutil.log(chalk.red('\n', 'Task \'bowersync\' is not in your gulpfile.'), '\n', chalk.red('Did you mean this?'), '\n', chalk.yellow('gulp browsersync'), '\n');
});