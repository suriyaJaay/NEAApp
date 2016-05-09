'use strict';

define(['app'], function (app) {
    var injectParams = ['$http', '$q', '$window'];

    var securityService = function ($http, $q, $window) {
        var factory = this;

        factory.user = {};
        factory.userRole = {};
        factory.isLogged = false;

        factory.checkToken = function () {
            if ($window.sessionStorage.token && 
                    $window.sessionStorage.user &&
                    $window.sessionStorage.expires) {
                if (new Date($window.sessionStorage.expires) > new Date()) {
                    this.isLogged = true;
                } else {
                    this.purgeToken();
                }
            } else {
                this.purgeToken();
            }
            
            return this.isLogged;
        };

        factory.validate = function () {
            return $http.get('./api/auth/validate');
        };

        factory.purgeToken = function () {
            securityService.isLogged = false;
            delete securityService.user;
            delete securityService.userRole;
        };

        return factory;
    };

    securityService.$inject = injectParams;

    app.factory('securityService', securityService);
});