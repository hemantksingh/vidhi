module.exports = function(passport) {

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
		res.send({success: true, user: req.body});
	}

	return { 
		signIn : signIn,
		signUp : signUp
	};
};