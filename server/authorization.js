var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(database) {
	console.log("setting up passport");
	passport.use(new LocalStrategy(verifyUser));
	passport.serializeUser(function(user, callback) {
		console.log("Serializing.. " + JSON.stringify(user));
		if(user) {
			callback(null, user.email);
		}
	});
	passport.deserializeUser(function(key, callback) {
		database.getDb(function(err, db){
			if(err) {
				callback(null, false, {message: "Failed to retrieve user"});
			} else {  
				console.log("Finding user for deserialization..");
				db.users.findOne({email: key}, function(err, user){
					if(!err && user) {
						callback(null, user);
					} else if(err){
						callback(null, false, {message: "Failed to retrieve user"});
					} else {
						callback(null, false, {message: "No user found"});
					}
				});
			}
		});
	});

	function verifyUser(username, password, callback) {
		database.getDb(function(err, db) {
			if(!err) {
				console.log("calling db");
				db.users.findOne({email:username}, function(err, user){
					if(!err && user){
						console.log("user found");
						callback(null, user);
					}else if(err){
						console.log("Failed to retrieve user");
						callback(null, false, {message: "Failed to retrieve user"});
					} else {
						console.log("No user found");
						callback(null, false, {message: "No user found"});
					}
				});
			} else {
				console.log("Error retreiving users:");
				callback(null, false, {message: "Invalid credentials."});
			}			
		});
	}
}