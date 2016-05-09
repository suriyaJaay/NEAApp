﻿var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var authAPI = require('./api/auth.js');
var userAPI = require('./api/users.js');
var routeAPI = require('./api/routes.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/app', express.static(path.join(__dirname, 'app')));

app.use('/api/auth', authAPI);
app.use('/api/users', userAPI);
app.use('/api/routes', routeAPI);

app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Accsss-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-tyep,Accept,X-Access-Token,X-Key");

    res.sendFile(path.join(__dirname + '/app/views/index.html')); //load the angular index page.
});

app.get('*', function (req, res, next) {
    next();
});

app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
})

if ('development' == app.get('env')) {
    app.use(function (req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: 'Sorry something went wrong!',
            stack: err.stack
        });
    });
}

app.use(function (req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: 'Sorry something went wrong!',
        error: {}
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
