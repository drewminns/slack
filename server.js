'use strict';

let express = require('express'),
		app = express(),
		port = process.env.PORT || 3000,
		morgan = require('morgan'),
		passport = require('passport'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    SlackStrategy = require('passport-slack').Strategy;

require('dotenv').config();
require('./config/passport')(passport);

app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log(`listening on Port ${port}`));

app.use(session({secret: process.env.SECRET || process.env.SECRET_DEV }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/routes')(app, passport);

