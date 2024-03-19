var express = require('express');
var router = express.Router();

// Import mongoose
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mydb");
// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.plugin(plm);

// Create the User model based on the userSchema
module.exports = mongoose.model('user', userSchema);