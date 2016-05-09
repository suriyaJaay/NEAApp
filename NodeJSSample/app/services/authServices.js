'use strict';

define(['app'], function (app) {

    var injectParams = ['$http', '$q', '$window', 'securityService'];

    var authService = function ($http, $q, $window, securityService) {
        return {
            login: function (username, password) {

                var deferred = $q.defer();

                $http.post('./api/auth/login', {
                    username: username,
                    password: password
                }).then(function (response) {
                    securityService.isLogged = true;
                    securityService.user = response.data.username;
                    securityService.userRole = response.data.role;
                    
                    $window.sessionStorage.token = response.data.token;
                    $window.sessionStorage.user = response.data.user.username;
                    $window.sessionStorage.userRole = response.data.user.role;
                    $window.sessionStorage.expires = response.data.expires;
                    
                    deferred.resolve(securityService.isLogged);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();

                if (securityService.isLogged) {
                    securityService.purgeToken();

                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    delete $window.sessionStorage.userRole;
                    delete $window.sessionStorage.expires;

                    deferred.resolve();
                }

                return deferred.promise;
            }
        }
    }

    authService.$inject = injectParams;

    app.factory('authService', authService);
});