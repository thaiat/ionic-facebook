'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var mocha = $.mocha;
var istanbul = $.istanbul;
var karma = $.karma;
//var plumber = $.plumber;
var gutil = require('gulp-util');
var chalk = require('chalk');

var constants = require('../common/constants')();

gulp.task('mocha', 'Runs mocha unit tests.', function(done) {
    return gulp.src(constants.mocha.libs)
        .pipe(istanbul({
            includeUntested: true
        }))
        .on('finish', function() {
            gulp.src(constants.mocha.tests)
                //.pipe(plumber())
                .pipe(mocha({
                    reporter: 'spec',
                    globals: './test/helpers/global.js',
                    timeout: constants.mocha.timeout
                }))
                .pipe(istanbul.writeReports({
                    reporters: ['lcov', 'json', 'text', 'text-summary', 'cobertura']
                }))
                .on('end', done);
        });
});

gulp.task('karma', 'Runs karma unit tests.', function() {
    return gulp.src(['no need to supply files because everything is in config file'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        })).on('error', function() {
            gutil.log(chalk.red('(ERROR)'), 'karma');
        });
});

gulp.task('unit', 'Runs all unit tests.', function(done) {
    runSequence(
        'lint',
        'mocha',
        'karma',
        done
    );
});

gulp.task('webdriver-update', false, $.protractor.webdriver_update);

//gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);

gulp.task('e2e', 'Runs e2e tests.', ['webdriver-update'], function(done) {
    var testFiles = [
        'test/e2e/**/*.js'
    ];

    gulp.src(testFiles)
        .pipe($.protractor.protractor({
            configFile: 'protractor.conf.js'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
        .on('end', function() {
            // Close connect server to and gulp connect task
            //gulp.server.close();
            done();
        });
});

gulp.task('test', 'Runs all the tests (unit and e2e).', function(done) {
    runSequence(
        'lint',
        'mocha',
        'karma',
        'e2e',
        done
    );
});