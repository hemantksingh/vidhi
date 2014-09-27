var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(authorization, userRepository) {
	passport.use(new LocalStrategy(authorization.verifyUser));
	passport.serializeUser(function(user, callback) {
		if(user) {
			console.log("Serializing user... " + user.username);
			callback(null, user.username);
		} else {
			console.log("Unable to serialize as no user was found.");
		}
	});

	passport.deserializeUser(function(key, callback) {
		userRepository.getUser(key, function(err, user){
			if(!err && user) {
				console.log("User retrieved for deserialization..");
				callback(null, user);
				return;
			}

			console.log("Failed to retrieve user for deserialization.");
			callback(null, false, "Failed to retrieve user for deserialization.");
		});
	});
};