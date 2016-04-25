nodeApp.provider('nav', ['$stateProvider', function ($stateProvider) {
    var routes = null;
    return {
        loadRoutes: function () {
            $.ajax({
                method: "GET",
                url: "./api/routes", 
                cache: false,
                async: false,
                success: function (result) {
                    if (result != null && result.routes != null) {
                            angular.forEach(result.routes, function (value, key) {
                                if (value.name != 'home') {
                                    $stateProvider.state(value.name, value);
                                }
                        });

                        routes = result.routes;
                    }
                }
            });
        },
        $get: function () {
            return {
                    routes: function () {
                        return routes;
                    }
            }
        }
    }
}])
.factory('apiService', ['$http', '$q', 'nav', function ($http, $q, nav) {
    return {
        getRecentUsers: function () {
            return $http({
                method: 'GET',
                cache: false,
                url: './api/test'
            });
        }
    }
}]);