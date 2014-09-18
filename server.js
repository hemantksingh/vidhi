var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var dbUrl;

if(env === 'development') {
	dbUrl = "mongodb://localhost:27017/vidhi";	
} else {
	dbUrl = 'mongodb://hkumar:vidhi@ds063909.mongolab.com:63909/vidhi';	
}

var app = initialiseApp();

// Create a catch-all handler that runs after other regular routes
// Allow angular SPA to handle the routing on the client.
app.get("*", function(req, res) {
	res.render("index", {title: "Law Practice & Legal Case Management Software | Vidhi"});
});

app.listen(app.get("port"), function() {
	console.log("Vidhi is running at localhost:" + app.get("port"));
});

require('./server/database')(mongodb,dbUrl).getDb(function(err, theDb) {
	if(theDb) {
		console.log("Connected to the database:- " + theDb.db.options.url);
	} else if(err) {
		console.log("Failed to connect to the database.");
	}
});

function initialiseApp() {
	var app = express();

	// Specify the directory where express looks up the views.
	// By default this directory is views.
	app.set('views', __dirname + '/server/views');
	app.set("view engine", "vash");

	// Node environment variable. 'process.env.ENV_VAR_NAME'
	// It can be set using: PORT=4000 node server.js
	// or in Windows: set PORT=4000
	app.set("port", (process.env.PORT || 4000));
	app.use(logger('dev'));

	// Allow parsing urlencoded request bodies into req.body
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	
	// Define static routing to the public directory.
	// Allows any request that matches a file in the public 
	// directory to be served by express.
	app.use(express.static(__dirname + "/public"));
	return app;
}