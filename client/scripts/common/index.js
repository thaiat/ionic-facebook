'use strict';
require('angular-ui-router');
require('angular-ionic');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var ngFacebook = require('../ngFacebook')(namespace);
    var app = angular.module(fullname, ['ui.router', 'ionic', ngFacebook.name]);
    // inject:folders start
    require('./controllers')(app);

    // inject:folders end
    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    template: require('./views/login.html'),
                    controller: fullname + '.login as vm'
                })
                .state('tabs', {
                    url: '/tabs',
                    abstract: true,
                    template: require('./views/tabs.html')
                })
                .state('tabs.newsfeed', {
                    url: '/newsfeed',
                    views: {
                        'tab-newsfeed': {
                            template: require('./views/newsfeed.html'),
                            controller: fullname + '.newsfeed as vm'
                        }
                    }
                })
                .state('tabs.requests', {
                    url: '/requests',
                    views: {
                        'tab-requests': {
                            template: require('./views/requests.html'),
                            controller: fullname + '.newsfeed as vm'
                        }
                    }
                })
                .state('tabs.messages', {
                    url: '/messages',
                    views: {
                        'tab-messages': {
                            template: require('./views/messages.html')
                        }
                    }
                })
                .state('tabs.notifications', {
                    url: '/notifications',
                    views: {
                        'tab-notifications': {
                            template: require('./views/notifications.html')
                        }
                    }
                })
                .state('tabs.more', {
                    url: '/more',
                    views: {
                        'tab-more': {
                            template: require('./views/more.html')
                        }
                    }
                });
            $urlRouterProvider.otherwise('/login');
        }
    ]);
    return app;
};