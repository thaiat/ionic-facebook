'use strict';
var controllername = 'newsfeed';
var _ = require('lodash');
module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$q', '$rootScope', '$ionicLoading', '$state', 'facebook'];

    function controller($q, $rootScope, $ionicLoading, $state, facebook) {
        var vm = this;
        var activate = function() {
            var deferred = $q.defer();
            $ionicLoading.show({
                template: '<i class="icon ion-loading-c" style="font-size:40px;"></i>',
                animation: 'fade-in',
                showBackdrop: true
            });
            if($rootScope.items) {
                vm.items = $rootScope.items;
                vm.friends = $rootScope.friends;
                $ionicLoading.hide();
                deferred.resolve(vm.items);
            } else {
                vm.items = [];
                vm.friends = [];
                var fields = {
                    'fields': 'full_picture,likes,description,comments,from,story,message,name,created_time'
                };
                facebook.get('/me/home', fields).then(function(res) {
                    vm.items = res.data.data;
                    $rootScope.items = res.data.data;

                    vm.friends = _.chain(vm.items)
                        .map(function(item) {
                            return item.from;
                        })
                        .uniq(function(item) {
                            return item.id;
                        })
                        .value();
                    $rootScope.friends = vm.friends;

                    $ionicLoading.hide();
                    deferred.resolve(vm.items);
                    //$ionicBackdrop.release();
                });
            }
            return deferred.promise;
        };

        activate();

        vm.logout = function() {
            facebook.logout();
            $state.go('login');
        };

        vm.doRefresh = function() {
            delete $rootScope.items;

            activate().
            finally(function() {
                $rootScope.$broadcast('scroll.refreshComplete');
            });
        };
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};