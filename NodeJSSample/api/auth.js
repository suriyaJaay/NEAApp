var express = require('express');
var authModule = require('../middleware/authModule');
var validateRequest = require('../middleware/validateRequest');

var router = express.Router();

router.post('/login', function (req, res, next) {
    authModule.login(req, res);
});

router.get('/validate', function (req, res, next) {
    validateRequest(req, res, next);
});

router.get('/validate', function (req, res, next) {
    res.json({ valid : true });
});

module.exports = router;