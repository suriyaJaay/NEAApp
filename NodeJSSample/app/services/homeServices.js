'use strict';

define(['app'], function (app) {
    var injectParams = ['$http'];
    
    var homeService = function ($http) {
        var factory = {};
        
        factory.getRecentUsers = function () {

        }
        
        return factory;
    };
    
    homeService.$inject = injectParams;
    
    app.factory('homeService', homeService);
})