const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.post('/register', function(req, res, next) {
    console.log("/register");

    console.log(req.body);

    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    console.log(newUser);

    User.addUser(newUser, function(err, user) {
        if (err) {
            res.send("Failed to register user");
        }
        else {
            res.json({ success: true, msg: "User registered successfully"});
        }
    });
});

// Authenticate
router.post('/authenticate', function(req, res, next) {
    console.log("/authenticate");

    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function(err, user) {
        if (err) throw err;

        if (!user) {
            return res.send("This username doesn't exists.");
        }

        User.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err;

            if (isMatch) {

                console.log("comparePassword");


                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: { // we can choose what we send back, we chose to not send the password for obvious reasons
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else {
                return res.send("Wrong password");
            }
        });
    });
});

module.exports = router;
