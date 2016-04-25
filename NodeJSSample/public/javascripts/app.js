var nodeApp = angular.module('nodeApp', ['ui.router', 'ngAnimate'])
.config(['$stateProvider', '$urlRouterProvider', 'navProvider', function ($stateProvider, $urlRouterProvider, navProvider) {
        
        var homeState = {
            url: '/',
            templateUrl: 'templates/home.html',
            displayName: 'Home',
            name: 'home',
            visible: true
        };
        
        $stateProvider.state(homeState.name, homeState);
        
        navProvider.loadRoutes();
        
        //default to the home page
        $urlRouterProvider.otherwise('/');
    }]);