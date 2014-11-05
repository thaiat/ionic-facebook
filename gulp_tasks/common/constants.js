'use strict';

var path = require('path');

module.exports = function() {
    var cwd = process.env.INIT_CWD || '';
    var constants = {
        repository: 'https://github.com/user/repo',
        versionFiles: ['./package.json', './bower.json'],
        growly: {
            notify: false,
            successIcon: path.join(cwd, 'node_modules/karma-growl-reporter/images/success.png'),
            failedIcon: path.join(cwd, 'node_modules/karma-growl-reporter/images/failed.png')
        },

        lint: ['./client/**/*.js', './server/**/*.js', 'gulpfile.js', 'gulp_tasks/**/*.js', 'karam.conf.js', 'test/**/*.js', '!./client/scripts/bundle.js', '!./client/scripts/bundle.min.js'],

        fonts: {
            src: ['./bower_components/ionic/release/fonts/*.*', './bower_components/font-awesome/fonts/*.*'],
            dest: './client/fonts'
        },

        style: {
            src: ['./client/styles/**/*.css', './client/styles/**/*.scss', '!./client/styles/main.css', '!./client/styles/main.min.css'],
            dest: './client/styles',
            destName: 'main.css',
            sass: {
                src: ['./client/styles/main.scss']
            },
            css: {
                src: ['']
            }
        },

        browserify: {
            src: './client/scripts/main.js',
            dest: './client/scripts',
            bundleName: 'bundle.js'
        },

        serve: {
            root: 'client',
            host: '0.0.0.0',
            livereload: 9000,
            port: 5000
        },
        mocha: {
            libs: ['server/**/*.js'],
            tests: ['test/mocha/**/*.js'],
            globals: 'test/mocha/helpers/globals.js',
            timeout: 5000
        }

    };

    return constants;
};