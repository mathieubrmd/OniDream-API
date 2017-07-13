/**
 * Created by mathieubourmaud on 2017-04-13.
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Database connection
mongoose.connect(config.database);

// Use those lines of code to check the connection to the database
mongoose.connection.on("connected", function() {
    console.log("Connected to the database : " + config.database);
});

mongoose.connection.on("error", function(err) {
    console.log("Database Error : " + err);
});

// Application initialization
const app = express();

const users = require('./routes/users');
const dreams = require('./routes/dreams');

// Setup the port
const port = process.env.PORT || 8080;

// CORS middleware
app.use(cors());

// BodyParser middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// We want to use /users for all our users routes
app.use('/users', users);
app.use('/', dreams);

// Index Route
app.get('/', function(req, res) {
    res.send("Invalid Endpoint");
});

// Start Server
app.listen(port, function() {
    console.log("Server started on port " + port);
});
