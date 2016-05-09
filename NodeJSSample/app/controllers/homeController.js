'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope'];

    var homeController = function ($scope) {
        var homeVM = this;
    };

    homeController.$inject = injectParams;

    app.controller('homeController', homeController);
});