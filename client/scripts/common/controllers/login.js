'use strict';
var controllername = 'login';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['facebook'];

    function controller(facebook) {
        var vm = this;
        vm.login = function() {
            facebook.login();
        };
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};