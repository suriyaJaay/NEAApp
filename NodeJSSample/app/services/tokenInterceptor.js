'use strict';

define(['app'], function (app) {

    var injectParams = ['$window', '$q'];

    var tokenInterceptor = function ($window, $q) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                
                if ($window.sessionStorage.token) {
                    config.headers['X-Access-Token'] = $window.sessionStorage.token;
                    config.headers['X-Key'] = $window.sessionStorage.user;
                    config.headers['Content-Type'] = 'application/json';
                }
                
                return config || $q.when(config);
            },
            response : function (response) {
                return response || $q.when(response);
            }
        };
    };

    tokenInterceptor.$inject = injectParams;

    app.factory('tokenInterceptor', tokenInterceptor);
});