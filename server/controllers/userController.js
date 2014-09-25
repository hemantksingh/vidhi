module.exports = function(passport, hasher) {

	function signIn(req, res, callback) {

		var auth = passport.authenticate('local', 
			function(err, user, info) {
				if(err) {return	callback(err);}
				if(!user) {res.send({success: false});} 
				req.logIn(user, function(err) {
					if(err) { return callback(err);} 
					res.send({success:true, user: user});
				});
			}
			);

		auth(req, res, callback);
	}

	function signUp(req, res) {
		console.log(JSON.stringify(req.body));
		var salt = hasher.createSalt();
		var user = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.email,
			email: req.body.email,
			passwordHash: hasher.computeHash(req.body.password, salt),
			salt: salt,
			firmName: req.body.firmName,
			phoneNumber: req.body.phoneNumber
		}; 

		res.send({success: true, user: user});
	}

	return { 
		signIn : signIn,
		signUp : signUp
	};
};