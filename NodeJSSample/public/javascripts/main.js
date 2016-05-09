require.config({
    baseUrl: 'app',
    urlArgs: 'v=1.0'
});

require(
    [
        'app',
        'resolver',
        'security',
        'directives',
        'services/authServices',
        'services/tokenInterceptor',
        'services/homeServices',
        'services/modalServices',
        'controllers/homeController',
        'controllers/navController',
        'controllers/errorController',
        'controllers/loginController'
    ],
    function () {
        angular.bootstrap(document, ['nodeApp']);
    }
);