'use strict';

let SlackStrategy = require('passport-slack').Strategy;
let User = require('./models/user');

require('dotenv').config();

module.exports = (passport) => {
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});

	passport.use(new SlackStrategy({
	    clientID:	process.env.clientID || process.env.clientID_DEV,
	    clientSecret: process.env.clientSecret || process.env.clientSecret_DEV,
	    callbackURL: process.env.CALLBACK || process.env.CALLBACK_DEV,
			scope: 'users:read files:read files:write:user'
	  },
	  (accessToken, refreshToken, profile, done) => {
	  	return done(null, {profile : profile, token: accessToken});
	  }
	));

}