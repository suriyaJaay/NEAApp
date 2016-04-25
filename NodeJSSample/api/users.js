var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    
    var currentDate = new Date();

    res.json({
        recentUsers: [
            { id: '1', name: 'John Doe', date: currentDate },
            { id: '2', name: 'Users', date: currentDate },
            { id: '3', name: 'Error', date: currentDate },
        ]
    });
});

module.exports = router;