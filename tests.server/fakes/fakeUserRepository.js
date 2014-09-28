module.exports = function() {
	var lastSavedUser = null;

	function addUser(user, callback) {
		lastSavedUser = user;
		callback();
	}

	function getUser(username, callback) {
		callback(null, lastSavedUser);
	}

	return {
		getUser : getUser,
		addUser : addUser
	};
};