module.exports = function() {
	var lastSavedUser = null;

	function addUser(user, callback) {
		lastSavedUser = user;
		callback();
	}

	function getLastSavedUser() {
		return lastSavedUser;	
	}

	return {
		getLastSavedUser : getLastSavedUser,
		addUser : addUser
	};
};