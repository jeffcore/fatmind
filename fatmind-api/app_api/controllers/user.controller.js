var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt    = require('jsonwebtoken');    // used to create, sign, and verify tokens
var config = require('../../config.js'); //used to get the secrect for creating the token

/*  Standard Response function */
var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/*
    POST - user login or authentication
    /api/login
 */
module.exports.userAuthenticate = function(req, res) {

    if (req.body.email && req.body.password) {
        var response;
        // Fetch the appropriate user, if they exist
        User.findOne({email: req.body.email}, '-quanta', function (err, user) {
            // user cannot be found; may wish to log that fact here. For simplicity,
            // just return a 401
            if (!user) {
                sendJSONResponse(res, 401, {message: 'user not found'});
                return;
            } else if (err) {
                sendJSONResponse(res, 401, {message: err});
                return;
            }

            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) {
                    // an error has occured checking the password. For simplicity, just return a 401
                    sendJSONResponse(res, 401, {message: 'passwords did not match'});
                    console.log('passwords did not match hash');
                    return;
                }
                if (isMatch) {
                    console.log("login: user found");
                    console.log(user);
                    // Great, user has successfully authenticated, so we can generate
                    // and send them a token.
                    var token = jwt.sign(user.toJSON(), config.secret, {
                         expiresIn: '30d' // expires in 30 days
                    });

                    response = {
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        username: user.username,
                        email: user.email
                    };
                    sendJSONResponse(res, 201, response);
                } else {
                    // The password is wrong...
                    sendJSONResponse(res, 401, {message: 'passwords is wrong'});
                    console.log('password did not match ' + req.body.password);
                }
            });
        });
    } else {
        // No username provided, or invalid POST request. For simplicity, just return a 401
        sendJSONResponse(res, 401, {message: 'no username or password provided'});
        console.log('no username');
    }
};

/*
    POST - create a new user
    /api/user
*/
module.exports.userCreate = function(req, res) {

    User
        .create({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        }, function(err, user) {
            if (err) {
                console.log(err);
                if (err.code === 11000) {
                    sendJSONResponse(res, 400, {message: "Username already exisits"});
                } else {
                    sendJSONResponse(res, 400, {message: "There was an error creating user."});
                }
            } else {
                console.log(user);

                var token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: '30d' // expires in 30 days
                });
                
                var response = {
                    success: true,
                    message: "user successfully created",
                    data: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    },
                    token: token
                };

                sendJSONResponse(res, 201, response);
            }
        });

};
