/**
 * Created by mathieubourmaud on 2017-04-14.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const DreamSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});


// Export the user so we can use it from everywhere
const Dream = module.exports = mongoose.model("Dream", DreamSchema);