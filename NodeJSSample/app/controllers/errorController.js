'use strict';

define(['app'], function (app) {
    
    var injectParams = ['$scope', '$stateParams'];
    
    var errorController = function ($scope, $stateParams) {
        var errorVM = this;

        errorVM.message = 'Ut oh! Something bad happened.';

        if ($stateParams.errorMessage)
            errorVM.message = $stateParams.errorMessage;

    };
    
    errorController.$inject = injectParams;
    
    app.controller('errorController', errorController);
});