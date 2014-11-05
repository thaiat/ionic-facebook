'use strict';
var gulp = require('gulp');
require('gulp-help')(gulp);
require('require-dir')('./gulp_tasks/tasks');

// Because we are including gulp-help the syntax of a gulp task has an extra description param at position 2 - refer to https://www.npmjs.org/package/gulp-help

// add your top gulp tasks here
gulp.task('default', false, function() {

});