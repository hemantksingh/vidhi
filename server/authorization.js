var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(database) {
	passport.use(new LocalStrategy(verifyUser));
	passport.serializeUser(function(user, callback) {
		callback(null, user.email);
	});
	passport.deserializeUser(function(key, callback) {
		database.getDb(function(err, db){
			if(!err) {
				db.users.findOne({email: key}, callback);
			}
			callback(null, false, {message: "Failed to retrieve user"});
		})
	});

	function verifyUser(username, password, callback) {
		database.getDb(function(err, db) {
			if(!err) {
				db.users.findOne({email:email}, callback);
			}
			callback(null, false, {message: "Invalid credentials."});			
		});
	}
}