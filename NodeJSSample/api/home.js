var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json({ message: 'Welomce to the home API!' });
});

module.exports = router;