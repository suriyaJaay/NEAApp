'use strict';

define([], function (){
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
        
        factory.validate = function (secured) {
            if (secured) {
                return $http.get('./api/auth/validate');
            } else {
                return $q.resolve(true);
            }
        };
        
        factory.purgeToken = function () {
            securityService.isLogged = false;
            delete securityService.user;
            delete securityService.userRole;
        };

        return factory;
    };
    
    var servicesApp = angular.module('securityResolverServices', []);
    
    securityService.$inject = injectParams;

    servicesApp.factory('securityService', securityService);
});