var passport = require('passport');

module.exports = function(app) {
	
	app.post("/sign-in", function(req, res, callback) {
		var auth = passport.authenticate('local', function(err, user){
			if(err) {return callback(err);}
			if(!user) {res.send({success: false})}
			
			req.login(user, function(err){
				res.send({success:true, user: user});
			});
		});

		auth(req, res, callback);
	});

	// Create a catch-all handler that runs after other regular routes
	// Allow angular SPA to handle the routing on the client.
	app.get("*", function(req, res) {
		res.render("index", {title: 
			"Law Practice & Legal Case Management Software | Vidhi"});
	});
}