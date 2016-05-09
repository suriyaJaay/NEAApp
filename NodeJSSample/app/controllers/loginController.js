'use strict';

define(['app'], function (app) {
    
    var injectParams = ['$rootScope', 'modalService', 'authService', '$stateParams', '$state', 'homeState'];
    
    var loginController = function ($rootScope, modalService, authService, $stateParams, $state, homeState) {
        var loginVM = this;
        
        loginVM.un = null, loginVM.pw = null, loginVM.error = null;
        loginVM.message = (modalService.params().message || null);
        loginVM.title = (modalService.params().title || "Login");
        loginVM.close = modalService.resolve;
        loginVM.isModal = (modalService.params.length == 0 ? false : true);

        loginVM.login = function () {
            authService.login(loginVM.un, loginVM.pw).then(function (response) {
                if (response) {
                    if (loginVM.isModal) {
                        loginVM.close();
                    } else {
                        $rootScope.$broadcast('loggedin');
                        $state.go($stateParams.redirectRoute || homeState);
                    }
                }
            }, function (error) {
                if (error) {
                    if (error.status == 401) {
                        loginVM.error = "Invalid credentials.";
                    } else if (error.status == 500) {
                        loginVM.error = "Error logging in. Please contact support.";
                    }
                }
            });
        }
    };
    
    loginController.$inject = injectParams;
    
    app.controller('loginController', loginController);
});