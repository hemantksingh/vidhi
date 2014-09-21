var passport = require('passport');

module.exports = function() {  

	function authenticate(req, res, callback) {

		var auth = passport.authenticate('local', 
			function(err, user, info) {
				if(err) {return	callback(err);}
				if(!user) {res.send({success: false});} 
				req.logIn(user, function(err) {
					if(err) { return callback(err)} 
						res.send({success:true, user: user});
				});
			}
		);

		auth(req, res, callback);
	}

	return { authenticate : authenticate };
}