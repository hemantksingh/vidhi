var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(authorization, database) {
	passport.use(new LocalStrategy(authorization.verifyUser));
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
}