var express = require('express'),
logger = require('morgan'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session');
passport = require('passport');

module.exports = function(config) {
	var app = express();
	// Specify the directory where express looks up the views.
	// By default this directory is views.
	app.set('views', config.rootPath + '/server/views');
	app.set("view engine", "vash");
	app.set("port", (config.port));
	app.use(logger('dev'));
	// Cookies are required for sessions.
	app.use(cookieParser());

	// Allow parsing urlencoded request bodies into req.body
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(session({secret: 'vidhi pms', saveUninitialized: true, resave: true}));
	app.use(passport.initialize());
	app.use(passport.session());
	
	// Define static routing to the public directory.
	// Allows any request that matches a file in the public 
	// directory to be served by express.
	app.use(express.static(config.rootPath + "/public"));
	return app;
};