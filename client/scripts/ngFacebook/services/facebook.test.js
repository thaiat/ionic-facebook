'use strict';
var angular = require('angular-mocks');
var app = require('../')('app');
var servicename = 'facebook';
describe(app.name, function() {

    describe('Services', function() {

        describe(servicename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.service = $injector.get(servicename);
            }));

            it('should be defined', function() {
                expect(this.service).toBeDefined();
            });

        });
    });
});