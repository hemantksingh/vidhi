module.exports = function(database) {
	
	function addUser(user, callback) {
		database.getDb(function(err, db){
			if(err) {
				callback(err);
			} else {
				db.users.insert(user, callback);
			}
		});
	}

	function getUser(username, callback) {
		database.getDb(function(err, db){
			if(err) {
				callback(err);
			} else {
				db.users.findOne({username: username}, callback);
			}
		});
	}

	return {
		addUser : addUser,
		getUser : getUser
	};
};