'use strict';

let mongoose = require('mongoose'),
		Schema = mongoose.Schema;

let UserSchema = new Schema({
    token: String,
    profileID: String,
    profileName: String
});

module.exports = mongoose.model('User', UserSchema);