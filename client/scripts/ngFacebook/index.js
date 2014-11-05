'use strict';
require('angular-ui-router');
require('angular-ionic');

var modulename = 'ngFacebook';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic']);
    // inject:folders start
    require('./services')(app);

    // inject:folders end

    return app;
};