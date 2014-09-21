var passport = require('passport');

module.exports = function(app) {
	
	app.post("/login", function(req, res, callback) {
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
	});

	// Create a catch-all handler that runs after other regular routes
	// Allow angular SPA to handle the routing on the client.
	app.get("*", function(req, res) {
		res.render("index", {title: 
			"Law Practice & Legal Case Management Software | Vidhi"});
	});
}