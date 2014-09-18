var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser');

module.exports = function(config) {
	var app = express();
	// Specify the directory where express looks up the views.
	// By default this directory is views.
	app.set('views', config.rootPath + '/server/views');
	app.set("view engine", "vash");
	app.set("port", (config.port));
	app.use(logger('dev'));

	// Allow parsing urlencoded request bodies into req.body
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	
	// Define static routing to the public directory.
	// Allows any request that matches a file in the public 
	// directory to be served by express.
	app.use(express.static(config.rootPath + "/public"));
	return app;
}