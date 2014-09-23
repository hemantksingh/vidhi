var env = process.env.NODE_ENV = 
process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];
var database = require('./server/database')(config);
var hasher = require('./server/hasher')(require('crypto'));
var authorization = require('./server/authorization')(hasher, database);
var app = require('./server/config/express')(config);
var passport = require('./server/config/passport')(authorization, database);
var userController = require('./server/controllers/userController');
var routes = require('./server/config/routes')(app, userController(require('passport')));

app.listen(config.port, function() {
	console.log("Vidhi is running at localhost:" + config.port);
});

var seedData = require('./server/seedData');
database.getDb(function(err, theDb) {	if(theDb) {

		console.log("Connected to the database:- " + theDb.db.options.url);
		theDb.users.count(function(err, count) {
			if(err) {
				console.log("Failed to get the users count.");
			} else if(count === 0) {
				seedData.users.forEach(function(user) {
					theDb.users.insert(user, function(err) {
						if(err) {
							console.log("Failed to seed database");	
						}
					});
				});
			} else {
				console.log("Database already seeded.");
			}
		});
	} else if(err) {
		console.log("Failed to connect to the database.");
	}
});