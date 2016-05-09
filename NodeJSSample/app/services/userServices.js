'use strict';

define(['app'], function (app) {
    var injectParams = ['$http'];

    var userService = function ($http) {
        var factory = {};

        factory.getRecentUsers = function () {

        }

        return factory;
    };

    userService.$inject = injectParams;

    app.register.factory('userService', userService);
})