var env = process.env.NODE_ENV = 
		process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];
var app = require('./server/config/express')(config);
var database = require('./server/database')(config);
var routes = require('./server/config/routes')(app);

app.listen(config.port, function() {
		console.log("Vidhi is running at localhost:" + config.port);
	});

database.getDb(function(err, theDb) {
	if(theDb) {
		console.log("Connected to the database:- " + theDb.db.options.url);
	} else if(err) {
		console.log("Failed to connect to the database.");
	}
});