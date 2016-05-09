'use strict';

define(['resolver'], function () {

    var app = angular.module('nodeApp', ['ui.router', 'routeResolverServices', 'securityResolverServices', 'ngAnimate']);

    app.config(['$controllerProvider', 'routeResolverProvider', '$httpProvider',
        '$compileProvider', '$filterProvider', '$provide', '$stateProvider', '$urlRouterProvider', 
        function ($controllerProvider, routeResolverProvider, $httpProvider, 
            $compileProvider, $filterProvider, $provide, $stateProvider, $urlRouterProvider) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            $httpProvider.interceptors.push('tokenInterceptor');  
            
            var viewDir = routeResolverProvider.routeConfig.getViewsDirectory();
            var route = routeResolverProvider.route;

            $stateProvider.state('home', {
                url: '/',
                templateUrl: viewDir + 'home/home.html',
                controller: "homeController",
                controllerAs: "homeVM",
                secure: false
            })
            .state('login', {
                url: '/login',
                templateUrl: viewDir + 'login.html',
                controller: 'loginController',
                controllerAs: 'loginVM',
                secure: false,
                params: { redirectRoute: null }
            })
            .state('error', {
                url: '/error',
                templateUrl: viewDir + 'error.html',
                controller: 'errorController',
                controllerAs: 'errorVM',
                secure: false,
                params: { errorMessage: null }
            })
            .state('users', route.resolve('users', 'users', 'userVM', true, true, null));
            
            routeResolverProvider.route.gatherRoutes();

            $urlRouterProvider.otherwise('/');
        }]);
    
    app.constant('homeState', 'home');
    app.constant('loginState', 'login');

    return app;
});