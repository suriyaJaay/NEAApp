var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({
        routes: [
            { id: '0', name: 'home', displayName: 'Home', url: '/', templateUrl: 'templates/home.html', visible: true },
            { id: '1', name: 'users', displayName: 'Users', url: '/users', templateUrl: 'templates/users.html', visible: true },
            { id: '2', name: 'error', displayName: 'Error', url: '/error', templateUrl: 'templates/error.html', visible: false, params: { errorMessage: null } },
        ]
    });
});

module.exports = router;