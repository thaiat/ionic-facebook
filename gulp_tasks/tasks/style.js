'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var es = require('event-stream');
var sass = $.sass;
var sourcemaps = $.sourcemaps;
var autoprefixer = $.autoprefixer;
var rename = $.rename;
var concat = $.concat;
var minifycss = require('gulp-minify-css');
var constants = require('../common/constants')();

gulp.task('fonts', 'Copy fonts.', function() {
    gulp.src(constants.fonts.src)
        .pipe(gulp.dest(constants.fonts.dest));
});

gulp.task('style', 'Generates a bundle css file.', ['fonts'], function() {

    var sassFiles = gulp.src(constants.style.sass.src)
        .pipe(sass());

    var cssFiles = gulp.src(constants.style.css.src);

    return es.concat(cssFiles, sassFiles)
        .pipe(concat(constants.style.destName))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(constants.style.dest))
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe($.size())
        .pipe(gulp.dest(constants.style.dest));

});

gulp.task('style:watch', 'Watch changes for style files.', function() {
    gulp.watch(constants.style.src, ['style']);
});