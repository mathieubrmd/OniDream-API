const express = require('express');
const router = express.Router();
const Dream = require('../models/dream');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.get('/dreams', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    
    Dream.find(function (err, dreams) {
        if (err)
            res.send(err);

        res.json(dreams);
    });
});

module.exports = router;
