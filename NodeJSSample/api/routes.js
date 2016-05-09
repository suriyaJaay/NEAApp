var express = require('express');
var router = express.Router();

function createRoute(name, displayName, url, baseName, path, controllerAs, secure, visible, params) {
    var route = {};
    
    route.baseName = baseName;
    route.path = path;
    route.controllerAs = controllerAs;
    route.secure = secure;
    route.visible = visible;
    if (params) route.params = params;
    route.name = name;
    route.displayName = displayName;
    route.url = url;

    return route;
}

router.get('/', function (req, res, next) {
    res.json({
        routes: [
            createRoute('users', 'Users', 'users', 'users', 'users', 'userVM', true, false, null)
            //{ id: '0', name: 'home', displayName: 'Home', url: 'home', templateUrl: '/app/views/home/home.html', controllerAs: 'homeVM', controller: 'homeController', visible: true },
            //{ id: '2', name: 'error', displayName: 'Error', url: 'error', templateUrl: '/app/views/error.html', controllerAs: 'errorVM', controller: 'errorController', visible: false, params: { errorMessage: null } },
        ]
    });
});

module.exports = router;