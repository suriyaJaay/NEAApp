nodeApp.controller('navController', ['apiService', 'nav', '$scope', function (apiService, nav, $scope) {
        var navVM = this;
        navVM.links = [];
        
        $scope.$watch(nav.routes, function (value) {
            navVM.links = value;
        });
    }])
.controller('homeController', function () {
    var homeVM = this;

})
.controller('userController', ['apiService', '$state', function (apiService, $state) {
        var userVM = this;
        
        userVM.recentUsers = [];
        
        userVM.getRecentUsers = function () {
            apiService.getRecentUsers().then(function success(response) {
                userVM.recentUsers = response.data.recentUsers;
            }, function error(response) {
                $state.go('error', { errorMessage: JSON.stringify(response) });
            });
        }
    }])
.controller('errorController', ['$stateParams', function ($stateParams) {
        var errorVM = this;

        errorVM.message = "Ut oh! Something went wrong.";

        if ($stateParams.errorMessage) {
            errorVM.message = $stateParams.errorMessage;
        }
}]);