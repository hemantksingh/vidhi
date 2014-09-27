module.exports = function() {
	var lastSavedUser = null;

	function addUser(user, callback) {
		lastSavedUser = user;
		callback();
	}

	function getUser(username, callback) {
		callback(null, lastSavedUser);
	}

	function getLastSavedUser() {
		return lastSavedUser;	
	}

	return {
		getLastSavedUser : getLastSavedUser,
		getUser : getUser,
		addUser : addUser
	};
};