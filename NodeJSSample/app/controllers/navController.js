'use strict';

define(['app'], function (app) {
    
    var injectParams = ['$scope', 'routeResolver', 'securityService', 'modalService', 'authService', '$state', 'homeState'];
    
    var navController = function ($scope, routeResolver, securityService, modalService, authService, $state, homeState) {
        var navVM = this;
        
        navVM.loggedIn = false;
        navVM.links = [];
        
        navVM.login = function () {
            $state.go('login', { redirectRoute : $state.current.name });

            // The .open() method returns a promise that will be either
            // resolved or rejected when the modal window is closed.
            /*
            var promise = modalService.open(
                "login",
                {
                    message: null,
                    title: "Login"
                }
            );
            promise.then(
                function handleResolve(response) {
                    navVM.loggedIn = true;
                },
                function handleReject(error) {
                    console.log("Alert rejected!");
                }
            );
             * */
        }
        
        navVM.checkToken = function () {
            navVM.loggedIn = securityService.checkToken();
        }
        
        navVM.logout = function () {
            authService.logout().then(function (response) {
                navVM.loggedIn = false;
                $state.go(homeState);
            }, function (error) {
                navVM.loggedIn = false;
                $state.go('error', { errorMessage: JSON.stringify(error) });
            });
        }
        
        $scope.$on('loggedin', function () {
            navVM.loggedIn = true;
        });

        $scope.$watch(routeResolver.routeConfig.getRoutes, function (routes) {
            if (routes && routes.length > 0) {
                navVM.links = routes;
            }
        })
    };
    
    navController.$inject = injectParams;
    
    app.controller('navController', navController);
});