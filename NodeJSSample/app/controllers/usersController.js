'use strict';

define(['app'], function (app) {
    
    var injectParams = ['$scope'];
    
    var usersController = function ($scope) {
        var userVM = this;

        userVM.recentUsers = []; 
    };
    
    usersController.$inject = injectParams;
    
    app.register.controller('usersController', usersController);
});