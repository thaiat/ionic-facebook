'use strict';

var namespace = 'main';

var angular = require('angular');

var app = angular.module(namespace, [
    'ui.router', 'ionic',
    // inject:modules start
    require('./common')(namespace).name,
    require('./ngFacebook')(namespace).name
    // inject:modules end
]);

app.run(function(facebook, $window, $state) {
    facebook.init('ENTER YOUR APP ID HERE');

    if(facebook.oauthCallback($window.location.href)) {
        $state.go('tabs.newsfeed');
    }
});

module.exports = app;