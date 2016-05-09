var jwt = require('jwt-simple');

var authModule = function () {
    return {
        login: function (req, res) {
            var username = req.body.username || null;
            var password = req.body.password || null;
            
            if (username == null || password == null) {
                HandleInvalid(res, 500);
            }
            
            var dbUserObj = this.validate(username, password);
            
            if (!dbUserObj) {
                HandleInvalid(res, 401);
            }
            
            if (dbUserObj) {
                res.json(genToken(dbUserObj));
            }
        },
        validate: function (username, password) {
            //mock up
            var dbUserObj = {
                name: 'Test User',
                role: 'User',
                username: 'test@testuser.com'
            }
            
            return dbUserObj;
        },
        validateUser: function (username) {
            //mock up
            var dbUserObj = {
                name: 'Test V-User',
                role: 'User',
                username: 'testv@testuser.com'
            }
            
            return dbUserObj;
        }
    }
}();

function HandleInvalid(res, status) {
    res.status(status);
    res.json({
        "status": status,
        "message": status == 401 ? "Invalid credentials" : "Error logging in"
    });
    
    return;
}

function genToken(user) {
    var expires = expiresIn(20); //20 minutes
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    }
}

function expiresIn(minutes) {
    var dateObj = new Date();
    return new Date(dateObj.getTime() + minutes * 60000);
}

module.exports = authModule;