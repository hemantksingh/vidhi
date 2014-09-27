var env = process.env.NODE_ENV = 
process.env.NODE_ENV || 'development';
var config = require('./server/startUp/config')[env];
var database = require('./server/database')(config);
var hasher = require('./server/hasher')(require('crypto'));
var userRepository = require('./server/repositories/userRepository')(database);
var authorization = require('./server/authorization')(hasher, userRepository);
var app = require('./server/startUp/express')(config);
var passport = require('./server/startUp/passport')(authorization, userRepository);
var userController = require('./server/controllers/userController');
var routes = require('./server/startUp/routes')(
	app, userController(require('passport'), hasher, userRepository));

app.listen(config.port, function() {
	console.log("Vidhi is running at localhost:" + config.port);
});

database.getDb(function(err, theDb) {
	if(!err && theDb) {
		console.log("Database up and running :) at :- " + theDb.db.options.url);
		return;
	}
	console.log("The database server seems to be down :(");
});
