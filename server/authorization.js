module.exports = function(hasher, userRepository) {

	function verifyUser(username, password, callback) {

		userRepository.getUser(username, function(err, user){
			if(!err && user) {
				var testHash = hasher.computeHash(password, user.salt);	
				if( testHash === user.passwordHash) {
					callback(null, user);
					return;
				}

				callback(null, false, {message: "The user credentials are invalid."});
			}
		});
	}

	return {
		verifyUser : verifyUser
	};
};