module.exports = function(hasher, database) {

	function verifyUser(username, password, callback) {
		database.getDb(function(err, db) {
			if(!err) {
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

	return {
		verifyUser : verifyUser
	}
}